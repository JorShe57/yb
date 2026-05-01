import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { getGoogleReviewUrl } from "@/lib/googleReview";

type Surface = "footer" | "hero";

type Props = {
  surface?: Surface;
  className?: string;
};

export function GoogleReviewButton({ surface = "footer", className }: Props) {
  const href = getGoogleReviewUrl();

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-primary",
        surface === "footer" &&
          "bg-white text-primary hover:bg-white/90 border border-white/20",
        surface === "hero" &&
          "border border-white/30 bg-white/15 text-white backdrop-blur-sm hover:bg-white/25",
        className,
      )}
    >
      <Star className="h-4 w-4 shrink-0 fill-yellow-400 text-yellow-400" aria-hidden />
      Review us on Google
    </a>
  );
}
