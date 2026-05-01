import { useEffect, useMemo, useRef, useState } from "react";
import chatImage from "@assets/yardbro.png";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { createPortal } from "react-dom";
import { Loader2, SendHorizonal } from "lucide-react";
import { cn } from "@/lib/utils";

type ChatRole = "user" | "assistant";

type ChatTurn = {
  role: ChatRole;
  content: string;
};

export default function ChatSection() {
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [messages, setMessages] = useState<ChatTurn[]>([]);
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const endRef = useRef<HTMLDivElement>(null);

  const placeholder = useMemo(
    () => "Ask about services, timing, sod — we’ll point you to the right next step.",
    [],
  );

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

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, pending, open]);

  async function sendMessage() {
    const text = draft.trim();
    if (!text || pending) return;

    setError(null);
    const userTurn: ChatTurn = { role: "user", content: text };
    const nextMessages = [...messages, userTurn];
    setMessages(nextMessages);
    setDraft("");
    setPending(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ messages: nextMessages }),
      });

      const raw = await res.text();
      let data: { reply?: string; error?: string } = {};
      try {
        data = raw ? JSON.parse(raw) : {};
      } catch {
        throw new Error("Unexpected response from chat.");
      }

      if (!res.ok) {
        throw new Error(data.error || `Chat failed (${res.status}).`);
      }

      const reply = data.reply?.trim();
      if (!reply) {
        throw new Error("No reply from assistant.");
      }

      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Something went wrong.";
      setError(msg);
      setMessages((prev) => prev.slice(0, -1));
      setDraft(text);
    } finally {
      setPending(false);
    }
  }

  const launcher = (
    <div
      id="chat"
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
        <img src={chatImage} alt="" className="h-9 w-9 rounded-md object-contain" />
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
          <SheetHeader className="px-5 py-4 border-b border-border/60 shrink-0">
            <div className="flex items-center gap-3">
              <img
                src={chatImage}
                alt="Yard Bros"
                className="h-9 w-9 rounded-md bg-muted p-1 object-contain"
              />
              <div className="min-w-0">
                <SheetTitle className="font-heading tracking-tight">Ask the Bros</SheetTitle>
                <p className="text-sm text-muted-foreground">
                  Quick answers about services and estimates — powered by AI.
                </p>
              </div>
            </div>
          </SheetHeader>

          <div className="flex-1 min-h-0 flex flex-col bg-background">
            <ScrollArea className="flex-1 min-h-0">
              <div className="px-4 py-4 space-y-3">
                <p className="text-sm text-muted-foreground leading-relaxed">{placeholder}</p>

                {messages.map((m, i) => (
                  <div
                    key={`${m.role}-${i}`}
                    className={cn(
                      "flex",
                      m.role === "user" ? "justify-end" : "justify-start",
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed shadow-sm",
                        m.role === "user"
                          ? "bg-accent text-accent-foreground rounded-br-md"
                          : "bg-muted text-foreground rounded-bl-md border border-border/60",
                      )}
                    >
                      {m.content}
                    </div>
                  </div>
                ))}

                {pending && (
                  <div className="flex justify-start">
                    <div className="flex items-center gap-2 rounded-2xl rounded-bl-md border border-border/60 bg-muted px-3 py-2 text-sm text-muted-foreground">
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                      Thinking…
                    </div>
                  </div>
                )}

                <div ref={endRef} />
              </div>
            </ScrollArea>

            {error ? (
              <div className="shrink-0 mx-4 mb-2 rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </div>
            ) : null}

            <div className="shrink-0 border-t border-border/60 p-3 flex gap-2 items-end bg-card/30">
              <Textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Type your message…"
                disabled={pending}
                rows={2}
                className="min-h-[72px] resize-none text-base sm:text-sm"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    void sendMessage();
                  }
                }}
              />
              <Button
                type="button"
                variant="accent"
                size="icon"
                className="h-11 w-11 shrink-0"
                disabled={pending || !draft.trim()}
                aria-label="Send message"
                onClick={() => void sendMessage()}
              >
                {pending ? (
                  <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
                ) : (
                  <SendHorizonal className="h-5 w-5" aria-hidden />
                )}
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {mounted ? createPortal(launcher, document.body) : null}
    </>
  );
}
