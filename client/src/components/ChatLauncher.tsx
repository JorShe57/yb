
import { useEffect, useState } from "react";
import chatImage from "@assets/Screenshot 2025-09-04 at 9.08.45 AM.png";

export default function ChatSection() {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Create and inject the enhanced chat styles
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0px) scale(1); }
        25% { transform: translateY(-3px) scale(1.02); }
        50% { transform: translateY(-6px) scale(1.05); }
        75% { transform: translateY(-3px) scale(1.02); }
      }

      @keyframes pulse {
        0% { box-shadow: 0 4px 12px rgba(47, 109, 47, 0.3), 0 0 0 0 rgba(47, 109, 47, 0.4); }
        70% { box-shadow: 0 4px 12px rgba(47, 109, 47, 0.3), 0 0 0 10px rgba(47, 109, 47, 0); }
        100% { box-shadow: 0 4px 12px rgba(47, 109, 47, 0.3), 0 0 0 0 rgba(47, 109, 47, 0); }
      }

      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translateY(20px) scale(0.8);
        }
        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      @keyframes slideOut {
        from {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        to {
          opacity: 0;
          transform: translateY(20px) scale(0.8);
        }
      }

      #chat-launcher-container {
        position: fixed;
        bottom: 35px;
        right: 24px;
        z-index: 9999;
        text-align: center;
        font-family: 'Inter', sans-serif;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }

      #chat-launcher-container.hidden {
        opacity: 0;
        transform: translateY(20px);
        pointer-events: none;
      }

      #chat-launcher-label {
        margin-bottom: 8px;
        font-size: 14px;
        color: #2f6d2f;
        font-weight: 600;
        background: linear-gradient(135deg, #ffffff 0%, #f8fffe 100%);
        padding: 6px 12px;
        border-radius: 20px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.05);
        border: 1px solid rgba(47, 109, 47, 0.1);
        backdrop-filter: blur(10px);
        white-space: nowrap;
        opacity: 0;
        animation: slideIn 0.5s ease-out 0.5s forwards;
        position: relative;
        overflow: hidden;
      }

      #chat-launcher-label::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(47, 109, 47, 0.1), transparent);
        transition: left 0.5s;
      }

      #chat-launcher-label:hover::before {
        left: 100%;
      }

      #chat-launcher {
        background: linear-gradient(135deg, #ffffff 0%, #f8fffe 100%);
        border: 2px solid rgba(47, 109, 47, 0.2);
        border-radius: 50%;
        width: 90px;
        height: 90px;
        padding: 0;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        animation: float 4s ease-in-out infinite, pulse 2s infinite;
        position: relative;
        overflow: hidden;
      }

      #chat-launcher::before {
        content: '';
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        background: linear-gradient(45deg, #2f6d2f, #4a9d4a, #66bb6a, #2f6d2f);
        border-radius: 50%;
        z-index: -1;
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      
      #chat-launcher:hover {
        transform: scale(1.1);
        border-color: rgba(47, 109, 47, 0.4);
      }

      #chat-launcher:hover::before {
        opacity: 1;
      }

      #chat-launcher:active {
        transform: scale(0.95);
      }
      
      #chat-launcher img {
        width: 75%;
        height: 75%;
        border-radius: 8px;
        object-fit: contain;
        background: white;
        padding: 6px;
        transition: all 0.3s ease;
        filter: brightness(1.1) contrast(1.1);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      #chat-launcher:hover img {
        filter: brightness(1.2) contrast(1.2);
      }

      #chat-container {
        position: fixed;
        bottom: 100px;
        right: 24px;
        width: 520px;
        height: 600px;
        max-height: calc(100vh - 120px);
        border-radius: 16px;
        box-shadow: 0 20px 40px rgba(0,0,0,0.2), 0 10px 20px rgba(0,0,0,0.1);
        display: none;
        z-index: 9998;
        background: white;
        overflow: hidden;
        border: 1px solid rgba(47, 109, 47, 0.1);
        backdrop-filter: blur(20px);
      }

      #chat-container.open {
        animation: slideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      }

      #chat-container.closing {
        animation: slideOut 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      #chat-mask {
        position: absolute;
        top: 70px;
        left: 0;
        right: 0;
        height: 100px;
        background: linear-gradient(180deg, rgba(248, 250, 252, 0.98) 0%, rgba(248, 250, 252, 0.8) 50%, transparent 100%);
        z-index: 1;
        pointer-events: none;
      }

      #chat-header {
        background: linear-gradient(135deg, #2f6d2f 0%, #4a9d4a 50%, #3c9a3c 100%);
        padding: 16px 20px;
        text-align: center;
        color: white;
        font-weight: 600;
        font-size: 16px;
        border-radius: 16px 16px 0 0;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        position: relative;
        overflow: hidden;
        box-shadow: 0 2px 10px rgba(47, 109, 47, 0.3);
      }

      #chat-header::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%);
        transform: translateX(-100%);
        transition: transform 0.6s;
      }

      #chat-header:hover::before {
        transform: translateX(100%);
      }

      #chat-header img {
        width: 70px;
        height: 70px;
        border-radius: 8px;
        object-fit: contain;
        background: white;
        padding: 4px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        transition: all 0.3s ease;
      }

      #chat-header:hover img {
        transform: scale(1.05);
        border-color: rgba(255, 255, 255, 0.5);
      }

      #chat-frame {
        width: 100%;
        height: calc(100% - 160px);
        border: none;
        border-radius: 0 0 16px 16px;
        background: #fafafa;
      }

      /* Notification dot for new messages */
      #chat-launcher::after {
        content: '';
        position: absolute;
        top: 8px;
        right: 8px;
        width: 12px;
        height: 12px;
        background: linear-gradient(135deg, #ff4444, #ff6666);
        border-radius: 50%;
        border: 2px solid white;
        opacity: 0;
        transform: scale(0);
        transition: all 0.3s ease;
      }

      #chat-launcher.has-notification::after {
        opacity: 1;
        transform: scale(1);
        animation: pulse 1.5s infinite;
      }

      @media screen and (max-width: 500px) {
        #chat-container {
          width: calc(100vw - 32px);
          height: calc(100vh - 140px);
          right: 16px;
          bottom: 90px;
          border-radius: 12px;
          top: auto;
        }

        #chat-launcher-container {
          bottom: 50px;
          right: 16px;
        }

        #chat-launcher {
          width: 80px;
          height: 80px;
        }

        #chat-launcher-label {
          font-size: 12px;
          padding: 4px 10px;
        }

        #chat-header {
          padding: 14px 16px;
          font-size: 15px;
        }

        #chat-header img {
          width: 65px;
          height: 65px;
        }
      }

      /* Dark mode support */
      @media (prefers-color-scheme: dark) {
        #chat-launcher-label {
          background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
          color: #66bb6a;
          border-color: rgba(102, 187, 106, 0.2);
        }

        #chat-launcher {
          background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
          border-color: rgba(102, 187, 106, 0.3);
        }

        #chat-container {
          background: #1a1a1a;
          border-color: rgba(102, 187, 106, 0.2);
        }

        #chat-mask {
          background: linear-gradient(180deg, rgba(26, 26, 26, 0.98) 0%, rgba(26, 26, 26, 0.8) 50%, transparent 100%);
        }
      }
    `;
    
    document.head.appendChild(styleElement);

    // Create chat container with enhanced structure
    const chatContainer = document.createElement('div');
    chatContainer.id = 'chat-container';
    chatContainer.style.display = 'none';
    
    // Create enhanced chat header
    const chatHeader = document.createElement('div');
    chatHeader.id = 'chat-header';
    
    // Add house icon to header with better styling
    const headerImg = document.createElement('img');
    headerImg.src = chatImage;
    headerImg.alt = 'Yard Bros';
    headerImg.onerror = function() {
      // Fallback if image doesn't load
      this.style.display = 'none';
    };
    
    const headerText = document.createElement('span');
    headerText.textContent = 'Chat with the Bros';
    
    chatHeader.appendChild(headerImg);
    chatHeader.appendChild(headerText);
    
    // Create chat iframe with enhanced loading
    const chatFrame = document.createElement('iframe');
    chatFrame.id = 'chat-frame';
    chatFrame.src = 'https://ask-the-bros-jorshevel.replit.app?hideImage=true';
    chatFrame.allow = 'clipboard-write';
    chatFrame.loading = 'lazy';
    
    // Enhanced iframe load handling
    chatFrame.onload = function() {
      try {
        const iframeDoc = chatFrame.contentDocument || chatFrame.contentWindow?.document;
        if (iframeDoc) {
          const style = iframeDoc.createElement('style');
          style.textContent = `
            #chatbox h3 img { display: none !important; }
            #chatbox h3 { margin-bottom: 0.5em !important; }
            body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif !important; }
          `;
          iframeDoc.head.appendChild(style);
        }
      } catch (e) {
        console.log('Cannot modify iframe content due to CORS policy');
      }
    };
    
    // Create enhanced mask
    const chatMask = document.createElement('div');
    chatMask.id = 'chat-mask';
    
    // Build chat container
    chatContainer.appendChild(chatHeader);
    chatContainer.appendChild(chatFrame);
    chatContainer.appendChild(chatMask);
    document.body.appendChild(chatContainer);

    // Create enhanced chat launcher container
    const chatLauncherContainer = document.createElement('div');
    chatLauncherContainer.id = 'chat-launcher-container';
    
    // Create enhanced chat launcher label
    const chatLauncherLabel = document.createElement('div');
    chatLauncherLabel.id = 'chat-launcher-label';
    chatLauncherLabel.textContent = 'Chat with the Bros';
    
    // Create enhanced chat launcher button
    const chatLauncher = document.createElement('button');
    chatLauncher.id = 'chat-launcher';
    chatLauncher.setAttribute('aria-label', 'Open chat with Yard Bros');
    chatLauncher.setAttribute('title', 'Chat with the Bros - Get instant help!');
    
    // Enhanced click handler with animations
    chatLauncher.onclick = function() {
      setIsAnimating(true);
      const chat = document.getElementById('chat-container');
      if (chat) {
        if (chat.style.display === 'block') {
          // Closing animation
          chat.classList.add('closing');
          setTimeout(() => {
            chat.style.display = 'none';
            chat.classList.remove('closing');
            setIsAnimating(false);
          }, 400);
        } else {
          // Opening animation
          chat.style.display = 'block';
          chat.classList.add('open');
          setTimeout(() => {
            chat.classList.remove('open');
            setIsAnimating(false);
          }, 400);
        }
      }
    };
    
    // Create and add enhanced image to button
    const chatLauncherImg = document.createElement('img');
    chatLauncherImg.src = chatImage;
    chatLauncherImg.alt = 'Chat with Yard Bros';
    chatLauncherImg.onerror = function() {
      // Fallback: create a text-based button
      chatLauncher.innerHTML = '<span style="font-size: 24px; font-weight: bold; color: #2f6d2f;">YB</span>';
    };
    chatLauncher.appendChild(chatLauncherImg);
    
    // Build enhanced chat launcher container
    chatLauncherContainer.appendChild(chatLauncherLabel);
    chatLauncherContainer.appendChild(chatLauncher);
    
    // Add chat launcher to document with entrance animation
    document.body.appendChild(chatLauncherContainer);
    
    // Add scroll-based visibility control
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const shouldShow = scrollTop > 100;
      
      if (shouldShow && !isVisible) {
        setIsVisible(true);
        chatLauncherContainer.classList.remove('hidden');
      } else if (!shouldShow && isVisible) {
        setIsVisible(false);
        chatLauncherContainer.classList.add('hidden');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Simulate notification after 5 seconds (optional)
    setTimeout(() => {
      if (chatLauncher) {
        chatLauncher.classList.add('has-notification');
        setTimeout(() => {
          chatLauncher.classList.remove('has-notification');
        }, 10000); // Remove after 10 seconds
      }
    }, 5000);
    
    // Clean up function
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
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isVisible]);

  return null;
}
