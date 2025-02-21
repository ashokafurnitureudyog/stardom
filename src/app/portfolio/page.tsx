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

const PortfolioPage = () => {
  const [selectedProject, setSelectedProject] =
    useState<PortfolioProject | null>(null);

  // Handle project selection
  const handleProjectSelect = (project: PortfolioProject) => {
    setSelectedProject(project);
    // Optional: Scroll to top or to details section when a project is selected
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle closing project details
  const handleCloseDetails = () => {
    setSelectedProject(null);
  };

  return (
    <BaseLayout className="min-h-screen bg-background font-sans">
      {/* Main content - conditionally render based on selection state */}
      {!selectedProject ? (
        <>
          {/* Step 1: Introduction */}
          <PortfolioHero />

          {/* Step 2: Show work samples */}
          <section id="projects" className="py-20">
            <div className="max-w-7xl mx-auto px-4">
              <ProjectGrid
                projects={PortfolioProjects}
                onProjectSelect={handleProjectSelect}
              />
            </div>
          </section>

          {/* Step 3: Social proof */}
          <TestimonialsSection />

          {/* Step 4: Call to action */}
          <PortfolioCTA />
        </>
      ) : (
        <>
          {/* Project details view */}
          <ProjectDetails
            project={selectedProject}
            open={true}
            onClose={handleCloseDetails}
          />

          {/* Show related projects section */}
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
              <h3 className="text-2xl font-bold mb-8">More Projects</h3>
              <ProjectGrid
                projects={PortfolioProjects.filter(
                  (p) => p.id !== selectedProject.id,
                ).slice(0, 3)}
                onProjectSelect={handleProjectSelect}
              />
              <div className="mt-10 text-center">
                <button
                  onClick={handleCloseDetails}
                  className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition"
                >
                  View All Projects
                </button>
              </div>
            </div>
          </section>
          <div className="py-16">
            <PortfolioCTA />
          </div>
        </>
      )}
    </BaseLayout>
  );
};

export default PortfolioPage;
