"use client";
import React from "react";
import { motion } from "framer-motion";
import { LampContainer } from "@/components/ui/lamp";

const HeroSection = () => {
  return (
    <div className="relative min-h-screen bg-black flex flex-col items-center justify-center text-center font-sans">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,37,37,0.2)_0%,rgba(0,0,0,0.4)_100%)]" />

      <LampContainer>
        <div className="relative z-10 space-y-8 sm:space-y-12">
          <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent mx-auto" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-6 sm:space-y-8"
          >
            <h1 className="text-4xl sm:text-7xl md:text-9xl font-thin text-white tracking-[0.15em] sm:tracking-[0.2em] leading-tight">
              STARDOM
            </h1>

            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-lg sm:text-xl md:text-2xl text-gray-300 tracking-wide sm:tracking-wider font-light">
                By Ashoka Furniture Udyog
              </h2>

              <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-light tracking-wide leading-relaxed px-4">
                Redefining luxury living through timeless design and
                unparalleled craftsmanship.
              </p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1.5 }}
                className="pt-4 sm:pt-6"
              >
                <span className="inline-block text-xl sm:text-2xl md:text-3xl text-gray-200 tracking-[0.3em] sm:tracking-[0.5em] font-light border border-gray-800 px-4 sm:px-8 py-2 sm:py-3 bg-black/50 backdrop-blur-sm">
                  COMING SOON
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* Decorative elements */}
          <div className="w-full max-w-xs mx-auto flex items-center gap-3 sm:gap-4 opacity-60">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent" />
            <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 border border-gray-500 transform rotate-45" />
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent" />
          </div>
        </div>
      </LampContainer>

      {/* Subtle scroll indicator */}
      <motion.div
        className="absolute bottom-8 sm:bottom-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <div className="flex flex-col items-center gap-3 sm:gap-4">
          <p className="text-xs sm:text-sm text-gray-500 tracking-widest uppercase">
            Scroll
          </p>
          <div className="w-px h-12 sm:h-16 bg-gradient-to-b from-gray-500 to-transparent" />
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
