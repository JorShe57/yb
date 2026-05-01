import type { Express, Request, Response } from "express";
import { insertQuoteRequestSchema } from "@shared/schema";
import { ZodError } from "zod";
import { sendQuoteRequestEmail } from "./email";

export async function registerRoutes(app: Express): Promise<void> {
  const forwardToN8n = async (payload: unknown) => {
    const url = process.env.N8N_WEBHOOK_URL;
    if (!url) {
      console.log("Quote submission (no N8N_WEBHOOK_URL configured):", payload);
      return;
    }

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`n8n webhook failed: ${res.status} ${res.statusText}${text ? ` :: ${text}` : ""}`);
    }
  };

  // Quote requests API endpoints
  
  // POST endpoint to create a new quote request
  app.post("/api/quotes", async (req: Request, res: Response) => {
    try {
      // Validate request body using Zod schema
      const quoteData = insertQuoteRequestSchema.parse(req.body);
      
      await forwardToN8n({
        source: "api/quotes",
        receivedAt: new Date().toISOString(),
        quote: quoteData,
      });
      
      // Return success response
      return res.status(201).json({
        success: true,
        message: "Quote request submitted successfully",
      });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: "Invalid quote request data",
          errors: error.errors
        });
      }
      
      console.error("Error creating quote request:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to submit quote request"
      });
    }
  });

  // Webhook endpoint for external form services (like Formspree, Netlify Forms, etc.)
  const webhookHandler = async (req: Request, res: Response) => {
    try {
      console.log("Webhook received:", req.body);
      
      // Parse form data - could come from various sources
      const formData = req.body;
      
      // Map webhook data to our schema format
      const quoteData = {
        name: formData.name || formData.Name || '',
        email: formData.email || formData.Email || '',
        phone: formData.phone || formData.Phone || '',
        city: formData.city || formData.City || '',
        address: formData.address || formData.Address || '',
        service: formData.service || formData.Service || 'other',
        comments: formData.comments || formData.Comments || formData.message || ''
      };
      
      // Validate and forward
      const validatedData = insertQuoteRequestSchema.parse(quoteData);
      await forwardToN8n({
        source: "webhook/quote",
        receivedAt: new Date().toISOString(),
        quote: validatedData,
        raw: req.body,
      });
      
      // Return success response for webhook
      return res.status(200).json({
        success: true,
        message: "Webhook processed successfully",
      });
      
    } catch (error) {
      console.error("Webhook processing error:", error);
      return res.status(200).json({
        success: false,
        message: "Webhook processing failed",
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };

  // Keep legacy path
  app.post("/webhook/quote", webhookHandler);
  // Also expose under /api for serverless routing convenience
  app.post("/api/webhook/quote", webhookHandler);
}
