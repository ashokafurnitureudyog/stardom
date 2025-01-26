"use client";

import { motion } from "framer-motion";

export const PortfolioHero = () => (
  <section className="relative h-[60vh] overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/50 to-background/90" />
    <img
      src="https://images.unsplash.com/photo-1552793494-111afe03d0ca"
      alt="Portfolio Hero"
      className="absolute inset-0 w-full h-full object-cover"
    />

    <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-3 mb-6">
          <div className="h-px w-12 bg-primary" />
          <span className="text-primary uppercase tracking-widest text-sm font-medium">
            Featured Work
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-light mb-6 text-foreground font-serif">
          Design{" "}
          <span className="font-serif italic text-primary">Excellence</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Where visionary design meets meticulous craftsmanship - explore our
          portfolio of transformative commercial interiors.
        </p>
      </motion.div>
    </div>
  </section>
);
