import { useEffect, useMemo, useState } from "react";
import chatImage from "@assets/yardbro.png";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { createPortal } from "react-dom";
import { ExternalLink } from "lucide-react";

export default function ChatSection() {
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [showIframeFallback, setShowIframeFallback] = useState(false);

  const chatBaseUrl = useMemo(() => {
    return (
      (import.meta as any).env?.VITE_CHAT_URL?.toString?.() ||
      "https://your-chat-app.example.com"
    );
  }, []);

  useEffect(() => {
    setMounted(true);

    const mql = window.matchMedia("(min-width: 640px)");
    const handleMql = () => setIsDesktop(mql.matches);
    handleMql();
    mql.addEventListener?.("change", handleMql);

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsVisible(scrollTop > 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      mql.removeEventListener?.("change", handleMql);
    };
  }, []);

  const iframeSrc = `${chatBaseUrl}${chatBaseUrl.includes("?") ? "&" : "?"}hideImage=true`;
  const isConfigured = chatBaseUrl !== "https://your-chat-app.example.com";

  useEffect(() => {
    if (!open || !isConfigured) return;

    setIframeLoaded(false);
    setShowIframeFallback(false);
    const t = window.setTimeout(() => setShowIframeFallback(true), 1500);
    return () => window.clearTimeout(t);
  }, [open, isConfigured]);

  const launcher = (
    <div
      className={[
        "fixed bottom-6 right-6 z-50 transition-all duration-300",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none",
      ].join(" ")}
    >
      <div className="mb-2 flex justify-end">
        <span className="inline-flex items-center rounded-full border border-border bg-card/90 backdrop-blur px-3 py-1 text-xs text-foreground shadow-sm">
          Ask the Bros
        </span>
      </div>
      <Button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open chat"
        variant="secondary"
        className="h-14 w-14 rounded-full p-0 shadow-lg border border-border/60 bg-card hover:bg-muted"
      >
        <img
          src={chatImage}
          alt=""
          className="h-9 w-9 rounded-md object-contain"
        />
      </Button>
    </div>
  );

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side={isDesktop ? "right" : "bottom"}
          className={[
            "p-0 flex flex-col",
            "h-[85svh] pb-[env(safe-area-inset-bottom)]",
            "sm:h-svh sm:w-[420px] sm:max-w-[420px]",
          ].join(" ")}
        >
          <SheetHeader className="px-5 py-4 border-b border-border/60">
            <div className="flex items-center gap-3">
              <img
                src={chatImage}
                alt="Yard Bros"
                className="h-9 w-9 rounded-md bg-muted p-1 object-contain"
              />
              <div className="min-w-0">
                <SheetTitle className="font-heading tracking-tight">Ask the Bros</SheetTitle>
                <p className="text-sm text-muted-foreground truncate">
                  Quick answers, scheduling help, and estimate questions.
                </p>
              </div>
            </div>
          </SheetHeader>

          <div className="flex-1 min-h-0 bg-background">
            {!isConfigured ? (
              <div className="h-full w-full p-5 flex items-center">
                <div className="w-full rounded-xl border border-border bg-card p-4">
                  <p className="font-medium text-foreground">Chat isn’t configured yet.</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Set <code className="font-mono">VITE_CHAT_URL</code> to your chat app URL and reload.
                  </p>
                </div>
              </div>
            ) : (
              <>
                <iframe
                  title="Chat with Yard Bros"
                  src={iframeSrc}
                  className="h-full w-full border-0 bg-background"
                  allow="clipboard-write"
                  loading="eager"
                  onLoad={() => {
                    setIframeLoaded(true);
                    setShowIframeFallback(false);
                  }}
                />

                {(showIframeFallback || !iframeLoaded) && (
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4">
                    <div className="pointer-events-auto rounded-xl border border-border bg-card/95 backdrop-blur p-3 shadow-lg">
                      <p className="text-sm font-medium text-foreground">
                        If chat doesn’t load here, open it in a new tab.
                      </p>
                      <a
                        href={chatBaseUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 inline-flex items-center gap-2 text-sm text-primary underline underline-offset-4"
                      >
                        Open chat <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {mounted ? createPortal(launcher, document.body) : null}
    </>
  );
}