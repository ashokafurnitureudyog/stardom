import type { Metadata, Viewport } from "next";

/**
 * Viewport configuration for responsive design
 * Controls how the page scales and displays across different devices
 */
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

/**
 * Base URL for the site
 * All relative URLs in metadata will be based on this
 */
const SITE_URL = "https://stardom.co.in";

/**
 * Company and brand information
 */
const COMPANY = {
  name: "Stardom",
  legalName: "Ashoka Furniture Udyog",
  fullName: "Stardom | Premium Office Furniture by Ashoka Furniture Udyog",
};

/**
 * Primary site description used across metadata
 */
const PRIMARY_DESCRIPTION =
  "Stardom by Ashoka Furniture Udyog - India's leading premium office furniture manufacturer since 1996. " +
  "Specializing in executive chairs, ergonomic office desks, conference tables, and complete corporate " +
  "furniture solutions. Pan-India delivery, custom designs, and 25+ years of craftsmanship excellence from Chandigarh.";

/**
 * Social media preview description (slightly different for optimization)
 */
const SOCIAL_DESCRIPTION =
  "Transform your workspace with premium office furniture from Stardom by Ashoka Furniture Udyog. " +
  "India's trusted manufacturer for 25+ years. Executive chairs, ergonomic desks, conference tables with pan-India delivery.";

/**
 * Icon configurations for various platforms
 */
const icons = {
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
};

/**
 * Keywords grouped by category for better organization
 */
const keywords = [
  // Primary Brand Keywords
  "Stardom furniture",
  "Ashoka Furniture Udyog",
  "Stardom by Ashoka Furniture",
  "Stardom office furniture",
  "stardom",
  "Stardom",

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
];

/**
 * Complete metadata configuration for the application
 * Follows Next.js metadata API structure
 */
export const metadata: Metadata = {
  // Base URL for all relative URLs
  metadataBase: new URL(SITE_URL),

  // Title configuration
  title: {
    default: `${COMPANY.fullName} | India's Leading Manufacturers`,
    template: `%s | ${COMPANY.name} - Premium Office Furniture`,
  },

  // Core meta tags
  description: PRIMARY_DESCRIPTION,
  keywords,
  authors: [
    { name: COMPANY.legalName, url: SITE_URL },
    { name: "Abhishek Sharma", url: `${SITE_URL}/heritage` },
  ],
  creator: COMPANY.legalName,
  publisher: COMPANY.legalName,

  // Application Details
  applicationName: `${COMPANY.name} Office Furniture`,
  referrer: "origin-when-cross-origin",
  category: "Business & Industrial",
  classification: "Office Furniture Manufacturing",

  // Open Graph protocol for social media sharing
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: COMPANY.fullName,
    title: `${COMPANY.fullName} | India's Leading Manufacturers`,
    description: SOCIAL_DESCRIPTION,
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: `${COMPANY.name} Premium Office Furniture Collection by ${COMPANY.legalName} - Executive Chairs and Modern Desks`,
        type: "image/png",
      },
    ],
  },

  // Twitter card for Twitter sharing
  twitter: {
    card: "summary_large_image",
    title: COMPANY.fullName,
    description:
      "Premium office furniture by Stardom, a brand of Ashoka Furniture Udyog. 25+ years of excellence in executive chairs, desks & corporate solutions. Pan-India delivery.",
    images: {
      url: `${SITE_URL}/og-image.png`,
      alt: `${COMPANY.name} Premium Office Furniture by ${COMPANY.legalName} - Executive Chairs and Desks`,
    },
  },

  // Search engine crawler instructions
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

  // Favicon and app icons
  icons,

  // Web App Manifest
  manifest: "/site.webmanifest",

  // Format Detection for mobile
  formatDetection: {
    telephone: true,
    date: true,
    address: true,
    email: true,
    url: true,
  },

  // Verification Codes - Uncomment and fill in when ready
  /* verification: {
    google: "YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE",
    yandex: "YOUR_YANDEX_VERIFICATION_CODE",
    yahoo: "YOUR_YAHOO_VERIFICATION_CODE",
    other: {
      "msvalidate.01": "YOUR_BING_VERIFICATION_CODE",
      "facebook-domain-verification": "YOUR_FACEBOOK_DOMAIN_VERIFICATION",
      "p:domain_verify": "YOUR_PINTEREST_VERIFICATION",
      "yandex-verification": "YOUR_YANDEX_VERIFICATION"
    }
  }, */

  // Additional Metadata
  generator: "Next.js",
  abstract:
    "Stardom by Ashoka Furniture Udyog - Premium office furniture manufacturer specializing in executive chairs, desks, and corporate solutions with 25+ years of experience.",

  // Canonical URL - Preventing duplicate content issues
  alternates: {
    canonical: SITE_URL,
  },

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
