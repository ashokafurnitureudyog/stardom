"use client";
import { useState, useEffect, useCallback } from "react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Search, RefreshCw, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddTestimonialDialog } from "./testimonials/AddTestimonialDialog";
import { TestimonialCard } from "./testimonials/TestimonialCard ";
import type { ClientTestimonial } from "@/types/ComponentTypes";
import { useToast } from "@/hooks/use-toast";

export const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState<ClientTestimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const { toast } = useToast();

  // Filter testimonials based on search query
  const filteredTestimonials = testimonials.filter(
    (testimonial) =>
      testimonial.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      testimonial.quote.toLowerCase().includes(searchQuery.toLowerCase()) ||
      testimonial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      testimonial.context.toLowerCase().includes(searchQuery.toLowerCase()) ||
      testimonial.location.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const fetchTestimonials = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/testimonials", {
        cache: "no-store",
      });

      if (!res.ok) throw new Error("Failed to fetch testimonials");

      const data = await res.json();
      setTestimonials(data);
    } catch (error) {
      console.error("Failed to fetch testimonials:", error);
      setError(
        error instanceof Error ? error.message : "Failed to load testimonials",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  const handleDelete = async (id: string, imageUrl: string) => {
    try {
      // Optimistically update UI
      setTestimonials((prev) =>
        prev.filter((t) => t.id !== id && t.$id !== id),
      );

      const response = await fetch("/api/protected/testimonials", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, imageUrl }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to delete testimonial");
      }

      toast({
        title: "Success",
        description: "Testimonial deleted successfully",
      });
    } catch (error) {
      console.error("Delete failed:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to delete testimonial",
        variant: "destructive",
      });
      // If deletion fails, refresh the list
      fetchTestimonials();
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-8">
        <div>
          <h2 className="text-3xl font-semibold mb-2 text-[#A28B55]">
            Client Testimonials
          </h2>
          <p className="text-muted-foreground">
            {testimonials.length} testimonials
          </p>
        </div>

        <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-center gap-4">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search testimonials..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2 w-full sm:w-auto lg:w-auto justify-center">
            <Button
              variant="outline"
              size="default"
              className="flex items-center gap-2 h-10 hover:bg-secondary"
              onClick={fetchTestimonials}
            >
              <RefreshCw size={16} />{" "}
              <span className="hidden lg:inline">Refresh</span>
            </Button>

            <AddTestimonialDialog onSuccess={fetchTestimonials} />
          </div>
        </div>
      </div>

      <Separator className="my-6" />

      {error && (
        <div className="bg-red-500/10 text-red-400 p-4 mb-6 rounded border border-red-900/50">
          <p>{error}</p>
          <Button
            variant="outline"
            className="mt-2 bg-transparent border-[#3C3120] text-[#A28B55] hover:bg-neutral-800 hover:border-[#A28B55]"
            onClick={fetchTestimonials}
          >
            Try Again
          </Button>
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <TestimonialCard
              key={item}
              testimonial={{} as ClientTestimonial}
              onDelete={() => Promise.resolve()}
              isLoading={true}
            />
          ))}
        </div>
      ) : filteredTestimonials.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTestimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id || testimonial.$id}
              testimonial={testimonial}
              onDelete={handleDelete}
              onEdit={fetchTestimonials}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-black/40 border border-[#3C3120] rounded-md">
          <MessageSquare className="mx-auto h-12 w-12 text-[#A28B55] opacity-70 mb-4" />
          {searchQuery ? (
            <>
              <h3 className="text-xl font-medium mb-3 text-[#A28B55]">
                No Testimonials Found
              </h3>
              <p className="text-neutral-500 mb-6">
                No testimonials match your search query
              </p>
            </>
          ) : (
            <>
              <h3 className="text-xl font-medium mb-3 text-[#A28B55]">
                No Testimonials Yet
              </h3>
              <p className="text-neutral-500 mb-6">
                Get started by adding your first client testimonial
              </p>
              <div className="flex justify-center">
                <AddTestimonialDialog onSuccess={fetchTestimonials} />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
