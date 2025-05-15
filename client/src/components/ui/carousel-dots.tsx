import * as React from 'react';
import { cn } from '@/lib/utils';

interface CarouselDotsProps {
  count: number;
  activeIndex?: number;
  className?: string;
  onDotClick?: (index: number) => void;
}

export function CarouselDots({ 
  count, 
  activeIndex = 0, 
  className = '',
  onDotClick
}: CarouselDotsProps) {
  return (
    <div className={cn('flex justify-center gap-1.5 mt-4', className)}>
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          type="button"
          className={cn(
            'h-2 w-2 rounded-full p-0 transition-colors',
            activeIndex === index 
              ? 'bg-primary' 
              : 'bg-muted hover:bg-muted/80'
          )}
          onClick={() => onDotClick?.(index)}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
}