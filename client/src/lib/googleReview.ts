import { DEFAULT_GOOGLE_REVIEW_URL } from "@/config/site";

/**
 * Google review / Maps link for the site.
 * Optional override: `VITE_GOOGLE_REVIEW_URL` (https only) in `.env` or Vercel.
 */
export function getGoogleReviewUrl(): string {
  const raw = import.meta.env.VITE_GOOGLE_REVIEW_URL;
  if (typeof raw === "string") {
    const u = raw.trim();
    if (u.startsWith("https://")) return u;
  }
  return DEFAULT_GOOGLE_REVIEW_URL;
}
