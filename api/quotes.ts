import type { IncomingMessage, ServerResponse } from "http";
import { handleQuoteRequest } from "../serverless/quote";

export default function handler(req: IncomingMessage, res: ServerResponse) {
  return handleQuoteRequest(req, res);
}
