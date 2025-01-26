// components/products/ProductCard.tsx
"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Product } from "@/types/ComponentTypes";

export const ProductCard = ({
  product,
  viewMode,
}: {
  product: Product;
  viewMode: "grid" | "list";
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Card
      className={cn(
        "group overflow-hidden",
        viewMode === "list" && "flex gap-8",
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden",
          viewMode === "grid" ? "h-64" : "w-80",
        )}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex-1">
        <CardHeader>
          <CardTitle className="font-light">{product.name}</CardTitle>
          <p className="text-muted-foreground">{product.description}</p>
        </CardHeader>

        <CardContent>
          <div className="flex flex-wrap gap-2">
            {product.features.map((feature, index) => (
              <span
                key={index}
                className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full"
              >
                {feature}
              </span>
            ))}
          </div>
        </CardContent>

        <CardFooter className="flex items-center justify-between">
          <span className="font-serif italic text-primary text-lg">
            {product.price}
          </span>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-2">
                Learn More
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-3xl font-light">
                  {product.name}
                </DialogTitle>
              </DialogHeader>
              <div className="grid gap-6">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-80 object-cover rounded-lg"
                />
                <p className="text-muted-foreground">{product.description}</p>
                <div className="space-y-4">
                  <h4 className="font-medium">Key Features</h4>
                  <ul className="list-disc pl-4 space-y-2 text-muted-foreground">
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <Button className="w-full">Request Information</Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </div>
    </Card>
  </motion.div>
);
