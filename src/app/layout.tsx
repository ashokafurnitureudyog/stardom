import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Playfair_Display, Montserrat } from "next/font/google";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ViewTransitions } from 'next-view-transitions';
import "./globals.css";

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://stardom.co.in'),
  title: "Stardom | Premium Office Furniture Manufacturers",
  description: "Premium office furniture manufacturers in Chandigarh. Explore our range of executive chairs, desks & office solutions. Formerly known as Ashoka Furniture Udyog, delivering pan-India.",
  keywords: [
    "office furniture", 
    "premium office furniture",
    "executive chairs",
    "office desks",
    "Ashoka Furniture Udyog",
    "office furniture Chandigarh",
    "premium furniture manufacturer",
    "Stardom furniture",
    "corporate furniture solutions"
  ],
  openGraph: {
    type: 'website',
    title: 'Stardom | Premium Office Furniture Manufacturers',
    description: 'Transform your workspace with premium office furniture. From executive chairs to customized desks, discover quality craftsmanship by Stardom (formerly Ashoka Furniture Udyog).',
    images: [
      {
        url: '/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'Stardom Premium Office Furniture Collection',
      },
    ],
    locale: 'en_IN',
    siteName: 'Stardom',
  },
  alternates: {
    canonical: 'https://stardom.co.in',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // verification: {
  //   google: 'add-your-google-verification-id',
  // },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Stardom',
  alternateName: 'Ashoka Furniture Udyog',
  description: 'Premium office furniture manufacturers specializing in executive chairs, desks, and complete office solutions.',
  url: 'https://stardom.co.in',
  logo: 'https://www.stardom.co.in/_next/image?url=%2Fimages%2Flogo.png&w=128&q=75',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Chandigarh',
    addressCountry: 'IN'
  },
  areaServed: {
    '@type': 'Country',
    name: 'India'
  },
  sameAs: [] // Add your social media URLs when available
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scrollbar-hide overflow-x-hidden">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body 
        className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} ${montserrat.variable} antialiased`}
      ><ViewTransitions>
        <NextUIProvider>
          <NextThemesProvider attribute="class" defaultTheme="system">
            {children}
          </NextThemesProvider>
        </NextUIProvider>
        </ViewTransitions>
      </body>
    </html>
  );
}