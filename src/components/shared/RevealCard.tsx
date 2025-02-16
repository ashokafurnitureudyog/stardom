"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { CanvasRevealEffect } from "../ui/canvas-reveal-effect";

type LogoRevealCardProps = {
  imageUrl: string;
  revealText: string;
  className?: string;
  imageAlt?: string;
  revealTextClassName?: string;
};

export const LogoRevealCard: React.FC<LogoRevealCardProps> = ({
  imageUrl,
  revealText,
  className = "",
  imageAlt = "Logo",
  revealTextClassName = "",
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group relative h-[15rem] w-full rounded-lg border border-black/[0.2] p-4 shadow-card transition-all duration-300 hover:shadow-card-hover dark:border-white/[0.2] ${className}`}
    >
      <CornerIcon position="top-left" />
      <CornerIcon position="bottom-left" />
      <CornerIcon position="top-right" />
      <CornerIcon position="bottom-right" />

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 h-full w-full overflow-hidden rounded-lg"
          >
            <CanvasRevealEffect
              animationSpeed={3}
              containerClassName="bg-transparent"
            />
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <h2
                className={`z-20 text-center text-3xl font-bold text-white ${revealTextClassName}`}
              >
                {revealText}
              </h2>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 flex h-full w-full items-center justify-center">
        <div className="h-full w-full transition-opacity duration-300 group-hover:opacity-0">
          <img
            src={imageUrl}
            alt={imageAlt}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
};

type CornerIconProps = {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
};

const CornerIcon: React.FC<CornerIconProps> = ({ position }) => {
  const positionClasses = {
    "top-left": "-top-3 -left-3",
    "top-right": "-top-3 -right-3",
    "bottom-left": "-bottom-3 -left-3",
    "bottom-right": "-bottom-3 -right-3",
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={`absolute h-6 w-6 ${positionClasses[position]} text-black dark:text-white`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};
