import BaseLayout from "@/components/layout/BaseLayout";
import { Section } from "@/components/layout/Section";
import { SectionTitle } from "@/components/layout/SectionTitle";
import CertificationsSection from "@/components/marketing/CertificationSection";
import { HeritageHero } from "@/components/marketing/HeritageHero";
import ManufacturingFacilities from "@/components/marketing/ManufacturingFacilities";
import { MissionStatement } from "@/components/marketing/MissionStatement";
import { TeamSection } from "@/components/marketing/TeamSection";
import TestingToolsSection from "@/components/marketing/TestingTools";
import { LogoRevealCard } from "@/components/shared/RevealCard";
import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/components/ui/terminal";
import { Timeline } from "@/components/ui/timeline";
import { teamMembers } from "@/lib/constants/CompanyInfo";

//Will not shift to constants as it integrates react components
const timelineData = [
  {
    title: "1996",
    content: (
      <div>
        <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
          Started as Ashoka Furniture Udyog, serving local Chandigarh market
        </p>
        <div className="grid grid-cols-2 gap-4">
          <img
            src="https://images.unsplash.com/photo-1655569614970-67d5579f1c60"
            alt="Furniture workshop"
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
          />
          <img
            src="https://images.unsplash.com/photo-1629646526507-84ea50bb16e5"
            alt="Local showroom"
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
          />
        </div>
      </div>
    ),
  },
  {
    title: "2005",
    content: (
      <div>
        <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
          Expanded operations across Northern India including Delhi NCR, Punjab,
          Haryana, Himachal Pradesh and Uttar Pradesh
        </p>
        <div className="grid grid-cols-2 gap-4">
          <img
            src="https://images.unsplash.com/photo-1605649487212-47bdab064df7"
            alt="Regional expansion"
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
          />
          <img
            src="https://images.unsplash.com/photo-1496372412473-e8548ffd82bc"
            alt="New showroom"
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
          />
        </div>
      </div>
    ),
  },
  {
    title: "2012",
    content: (
      <div>
        <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
          Expanded into international markets and global partnerships
        </p>
        <div>
          <img
            src="https://images.unsplash.com/photo-1536731578915-ab4e400a6395"
            alt="Local showroom"
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
          />
        </div>
      </div>
    ),
  },
  {
    title: "2016",
    content: (
      <div>
        <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
          Launched Stardom as a premium furniture brand under Ashoka Furniture
          Udyog
        </p>
        <div className="flex items-center justify-center w-full mx-auto">
          <LogoRevealCard
            imageUrl="/images/logo.png"
            revealText="stardom.co.in"
          />
        </div>
      </div>
    ),
  },
  {
    title: "2025",
    content: (
      <div>
        <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
          Launched comprehensive digital product showcase platform
        </p>
        <Terminal>
          <TypingAnimation>&gt; stardom.init --digital-catalog</TypingAnimation>

          <AnimatedSpan delay={1500} className="text-green-500">
            <span>✔ Launching stardom.co.in</span>
          </AnimatedSpan>

          <AnimatedSpan delay={2000} className="text-green-500">
            <span>✔ Creating extensive product catalog</span>
          </AnimatedSpan>

          <AnimatedSpan delay={2500} className="text-green-500">
            <span>✔ Adding detailed product specifications</span>
          </AnimatedSpan>

          <AnimatedSpan delay={3000} className="text-green-500">
            <span>✔ Implementing product categories</span>
          </AnimatedSpan>

          <AnimatedSpan delay={3500} className="text-green-500">
            <span>✔ Setting up contact channels</span>
          </AnimatedSpan>

          <AnimatedSpan delay={4000} className="text-green-500">
            <span>✔ Enabling product inquiries</span>
          </AnimatedSpan>

          <AnimatedSpan delay={4500} className="text-blue-500">
            <span>🎉 Digital catalog launched!</span>
          </AnimatedSpan>

          <TypingAnimation delay={5000} className="text-muted-foreground">
            Explore our complete furniture collection
          </TypingAnimation>

          <TypingAnimation delay={5500} className="text-muted-foreground">
            Connect with us to learn more
          </TypingAnimation>
        </Terminal>
      </div>
    ),
  },
];

const HeritagePage: React.FC = () => {
  return (
    <BaseLayout className="overflow-x-hidden lg:overflow-auto">
      <div className="min-h-screen bg-background font-sans">
        <HeritageHero />

        <Section className="bg-card">
          <MissionStatement />
        </Section>

        <Section className="bg-background">
          <SectionTitle>
            Our <span className="font-serif italic text-primary">Journey</span>
          </SectionTitle>
          <Timeline data={timelineData} />
        </Section>
        <Section className="bg-background">
          <SectionTitle>
            Our{" "}
            <span className="font-serif italic text-primary">Facilities</span>
          </SectionTitle>
          <ManufacturingFacilities />
        </Section>
        <Section className="bg-background">
          <SectionTitle>
            Our{" "}
            <span className="font-serif italic text-primary">Standards</span>
          </SectionTitle>
          <CertificationsSection />
        </Section>
        <Section className="bg-background">
          <SectionTitle>
            Testing{" "}
            <span className="font-serif italic text-primary">Equipment</span>
          </SectionTitle>
          <TestingToolsSection />
        </Section>

        <Section className="bg-card">
          <SectionTitle>
            Our <span className="font-serif italic text-primary">Team</span>
          </SectionTitle>
          <TeamSection members={teamMembers} />
        </Section>
      </div>
    </BaseLayout>
  );
};

export default HeritagePage;
