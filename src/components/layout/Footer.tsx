"use client";

import { ArrowUp, type LucideProps } from "lucide-react";
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
import { useCompanyData } from "@/lib/client/company-data-context";
import {
  BasicCompanyInfo as fallbackCompanyInfo,
  socialLinks as fallbackSocialLinks,
} from "@/lib/constants/CompanyInfo";
import { PRODUCT_CATEGORIES, seriesHref, seriesName } from "@/lib/constants/ProductCategories";

const PLATFORM_ICONS: Record<string, React.ComponentType<LucideProps>> = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  linkedin: LinkedinIcon,
  twitter: XIcon as unknown as React.ComponentType<LucideProps>,
  x: XIcon as unknown as React.ComponentType<LucideProps>,
  youtube: YoutubeIcon,
};

const PAGES = [
  { name: "Heritage", href: "/heritage" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Contact", href: "/contact" },
  { name: "FAQs", href: "/faqs" },
  { name: "Shipping", href: "/shipping-info" },
];

const POLICIES = [
  { name: "Privacy", href: "/privacy-policy" },
  { name: "Terms", href: "/terms-of-service" },
  { name: "Cookies", href: "/cookie-policy" },
];

/**
 * Site footer. Leads with the range, because the seven series are what a buyer
 * came to place, and gives the workshop details the weight they earn: the
 * address, the hours and the phone number are the point of the page for anyone
 * ready to talk.
 */
const Footer = () => {
  const { companyInfo, socialLinks } = useCompanyData();
  const company = companyInfo ?? fallbackCompanyInfo;
  const socials = socialLinks.length > 0 ? socialLinks : fallbackSocialLinks;

  return (
    <footer className="w-full border-t border-border/60 bg-background">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" aria-label="Stardom, home" className="inline-block">
              <Image
                src="/images/logo.png"
                alt="Stardom"
                width={600}
                height={485}
                className="h-24 w-auto dark:hidden"
              />
              <Image
                src="/images/logo-dark.png"
                alt="Stardom"
                width={600}
                height={485}
                className="hidden h-24 w-auto dark:block"
              />
            </Link>

            <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Chairs made in Chandigarh by {company.parentCompany}, since {company.established}.
            </p>

            <div className="mt-8 flex gap-5">
              {socials.map((social) => {
                const Icon = PLATFORM_ICONS[social.platform?.toLowerCase() ?? ""];
                if (!Icon) return null;
                return (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.platform}
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <p className="font-serif text-xl italic text-primary">The range</p>
            <ul className="mt-6 space-y-2.5">
              {PRODUCT_CATEGORIES.map((category) => (
                <li key={category}>
                  <Link
                    href={seriesHref(category)}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {seriesName(category)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-serif text-xl italic text-primary">The company</p>
            <ul className="mt-6 space-y-2.5">
              {PAGES.map((page) => (
                <li key={page.href}>
                  <Link
                    href={page.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {page.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-serif text-xl italic text-primary">Visit the works</p>
            <address className="mt-6 space-y-4 not-italic text-sm leading-relaxed text-muted-foreground">
              <p>
                {company.address.street}
                <br />
                {company.address.city} {company.address.zip}, {company.address.Country}
              </p>
              <p>
                <a
                  href={`tel:${company.phone.replace(/\s/g, "")}`}
                  className="text-foreground transition-colors hover:text-primary"
                >
                  {company.phone}
                </a>
                <br />
                <a
                  href={`mailto:${company.email}`}
                  className="transition-colors hover:text-primary"
                >
                  {company.email}
                </a>
              </p>
              <p>
                {company.hours.weekday}, Monday to Saturday
                <br />
                Sunday {company.hours.sunday.toLowerCase()}
              </p>
            </address>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-border/60 pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {process.env.NEXT_PUBLIC_BUILD_YEAR} {company.name}, a brand of{" "}
            {company.parentCompany}.
          </p>

          <div className="flex items-center gap-6">
            {POLICIES.map((policy) => (
              <Link
                key={policy.href}
                href={policy.href}
                className="transition-colors hover:text-foreground"
              >
                {policy.name}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Back to top"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
