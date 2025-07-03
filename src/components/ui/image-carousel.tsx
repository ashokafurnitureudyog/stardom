/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/utils";

interface ImageCarouselProps {
  images: string[];
  aspectRatio?: "square" | "video" | "wide";
  className?: string;
  fill?: boolean;
  showControls?: boolean;
  indicators?: "dots" | "counter" | "none";
}

export function ImageCarousel({
  images = [],
  aspectRatio = "square",
  className,
  fill = false,
  showControls = true,
  indicators = "dots",
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const hasImages = images.length > 0;
  const hasMultipleImages = images.length > 1;

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-muted",
        aspectRatio === "square" && "aspect-square",
        aspectRatio === "video" && "aspect-video",
        aspectRatio === "wide" && "aspect-[16/9]",
        className,
      )}
    >
      {hasImages ? (
        <div className="h-full w-full">
          {fill ? (
            <Image
              src={images[currentIndex]}
              alt="Product image"
              fill
              className="object-cover transition-all"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={currentIndex === 0}
            />
          ) : (
            <img
              src={images[currentIndex]}
              alt="Product image"
              className="h-full w-full object-cover"
            />
          )}
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center text-muted-foreground">
          No image available
        </div>
      )}

      {/* Controls */}
      {hasMultipleImages && showControls && (
        <>
          <div className="absolute inset-0 flex items-center justify-between p-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full bg-background/50 backdrop-blur-sm"
              onClick={goToPrevious}
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Previous</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full bg-background/50 backdrop-blur-sm"
              onClick={goToNext}
            >
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Next</span>
            </Button>
          </div>

          {/* Indicators */}
          {indicators === "dots" && (
            <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 space-x-1">
              {images.map((_, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-1.5 w-1.5 rounded-full p-0",
                    currentIndex === index ? "bg-primary" : "bg-primary/30",
                  )}
                  onClick={() => setCurrentIndex(index)}
                >
                  <span className="sr-only">Go to image {index + 1}</span>
                </Button>
              ))}
            </div>
          )}

          {indicators === "counter" && (
            <Badge
              className="absolute bottom-2 right-2 bg-background/60 backdrop-blur-sm"
              variant="secondary"
            >
              {currentIndex + 1} / {images.length}
            </Badge>
          )}
        </>
      )}
    </div>
  );
}
