
import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ChatLauncher() {
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <div
      className={cn(
        "fixed bottom-20 right-6 z-[999] w-full max-w-[400px] overflow-hidden rounded-lg border border-border bg-white shadow-lg transition-all duration-300",
        isMinimized ? "h-[42px]" : "h-[600px]"
      )}
    >
      <div className="flex items-center justify-between bg-primary px-4 py-2">
        <span className="font-medium text-primary-foreground">Ask The Bros</span>
        <button
          onClick={() => setIsMinimized(!isMinimized)}
          className="text-primary-foreground hover:opacity-80"
          aria-label={isMinimized ? "Expand chat" : "Minimize chat"}
        >
          {isMinimized ? (
            <Plus className="h-5 w-5" />
          ) : (
            <Minus className="h-5 w-5" />
          )}
        </button>
      </div>
      <iframe
        src="https://ask-the-bros-jorshevel.replit.app/"
        className="h-[calc(100%-42px)] w-full border-none bg-white"
        title="Ask The Bros Chat"
      />
    </div>
  );
}
