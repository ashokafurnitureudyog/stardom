"use client";

import { fadeInUpVariants } from "@/lib/constants/AnimationConstants";
import { motion } from "framer-motion";

export const MissionStatement = () => (
  <motion.div
    variants={fadeInUpVariants}
    initial="hidden"
    animate="visible"
    className="text-center max-w-3xl mx-auto py-16 px-4"
  >
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-5xl font-light mb-8 tracking-wide"
    >
      Our{" "}
      <span className="font-serif italic text-primary relative">Mission</span>
    </motion.h2>
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.8 }}
      className="text-xl text-muted-foreground leading-relaxed font-light"
    >
      To craft furniture that transcends utility, creating spaces where
      <span className="text-primary font-medium">
        {" "}
        innovation meets tradition
      </span>
      , and where every piece tells a story of
      <span className="text-primary font-medium"> excellence</span>,
      <span className="text-primary font-medium"> sustainability</span>, and
      <span className="text-primary font-medium"> timeless elegance</span>.
    </motion.p>
  </motion.div>
);
