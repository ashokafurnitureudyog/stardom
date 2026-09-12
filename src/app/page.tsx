import BaseLayout from "@/components/layout/BaseLayout";
import ContactSection from "@/components/marketing/ContactSection";
import FeaturedProducts from "@/components/marketing/FeaturedProducts";
import HeroSection from "@/components/marketing/Hero";
import LegacySection from "@/components/marketing/Legacy";
import PortfolioSection from "@/components/marketing/PortfolioSection";
import CraftsmanshipSection from "@/components/marketing/Process";
import TestimonialsSection from "@/components/marketing/Testimonials";
import {
  getCompanyData,
  getHeroMedia,
  getPortfolioProjects,
  getTestimonials,
} from "@/lib/server/content";
import { getFeaturedProducts } from "@/lib/server/products";

const Home = async () => {
  const [heroMedia, company, featuredProducts, projects, testimonials] = await Promise.all([
    getHeroMedia(),
    getCompanyData(),
    getFeaturedProducts(),
    getPortfolioProjects(),
    getTestimonials(),
  ]);

  return (
    <BaseLayout>
      <HeroSection mediaItems={heroMedia} companyInfo={company.companyInfo} />
      <FeaturedProducts featuredProducts={featuredProducts} />
      <LegacySection />
      <CraftsmanshipSection />
      <PortfolioSection projects={projects.slice(0, 3)} />
      <TestimonialsSection testimonials={testimonials} />
      <ContactSection />
    </BaseLayout>
  );
};

export default Home;
