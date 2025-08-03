"use client";
import { useState, ReactNode } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ProductForm } from "./ProductForm";
import type { Product } from "@/types/ComponentTypes";
import { useToast } from "@/hooks/use-toast";

interface EditProductDialogProps {
  product: Product;
  onSuccess?: () => void;
  children: ReactNode;
}

export function EditProductDialog({
  product,
  onSuccess,
  children,
}: EditProductDialogProps) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleSuccess = () => {
    setOpen(false);

    toast({
      title: "Product updated",
      description: "The product has been successfully updated.",
    });

    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-6 bg-neutral-900 border border-[#3C3120]">
        <ProductForm
          initialData={product}
          onSuccess={handleSuccess}
          isEditing={true}
        />
      </DialogContent>
    </Dialog>
  );
}
