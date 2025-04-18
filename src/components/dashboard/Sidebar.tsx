"use client";
import { Package, Star, MessageSquare, Image, Building2 } from "lucide-react";
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
  ];

  return (
    <div className="w-64 bg-card border-r shadow-sm p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-extralight tracking-tight mb-2">
          STARDOM
        </h1>
        <p className="text-sm text-muted-foreground">Admin Dashboard</p>
      </div>
      <nav className="space-y-1">
        {sidebarItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
              activeSection === item.id
                ? "bg-primary/10 text-primary font-medium"
                : "text-muted-foreground hover:bg-secondary"
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};
