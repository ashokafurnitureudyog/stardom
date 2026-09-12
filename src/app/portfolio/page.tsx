import BaseLayout from "@/components/layout/BaseLayout";
import { Section } from "@/components/layout/Section";
import { SectionTitle } from "@/components/layout/SectionTitle";
import CertificationsSection from "@/components/marketing/CertificationSection";
import { PortfolioCTA } from "@/components/marketing/PortfolioCTA";
import { PortfolioGallery } from "@/components/marketing/PortfolioGallery";
import { PortfolioHero } from "@/components/marketing/PortfolioHero";
import TestimonialsSection from "@/components/marketing/Testimonials";
import { getPortfolioProjects, getTestimonials } from "@/lib/server/content";

const PortfolioPage = async () => {
  const [projects, testimonials] = await Promise.all([getPortfolioProjects(), getTestimonials()]);

  return (
    <BaseLayout className="min-h-screen bg-background font-sans">
      <PortfolioHero />

      <Section className="bg-background">
        <SectionTitle>Our Work</SectionTitle>
        <PortfolioGallery projects={projects} />
      </Section>

      <Section className="bg-background">
        <SectionTitle>Our Standards</SectionTitle>
        <CertificationsSection />
      </Section>

      <TestimonialsSection testimonials={testimonials} />

      <PortfolioCTA />
    </BaseLayout>
  );
};

export default PortfolioPage;
