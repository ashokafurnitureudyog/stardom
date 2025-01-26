import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, Quote } from "lucide-react";
import { ProjectDetailsProps } from "@/types/ComponentTypes";

export const ProjectDetails = ({
  project,
  open,
  onClose,
}: ProjectDetailsProps) => {
  if (!project) return null;

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
                <h2 className="text-4xl font-serif font-light mb-4">
                  {project.title}
                </h2>
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
                  <p className="text-lg font-serif italic mb-4">
                    {project.testimonial.quote}
                  </p>
                  <div>
                    <p className="font-medium">{project.testimonial.author}</p>
                    <p className="text-muted-foreground">
                      {project.testimonial.position}
                    </p>
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
