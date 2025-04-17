"use client";
import { Button } from "@/components/ui/button";

export const ProductsSection = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-light mb-2">Product Management</h2>
          <p className="text-muted-foreground">12 products in catalog</p>
        </div>
        <Button size="lg">+ Add Product</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="h-64 bg-secondary/30 rounded-lg animate-pulse"
          />
        ))}
      </div>
    </div>
  );
};
