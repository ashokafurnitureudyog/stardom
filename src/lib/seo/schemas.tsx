import React from "react";

/**
 * Base Schema interface for common properties across root schema types
 */
interface BaseSchema {
  "@context": string;
  "@type": string;
  "@id"?: string;
}

/**
 * Base interface for nested schema objects that don't need @context
 */
interface BaseNestedSchema {
  "@type": string;
  "@id"?: string;
}

/**
 * Type definition for Organization Schema
 * @see https://schema.org/Organization
 */
interface OrganizationSchemaType extends BaseSchema {
  name: string;
  alternateName?: string[] | string;
  legalName?: string;
  description: string;
  url: string;
  logo: NestedImageObjectType;
  image?: NestedImageObjectType;
  telephone?: string;
  email?: string;
  address?: NestedPostalAddressType;
  geo?: NestedGeoCoordinatesType;
  areaServed?: NestedCountryType[];
  foundingDate?: string;
  foundingLocation?: string;
  founders?: NestedPersonType[];
  contactPoint?: NestedContactPointType[];
  sameAs?: string[];
  hasOfferCatalog?: NestedOfferCatalogType;
  knowsAbout?: string[] | string;
  brand?: NestedBrandType;
}

/**
 * Type definition for Brand as a nested object
 * @see https://schema.org/Brand
 */
interface NestedBrandType extends BaseNestedSchema {
  "@type": "Brand";
  name: string;
  description?: string;
}

/**
 * Type definition for Image Object as a nested object
 * @see https://schema.org/ImageObject
 */
interface NestedImageObjectType extends BaseNestedSchema {
  "@type": "ImageObject";
  url: string;
  contentUrl?: string;
  width?: number;
  height?: number;
  caption?: string;
}

/**
 * Type definition for Postal Address as a nested object
 * @see https://schema.org/PostalAddress
 */
interface NestedPostalAddressType extends BaseNestedSchema {
  "@type": "PostalAddress";
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
}

/**
 * Type definition for Geo Coordinates as a nested object
 * @see https://schema.org/GeoCoordinates
 */
interface NestedGeoCoordinatesType extends BaseNestedSchema {
  "@type": "GeoCoordinates";
  latitude: number;
  longitude: number;
}

/**
 * Type definition for Country as a nested object
 * @see https://schema.org/Country
 */
interface NestedCountryType extends BaseNestedSchema {
  "@type": "Country";
  name: string;
}

/**
 * Type definition for Person as a nested object
 * @see https://schema.org/Person
 */
interface NestedPersonType extends BaseNestedSchema {
  "@type": "Person";
  name: string;
  jobTitle?: string;
}

/**
 * Type definition for Contact Point as a nested object
 * @see https://schema.org/ContactPoint
 */
interface NestedContactPointType extends BaseNestedSchema {
  "@type": "ContactPoint";
  telephone: string;
  contactType: string;
  availableLanguage?: string[];
  areaServed?: string;
  hoursAvailable?: NestedOpeningHoursSpecificationType;
}

/**
 * Type definition for Opening Hours Specification as a nested object
 * @see https://schema.org/OpeningHoursSpecification
 */
interface NestedOpeningHoursSpecificationType extends BaseNestedSchema {
  "@type": "OpeningHoursSpecification";
  dayOfWeek: string[];
  opens: string;
  closes: string;
}

/**
 * Type definition for Offer Catalog as a nested object
 * @see https://schema.org/OfferCatalog
 */
interface NestedOfferCatalogType extends BaseNestedSchema {
  "@type": "OfferCatalog";
  name: string;
  itemListElement: NestedOfferType[];
}

/**
 * Type definition for Offer as a nested object
 * @see https://schema.org/Offer
 */
interface NestedOfferType extends BaseNestedSchema {
  "@type": "Offer";
  itemOffered: NestedProductType;
  priceRange?: string;
  availability?: string;
}

/**
 * Type definition for Product as a nested object
 * @see https://schema.org/Product
 */
