import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ScrollIndicatorProps {
  className?: string;
  color?: string;
  height?: number; 
}

/**
 * A visual indicator showing the current scroll progress through the document
 */
export function ScrollIndicator({ 
  className = '',
  color = 'var(--primary)',
  height = 3
}: ScrollIndicatorProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Use throttling to avoid performance issues
  useEffect(() => {
    let ticking = false;
    
    const updateScrollProgress = () => {
      // Calculate scroll progress as percentage
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (scrollTop / scrollHeight) * 100;
      
      setScrollProgress(progress);
      ticking = false;
    };
    
    const handleScroll = () => {
      if (!ticking) {
        // Use rAF to throttle updates
        window.requestAnimationFrame(updateScrollProgress);
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial calculation
    updateScrollProgress();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div 
      className={`fixed top-0 left-0 right-0 z-50 w-full overflow-hidden ${className}`}
      style={{ height: `${height}px` }}
    >
      <motion.div 
        className="h-full"
        style={{ 
          backgroundColor: color,
          transformOrigin: 'left',
          willChange: 'transform'
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scrollProgress / 100 }}
        transition={{ ease: 'easeOut', duration: 0.2 }}
      />
    </div>
  );
}