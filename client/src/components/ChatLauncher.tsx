
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

      #chat-container {
        position: fixed;
        bottom: 100px;
        right: 24px;
        width: 420px;
        height: 650px;
        max-height: 100vh;
        border-radius: 12px;
        box-shadow: 0 6px 20px rgba(0,0,0,0.3);
        display: none;
        z-index: 9998;
        background: white;
        overflow: hidden;
      }
      
      #chat-mask {
        position: absolute;
        top: 70px;
        left: 0;
        right: 0;
        height: 100px;
        background: rgba(244, 244, 244, 0.95);
        z-index: 1;
        pointer-events: none;
      }

      #chat-header {
        background: linear-gradient(135deg, #2f6d2f 0%, #3c9a3c 100%);
        padding: 15px;
        text-align: center;
        color: white;
        font-weight: 600;
        border-radius: 12px 12px 0 0;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
      }

      #chat-header img {
        width: 40px;
        height: 40px;
        border-radius: 8px;
        object-fit: cover;
      }

      #chat-frame {
        width: 100%;
        height: calc(100% - 70px);
        border: none;
        border-radius: 0 0 12px 12px;
      }
      
      /* Hide any error messages or broken images from the iframe */
      #chat-frame::after {
        content: '';
        position: absolute;
        top: 70px;
        left: 0;
        right: 0;
        height: 80px;
        background: white;
        z-index: 1;
      }

      @media screen and (max-width: 500px) {
        #chat-container {
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

    // Create chat container
    const chatContainer = document.createElement('div');
    chatContainer.id = 'chat-container';
    chatContainer.style.display = 'none';
    
    // Create chat header
    const chatHeader = document.createElement('div');
    chatHeader.id = 'chat-header';
    
    // Add house icon to header
    const headerImg = document.createElement('img');
    headerImg.src = '/images/house-icon.png';
    headerImg.alt = 'Yard Bros';
    
    const headerText = document.createElement('span');
    headerText.textContent = 'Ask the Bros';
    
    chatHeader.appendChild(headerImg);
    chatHeader.appendChild(headerText);
    
    // Create chat iframe
    const chatFrame = document.createElement('iframe');
    chatFrame.id = 'chat-frame';
    chatFrame.src = 'https://ask-the-bros-jorshevel.replit.app?hideImage=true';
    chatFrame.allow = 'clipboard-write';
    
    // Try to hide the broken image when iframe loads
    chatFrame.onload = function() {
      try {
        // This will only work if the iframe allows cross-origin access
        const iframeDoc = chatFrame.contentDocument || chatFrame.contentWindow?.document;
        if (iframeDoc) {
          const style = iframeDoc.createElement('style');
          style.textContent = `
            #chatbox h3 img { display: none !important; }
            #chatbox h3 { margin-bottom: 0.5em !important; }
          `;
          iframeDoc.head.appendChild(style);
        }
      } catch (e) {
        // Cross-origin restrictions prevent access, which is expected
        console.log('Cannot modify iframe content due to CORS policy');
      }
    };
    
    // Create mask to hide the broken image area in iframe
    const chatMask = document.createElement('div');
    chatMask.id = 'chat-mask';
    
    // Add header, iframe, and mask to container
    chatContainer.appendChild(chatHeader);
    chatContainer.appendChild(chatFrame);
    chatContainer.appendChild(chatMask);
    document.body.appendChild(chatContainer);

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
      const chat = document.getElementById('chat-container');
      if (chat) {
        chat.style.display = (chat.style.display === 'block') ? 'none' : 'block';
      }
    };
    
    // Create and add image to button
    const chatLauncherImg = document.createElement('img');
    chatLauncherImg.src = '/images/house-icon.png';
    chatLauncherImg.alt = 'Ask the Bros';
    chatLauncher.appendChild(chatLauncherImg);
    
    // Build chat launcher container
    chatLauncherContainer.appendChild(chatLauncherLabel);
    chatLauncherContainer.appendChild(chatLauncher);
    
    // Add chat launcher to document
    document.body.appendChild(chatLauncherContainer);
    
    // Clean up function to remove elements when component unmounts
    return () => {
      if (document.head.contains(styleElement)) {
        document.head.removeChild(styleElement);
      }
      if (document.body.contains(chatContainer)) {
        document.body.removeChild(chatContainer);
      }
      if (document.body.contains(chatLauncherContainer)) {
        document.body.removeChild(chatLauncherContainer);
      }
    };
  }, []);

  // This component doesn't render anything visible directly in its place
  return null;
}
