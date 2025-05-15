import React, { useState, useEffect, useRef } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { RefreshCcw } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export function PullToRefresh() {
  const isMobile = useIsMobile();
  const [isPulling, setIsPulling] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const pullY = useSpring(0, { stiffness: 400, damping: 30 });
  const pullOpacity = useTransform(pullY, [0, 50, 100], [0, 0.5, 1]);
  const pullRotation = useTransform(pullY, [0, 100], [0, 360]);
  const startY = useRef(0);
  const currentY = useRef(0);

  // Define all hook calls before any conditionals
  useEffect(() => {
    // Skip for desktop
    if (!isMobile) return;
    
    const handleTouchStart = (e: TouchEvent) => {
      if (window.scrollY <= 0) {
        startY.current = e.touches[0].clientY;
        currentY.current = startY.current;
        setIsPulling(true);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isPulling) {
        currentY.current = e.touches[0].clientY;
        const diff = Math.max(0, currentY.current - startY.current);
        
        // Only react if pulling down from the top of the page
        if (window.scrollY <= 0 && diff > 0) {
          pullY.set(Math.min(100, diff * 0.5)); // Apply resistance
          
          // Prevent default browser overscroll behavior
          if (diff > 10) {
            e.preventDefault();
          }
        }
      }
    };

    const handleTouchEnd = () => {
      if (isPulling) {
        if (pullY.get() > 80) {
          // Trigger refresh
          setIsRefreshing(true);
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          // Reset
          pullY.set(0);
        }
        setIsPulling(false);
      }
    };

    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isPulling, pullY, isMobile]);
  
  // Only render on mobile
  if (!isMobile) return null;

  return (
    <motion.div 
      className="fixed top-0 left-0 w-full flex justify-center pointer-events-none z-50"
      style={{ 
        opacity: pullOpacity,
        y: pullY
      }}
    >
      <div className="bg-primary text-white py-2 px-4 rounded-full mt-4 flex items-center shadow-lg">
        <motion.span 
          style={{ rotate: pullRotation }} 
          className="mr-2"
        >
          <RefreshCcw size={16} />
        </motion.span>
        <span className="text-sm">
          {isRefreshing ? "Refreshing..." : "Pull to refresh"}
        </span>
      </div>
    </motion.div>
  );
}