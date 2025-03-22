import { motion } from "framer-motion";
import { fadeInUpVariants } from "@/lib/constants/AnimationConstants";
import { Link } from "next-view-transitions";

export const CustomSolutionsSection: React.FC = () => {
  return (
    <motion.div
      className="bg-card py-16 px-8 md:px-16 rounded-lg border border-primary/10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      variants={fadeInUpVariants}
    >
      <div className="max-w-5xl mx-auto text-center">
        <h3 className="text-3xl md:text-4xl font-light tracking-tight text-foreground font-serif mb-6">
          Can&apos;t find what you&apos;re looking for?
        </h3>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Our team specializes in custom furniture solutions tailored to your
          specific requirements. From design to installation, we&apos;ll work
          with you to create the perfect furniture for your space.
        </p>
        <Link href="/contact">
          <button className="inline-flex items-center px-8 py-3 border border-primary/20 text-primary/90 hover:text-primary hover:border-primary/40 transition-all duration-300 group font-light">
            <div>
              Request Custom Solution
              <span className="ml-3 group-hover:translate-x-1.5 transition-transform duration-300">
                →
              </span>
            </div>
          </button>
        </Link>
      </div>
    </motion.div>
  );
};
