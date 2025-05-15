import React, { ReactNode, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

interface TouchSwipeHandlerProps {
  children: ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  swipeThreshold?: number;
  className?: string;
}

export function TouchSwipeHandler({
  children,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  swipeThreshold = 50,
  className = "",
}: TouchSwipeHandlerProps) {
  const isMobile = useIsMobile();
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const [isSwiping, setIsSwiping] = useState(false);

  // If not on mobile, just render the children
  if (!isMobile) {
    return <div className={className}>{children}</div>;
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    setIsSwiping(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartRef.current || !isSwiping) return;

    const touch = e.touches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;

    // Prevent default only if handling vertical swipes to avoid interfering with normal scrolling
    if (
      (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > swipeThreshold) &&
      (onSwipeUp || onSwipeDown)
    ) {
      e.preventDefault();
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current || !isSwiping) return;

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;

    if (Math.abs(deltaX) > swipeThreshold) {
      if (deltaX > 0 && onSwipeRight) {
        onSwipeRight();
      } else if (deltaX < 0 && onSwipeLeft) {
        onSwipeLeft();
      }
    }

    if (Math.abs(deltaY) > swipeThreshold) {
      if (deltaY > 0 && onSwipeDown) {
        onSwipeDown();
      } else if (deltaY < 0 && onSwipeUp) {
        onSwipeUp();
      }
    }

    touchStartRef.current = null;
    setIsSwiping(false);
  };

  return (
    <motion.div
      className={className}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {children}
    </motion.div>
  );
}