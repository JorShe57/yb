import React, { useEffect, useRef } from 'react';

interface SmoothScrollProps {
  children: React.ReactNode;
  className?: string;
  speed?: number; // 0-1, where 1 is normal speed and lower values are slower
}

/**
 * SmoothScroll component provides a smoother scrolling experience
 * by implementing a performant, non-hijacking smooth scroll effect.
 */
export function SmoothScroll({ 
  children, 
  className = '', 
  speed = 0.9 
}: SmoothScrollProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | null>(null);
  const previousScrollY = useRef<number>(0);
  const currentScrollY = useRef<number>(0);
  
  const handleScroll = () => {
    // Update target scroll position
    currentScrollY.current = window.scrollY;
  };
  
  const smoothScrollAnimation = () => {
    // Calculate smooth scroll effect
    previousScrollY.current += (currentScrollY.current - previousScrollY.current) * speed;
    
    // Apply transform to create the smooth effect
    if (contentRef.current) {
      contentRef.current.style.transform = `translate3d(0, ${-previousScrollY.current}px, 0)`;
    }
    
    // Continue animation loop
    requestRef.current = requestAnimationFrame(smoothScrollAnimation);
  };
  
  useEffect(() => {
    // Initial scroll position
    previousScrollY.current = window.scrollY;
    currentScrollY.current = window.scrollY;
    
    // Start animation loop
    requestRef.current = requestAnimationFrame(smoothScrollAnimation);
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Cleanup
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed]);
  
  return (
    <div 
      ref={scrollContainerRef}
      className={`smooth-scroll-container ${className}`}
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden'
      }}
    >
      <div 
        ref={contentRef}
        className="smooth-scroll-content"
        style={{ 
          willChange: 'transform',
          transform: 'translate3d(0, 0, 0)',
          transformStyle: 'preserve-3d',
          backfaceVisibility: 'hidden'
        }}
      >
        {children}
      </div>
    </div>
  );
}