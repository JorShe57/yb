import { useEffect, useRef, useState } from 'react';

interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

/**
 * A custom hook that detects when an element enters the viewport
 * and can be used to trigger animations based on scroll position.
 * 
 * Elements are visible by default for better UX and smoother page load.
 * This version has optimizations for better performance and smoother scrolling.
 */
export function useScrollAnimation<T extends HTMLElement = HTMLElement>(options: ScrollAnimationOptions = {}) {
  const { 
    threshold = 0.1, 
    rootMargin = '0px', 
    triggerOnce = true 
  } = options;
  
  const ref = useRef<T | null>(null);
  // Start with visible state for smoother initial load
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Use a static observer with passive event handling
    // Uses a more performant approach with requestAnimationFrame
    const currentRef = ref.current;
    if (!currentRef) return;
    
    // Create a shared observer for better performance
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        
        // Use requestAnimationFrame for smoother animations
        if (entry.isIntersecting) {
          requestAnimationFrame(() => {
            setIsVisible(true);
            
            // Unobserve after triggering if needed
            if (triggerOnce && currentRef) {
              observer.unobserve(currentRef);
            }
          });
        } else if (!triggerOnce) {
          requestAnimationFrame(() => {
            setIsVisible(false);
          });
        }
      },
      { 
        threshold, 
        rootMargin
      }
    );

    observer.observe(currentRef);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
};