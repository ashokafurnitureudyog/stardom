import BaseLayout from "@/components/layout/BaseLayout";
import { Section } from "@/components/layout/Section";
import { SectionTitle } from "@/components/layout/SectionTitle";
import { CultureGallery } from "@/components/marketing/CultureGallery";
import { HeritageHero } from "@/components/marketing/HeritageHero";
import { MissionStatement } from "@/components/marketing/MissionStatement";
import { TeamSection } from "@/components/marketing/TeamSection";
import TestimonialsSection from "@/components/marketing/Testimonials";
import { Timeline } from "@/components/ui/timeline";
import WorldMap from "@/components/ui/world-map";
import { teamMembers } from "@/lib/constants/CompanyInfo";
const data = [
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
          Expanded operations to nearby regions of Punjab, Haryana and Himachal
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
          Started international business operations with China
        </p>
        <div>
          <WorldMap
            dots={[
              {
                start: {
                  lat: 30.7333,
                  lng: 76.7794,
                }, // Chandigarh
                end: {
                  lat: 19.076,
                  lng: 72.8777,
                }, // Mumbai
              },
              {
                start: { lat: 30.7333, lng: 76.7794 }, // Chandigarh
                end: { lat: 39.9042, lng: 116.4074 }, // Beijing
              },
              {
                start: { lat: 30.7333, lng: 76.7794 }, // Chandigarh
                end: { lat: 31.2304, lng: 121.4737 }, // Shanghai
              },
              {
                start: { lat: 30.7333, lng: 76.7794 }, // Chandigarh
                end: { lat: 30.5723, lng: 104.0665 }, // Chengdu
              },
              {
                start: { lat: 30.7333, lng: 76.7794 }, // Chandigarh
                end: { lat: 43.1332, lng: 131.9113 }, // Vladivostok
              },
              {
                start: { lat: 30.7333, lng: 76.7794 }, // Chandigarh
                end: { lat: 1.3521, lng: 103.8198 }, // Singapore
              },
            ]}
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
          Established Stardom as a premium furniture brand
        </p>
        <div className="grid grid-cols-2 gap-4">
          <img
            src="/images/logo.png"
            alt="Stardom launch"
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
          />
          <img
            src="https://images.unsplash.com/photo-1647943499244-032308c2088a"
            alt="Premium collection"
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
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
          Integrated modern solutions and expanded online presence
        </p>
        <div className="grid grid-cols-2 gap-4">
          <img
            src="https://images.unsplash.com/photo-1472851294608-062f824d29cc"
            alt="Digital platform"
            className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
          />
        </div>
      </div>
    ),
  },
];
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
          <Timeline data={data} />
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
