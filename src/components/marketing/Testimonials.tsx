"use client";
import React from "react";
import { FancyTestimonialsSlider } from "../ui/testimonialslider";
import { motion } from "framer-motion";
import { fadeInUpVariants } from "@/lib/constants/AnimationConstants";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Chief Architect, Azure Design Co.",
      quote:
        "Stardom's attention to detail and commitment to quality has transformed our office space into a masterpiece of design and functionality.",
      img: "https://avatar.iran.liara.run/public",
    },
    {
      name: "James Morrison",
      role: "MD, Global Finance Corp",
      quote:
        "The level of craftsmanship and personalized service we received from Stardom exceeded all our expectations.",
      img: "https://avatar.iran.liara.run/public",
    },
    {
      name: "Priya Patel",
      role: "Interior Designer, Nexus Interiors",
      quote:
        "Working with Stardom has been a revelation. Their pieces are not just furniture, they're statements of luxury and sophistication.",
      img: "https://avatar.iran.liara.run/public",
    },
  ];

  const stats = [
    { value: "98%", label: "Client Satisfaction", icon: "★" },
    { value: "250+", label: "Projects Completed", icon: "✦" },
    { value: "15+", label: "Design Awards", icon: "✧" },
  ];

  return (
    <div className="w-full bg-background py-20 md:py-32 px-8 md:px-16 font-sans relative">
      <div className="max-w-7xl mx-auto space-y-16 relative">
        <motion.div
          className="max-w-7xl mx-auto space-y-24 relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUpVariants}
        >
          <div className="text-center">
            <div className="inline-flex items-center gap-3 bg-primary/5 px-6 py-3 rounded-full mb-8">
              <div className="h-px w-8 bg-primary/40" />
              <h3 className="text-primary/90 uppercase tracking-widest text-sm font-medium">
                Client Testimonials
              </h3>
            </div>

            <h2 className="text-4xl md:text-6xl lg:text-7xl font-extralight tracking-tight text-foreground font-serif mb-8">
              Voices of
              <span className="block mt-4 font-normal italic text-primary/90">
                Excellence
              </span>
            </h2>

            <p className="text-muted-foreground/90 max-w-2xl mx-auto text-lg leading-relaxed">
              Discover why discerning corporations trust Stardom for their
              premium office furniture needs.
            </p>
          </div>
        </motion.div>

        <FancyTestimonialsSlider testimonials={testimonials} />

        <div className="grid grid-cols-3 gap-8 pt-12 border-t border-primary/10">
          {stats.map((stat, index) => (
            <div key={index} className="text-center space-y-3">
              <span className="text-primary/40 text-2xl">{stat.icon}</span>
              <h4 className="text-4xl md:text-5xl font-extralight text-foreground font-serif">
                {stat.value}
              </h4>
              <p className="text-sm text-primary/80 uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
