"use client";

import { CalendarIcon, CheckCircleIcon, MapPinIcon, QuoteIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils/utils";

import type { ClientTestimonial } from "@/types/ComponentTypes";

export function FancyTestimonialsSlider({
  testimonials,
  autorotateTiming = 7000,
}: {
  testimonials: ClientTestimonial[];
  autorotateTiming?: number;
}) {
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number>(0);
  const [autorotate, setAutorotate] = useState<boolean>(true);

  useEffect(() => {
    if (!autorotate) return;
    const interval = setInterval(() => {
      setActive(active + 1 === testimonials.length ? 0 : active + 1);
    }, autorotateTiming);
    return () => clearInterval(interval);
  }, [active, autorotate, testimonials.length, autorotateTiming]);

  const heightFix = () => {
    if (testimonialsRef.current?.parentElement) {
      testimonialsRef.current.parentElement.style.height = `${testimonialsRef.current.clientHeight}px`;
    }
  };

  useEffect(() => {
    heightFix();
  }, [heightFix]);

  return (
    <div className="mx-auto w-full max-w-4xl text-center">
      {/* Testimonial image */}
      <div className="relative h-32">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[420px] lg:w-[480px] lg:h-[480px] -translate-x-1/2 before:absolute before:inset-0 before:-z-10 before:rounded-full before:bg-linear-to-b before:from-primary/5 before:via-primary/2 before:via-25% before:to-transparent before:to-75%">
          <div className="h-32 mask-[linear-gradient(0deg,transparent,var(--color-white)_20%,var(--color-white))]">
            <AnimatePresence initial={false}>
              <motion.div
                key={active}
                className="absolute inset-0 -z-10 h-full"
                initial={{ opacity: 0, rotate: -60 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 60 }}
                transition={{ duration: 0.7, ease: [0.68, -0.3, 0.32, 1] }}
              >
                <img
                  className="relative left-1/2 top-11 -translate-x-1/2 rounded-full border border-primary/10 p-1"
                  src={testimonials[active].img}
                  width={56}
                  height={56}
                  alt={testimonials[active].name}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Quote Icon */}
      <div className="flex justify-center mb-6">
        <QuoteIcon className="h-6 w-6 text-primary/20" />
      </div>

      {/* Text */}
      <div className="mb-12 transition-all delay-300 duration-150 ease-in-out">
        <div className="relative flex flex-col" ref={testimonialsRef}>
          <AnimatePresence initial={false} onExitComplete={heightFix}>
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16, position: "absolute", inset: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              onAnimationStart={heightFix}
            >
              <div className="space-y-4">
                <p className="text-2xl md:text-3xl font-extralight text-foreground font-serif max-w-2xl mx-auto leading-relaxed">
                  {testimonials[active].quote}
                </p>
                <div className="space-y-2">
                  <p className="text-foreground font-medium">{testimonials[active].name}</p>

                  {/* Client Details - Replaces Role */}
                  <div className="flex items-center justify-center gap-3 text-sm text-primary/80">
                    {testimonials[active].location && (
                      <span className="flex items-center gap-1">
                        <MapPinIcon className="h-3 w-3" />
                        {testimonials[active].location}
                      </span>
                    )}

                    {testimonials[active].context && (
                      <span className="hidden sm:inline-block">•</span>
                    )}

                    {testimonials[active].context && <span>{testimonials[active].context}</span>}

                    {testimonials[active].purchaseDate && (
                      <span className="hidden sm:inline-block">•</span>
                    )}

                    {testimonials[active].purchaseDate && (
                      <span className="flex items-center gap-1">
                        <CalendarIcon className="h-3 w-3" />
                        {testimonials[active].purchaseDate}
                      </span>
                    )}
                  </div>

                  {testimonials[active].verified && (
                    <div className="flex justify-center mt-1">
                      <span className="inline-flex items-center gap-1 bg-primary/5 px-2 py-0.5 rounded-full text-xs text-primary/90">
                        <CheckCircleIcon className="h-3 w-3" />
                        Verified Client
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="-m-1.5 flex flex-wrap justify-center">
        {testimonials.map((testimonial, index) => (
          <button
            key={index}
            className={cn(
              "m-1.5 inline-flex items-center justify-center whitespace-nowrap rounded-full px-4 py-1.5",
              "text-xs tracking-wider uppercase transition-colors duration-150",
              "border focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring",
              active === index
                ? "border-primary/20 bg-primary/5 text-primary"
                : "border-transparent text-muted-foreground hover:text-primary/60",
            )}
            onClick={() => {
              setActive(index);
              setAutorotate(false);
            }}
          >
            <span className="opacity-80">{testimonial.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
