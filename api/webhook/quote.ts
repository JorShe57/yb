import type { IncomingMessage, ServerResponse } from "http";
import { handleQuoteWebhook } from "../../serverless/quote";

export default function handler(req: IncomingMessage, res: ServerResponse) {
  return handleQuoteWebhook(req, res);
}
