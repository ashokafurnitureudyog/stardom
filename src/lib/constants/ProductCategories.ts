/**
 * The fixed chair categories Stardom sells under. Products are filed under
 * exactly one of these, and nothing outside this list is offered anywhere in
 * the site or the admin dashboard.
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

/**
 * What each series is for, in the words a specifier would use. Shown wherever
 * the range is listed, so a buyer can tell which series fits a floor without
 * opening a product page.
 */
export const SERIES_SUMMARY: Record<ProductCategory, string> = {
  "Signature Series": "Flagship and statement chairs",
  "Director Series": "For managing directors and leadership",
  "Executive Series": "Managerial chairs built for the full day",
  "Work Series": "Task, staff and workstation seating",
  "Visitor Series": "Meeting, conference and reception",
  "Café Series": "Café, dining and hospitality",
  "Bar Series": "Stools and counter-height seating",
};

/** Catalogue link for one series. */
export const seriesHref = (category: ProductCategory) =>
  `/products?category=${encodeURIComponent(category)}`;

/** Short label, with "Series" dropped where the surface already says it. */
export const seriesName = (category: ProductCategory) => category.replace(" Series", "");
