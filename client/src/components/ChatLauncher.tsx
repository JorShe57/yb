import { MessageCircle } from "lucide-react";

export default function ChatLauncher() {
  // External chat URL
  const chatUrl = "https://ask-the-bros-jorshevel.replit.app";
  
  // Open external chat in a new window/tab
  const openExternalChat = () => {
    window.open(chatUrl, '_blank');
  };

  return (
    <div className="chat-launcher-container">
      {/* Simple Chat Button - Fixed at bottom right, stays during scroll */}
      <button
        onClick={openExternalChat}
        className="fixed bottom-6 right-6 z-50 bg-accent hover:bg-accent/90 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 font-medium"
        aria-label="Ask the Yard Bros"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="hidden sm:inline">Ask the Yard Bros</span>
      </button>
    </div>
  );
}
