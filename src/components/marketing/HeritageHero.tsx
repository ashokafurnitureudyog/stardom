"use client";

import { motion } from "framer-motion";
import { fadeInUpVariants } from "@/lib/constants/AnimationConstants";
import { BasicCompanyInfo } from "@/lib/constants/CompanyInfo";

export const HeritageHero = () => (
  <section className="relative min-h-screen lg:min-h-[70vh] flex items-center justify-center text-white overflow-hidden font-sans">
    {/* Background */}
    <div className="absolute inset-0 w-full h-full">
      <img
        src="https://images.unsplash.com/photo-1673448223123-168914f4edc8"
        alt="Heritage Hero"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"
        aria-hidden="true"
      />
    </div>

    {/* Content */}
    <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 px-6">
      {/* Brand Column */}
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
            Our <span className="font-serif italic text-primary">Heritage</span>
          </h1>
          <div className="h-px w-24 bg-primary my-6 mx-auto lg:mx-0" />
          <p className="text-2xl text-white/90 font-serif">
            Crafting Legacy Through Design
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
            A <span className="text-primary font-serif italic">Journey</span> of{" "}
            <span className="text-primary font-serif italic">Excellence</span>
          </h2>
        </motion.div>

        <motion.div
          variants={fadeInUpVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 1, delay: 0.6 }}
          className="text-white/80 text-lg mb-12 leading-relaxed"
        >
          For decades, we&apos;ve shaped the art of office craftsmanship,
          blending traditional techniques with modern innovation. Our legacy is
          built on relentless pursuit of perfection and timeless design
          philosophy.
        </motion.div>
      </div>
    </div>
  </section>
);
