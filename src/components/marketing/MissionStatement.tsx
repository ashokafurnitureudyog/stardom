"use client";

import { fadeInUpVariants } from "@/lib/constants/AnimationConstants";
import { motion } from "framer-motion";

export const MissionStatement = () => (
  <motion.div
    variants={fadeInUpVariants}
    initial="hidden"
    animate="visible"
    className="text-center max-w-3xl mx-auto"
  >
    <h2 className="text-4xl font-light mb-8">
      Our <span className="font-serif italic text-primary">Mission</span>
    </h2>
    <p className="text-xl text-muted-foreground leading-relaxed">
      To craft furniture that transcends utility, creating spaces where
      innovation meets tradition, and where every piece tells a story of
      excellence, sustainability, and timeless elegance.
    </p>
  </motion.div>
);
