"use client";

import { motion } from "framer-motion";
import { fadeInUpVariants } from "@/lib/constants/AnimationConstants";
import { BasicCompanyInfo } from "@/lib/constants/CompanyInfo";

export const PortfolioHero = () => (
  <section className="relative min-h-screen lg:min-h-[70vh] flex items-center justify-center text-white overflow-hidden font-sans ">
    <div className="absolute inset-0 w-full h-full">
      <img
        src="https://images.unsplash.com/photo-1552793494-111afe03d0ca"
        alt="Portfolio Hero"
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
          <h1 className="text-5xl lg:text-6xl tracking-tight mb-4 font-extralight">
            Design{" "}
            <span className="font-serif italic text-primary">Excellence</span>
          </h1>
          <div className="h-px w-24 bg-primary my-6 mx-auto lg:mx-0" />
          <p className="text-2xl text-white/90 font-serif">
            Visionary Space Solutions
          </p>
        </motion.div>
      </div>

      <div className="text-center lg:text-left lg:border-l lg:border-white/20 lg:pl-16">
        <motion.div
          variants={fadeInUpVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 1, delay: 0.4 }}
          className="text-3xl lg:text-4xl font-light leading-tight mb-8"
        >
          <h2>
            <span className="text-primary font-serif italic">
              Transformative
            </span>{" "}
            Interior Narratives
          </h2>
        </motion.div>

        <motion.div
          variants={fadeInUpVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 1, delay: 0.6 }}
          className="text-white/80 text-lg mb-12 leading-relaxed"
        >
          Witness the embodiment of our design philosophy through curated
          commercial spaces that redefine workplace aesthetics and
          functionality.
        </motion.div>
      </div>
    </div>
  </section>
);
