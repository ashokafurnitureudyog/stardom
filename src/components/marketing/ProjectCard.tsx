"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProjectCardProps } from "@/types/ComponentTypes";

export const ProjectCard = ({ project, onClick }: ProjectCardProps) => (
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
        <CardTitle className="font-serif text-2xl font-light">
          {project.title}
        </CardTitle>
        <CardDescription>{project.category.toString()}</CardDescription>
      </CardHeader>
    </Card>
  </motion.div>
);
