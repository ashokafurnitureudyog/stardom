"use client";
import React from "react";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { Button } from "@/components/ui/button";
import {
  ArrowRightIcon,
  ArchiveIcon,
  ClipboardIcon,
  LampDeskIcon,
  LayoutGridIcon,
  TableIcon,
  LucideIcon,
  SofaIcon,
  Table2Icon,
  TableColumnsSplitIcon,
  CoffeeIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "next-view-transitions";
import { useProducts } from "@/hooks/useProducts";
import { Skeleton } from "@/components/ui/skeleton";

// Define better icons matching your actual product categories
const categoryIcons: Record<string, LucideIcon> = {
  chairs: ArchiveIcon,
  tables: TableIcon,
  workstations: LayoutGridIcon,
  reception: ClipboardIcon,
  storage: ArchiveIcon,
  lounges: SofaIcon,
  training: Table2Icon,
  desks: Table2Icon,
  partitions: TableColumnsSplitIcon,
  cafeteria: CoffeeIcon,
};

// Fallback icon for categories not in the map
const getIconForCategory = (category: string) => {
  return categoryIcons[category.toLowerCase()] || LampDeskIcon;
};

// Skeleton loader component for bento cards
const BentoCardSkeleton = ({ className }: { className: string }) => (
  <div
    className={`${className} group overflow-hidden border border-neutral-200 shadow-lg bg-background relative rounded-xl`}
  >
    <div className="absolute inset-0">
      <Skeleton className="w-full h-full" />
    </div>
    <div className="relative z-10 p-6 md:p-8 h-full flex flex-col justify-between">
      <div className="space-y-4">
        <Skeleton className="h-8 w-8 rounded-md" /> {/* Icon */}
        <div className="space-y-2">
          <Skeleton className="h-7 w-3/4" /> {/* Title */}
          <Skeleton className="h-4 w-full" /> {/* Description line 1 */}
          <Skeleton className="h-4 w-2/3" /> {/* Description line 2 */}
        </div>
      </div>
      <div className="pt-4 mt-4">
        <Skeleton className="h-5 w-24" /> {/* Detail text */}
      </div>
    </div>
  </div>
);

export function FeaturedProducts() {
  // Use the hook to get featured products
  const { featuredProducts, isFeaturedLoading } = useProducts();

  // Transform product data into bento grid format
  const bentoCells = featuredProducts.map((product, index) => {
    // Determine appropriate column span based on index
    // First and last items get more space
    const className =
      index === 0 || index === 3
        ? "col-span-3 lg:col-span-2"
        : "col-span-3 lg:col-span-1";

    // Get icon based on category
    const Icon = getIconForCategory(product.category);

    // Create a shorter description for display
    const shortDescription =
      product.description.length > 100
        ? product.description.substring(0, 100) + "..."
        : product.description;

    return {
      Icon,
      name: product.name,
      description: shortDescription,
      detail: product.product_collection, // Show collection as detail
      href: `/products/${product.id}`,
      cta: "View Details",
      className,
      background: (
        <div className="absolute inset-0 w-full h-full">
          <img
            src={
              product.images && product.images.length > 0
                ? product.images[0]
                : `https://placehold.co/600x400?text=${encodeURIComponent(product.name)}`
            }
            alt={product.name}
            className="w-full h-full object-cover opacity-80 transition-all duration-500 group-hover:scale-105"
          />
          {/* Darker overlay for better text contrast */}
          <div className="absolute inset-0 dark:bg-neutral-900/60 dark:group-hover:bg-neutral-900/50 transition-all duration-500" />
        </div>
      ),
    };
  });

  // Fallback data with the same improved contrast
  const fallbackFeatures = [
    {
      Icon: Table2Icon,
      name: "Luxury Executive Desks",
      description: "Handcrafted masterpieces for distinguished leaders",
      detail: "Imported Italian Wood",
      href: "/products",
      cta: "Discover More",
      className: "col-span-3 lg:col-span-2",
      background: (
        <div className="absolute inset-0 w-full h-full">
          <img
            src="https://images.unsplash.com/photo-1497215728101-856f4ea42174"
            alt="Luxury Executive Desk"
            className="w-full h-full object-cover opacity-80 transition-all duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-neutral-900/60 group-hover:bg-neutral-900/50 transition-all duration-500" />
        </div>
      ),
    },
    {
      Icon: TableIcon,
      name: "Premium Conference Solutions",
      description: "Where visionary decisions take shape",
      detail: "Smart Integration Ready",
      href: "/products",
      cta: "Discover More",
      className: "col-span-3 lg:col-span-1",
      background: (
        <div className="absolute inset-0 w-full h-full">
          <img
            src="https://images.unsplash.com/photo-1431540015161-0bf868a2d407"
            alt="Conference Room"
            className="w-full h-full object-cover opacity-80 transition-all duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-neutral-900/60 group-hover:bg-neutral-900/50 transition-all duration-500" />
        </div>
      ),
    },
    {
      Icon: ArchiveIcon,
      name: "Elite Ergonomic Seating",
      description: "Precision-engineered comfort for excellence",
      detail: "German Engineering",
      href: "/products",
      cta: "Discover More",
      className: "col-span-3 lg:col-span-1",
      background: (
        <div className="absolute inset-0 w-full h-full">
          <img
            src="https://images.unsplash.com/photo-1681418659069-eef28d44aeab"
            alt="Ergonomic Chair"
            className="w-full h-full object-cover opacity-80 transition-all duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-neutral-900/60 group-hover:bg-neutral-900/50 transition-all duration-500" />
        </div>
      ),
    },
    {
      Icon: SofaIcon,
      name: "Designer Lounge Collection",
      description: "Contemporary comfort meets timeless sophistication",
      detail: "Artisan Crafted",
      href: "/products",
      cta: "Discover More",
      className: "col-span-3 lg:col-span-2",
      background: (
        <div className="absolute inset-0 w-full h-full">
          <img
            src="https://images.unsplash.com/photo-1464029902023-f42eba355bde"
            alt="Lounge Collection"
            className="w-full h-full object-cover opacity-80 transition-all duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-neutral-900/60 group-hover:bg-neutral-900/50 transition-all duration-500" />
        </div>
      ),
    },
  ];

  // Define skeleton layout matching the actual content
  const skeletonLayout = [
    { className: "col-span-3 lg:col-span-2" },
    { className: "col-span-3 lg:col-span-1" },
    { className: "col-span-3 lg:col-span-1" },
    { className: "col-span-3 lg:col-span-2" },
  ];

  // Use the fetched products if available, otherwise use fallback data
  const features = bentoCells.length > 0 ? bentoCells : fallbackFeatures;

  return (
    <div className="w-full py-40 px-4 font-sans">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-32"
        >
          <div className="text-center mb-32">
            <div className="inline-flex items-center gap-3 bg-primary/5 px-6 py-3 rounded-full mb-8">
              <div className="h-px w-8 bg-primary/40" />
              <h3 className="text-primary/90 uppercase tracking-widest text-sm font-medium">
                Premium Selection
              </h3>
            </div>
            <h2 className="text-5xl md:text-7xl font-light tracking-tight mb-12 font-serif">
              Featured{" "}
              <span className="font-normal italic text-primary">Products</span>
            </h2>
            <p className="text-muted-foreground/90 max-w-2xl mx-auto text-lg leading-relaxed">
              Immerse yourself in a world of unparalleled sophistication. Each
              piece in our signature collection represents the pinnacle of
              artisanal craftsmanship and innovative design.
            </p>
          </div>
        </motion.div>

        {isFeaturedLoading ? (
          <BentoGrid className="max-w-7xl mx-auto">
            {skeletonLayout.map((item, idx) => (
              <BentoCardSkeleton key={idx} className={item.className} />
            ))}
          </BentoGrid>
        ) : (
          <BentoGrid className="max-w-7xl mx-auto">
            {features.map((feature, idx) => (
              <BentoCard
                key={idx}
                {...feature}
                className={`${feature.className} group overflow-hidden border border-neutral-200 shadow-lg hover:shadow-xl transition-all duration-500`}
              />
            ))}
          </BentoGrid>
        )}

        <div className="text-center mt-24">
          <Button
            variant="link"
            className="text-neutral-600 dark:hover:text-neutral-400 hover:text-neutral-900 text-lg tracking-wide group transition-all duration-300"
            asChild
          >
            <div>
              <Link href="/products">View Complete Portfolio</Link>
              <ArrowRightIcon className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default FeaturedProducts;
