import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types/ComponentTypes";
import { Link } from "next-view-transitions";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { id, name, description, image, collection } = product;

  return (
    <div className="group relative">
      {/* Glow effect container */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-lg blur-lg opacity-0 group-hover:opacity-75 transition-all duration-700 group-hover:duration-500" />

      {/* Inner glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-700 blur-sm" />

      <Card className="relative overflow-hidden bg-background/95 border border-primary/10 group-hover:border-primary/30 transition-all duration-500 h-full flex flex-col">
        <div className="aspect-[4/3] w-full relative overflow-hidden">
          <img
            src={image}
            alt={name}
            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 p-3">
            <Badge
              variant="secondary"
              className="bg-background/80 hover:bg-background/90"
            >
              {collection.charAt(0).toUpperCase() + collection.slice(1)}
            </Badge>
          </div>
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-light text-foreground font-serif">
            {name}
          </h3>
          <p className="text-muted-foreground/80 text-sm mt-2 line-clamp-2 flex-grow">
            {description}
          </p>

          <div className="mt-4 pt-4 border-t border-primary/10">
            <Link href={`/products/${id}`}>
              <button className="w-full py-2 border border-primary/20 text-primary/90 hover:text-primary hover:border-primary/40 transition-all duration-300 font-light">
                View Details
              </button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};
