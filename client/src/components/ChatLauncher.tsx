import { useEffect, useRef } from "react";
import { Send } from "lucide-react";
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarToggle 
} from "@/components/ui/sidebar";

export default function ChatLauncher() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  // Set up a resize observer to adjust the iframe height based on content
  useEffect(() => {
    const handleIframeLoad = () => {
      if (iframeRef.current) {
        // Make sure the iframe takes the full height
        iframeRef.current.style.height = '100%';
      }
    };

    const iframe = iframeRef.current;
    if (iframe) {
      iframe.addEventListener('load', handleIframeLoad);
      return () => {
        iframe.removeEventListener('load', handleIframeLoad);
      };
    }
  }, []);

  return (
    <SidebarProvider>
      {/* Chat Sidebar */}
      <Sidebar 
        side="right" 
        width="380px" 
        className="border-l border-primary/10 overflow-hidden"
      >
        <div className="flex flex-col h-full">
          <h3 className="font-heading font-semibold text-lg py-4 text-center bg-primary text-white">
            Chat with Yard Bros
          </h3>
          
          <div className="flex-grow relative w-full h-full">
            <iframe
              ref={iframeRef}
              src="https://ask-the-bros-jorshevel.replit.app"
              className="w-full h-full border-0"
              title="Yard Bros Chat"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              loading="lazy"
            />
          </div>
        </div>
      </Sidebar>
      
      {/* Chat Toggle Button */}
      <SidebarToggle 
        label="Ask the Yard Bros"
        side="right"
        className="bg-accent hover:bg-accent/90 text-white shadow-md transition-all duration-300 hover:shadow-lg"
      />
    </SidebarProvider>
  );
}
