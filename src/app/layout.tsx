import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Playfair_Display, Montserrat } from "next/font/google";
import { ViewTransitions } from "next-view-transitions";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "./providers";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  preload: true,
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  preload: true,
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  minimumScale: 1,
  userScalable: true,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#A67C5A" },
    { media: "(prefers-color-scheme: dark)", color: "#0D0907" },
  ],
  colorScheme: "light dark",
};

export const metadata: Metadata = {
  // Base URL for all relative URLs
  metadataBase: new URL("https://stardom.co.in"),
  title: {
    default:
      "Stardom | Premium Office Furniture by Ashoka Furniture Udyog | India's Leading Manufacturers",
    template: "%s | Stardom - Premium Office Furniture",
  },
  description:
    "Stardom by Ashoka Furniture Udyog - India's leading premium office furniture manufacturer since 1996. Specializing in executive chairs, ergonomic office desks, conference tables, and complete corporate furniture solutions. Pan-India delivery, custom designs, and 25+ years of craftsmanship excellence from Chandigarh.",

  keywords: [
    // Primary Brand Keywords
    "Stardom furniture",
    "Ashoka Furniture Udyog",
    "Stardom by Ashoka Furniture",
    "Stardom office furniture",

    // Product-Specific Keywords
    "premium office furniture manufacturers",
    "executive office chairs",
    "ergonomic office chairs",
    "office desk manufacturers",
    "conference table manufacturers",
    "office furniture India",
    "corporate furniture solutions",
    "premium office furniture",
    "luxury office furniture",
    "custom office furniture",

    // Location-Based Keywords
    "office furniture Chandigarh",
    "office furniture Punjab",
    "office furniture North India",
    "office furniture manufacturers India",
    "Ashoka Furniture Udyog Chandigarh",

    // Service Keywords
    "pan India office furniture delivery",
    "office interior design",
    "workspace solutions",
    "commercial furniture",
    "office setup solutions",
    "furniture installation services",

    // Industry Keywords
    "B2B office furniture",
    "corporate office solutions",
    "office renovation furniture",
    "startup office furniture",
    "enterprise furniture solutions",

    // Quality & Features
    "durable office furniture",
    "high-quality office chairs",
    "comfortable office seating",
    "modern office design",
    "professional office furniture",
  ],
  authors: [
    { name: "Ashoka Furniture Udyog", url: "https://stardom.co.in" },
    { name: "Abhishek Sharma", url: "https://stardom.co.in/heritage" },
  ],
  creator: "Ashoka Furniture Udyog",
  publisher: "Ashoka Furniture Udyog",

  // Application Details
  applicationName: "Stardom Office Furniture",
  referrer: "origin-when-cross-origin",
  category: "Business & Industrial",
  classification: "Office Furniture Manufacturing",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://stardom.co.in",
    siteName: "Stardom | Premium Office Furniture by Ashoka Furniture Udyog",
    title:
      "Stardom | Premium Office Furniture by Ashoka Furniture Udyog | India's Leading Manufacturers",
    description:
      "Transform your workspace with premium office furniture from Stardom by Ashoka Furniture Udyog. India's trusted manufacturer for 25+ years. Executive chairs, ergonomic desks, conference tables with pan-India delivery.",
    images: [
      {
        url: "https://stardom.co.in/og-image.png",
        width: 1200,
        height: 630,
        alt: "Stardom Premium Office Furniture Collection by Ashoka Furniture Udyog - Executive Chairs and Modern Desks",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Stardom | Premium Office Furniture by Ashoka Furniture Udyog",
    description:
      "Premium office furniture by Stardom, a brand of Ashoka Furniture Udyog. 25+ years of excellence in executive chairs, desks & corporate solutions. Pan-India delivery.",
    images: {
      url: "https://stardom.co.in/og-image.png",
      alt: "Stardom Premium Office Furniture by Ashoka Furniture Udyog - Executive Chairs and Desks",
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      {
        url: "/favicon/favicon-196x196.png",
        sizes: "196x196",
        type: "image/png",
      },
    ],
    shortcut: ["/favicon.ico"],
    apple: [
      {
        url: "/favicon/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        url: "/favicon/apple-touch-icon-57x57.png",
        sizes: "57x57",
        type: "image/png",
      },
      {
        url: "/favicon/apple-touch-icon-60x60.png",
        sizes: "60x60",
        type: "image/png",
      },
      {
        url: "/favicon/apple-touch-icon-72x72.png",
        sizes: "72x72",
        type: "image/png",
      },
      {
        url: "/favicon/apple-touch-icon-76x76.png",
        sizes: "76x76",
        type: "image/png",
      },
      {
        url: "/favicon/apple-touch-icon-114x114.png",
        sizes: "114x114",
        type: "image/png",
      },
      {
        url: "/favicon/apple-touch-icon-120x120.png",
        sizes: "120x120",
        type: "image/png",
      },
      {
        url: "/favicon/apple-touch-icon-144x144.png",
        sizes: "144x144",
        type: "image/png",
      },
      {
        url: "/favicon/apple-touch-icon-152x152.png",
        sizes: "152x152",
        type: "image/png",
      },
    ],
  },

  // Web App Manifest
  manifest: "/site.webmanifest",

  // Format Detection
  formatDetection: {
    telephone: true,
    date: true,
    address: true,
    email: true,
    url: true,
  },

  // Verification Codes
  // verification: {
  //   google: "YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE",
  //   yandex: "YOUR_YANDEX_VERIFICATION_CODE",
  //   yahoo: "YOUR_YAHOO_VERIFICATION_CODE",
  //   other: {
  //     "msvalidate.01": "YOUR_BING_VERIFICATION_CODE",
  //     "facebook-domain-verification": "YOUR_FACEBOOK_DOMAIN_VERIFICATION",
  //     "p:domain_verify": "YOUR_PINTEREST_VERIFICATION",
  //     "yandex-verification": "YOUR_YANDEX_VERIFICATION"
  //   }
  // },

  // Additional Metadata
  generator: "Next.js",
  abstract:
    "Stardom by Ashoka Furniture Udyog - Premium office furniture manufacturer specializing in executive chairs, desks, and corporate solutions with 25+ years of experience.",

  // Other SEO Tags
  other: {
    bingbot: "index, follow, max-image-preview:large",
    duckduckbot: "index, follow",
    facebookexternalhit: "index, follow",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "format-detection": "telephone=yes",
    HandheldFriendly: "True",
    MobileOptimized: "320",
    target: "_top",
    audience: "all",
    robots: "index,follow,noodp,noydir",
    googlebot: "index,follow",
    slurp: "index,follow",
    msnbot: "index,follow",
    distribution: "global",
    rating: "general",
    "revisit-after": "1 days",
    expires: "never",
    pragma: "no-cache",
    "cache-control": "public, max-age=31536000",
  },
};

// Updated JSON-LD Structured Data reflecting correct brand relationship
const organizationSchema = {
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
    url: "https://stardom.co.in/logo-dark.png",
    contentUrl: "https://stardom.co.in/logo-dark.png",
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
    latitude: 30.696056,
    longitude: 30.696056,
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
  // sameAs: [
  //   "https://www.facebook.com/stardomfurniture",
  //   "https://www.instagram.com/stardomfurniture",
  //   "https://www.linkedin.com/company/stardom-furniture",
  //   "https://twitter.com/StardomFurniture",
  //   "https://www.youtube.com/c/StardomFurniture"
  // ],
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
        priceRange: "₹15,000 - ₹1,50,000",
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
        priceRange: "₹10,000 - ₹2,00,000",
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
  ],
};

// Website Schema
const websiteSchema = {
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

// Breadcrumb Schema
const breadcrumbSchema = {
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

// Local Business Schema
const localBusinessSchema = {
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
    latitude: 30.696056,
    longitude: 30.696056,
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scrollbar-hide overflow-x-hidden">
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />

        {/* DNS Prefetch for performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />

        {/* Structured Data Schemas */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} ${montserrat.variable} antialiased`}
      >
        <ViewTransitions>
          <Providers>
            {children}
            <Toaster />
          </Providers>
        </ViewTransitions>
      </body>
    </html>
  );
}
