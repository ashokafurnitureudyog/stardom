import React from "react";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ProductImagesProps {
  images: string[];
  productName: string;
  activeImageIndex: number;
  setActiveImageIndex: (index: number) => void;
}

export const ProductImages = ({
  images,
  productName,
  activeImageIndex,
  setActiveImageIndex,
}: ProductImagesProps) => {
  return (
    <motion.div
      className="rounded-3xl overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <Carousel
        className="w-full"
        onSelect={(event) => {
          const index = parseInt(
            event.currentTarget.getAttribute("data-index") || "0",
            10,
          );
          setActiveImageIndex(index);
        }}
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="rounded-3xl overflow-hidden bg-card shadow-[0_0_32px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]">
                <img
                  src={image}
                  alt={`${productName} - image ${index + 1}`}
                  className="w-full h-auto object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 hover:opacity-100 transition-opacity">
          <CarouselPrevious className="relative left-0 bg-black/40 hover:bg-black/60 border-none text-white" />
          <CarouselNext className="relative right-0 bg-black/40 hover:bg-black/60 border-none text-white" />
        </div>
      </Carousel>

      {/* Thumbnail navigation */}
      {images.length > 1 && (
        <div className="flex gap-2 mt-4 justify-center">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setActiveImageIndex(index)}
              className={`w-16 h-16 rounded-lg overflow-hidden transition-all ${
                activeImageIndex === index
                  ? "ring-2 ring-primary"
                  : "opacity-70 hover:opacity-100"
              }`}
            >
              <img
                src={image}
                alt={`${productName} thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
};
