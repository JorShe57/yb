import type { IncomingMessage, ServerResponse } from "http";
import { handleQuoteWebhook } from "../lib/quoteHandlers.js";

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  try {
    await handleQuoteWebhook(req, res);
  } catch (err) {
    console.error("[api/webhook/quote] Unhandled error:", err);
    if (!res.writableEnded) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ success: false, message: "Internal server error" }));
    }
  }
}