interface NestedProductType extends BaseNestedSchema {
  "@type": "Product";
  name: string;
  description: string;
  category?: string;
  brand?: NestedBrandType;
  manufacturer?: NestedOrganizationReferenceType;
}

/**
 * Type definition for Organization Reference as a nested object
 */
interface NestedOrganizationReferenceType extends BaseNestedSchema {
  "@type": "Organization";
  name: string;
}

/**
 * Type definition for Website Schema
 * @see https://schema.org/WebSite
 */
interface WebsiteSchemaType extends BaseSchema {
  url: string;
  name: string;
  description: string;
  publisher: {
    "@id": string;
  };
  inLanguage: string;
}

/**
 * Type definition for Breadcrumb List Schema
 * @see https://schema.org/BreadcrumbList
 */
interface BreadcrumbSchemaType extends BaseSchema {
  itemListElement: NestedListItemType[];
}

/**
 * Type definition for List Item as a nested object
 * @see https://schema.org/ListItem
 */
interface NestedListItemType extends BaseNestedSchema {
  "@type": "ListItem";
  position: number;
  name: string;
  item: string;
}

/**
 * Type definition for Local Business Schema
 * @see https://schema.org/LocalBusiness
 */
interface LocalBusinessSchemaType extends BaseSchema {
  name: string;
  alternateName?: string;
  description: string;
  image: string;
  telephone: string;
  email: string;
  url: string;
  parentOrganization: NestedOrganizationReferenceType;
  address: NestedPostalAddressType;
  geo: NestedGeoCoordinatesType;
  openingHoursSpecification: NestedOpeningHoursSpecificationType[];
  priceRange: string;
  paymentAccepted: string[];
  currenciesAccepted: string;
  hasMap: string;
}

/**
 * Organization Schema data
 * Defines the structure and properties of the company
 */
