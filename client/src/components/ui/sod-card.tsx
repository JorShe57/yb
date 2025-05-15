import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown, Zap } from 'lucide-react';

interface SodCardProps {
  name: string;
  description: string;
  image: string;
  features: {
    label: string;
    value: string;
  }[];
  index?: number;
}

export function SodCard({ 
  name, 
  description, 
  image, 
  features,
  index = 0 
}: SodCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Calculate delay for staggered animation
  const animationDelay = index * 0.15;

  return (
    <motion.div
      className="group bg-background rounded-xl overflow-hidden shadow-lg border border-border relative"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ 
        opacity: 1, 
        y: 0, 
        transition: { duration: 0.5, delay: animationDelay } 
      }}
      viewport={{ once: true, margin: "-100px" }}
      layout
    >
      <div 
        className={`relative w-full transition-all duration-500 ${
          isExpanded ? 'h-[250px]' : 'h-[400px]'
        }`}
      >
        <motion.div 
          className="absolute inset-0 z-10 bg-gradient-to-t from-black/20 via-black/5 to-transparent"
          animate={{ opacity: isExpanded ? 0.2 : 0.1 }}
          transition={{ duration: 0.3 }}
        />
        
        <motion.img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover absolute inset-0"
          animate={{ 
            scale: isExpanded ? 1.02 : 1,
            filter: isExpanded ? 'brightness(1)' : 'brightness(1.05)'
          }}
          transition={{ duration: 0.5 }}
        />
        
        <div className="absolute bottom-0 left-0 p-4 z-20 w-full">
          <motion.div 
            className="inline-block bg-black/60 backdrop-blur-sm px-4 py-2 rounded-md"
            animate={{ opacity: isExpanded ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-white font-heading font-bold text-lg md:text-xl">
              {name}
            </h3>
          </motion.div>
        </div>
      </div>
      
      <motion.div 
        className="p-5 relative z-10 bg-background"
        layout
      >
        <AnimatePresence mode="wait">
          {isExpanded ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <motion.p 
                className="text-foreground/90 text-sm md:text-base"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {description}
              </motion.p>
              
              <motion.div 
                className="grid grid-cols-2 gap-2 mt-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {features.map((feature, idx) => (
                  <div key={idx} className="flex flex-col p-2 bg-muted/50 rounded-lg">
                    <span className="text-xs text-muted-foreground">{feature.label}</span>
                    <span className="text-sm font-medium">{feature.value}</span>
                  </div>
                ))}
              </motion.div>
              
              <motion.div 
                className="pt-4 flex justify-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <a 
                  href="#quotes" 
                  className="block w-full bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-md text-center transition-colors flex items-center justify-center gap-2"
                >
                  <Zap size={16} />
                  Get a Quote
                </a>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-2"
            >
              <p className="text-foreground/80 line-clamp-2 text-sm">
                {description}
              </p>
              
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                <span className="text-xs text-primary font-medium">Premium Quality</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Toggle expand button */}
        <motion.button
          className={`absolute bottom-4 right-4 w-8 h-8 rounded-full flex items-center justify-center shadow-md ${
            isExpanded ? 'bg-primary text-white' : 'bg-accent text-white'
          }`}
          onClick={() => setIsExpanded(!isExpanded)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label={isExpanded ? "Show less" : "Show more"}
        >
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown size={18} />
          </motion.div>
        </motion.button>
      </motion.div>
    </motion.div>
  );
}