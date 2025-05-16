
import { MessageCircle } from "lucide-react";

export default function ChatSection() {
  return (
    <section id="chat" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Ask The <span className="text-accent">Yard Bros</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have questions about your lawn care needs? Our virtual assistant is here to help! 
            Chat with us about lawn maintenance, sodding, or any landscaping concerns.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-border">
          <div className="flex items-center justify-between bg-primary p-4">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-white" />
              <h3 className="font-heading font-semibold text-lg text-white">Chat with Yard Bros</h3>
            </div>
          </div>
          
          <div className="w-full">
            <iframe
              src="https://ask-the-bros-jorshevel.replit.app/"
              className="w-full h-[700px] border-none bg-white"
              title="Ask The Bros Chat"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
