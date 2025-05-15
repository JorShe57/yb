import { useEffect, useCallback } from "react";
import { useIsMobile } from "./use-mobile";

interface SmoothScrollOptions {
  offset?: number;
  behavior?: ScrollBehavior;
}

export function useSmoothScroll(options: SmoothScrollOptions = {}) {
  const isMobile = useIsMobile();
  
  // Default offset accounts for fixed header height
  const defaultOffset = isMobile ? 70 : 90;
  const { 
    offset = defaultOffset, 
    behavior = "smooth" 
  } = options;

  const handleLinkClick = useCallback(
    (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");
      
      if (!link) return;
      
      const href = link.getAttribute("href");
      if (!href || !href.startsWith("#")) return;
      
      const targetId = href.slice(1);
      if (!targetId) return;
      
      const targetElement = document.getElementById(targetId);
      if (!targetElement) return;
      
      e.preventDefault();
      
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior,
      });
    },
    [offset, behavior, isMobile]
  );

  useEffect(() => {
    document.addEventListener("click", handleLinkClick);
    return () => document.removeEventListener("click", handleLinkClick);
  }, [handleLinkClick]);

  // Expose a function to programmatically scroll to an element
  const scrollToElement = useCallback(
    (elementId: string) => {
      const targetElement = document.getElementById(elementId);
      if (!targetElement) return;
      
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior,
      });
    },
    [offset, behavior]
  );

  return { scrollToElement };
}