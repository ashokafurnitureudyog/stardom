"use client";
import {
  ArmchairIcon,
  ArrowRightIcon,
  BriefcaseIcon,
  CoffeeIcon,
  CrownIcon,
  LampDeskIcon,
  type LucideIcon,
  MonitorIcon,
  UsersIcon,
  WineIcon,
} from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types/ComponentTypes";

const categoryIcons: Record<string, LucideIcon> = {
  "signature series": CrownIcon,
  "director series": BriefcaseIcon,
  "executive series": ArmchairIcon,
  "work series": MonitorIcon,
  "visitor series": UsersIcon,
  "café series": CoffeeIcon,
  "bar series": WineIcon,
};

const getIconForCategory = (category: string) => {
  return categoryIcons[category.toLowerCase()] || LampDeskIcon;
};

export function FeaturedProducts({ featuredProducts }: { featuredProducts: Product[] }) {
  // Transform product data into bento grid format
  const bentoCells = featuredProducts.map((product, index) => {
    // Determine appropriate column span based on index
    // First and last items get more space
    const isLarge = index === 0 || index === 3;
    const className = isLarge ? "col-span-3 lg:col-span-2" : "col-span-3 lg:col-span-1";

    // Get icon based on category
    const Icon = getIconForCategory(product.category);

    // Create a shorter description for display
    const shortDescription =
      product.description.length > 100
        ? `${product.description.substring(0, 100)}...`
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
          <Image
            src={
              product.images && product.images.length > 0
                ? product.images[0]
                : `https://placehold.co/600x400?text=${encodeURIComponent(product.name)}`
            }
            alt={product.name}
            fill
            className="object-cover opacity-80 transition-all duration-500 group-hover:scale-105"
            sizes={isLarge ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 1024px) 100vw, 33vw"}
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
      Icon: CrownIcon,
      name: "Signature Series",
      description: "Flagship statement chairs, handcrafted for the corner office",
      detail: "Imported Italian Leather",
      href: "/products",
      cta: "Discover More",
      className: "col-span-3 lg:col-span-2",
      background: (
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="https://images.unsplash.com/photo-1497215728101-856f4ea42174"
            alt="Signature Series chair"
            fill
            className="object-cover opacity-80 transition-all duration-500 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 66vw"
          />
          <div className="absolute inset-0 bg-neutral-900/60 group-hover:bg-neutral-900/50 transition-all duration-500" />
        </div>
      ),
    },
    {
      Icon: BriefcaseIcon,
      name: "Director Series",
      description: "Premium MD and leadership chairs where decisions take shape",
      detail: "Full-Grain Upholstery",
      href: "/products",
      cta: "Discover More",
      className: "col-span-3 lg:col-span-1",
      background: (
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="https://images.unsplash.com/photo-1431540015161-0bf868a2d407"
            alt="Director Series chair"
            fill
            className="object-cover opacity-80 transition-all duration-500 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-neutral-900/60 group-hover:bg-neutral-900/50 transition-all duration-500" />
        </div>
      ),
    },
    {
      Icon: ArmchairIcon,
      name: "Executive Series",
      description: "Professional managerial chairs, precision-engineered for the full day",
      detail: "German Engineering",
      href: "/products",
      cta: "Discover More",
      className: "col-span-3 lg:col-span-1",
      background: (
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="https://images.unsplash.com/photo-1681418659069-eef28d44aeab"
            alt="Executive Series chair"
            fill
            className="object-cover opacity-80 transition-all duration-500 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-neutral-900/60 group-hover:bg-neutral-900/50 transition-all duration-500" />
        </div>
      ),
    },
    {
      Icon: MonitorIcon,
      name: "Work Series",
      description: "Workstation, task and staff chairs built for everyday performance",
      detail: "Artisan Crafted",
      href: "/products",
      cta: "Discover More",
      className: "col-span-3 lg:col-span-2",
      background: (
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="https://images.unsplash.com/photo-1464029902023-f42eba355bde"
            alt="Work Series chair"
            fill
            className="object-cover opacity-80 transition-all duration-500 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 66vw"
          />
          <div className="absolute inset-0 bg-neutral-900/60 group-hover:bg-neutral-900/50 transition-all duration-500" />
        </div>
      ),
    },
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
          style={{ willChange: "opacity, transform" }}
        >
          <div className="text-center mb-32">
            <div className="inline-flex items-center gap-3 bg-primary/5 px-6 py-3 rounded-full mb-8">
              <div className="h-px w-8 bg-primary/40" />
              <h3 className="text-primary/90 uppercase tracking-widest text-sm font-medium">
                Premium Selection
              </h3>
            </div>
            <h2 className="text-5xl md:text-7xl font-light tracking-tight mb-12 font-serif">
              Featured <span className="font-normal italic text-primary">Products</span>
            </h2>
            <p className="text-muted-foreground/90 max-w-2xl mx-auto text-lg leading-relaxed">
              Immerse yourself in a world of unparalleled sophistication. Each piece in our
              signature collection represents the pinnacle of artisanal craftsmanship and innovative
              design.
            </p>
          </div>
        </motion.div>

        <BentoGrid className="max-w-7xl mx-auto">
          {features.map((feature, idx) => (
            <BentoCard
              key={idx}
              {...feature}
              className={`${feature.className} group overflow-hidden border border-neutral-200 shadow-lg hover:shadow-xl transition-all duration-500`}
            />
          ))}
        </BentoGrid>

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
