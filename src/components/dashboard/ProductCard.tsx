"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import type { Product } from "@/types/ComponentTypes";

export const ProductCard = ({
  product,
  onDelete,
}: {
  product: Product;
  onDelete: (id: string, images: string[]) => void;
}) => {
  return (
    <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
      <div className="aspect-square bg-muted rounded-lg mb-4" />
      <h3 className="font-medium mb-2">{product.name}</h3>
      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
        {product.description}
      </p>
      <div className="flex justify-end gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Edit</Button>
          </DialogTrigger>
        </Dialog>
        <Button
          variant="destructive"
          onClick={() => onDelete(product.id, product.images)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};
