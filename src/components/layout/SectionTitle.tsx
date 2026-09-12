"use client";

import { motion } from "motion/react";
import { fadeInUpVariants } from "@/lib/constants/AnimationConstants";

export const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial="initial"
    whileInView="animate"
    variants={fadeInUpVariants}
    className="text-center mb-16"
  >
    <h2 className="text-5xl font-light mb-6">{children}</h2>
  </motion.div>
);
