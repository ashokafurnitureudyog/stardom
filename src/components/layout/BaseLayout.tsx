"use client";
import { cn } from "@/lib/utils/utils";
import { ReactNode } from "react";
import NavbarComponent from "./NavbarComponent";
import Footer from "./Footer";

const BaseLayout = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div
      className={cn(
        "w-screen flex flex-col justify-between min-h-screen font-sans",
        className,
      )}
    >
      <NavbarComponent />
      {children}
      <Footer />
    </div>
  );
};

export default BaseLayout;
