"use client";

import { BasicCompanyInfo as fallbackCompanyInfo } from "@/lib/constants/CompanyInfo";
import AnimatedText from "../shared/HeroAnimatedText";
import { useCompanyData } from "@/hooks/useCompanyData";

export const ProductsHero = () => {
  const { companyInfo } = useCompanyData();
  const established =
    companyInfo?.established || fallbackCompanyInfo.established;

  return (
    <section className="relative min-h-screen lg:min-h-[70vh] flex items-center justify-center text-white overflow-hidden font-sans">
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/images/headers/product_header.jpg"
          alt="Products Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 px-6">
        <div className="text-center lg:text-left">
          <AnimatedText className="mb-4" delay={0}>
            <span className="text-primary font-serif text-sm tracking-[0.3em] uppercase inline-block border border-primary/30 rounded px-4 py-2">
              Since {established}
            </span>
          </AnimatedText>

          <AnimatedText delay={0.2}>
            <h1 className="text-5xl lg:text-6xl tracking-tight mb-4 font-extralight">
              Our{" "}
              <span className="font-serif italic text-primary">Collection</span>
            </h1>
            <div className="h-px w-24 bg-primary my-6 mx-auto lg:mx-0" />
            <p className="text-2xl text-white/90 font-serif">
              Curated Excellence in Office Design
            </p>
          </AnimatedText>
        </div>

        {/* Content Column */}
        <div className="text-center lg:text-left lg:border-l lg:border-white/20 lg:pl-16">
          <AnimatedText
            delay={0.4}
            className="text-3xl lg:text-4xl font-light leading-tight mb-8"
          >
            <h2>
              Where{" "}
              <span className="text-primary font-serif italic">
                Craftsmanship
              </span>{" "}
              Meets{" "}
              <span className="text-primary font-serif italic">Innovation</span>
            </h2>
          </AnimatedText>

          <AnimatedText
            delay={0.6}
            className="text-white/80 text-lg mb-12 leading-relaxed"
          >
            Explore our signature pieces that redefine office luxury. Each
            creation embodies our legacy of precision engineering and artistic
            vision, offering unparalleled comfort and sophistication.
          </AnimatedText>
        </div>
      </div>
    </section>
  );
};
