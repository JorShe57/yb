import { useState } from "react";

export default function ChatLauncher() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      text: "Hello! How can we help with your landscaping needs today?",
      sender: "bot"
    }
  ]);
  
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };
  
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
    <div className="fixed bottom-6 right-6 z-50">
      <div className={`chat-container bg-white rounded-lg shadow-xl overflow-hidden mb-4 w-80 h-96 ${isChatOpen ? 'open' : ''}`}>
        <div className="bg-primary text-white p-3 flex justify-between items-center">
          <h3 className="font-heading font-semibold">Chat with Us</h3>
          <button 
            onClick={toggleChat}
            className="text-white hover:text-accent focus:outline-none"
            aria-label="Close chat"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="p-4 h-[calc(100%-52px)] flex flex-col">
          <div className="chat-messages space-y-3 overflow-y-auto flex-grow mb-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex items-start ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                <div 
                  className={`rounded-lg py-2 px-3 max-w-[80%] ${
                    msg.sender === 'user' 
                      ? 'bg-accent text-white ml-auto' 
                      : 'bg-primary text-white'
                  }`}
                >
                  <p>{msg.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="chat-input mt-auto">
            <div className="flex">
              <input 
                type="text"
                value={message}
                onChange={handleMessageChange}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..." 
                className="flex-grow px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button 
                onClick={sendMessage}
                className="bg-primary hover:bg-green-700 text-white px-4 py-2 rounded-r-lg"
                aria-label="Send message"
              >
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <button 
        onClick={toggleChat}
        className="bg-primary hover:bg-green-700 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg transition-colors focus:outline-none"
        aria-label={isChatOpen ? "Close chat" : "Open chat"}
      >
        <i className="fas fa-comments text-2xl"></i>
      </button>
    </div>
  );
}
