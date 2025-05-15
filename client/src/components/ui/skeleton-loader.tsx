import React from 'react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

interface SkeletonCardProps {
  className?: string;
}

export function SkeletonCard({ className }: SkeletonCardProps) {
  return (
    <div className={cn("flex flex-col space-y-3", className)}>
      <Skeleton className="h-[180px] w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
}

interface SkeletonServiceProps {
  className?: string;
}

export function SkeletonService({ className }: SkeletonServiceProps) {
  return (
    <div className={cn("flex flex-col space-y-3", className)}>
      <Skeleton className="h-[200px] w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-5 w-1/2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}

interface SkeletonFormProps {
  rows?: number;
  className?: string;
}

export function SkeletonForm({ rows = 3, className }: SkeletonFormProps) {
  return (
    <div className={cn("space-y-6", className)}>
      {/* Form title */}
      <Skeleton className="h-8 w-3/4 max-w-[300px]" />
      
      <div className="grid gap-4 md:grid-cols-2">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
      </div>
      
      <div className="space-y-2">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-32 w-full" />
      </div>
      
      <div className="flex justify-end">
        <Skeleton className="h-10 w-[180px]" />
      </div>
    </div>
  );
}