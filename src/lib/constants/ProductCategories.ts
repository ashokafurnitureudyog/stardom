/**
 * The fixed chair categories Stardom sells under. Products are filed under exactly
 * one of these, and nothing outside this list is offered anywhere in the site or
 * the admin dashboard.
 */
export const PRODUCT_CATEGORIES = [
  "Signature Series",
  "Director Series",
  "Executive Series",
  "Work Series",
  "Visitor Series",
  "Café Series",
  "Bar Series",
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];