export const organizationSchema: OrganizationSchemaType = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://stardom.co.in/#organization",
  name: "Ashoka Furniture Udyog",
  alternateName: ["Stardom", "Stardom Furniture", "Stardom Office Furniture"],
  legalName: "Ashoka Furniture Udyog",
  description:
    "Ashoka Furniture Udyog is India's leading premium office furniture manufacturer with over 25 years of expertise. Our premium brand Stardom specializes in crafting executive chairs, ergonomic office desks, conference tables, and complete corporate furniture solutions.",
  url: "https://stardom.co.in",
  brand: {
    "@type": "Brand",
    name: "Stardom",
    description: "Premium office furniture brand by Ashoka Furniture Udyog",
  },
  logo: {
    "@type": "ImageObject",
    "@id": "https://stardom.co.in/#logo",
    url: "https://stardom.co.in/images/logo.png",
    contentUrl: "https://stardom.co.in/images/logo.png",
    width: 4168,
    height: 4167,
    caption: "Stardom Premium Office Furniture Logo by Ashoka Furniture Udyog",
  },
  image: {
    "@type": "ImageObject",
    url: "https://stardom.co.in/images/store.png",
    width: 832,
    height: 596,
    caption: "Ashoka Furniture Udyog Manufacturing Facility",
  },
  telephone: "+91 62846 73783",
  email: "hello@stardom.co.in",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Industrial Area Phase 2",
    addressLocality: "Chandigarh",
    addressRegion: "Punjab",
    postalCode: "160002",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 30.6960369,
    longitude: 76.7828628,
  },
  areaServed: [
    {
      "@type": "Country",
      name: "India",
    },
  ],
  foundingDate: "1996",
  foundingLocation: "Chandigarh, India",
  founders: [
    {
      "@type": "Person",
      name: "Sandeep Jain",
      jobTitle: "Founder & Director",
    },
    {
      "@type": "Person",
      name: "Ishaan Jain",
      jobTitle: "Co-Founder & Director",
    },
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+91 62846 73783",
      contactType: "customer service",
      availableLanguage: ["English", "Hindi", "Punjabi"],
      areaServed: "IN",
      hoursAvailable: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "10:00",
        closes: "18:30",
      },
    },
    {
      "@type": "ContactPoint",
      telephone: "+91 62846 73783",
      contactType: "sales",
      availableLanguage: ["English", "Hindi"],
      areaServed: "IN",
    },
  ],
  sameAs: [
    "https://www.google.com/maps/place/Ashoka+Furniture+Udyog/@30.6960369,76.7828628,17z/data=!3m1!4b1!4m6!3m5!1s0x390feda785d2ec5f:0xae4e2ecf7db5390c!8m2!3d30.6960369!4d76.7854377!16s%2Fg%2F1thnm4_5?entry=tts&g_ep=EgoyMDI1MDYyOS4wIPu8ASoASAFQAw%3D%3D&skid=c96c94f7-6be5-4b12-8571-4ee02dbfb934",
    "https://maps.app.goo.gl/n7AmiaKCTun3gRRd8",
    "https://www.justdial.com/Chandigarh/Ashok-Furniture-Udyog-Industrial-Area/0172PX172-X172-200111222950-E2K3_BZDET",
    "https://www.indiamart.com/ashoka-furniture-udyog/",
    "https://www.tradeindia.com/ashoka-furniture-udyog-4025983/",
    "https://www.instagram.com/stardomfurniture/",
    "https://www.facebook.com/uniquefurniture304/",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Stardom Office Furniture Catalog by Ashoka Furniture Udyog",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: "Executive Office Chairs",
          description:
            "Premium executive office chairs with ergonomic design by Stardom",
          category: "Office Furniture > Seating > Executive Chairs",
          brand: {
            "@type": "Brand",
            name: "Stardom",
          },
          manufacturer: {
            "@type": "Organization",
            name: "Ashoka Furniture Udyog",
          },
        },
        priceRange: "₹3,000 - ₹1,50,000",
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: "Office Desks & Tables",
          description: "Modern office desks and conference tables by Stardom",
          category: "Office Furniture > Desks & Tables",
          brand: {
            "@type": "Brand",
            name: "Stardom",
          },
          manufacturer: {
            "@type": "Organization",
            name: "Ashoka Furniture Udyog",
          },
        },
        priceRange: "₹5,000 - ₹2,00,000",
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: "Conference Room Solutions",
          description:
            "Complete conference room furniture solutions by Stardom",
          category: "Office Furniture > Conference Room",
          brand: {
            "@type": "Brand",
            name: "Stardom",
          },
          manufacturer: {
            "@type": "Organization",
            name: "Ashoka Furniture Udyog",
          },
        },
        priceRange: "₹50,000 - ₹5,00,000",
        availability: "https://schema.org/InStock",
      },
    ],
  },
  knowsAbout: [
    "Office Furniture Manufacturing",
    "Executive Chairs Design",
    "Ergonomic Furniture",
    "Corporate Interior Solutions",
    "Custom Furniture Design",
    "Office Space Planning",
    "Furniture Export",
    "Sustainable Furniture Practices",
    "Furniture Quality Standards",
    "Furniture Industry Trends",
    "Office Furniture Trends",
    "Office Ergonomics",
    "Premium Office Solutions",
  ],
};

/**
 * Website Schema data
 * Defines the structure and properties of the website
 */
export const websiteSchema: WebsiteSchemaType = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://stardom.co.in/#website",
  url: "https://stardom.co.in",
  name: "Stardom Office Furniture by Ashoka Furniture Udyog",
  description:
    "Premium office furniture by Stardom - a brand of Ashoka Furniture Udyog. Executive chairs, desks, and corporate solutions",
  publisher: {
    "@id": "https://stardom.co.in/#organization",
  },
  inLanguage: "en-IN",
};

/**
 * Breadcrumb Schema data
 * Defines the navigation path for the current page
 */
export const breadcrumbSchema: BreadcrumbSchemaType = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://stardom.co.in",
    },
  ],
};

