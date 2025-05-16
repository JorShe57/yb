import { useState, useEffect, useRef } from "react";
import { X, MessageCircle } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function ChatLauncher() {
  const [isOpen, setIsOpen] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  // Simple function to open chat
  const openChat = () => {
    console.log("Opening chat");
    setIsOpen(true);
  };
  
  // Simple function to close chat
  const closeChat = () => {
    console.log("Closing chat");
    setIsOpen(false);
  };
  
  // Add some debugging
  useEffect(() => {
    console.log("Chat state changed:", isOpen);
  }, [isOpen]);

  // Ensure the chat UI is always visible in the viewport
  useEffect(() => {
    if (isOpen && iframeRef.current) {
      console.log("Adjusting iframe view for chat");
      // Adjust iframe styling to ensure the input is visible
      const updateIframeView = () => {
        if (iframeRef.current) {
          try {
            // Apply styles that will help show the input field
            iframeRef.current.style.height = '100%';
            iframeRef.current.style.width = '100%';
            
            // Wait for iframe to load and try to adjust its scroll position
            const adjustIframeContent = () => {
              try {
                const iframeDoc = iframeRef.current?.contentDocument || 
                                 (iframeRef.current?.contentWindow?.document);
                if (iframeDoc) {
                  // Force scroll to appropriate position where input is visible
                  iframeDoc.body.scrollTop = iframeDoc.body.scrollHeight;
                }
              } catch (e) {
                // Ignore cross-origin errors silently
                console.log("Could not access iframe content (expected for cross-origin)");
              }
            };
            
            // Try multiple times as iframe might take time to load
            setTimeout(adjustIframeContent, 500);
            setTimeout(adjustIframeContent, 1000);
            setTimeout(adjustIframeContent, 2000);
          } catch (e) {
            console.error("Error adjusting iframe:", e);
          }
        }
      };
      
      updateIframeView();
      window.addEventListener('resize', updateIframeView);
      return () => window.removeEventListener('resize', updateIframeView);
    }
  }, [isOpen]);

  // Handle clicking outside to close (only on mobile)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen && 
        chatContainerRef.current && 
        !chatContainerRef.current.contains(event.target as Node) &&
        window.innerWidth < 768
      ) {
        closeChat();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Handle escape key to close
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (isOpen && event.key === 'Escape') {
        closeChat();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen]);

  return (
    <div className="chat-launcher-container">
      {/* Chat Button - Fixed at bottom right, stays during scroll */}
      <button
        onClick={openChat}
        className="fixed bottom-6 right-6 z-50 bg-accent hover:bg-accent/90 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 font-medium"
        aria-label="Ask the Yard Bros"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="hidden sm:inline">Ask the Yard Bros</span>
      </button>
      
      {/* Chat Container - Fixed position to follow scroll */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatContainerRef}
            className="fixed bottom-24 right-6 z-40 w-[90vw] sm:w-[400px] h-[500px] max-h-[calc(80vh-100px)] rounded-xl overflow-hidden shadow-2xl border border-border bg-white"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Chat Header */}
            <div className="flex items-center justify-between bg-primary text-white px-4 py-3 sticky top-0 z-10">
              <h3 className="font-heading font-semibold text-lg">Chat with Yard Bros</h3>
              <button
                onClick={closeChat}
                className="p-1 rounded-full hover:bg-primary-dark transition-colors"
                aria-label="Close chat"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Chat Content - Iframe - Added scroll container */}
            <div className="relative w-full h-[calc(100%-56px)]">
              <iframe
                ref={iframeRef}
                src="https://ask-the-bros-jorshevel.replit.app"
                className="w-full h-full border-0"
                title="Yard Bros Chat"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                loading="lazy"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
