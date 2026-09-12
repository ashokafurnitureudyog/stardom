"use client";

import { ArrowUp, type LucideProps, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type React from "react";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  XIcon,
  YoutubeIcon,
} from "@/components/ui/brand-icons";
import { Button } from "@/components/ui/button";
import { useCompanyData } from "@/lib/client/company-data-context";
import {
  BasicCompanyInfo as fallbackCompanyInfo,
  socialLinks as fallbackSocialLinks,
} from "@/lib/constants/CompanyInfo";

const Footer = () => {
  const { companyInfo, socialLinks } = useCompanyData();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Map platform names to icon components with proper typing
  const platformIcons: Record<string, React.ComponentType<LucideProps>> = {
    facebook: FacebookIcon,
    instagram: InstagramIcon,
    linkedin: LinkedinIcon,
    twitter: XIcon as unknown as React.ComponentType<LucideProps>,
    x: XIcon as unknown as React.ComponentType<LucideProps>,
    youtube: YoutubeIcon,
  };

  const quickLinks = [
    { name: "Products", href: "/products" },
    { name: "Heritage", href: "/heritage" },
    { name: "Portfolio", href: "/portfolio" },
  ];

  const supportLinks = [
    { name: "Contact Us", href: "/contact" },
    { name: "FAQs", href: "/faqs" },
    { name: "Shipping Info", href: "/shipping-info" },
  ];

  const policyLinks = [
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms of Service", href: "/terms-of-service" },
    { name: "Cookie Policy", href: "/cookie-policy" },
  ];

  return (
    <footer className="w-full bg-background relative overflow-hidden">
      {/* Decorative Elements */}

      {/* Main Content */}
      <div className="relative border-t border-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-16 lg:py-24">
          <div className="grid md:grid-cols-12 gap-8 lg:gap-16">
            {/* Logo and Description Column */}
            <div className="md:col-span-4 space-y-8">
              <div className="flex h-16 items-center">
                <Link href="/">
                  <Image
                    src="/images/logo.png"
                    alt="Stardom Logo"
                    width={160}
                    height={40}
                    className="h-auto w-auto transform transition-transform duration-300 hover:scale-105 dark:hidden"
                  />
                  <Image
                    src="/images/logo-dark.png"
                    alt="Stardom Logo"
                    width={160}
                    height={40}
                    className="hidden h-auto w-auto transform transition-transform duration-300 hover:scale-105 dark:block"
                  />
                </Link>
              </div>
              <p className="text-muted-foreground/80 leading-relaxed">
                A premium collection of luxury office furniture by Ashoka Furniture Udyog. Crafting
                elegance and functionality since 1996.
              </p>
              <div className="flex gap-6">
                {(socialLinks.length > 0 ? socialLinks : fallbackSocialLinks).map(
                  (social, index) => {
                    // Get the icon component based on platform name
                    const IconComponent = social.platform?.toLowerCase()
                      ? platformIcons[social.platform.toLowerCase()]
                      : undefined;

                    return IconComponent ? (
                      <Link
                        key={index}
                        href={social.url}
                        className="text-primary/60 hover:text-primary transition-colors duration-300"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <IconComponent className="h-5 w-5" />
                      </Link>
                    ) : null;
                  },
                )}
              </div>
            </div>

            {/* Quick Links Column */}
            <div className="md:col-span-2">
              <h3 className="font-serif italic text-xl mb-8">Quick Links</h3>
              <ul className="space-y-4">
                {quickLinks.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-muted-foreground/80 hover:text-primary transition-all duration-300 group flex items-center"
                    >
                      <span className="h-px w-0 bg-primary mr-0 group-hover:w-4 group-hover:mr-2 transition-all duration-300" />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Column */}
            <div className="md:col-span-2">
              <h3 className="font-serif italic text-xl mb-8">Support</h3>
              <ul className="space-y-4">
                {supportLinks.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-muted-foreground/80 hover:text-primary transition-all duration-300 group flex items-center"
                    >
                      <span className="h-px w-0 bg-primary mr-0 group-hover:w-4 group-hover:mr-2 transition-all duration-300" />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Information */}
            <div className="md:col-span-4 space-y-8">
              <h3 className="font-serif italic text-xl">Visit Our Store</h3>
              <div className="space-y-6">
                {[
                  {
                    Icon: MapPin,
                    content: (
                      <p className="text-muted-foreground/80 leading-relaxed">
                        {companyInfo?.address.street || fallbackCompanyInfo.address.street}
                        <br />
                        {companyInfo?.address.city || fallbackCompanyInfo.address.city},{" "}
                        {companyInfo?.address.Country || fallbackCompanyInfo.address.Country}{" "}
                        {companyInfo?.address.zip || fallbackCompanyInfo.address.zip}
                      </p>
                    ),
                  },
                  {
                    Icon: Mail,
                    content: (
                      <Link
                        href={`mailto:${companyInfo?.email || fallbackCompanyInfo.email}`}
                        className="text-muted-foreground/80 hover:text-primary transition-colors duration-300"
                      >
                        {companyInfo?.email || fallbackCompanyInfo.email}
                      </Link>
                    ),
                  },
                  {
                    Icon: Phone,
                    content: (
                      <Link
                        href={`tel:${companyInfo?.phone || fallbackCompanyInfo.phone}`}
                        className="text-muted-foreground/80 hover:text-primary transition-colors duration-300"
                      >
                        {companyInfo?.phone || fallbackCompanyInfo.phone}
                      </Link>
                    ),
                  },
                ].map(({ Icon, content }, index) => (
                  <div key={index} className="flex items-start gap-4 group">
                    <Icon className="h-6 w-6 text-primary/60 group-hover:text-primary transition-colors duration-300 mt-1" />
                    {content}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-primary/10 mt-16">
            <div className="pt-8">
              {/* Policy Links */}
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-muted-foreground/60 text-sm">
                  © {process.env.NEXT_PUBLIC_BUILD_YEAR} Stardom. All rights reserved.
                </p>
                <div className="flex items-center gap-8">
                  {policyLinks.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-muted-foreground/60 hover:text-primary text-sm transition-colors duration-300"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll to Top Button */}
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-8 right-8 rounded-full border-primary/10 hover:border-primary/30 bg-background/80 backdrop-blur-sm"
          onClick={scrollToTop}
        >
          <ArrowUp className="h-4 w-4" />
        </Button>
      </div>
    </footer>
  );
};

export default Footer;
