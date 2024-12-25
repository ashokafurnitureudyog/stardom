"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MediaItem } from "@/types/MediaTypes";

const mediaItems: MediaItem[] = [
  { type: "video", src: "/videos/store.webm" },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1567016432779-094069958ea5",
  },
  { type: "video", src: "/videos/lady.webm" },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e",
  },
  { type: "video", src: "/videos/sofa.webm" },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1519974719765-e6559eac2575",
  },
  { type: "video", src: "/videos/home.webm" },
];

const BackgroundSlideshow: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % mediaItems.length);
        setIsTransitioning(false);
      }, 1000);
    }, 8000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full">
      {mediaItems.map((item, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-all duration-1000 ${
            index === currentIndex
              ? "opacity-100 scale-100"
              : "opacity-0 scale-105"
          }`}
        >
          {item.type === "video" ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              className="object-cover w-full h-full"
            >
              <source src={item.src} type="video/mp4" />
            </video>
          ) : (
            <img
              src={item.src}
              alt={`Slide ${index + 1}`}
              className="object-cover w-full h-full"
            />
          )}
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
    </div>
  );
};

const HeroSection = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center text-white overflow-hidden font-sans">
      <BackgroundSlideshow />
      <div className="relative z-10 max-w-5xl mx-auto text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-8"
        >
          <span className="text-primary font-serif text-lg tracking-widest uppercase">
            Welcome to Excellence
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
        >
          Redefine Your Workspace
          <span className="block mt-4 text-primary font-serif text-4xl md:text-5xl">
            with Timeless Luxury
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-white/90 text-xl md:text-2xl mb-16 max-w-3xl mx-auto leading-relaxed"
        >
          Crafting exceptional office environments where luxury meets
          functionality, designed for forward-thinking enterprises seeking
          distinction
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <Button
            size="lg"
            className="min-w-[240px] h-14 bg-primary hover:bg-primary/90 text-lg tracking-wide"
          >
            Explore Collection
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="min-w-[240px] h-14 border-2 border-primary text-primary hover:bg-primary/10 text-lg tracking-wide"
          >
            Book Consultation
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
