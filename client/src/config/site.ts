/**
 * Default Google Maps destination when `VITE_GOOGLE_REVIEW_URL` is not set.
 * Opens your business listing so visitors can leave a review (Reviews tab).
 *
 * Replace this with your exact **Ask for reviews** URL from Google Business Profile
 * (`https://g.page/.../review`) — or set `VITE_GOOGLE_REVIEW_URL` in Vercel / `.env`.
 */
export const DEFAULT_GOOGLE_REVIEW_URL =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("Yard Bros Landscaping 201 E Bridge St Elyria OH 44035");
