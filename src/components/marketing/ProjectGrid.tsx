"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Project } from "@/types/ComponentTypes";
import { ProjectCard } from "./ProjectCard";

type ProjectGridProps = {
  projects: Project[];
  onProjectSelect: (project: Project) => void;
};

export const ProjectGrid = ({
  projects,
  onProjectSelect,
}: ProjectGridProps) => (
  <motion.div
    layout
    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
  >
    <AnimatePresence>
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onClick={() => onProjectSelect(project)}
        />
      ))}
    </AnimatePresence>
  </motion.div>
);
