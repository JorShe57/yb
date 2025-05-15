
import { useState } from "react";
import { Sidebar, SidebarContent, SidebarTrigger } from "@/components/ui/sidebar";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ChatLauncher() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      text: "Hello! How can we help with your landscaping needs today?",
      sender: "bot"
    }
  ]);
  
  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };
  
  const sendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { text: message, sender: "user" }]);
      
      setTimeout(() => {
        setMessages(prev => [...prev, {
          text: "Thanks for reaching out! One of our team members will get back to you shortly.",
          sender: "bot"
        }]);
      }, 1000);
      
      setMessage("");
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };
  
  return (
    <Sidebar
      side="right"
      variant="floating"
      defaultOpen={false}
      className="z-50"
    >
      <SidebarTrigger className="fixed bottom-6 right-6 h-12 w-12 rounded-full bg-primary text-white hover:bg-primary/90">
        <MessageCircle className="h-6 w-6" />
      </SidebarTrigger>
      
      <SidebarContent className="w-80 md:w-96 bg-background">
        <div className="h-full flex flex-col">
          <div className="bg-primary text-white p-3 flex items-center">
            <h3 className="font-heading font-semibold">Chat with Yard Bros</h3>
          </div>
          
          <div className="flex-grow p-4 overflow-auto">
            <div className="space-y-3">
              {messages.map((msg, index) => (
                <div key={index} className={`flex items-start ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                  <div 
                    className={`rounded-lg py-2 px-3 max-w-[80%] ${
                      msg.sender === 'user' 
                        ? 'bg-primary text-white ml-auto' 
                        : 'bg-muted'
                    }`}
                  >
                    <p>{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input 
                type="text"
                value={message}
                onChange={handleMessageChange}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..." 
                className="flex-grow px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button 
                onClick={sendMessage}
                className="shrink-0"
                size="icon"
                aria-label="Send message"
              >
                <i className="fas fa-paper-plane"></i>
              </Button>
            </div>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
