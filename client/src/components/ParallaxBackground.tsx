import { useEffect, useState, useRef } from 'react';

type ParallaxBackgroundProps = {
  imageUrl: string;
  speed?: number; // A value between 0.1 and 0.5 is recommended
  children?: React.ReactNode;
  className?: string;
};

export default function ParallaxBackground({ 
  imageUrl, 
  speed = 0.15, 
  children, 
  className = '' 
}: ParallaxBackgroundProps) {
  const [offset, setOffset] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      // Get the distance from the top of the document to the section
      const rect = sectionRef.current.getBoundingClientRect();
      const elementTop = rect.top + window.scrollY;
      const elementCenter = elementTop + rect.height / 2;
      
      // Calculate the relative distance from the middle of the viewport
      const viewportCenter = window.scrollY + window.innerHeight / 2;
      const distanceFromCenter = elementCenter - viewportCenter;
      
      // Use this distance to calculate the parallax effect
      const parallaxOffset = distanceFromCenter * speed;
      
      setOffset(parallaxOffset);
    };
    
    window.addEventListener('scroll', handleScroll);
    // Run once on mount to set initial position
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed]);
  
  const backgroundStyle = {
    backgroundImage: `url(${imageUrl})`,
    backgroundPosition: `center ${50 + (offset * 0.15)}%`,
    backgroundSize: 'cover',
    transform: `translateY(${offset * 0.5}px)`,
    transition: 'transform 0.2s ease-out, background-position 0.2s ease-out',
    filter: 'brightness(1.05)',
  };
  
  return (
    <div ref={sectionRef} className={`relative overflow-hidden ${className}`}>
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={backgroundStyle}
      />
      <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}