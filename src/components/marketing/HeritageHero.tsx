"use client";

import { useCompanyData } from "@/hooks/useCompanyData";
import { BasicCompanyInfo as fallbackCompanyInfo } from "@/lib/constants/CompanyInfo";
import AnimatedText from "../shared/HeroAnimatedText";

export const HeritageHero = () => {
  const { companyInfo } = useCompanyData();
  const established =
    companyInfo?.established || fallbackCompanyInfo.established;

  return (
    <section className="relative min-h-screen lg:min-h-[70vh] flex items-center justify-center text-white overflow-hidden font-sans">
      {/* Background Section */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="https://images.unsplash.com/photo-1589350033409-35701c4273d0"
          alt="Heritage background showing our company's legacy"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"
          aria-hidden="true"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 px-6">
        {/* Left Column - Brand Identity */}
        <div className="text-center lg:text-left">
          <AnimatedText className="mb-4" delay={0}>
            <span className="font-serif text-sm tracking-[0.3em] uppercase inline-block border border-primary rounded px-4 py-2">
              Since {established}
            </span>
          </AnimatedText>

          <AnimatedText delay={0.2}>
            <h1 className="text-5xl lg:text-6xl tracking-tight mb-4 font-extralight">
              Our{" "}
              <span className="font-serif italic text-primary">Heritage</span>
            </h1>
            <div className="h-px w-24 bg-primary my-6 mx-auto lg:mx-0" />
            <p className="text-2xl text-white/90 font-serif">
              Crafting Legacy Through Design
            </p>
          </AnimatedText>
        </div>

        {/* Right Column - Content */}
        <div className="text-center lg:text-left lg:border-l lg:border-white/20 lg:pl-16">
          <AnimatedText
            delay={0.4}
            className="text-3xl lg:text-4xl font-light leading-tight mb-8"
          >
            <h2>
              A <span className="text-primary font-serif italic">Journey</span>{" "}
              of{" "}
              <span className="text-primary font-serif italic">Excellence</span>
            </h2>
          </AnimatedText>

          <AnimatedText
            delay={0.6}
            className="text-white/80 text-lg mb-12 leading-relaxed"
          >
            For decades, we&apos;ve shaped the art of office craftsmanship,
            blending traditional techniques with modern innovation. Our legacy
            is built on relentless pursuit of perfection and timeless design
            philosophy.
          </AnimatedText>
        </div>
      </div>
    </section>
  );
};
