import type { IncomingMessage, ServerResponse } from "http";
import { handleQuoteRequest } from "./lib/quoteHandlers.js";

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  try {
    await handleQuoteRequest(req, res);
  } catch (err) {
    console.error("[api/quotes] Unhandled error:", err);
    if (!res.writableEnded) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ success: false, message: "Internal server error" }));
    }
  }
}
