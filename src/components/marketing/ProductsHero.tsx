"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { fadeInUpVariants } from "@/lib/constants/AnimationConstants";
import { BasicCompanyInfo } from "@/lib/constants/CompanyInfo";

export const ProductsHero = () => (
  <section className="relative min-h-[60vh] flex items-center justify-center text-white overflow-hidden font-sans">
    <div className="absolute inset-0 w-full h-full">
      <img
        src="https://images.unsplash.com/photo-1497366216548-37526070297c"
        alt="Products Hero"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"
        aria-hidden="true"
      />
    </div>

    <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 px-6">
      <div className="text-center lg:text-left">
        <motion.div
          variants={fadeInUpVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 1 }}
          className="mb-4"
        >
          <span className="text-primary font-serif text-sm tracking-[0.3em] uppercase inline-block border border-primary/30 rounded px-4 py-2">
            Since {BasicCompanyInfo.established}
          </span>
        </motion.div>

        <motion.div
          variants={fadeInUpVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h1 className="text-6xl lg:text-7xl tracking-tight mb-4 font-extralight">
            Our <span className="font-serif italic text-primary">Collection</span>
          </h1>
          <div className="h-px w-24 bg-primary my-6 mx-auto lg:mx-0" />
          <p className="text-2xl text-white/90 font-serif">
            Curated Excellence in Office Design
          </p>
        </motion.div>
      </div>

      {/* Content Column */}
      <div className="text-center lg:text-left lg:border-l lg:border-white/20 lg:pl-16">
        <motion.div
          variants={fadeInUpVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 1, delay: 0.4 }}
          className="text-3xl lg:text-4xl font-light leading-tight mb-8"
        >
          <h2>
            Where <span className="text-primary font-serif italic">Craftsmanship</span> Meets{" "}
            <span className="text-primary font-serif italic">Innovation</span>
          </h2>
        </motion.div>

        <motion.div
          variants={fadeInUpVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 1, delay: 0.6 }}
          className="text-white/80 text-lg mb-12 leading-relaxed"
        >
          Explore our signature pieces that redefine office luxury. Each creation 
          embodies our legacy of precision engineering and artistic vision, 
          offering unparalleled comfort and sophistication.
        </motion.div>

        <motion.div
          variants={fadeInUpVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start"
        >
          <Button
            size="lg"
            className="min-w-[240px] h-14 text-lg tracking-wide bg-primary hover:bg-primary/90"
          >
            Browse Catalog
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="min-w-[240px] h-14 text-lg tracking-wide border-2 border-white/20 hover:border-white hover:bg-white/10 text-foreground-700"
          >
            Custom Solutions
          </Button>
        </motion.div>
      </div>
    </div>
  </section>
);