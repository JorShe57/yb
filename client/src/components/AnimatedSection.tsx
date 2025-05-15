import React, { ReactNode, useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

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
 * Uses Framer Motion for smoother animations.
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
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Use the first entry (our component)
        const [entry] = entries;
        
        // Set state based on intersection
        if (entry.isIntersecting) {
          setIsInView(true);
          // Once it's in view, we can stop observing if we want to trigger just once
          observer.unobserve(entry.target);
        }
      },
      {
        // The threshold indicates what percentage of the element should be visible
        threshold,
        // Adding some margin to trigger a bit earlier or later
        rootMargin: '0px',
      }
    );

    // Start observing when component mounts
    if (ref.current) {
      observer.observe(ref.current);
    }

    // Cleanup observer on unmount
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  // Get animation variants based on animation type
  const getAnimationVariants = () => {
    switch (animation) {
      case 'fade':
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 }
        };
      case 'from-left':
        return {
          hidden: { x: -100, opacity: 0 },
          visible: { x: 0, opacity: 1 }
        };
      case 'from-right':
        return {
          hidden: { x: 100, opacity: 0 },
          visible: { x: 0, opacity: 1 }
        };
      case 'from-top':
        return {
          hidden: { y: -100, opacity: 0 },
          visible: { y: 0, opacity: 1 }
        };
      case 'from-bottom':
        return {
          hidden: { y: 100, opacity: 0 },
          visible: { y: 0, opacity: 1 }
        };
      case 'scale':
        return {
          hidden: { scale: 0.8, opacity: 0 },
          visible: { scale: 1, opacity: 1 }
        };
      case 'stagger':
        return {
          hidden: { opacity: 0 },
          visible: (i = 1) => ({
            opacity: 1,
            transition: { 
              staggerChildren: 0.1,
              delayChildren: delay,
              staggerDirection: 1
            }
          })
        };
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 }
        };
    }
  };

  // Get transition properties
  const getTransitionProps = () => {
    let easingFunction;
    
    switch (transition) {
      case 'smooth':
        easingFunction = [0.4, 0, 0.2, 1]; // ease-in-out
        break;
      case 'sharp':
        easingFunction = [0.4, 0, 0.6, 1]; // ease-in
        break;
      case 'regular':
      default:
        easingFunction = [0.25, 0.1, 0.25, 1]; // ease
        break;
    }

    return {
      duration,
      delay,
      ease: easingFunction
    };
  };

  return (
    <motion.section
      id={id}
      ref={ref}
      className={cn(
        showTransitionToNext && 'section-transition',
        className
      )}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={getAnimationVariants()}
      transition={getTransitionProps()}
      style={{
        willChange: 'transform, opacity',
        transform: 'translateZ(0)'
      }}
    >
      {children}
    </motion.section>
  );
};

export default AnimatedSection;