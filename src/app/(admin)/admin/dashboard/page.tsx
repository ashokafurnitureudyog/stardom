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

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("products");
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

  if (!user)
    return <div className="flex-1 grid place-items-center">Loading...</div>;

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <div className="flex-1 flex flex-col">
        <TopBar user={user} />
        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-6xl mx-auto">
            {activeSection === "products" && <ProductsSection />}
            {activeSection === "featured" && <FeaturedSection />}
            {activeSection === "testimonials" && <TestimonialsSection />}
            {activeSection === "portfolio" && <PortfolioSection />}
            {activeSection === "company" && <CompanyInfoSection />}
          </div>
        </main>
      </div>
    </div>
  );
}
