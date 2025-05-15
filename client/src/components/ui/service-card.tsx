import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GrassAnimation } from '@/components/ui/grass-animation';

export interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  alt: string;
  className?: string;
  index?: number;
}

export function ServiceCard({ 
  title, 
  description, 
  image, 
  alt, 
  className, 
  index = 0 
}: ServiceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Calculate delay for staggered animation
  const staggerDelay = index * 0.1;

  return (
    <motion.div
      className={cn(
        "service-card group relative overflow-hidden rounded-xl bg-background flex flex-col",
        "border border-border shadow-md hover:shadow-lg transition-all duration-300",
        "min-h-[240px] md:min-h-[320px] w-full max-w-[350px] mx-auto",
        "active:scale-[0.98] touch-manipulation", // Better touch feedback
        isExpanded ? "z-10" : "z-0",
        className
      )}
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.3, 
        delay: staggerDelay,
        ease: "easeOut" 
      }}
      viewport={{ once: true }}
      layout="position"
    >
      {/* Card Header with Image */}
      <div 
        className={cn(
          "relative w-full transition-all duration-500 ease-in-out",
          isExpanded ? "h-[120px]" : "h-[180px] md:h-[200px]"
        )}
      >
        <motion.div
          className="absolute inset-0 bg-black/40 z-10"
          animate={{ opacity: isExpanded ? 0.6 : 0.3 }}
          transition={{ duration: 0.3 }}
        />
        
        <img 
          src={image} 
          alt={alt} 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out"
          style={{
            transform: isExpanded ? 'scale(1.15)' : 'scale(1)'
          }}
        />

        {/* Title always visible */}
        <motion.div 
          className="absolute inset-x-0 z-30 p-4 flex flex-col items-start justify-end h-full" 
          animate={{ 
            bottom: isExpanded ? "auto" : 0
          }}
        >
          <h3 className="text-lg md:text-xl font-bold relative mb-1 px-2.5 py-1.5 rounded bg-black/40 backdrop-blur-sm text-white font-heading uppercase">
            <span className="relative z-10">
              {title}
              <motion.div 
                className="absolute -bottom-1 left-0 h-1 bg-accent rounded-full" 
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ delay: staggerDelay + 0.3, duration: 0.4 }}
                viewport={{ once: true }}
              />
            </span>
          </h3>
        </motion.div>
      </div>

      {/* Card Content */}
      <motion.div 
        className="flex-1 flex flex-col p-4"
        layout
      >
        <AnimatePresence mode="wait">
          {isExpanded ? (
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="flex-1 flex flex-col"
            >
              <p className="text-foreground/90 text-sm md:text-base mb-4">{description}</p>
              
              <div className="mt-auto flex flex-col items-center justify-center">
                <div className="flex items-center justify-center mb-2 text-primary">
                  <Shield className="w-5 h-5 mr-2" />
                  <span className="text-sm font-medium">100% Satisfaction Guarantee</span>
                </div>
                
                <a 
                  href="#quotes" 
                  className="mt-2 bg-accent hover:bg-yellow-500 hover:text-white text-white font-medium py-1.5 px-3 rounded text-xs transition-colors text-center inline-block mx-auto"
                >
                  Get a Quote
                </a>
              </div>
            </motion.div>
          ) : (
            <motion.p
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="text-foreground/70 text-sm line-clamp-2"
            >
              {description}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Toggle Button */}
      <motion.button
        className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-primary text-white hover:bg-primary/80 flex items-center justify-center border border-white/10 shadow-md transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isExpanded ? "Show less" : "Show more"}
        title={isExpanded ? "Show less" : "Show more"}
      >
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.button>
    </motion.div>
  );
}