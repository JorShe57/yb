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
 */
export const useScrollAnimation = <T extends HTMLElement = HTMLElement>(options: ScrollAnimationOptions = {}) => {
  const { 
    threshold = 0.1, 
    rootMargin = '0px', 
    triggerOnce = true 
  } = options;
  
  const ref = useRef<T | null>(null);
  // Always start with elements visible for smoother experience
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Only set up observer if we want elements to animate on scroll
    // Otherwise just leave everything visible by default
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Just track intersection and unobserve once triggered
        if (entry.isIntersecting) {
          if (triggerOnce && ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      { threshold, rootMargin }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
};