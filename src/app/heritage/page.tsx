"use client";
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
import { useCompanyData } from "@/hooks/useCompanyData";
import { Skeleton } from "@/components/ui/skeleton";

//Will not shift to constants as it integrates react components
const timelineData = [
  {
    title: "1996",
    content: (
      <div>
        <h3 className="text-xl font-bold mb-3 text-neutral-900 dark:text-white">
          Founded as Ashoka Furniture Udyog
        </h3>
        <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base font-normal mb-6">
          Started serving the local Chandigarh market with quality handcrafted
          furniture.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="overflow-hidden rounded-lg">
            <img
              src="https://images.unsplash.com/photo-1581539250439-c96689b516dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1965&q=80"
              alt="Traditional woodworking workshop"
              className="rounded-lg object-cover h-32 md:h-44 lg:h-60 w-full transform hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="overflow-hidden rounded-lg">
            <img
              src="https://images.unsplash.com/photo-1580480055273-228ff5388ef8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
              alt="Traditional furniture craftsmanship"
              className="rounded-lg object-cover h-32 md:h-44 lg:h-60 w-full transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "2005",
    content: (
      <div>
        <h3 className="text-xl font-bold mb-3 text-neutral-900 dark:text-white">
          Regional Expansion
        </h3>
        <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base font-normal mb-6">
          Expanded operations across Northern India including Delhi NCR, Punjab,
          Haryana, Himachal Pradesh and Uttar Pradesh.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="overflow-hidden rounded-lg">
            <img
              src="https://images.unsplash.com/photo-1560448204-603b3fc33ddc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Modern furniture showroom"
              className="rounded-lg object-cover h-32 md:h-44 lg:h-60 w-full transform hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="overflow-hidden rounded-lg">
            <img
              src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1916&q=80"
              alt="Designer office furniture"
              className="rounded-lg object-cover h-32 md:h-44 lg:h-60 w-full transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "2012",
    content: (
      <div>
        <h3 className="text-xl font-bold mb-3 text-neutral-900 dark:text-white">
          Global Partnerships
        </h3>
        <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base font-normal mb-6">
          Expanded into international markets with global partners and
          suppliers.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="overflow-hidden rounded-lg">
            <img
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80"
              alt="International furniture exhibition"
              className="rounded-lg object-cover h-32 md:h-44 lg:h-60 w-full transform hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="overflow-hidden rounded-lg">
            <img
              src="https://images.unsplash.com/photo-1593696140826-c58b021acf8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Global logistics and shipping"
              className="rounded-lg object-cover h-32 md:h-44 lg:h-60 w-full transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "2016",
    content: (
      <div>
        <h3 className="text-xl font-bold mb-3 text-neutral-900 dark:text-white">
          Premium Brand Launch
        </h3>
        <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base font-normal mb-6">
          Launched Stardom as a premium furniture brand under Ashoka Furniture
          Udyog.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="overflow-hidden rounded-lg">
            <img
              src="https://images.unsplash.com/photo-1567016432779-094069958ea5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80"
              alt="Premium living room furniture"
              className="rounded-lg object-cover h-32 md:h-44 lg:h-60 w-full transform hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="overflow-hidden rounded-lg">
            <img
              src="https://images.unsplash.com/photo-1538688423619-a81d3f23454b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
              alt="Luxury brand furniture"
              className="rounded-lg object-cover h-32 md:h-44 lg:h-60 w-full transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
        <div className="flex items-center justify-center w-full mx-auto mt-6">
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
        <h3 className="text-xl font-bold mb-3 text-neutral-900 dark:text-white">
          Digital Transformation
        </h3>
        <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base font-normal mb-6">
          Launched comprehensive digital product showcase platform with
          interactive features.
        </p>
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="overflow-hidden rounded-lg">
            <img
              src="https://images.unsplash.com/photo-1618220179428-22790b461013?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2027&q=80"
              alt="Digital furniture shopping experience"
              className="rounded-lg object-cover h-32 md:h-44 lg:h-60 w-full transform hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="overflow-hidden rounded-lg">
            <img
              src="https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
              alt="Online furniture catalog"
              className="rounded-lg object-cover h-32 md:h-44 lg:h-60 w-full transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
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
  // Fetch company data using our hook
  const { teamMembers, isLoading } = useCompanyData();

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
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-[400px] w-full rounded-lg" />
              ))}
            </div>
          ) : (
            <TeamSection members={teamMembers || []} />
          )}
        </Section>
      </div>
    </BaseLayout>
  );
};

export default HeritagePage;