/**
 * Local Business Schema data
 * Defines the physical business location and details
 */
export const localBusinessSchema: LocalBusinessSchemaType = {
  "@context": "https://schema.org",
  "@type": "FurnitureStore",
  "@id": "https://stardom.co.in/#business",
  name: "Stardom Furniture Showroom",
  alternateName: "Ashoka Furniture Udyog Showroom",
  description:
    "Premium office furniture showroom and manufacturing facility by Ashoka Furniture Udyog featuring Stardom brand furniture",
  image: "https://stardom.co.in/images/store.png",
  telephone: "+91 62846 73783",
  email: "hello@stardom.co.in",
  url: "https://stardom.co.in",
  parentOrganization: {
    "@type": "Organization",
    name: "Ashoka Furniture Udyog",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Industrial Area Phase 2",
    addressLocality: "Chandigarh",
    addressRegion: "Punjab",
    postalCode: "160002",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 30.6960369,
    longitude: 76.7828628,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "10:00",
      closes: "18:30",
    },
  ],
  priceRange: "₹₹",
  paymentAccepted: ["Cash", "Credit Card", "Bank Transfer", "UPI"],
  currenciesAccepted: "INR",
  hasMap: "https://maps.google.com/?q=Ashoka+Furniture+Udyog+Chandigarh",
};

/**
 * Type definition for schema data
 */
type SchemaData =
  | OrganizationSchemaType
  | WebsiteSchemaType
  | BreadcrumbSchemaType
  | LocalBusinessSchemaType;

/**
 * Safe JSON stringify function to prevent XSS vulnerabilities
 *
 * @param data - The schema data to stringify
 * @returns A safely stringified JSON representation
 */
const safeJsonLd = (data: SchemaData): string => {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/'/g, "\\u0027")
    .replace(/"/g, '\\"');
};

/**
 * Props for the SchemaScript component
 */
interface SchemaScriptProps {
  /** The schema object to render */
  schema: SchemaData;
  /** Optional unique identifier for the script element */
  id?: string;
}

/**
 * Renders a single schema JSON-LD script
 *
 * @param props - Component props
 * @returns A script element with the schema as JSON-LD
 */
export const SchemaScript: React.FC<SchemaScriptProps> = ({ schema, id }) => {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: safeJsonLd(schema),
      }}
    />
  );
};

/**
 * SchemaMarkup Component
 *
 * Renders all structured data schemas as JSON-LD script tags in the document head
 * Enhances SEO by providing search engines with structured information about the website,
 * organization, and physical business location
 *
 * @returns React fragment containing all schema script elements
 */
export const SchemaMarkup: React.FC = () => {
  return (
    <>
      <SchemaScript schema={organizationSchema} id="organization-schema" />
      <SchemaScript schema={websiteSchema} id="website-schema" />
      <SchemaScript schema={breadcrumbSchema} id="breadcrumb-schema" />
      <SchemaScript schema={localBusinessSchema} id="local-business-schema" />
    </>
  );
};

/**
 * Page information interface for breadcrumb creation
 */
interface BreadcrumbPage {
  /** Page name to display in breadcrumb */
  name: string;
  /** Path to the page, excluding domain */
  path: string;
}

/**
 * Creates an extended breadcrumb schema for inner pages
 *
 * @param pages - Array of page objects with name and path
 * @returns Breadcrumb schema with the provided pages included
 */
export const createBreadcrumbSchema = (
  pages: BreadcrumbPage[],
): BreadcrumbSchemaType => {
  const baseSchema = { ...breadcrumbSchema };

  const breadcrumbItems = [
    ...baseSchema.itemListElement,
    ...pages.map((page, index) => ({
      "@type": "ListItem" as const,
      position: index + 2, // +2 because Home is position 1
      name: page.name,
      item: `https://stardom.co.in${page.path}`,
    })),
  ];

  return {
    ...baseSchema,
    itemListElement: breadcrumbItems,
  };
};
