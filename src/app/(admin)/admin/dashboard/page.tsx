"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopBar } from "@/components/dashboard/TopBar";
import { ProductsSection } from "@/components/dashboard/ProductsSection";
import { FeaturedSection } from "@/components/dashboard/FeaturedSection";
import { TestimonialsSection } from "@/components/dashboard/TestimonialsSection";
import { getLoggedInUser } from "@/lib/server/appwrite";
import { PortfolioSection } from "@/components/dashboard/PortfolioSection";
import { CompanyInfoSection } from "@/components/dashboard/CompanyInfoSection";
import { HeroFilesSection } from "@/components/dashboard/HeroFilesSection";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { DashboardLoader } from "@/components/dashboard/preloader/DashboardLoader";

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("products");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<{
    name: string;
    email: string;
    $createdAt: string;
    $updatedAt: string;
  } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getLoggedInUser();
      if (!user) router.push("/auth");
      else setUser(user);
    };
    fetchUser();
  }, [router]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (!user) return <DashboardLoader />;

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop sidebar - only visible on md screens and up */}
      <div className="hidden md:block w-64 shrink-0">
        <Sidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          user={user}
        />
      </div>

      {/* Mobile sidebar as a Sheet - only appears when toggled */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent
          side="left"
          className="p-0 w-[85%] max-w-[320px] sm:max-w-xs"
        >
          <Sidebar
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            user={user}
            isMobile={true}
            onClose={() => setSidebarOpen(false)}
          />
        </SheetContent>
      </Sheet>

      {/* Main content area */}
      <div className="flex-1 flex flex-col w-0">
        <TopBar user={user} toggleSidebar={toggleSidebar} />
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <div className="max-w-full mx-auto">
            {activeSection === "products" && <ProductsSection />}
            {activeSection === "featured" && <FeaturedSection />}
            {activeSection === "testimonials" && <TestimonialsSection />}
            {activeSection === "portfolio" && <PortfolioSection />}
            {activeSection === "company" && <CompanyInfoSection />}
            {activeSection === "files" && <HeroFilesSection />}
          </div>
        </main>
      </div>
    </div>
  );
}
