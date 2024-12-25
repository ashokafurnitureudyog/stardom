import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { FileStack, Pencil, Check } from "lucide-react";

const CraftsmanshipSection = () => {
  const processes = [
    {
      icon: <FileStack className="w-10 h-10" />,
      title: "Material Selection",
      description: "Sourcing the finest materials from sustainable forests and premium suppliers worldwide, ensuring unparalleled quality in every piece."
    },
    {
      icon: <Pencil className="w-10 h-10" />,
      title: "Master Crafting",
      description: "Each masterpiece is meticulously handcrafted by our skilled artisans, bringing decades of expertise to every intricate detail."
    },
    {
      icon: <Check className="w-10 h-10" />,
      title: "Quality Assurance",
      description: "Our rigorous multi-stage quality assessment ensures absolute perfection, upholding our legacy of excellence."
    }
  ];

  const stats = [
    { value: "45+", label: "Master Artisans" },
    { value: "200+", label: "Crafting Hours" },
    { value: "12", label: "Quality Stages" },
    { value: "100%", label: "Client Satisfaction" }
  ];

  return (
    <div className="w-full bg-background py-20 md:py-32 font-sans">
      <div className="max-w-7xl mx-auto px-8 md:px-16">
        <div className="text-center mb-16 md:mb-24 space-y-6">
          <h3 className="text-primary/80 uppercase tracking-widest text-sm font-medium">
            Mastery in Creation
          </h3>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight text-foreground font-serif">
            The Art of Fine
            <span className="block mt-2 text-primary/90">Craftsmanship</span>
          </h2>
          <p className="text-muted-foreground/90 max-w-2xl mx-auto text-lg leading-relaxed">
            Each piece embodies the perfect harmony of traditional artisanship and contemporary innovation,
            creating timeless masterpieces that define luxury.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {processes.map((process, index) => (
            <div key={index} className="group relative">
              {/* Glow effect container */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-lg blur-lg opacity-0 group-hover:opacity-75 transition-all duration-700 group-hover:duration-500" />
              
              {/* Inner glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-700 blur-sm" />
              
              <Card className="relative bg-background/95 border border-primary/10 group-hover:border-primary/30 transition-all duration-500">
                <CardContent className="p-8">
                  <div className="mb-6 text-primary/80 transition-colors duration-300 group-hover:text-primary">
                    {process.icon}
                  </div>
                  <h3 className="text-2xl font-extralight mb-4 text-foreground">{process.title}</h3>
                  <p className="text-muted-foreground/90 leading-relaxed">{process.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 border-y border-primary/10 py-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="text-4xl md:text-5xl font-extralight text-foreground mb-3 transition-colors duration-300 group-hover:text-primary/90">
                {stat.value}
              </div>
              <div className="text-muted-foreground/80 tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <button className="text-lg text-primary/90 hover:text-primary inline-flex items-center group font-light">
            Discover Our Craftsmanship Process
            <span className="ml-3 group-hover:translate-x-1.5 transition-transform duration-300">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CraftsmanshipSection;