"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { AnimatedTextProps, MediaItem } from "@/types/MediaTypes";
import {
  HERO_MEDIA_ITEMS,
  HERO_SLIDE_DURATION,
  HERO_TRANSITION_DURATION,
} from "@/lib/constants/MediaConstants";

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const AnimatedText: React.FC<AnimatedTextProps> = ({
  children,
  delay = 2,
  className = "",
}) => (
  <motion.div
    variants={fadeInUpVariants}
    initial="hidden"
    animate="visible"
    transition={{ duration: 1, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

const BackgroundMedia: React.FC<{ item: MediaItem; isActive: boolean }> = ({
  item,
  isActive,
}) => {
  const className = `absolute inset-0 w-full h-full transition-all duration-1000 ${
    isActive ? "opacity-100 scale-100" : "opacity-0 scale-105"
  }`;

  if (item.type === "video") {
    return (
      <div className={className}>
        <video
          autoPlay
          muted
          loop
          playsInline
          className="object-cover w-full h-full"
        >
          <source src={item.src} type="video/mp4" />
        </video>
      </div>
    );
  }

  return (
    <div className={className}>
      <img
        src={item.src}
        alt={item.alt || ""}
        className="object-cover w-full h-full"
      />
    </div>
  );
};

const BackgroundSlideshow: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [, setIsTransitioning] = useState(false);

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setIsTransitioning(true);

      const transitionTimer = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % HERO_MEDIA_ITEMS.length);
        setIsTransitioning(false);
      }, HERO_TRANSITION_DURATION);

      return () => clearTimeout(transitionTimer);
    }, HERO_SLIDE_DURATION);

    return () => clearInterval(slideTimer);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full">
      {HERO_MEDIA_ITEMS.map((item, index) => (
        <BackgroundMedia
          key={item.src}
          item={item}
          isActive={index === currentIndex}
        />
      ))}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"
        aria-hidden="true"
      />
    </div>
  );
};

// Main component
const HeroSection: React.FC = () => {
  const buttonBaseClass = useMemo(
    () => "min-w-[240px] h-14 text-lg tracking-wide",
    []
  );

  return (
    <section className="relative min-h-screen flex items-center justify-center text-white overflow-hidden font-sans">
      <BackgroundSlideshow />

      <div className="relative z-10 max-w-5xl mx-auto text-center px-4">
        <AnimatedText className="mb-8">
          <span className="text-primary font-serif text-lg tracking-widest uppercase">
            Welcome to Excellence
          </span>
        </AnimatedText>

        <AnimatedText delay={0.2}>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Redefine Your Workspace
            <span className="block mt-4 text-primary font-serif text-4xl md:text-5xl">
              with Timeless Luxury
            </span>
          </h1>
        </AnimatedText>

        <AnimatedText
          delay={0.4}
          className="text-white/90 text-xl md:text-2xl mb-16 max-w-3xl mx-auto leading-relaxed"
        >
          Crafting exceptional office environments where luxury meets
          functionality, designed for forward-thinking enterprises seeking
          distinction
        </AnimatedText>

        <AnimatedText delay={0.6}>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              size="lg"
              className={`${buttonBaseClass} bg-primary hover:bg-primary/90`}
            >
              Explore Collection
            </Button>
            <Button
              size="lg"
              variant="outline"
              className={`${buttonBaseClass} border-2 border-primary text-primary hover:bg-primary/10`}
            >
              Book Consultation
            </Button>
          </div>
        </AnimatedText>
      </div>
    </section>
  );
};

export default HeroSection;
