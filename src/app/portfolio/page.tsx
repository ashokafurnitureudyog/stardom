"use client";

import { useState } from "react";
import BaseLayout from "@/components/layout/BaseLayout";
import { PortfolioHero } from "@/components/marketing/PortfolioHero";
import { ProjectGrid } from "@/components/marketing/ProjectGrid";
import { ProjectDetails } from "@/components/marketing/ProjectDetails";
import TestimonialsSection from "@/components/marketing/Testimonials";
import { PortfolioCTA } from "@/components/marketing/PortfolioCTA";
import { PortfolioProjects } from "@/lib/constants/PortfolioProjects";
import { PortfolioProject } from "@/types/ComponentTypes";
import { Section } from "@/components/layout/Section";
import { SectionTitle } from "@/components/layout/SectionTitle";
import CertificationsSection from "@/components/marketing/CertificationSection";

const PortfolioPage = () => {
  const [selectedProject, setSelectedProject] =
    useState<PortfolioProject | null>(null);

  const handleProjectSelect = (project: PortfolioProject) => {
    setSelectedProject(project);
  };

  return (
    <BaseLayout className="min-h-screen bg-background font-sans">
      {/* Hero Section */}
      <PortfolioHero />

      {/* Projects Section */}
      <Section className="bg-background">
        <SectionTitle>
          Our <span className="font-serif italic text-primary">Work</span>
        </SectionTitle>
        <ProjectGrid
          projects={PortfolioProjects}
          onProjectSelect={handleProjectSelect}
        />
      </Section>
      <Section className="bg-background">
        <SectionTitle>
          Our <span className="font-serif italic text-primary">Standards</span>
        </SectionTitle>
        <CertificationsSection />
      </Section>
      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Call to Action */}
      <PortfolioCTA />

      {/* Project Details Dialog */}
      <ProjectDetails
        project={selectedProject}
        open={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
      />
    </BaseLayout>
  );
};

export default PortfolioPage;
