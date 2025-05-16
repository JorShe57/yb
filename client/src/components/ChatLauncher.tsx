
import { useEffect } from "react";

export default function ChatSection() {
  useEffect(() => {
    // Create and inject the chat styles
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      #chat-launcher-container {
        position: fixed;
        bottom: 24px;
        right: 24px;
        z-index: 9999;
        text-align: center;
        font-family: 'Inter', sans-serif;
      }

      #chat-launcher-label {
        margin-bottom: 6px;
        font-size: 14px;
        color: #2f6d2f;
        font-weight: 600;
        background: #ffffff;
        padding: 2px 8px;
        border-radius: 6px;
        box-shadow: 0 2px 6px rgba(0,0,0,0.1);
      }

      #chat-launcher {
        background: #ffffff;
        border: none;
        border-radius: 50%;
        width: 70px;
        height: 70px;
        padding: 0;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        transition: transform 0.2s ease;
      }
      
      #chat-launcher:hover {
        transform: scale(1.05);
      }
      
      #chat-launcher img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
      }

      #chat-frame {
        position: fixed;
        bottom: 100px;
        right: 24px;
        width: 420px;
        height: 650px;
        max-height: 100vh;
        border: none;
        border-radius: 12px;
        box-shadow: 0 6px 20px rgba(0,0,0,0.3);
        display: none;
        z-index: 9998;
        overflow: auto;
      }

      @media screen and (max-width: 500px) {
        #chat-frame {
          width: 94vw;
          height: 88vh;
          right: 12px;
          bottom: 90px;
        }

        #chat-launcher-container {
          bottom: 16px;
          right: 16px;
        }
      }
    `;
    
    document.head.appendChild(styleElement);

    // Create chat iframe
    const chatFrame = document.createElement('iframe');
    chatFrame.id = 'chat-frame';
    chatFrame.src = 'https://ask-the-bros-jorshevel.replit.app';
    chatFrame.allow = 'clipboard-write';
    chatFrame.style.overflow = 'auto';
    chatFrame.style.display = 'none';
    document.body.appendChild(chatFrame);

    // Create chat launcher container
    const chatLauncherContainer = document.createElement('div');
    chatLauncherContainer.id = 'chat-launcher-container';
    
    // Create chat launcher label
    const chatLauncherLabel = document.createElement('div');
    chatLauncherLabel.id = 'chat-launcher-label';
    chatLauncherLabel.textContent = 'Chat with the Bros';
    
    // Create chat launcher button
    const chatLauncher = document.createElement('button');
    chatLauncher.id = 'chat-launcher';
    chatLauncher.onclick = function() {
      const chat = document.getElementById('chat-frame');
      if (chat) {
        chat.style.display = (chat.style.display === 'block') ? 'none' : 'block';
      }
    };
    
    // Create and add image to button
    const chatLauncherImg = document.createElement('img');
    chatLauncherImg.src = 'https://i.imgur.com/OzIqYPL.jpeg';
    chatLauncherImg.alt = 'Ask the Bros';
    chatLauncher.appendChild(chatLauncherImg);
    
    // Build chat launcher container
    chatLauncherContainer.appendChild(chatLauncherLabel);
    chatLauncherContainer.appendChild(chatLauncher);
    
    // Add chat launcher to document
    document.body.appendChild(chatLauncherContainer);
    
    // Clean up function to remove elements when component unmounts
    return () => {
      document.head.removeChild(styleElement);
      if (document.body.contains(chatFrame)) {
        document.body.removeChild(chatFrame);
      }
      if (document.body.contains(chatLauncherContainer)) {
        document.body.removeChild(chatLauncherContainer);
      }
    };
  }, []);

  // This component doesn't render anything visible directly in its place
  return null;
}
