import { z } from "zod";

export const testimonialSchema = z.object({
  name: z.string().min(1, "Name is required"),
  title: z.string().min(1, "Title/Role is required"),
  location: z.string().min(1, "Location is required"),
  context: z.string().optional().or(z.literal("")),
  purchaseDate: z.string().optional().or(z.literal("")),
  quote: z.string().min(10, "Quote must be at least 10 characters"),
  img: z.string().optional().or(z.literal("")),
  id: z.string().optional(),
  imageRemoved: z.string().optional(),
});
