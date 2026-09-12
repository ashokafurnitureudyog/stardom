"use client";
import { motion } from "motion/react";
import Link from "next/link";
import { fadeInUpVariants } from "@/lib/constants/AnimationConstants";
import type { ClientTestimonial } from "@/types/ComponentTypes";
import { FancyTestimonialsSlider } from "../ui/testimonialslider";

const TestimonialsSection = ({ testimonials }: { testimonials: ClientTestimonial[] }) => {
  return (
    <div className="w-full bg-background py-20 md:py-32 px-8 md:px-16 font-sans relative">
      <div className="max-w-7xl mx-auto space-y-16 relative">
        <motion.div
          className="max-w-7xl mx-auto space-y-24 relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          variants={fadeInUpVariants}
        >
          <div className="text-center">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-extralight tracking-tight text-foreground font-serif mb-8">
              Voices of
              <span className="block mt-4 font-normal italic text-primary/90">Excellence</span>
            </h2>

            <p className="text-muted-foreground/90 max-w-2xl mx-auto text-lg leading-relaxed">
              Discover why discerning organizations trust Stardom for their premium office furniture
              needs.
            </p>
          </div>
        </motion.div>

        <FancyTestimonialsSlider testimonials={testimonials} />

        <motion.div
          className="text-center mt-16 pt-12 border-t border-primary/10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUpVariants}
        >
          <h3 className="text-2xl md:text-3xl font-light text-foreground font-serif mb-4">
            Want to get featured too?
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Contact us with your title, review and we&apos;ll respond within a week.
          </p>
          <Link href="/contact">
            <button
              type="button"
              className="mt-6 px-8 py-3 bg-primary/10 hover:bg-primary/20 text-primary rounded-full transition-colors"
            >
              Share Your Experience
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
