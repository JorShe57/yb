import type { IncomingMessage, ServerResponse } from "http";
import { z } from "zod";

const chatRequestSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(4000),
      }),
    )
    .min(1)
    .max(24),
});

type JsonObject = Record<string, unknown>;

const SYSTEM_PROMPT = `You are a friendly, concise assistant for Yard Bros Landscaping (Lorain County and nearby areas). Services include sod installation, new lawns, mulch beds, French drains, grading, and general landscaping.

Rules:
- Be accurate and practical; do not invent pricing, timelines, or guarantees.
- If someone needs a firm estimate, suggest they use the quote form on the site or call 440-396-7474.
- Keep answers short unless the user asks for more detail.
- Use plain language; no markdown headings unless the user asks for a structured list.`;

function sendJson(res: ServerResponse, status: number, body: JsonObject) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(body));
}

function isPlainObject(value: unknown): value is JsonObject {
  if (value === null || typeof value !== "object") return false;
  if (Buffer.isBuffer(value)) return false;
  if (Array.isArray(value)) return false;
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}

async function readJsonBody(req: IncomingMessage): Promise<JsonObject> {
  const raw = (req as IncomingMessage & { body?: unknown }).body;

  if (raw !== undefined && raw !== null) {
    if (typeof raw === "string") {
      if (!raw.trim()) return {};
      return JSON.parse(raw) as JsonObject;
    }
    if (Buffer.isBuffer(raw)) {
      const s = raw.toString("utf8");
      if (!s.trim()) return {};
      return JSON.parse(s) as JsonObject;
    }
    if (isPlainObject(raw)) {
      return raw;
    }
  }

  const chunks: Buffer[] = [];
  await new Promise<void>((resolve, reject) => {
    req.on("data", (chunk: Buffer | string) => {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    });
    req.on("end", () => resolve());
    req.on("error", reject);
  });

  const text = Buffer.concat(chunks).toString("utf8");
  if (!text.trim()) return {};

  return JSON.parse(text) as JsonObject;
}

async function openAiReply(messages: { role: string; content: string }[]): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey?.trim()) {
    throw new Error("MISSING_OPENAI_KEY");
  }

  const model = process.env.OPENAI_CHAT_MODEL?.trim() || "gpt-4o-mini";

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages,
      max_tokens: 900,
      temperature: 0.6,
    }),
  });

  const rawText = await res.text();
  if (!res.ok) {
    console.error("[api/chat] OpenAI error:", res.status, rawText.slice(0, 500));
    throw new Error(`OPENAI_HTTP_${res.status}`);
  }

  let data: unknown;
  try {
    data = JSON.parse(rawText);
  } catch {
    throw new Error("OPENAI_BAD_JSON");
  }

  const content =
    typeof data === "object" &&
    data !== null &&
    "choices" in data &&
    Array.isArray((data as { choices?: unknown }).choices) &&
    (data as { choices: Array<{ message?: { content?: string } }> }).choices[0]?.message?.content;

  if (typeof content !== "string" || !content.trim()) {
    throw new Error("OPENAI_EMPTY_REPLY");
  }

  return content.trim();
}

async function handleChat(req: IncomingMessage, res: ServerResponse) {
  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method !== "POST") {
    sendJson(res, 405, { error: "Method not allowed" });
    return;
  }

  try {
    const body = await readJsonBody(req);
    const parsed = chatRequestSchema.safeParse(body);

    if (!parsed.success) {
      sendJson(res, 400, { error: "Invalid request", details: parsed.error.flatten() });
      return;
    }

    if (!process.env.OPENAI_API_KEY?.trim()) {
      sendJson(res, 503, {
        error: "Chat is not configured. Set OPENAI_API_KEY on the server.",
      });
      return;
    }

    const chatMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...parsed.data.messages.map((m) => ({ role: m.role, content: m.content })),
    ];

    const reply = await openAiReply(chatMessages);

    sendJson(res, 200, { reply });
  } catch (error) {
    if (error instanceof SyntaxError) {
      sendJson(res, 400, { error: "Invalid JSON body" });
      return;
    }

    console.error("[api/chat]", error);
    sendJson(res, 502, { error: "The assistant could not complete your request. Try again shortly." });
  }
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  try {
    await handleChat(req, res);
  } catch (err) {
    console.error("[api/chat] Unhandled error:", err);
    if (!res.writableEnded) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: "Internal server error" }));
    }
  }
}
