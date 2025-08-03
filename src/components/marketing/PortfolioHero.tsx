"use client";

import React, { useState, useEffect } from "react";
import { BasicCompanyInfo as fallbackCompanyInfo } from "@/lib/constants/CompanyInfo";
import {
  BackgroundMediaProps,
  PortfolioHeroProps,
} from "@/types/ComponentTypes";
import AnimatedText from "../shared/HeroAnimatedText";
import { useCompanyData } from "@/hooks/useCompanyData";

const BackgroundMedia = ({ item, isActive }: BackgroundMediaProps) => {
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
          aria-hidden="true"
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
        alt={item.alt || "Background image"}
        className="object-cover w-full h-full"
        loading="eager"
      />
    </div>
  );
};

export const PortfolioHero = ({
  mediaItems = [
    {
      type: "video",
      src: "/videos/chitkara_audi.webm",
      alt: "Portfolio Hero",
    },
    {
      type: "video",
      src: "/videos/alphait_1.webm",
      alt: "Portfolio Hero",
    },
    {
      type: "video",
      src: "/videos/alphait_2.webm",
      alt: "Portfolio Hero",
    },
  ],
  slideDuration = 6000,
  transitionDuration = 1000,
  overlayOpacity = 70,
}: PortfolioHeroProps) => {
  const { companyInfo } = useCompanyData();
  const established =
    companyInfo?.established || fallbackCompanyInfo.established;

  const [currentIndex, setCurrentIndex] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Skip slideshow setup for single item
    if (mediaItems.length <= 1) return undefined;

    let transitionTimer: NodeJS.Timeout;

    const slideTimer = setInterval(() => {
      setIsTransitioning(true);

      transitionTimer = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % mediaItems.length);
        setIsTransitioning(false);
      }, transitionDuration);
    }, slideDuration);

    // Proper cleanup of both timers
    return () => {
      clearInterval(slideTimer);
      clearTimeout(transitionTimer);
    };
  }, [mediaItems.length, slideDuration, transitionDuration]);

  return (
    <section className="relative min-h-screen lg:min-h-[70vh] flex items-center justify-center text-white overflow-hidden font-sans">
      <div className="absolute inset-0 w-full h-full">
        {/* Background Media Items */}
        {mediaItems.map((item, index) => (
          <BackgroundMedia
            key={`media-${index}-${item.src}`}
            item={item}
            isActive={index === currentIndex}
          />
        ))}

        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-b from-black/${overlayOpacity} via-black/${Math.max(
            20,
            overlayOpacity - 20,
          )} to-black/${overlayOpacity}`}
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 px-6">
        {/* Brand Column */}
        <div className="text-center lg:text-left">
          <AnimatedText className="mb-4" delay={0}>
            <span className="text-primary font-serif text-sm tracking-[0.3em] uppercase inline-block border border-primary/30 rounded px-4 py-2">
              Since {established}
            </span>
          </AnimatedText>

          <AnimatedText delay={0.2}>
            <h1 className="text-5xl lg:text-6xl tracking-tight mb-4 font-extralight">
              Design{" "}
              <span className="font-serif italic text-primary">Excellence</span>
            </h1>
            <div className="h-px w-24 bg-primary my-6 mx-auto lg:mx-0" />
            <p className="text-2xl text-white/90 font-serif">
              Visionary Space Solutions
            </p>
          </AnimatedText>
        </div>

        {/* Content Column */}
        <div className="text-center lg:text-left lg:border-l lg:border-white/20 lg:pl-16">
          <AnimatedText
            delay={0.4}
            className="text-3xl lg:text-4xl font-light leading-tight mb-8"
          >
            <h2>
              <span className="text-primary font-serif italic">
                Transformative
              </span>{" "}
              Interior Narratives
            </h2>
          </AnimatedText>

          <AnimatedText
            delay={0.6}
            className="text-white/80 text-lg mb-12 leading-relaxed"
          >
            Witness the embodiment of our design philosophy through curated
            commercial spaces that redefine workplace aesthetics and
            functionality.
          </AnimatedText>
        </div>
      </div>
    </section>
  );
};
