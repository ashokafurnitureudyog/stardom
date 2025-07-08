import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const InfoCardSkeleton: React.FC = () => {
  return (
    <div className="hidden lg:block absolute top-1/2 right-12 transform -translate-y-1/2 w-96 bg-card/95 backdrop-blur-sm shadow-2xl rounded-lg p-8 border border-border/50">
      {/* Header skeleton */}
      <div className="mb-6">
        <Skeleton className="h-7 w-32 mb-2" />
        <Skeleton className="h-6 w-48" />
      </div>

      {/* Info items skeleton */}
      <div className="space-y-5">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="flex items-start gap-3">
            <Skeleton className="w-5 h-5 mt-1 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-4 w-full" />
              {item === 4 && <Skeleton className="h-4 w-3/4 mt-1" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
