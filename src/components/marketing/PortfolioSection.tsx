"use client";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { fadeInUpVariants } from "@/lib/constants/AnimationConstants";
import type { PortfolioProject } from "@/types/ComponentTypes";

const PortfolioSection = ({ projects }: { projects: PortfolioProject[] }) => {
  return (
    <div className="w-full bg-background py-20 md:py-32 font-sans">
      <div className="max-w-7xl mx-auto px-8 md:px-16">
        <motion.div
          className="max-w-7xl mx-auto px-8 md:px-16 relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          variants={fadeInUpVariants}
          style={{ willChange: "opacity, transform" }}
        >
          <div className="text-center mb-24 md:mb-32">
            <div className="inline-flex items-center gap-3 bg-primary/5 px-6 py-3 rounded-full mb-8">
              <div className="h-px w-8 bg-primary/40" />
              <h3 className="text-primary/90 uppercase tracking-widest text-sm font-medium">
                Our Portfolio
              </h3>
            </div>

            <h2 className="text-4xl md:text-6xl lg:text-7xl font-extralight tracking-tight text-foreground font-serif mb-8">
              Distinguished Spaces
              <span className="block mt-4 font-normal italic text-primary/90">
                We&apos;ve Transformed
              </span>
            </h2>

            <p className="text-muted-foreground/90 max-w-2xl mx-auto text-lg leading-relaxed">
              Explore our portfolio of prestigious projects that showcase our commitment to
              excellence in corporate interior solutions.
            </p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {projects?.map((project, index) => (
            <div key={project.id || index} className="group relative h-full">
              {/* Glow effect container */}
              <div className="absolute -inset-1 bg-linear-to-r from-primary/20 via-accent/20 to-primary/20 rounded-lg blur-lg opacity-0 group-hover:opacity-75 transition-all duration-700 group-hover:duration-500" />

              {/* Inner glow effect */}
              <div className="absolute -inset-0.5 bg-linear-to-br from-primary/10 to-accent/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-700 blur-sm" />

              <Card className="relative overflow-hidden bg-background/95 border border-primary/10 group-hover:border-primary/30 transition-all duration-500 flex flex-col h-full">
                <div className="aspect-4/3 w-full shrink-0 overflow-hidden relative">
                  <Image
                    src={project.thumbnail || ""}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6 flex flex-col grow min-h-[150px]">
                  <h3 className="text-xl font-light text-foreground line-clamp-1 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground/80 line-clamp-3">
                    {project.description || "No description available"}
                  </p>
                </div>
              </Card>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <button
            type="button"
            className="inline-flex items-center px-8 py-3 border border-primary/20 text-primary/90 hover:text-primary hover:border-primary/40 transition-all duration-300 group font-light"
          >
            <Link href="/portfolio">
              <div>
                View Complete Portfolio
                <span className="ml-3 group-hover:translate-x-1.5 transition-transform duration-300">
                  →
                </span>
              </div>
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PortfolioSection;
