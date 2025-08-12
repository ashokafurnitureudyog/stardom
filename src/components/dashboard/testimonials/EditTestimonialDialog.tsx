"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { TestimonialForm } from "./TestimonialForm";
import { ClientTestimonial } from "@/types/ComponentTypes";

interface EditTestimonialDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  testimonial: ClientTestimonial;
  onSuccess: () => void;
}

export function EditTestimonialDialog({
  open,
  onOpenChange,
  testimonial,
  onSuccess,
}: EditTestimonialDialogProps) {
  const handleSuccess = () => {
    onSuccess();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-6 bg-[#171410] border-[#352b1c]">
        <TestimonialForm
          onSuccess={handleSuccess}
          initialData={testimonial}
          isEditing={true}
        />
      </DialogContent>
    </Dialog>
  );
}
