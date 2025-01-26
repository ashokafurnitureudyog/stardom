"use client";
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import Image from "next/image";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-black/80 backdrop-blur-lg" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 font-sans">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="transform hover:scale-105 transition-transform duration-300">
              <Image
                src="/images/logo.png"
                width={100}
                height={100}
                alt="Stardom Logo"
                className="transform hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Coming Soon Text */}
            <div className="hidden sm:block text-gray-400 text-sm tracking-[0.3em] uppercase font-light">
              Coming Soon
            </div>

            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="sm:hidden w-8 h-8 flex items-center justify-center z-50"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="text-white" size={24} />
              ) : (
                <div className="space-y-1.5">
                  <div className="w-6 h-px bg-gray-400 transition-all duration-300" />
                  <div className="w-4 h-px bg-gray-400 ml-auto transition-all duration-300" />
                </div>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Fullscreen Mobile Menu */}
      <div
        className={`fixed font-sans inset-0 bg-black/90 backdrop-blur-lg z-40 transition-all duration-500 sm:hidden
          ${
            isMobileMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
      >
        <div className="flex flex-col items-center justify-center h-full">
          <nav className="space-y-8 text-center">
            <div className="block text-3xl text-gray-200 hover:text-white transition-colors duration-200">
              Coming Soon
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
