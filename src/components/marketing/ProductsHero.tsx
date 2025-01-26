"use client"

import { motion } from "framer-motion"

export const ProductsHero = () => (
  <section className="relative h-[40vh] overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-background/90 to-background/70" />
    <img
      src="https://images.unsplash.com/photo-1497366216548-37526070297c"
      alt="Products Hero"
      className="absolute inset-0 w-full h-full object-cover"
    />

    <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl md:text-7xl font-light mb-6">
          Our <span className="font-serif italic text-primary">Collection</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Discover our curated selection of premium office furniture,
          where every piece tells a story of exceptional craftsmanship.
        </p>
      </motion.div>
    </div>
  </section>
)