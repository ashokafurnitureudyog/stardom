"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { PortfolioForm } from "./PortfolioForm";
import { PortfolioProjectType } from "./portfolio/types";

interface EditPortfolioDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: PortfolioProjectType;
  onSuccess: () => void;
}

export function EditPortfolioDialog({
  open,
  onOpenChange,
  project,
  onSuccess,
}: EditPortfolioDialogProps) {
  // Transform the project data to match the form data structure
  const initialData = {
    id: project.id || project.$id || "",
    title: project.title,
    description: project.description,
    challenge: project.challenge || "",
    solution: project.solution || "",
    impact: project.impact || "",
    tags: project.tags || [],
    thumbnail: project.thumbnail || "",
    gallery: project.gallery || [],
    testimonial: project.testimonial || {
      quote: "",
      author: "",
      position: "",
    },
    testimonial_quote: project.testimonial?.quote || "",
    testimonial_author: project.testimonial?.author || "",
    testimonial_position: project.testimonial?.position || "",
    $id: project.$id || "",
    $createdAt: project.$createdAt || "",
    $updatedAt: project.$updatedAt || "",
  };

  const handleSuccess = () => {
    onSuccess();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] sm:max-w-[900px] max-h-[90vh] overflow-y-auto bg-neutral-900 border border-[#3C3120]">
        <PortfolioForm
          initialData={initialData}
          onSuccess={handleSuccess}
          isEditing={true}
        />
      </DialogContent>
    </Dialog>
  );
}
