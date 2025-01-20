"use client"

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowRight, Quote, X } from 'lucide-react';
import BaseLayout from '@/components/layout/BaseLayout';

type Category = "All Projects" | "Executive Offices" | "Conference Rooms" | "Lounges" | "Collaborative Spaces";

interface Testimonial {
  quote: string;
  author: string;
  position: string;
}

interface Project {
  id: number;
  title: string;
  category: Category;
  thumbnail: string;
  description: string;
  challenge: string;
  solution: string;
  impact: string;
  testimonial: Testimonial;
  gallery: string[];
}

const categories: Category[] = [
  "All Projects",
  "Executive Offices",
  "Conference Rooms",
  "Lounges",
  "Collaborative Spaces"
];

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

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

const ProjectCard = ({ project, onClick }: ProjectCardProps) => (
  <motion.div
    layout
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="group cursor-pointer"
    onClick={onClick}
  >
    <Card className="overflow-hidden">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={project.thumbnail} 
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
          <Button variant="outline" className="border-2">
            View Project
          </Button>
        </div>
      </div>
      <CardHeader>
        <CardTitle className="font-serif text-2xl font-light">{project.title}</CardTitle>
        <CardDescription>{project.category}</CardDescription>
      </CardHeader>
    </Card>
  </motion.div>
);

interface ProjectDetailsProps {
  project: Project | null;
  open: boolean;
  onClose: () => void;
}

const ProjectDetails = ({ project, open, onClose }: ProjectDetailsProps) => {
  if (!project) return null;  // Early return if no project

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[90vh]">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
        
        <ScrollArea className="h-full pr-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-serif font-light mb-4">{project.title}</h2>
                <p className="text-muted-foreground">{project.description}</p>
              </div>

              <div>
                <h3 className="text-2xl font-serif mb-3">Challenge</h3>
                <p className="text-muted-foreground">{project.challenge}</p>
              </div>

              <div>
                <h3 className="text-2xl font-serif mb-3">Solution</h3>
                <p className="text-muted-foreground">{project.solution}</p>
              </div>

              <div>
                <h3 className="text-2xl font-serif mb-3">Impact</h3>
                <p className="text-muted-foreground">{project.impact}</p>
              </div>

              <Card className="bg-muted">
                <CardContent className="pt-6">
                  <Quote className="text-primary w-8 h-8 mb-4" />
                  <p className="text-lg font-serif italic mb-4">{project.testimonial.quote}</p>
                  <div>
                    <p className="font-medium">{project.testimonial.author}</p>
                    <p className="text-muted-foreground">{project.testimonial.position}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              {project.gallery.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${project.title} - Image ${index + 1}`}
                  className="w-full rounded-lg"
                />
              ))}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

const PortfolioPage = () => {
  const [selectedCategory, setSelectedCategory] = React.useState<Category>("All Projects");
  const [selectedProject, setSelectedProject] = React.useState<Project | null>(null);
  const [filteredProjects, setFilteredProjects] = React.useState(projects);

  React.useEffect(() => {
    setFilteredProjects(
      selectedCategory === "All Projects"
        ? projects
        : projects.filter(project => project.category === selectedCategory)
    );
  }, [selectedCategory]);

  return (
    <BaseLayout className="min-h-screen bg-background font-sans">
      {/* Header Section */}
      <section className="py-32 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-3 bg-primary/5 px-6 py-3 rounded-full mb-8">
            <div className="h-px w-8 bg-primary/40" />
            <h3 className="text-primary/90 uppercase tracking-widest text-sm font-medium">
              Our Portfolio
            </h3>
          </div>
          <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-12 font-serif">
            Crafting <span className="font-normal italic text-primary">Excellence</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Explore our portfolio of distinguished projects where innovative design
            meets uncompromising quality, creating spaces that inspire and endure.
          </p>
        </motion.div>
      </section>

      {/* Filtering Tabs */}
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <Tabs defaultValue="All Projects" className="w-full">
          <TabsList className="w-full justify-start mb-8">
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Project Grid */}
      <div className="max-w-7xl mx-auto px-4 mb-32">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Start a Project CTA */}
      <section className="bg-background py-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-light mb-8 font-serif">
            Ready to Create Something <span className="italic text-primary">Extraordinary?</span>
          </h2>
          <p className="text-muted-foreground mb-12 text-lg">
            Let&apos;s collaborate to transform your vision into reality. Our team of expert craftsmen
            and designers are ready to bring your project to life.
          </p>
          <Button 
            size="lg"
            className="min-w-[240px] h-14 text-lg tracking-wide"
          >
            Start Your Project
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </section>

      {/* Project Details Modal */}
      <ProjectDetails
        project={selectedProject!}
        open={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </BaseLayout>
  );
};

export default PortfolioPage;