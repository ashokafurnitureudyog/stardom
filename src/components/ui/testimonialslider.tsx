"use client";

import { useState, useRef, useEffect } from "react";
import { Transition } from "@headlessui/react";
import { cn } from "@/lib/utils/utils";
import {
  QuoteIcon,
  MapPinIcon,
  CalendarIcon,
  CheckCircleIcon,
} from "lucide-react";

interface Testimonial {
  img: string;
  quote: string;
  name: string;
  location?: string;
  context?: string;
  purchaseDate?: string;
  verified?: boolean;
}

export function FancyTestimonialsSlider({
  testimonials,
  autorotateTiming = 7000,
}: {
  testimonials: Testimonial[];
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
  }, []);

  return (
    <div className="mx-auto w-full max-w-4xl text-center">
      {/* Testimonial image */}
      <div className="relative h-32">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[420px] lg:w-[480px] lg:h-[480px] -translate-x-1/2 before:absolute before:inset-0 before:-z-10 before:rounded-full before:bg-gradient-to-b before:from-primary/5 before:via-primary/2 before:via-25% before:to-transparent before:to-75%">
          <div className="h-32 [mask-image:_linear-gradient(0deg,transparent,theme(colors.white)_20%,theme(colors.white))]">
            {testimonials.map((testimonial, index) => (
              <Transition
                as="div"
                key={index}
                show={active === index}
                className="absolute inset-0 -z-10 h-full"
                enter="transition ease-[cubic-bezier(0.68,-0.3,0.32,1)] duration-700 order-first"
                enterFrom="opacity-0 -rotate-[60deg]"
                enterTo="opacity-100 rotate-0"
                leave="transition ease-[cubic-bezier(0.68,-0.3,0.32,1)] duration-700"
                leaveFrom="opacity-100 rotate-0"
                leaveTo="opacity-0 rotate-[60deg]"
                beforeEnter={() => heightFix()}
              >
                <img
                  className="relative left-1/2 top-11 -translate-x-1/2 rounded-full border border-primary/10 p-1"
                  src={testimonial.img}
                  width={56}
                  height={56}
                  alt={testimonial.name}
                />
              </Transition>
            ))}
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
          {testimonials.map((testimonial, index) => (
            <Transition
              key={index}
              show={active === index}
              enter="transition ease-in-out duration-500 delay-200 order-first"
              enterFrom="opacity-0 translate-y-4"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-out duration-300 delay-300 absolute inset-0"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-4"
              beforeEnter={() => heightFix()}
            >
              <div className="space-y-4">
                <p className="text-2xl md:text-3xl font-extralight text-foreground font-serif max-w-2xl mx-auto leading-relaxed">
                  {testimonial.quote}
                </p>
                <div className="space-y-2">
                  <p className="text-foreground font-medium">
                    {testimonial.name}
                  </p>

                  {/* Client Details - Replaces Role */}
                  <div className="flex items-center justify-center gap-3 text-sm text-primary/80">
                    {testimonial.location && (
                      <span className="flex items-center gap-1">
                        <MapPinIcon className="h-3 w-3" />
                        {testimonial.location}
                      </span>
                    )}

                    {testimonial.context && (
                      <span className="hidden sm:inline-block">•</span>
                    )}

                    {testimonial.context && <span>{testimonial.context}</span>}

                    {testimonial.purchaseDate && (
                      <span className="hidden sm:inline-block">•</span>
                    )}

                    {testimonial.purchaseDate && (
                      <span className="flex items-center gap-1">
                        <CalendarIcon className="h-3 w-3" />
                        {testimonial.purchaseDate}
                      </span>
                    )}
                  </div>

                  {testimonial.verified && (
                    <div className="flex justify-center mt-1">
                      <span className="inline-flex items-center gap-1 bg-primary/5 px-2 py-0.5 rounded-full text-xs text-primary/90">
                        <CheckCircleIcon className="h-3 w-3" />
                        Verified Client
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </Transition>
          ))}
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
              "border focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
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
