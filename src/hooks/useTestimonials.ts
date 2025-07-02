"use client";

import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

// Define proper types for testimonials
export interface Testimonial {
  id?: string;
  name: string;
  title: string;
  location: string;
  context: string;
  purchaseDate: string;
  verified: boolean;
  quote: string;
  img: string;
}

// Default testimonials to use as fallback
const fallbackTestimonials: Testimonial[] = [
  {
    name: "Rajesh Kuma",
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

interface UseTestimonialsOptions {
  limit?: number;
}

interface UseTestimonialsResult {
  testimonials: Testimonial[];
  isLoading: boolean;
  isError: boolean;
  source: "api" | "fallback";
  refetch: () => Promise<unknown>;
}

export function useTestimonials(
  options: UseTestimonialsOptions = {},
): UseTestimonialsResult {
  const { limit } = options;
  const [source, setSource] = useState<"api" | "fallback">("fallback");

  const query = useQuery({
    queryKey: ["testimonials", { limit }],
    queryFn: async () => {
      try {
        const endpoint = `${window.location.origin}/api/testimonials`;

        const response = await fetch(endpoint, {
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
            Expires: "0",
          },
        });

        if (!response.ok) {
          setSource("fallback");
          return getFallbacks();
        }

        const data = await response.json();

        if (!data || !Array.isArray(data) || data.length === 0) {
          setSource("fallback");
          return getFallbacks();
        }

        const limitedData = limit ? data.slice(0, limit) : data;

        setSource("api");
        return limitedData as Testimonial[];
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setSource("fallback");
        return getFallbacks();
      }
    },
    placeholderData: getFallbacks,
    staleTime: 300000, // 5 minutes
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  function getFallbacks(): Testimonial[] {
    const fallbacks = [...fallbackTestimonials];
    return limit ? fallbacks.slice(0, limit) : fallbacks;
  }

  useEffect(() => {
    query.refetch();
  }, [query]);

  return {
    testimonials: query.data || getFallbacks(),
    isLoading: query.isLoading,
    isError: query.isError,
    source,
    refetch: query.refetch,
  };
}
