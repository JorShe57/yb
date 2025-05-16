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
    ? "bg-gradient-to-r from-yellow-500/80 to-green-600/80 backdrop-blur-sm"
    : "bg-gradient-to-r from-blue-600/80 to-green-700/80 backdrop-blur-sm";

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
      layout="position"
      transition={{ 
        layout: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } 
      }}
    >
      <motion.div 
        className="relative w-full"
        animate={{ 
          height: isExpanded ? '250px' : '400px'
        }}
        transition={{ 
          duration: 0.4,
          ease: [0.4, 0, 0.2, 1]
        }}
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
            className={`inline-block ${titleStyle} px-4 py-2 rounded-md border border-white/20 shadow-lg`}
            animate={{ opacity: isExpanded ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-white font-heading font-bold text-lg md:text-xl">
              {name}
              {isSunGold && (
                <span className="flex items-center text-xs font-normal mt-1 opacity-90">
                  <span className="inline-block w-3 h-3 rounded-full bg-yellow-300 mr-1.5"></span>
                  Kentucky/Rye Blend
                </span>
              )}
              {isShadeBlend && (
                <span className="flex items-center text-xs font-normal mt-1 opacity-90">
                  <span className="inline-block w-3 h-3 rounded-full bg-blue-300 mr-1.5"></span>
                  Fescue/Blue Blend
                </span>
              )}
            </h3>
          </motion.div>
        </div>
      </motion.div>
      
      <motion.div 
        className="p-5 relative z-10 bg-background"
        layout="position"
        transition={{ 
          layout: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
        }}
      >
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
              <motion.p 
                className="text-foreground/90 text-sm md:text-base"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {description}
              </motion.p>
              
              {/* When to Use Section */}
              {whenToUse.length > 0 && (
                <motion.div
                  className={`mt-4 p-3 rounded-lg border ${
                    isSunGold 
                      ? "bg-yellow-500/5 border-yellow-500/20" 
                      : "bg-blue-500/5 border-blue-500/20"
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <h4 className={`text-sm font-semibold mb-2 ${
                    isSunGold ? "text-yellow-600 dark:text-yellow-500" : "text-blue-600 dark:text-blue-500"
                  }`}>When to Use:</h4>
                  <ul className="space-y-2">
                    {whenToUse.map((item, idx) => (
                      <li key={idx} className="flex items-start text-sm">
                        <Check size={16} className={`mt-0.5 mr-2 flex-shrink-0 ${
                          isSunGold ? "text-yellow-600 dark:text-yellow-500" : "text-blue-600 dark:text-blue-500"
                        }`} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
              
              {/* Additional Benefits Section */}
              {benefits.length > 0 && (
                <motion.div
                  className={`mt-4 p-3 rounded-lg border ${
                    isSunGold 
                      ? "bg-green-500/5 border-green-500/20" 
                      : "bg-teal-500/5 border-teal-500/20"
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h4 className={`text-sm font-semibold mb-2 ${
                    isSunGold ? "text-green-600 dark:text-green-500" : "text-teal-600 dark:text-teal-500"
                  }`}>Additional Benefits:</h4>
                  <ul className="space-y-2">
                    {benefits.map((item, idx) => (
                      <li key={idx} className="flex items-start text-sm">
                        <Check size={16} className={`mt-0.5 mr-2 flex-shrink-0 ${
                          isSunGold ? "text-green-600 dark:text-green-500" : "text-teal-600 dark:text-teal-500"
                        }`} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
              
              <motion.div 
                className="grid grid-cols-2 gap-2 mt-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                {features.map((feature, idx) => (
                  <div 
                    key={idx} 
                    className={`flex flex-col p-2 rounded-lg ${
                      isSunGold
                        ? "bg-gradient-to-br from-yellow-500/10 to-green-500/10 border border-yellow-500/10"
                        : "bg-gradient-to-br from-blue-500/10 to-teal-500/10 border border-blue-500/10"
                    }`}
                  >
                    <span className={`text-xs ${
                      isSunGold ? "text-yellow-700 dark:text-yellow-400" : "text-blue-700 dark:text-blue-400"
                    }`}>
                      {feature.label}
                    </span>
                    <span className="text-sm font-medium">{feature.value}</span>
                  </div>
                ))}
              </motion.div>
              
              <motion.div 
                className="pt-4 pb-6 flex justify-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <a 
                  href="#quotes" 
                  className={`block w-auto mx-auto font-medium py-1.5 px-5 rounded-md text-center transition-colors flex items-center justify-center gap-2 shadow-md ${
                    isSunGold
                      ? "bg-gradient-to-r from-yellow-500 to-green-600 text-white hover:from-yellow-500 hover:to-yellow-500 hover:text-primary"
                      : "bg-gradient-to-r from-blue-600 to-teal-600 text-white hover:from-blue-400 hover:to-blue-400 hover:text-blue-700"
                  }`}
                >
                  <Zap size={14} />
                  <span className="text-sm">Get a Quote</span>
                </a>
              </motion.div>
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
                  isSunGold ? "bg-yellow-500" : "bg-blue-500"
                }`}></div>
                <span className={`text-xs font-medium ${
                  isSunGold ? "text-yellow-600 dark:text-yellow-500" : "text-blue-600 dark:text-blue-500"
                }`}>
                  {isSunGold ? "Full Sun Premium Blend" : "Shade Tolerant Premium Blend"}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Toggle expand button */}
        <motion.button
          className={`absolute bottom-5 right-4 w-8 h-8 rounded-full flex items-center justify-center shadow-md border border-white/20 transition-colors ${
            isSunGold 
              ? 'bg-gradient-to-br from-yellow-500 to-green-600 text-white hover:from-yellow-500 hover:to-yellow-500 hover:text-primary'
              : 'bg-gradient-to-br from-blue-600 to-teal-600 text-white hover:from-blue-400 hover:to-blue-400 hover:text-blue-700'
          }`}
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
      </motion.div>
    </motion.div>
  );
}