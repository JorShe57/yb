/** Public Google Business review link — set in `.env` / Vercel as `VITE_GOOGLE_REVIEW_URL`. */
export function getGoogleReviewUrl(): string | undefined {
  const raw = import.meta.env.VITE_GOOGLE_REVIEW_URL;
  if (typeof raw !== "string") return undefined;
  const u = raw.trim();
  if (!u.startsWith("https://")) return undefined;
  return u;
}
