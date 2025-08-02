"use client";
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { FileStack, Pencil, Check } from "lucide-react";
import { fadeInUpVariants } from "@/lib/constants/AnimationConstants";
const CraftsmanshipSection = () => {
  const processes = [
    {
      icon: <FileStack className="w-12 h-12" />,
      title: "Material Selection",
      description:
        "Sourcing the finest materials from sustainable forests and premium suppliers worldwide, ensuring unparalleled quality in every piece.",
      detail: "Grade-A Teak & Mahogany",
    },
    {
      icon: <Pencil className="w-12 h-12" />,
      title: "Master Crafting",
      description:
        "Each masterpiece is meticulously handcrafted by our skilled artisans, bringing decades of expertise to every intricate detail.",
      detail: "30+ Years Experience",
    },
    {
      icon: <Check className="w-12 h-12" />,
      title: "Quality Assurance",
      description:
        "Our rigorous multi-stage quality assessment ensures absolute perfection, upholding our legacy of excellence.",
      detail: "12-Point Verification",
    },
  ];

  const stats = [
    { value: "15+", label: "Master Artisans", prefix: "" },
    { value: "200", label: "Crafting Hours", prefix: "+" },
    { value: "12", label: "Quality Stages", prefix: "" },
    { value: "100", label: "Client Satisfaction", prefix: "%" },
  ];

  return (
    <div className="w-full bg-background py-32 md:py-40 font-sans relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(var(--primary-rgb),0.03)_49%,rgba(var(--primary-rgb),0.03)_51%,transparent_52%)] bg-[length:60px_60px]" />

      <motion.div
        className="max-w-7xl mx-auto px-8 md:px-16 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        variants={fadeInUpVariants}
      >
        <div className="text-center mb-24 md:mb-32">
          <div className="inline-flex items-center gap-3 bg-primary/5 px-6 py-3 rounded-full mb-8">
            <div className="h-px w-8 bg-primary/40" />
            <h3 className="text-primary/90 uppercase tracking-widest text-sm font-medium">
              Mastery in Creation
            </h3>
          </div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-extralight tracking-tight text-foreground font-serif mb-8">
            The Art of Fine
            <span className="block mt-4 font-normal italic text-primary/90">
              Craftsmanship
            </span>
          </h2>

          <p className="text-muted-foreground/90 max-w-2xl mx-auto text-lg leading-relaxed">
            Each piece embodies the perfect harmony of traditional artisanship
            and contemporary innovation, creating timeless masterpieces that
            define luxury.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-32">
          {processes.map((process, index) => (
            <motion.div
              key={index}
              className="group relative"
              variants={fadeInUpVariants}
              transition={{ delay: index * 0.2 }}
            >
              {/* Enhanced Glow Effects */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-xl blur-2xl opacity-0 group-hover:opacity-75 transition-all duration-700" />
              <div className="absolute -inset-0.5 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-700 blur-sm" />

              <Card className="relative bg-background/95 border border-primary/10 group-hover:border-primary/30 transition-all duration-500 rounded-xl overflow-hidden">
                <CardContent className="p-8">
                  <div className="mb-6 text-primary/80 transition-colors duration-300 group-hover:text-primary transform">
                    {process.icon}
                  </div>
                  <h3 className="text-2xl font-light mb-3 text-foreground group-hover:text-primary/90 transition-colors duration-300">
                    {process.title}
                  </h3>
                  <p className="text-sm text-primary/70 mb-4 font-medium tracking-wide">
                    {process.detail}
                  </p>
                  <p className="text-muted-foreground/90 leading-relaxed">
                    {process.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-12 border-y border-primary/10 py-20"
          variants={fadeInUpVariants}
          transition={{ delay: 0.6 }}
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center group relative">
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transform scale-110 rounded-xl transition-all duration-500 -z-10" />
              <div className="text-5xl md:text-6xl font-extralight text-foreground mb-3 transition-colors duration-300 group-hover:text-primary/90">
                {stat.value}
                {stat.prefix}
              </div>
              <div className="text-muted-foreground/80 tracking-wide text-sm uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CraftsmanshipSection;
