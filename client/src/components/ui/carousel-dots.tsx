import React from 'react';
import { useCarousel } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface CarouselDotsProps {
  count: number;
  className?: string;
}

export function CarouselDots({ count, className }: CarouselDotsProps) {
  const { api, selectedScrollSnap } = useCarousel();
  const [activeIndex, setActiveIndex] = React.useState(0);

  // Update active index when scroll position changes
  React.useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setActiveIndex(api.selectedScrollSnap());
    };

    api.on('select', onSelect);
    
    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  const scrollTo = React.useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api]
  );

  return (
    <div className={cn('flex justify-center gap-1.5 mt-4', className)}>
      {Array.from({ length: count }).map((_, index) => (
        <Button
          key={index}
          variant="ghost"
          size="sm"
          className={cn(
            'h-2 w-2 rounded-full p-0 bg-muted',
            activeIndex === index ? 'bg-primary' : 'bg-muted hover:bg-muted/80'
          )}
          onClick={() => scrollTo(index)}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
}