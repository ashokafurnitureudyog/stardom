import { z } from "zod";
import { PRODUCT_CATEGORIES } from "@/lib/constants/ProductCategories";

/**
 * Every shape the dashboard can write. Server actions parse their input against
 * these before touching Appwrite, so column limits are enforced in one place
 * rather than trusted from the form.
 */

const url = z.url("Must be a valid URL");
const optionalText = (max: number) => z.string().max(max).optional().or(z.literal(""));

export const testimonialSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required").max(200),
  title: z.string().min(1, "Title/Role is required").max(200),
  location: z.string().min(1, "Location is required").max(500),
  context: optionalText(1000),
  purchaseDate: optionalText(500),
  verified: z.boolean().optional(),
  quote: z.string().min(10, "Quote must be at least 10 characters").max(5000),
  img: optionalText(1000),
  imageRemoved: z.string().optional(),
});

export const productSchema = z.object({
  name: z.string().min(1, "Name is required").max(1000),
  description: z.string().min(1, "Description is required").max(5000),
  category: z.enum(PRODUCT_CATEGORIES, {
    message: "Pick one of the Stardom series",
  }),
  collection: z.string().min(1, "Collection is required").max(500),
  features: z.array(z.string().max(1000)).max(50).default([]),
  colors: z.array(z.string().max(1000)).max(50).default([]),
  images: z.array(url.max(1000)).max(20).default([]),
  removedImages: z.array(z.string()).optional(),
  imageColorMapping: z.string().max(50000).optional(),
});

export const portfolioProjectSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  tags: z.array(z.string().max(100)).max(20).default([]),
  thumbnail: optionalText(200),
  description: z.string().min(1, "Description is required").max(1000),
  challenge: z.string().min(1, "Challenge is required").max(1000),
  solution: z.string().min(1, "Solution is required").max(1000),
  impact: z.string().min(1, "Impact is required").max(1000),
  testimonial_quote: optionalText(1000),
  testimonial_author: optionalText(200),
  testimonial_position: optionalText(200),
  gallery: z.array(z.string().max(1000)).max(50).default([]),
  removedImages: z.array(z.string()).optional(),
});

export const heroMediaSchema = z.object({
  type: z.enum(["image", "video"]),
  src: url.max(1000),
  alt: optionalText(500),
  poster: optionalText(500),
  preload: z.boolean().optional(),
  webmSrc: optionalText(200),
  lowResSrc: optionalText(200),
});

export const companyInfoSchema = z.object({
  name: z.string().min(1).max(200),
  parentCompany: z.string().min(1).max(100),
  established: z.string().min(1).max(5),
  address: z.object({
    street: z.string().min(1).max(100),
    city: z.string().min(1).max(50),
    Country: z.string().min(1).max(50),
    zip: z.string().min(1).max(10),
    coordinates: z.tuple([z.number(), z.number()]),
  }),
  hours: z.object({
    weekday: z.string().min(1).max(50),
    sunday: z.string().min(1).max(50),
  }),
  phone: z.string().min(1).max(20),
  email: z.email().max(100),
  website: z.string().min(1).max(25),
  mapsLink: url.max(500),
});

export const socialLinksSchema = z
  .array(
    z.object({
      id: z.string().optional(),
      platform: z.string().min(1).max(1000),
      url: url.max(2000),
    }),
  )
  .max(20);

export const teamMembersSchema = z
  .array(
    z.object({
      id: z.string().optional(),
      name: z.string().min(1).max(200),
      role: z.string().min(1).max(100),
      bio: z.string().min(1).max(2000),
      image: z.string().min(1).max(500),
    }),
  )
  .max(50);

export const contactMessageSchema = z.object({
  name: z.string().min(1, "Name is required").max(120),
  email: z.email("Enter a valid email address").max(200),
  phone: optionalText(30),
  subject: optionalText(200),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000),
});

export type ProductInput = z.infer<typeof productSchema>;
export type PortfolioProjectInput = z.infer<typeof portfolioProjectSchema>;
export type HeroMediaInput = z.infer<typeof heroMediaSchema>;
export type TestimonialInput = z.infer<typeof testimonialSchema>;
export type CompanyInfoInput = z.infer<typeof companyInfoSchema>;
export type ContactMessageInput = z.infer<typeof contactMessageSchema>;
