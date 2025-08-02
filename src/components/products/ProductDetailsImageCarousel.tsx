import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import type { CarouselApi } from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>(
    Array(images.length).fill(false),
  );
  const [, setImageDimensions] = useState<
    Array<{ width: number; height: number }>
  >(Array(images.length).fill({ width: 0, height: 0 }));

  // Preload images and get their dimensions
  useEffect(() => {
    const preloadImages = images.map((src, index) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setImagesLoaded((prev) => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
        setImageDimensions((prev) => {
          const newDimensions = [...prev];
          newDimensions[index] = {
            width: img.naturalWidth,
            height: img.naturalHeight,
          };
          return newDimensions;
        });
      };
      return img;
    });

    return () => {
      preloadImages.forEach((img) => {
        img.onload = null;
      });
    };
  }, [images]);

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
              <div className="rounded-3xl overflow-hidden bg-card relative shadow-[0_0_32px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]">
                {!imagesLoaded[index] && (
                  <div className="absolute inset-0 flex items-center justify-center bg-muted/30">
                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
                <div className="flex items-center justify-center max-h-96">
                  <img
                    src={image}
                    alt={`${productName} - image ${index + 1}`}
                    className="max-w-full max-h-96 object-contain transition-opacity duration-300"
                    style={{ opacity: imagesLoaded[index] ? 1 : 0 }}
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </div>
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
              className={`w-16 h-16 rounded-lg overflow-hidden transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary ${
                activeIndex === index
                  ? "ring-2 ring-primary scale-105"
                  : "opacity-70 hover:opacity-100"
              }`}
              aria-label={`View ${productName} image ${index + 1}`}
              aria-current={activeIndex === index ? "true" : "false"}
            >
              <div className="w-full h-full">
                <img
                  src={image}
                  alt=""
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </button>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};
