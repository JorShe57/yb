import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown } from 'lucide-react';

interface SodCardProps {
  name: string;
  description: string;
  image: string;
  features: {
    label: string;
    value: string;
  }[];
  index?: number;
  whenToUse?: string[];
  benefits?: string[];
}

export function SodCard({ 
  name, 
  description, 
  image, 
  features,
  index = 0,
  whenToUse = [],
  benefits = []
}: SodCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Calculate delay for staggered animation
  const animationDelay = index * 0.15;
  
  // Determine if this is the SunGold or Cool Shade blend
  const isSunGold = name.toLowerCase().includes('sungold');
  const isShadeBlend = name.toLowerCase().includes('cool shade');
  
  // Set custom styling based on sod type
  const titleStyle = isSunGold
    ? "bg-secondary/90 backdrop-blur-sm"
    : "bg-secondary/90 backdrop-blur-sm";

  // Use more mobile-friendly animation settings
  const transitionProps = {
    type: "spring",
    bounce: 0.25,
    duration: 0.4
  };

  return (
    <motion.div
      className="group bg-background rounded-xl overflow-hidden shadow-lg border border-border relative"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ 
        opacity: 1, 
        y: 0, 
      }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: animationDelay }}
    >
      <motion.div 
        className="relative w-full"
        animate={{ 
          height: isExpanded ? '250px' : '400px'
        }}
        transition={transitionProps}
      >
        <div 
          className="absolute inset-0 z-10 bg-gradient-to-t from-black/20 via-black/5 to-transparent"
        />
        
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover absolute inset-0"
        />
        
        <motion.div 
          className="absolute bottom-0 left-0 p-4 z-20 w-full"
          animate={{ opacity: isExpanded ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className={`inline-block ${titleStyle} px-4 py-2 rounded-md border border-white/20 shadow-lg`}>
            <h3 className="text-white font-heading font-bold text-lg md:text-xl">
              {name}
              {isSunGold && (
                <span className="flex items-center text-xs font-normal mt-1 opacity-90">
                  <span className="inline-block w-3 h-3 rounded-full bg-secondary mr-1.5"></span>
                  Kentucky/Rye Blend
                </span>
              )}
              {isShadeBlend && (
                <span className="flex items-center text-xs font-normal mt-1 opacity-90">
                  <span className="inline-block w-3 h-3 rounded-full bg-primary mr-1.5"></span>
                  Fescue/Blue Blend
                </span>
              )}
            </h3>
          </div>
        </motion.div>
      </motion.div>
      
      <div className="p-5 relative z-10 bg-background">
        <AnimatePresence mode="wait" initial={false}>
          {isExpanded ? (
            <motion.div
              key="expanded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <p className="text-foreground/90 text-sm md:text-base">
                {description}
              </p>
              
              {/* When to Use Section */}
              {whenToUse.length > 0 && (
                <div
                  className={`mt-4 p-3 rounded-lg border ${
                    isSunGold 
                      ? "bg-secondary/5 border-secondary/20" 
                      : "bg-secondary/5 border-secondary/20"
                  }`}
                >
                  <h4 className={`text-sm font-semibold mb-2 ${
                    isSunGold ? "text-secondary" : "text-secondary"
                  }`}>When to Use:</h4>
                  <ul className="space-y-2">
                    {whenToUse.map((item, idx) => (
                      <li key={idx} className="flex items-start text-sm">
                        <Check size={16} className={`mt-0.5 mr-2 flex-shrink-0 ${
                          isSunGold ? "text-secondary" : "text-secondary"
                        }`} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Additional Benefits Section */}
              {benefits.length > 0 && (
                <div
                  className={`mt-4 p-3 rounded-lg border ${
                    isSunGold 
                      ? "bg-primary/5 border-primary/15" 
                      : "bg-primary/5 border-primary/15"
                  }`}
                >
                  <h4 className={`text-sm font-semibold mb-2 ${
                    isSunGold ? "text-primary" : "text-primary"
                  }`}>Additional Benefits:</h4>
                  <ul className="space-y-2">
                    {benefits.map((item, idx) => (
                      <li key={idx} className="flex items-start text-sm">
                        <Check size={16} className={`mt-0.5 mr-2 flex-shrink-0 ${
                          isSunGold ? "text-primary" : "text-primary"
                        }`} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-2 mt-4">
                {features.map((feature, idx) => (
                  <div 
                    key={idx} 
                    className={`flex flex-col p-2 rounded-lg ${
                      isSunGold
                        ? "bg-secondary/5 border border-secondary/10"
                        : "bg-secondary/5 border border-secondary/10"
                    }`}
                  >
                    <span className={`text-xs ${
                      isSunGold ? "text-secondary" : "text-secondary"
                    }`}>
                      {feature.label}
                    </span>
                    <span className="text-sm font-medium">{feature.value}</span>
                  </div>
                ))}
              </div>
              
              <div className="pt-4 pb-6 flex justify-center">
                <a 
                  href="#quotes" 
                  className="block w-auto mx-auto font-medium py-2 px-5 rounded-md text-center transition-colors shadow-md bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  <span className="text-sm">Get a Quote</span>
                </a>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="collapsed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-2"
            >
              <p className="text-foreground/80 line-clamp-2 text-sm">
                {description}
              </p>
              
              <div className="flex items-center">
                <div className={`h-2 w-2 rounded-full mr-2 ${
                  isSunGold ? "bg-secondary" : "bg-secondary"
                }`}></div>
                <span className={`text-xs font-medium ${
                  isSunGold ? "text-secondary" : "text-secondary"
                }`}>
                  {isSunGold ? "Full Sun Premium Blend" : "Shade Tolerant Premium Blend"}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Toggle expand button */}
        <motion.button
          className="absolute bottom-5 right-4 w-8 h-8 rounded-full flex items-center justify-center shadow-md border border-white/20 transition-colors bg-secondary text-secondary-foreground hover:bg-secondary/90"
          onClick={() => setIsExpanded(!isExpanded)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={isExpanded ? "Show less" : "Show more"}
        >
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown size={18} />
          </motion.div>
        </motion.button>
      </div>
    </motion.div>
  );
}