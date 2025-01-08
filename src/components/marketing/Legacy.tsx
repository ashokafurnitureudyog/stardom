"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import NumberTicker from "../ui/number-ticker";
import { motion } from "framer-motion";
import { StatisticProps } from "@/types/ComponentTypes";
import Carousel from "../shared/Carousel";

const Statistic: React.FC<StatisticProps> = ({ value, label }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="border-l-2 border-primary/20 pl-6"
  >
    <NumberTicker
      className="text-5xl font-extralight text-foreground"
      value={value}
    />
    <span className="text-primary text-5xl">+</span>
    <p className="text-muted-foreground/80 mt-2">{label}</p>
  </motion.div>
);

const LegacySection: React.FC = () => {
  const images: string[] = [
    "/images/store.png",
    "https://images.unsplash.com/photo-1728633826211-4e04854e344e",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7",
    "https://images.unsplash.com/photo-1595846519845-68e298c2edd8",
    "https://images.unsplash.com/photo-1594235048794-fae8583a5af5",
  ];

  return (
    <div className="w-full bg-background py-20 md:py-32 px-8 md:px-16 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-primary/30" />
                <h3 className="text-primary/80 uppercase tracking-widest text-sm font-medium">
                  Heritage of Excellence
                </h3>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight text-foreground font-serif">
                Crafting Elegance
                <span className="block mt-2 text-primary/90 relative">
                  Since 1985
                  <motion.div
                    className="absolute -right-4 -top-4 w-8 h-8 border border-primary/10 rotate-45"
                    animate={{ rotate: 225 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </span>
              </h2>
              <p className="text-muted-foreground/90 max-w-2xl text-lg leading-relaxed">
                From our inception as Ashoka Furniture Udyog to our position as
                an industry leader in luxury office furniture, we have
                maintained an unwavering dedication to artistry and innovation.
              </p>
            </div>

            <div className="flex gap-16">
              <Statistic value={27} label="Years of Excellence" />
              <Statistic value={1000} label="Premium Projects" />
            </div>

            <Button
              variant="ghost"
              className="text-lg hover:bg-primary/5 group px-6"
            >
              Explore Our Legacy
              <span className="ml-3 group-hover:translate-x-1.5 transition-transform duration-300">
                →
              </span>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative hidden md:block"
          >
            <div className="absolute -top-12 -left-12 w-32 h-32 border border-primary/10 rotate-45 transition-transform duration-500 hover:rotate-90" />
            <div className="absolute -bottom-12 -right-12 w-32 h-32 border border-primary/10 rotate-45 transition-transform duration-500 hover:-rotate-90" />
            <div className="aspect-square w-full bg-gradient-to-br from-accent/5 to-primary/5 flex items-center justify-center transition-all duration-500 hover:from-accent/10 hover:to-primary/10">
              <Carousel images={images} />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LegacySection;
