"use client";

import { fadeInUpVariants } from "@/lib/constants/AnimationConstants";
import { motion } from "framer-motion";

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
