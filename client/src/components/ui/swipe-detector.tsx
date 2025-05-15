import React, { useRef, useEffect, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface SwipeDetectorProps {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void; 
  onSwipeDown?: () => void;
  minSwipeDistance?: number;
  children: React.ReactNode;
  className?: string;
}

export function SwipeDetector({
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  minSwipeDistance = 50,
  children,
  className = '',
}: SwipeDetectorProps) {
  const isMobile = useIsMobile();
  const startXRef = useRef<number | null>(null);
  const startYRef = useRef<number | null>(null);
  const [isSwiping, setIsSwiping] = useState(false);

  useEffect(() => {
    // Only add touch event listeners on mobile devices
    if (!isMobile) return;

    const element = document.getElementById('swipe-container');
    if (!element) return;

    const handleTouchStart = (e: TouchEvent) => {
      startXRef.current = e.touches[0].clientX;
      startYRef.current = e.touches[0].clientY;
      setIsSwiping(true);
    };

    const handleTouchMove = (e: TouchEvent) => {
      // Prevent default only when swiping to avoid interfering with scrolling
      if (isSwiping && e.cancelable) {
        e.preventDefault();
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!startXRef.current || !startYRef.current) return;
      
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      
      const diffX = endX - startXRef.current;
      const diffY = endY - startYRef.current;
      
      // Check if the swipe distance is significant enough
      if (Math.abs(diffX) > minSwipeDistance || Math.abs(diffY) > minSwipeDistance) {
        // Determine if horizontal swipe is more significant than vertical
        if (Math.abs(diffX) > Math.abs(diffY)) {
          // Horizontal swipe
          if (diffX > 0 && onSwipeRight) {
            onSwipeRight();
          } else if (diffX < 0 && onSwipeLeft) {
            onSwipeLeft();
          }
        } else {
          // Vertical swipe
          if (diffY > 0 && onSwipeDown) {
            onSwipeDown();
          } else if (diffY < 0 && onSwipeUp) {
            onSwipeUp();
          }
        }
      }
      
      // Reset state
      startXRef.current = null;
      startYRef.current = null;
      setIsSwiping(false);
    };

    element.addEventListener('touchstart', handleTouchStart, { passive: false });
    element.addEventListener('touchmove', handleTouchMove, { passive: false });
    element.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isMobile, minSwipeDistance, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, isSwiping]);

  return (
    <div id="swipe-container" className={className}>
      {children}
    </div>
  );
}