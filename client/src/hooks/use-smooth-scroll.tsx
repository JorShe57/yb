import { useCallback, useEffect } from 'react';

/**
 * Hook to handle smooth scrolling to anchors
 * Uses proper browser-supported smooth scrolling with offset for header
 */
export function useSmoothScroll(headerOffset: number = 80) {
  const scrollToAnchor = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    
    // Only process anchor links
    if (target.tagName === 'A') {
      const anchor = target as HTMLAnchorElement;
      const href = anchor.getAttribute('href');
      
      // Check if it's an internal anchor link
      if (href && href.startsWith('#')) {
        e.preventDefault();
        
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          // Calculate the element's position, accounting for header height
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          // Scroll smoothly to the element
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    }
  }, [headerOffset]);
  
  useEffect(() => {
    // Add event listener for clicks
    document.addEventListener('click', scrollToAnchor);
    
    // Clean up
    return () => {
      document.removeEventListener('click', scrollToAnchor);
    };
  }, [scrollToAnchor]);
}

/**
 * Imperatively scroll to element by ID with smooth scrolling
 */
export function scrollToElement(id: string, headerOffset: number = 80) {
  const element = document.getElementById(id);
  
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}