import React, { useState, useEffect } from "react";
import {
  Facebook,
  Instagram,
  Linkedin,
  MapPin,
  Mail,
  Phone,
  ArrowUp,
  Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

const Footer = () => {
  const { theme, resolvedTheme } = useTheme();
  const [logoSrc, setLogoSrc] = useState("/images/logo.png");

  useEffect(() => {
    const currentTheme = resolvedTheme || theme;
    setLogoSrc(currentTheme === "dark" ? "/images/logo-dark.png" : "/images/logo.png");
  }, [theme, resolvedTheme]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const quickLinks = ["About Us", "Collections", "Portfolio", "Careers"];
  const supportLinks = ["Contact Us", "FAQs", "Shipping Info", "Care Guide"];
  const policyLinks = ["Privacy Policy", "Terms of Service", "Cookie Policy"];

  return (
    <footer className="w-full bg-background relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(var(--primary-rgb),0.03),transparent_40%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(var(--primary-rgb),0.03),transparent_40%)]" />

      {/* Main Content */}
      <div className="relative border-t border-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-16 lg:py-24">
          <div className="grid md:grid-cols-12 gap-8 lg:gap-16">
            {/* Logo and Description Column */}
            <div className="md:col-span-4 space-y-8">
            <div className="flex h-16 items-center">
                <img
                  src={logoSrc}
                  alt="Stardom Logo"
                  className="w-40 transform hover:scale-105 transition-transform duration-300"
                />
              </div>
              <p className="text-muted-foreground/80 leading-relaxed">
                A premium collection of luxury office furniture by Ashoka
                Furniture Udyog. Crafting elegance and functionality since 1996.
              </p>
              <div className="flex gap-6">
                {[
                  { Icon: Facebook, href: "#facebook" },
                  { Icon: Instagram, href: "#instagram" },
                  { Icon: Linkedin, href: "#linkedin" }
                ].map(({ Icon, href }) => (
                  <a
                    key={href}
                    href={href}
                    className="text-primary/60 hover:text-primary transition-colors duration-300"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links Column */}
            <div className="md:col-span-2">
              <h3 className="font-serif italic text-xl mb-8">Quick Links</h3>
              <ul className="space-y-4">
                {quickLinks.map((item) => (
                  <li key={item}>
                    <a
                      href={`/${item.toLowerCase().replace(' ', '-')}`}
                      className="text-muted-foreground/80 hover:text-primary transition-all duration-300 group flex items-center"
                    >
                      <span className="h-px w-0 bg-primary mr-0 group-hover:w-4 group-hover:mr-2 transition-all duration-300" />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Column */}
            <div className="md:col-span-2">
              <h3 className="font-serif italic text-xl mb-8">Support</h3>
              <ul className="space-y-4">
                {supportLinks.map((item) => (
                  <li key={item}>
                    <a
                      href={`/${item.toLowerCase().replace(' ', '-')}`}
                      className="text-muted-foreground/80 hover:text-primary transition-all duration-300 group flex items-center"
                    >
                      <span className="h-px w-0 bg-primary mr-0 group-hover:w-4 group-hover:mr-2 transition-all duration-300" />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Information */}
            <div className="md:col-span-4 space-y-8">
              <h3 className="font-serif italic text-xl">Visit Our Showroom</h3>
              <div className="space-y-6">
                {[
                  {
                    Icon: MapPin,
                    content: (
                      <p className="text-muted-foreground/80 leading-relaxed">
                        Plot No. 304, Industrial Area Phase 2
                        <br />
                        Chandigarh, India 160002
                      </p>
                    )
                  },
                  {
                    Icon: Mail,
                    content: (
                      <a
                        href="mailto:hello@stardom.co.in"
                        className="text-muted-foreground/80 hover:text-primary transition-colors duration-300"
                      >
                        hello@stardom.co.in
                      </a>
                    )
                  },
                  {
                    Icon: Phone,
                    content: (
                      <a
                        href="tel:+916284673783"
                        className="text-muted-foreground/80 hover:text-primary transition-colors duration-300"
                      >
                        +91 62846 73783
                      </a>
                    )
                  }
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
                  © {new Date().getFullYear()} Stardom. All rights reserved.
                </p>
                <div className="flex items-center gap-8">
                  {policyLinks.map((item) => (
                    <a
                      key={item}
                      href={`/${item.toLowerCase().replace(' ', '-')}`}
                      className="text-muted-foreground/60 hover:text-primary text-sm transition-colors duration-300"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>

              {/* Developer Signature */}
              <div className="border-t border-primary/5 mt-8">
                <div className="py-6 flex justify-center items-center gap-2 group">
                  <span className="text-muted-foreground/40 text-sm font-light tracking-wide">
                    Crafted with
                  </span>
                  <Heart className="h-3 w-3 text-primary/40 group-hover:text-primary/60 transition-colors duration-300 group-hover:scale-110 transform" />
                  <span className="text-muted-foreground/40 text-sm font-light tracking-wide">
                    by
                  </span>
                  <a
                    href="https://abhisheksharma.tech"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-serif italic text-muted-foreground/60 hover:text-primary/80 transition-all duration-300 text-sm group-hover:tracking-wide"
                  >
                    Abhishek
                  </a>
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