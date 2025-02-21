import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";
import { ProjectDetailsProps } from "@/types/ComponentTypes";

export const ProjectDetails = ({
  project,
  open,
  onClose,
}: ProjectDetailsProps) => {
  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[90vh] p-0 overflow-hidden bg-gradient-to-b from-background to-background/80 backdrop-blur-sm font-sans">
        <ScrollArea className="h-full">
          <div className="p-8 md:p-12">
            {/* Enhanced Header Section */}
            <div className="max-w-3xl mb-20 relative">
              <div className="space-y-2">
                <h2 className="text-5xl font-serif font-light mb-8 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                  {project.title}
                </h2>
              </div>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Enhanced Main Content */}
            <div className="max-w-5xl mx-auto space-y-24">
              {/* Challenge Section with Image */}
              <div className="flex flex-col md:flex-row gap-16 items-start">
                <section className="flex-1 group">
                  <div className="mb-6 flex items-center space-x-2">
                    <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-medium">1</span>
                    </span>
                    <h3 className="text-2xl font-serif tracking-tight">
                      The Challenge
                    </h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">
                    {project.challenge}
                  </p>
                </section>
                {project.gallery[0] && (
                  <div className="md:w-1/2 w-full">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-lg">
                      <img
                        src={project.gallery[0]}
                        alt={`${project.title} - Challenge`}
                        className="w-full h-full object-cover hover:scale-105 transition-all duration-500 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                )}
              </div>

              {/* Solution Section with Image */}
              <div className="flex flex-col md:flex-row-reverse gap-16 items-start">
                <section className="flex-1 group">
                  <div className="mb-6 flex items-center space-x-2">
                    <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-medium">2</span>
                    </span>
                    <h3 className="text-2xl font-serif tracking-tight">
                      Our Solution
                    </h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">
                    {project.solution}
                  </p>
                </section>
                {project.gallery[1] && (
                  <div className="md:w-1/2 w-full">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-lg">
                      <img
                        src={project.gallery[1]}
                        alt={`${project.title} - Solution`}
                        className="w-full h-full object-cover hover:scale-105 transition-all duration-500 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                )}
              </div>

              {/* Impact Section with Image */}
              <div className="flex flex-col md:flex-row gap-16 items-start">
                <section className="flex-1 group">
                  <div className="mb-6 flex items-center space-x-2">
                    <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-medium">3</span>
                    </span>
                    <h3 className="text-2xl font-serif tracking-tight">
                      The Impact
                    </h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">
                    {project.impact}
                  </p>
                </section>
                {project.gallery[2] && (
                  <div className="md:w-1/2 w-full">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-lg">
                      <img
                        src={project.gallery[2]}
                        alt={`${project.title} - Impact`}
                        className="w-full h-full object-cover hover:scale-105 transition-all duration-500 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                )}
              </div>

              {/* Enhanced Testimonial Section */}
              <div className="my-24">
                <Card className="bg-primary/5 border-none shadow-none overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                  <CardContent className="pt-12 pb-8 px-8 md:px-12">
                    <Quote className="text-primary w-8 h-8 mb-8" />
                    <p className="text-2xl font-serif italic mb-8 leading-relaxed">
                      {project.testimonial.quote}
                    </p>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary font-medium">
                          {project.testimonial.author.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">
                          {project.testimonial.author}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {project.testimonial.position}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Enhanced Gallery Grid */}
              {project.gallery.slice(3).length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {project.gallery.slice(3).map((image, index) => (
                    <div
                      key={index}
                      className="group relative aspect-[4/3] overflow-hidden rounded-xl shadow-lg cursor-pointer"
                    >
                      <img
                        src={image}
                        alt={`${project.title} - Additional Image ${index + 4}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDetails;
