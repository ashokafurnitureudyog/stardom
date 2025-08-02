"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { HomeIcon, Package, Clock, ArrowRightIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Feature, Collection } from "@/types/ComponentTypes";
import { Link } from "next-view-transitions";

const ProductCard = ({
  collection,
  index,
}: {
  collection: Collection;
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: index * 0.2 }}
    className="group relative overflow-hidden"
  >
    {/* Decorative corner elements */}
    <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-primary/20 opacity-0 group-hover:opacity-100 transition-all duration-500" />
    <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-primary/20 opacity-0 group-hover:opacity-100 transition-all duration-500" />

    <div className="relative overflow-hidden">
      <div className="aspect-[4/3] w-full">
        <img
          src={collection.image}
          alt={collection.name}
          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transform transition-all duration-1000 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60 group-hover:opacity-0 transition-opacity duration-500" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-12 bg-gradient-to-t from-background via-background/95 to-transparent transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-3xl font-light text-foreground mb-4 font-serif">
            {collection.name}
          </h3>
          <p className="text-primary/90 tracking-wider uppercase text-sm mb-6 font-medium">
            {collection.subtitle}
          </p>
          <Button
            variant="ghost"
            className="group/btn hover:bg-primary/5 px-6"
            asChild
          >
            <Link href={`/products/collections/${collection.id}`}>
              <div className="cursor-pointer flex items-center">
                Discover
                <ArrowRightIcon className="ml-2 w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-300" />
              </div>
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  </motion.div>
);

const FeatureCard = ({
  feature,
  index,
}: {
  feature: Feature;
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: index * 0.1 }}
    className="relative group"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg transform -rotate-1" />
    <div className="relative p-12 flex flex-col items-center text-center">
      <div className="mb-8 transform group-hover:scale-110 transition-transform duration-500">
        {feature.icon}
      </div>
      <h3 className="text-xl font-medium text-foreground mb-4 tracking-wide">
        {feature.title}
      </h3>
      <p className="text-muted-foreground/80 text-lg">{feature.description}</p>
    </div>
  </motion.div>
);

const SignatureCollection = () => {
  const collections = [
    {
      id: "m1",
      name: "Executive Desks",
      subtitle: "Professional Elegance",
      image: "/images/products/exec-desk-display.jpg",
      description:
        "Premium executive desk solutions with sophisticated design and integrated technology",
      price: "2499.99",
      features: [
        "Premium wood finishes",
        "Integrated cable management",
        "Executive styling",
        "Spacious work surface",
      ],
      mainCategory: "Desks",
      subCategory: "Executive",
    },
    {
      id: "s2",
      name: "Luxury Lounges",
      subtitle: "Refined Comfort",
      image: "/images/products/luxury_lounge_display.jpg",
      description:
        "Sophisticated lounge furniture combining contemporary style with unparalleled comfort",
      price: "3599.99",
      features: [
        "Premium upholstery",
        "Ergonomic design",
        "Modern aesthetics",
        "Versatile configurations",
      ],
      mainCategory: "Lounges",
      subCategory: "Reception",
    },
    {
      id: "c3",
      name: "Premium Seating",
      subtitle: "Ergonomic Excellence",
      image: "/images/products/Seating_display.jpg",
      description:
        "High-performance ergonomic seating solutions designed for all-day comfort",
      price: "1299.99",
      features: [
        "Adjustable support",
        "Breathable materials",
        "Customizable settings",
        "Modern design language",
      ],
      mainCategory: "Seating",
      subCategory: "Office Chairs",
    },
  ];

  const features = [
    {
      icon: <HomeIcon className="w-8 h-8 text-primary/90" />,
      title: "Artisanal Customization",
      description:
        "Meticulously crafted solutions tailored to discerning brands and distinguished partners",
    },
    {
      icon: <Package className="w-8 h-8 text-primary/90" />,
      title: "Elite Logistics Network",
      description:
        "Sophisticated nationwide distribution infrastructure serving premium retailers and distinguished clientele",
    },
    {
      icon: <Clock className="w-8 h-8 text-primary/90" />,
      title: "Expedited Craftsmanship",
      description:
        "Precision-engineered production ensuring swift fulfillment of prestigious bulk orders within 10-12 days",
    },
  ];

  return (
    <div className="w-full bg-background py-32 md:py-40 px-8 md:px-16 font-sans relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-32"
        >
          <div className="inline-flex items-center gap-3 bg-primary/5 px-6 py-3 rounded-full mb-8">
            <div className="h-px w-8 bg-primary/40" />
            <h3 className="text-primary/90 uppercase tracking-widest text-sm font-medium">
              Curated Excellence
            </h3>
          </div>

          <h2 className="text-5xl md:text-7xl font-light tracking-tight text-foreground mb-8">
            <span className="font-serif">Signature</span>{" "}
            <span className="text-primary/90 font-serif italic">
              Collection
            </span>
          </h2>

          <p className="text-muted-foreground/90 max-w-2xl mx-auto text-lg leading-relaxed">
            Discover our most prestigious pieces, where form meets function in
            perfect harmony. Each creation embodies the epitome of luxury office
            furnishing.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
          {collections.map((collectionItem, index) => (
            <ProductCard
              key={collectionItem.id}
              collection={collectionItem}
              index={index}
            />
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <Button
            variant="ghost"
            className="text-lg group px-8 py-6 hover:bg-primary/5"
            asChild
          >
            <Link
              href="/products/collections"
              className="flex items-center justify-center"
            >
              <div className="flex items-center justify-center">
                Explore Complete Collection
                <ArrowRightIcon className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default SignatureCollection;
