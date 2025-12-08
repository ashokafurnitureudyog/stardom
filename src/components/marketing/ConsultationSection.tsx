import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ConsultationSection = () => {
  const steps = [
    {
      number: "1",
      title: "Initial Consultation",
      description:
        "Discuss your vision, requirements, and space dynamics with our design experts.",
    },
    {
      number: "2",
      title: "Custom Design Proposal",
      description:
        "Receive detailed 3D visualizations and comprehensive design recommendations.",
    },
    {
      number: "3",
      title: "Implementation Plan",
      description:
        "Get a detailed execution timeline and professional installation service.",
    },
  ];

  return (
    <div className="w-full bg-background py-20 md:py-32 font-sans">
      <div className="max-w-7xl mx-auto px-8 md:px-16">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left Column - Content */}
          <div className="space-y-12">
            <div className="space-y-6">
              <h3 className="text-primary/80 uppercase tracking-widest text-sm font-medium">
                Personalized Service
              </h3>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight text-foreground font-serif">
                Expert Design
                <span className="block mt-2 text-primary/90">Consultation</span>
              </h2>
              <p className="text-muted-foreground/90 text-lg leading-relaxed max-w-xl">
                Transform your workspace with our complimentary design
                consultation service. Our experts will guide you through
                creating the perfect environment that reflects your brand&apos;s
                prestige.
              </p>
            </div>

            <div className="space-y-8">
              {steps.map((step, index) => (
                <div key={index} className="flex gap-6 group">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:bg-primary/20 transition-colors duration-300">
                    <span className="text-primary/80 text-lg font-light">
                      {step.number}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xl font-light text-foreground">
                      {step.title}
                    </h4>
                    <p className="text-muted-foreground/80 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="relative group">
            {/* Glow effect container */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-lg blur-lg opacity-0 group-hover:opacity-50 transition-all duration-700" />

            <Card className="relative bg-background/95 border border-primary/10 group-hover:border-primary/30 transition-all duration-500">
              <CardHeader>
                <CardTitle className="text-2xl font-light">
                  Schedule Your Consultation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground/90">
                    Full Name
                  </label>
                  <Input
                    placeholder="Enter your full name"
                    className="bg-background/50 border-primary/10 focus:border-primary/30"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground/90">
                    Company
                  </label>
                  <Input
                    placeholder="Enter company name"
                    className="bg-background/50 border-primary/10 focus:border-primary/30"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground/90">
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-background/50 border-primary/10 focus:border-primary/30"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground/90">
                    Project Details
                  </label>
                  <Textarea
                    placeholder="Brief description of your project"
                    className="bg-background/50 border-primary/10 focus:border-primary/30 min-h-[120px]"
                  />
                </div>

                <button className="w-full bg-primary/90 hover:bg-primary text-background py-3 rounded transition-colors duration-300 group">
                  Schedule Consultation
                  <span className="ml-2 inline-block group-hover:translate-x-1 transition-transform duration-300">
                    →
                  </span>
                </button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultationSection;
