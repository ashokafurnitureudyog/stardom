"use client";

import { fadeInUpVariants } from "@/lib/constants/AnimationConstants";
import { motion } from "framer-motion";

export const HeritageHero = () => (
  <section className="relative h-[60vh] overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/50 to-background/90" />
    <img
      src="https://images.unsplash.com/photo-1673448223123-168914f4edc8"
      alt="Heritage Hero"
      className="absolute inset-0 w-full h-full object-cover"
    />

    <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-center">
      <motion.div
        variants={fadeInUpVariants}
        initial="hidden"
        animate="visible"
      >
        <h1 className="text-5xl md:text-7xl font-light mb-6 text-foreground font-serif">
          Our <span className="font-serif italic text-primary">Heritage</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Four decades of crafting excellence, innovation, and timeless design.
          A journey of passion, precision, and unwavering commitment to quality.
        </p>
      </motion.div>
    </div>
  </section>
);
