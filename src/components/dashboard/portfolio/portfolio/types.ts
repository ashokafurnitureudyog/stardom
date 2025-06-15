/**
 * Local type definitions for Portfolio components
 *
 * Note: These types are defined here to maintain consistency across portfolio components
 * while we wait for the central types system to be updated. This approach prevents data
 * inconsistency between components while working with the current constraints.
 */

export interface PortfolioProjectType {
  id?: string;
  $id?: string;
  title: string;
  tags: string[];
  thumbnail: string;
  description: string;
  challenge: string;
  solution: string;
  impact: string;
  testimonial: {
    quote: string;
    author: string;
    position: string;
  };
  gallery: string[];
  $createdAt?: string;
  $updatedAt?: string;
}

export interface PortfolioFormData {
  id?: string;
  $id?: string;
  title?: string;
  description?: string;
  challenge?: string;
  solution?: string;
  impact?: string;
  tags?: string[];
  thumbnail?: string;
  gallery?: string[];
  testimonial?: {
    quote?: string;
    author?: string;
    position?: string;
  };
  testimonial_quote?: string;
  testimonial_author?: string;
  testimonial_position?: string;
}
