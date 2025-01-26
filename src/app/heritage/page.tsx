"use client"

import React from 'react';
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star } from "lucide-react";
import BaseLayout from '@/components/layout/BaseLayout';
import { cn } from "@/lib/utils";
import TestimonialsSection from '@/components/marketing/Testimonials';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}

interface Achievement {
  title: string;
  description: string;
  icon: React.FC<{ className?: string }>;
}

const timelineEvents: TimelineEvent[] = [
  {
    year: "1985",
    title: "Foundation",
    description: "Established with a vision to redefine office furniture craftsmanship"
  },
  {
    year: "1995",
    title: "International Expansion",
    description: "Began exporting to luxury markets across Europe and Middle East"
  },
  {
    year: "2005",
    title: "Innovation Center",
    description: "Launched state-of-the-art design and manufacturing facility"
  },
  {
    year: "2015",
    title: "Sustainability Initiative",
    description: "Pioneered eco-friendly manufacturing processes"
  },
  {
    year: "2023",
    title: "Digital Transformation",
    description: "Integrated smart furniture solutions for modern workspaces"
  }
];

const teamMembers: TeamMember[] = [
  {
    name: "Rajesh Kumar",
    role: "Managing Director",
    bio: "30+ years of expertise in luxury furniture manufacturing",
    image: "https://images.unsplash.com/photo-1664575602554-2087b04935a5"
  }
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const achievements: Achievement[] = [
  {
    title: "ISO 9001:2015",
    description: "Certified for quality management systems",
    icon: Star
  }
];

const fadeInUpVariant = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8 }
};

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial="initial"
    whileInView="animate"
    variants={fadeInUpVariant}
    className="text-center mb-16"
  >
    <h2 className="text-4xl font-light mb-6">
      {children}
    </h2>
  </motion.div>
);

const Section: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <section className={cn("py-24", className)}>
    <div className="max-w-7xl mx-auto px-6">
      {children}
    </div>
  </section>
);

const HeritagePage: React.FC = () => {
  return (
    <BaseLayout>
      <div className="min-h-screen bg-background font-sans">
        {/* Hero Section */}
        <section className="relative h-[60vh] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/50 to-background/90" />
          <img
            src="https://images.unsplash.com/photo-1673448223123-168914f4edc8"
            alt="Heritage Hero"
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-center">
            <motion.div {...fadeInUpVariant}>
              <h1 className="text-5xl md:text-7xl font-light mb-6 text-foreground font-serif">
                Our <span className="font-serif italic text-primary">Heritage</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Four decades of crafting excellence, innovation, and timeless design.
                A journey of passion, precision, and unwavering commitment to quality.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission Statement */}
        <Section className="bg-card">
          <motion.div
            {...fadeInUpVariant}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-light mb-8">
              Our <span className="font-serif italic text-primary">Mission</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              To craft furniture that transcends utility, creating spaces where
              innovation meets tradition, and where every piece tells a story of
              excellence, sustainability, and timeless elegance.
            </p>
          </motion.div>
        </Section>

        {/* Timeline */}
        <Section className="bg-background">
          <SectionTitle>
            Our <span className="font-serif italic text-primary">Journey</span>
          </SectionTitle>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-border" />

            <div className="space-y-24">
              {timelineEvents.map((event, index) => (
                <motion.div
                  key={event.year}
                  initial="initial"
                  whileInView="animate"
                  variants={fadeInUpVariant}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className={cn(
                    "flex items-center",
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  )}
                >
                  <div className="w-1/2 pr-12 text-right">
                    <h3 className="text-5xl font-light text-primary mb-4">{event.year}</h3>
                    <h4 className="text-2xl font-light mb-2">{event.title}</h4>
                    <p className="text-muted-foreground">{event.description}</p>
                  </div>
                  <div className="relative">
                    <div className="w-4 h-4 rounded-full bg-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  </div>
                  <div className="w-1/2 pl-12" />
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        {/* Team Section */}
        <Section className="bg-card">
          <SectionTitle>
            Our <span className="font-serif italic text-primary">Team</span>
          </SectionTitle>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial="initial"
                whileInView="animate"
                variants={fadeInUpVariant}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <Card className="overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-80 object-cover"
                  />
                  <CardHeader>
                    <CardTitle className="text-2xl font-light">{member.name}</CardTitle>
                    <CardDescription className="font-serif italic text-primary">
                      {member.role}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{member.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Gallery Section */}
        <Section className="bg-card">
          <SectionTitle>
            Our <span className="font-serif italic text-primary">Culture</span>
          </SectionTitle>

          <Carousel className="w-full">
            <CarouselContent>
              {[1, 2, 3, 4, 5].map((_, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className="overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1676276383599-478e31770aac"
                        alt={`Culture ${index + 1}`}
                        className="w-full h-64 object-cover"
                      />
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </Section>

        <TestimonialsSection />
      </div>
    </BaseLayout>
  );
};

export default HeritagePage;