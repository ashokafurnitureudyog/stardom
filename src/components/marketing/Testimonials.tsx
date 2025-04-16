"use client";
import React from "react";
import { FancyTestimonialsSlider } from "../ui/testimonialslider";
import { motion } from "framer-motion";
import { fadeInUpVariants } from "@/lib/constants/AnimationConstants";
import { Link } from "next-view-transitions";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Rajesh Kumar",
      title: "Director of Operations, Indus Global Solutions",
      location: "Gurugram",
      context: "Corporate Headquarters Renovation",
      purchaseDate: "January 2025",
      verified: true,
      quote:
        "After expanding our IT services team to 200+ employees, we needed premium office furniture that reflected our company's growth. Stardom delivered beyond expectations. The Monarch Executive desk series and ergonomic chairs have not only improved our team's productivity but also impressed our international clients during video conferences. The craftsmanship speaks volumes about attention to detail.",
      img: "https://avatar.iran.liara.run/public/boy?username=rajesh",
    },
    {
      name: "Priya Sharma",
      title: "Founder & Creative Director, DesignCraft Studios",
      location: "Mumbai",
      context: "Design Studio Workspace",
      purchaseDate: "November 2024",
      verified: true,
      quote:
        "In our creative industry, workspace aesthetics matter tremendously. We chose Stardom's Aria Collection for our 3000 sq ft studio after reviewing multiple premium vendors. The height-adjustable workstations have genuinely improved our team's work quality, and clients who visit our office inevitably ask about our furniture. The investment has already paid for itself in client impressions alone.",
      img: "https://avatar.iran.liara.run/public/girl?username=priya",
    },
    {
      name: "Amit Verma",
      title: "CEO, Pinnacle Financial Consultants",
      location: "Bangalore",
      context: "Executive Boardroom & Client Meeting Spaces",
      purchaseDate: "March 2025",
      verified: true,
      quote:
        "When we renovated our 15th-floor office in the financial district, we needed furniture that conveyed trust and stability to our high-net-worth clients. Stardom's Diplomat Conference Set and Heritage Collection cabinets have transformed our client meetings. The solid wood craftsmanship and premium upholstery communicate our attention to detail before we even begin discussions.",
      img: "https://avatar.iran.liara.run/public/boy?username=amit",
    },
  ];

  return (
    <div className="w-full bg-background py-20 md:py-32 px-8 md:px-16 font-sans relative">
      <div className="max-w-7xl mx-auto space-y-16 relative">
        <motion.div
          className="max-w-7xl mx-auto space-y-24 relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUpVariants}
        >
          <div className="text-center">
            <div className="inline-flex items-center gap-3 bg-primary/5 px-6 py-3 rounded-full mb-8">
              <div className="h-px w-8 bg-primary/40" />
              <h3 className="text-primary/90 uppercase tracking-widest text-sm font-medium">
                Client Testimonials
              </h3>
            </div>

            <h2 className="text-4xl md:text-6xl lg:text-7xl font-extralight tracking-tight text-foreground font-serif mb-8">
              Voices of
              <span className="block mt-4 font-normal italic text-primary/90">
                Excellence
              </span>
            </h2>

            <p className="text-muted-foreground/90 max-w-2xl mx-auto text-lg leading-relaxed">
              Discover why discerning organizations trust Stardom for their
              premium office furniture needs.
            </p>
          </div>
        </motion.div>

        <FancyTestimonialsSlider testimonials={testimonials} />

        <motion.div
          className="text-center mt-16 pt-12 border-t border-primary/10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUpVariants}
        >
          <h3 className="text-2xl md:text-3xl font-light text-foreground font-serif mb-4">
            Want to get featured too?
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Contact us with your title, review and we&apos;ll respond within a
            week.
          </p>
          <Link href="/contact">
            <button className="mt-6 px-8 py-3 bg-primary/10 hover:bg-primary/20 text-primary rounded-full transition-colors">
              Share Your Experience
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
