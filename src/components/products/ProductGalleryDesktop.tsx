import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface ProductGalleryDesktopProps {
  images: string[];
  productName: string;
}

export const ProductGalleryDesktop = ({
  images,
  productName,
}: ProductGalleryDesktopProps) => {
  if (!images.length) return null;

  return (
    <div className="flex flex-col gap-4 w-full">
      <AnimatePresence mode="popLayout">
        {images.map((image, index) => (
          <motion.div
            key={`${image}-${index}`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden bg-secondary/30"
          >
            <Image
              src={image}
              alt={`${productName} view ${index + 1}`}
              fill
              className="object-cover hover:scale-105 transition-transform duration-700 ease-out dark:opacity-90"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority={index < 2}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
