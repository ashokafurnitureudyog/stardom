import React from "react";
import { Instagram, Facebook, Linkedin } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

const FooterComingSoon = () => {
  const quickLinks = [
    { label: "Coming Soon", href: "#" },
    { label: "Our Story", href: "#" },
    { label: "Preview", href: "#" },
    { label: "Newsletter", href: "#" },
  ];

  const legalLinks = [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ];

  return (
    <footer className="bg-black text-gray-400 py-20 font-sans relative">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
          {/* Brand Section */}
          <div className="space-y-6 items-center flex flex-col">
            <Image
              src="/images/logo.png"
              width={150}
              height={100}
              alt="Stardom Logo"
              className="transform hover:scale-105 transition-transform duration-300"
            />
            <p className="text-sm tracking-wide text-center leading-relaxed">
              A brand of Ashoka Furniture Udyog
              <br />
              Redefining luxury living
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white mb-6 text-sm font-semibold tracking-widest">
              QUICK LINKS
            </h4>
            <nav className="space-y-4">
              {quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-sm hover:text-white transition-colors duration-300 transform hover:translate-x-1"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
          {/* Contact Info */}
          <div>
            <h4 className="text-white mb-6 text-sm font-semibold tracking-widest">
              CONTACT
            </h4>
            <div className="space-y-4 text-sm">
              <p className="flex items-center hover:text-white transition-colors duration-300">
                Email: hello@stardom.co.in
              </p>
              <p className="flex items-center hover:text-white transition-colors duration-300">
                Phone: +91 62846 73783
              </p>
              <p className="leading-relaxed hover:text-white transition-colors duration-300">
                Location: Plot N0. 304, Industrial Area Phase 2, Chandigarh,
                India
              </p>
            </div>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-white mb-6 text-sm font-semibold tracking-widest">
              LEGAL
            </h4>
            <nav className="space-y-4">
              {legalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-sm hover:text-white transition-colors duration-300 transform hover:translate-x-1"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        <Separator className="my-12 bg-zinc-800" />

        {/* Copyright Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm tracking-wide">
            © 2024 Stardom. All rights reserved.
          </p>
          <div className="flex gap-8">
            <Instagram className="h-5 w-5 hover:text-white cursor-pointer transition-all duration-300 hover:scale-110" />
            <Facebook className="h-5 w-5 hover:text-white cursor-pointer transition-all duration-300 hover:scale-110" />
            <Linkedin className="h-5 w-5 hover:text-white cursor-pointer transition-all duration-300 hover:scale-110" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterComingSoon;
