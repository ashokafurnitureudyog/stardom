import BaseLayout from "@/components/layout/BaseLayout";
import { Section } from "@/components/layout/Section";
import { SectionTitle } from "@/components/layout/SectionTitle";
import { CultureGallery } from "@/components/marketing/CultureGallery";
import { HeritageHero } from "@/components/marketing/HeritageHero";
import { MissionStatement } from "@/components/marketing/MissionStatement";
import { TeamSection } from "@/components/marketing/TeamSection";
import TestimonialsSection from "@/components/marketing/Testimonials";
import { Timeline } from "@/components/marketing/Timeline";
import { teamMembers, timelineEvents } from "@/lib/constants/CompanyInfo";

const HeritagePage = () => {
  return (
    <BaseLayout>
      <div className="min-h-screen bg-background font-sans">
        <HeritageHero />

        <Section className="bg-card">
          <MissionStatement />
        </Section>

        <Section className="bg-background">
          <SectionTitle>
            Our <span className="font-serif italic text-primary">Journey</span>
          </SectionTitle>
          <Timeline events={timelineEvents} />
        </Section>

        <Section className="bg-card">
          <SectionTitle>
            Our <span className="font-serif italic text-primary">Team</span>
          </SectionTitle>
          <TeamSection members={teamMembers} />
        </Section>

        <Section className="bg-card">
          <SectionTitle>
            Our <span className="font-serif italic text-primary">Culture</span>
          </SectionTitle>
          <CultureGallery />
        </Section>

        <TestimonialsSection />
      </div>
    </BaseLayout>
  );
};

export default HeritagePage;
