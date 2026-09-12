import { Montserrat, Playfair_Display } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { metadata, viewport } from "@/lib/seo/metadata";
import { SchemaMarkup } from "@/lib/seo/schemas";
import { getCompanyData } from "@/lib/server/content";
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
 * Root layout. Company details are resolved once here and handed to the tree,
 * so the chrome never fetches them again on the client.
 */
export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const companyData = await getCompanyData();

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
        <Providers companyData={companyData}>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
