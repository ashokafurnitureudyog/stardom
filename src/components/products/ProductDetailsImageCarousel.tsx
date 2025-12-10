import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import type { CarouselApi } from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface ProductImagesProps {
  images: string[];
  productName: string;
  activeImageIndex?: number;
  setActiveImageIndex?: (index: number) => void;
  initialIndex?: number;
}

export const ProductImages = ({
  images,
  productName,
  activeImageIndex: externalActiveIndex,
  setActiveImageIndex: externalSetActiveIndex,
  initialIndex = 0,
}: ProductImagesProps) => {
  // Use either external or internal state management
  const [internalActiveIndex, setInternalActiveIndex] = useState(initialIndex);
  const activeIndex =
    externalActiveIndex !== undefined
      ? externalActiveIndex
      : internalActiveIndex;
  const setActiveIndex = externalSetActiveIndex || setInternalActiveIndex;

  const [api, setApi] = useState<CarouselApi>();

  // Sync carousel with activeIndex changes
  useEffect(() => {
    if (!api) return;
    api.scrollTo(activeIndex);
  }, [api, activeIndex]);

  // Handle carousel navigation events
  useEffect(() => {
    if (!api) return;

    const handleSelect = () => {
      setActiveIndex(api.selectedScrollSnap());
    };

    api.on("select", handleSelect);
    return () => {
      api.off("select", handleSelect);
    };
  }, [api, setActiveIndex]);

  // Handle empty images array
  if (!images.length) {
    return (
      <div className="w-full aspect-square bg-muted/20 rounded-[2rem] flex items-center justify-center">
        <p className="text-muted-foreground font-medium">No images available</p>
      </div>
    );
  }

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Carousel
        className="w-full"
        setApi={setApi}
        opts={{ loop: true, align: "center" }}
        aria-label={`${productName} image gallery`}
      >
        <CarouselContent className="-ml-4">
          {images.map((image, index) => (
            <CarouselItem key={`${image}-${index}`} className="pl-4 basis-full">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-secondary/30">
                <Image
                  src={image}
                  alt={`${productName} - view ${index + 1}`}
                  fill
                  className="object-cover p-2 dark:opacity-90"
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={90}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Improved Navigation Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? "w-8 bg-primary"
                  : "w-2 bg-primary/20 hover:bg-primary/40"
              }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-pressed={activeIndex === index}
            />
          ))}
        </div>
      </Carousel>
    </motion.div>
  );
};
