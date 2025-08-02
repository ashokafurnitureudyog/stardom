"use client";

import { CarouselProps } from "@/types/ComponentTypes";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const CarouselDot: React.FC<{
  active: boolean;
  onClick: () => void;
}> = ({ active, onClick }) => (
  <button
    className={`w-2 h-2 rounded-full transition-all duration-300 ${
      active ? "bg-primary w-6" : "bg-primary/20"
    }`}
    onClick={onClick}
  />
);

const CarouselButton: React.FC<{
  direction: "left" | "right";
  onClick: () => void;
}> = ({ direction, onClick }) => (
  <button
    onClick={onClick}
    className={`absolute ${direction === "left" ? "left-4" : "right-4"} top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center border border-primary/10 transition-all duration-300 hover:bg-primary/5`}
  >
    {direction === "left" ? (
      <ChevronLeft className="w-6 h-6 text-primary/80" />
    ) : (
      <ChevronRight className="w-6 h-6 text-primary/80" />
    )}
  </button>
);
const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, images.length]);

  const nextSlide = (): void => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = (): void => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full h-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="relative aspect-square w-full"
        >
          <Image
            src={images[currentIndex]}
            alt={`Image ${currentIndex + 1}`}
            fill
            className="object-cover p-8"
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <CarouselDot
            key={index}
            active={index === currentIndex}
            onClick={() => {
              setIsAutoPlaying(false);
              setCurrentIndex(index);
            }}
          />
        ))}
      </div>

      <CarouselButton direction="left" onClick={prevSlide} />
      <CarouselButton direction="right" onClick={nextSlide} />
    </div>
  );
};

export default Carousel;
