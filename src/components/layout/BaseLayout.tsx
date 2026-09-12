"use client";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils/utils";
import Footer from "./Footer";
import NavbarComponent from "./NavbarComponent";

const BaseLayout = ({ className, children }: { className?: string; children: ReactNode }) => {
  return (
    <div className={cn("w-screen flex flex-col justify-between min-h-screen font-sans", className)}>
      <NavbarComponent />
      {children}
      <Footer />
    </div>
  );
};

export default BaseLayout;
