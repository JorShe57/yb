import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

interface GrassAnimationProps {
  className?: string;
  delay?: number;
  height?: 'short' | 'medium' | 'tall';
  density?: 'sparse' | 'medium' | 'dense';
  color?: 'light' | 'medium' | 'dark';
}

export const GrassAnimation = ({ 
  className = '',
  delay = 0,
  height = 'medium',
  density = 'medium',
  color = 'medium'
}: GrassAnimationProps) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const [isAnimating, setIsAnimating] = useState(false);

  // Set the number of grass blades based on density
  const bladeCount = {
    sparse: 12,
    medium: 20,
    dense: 30
  }[density];
  
  // Set the max height of grass blades based on height prop
  const maxHeight = {
    short: 30,
    medium: 50,
    tall: 70
  }[height];
  
  // Set the color of the grass based on color prop
  const grassColor = {
    light: '#7acb6d',
    medium: '#4c9f3e',
    dark: '#274422'
  }[color];
  
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsAnimating(true);
      }, delay * 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, delay]);
  
  // Generate blades once and memoize them
  const [blades] = useState(() => {
    const generatedBlades = [];
    
    // Reduce the number of blades for better performance
    const actualBladeCount = Math.min(bladeCount, 15);
    
    for (let i = 0; i < actualBladeCount; i++) {
      // Calculate random properties for each blade
      const bladeWidth = Math.random() * 2 + 2; // 2-4px
      const bladeHeight = Math.random() * (maxHeight * 0.4) + (maxHeight * 0.6); // 60-100% of maxHeight
      const left = (i / actualBladeCount) * 100; // Distribute evenly
      const leftVariation = Math.random() * 5 - 2.5; // -2.5 to 2.5 variation
      const rotation = Math.random() * 10 - 5; // -5 to 5 degrees
      const delay = i * 0.02; // More consistent staggered delays
      
      // Use a set of pre-determined colors for better performance
      const bladeColor = i % 2 === 0 ? grassColor : 
                        i % 3 === 0 ? `${grassColor}cc` : `${grassColor}ee`;
      
      generatedBlades.push(
        <motion.div
          key={i}
          className="absolute bottom-0 origin-bottom will-change-transform"
          style={{ 
            left: `${left + leftVariation}%`,
            width: `${bladeWidth}px`,
            backgroundColor: bladeColor,
            zIndex: Math.floor(i % 3)
          }}
          initial={{ height: 0 }}
          animate={isAnimating ? { 
            height: bladeHeight,
            rotateZ: rotation
          } : { height: 0 }}
          transition={{ 
            duration: 0.8, 
            delay: delay, 
            ease: [0.2, 0.8, 0.2, 1] 
          }}
        />
      );
    }
    
    return generatedBlades;
  });
  
  return (
    <div 
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`relative h-16 w-full overflow-hidden ${className}`}
      style={{ 
        transform: 'translateZ(0)',
        willChange: 'transform'
      }}
    >
      {blades}
    </div>
  );
};

// Create a component that transitions a lawn from patchy to lush
export const LawnTransformAnimation = ({
  className = '',
  delay = 0,
  duration = 3
}: {
  className?: string;
  delay?: number;
  duration?: number;
}) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Pre-generate patches for better performance
  const [patches] = useState(() => 
    Array.from({ length: 10 }).map((_, i) => ({
      width: `${Math.random() * 20 + 10}%`,
      height: `${Math.random() * 20 + 10}%`,
      left: `${Math.random() * 80}%`,
      top: `${Math.random() * 80}%`,
    }))
  );

  // Pre-generate blade positions for better performance
  const [blades] = useState(() => 
    Array.from({ length: 30 }).map((_, i) => ({
      left: `${(i / 30) * 100 + (i % 3 === 0 ? 2 : -2)}%`,
      width: `${(i % 3) + 1}px`,
      height: `${20 + (i % 5) * 4}%`,
      delay: 0.2 + i * 0.02,
    }))
  );
  
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsAnimating(true);
      }, delay * 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, delay]);
  
  return (
    <div 
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`relative h-32 w-full overflow-hidden rounded-lg ${className}`}
      style={{ 
        transform: 'translateZ(0)',
        willChange: 'transform'
      }}
    >
      {/* Base ground */}
      <div className="absolute inset-0 bg-yellow-800/30" />
      
      {/* Patchy grass that's visible initially */}
      <div className="absolute inset-0">
        {patches.map((patch, i) => (
          <div
            key={`patch-${i}`}
            className="absolute bg-green-600/40"
            style={{
              width: patch.width,
              height: patch.height,
              left: patch.left,
              top: patch.top,
              borderRadius: '50%',
            }}
          />
        ))}
      </div>
      
      {/* Growing lush grass overlay */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-green-500 to-green-700"
        initial={{ opacity: 0 }}
        animate={isAnimating ? { opacity: 0.85 } : { opacity: 0 }}
        transition={{ duration, ease: [0.2, 0.8, 0.2, 1] }}
      />
      
      {/* Growing grass blades - only render if animating for better performance */}
      {isAnimating && (
        <div className="absolute inset-0">
          {blades.map((blade, i) => (
            <motion.div
              key={`blade-${i}`}
              className="absolute bottom-0 origin-bottom bg-green-500 will-change-transform"
              style={{ 
                left: blade.left,
                width: blade.width,
                zIndex: i % 3,
              }}
              initial={{ height: 0 }}
              animate={{ height: blade.height }}
              transition={{ 
                duration: 0.8, 
                delay: blade.delay,
                ease: [0.2, 0.8, 0.2, 1]
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};