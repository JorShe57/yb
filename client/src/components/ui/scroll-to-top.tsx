import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ScrollToTopProps {
  showAfter?: number; // Number of pixels to scroll before showing button
  className?: string;
}

export function ScrollToTop({ showAfter = 300, className }: ScrollToTopProps) {
  const [isVisible, setIsVisible] = useState(false);

  // Show button after scrolling down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > showAfter) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, [showAfter]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-24 right-6 z-40 p-3 rounded-full bg-primary/90 text-white shadow-lg backdrop-blur-sm hover:bg-primary transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none",
        className
      )}
      aria-label="Scroll to top"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}