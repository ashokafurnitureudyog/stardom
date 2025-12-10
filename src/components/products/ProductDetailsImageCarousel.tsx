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

  // Handle keyboard navigation
  useEffect(() => {
    if (!api) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        api.scrollPrev();
      } else if (e.key === "ArrowRight") {
        api.scrollNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [api]);

  // Handle empty images array
  if (!images.length) {
    return (
      <div className="w-full h-64 bg-muted rounded-3xl flex items-center justify-center">
        <p className="text-muted-foreground">No images available</p>
      </div>
    );
  }

  return (
    <motion.div
      className="rounded-3xl overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ willChange: "opacity" }}
    >
      <Carousel
        className="w-full relative rounded-3xl"
        setApi={setApi}
        opts={{ loop: true }}
        aria-label={`${productName} image gallery`}
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index} className="flex justify-center">
              <div className="w-full h-96 relative rounded-3xl overflow-hidden bg-card shadow-[0_0_32px_rgba(34,42,53,0.06),0_1px_1px_rgba(0,0,0,0.05),0_0_0_1px_rgba(34,42,53,0.04),0_0_4px_rgba(34,42,53,0.08),0_16px_68px_rgba(47,48,55,0.05),0_1px_0_rgba(255,255,255,0.1)_inset]">
                <Image
                  src={image}
                  alt={`${productName} - image ${index + 1}`}
                  fill
                  className="object-contain p-4"
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={85}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation buttons */}
        <div className="absolute top-0 bottom-0 left-0 right-0 pointer-events-none">
          <div className="flex items-center justify-between h-full">
            <button
              onClick={() => api?.scrollPrev()}
              className="pointer-events-auto h-10 w-10 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 border-none text-white transition-colors ml-2 focus:outline-none"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => api?.scrollNext()}
              className="pointer-events-auto h-10 w-10 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 border-none text-white transition-colors mr-2 focus:outline-none"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </Carousel>

      {/* Thumbnail navigation */}
      {images.length > 1 && (
        <motion.div
          className="flex gap-2 my-4 justify-center flex-wrap"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-16 h-16 rounded-lg overflow-hidden transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary relative ${
                activeIndex === index
                  ? "ring-2 ring-primary scale-105"
                  : "opacity-70 hover:opacity-100"
              }`}
              aria-label={`View ${productName} image ${index + 1}`}
              aria-current={activeIndex === index ? "true" : "false"}
            >
              <Image
                src={image}
                alt=""
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};
