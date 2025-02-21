"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
    <Card className="overflow-hidden h-full flex flex-col">
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
        <div className="flex flex-wrap gap-2 mt-2">
          {project.tags?.map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          )) || (
            <>
              <Badge variant="outline" className="text-xs">
                Interior Design
              </Badge>
              <Badge variant="outline" className="text-xs">
                Corporate
              </Badge>
            </>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {project.description}
        </p>
        {project.impact && (
          <div className="mt-4 p-3 bg-muted/30 rounded-md">
            <p className="text-sm font-medium">Impact</p>
            <p className="text-sm text-muted-foreground">{project.impact}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-0 flex justify-between items-center">
        <div className="text-xs text-muted-foreground">
          {project.testimonial ? (
            <span>&apos;{project.testimonial.author}&apos;</span>
          ) : (
            <span>Client project</span>
          )}
        </div>
        <div className="flex items-center gap-1">
          {project.gallery && (
            <span className="text-xs text-muted-foreground">
              {project.gallery.length} photos
            </span>
          )}
        </div>
      </CardFooter>
    </Card>
  </motion.div>
);
