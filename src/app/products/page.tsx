"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Grid, LayoutList } from "lucide-react";
import BaseLayout from "@/components/layout/BaseLayout";
import { cn } from "@/lib/utils";

interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  price: string;
  image: string;
  features: string[];
}

interface Category {
  id: string;
  name: string;
}

// Sample data
const categories: Category[] = [
  { id: "all", name: "All Products" },
  { id: "executive", name: "Executive Desks" },
  { id: "conference", name: "Conference Solutions" },
  { id: "seating", name: "Elite Seating" },
  { id: "lounge", name: "Designer Lounge" },
];

const products: Product[] = [
  {
    id: 1,
    name: "Executive Magnus Desk",
    category: "executive",
    description: "Premium Italian wood crafted executive desk with integrated technology solutions",
    price: "On Request",
    image: "https://images.unsplash.com/photo-1531973576160-7125cd663d86",
    features: ["Italian Wood", "Smart Integration", "Cable Management"],
  },
  // Add more products...
];

const ProductCard = ({ 
  product, 
  viewMode 
}: { 
  product: Product; 
  viewMode: "grid" | "list"; 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Card className={cn(
      "group overflow-hidden",
      viewMode === "list" && "flex gap-8"
    )}>
      <div className={cn(
        "relative overflow-hidden",
        viewMode === "grid" ? "h-64" : "w-80"
      )}>
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

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    let filtered = products;

    if (selectedCategory !== "all") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        product =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      );
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, searchQuery]);

  return (
    <BaseLayout>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative h-[40vh] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 to-background/70" />
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c"
            alt="Products Hero"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-light mb-6">
                Our <span className="font-serif italic text-primary">Collection</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Discover our curated selection of premium office furniture,
                where every piece tells a story of exceptional craftsmanship.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Categories */}
        <div className="border-b">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <ScrollArea className="w-full whitespace-nowrap">
              <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
                <TabsList className="h-12">
                  {categories.map((category) => (
                    <TabsTrigger
                      key={category.id}
                      value={category.id}
                      className="px-6 text-lg"
                    >
                      {category.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </div>

        {/* Search and View Toggle */}
        <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className={viewMode === "grid" ? "bg-accent" : ""}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className={viewMode === "list" ? "bg-accent" : ""}
                >
                  <LayoutList className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <main className="max-w-7xl mx-auto px-6 py-12">
          <div className={cn(
            "grid gap-8",
            viewMode === "grid" 
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
              : "grid-cols-1"
          )}>
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                viewMode={viewMode}
              />
            ))}
          </div>
        </main>
      </div>
    </BaseLayout>
  );
}