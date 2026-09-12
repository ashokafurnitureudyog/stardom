import BaseLayout from "@/components/layout/BaseLayout";
import ContactSection from "@/components/marketing/ContactSection";
import FeaturedProducts from "@/components/marketing/FeaturedProducts";
import HeroSection from "@/components/marketing/Hero";
import LegacySection from "@/components/marketing/Legacy";
import PortfolioSection from "@/components/marketing/PortfolioSection";
import CraftsmanshipSection from "@/components/marketing/Process";
import TestimonialsSection from "@/components/marketing/Testimonials";
import { getFeaturedProducts } from "@/lib/server/products";

const Home = async () => {
  const featuredProducts = await getFeaturedProducts();

  return (
    <BaseLayout>
      <HeroSection />
      <FeaturedProducts featuredProducts={featuredProducts} />
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
