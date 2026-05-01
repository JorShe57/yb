import type { IncomingMessage, ServerResponse } from "http";
import { createApp } from "../server/app";

let cachedApp: Awaited<ReturnType<typeof createApp>> | undefined;

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (!cachedApp) {
    cachedApp = await createApp();
  }

  // Express apps are (req, res) handlers
  return (cachedApp as any)(req, res);
}

