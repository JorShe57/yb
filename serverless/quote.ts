import type { IncomingMessage, ServerResponse } from "http";
import { ZodError } from "zod";
import { insertQuoteRequestSchema } from "../shared/schema";

type JsonObject = Record<string, unknown>;

function sendJson(res: ServerResponse, status: number, body: JsonObject) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(body));
}

async function readJsonBody(req: IncomingMessage): Promise<JsonObject> {
  const existingBody = (req as IncomingMessage & { body?: unknown }).body;
  if (existingBody && typeof existingBody === "object") {
    return existingBody as JsonObject;
  }

  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  const rawBody = Buffer.concat(chunks).toString("utf8");
  if (!rawBody) return {};

  return JSON.parse(rawBody) as JsonObject;
}

async function forwardToN8n(payload: unknown) {
  const url = process.env.N8N_WEBHOOK_URL;
  if (!url) {
    console.log("Quote submission (no N8N_WEBHOOK_URL configured):", payload);
    return;
  }

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(
      `n8n webhook failed: ${response.status} ${response.statusText}${text ? ` :: ${text}` : ""}`,
    );
  }
}

export async function handleQuoteRequest(req: IncomingMessage, res: ServerResponse) {
  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method !== "POST") {
    sendJson(res, 405, { success: false, message: "Method not allowed" });
    return;
  }

  try {
    const body = await readJsonBody(req);
    const quoteData = insertQuoteRequestSchema.parse(body);

    await forwardToN8n({
      source: "api/quotes",
      receivedAt: new Date().toISOString(),
      quote: quoteData,
    });

    sendJson(res, 201, {
      success: true,
      message: "Quote request submitted successfully",
    });
  } catch (error) {
    if (error instanceof SyntaxError) {
      sendJson(res, 400, { success: false, message: "Invalid JSON body" });
      return;
    }

    if (error instanceof ZodError) {
      sendJson(res, 400, {
        success: false,
        message: "Invalid quote request data",
        errors: error.errors,
      });
      return;
    }

    console.error("Error creating quote request:", error);
    sendJson(res, 500, {
      success: false,
      message: "Failed to submit quote request",
    });
  }
}

export async function handleQuoteWebhook(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== "POST") {
    sendJson(res, 405, { success: false, message: "Method not allowed" });
    return;
  }

  try {
    const formData = await readJsonBody(req);
    const quoteData = insertQuoteRequestSchema.parse({
      name: formData.name || formData.Name || "",
      email: formData.email || formData.Email || "",
      phone: formData.phone || formData.Phone || "",
      city: formData.city || formData.City || "",
      address: formData.address || formData.Address || "",
      service: formData.service || formData.Service || "other",
      comments: formData.comments || formData.Comments || formData.message || "",
    });

    await forwardToN8n({
      source: "webhook/quote",
      receivedAt: new Date().toISOString(),
      quote: quoteData,
      raw: formData,
    });

    sendJson(res, 200, {
      success: true,
      message: "Webhook processed successfully",
    });
  } catch (error) {
    console.error("Webhook processing error:", error);
    sendJson(res, 200, {
      success: false,
      message: "Webhook processing failed",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
