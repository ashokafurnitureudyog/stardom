import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Playfair_Display, Montserrat } from "next/font/google";
import {NextUIProvider} from "@nextui-org/react";
import {ThemeProvider as NextThemesProvider} from "next-themes";
import { ViewTransitions } from 'next-view-transitions'

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
  title: "Stardom",
  description: "Coming Soon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
    <html lang="en" className="scrollbar-hide overflow-x-hidden">
      {/* temp font */}
      <body className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} ${montserrat.variable} antialiased`}>
        <NextUIProvider><NextThemesProvider attribute="class" defaultTheme="system">
        {children}
      </NextThemesProvider></NextUIProvider>
      </body>
    </html>
    </ViewTransitions>
  );
}
