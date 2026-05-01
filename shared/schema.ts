import { z } from "zod";

export const insertQuoteRequestSchema = z.object({
  name: z.string().min(1),
  email: z.string().min(1),
  city: z.string().min(1),
  address: z.string().min(1),
  phone: z.string().min(1),
  service: z.string().optional(),
  comments: z.string().optional(),
});

export type InsertQuoteRequest = z.infer<typeof insertQuoteRequestSchema>;
