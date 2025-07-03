import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { InfoCardSkeleton } from "../marketing/InfoCardSkeleton";

interface MapSkeletonProps {
  height: string;
}

export const MapSkeleton: React.FC<MapSkeletonProps> = ({ height }) => {
  return (
    <section className="relative border-b border-border" style={{ height }}>
      <div className="h-full w-full">
        <Skeleton className="h-full w-full rounded-none" />

        {/* Map pin skeleton */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <div className="absolute bottom-0 left-1/2 transform translate-x-[-50%] translate-y-[100%] w-2 h-6 bg-primary/30 rounded" />
        </div>

        {/* Zoom controls skeleton */}
        <div className="absolute bottom-8 right-8 space-y-1">
          <Skeleton className="h-8 w-8 rounded" />
          <Skeleton className="h-8 w-8 rounded" />
        </div>

        {/* Attribution skeleton */}
        <div className="absolute bottom-2 left-2">
          <Skeleton className="h-4 w-40" />
        </div>
      </div>

      <InfoCardSkeleton />
    </section>
  );
};
