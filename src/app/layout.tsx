import { Montserrat, Playfair_Display } from "next/font/google";
import { ViewTransition } from "react";
import { Toaster } from "@/components/ui/toaster";
import { metadata, viewport } from "@/lib/seo/metadata";
import { SchemaMarkup } from "@/lib/seo/schemas";
import "./globals.css";
import { Providers } from "./providers";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export { metadata, viewport };

/**
 * Root layout. Wraps every route in a View Transition so client navigations
 * cross-fade instead of snapping, using React's built-in transition support.
 */
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${montserrat.variable} scrollbar-hide overflow-x-hidden`}
      suppressHydrationWarning
    >
      <head>
        <SchemaMarkup />
      </head>
      <body className="antialiased">
        <Providers>
          <ViewTransition>{children}</ViewTransition>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
