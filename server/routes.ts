import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertQuoteRequestSchema } from "@shared/schema";
import { ZodError } from "zod";
import { sendQuoteRequestEmail } from "./email";

export async function registerRoutes(app: Express): Promise<Server> {
  // Quote requests API endpoints
  
  // POST endpoint to create a new quote request
  app.post("/api/quotes", async (req: Request, res: Response) => {
    try {
      // Validate request body using Zod schema
      const quoteData = insertQuoteRequestSchema.parse(req.body);
      
      // Save quote request to database
      const savedQuote = await storage.createQuoteRequest(quoteData);
      
      // Email notification now handled by EmailJS on frontend
      console.log(`Quote request saved with ID: ${savedQuote.id}`);
      
      // Return success response
      return res.status(201).json({
        success: true,
        message: "Quote request submitted successfully",
        data: savedQuote
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
  
  // GET endpoint to retrieve all quote requests (admin only in a real app)
  app.get("/api/quotes", async (req: Request, res: Response) => {
    try {
      const quotes = await storage.getAllQuoteRequests();
      return res.status(200).json({
        success: true,
        data: quotes
      });
    } catch (error) {
      console.error("Error retrieving quote requests:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to retrieve quote requests"
      });
    }
  });
  
  // GET endpoint to retrieve a specific quote request by ID
  app.get("/api/quotes/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid quote request ID"
        });
      }
      
      const quote = await storage.getQuoteRequest(id);
      
      if (!quote) {
        return res.status(404).json({
          success: false,
          message: "Quote request not found"
        });
      }
      
      return res.status(200).json({
        success: true,
        data: quote
      });
    } catch (error) {
      console.error("Error retrieving quote request:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to retrieve quote request"
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
