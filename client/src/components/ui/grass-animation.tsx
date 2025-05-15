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
  
  // Generate different blade widths, heights, and positions
  const generateBlades = () => {
    const blades = [];
    
    for (let i = 0; i < bladeCount; i++) {
      // Calculate random properties for each blade
      const bladeWidth = Math.random() * 2 + 2; // 2-4px
      const bladeHeight = Math.random() * (maxHeight * 0.4) + (maxHeight * 0.6); // 60-100% of maxHeight
      const left = (i / bladeCount) * 100; // Distribute evenly with some randomness
      const leftVariation = Math.random() * 5 - 2.5; // -2.5 to 2.5 variation
      const rotation = Math.random() * 10 - 5; // -5 to 5 degrees
      const delay = i * 0.03 + Math.random() * 0.1; // Staggered delays
      
      // Generate a slightly different shade for each blade for realism
      const colorVariation = Math.random() * 15 - 7.5; // -7.5 to 7.5 variation
      const r = parseInt(grassColor.slice(1, 3), 16);
      const g = parseInt(grassColor.slice(3, 5), 16);
      const b = parseInt(grassColor.slice(5, 7), 16);
      
      // Adjust green component for most variation
      const adjustedG = Math.min(255, Math.max(0, g + colorVariation));
      const bladeColor = `rgb(${r}, ${adjustedG}, ${b})`;
      
      blades.push(
        <motion.div
          key={i}
          className="absolute bottom-0 origin-bottom"
          style={{ 
            left: `${left + leftVariation}%`,
            width: `${bladeWidth}px`,
            backgroundColor: bladeColor,
            zIndex: Math.floor(Math.random() * 5),
            rotateY: rotation
          }}
          initial={{ height: 0, rotateX: 0 }}
          animate={isAnimating ? { 
            height: bladeHeight, 
            rotateX: rotation
          } : { height: 0 }}
          transition={{ 
            duration: 1.2 + Math.random() * 0.6, 
            delay: delay, 
            ease: [0.16, 1, 0.3, 1] 
          }}
        />
      );
    }
    
    return blades;
  };
  
  return (
    <div 
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`relative h-16 w-full overflow-hidden ${className}`}
    >
      {generateBlades()}
    </div>
  );
};

// Create a component that transitions a lawn from patchy to lush
export const LawnTransformAnimation = ({
  className = '',
  delay = 0,
  duration = 4
}: {
  className?: string;
  delay?: number;
  duration?: number;
}) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const [isAnimating, setIsAnimating] = useState(false);
  
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
    >
      {/* Base ground */}
      <div className="absolute inset-0 bg-yellow-800/30" />
      
      {/* Patchy grass that's visible initially */}
      <div className="absolute inset-0">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={`patch-${i}`}
            className="absolute bg-green-600/40"
            style={{
              width: `${Math.random() * 30 + 10}%`,
              height: `${Math.random() * 30 + 10}%`,
              left: `${Math.random() * 80}%`,
              top: `${Math.random() * 80}%`,
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
        transition={{ duration, ease: "easeOut" }}
      />
      
      {/* Growing grass blades */}
      {isAnimating && (
        <div className="absolute inset-0">
          {Array.from({ length: 60 }).map((_, i) => (
            <motion.div
              key={`blade-${i}`}
              className="absolute bottom-0 origin-bottom bg-green-500"
              style={{ 
                left: `${(i / 60) * 100 + Math.random() * 4 - 2}%`,
                width: `${Math.random() * 3 + 1}px`,
                zIndex: Math.floor(Math.random() * 5),
              }}
              initial={{ height: 0 }}
              animate={{ height: `${Math.random() * 30 + 20}%` }}
              transition={{ 
                duration: 1.5 + Math.random() * 1, 
                delay: 0.2 + i * 0.02 + Math.random() * 0.1,
                ease: [0.16, 1, 0.3, 1]
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};