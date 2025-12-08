"use client";
import React from "react";
import { Card } from "@/components/ui/card";
import { fadeInUpVariants } from "@/lib/constants/AnimationConstants";
import { motion } from "framer-motion";
import { Link } from "next-view-transitions";
import { usePortfolioProjects } from "@/hooks/usePortfolioProjects";
import { Skeleton } from "@/components/ui/skeleton";

const PortfolioSection = () => {
  // Use the custom hook to fetch projects with a limit of 3
  const { data: projects, isLoading } = usePortfolioProjects({
    limit: 3,
  });

  return (
    <div className="w-full bg-background py-20 md:py-32 font-sans">
      <div className="max-w-7xl mx-auto px-8 md:px-16">
        <div className="absolute inset-0 bg-[linear-gradient(-45deg,transparent_48%,rgba(var(--primary-rgb),0.02)_49%,rgba(var(--primary-rgb),0.02)_51%,transparent_52%)] bg-[length:48px_48px]" />

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
              Explore our portfolio of prestigious projects that showcase our
              commitment to excellence in corporate interior solutions.
            </p>
          </div>
        </motion.div>

        {isLoading ? (
          <div className="grid md:grid-cols-3 gap-8 mb-24">
            {[1, 2, 3].map((i) => (
              <div key={i} className="group relative h-full">
                <Card className="relative overflow-hidden bg-background/95 border border-primary/10 h-full flex flex-col">
                  <div className="aspect-[4/3] w-full">
                    <Skeleton className="w-full h-full" />
                  </div>
                  <div className="p-6 space-y-2 flex-grow">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </Card>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8 mb-24">
            {projects &&
              projects.map((project, index) => (
                <div
                  key={project.id || index}
                  className="group relative h-full"
                >
                  {/* Glow effect container */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-lg blur-lg opacity-0 group-hover:opacity-75 transition-all duration-700 group-hover:duration-500" />

                  {/* Inner glow effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-700 blur-sm" />

                  <Card className="relative overflow-hidden bg-background/95 border border-primary/10 group-hover:border-primary/30 transition-all duration-500 flex flex-col h-full">
                    <div className="aspect-[4/3] w-full flex-shrink-0 overflow-hidden">
                      <div className="w-full h-full">
                        <img
                          src={project.thumbnail || ""}
                          alt={project.title}
                          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "https://placehold.co/600x400?text=No+Image";
                          }}
                        />
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow min-h-[150px]">
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
        )}

        <div className="text-center mt-16">
          <button className="inline-flex items-center px-8 py-3 border border-primary/20 text-primary/90 hover:text-primary hover:border-primary/40 transition-all duration-300 group font-light">
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
