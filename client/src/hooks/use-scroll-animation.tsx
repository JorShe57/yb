import { useEffect, useRef, useState } from 'react';

interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

/**
 * A custom hook that detects when an element enters the viewport
 * and can be used to trigger animations based on scroll position.
 */
export const useScrollAnimation = <T extends HTMLElement = HTMLElement>(options: ScrollAnimationOptions = {}) => {
  const { 
    threshold = 0.1, 
    rootMargin = '0px', 
    triggerOnce = true 
  } = options;
  
  const ref = useRef<T | null>(null);
  // Always visible so content is immediately accessible
  const [isVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Just unobserve after element is visible
        if (entry.isIntersecting && triggerOnce && ref.current) {
          observer.unobserve(ref.current);
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