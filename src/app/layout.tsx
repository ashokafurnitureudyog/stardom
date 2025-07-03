import { viewport, metadata } from "@/lib/seo/metadata";
import { SchemaMarkup } from "@/lib/seo/schemas";
import { Geist, Geist_Mono } from "next/font/google";
import { Playfair_Display, Montserrat } from "next/font/google";
import { ViewTransitions } from "next-view-transitions";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "./providers";
import { JSX } from "react";

/**
 * Font configuration for Playfair Display
 * Used for headings and display text
 */
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  preload: true,
});

/**
 * Font configuration for Montserrat
 * Used for body text and general content
 */
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  preload: true,
});

/**
 * Font configuration for Geist Sans
 * Used as the primary sans-serif font
 */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

/**
 * Font configuration for Geist Mono
 * Used for code blocks and monospace content
 */
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

// Export metadata and viewport from the imported files
export { metadata, viewport };

/**
 * Interface for RootLayout props
 */
interface RootLayoutProps {
  /** The child components to render within the layout */
  children: React.ReactNode;
}

/**
 * Root layout component that wraps the entire application
 * Handles font loading, metadata, and global providers
 *
 * @param {RootLayoutProps} props - Component props
 * @param {React.ReactNode} props.children - Child components to render
 * @returns {JSX.Element} The rendered layout component
 */
export default function RootLayout({
  children,
}: Readonly<RootLayoutProps>): JSX.Element {
  // Combine all font variables for use in the body className
  const fontVariables = [
    geistSans.variable,
    geistMono.variable,
    playfairDisplay.variable,
    montserrat.variable,
  ].join(" ");

  return (
    <html lang="en" className="scrollbar-hide overflow-x-hidden">
      <head>
        {/* Performance optimizations for external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />

        {/* DNS prefetching for faster resource loading */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />

        {/* Structured data for SEO */}
        <SchemaMarkup />
      </head>
      <body className={`${fontVariables} antialiased`}>
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
