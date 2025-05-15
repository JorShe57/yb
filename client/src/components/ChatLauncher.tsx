import { useState } from "react";
import { MessageCircle, Send } from "lucide-react";
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarToggle 
} from "@/components/ui/sidebar";

export default function ChatLauncher() {
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
      // Add user message
      setMessages([...messages, { text: message, sender: "user" }]);
      
      // In a real app, you'd send this to a backend
      // For this demo, we'll simulate a response after a delay
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
    <SidebarProvider>
      {/* Chat Sidebar */}
      <Sidebar 
        side="right" 
        width="320px" 
        className="border-l border-primary/10"
      >
        <div className="flex flex-col h-full pt-6">
          <h3 className="font-heading font-semibold text-lg mb-4 text-center">
            Chat with Yard Bros
          </h3>
          
          <div className="chat-messages space-y-3 overflow-y-auto flex-grow mb-4 pr-2">
            {messages.map((msg, index) => (
              <div key={index} className={`flex items-start ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                <div 
                  className={`rounded-lg py-2 px-3 max-w-[85%] ${
                    msg.sender === 'user' 
                      ? 'bg-accent text-white shadow-sm' 
                      : 'bg-primary/90 text-white shadow-sm'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="chat-input mt-auto border-t border-muted pt-4">
            <div className="flex">
              <input 
                type="text"
                value={message}
                onChange={handleMessageChange}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..." 
                className="flex-grow px-3 py-2 text-sm border border-muted rounded-l-lg focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button 
                onClick={sendMessage}
                className="bg-primary hover:bg-primary/90 text-white px-3 py-2 rounded-r-lg transition-colors"
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      </Sidebar>
      
      {/* Chat Toggle Button */}
      <SidebarToggle 
        label="Chat with us"
        side="right"
      />
    </SidebarProvider>
  );
}
