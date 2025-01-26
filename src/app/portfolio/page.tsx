"use client"

import BaseLayout from '@/components/layout/BaseLayout'
import { CategoryTabs } from '@/components/marketing/PortfolioCategoryTabs';
import { PortfolioCTA } from '@/components/marketing/PortfolioCTA';
import { PortfolioHero } from '@/components/marketing/PortfolioHero';
import { ProjectDetails } from '@/components/marketing/ProjectDetails';
import { ProjectGrid } from '@/components/marketing/ProjectGrid';
import { PortfolioCategory, Project } from '@/types/ComponentTypes';
import React from 'react'

const categories: PortfolioCategory[] = [
  "All Projects",
  "Executive Offices",
  "Conference Rooms",
  "Lounges",
  "Collaborative Spaces"
]

const projects: Project[] = [
  {
    id: 1,
    title: "Goldman Sachs Executive Floor",
    category: "Executive Offices",
    thumbnail: "https://images.unsplash.com/photo-1552793494-111afe03d0ca",
    description: "Complete redesign of executive floor featuring custom Italian wood desks and ergonomic solutions.",
    challenge: "Create a space that reflects global leadership while maintaining warmth and accessibility.",
    solution: "Integrated traditional craftmanship with modern technology, using sustainable materials.",
    impact: "30% increase in executive satisfaction, LEED Platinum certification achieved.",
    testimonial: {
      quote: "Stardom transformed our space into something truly extraordinary. The attention to detail is remarkable.",
      author: "Sarah Chen",
      position: "Global Facilities Director"
    },
    gallery: [
      "https://images.unsplash.com/photo-1431540015161-0bf868a2d407",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2",
      "https://images.unsplash.com/photo-1511649475669-e288648b2339"
    ]
  }
];

const PortfolioPage = () => {
  const [selectedCategory, setSelectedCategory] = React.useState<PortfolioCategory>("All Projects")
  const [selectedProject, setSelectedProject] = React.useState<Project | null>(null)
  const [filteredProjects, setFilteredProjects] = React.useState(projects)

  React.useEffect(() => {
    setFilteredProjects(
      selectedCategory === "All Projects"
        ? projects
        : projects.filter(project => project.category === selectedCategory)
    )
  }, [selectedCategory])

  return (
    <BaseLayout className="min-h-screen bg-background font-sans">
      <PortfolioHero />
      
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <CategoryTabs
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 mb-32">
        <ProjectGrid
          projects={filteredProjects}
          onProjectSelect={setSelectedProject}
        />
      </div>

      <PortfolioCTA />

      <ProjectDetails
        project={selectedProject!}
        open={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </BaseLayout>
  )
}

export default PortfolioPage