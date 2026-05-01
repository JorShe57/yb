import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
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
  // Calculate delay for staggered animation
  const staggerDelay = index * 0.1;

  return (
    <motion.div
      className={cn(
        "service-card group relative overflow-hidden rounded-xl bg-background flex flex-col",
        "border border-border shadow-md hover:shadow-lg transition-all duration-300",
        "min-h-[240px] md:min-h-[320px] w-full",
        "z-0",
        className
      )}
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1]  // Cubic bezier for smoother motion
      }}
      viewport={{ once: true }}
      layoutRoot={true}
    >
      {/* Card Header with Image */}
      <div 
        className={cn(
          "relative w-full overflow-hidden bg-muted/50 rounded-t-xl",
          "h-[180px] md:h-[200px]"
        )}
      >
        <motion.div
          className="absolute inset-0 bg-black/40 z-10"
          animate={{ opacity: 0.35 }}
          transition={{ 
            duration: 0.4,
            ease: [0.4, 0, 0.2, 1]
          }}
        />
        
        <motion.img 
          src={image} 
          alt={alt} 
          className="absolute inset-0 w-full h-full object-cover"
          initial={false}
          animate={{ 
            scale: 1.02
          }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1]
          }}
          style={{
            willChange: 'transform'
          }}
        />

        {/* Title always visible */}
        <motion.div 
          className="absolute inset-x-0 z-30 p-4 flex flex-col items-start justify-end h-full" 
          initial={false}
          animate={{ 
            y: 0,
            opacity: 1
          }}
          transition={{
            duration: 0.4,
            ease: [0.4, 0, 0.2, 1]
          }}
        >
          <h3 className="text-lg md:text-xl font-bold relative z-10 mb-1 px-3 py-2 rounded-md bg-secondary text-white font-heading uppercase shadow-md drop-shadow-sm">
            {title}
          </h3>
        </motion.div>
      </div>

      {/* Card Content */}
      <motion.div 
        className="flex-1 flex flex-col p-4"
        layout
      >
        <p className="text-foreground/80 text-sm md:text-base line-clamp-3">
          {description}
        </p>

        <div className="mt-4 flex items-center gap-2 text-primary">
          <Shield className="w-4 h-4" aria-hidden />
          <span className="text-xs font-medium">Satisfaction-first workmanship</span>
        </div>

        <div className="mt-4">
          <a
            href="#quotes"
            className="inline-flex items-center justify-center rounded-md bg-accent px-3 py-2 text-xs font-semibold text-accent-foreground shadow-sm transition-colors hover:bg-accent/90"
          >
            Get a Quote
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}