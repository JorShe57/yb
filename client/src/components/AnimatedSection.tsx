import React, { ReactNode } from 'react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { cn } from '@/lib/utils';

export type AnimationType = 
  | 'fade' 
  | 'from-left' 
  | 'from-right' 
  | 'from-top' 
  | 'from-bottom' 
  | 'scale' 
  | 'stagger';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  animation?: AnimationType;
  threshold?: number;
  delay?: number;
  duration?: number;
  transition?: 'smooth' | 'regular' | 'sharp';
  showTransitionToNext?: boolean;
}

/**
 * A wrapper component that animates its children when they come into view.
 */
const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  id,
  animation = 'fade',
  threshold = 0.1,
  delay = 0,
  duration = 1,
  transition = 'regular',
  showTransitionToNext = false,
}) => {
  const { ref, isVisible } = useScrollAnimation({ threshold, triggerOnce: true });

  // Map animation type to CSS classes
  const getAnimationClass = (type: AnimationType): string => {
    switch (type) {
      case 'fade':
        return 'animate-hidden';
      case 'from-left':
        return 'animate-from-left';
      case 'from-right':
        return 'animate-from-right';
      case 'from-top':
        return 'animate-from-top';
      case 'from-bottom':
        return 'animate-from-bottom';
      case 'scale':
        return 'scale-90 opacity-0 transition-all';
      case 'stagger':
        return 'stagger-children';
      default:
        return 'animate-hidden';
    }
  };
  
  // Map transition type to ease function
  const getTransitionStyle = (type: 'smooth' | 'regular' | 'sharp'): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      transitionDelay: `${delay}s`,
      transitionDuration: `${duration}s`,
    };
    
    switch (type) {
      case 'smooth':
        return {
          ...baseStyle,
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)', // ease-in-out
        };
      case 'sharp':
        return {
          ...baseStyle,
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.6, 1)', // ease-in
        };
      case 'regular':
      default:
        return {
          ...baseStyle,
          transitionTimingFunction: 'ease',
        };
    }
  };

  return (
    <section
      id={id}
      ref={ref as React.RefObject<HTMLElement>}
      className={cn(
        getAnimationClass(animation),
        'animate-show', // Always apply animate-show class regardless of visibility
        showTransitionToNext && 'section-transition',
        className
      )}
      style={getTransitionStyle(transition)}
    >
      {children}
    </section>
  );
};

export default AnimatedSection;