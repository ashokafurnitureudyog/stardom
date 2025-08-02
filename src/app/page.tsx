import BaseLayout from "@/components/layout/BaseLayout";
import ContactSection from "@/components/marketing/ContactSection";
import FeaturedProducts from "@/components/marketing/FeaturedProducts";
import HeroSection from "@/components/marketing/Hero";
import LegacySection from "@/components/marketing/Legacy";
import PortfolioSection from "@/components/marketing/PortfolioSection";
import CraftsmanshipSection from "@/components/marketing/Process";
import TestimonialsSection from "@/components/marketing/Testimonials";
import React from "react";

const Home = () => {
  return (
    <BaseLayout>
      <HeroSection />
      <FeaturedProducts />
      <LegacySection />
      {/* <SignatureCollection /> */}
      <CraftsmanshipSection />
      <PortfolioSection />
      <TestimonialsSection />
      <ContactSection />
    </BaseLayout>
  );
};

export default Home;
