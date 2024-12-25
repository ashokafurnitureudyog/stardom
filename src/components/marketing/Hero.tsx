"use client"
import React from 'react';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-background text-foreground overflow-hidden font-sans">
      <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
        >
          Elevate Your Workspace
          <span className="block mt-2 text-primary font-serif">with Distinction</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-muted-foreground text-lg md:text-xl mb-12 max-w-2xl mx-auto"
        >
          Crafting exceptional office environments where luxury meets functionality,
          designed for forward-thinking enterprises
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            size="lg"
            className="min-w-[200px] bg-primary hover:bg-primary/90"
          >
            Explore Collection
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="min-w-[200px] border-primary text-primary hover:bg-primary/10"
          >
            Book Consultation
          </Button>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;