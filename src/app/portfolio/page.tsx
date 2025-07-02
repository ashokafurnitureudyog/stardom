"use client";

import { useState } from "react";
import BaseLayout from "@/components/layout/BaseLayout";
import { PortfolioHero } from "@/components/marketing/PortfolioHero";
import { ProjectGrid } from "@/components/marketing/ProjectGrid";
import { ProjectDetails } from "@/components/marketing/ProjectDetails";
import TestimonialsSection from "@/components/marketing/Testimonials";
import { PortfolioCTA } from "@/components/marketing/PortfolioCTA";
import { PortfolioProject } from "@/types/ComponentTypes";
import { Section } from "@/components/layout/Section";
import { SectionTitle } from "@/components/layout/SectionTitle";
import CertificationsSection from "@/components/marketing/CertificationSection";
import { Skeleton } from "@/components/ui/skeleton";
import { usePortfolioProjects } from "@/hooks/usePortfolioProjects";

const PortfolioPage = () => {
  const [selectedProject, setSelectedProject] =
    useState<PortfolioProject | null>(null);
  const { data: projects, isLoading, error } = usePortfolioProjects();

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

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-[300px] w-full rounded-lg" />
            ))}
          </div>
        ) : error ? (
          <div className="p-8 text-center">
            <p className="text-red-500 mb-6">
              There was an error loading our portfolio projects.
            </p>
            {projects && projects.length > 0 && (
              <ProjectGrid
                projects={projects}
                onProjectSelect={handleProjectSelect}
              />
            )}
          </div>
        ) : (
          <ProjectGrid
            projects={projects || []}
            onProjectSelect={handleProjectSelect}
          />
        )}
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
