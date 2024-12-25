import React from "react";
import {
  Facebook,
  Instagram,
  Linkedin,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";
import Image from "next/image";
import { useTheme } from "next-themes";

const Footer = () => {
    const { theme } = useTheme();
  return (
    <footer className="w-full bg-background py-20 px-8 md:px-16 font-sans border-t border-primary/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-12 gap-12 md:gap-8">
          {/* Logo and Description Column */}
          <div className="md:col-span-4 space-y-6">
            {/* Replace with your actual logo */}
            <div className="h-12 w-auto relative">
            <Image
                src={theme === 'dark' ? "/images/logo-dark.png" : "/images/logo.png"}
                width={100}
                height={100}
                alt="Stardom Logo"
                className="transform hover:scale-105 transition-transform duration-300"
                priority
            />
            </div>
            <p className="text-muted-foreground/80 text-sm leading-relaxed">
              A premium collection of luxury office furniture by Ashoka
              Furniture Udyog. Crafting elegance and functionality since 1985.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-primary/60 hover:text-primary transition-colors duration-300"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-primary/60 hover:text-primary transition-colors duration-300"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-primary/60 hover:text-primary transition-colors duration-300"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-2">
            <h3 className="text-foreground font-medium mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="/about"
                  className="text-muted-foreground/80 hover:text-primary transition-colors duration-300"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/collections"
                  className="text-muted-foreground/80 hover:text-primary transition-colors duration-300"
                >
                  Collections
                </a>
              </li>
              <li>
                <a
                  href="/portfolio"
                  className="text-muted-foreground/80 hover:text-primary transition-colors duration-300"
                >
                  Portfolio
                </a>
              </li>
              <li>
                <a
                  href="/careers"
                  className="text-muted-foreground/80 hover:text-primary transition-colors duration-300"
                >
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div className="md:col-span-2">
            <h3 className="text-foreground font-medium mb-6">Support</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="/contact"
                  className="text-muted-foreground/80 hover:text-primary transition-colors duration-300"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="/faqs"
                  className="text-muted-foreground/80 hover:text-primary transition-colors duration-300"
                >
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href="/shipping"
                  className="text-muted-foreground/80 hover:text-primary transition-colors duration-300"
                >
                  Shipping Info
                </a>
              </li>
              <li>
                <a
                  href="/care-guide"
                  className="text-muted-foreground/80 hover:text-primary transition-colors duration-300"
                >
                  Care Guide
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="md:col-span-4 space-y-6">
            <h3 className="text-foreground font-medium mb-6">
              Visit Our Showroom
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary/60" />
                <p className="text-muted-foreground/80 text-sm">
                  123 Luxury Avenue, Design District
                  <br />
                  Mumbai, India 400001
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary/60" />
                <p className="text-muted-foreground/80 text-sm">
                  info@stardom.luxury
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary/60" />
                <p className="text-muted-foreground/80 text-sm">
                  +91 98765 43210
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Replace with maps. react leaflet */}
        <div className="border-t border-primary/10 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground/60 text-sm">
              © {new Date().getFullYear()} Stardom. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="/privacy"
                className="text-muted-foreground/60 hover:text-primary text-sm transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="text-muted-foreground/60 hover:text-primary text-sm transition-colors duration-300"
              >
                Terms of Service
              </a>
              <a
                href="/cookies"
                className="text-muted-foreground/60 hover:text-primary text-sm transition-colors duration-300"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
