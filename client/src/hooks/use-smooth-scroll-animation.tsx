import { useEffect, useRef, useState } from 'react';

interface SmoothScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

/**
 * A custom hook that detects when an element enters the viewport
 * and can be used to trigger animations based on scroll position.
 * 
 * This version is optimized for performance with smoother animations.
 */
export function useSmoothScrollAnimation(options: SmoothScrollAnimationOptions = {}) {
  const { 
    threshold = 0.1, 
    rootMargin = '0px', 
    triggerOnce = true 
  } = options;
  
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        
        if (entry.isIntersecting) {
          // Use requestAnimationFrame for smoother animations
          requestAnimationFrame(() => {
            setIsVisible(true);
            
            // Unobserve after triggering if needed
            if (triggerOnce) {
              observer.unobserve(currentRef);
            }
          });
        } else if (!triggerOnce) {
          requestAnimationFrame(() => {
            setIsVisible(false);
          });
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(currentRef);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
}

/**
 * A simpler version that just uses a boolean flag rather than complex transitions
 */
export function useInView(options: SmoothScrollAnimationOptions = {}) {
  const { 
    threshold = 0.1, 
    rootMargin = '0px' 
  } = options;
  
  const ref = useRef<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          setIsInView(entry.isIntersecting);
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(currentRef);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  return { ref, isInView };
}