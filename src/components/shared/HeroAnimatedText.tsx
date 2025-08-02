import { fadeInUpVariants } from "@/lib/constants/AnimationConstants";
import { AnimatedTextProps } from "@/types/MediaTypes";
import { motion } from "framer-motion";

const AnimatedText = ({
  children,
  delay = 0.2,
  className = "",
}: AnimatedTextProps) => (
  <motion.div
    variants={fadeInUpVariants}
    initial="hidden"
    animate="visible"
    transition={{ duration: 1, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

export default AnimatedText;
