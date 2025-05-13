"use client";
import {
  Package,
  Star,
  MessageSquare,
  Image,
  Building2,
  Film,
  LayoutDashboard,
} from "lucide-react";
import { LucideIcon } from "lucide-react";

interface SidebarItem {
  id: string;
  icon: LucideIcon;
  label: string;
}

export const Sidebar = ({
  activeSection,
  setActiveSection,
}: {
  activeSection: string;
  setActiveSection: (section: string) => void;
}) => {
  const sidebarItems: SidebarItem[] = [
    { id: "products", icon: Package, label: "Products" },
    { id: "featured", icon: Star, label: "Featured Items" },
    { id: "testimonials", icon: MessageSquare, label: "Testimonials" },
    { id: "portfolio", icon: Image, label: "Portfolio" },
    { id: "company", icon: Building2, label: "Company Info" },
    { id: "files", icon: Film, label: "Hero Files" },
  ];

  return (
    <div className="w-64 bg-card border-r shadow-sm p-4 h-screen sticky top-0">
      {" "}
      <div className="mb-8 flex items-start gap-3">
        <LayoutDashboard className="w-12 h-12 text-primary mt-0.5" />
        <div className="flex flex-col">
          <h1 className="text-xl font-medium tracking-tight leading-tight">
            Admin
          </h1>
          <h1 className="text-xl font-medium tracking-tight leading-tight">
            Dashboard
          </h1>
        </div>
      </div>
      <nav className="space-y-1">
        {sidebarItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
              activeSection === item.id
                ? "bg-primary/10 text-primary font-medium shadow-[0_0_10px_rgba(var(--primary-rgb),0.3)]"
                : "text-muted-foreground hover:bg-secondary hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(var(--primary-rgb),0.2)]"
            }`}
          >
            <item.icon
              className={`w-5 h-5 transition-transform duration-200 ${
                activeSection !== item.id ? "group-hover:scale-110" : ""
              }`}
            />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};
