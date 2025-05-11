/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Check,
  Link,
  Loader2,
  ChevronDown,
  ChevronUp,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TestimonialFormProps {
  onSuccess: () => void;
}

export const TestimonialForm = ({ onSuccess }: TestimonialFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [imageUrlError, setImageUrlError] = useState<string>("");
  const [imageTab, setImageTab] = useState<string>("avatar");
  const [username, setUsername] = useState("");
  const [selectedMonth, setSelectedMonth] = useState<string>("January");
  const [selectedYear, setSelectedYear] = useState<string>(
    new Date().getFullYear().toString(),
  );
  const [selectedAvatar, setSelectedAvatar] = useState<number>(1);
  const [showMonths, setShowMonths] = useState(false);
  const [yearError, setYearError] = useState("");

  const MAX_URL_LENGTH = 1000;
  const avatarsContainerRef = useRef<HTMLDivElement>(null);

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setImageUrl(value);

    // Validate URL length
    if (value.length > MAX_URL_LENGTH) {
      setImageUrlError(
        `URL must be less than ${MAX_URL_LENGTH} characters (currently ${value.length}).`,
      );
    } else {
      setImageUrlError("");
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelectedYear(value);

    if (value.length === 4) {
      const year = parseInt(value);
      const currentYear = new Date().getFullYear();

      if (isNaN(year) || year < 1900 || year > currentYear) {
        setYearError(
          `Please enter a valid year between 1900 and ${currentYear}`,
        );
      } else {
        setYearError("");
      }
    } else if (value.length > 0) {
      setYearError("Year must be 4 digits");
    } else {
      setYearError("");
    }
  };

  // Months array
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Generate avatar numbers 1 to 100
  const avatarNumbers = Array.from({ length: 100 }, (_, i) => i + 1);

  const getAvatarUrl = (avatarNumber: number): string => {
    // Generate a simple, clean URL string with no special encoding
    return `https://avatar.iran.liara.run/public/${avatarNumber}`;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (yearError) {
      return;
    }

    setError("");

    // Prepare the image URL based on the selected tab
    let finalImageUrl = "";

    if (imageTab === "url") {
      finalImageUrl = imageUrl.trim();
      if (!finalImageUrl) {
        setError("Please enter an image URL");
        return;
      }
    } else if (imageTab === "avatar") {
      finalImageUrl = getAvatarUrl(selectedAvatar);
    }

    if (finalImageUrl.length > MAX_URL_LENGTH) {
      setError(
        `Image URL exceeds maximum allowed length of ${MAX_URL_LENGTH} characters.`,
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);

      // Format the date
      const purchaseDate = `${selectedMonth} ${selectedYear}`;
      formData.set("purchaseDate", purchaseDate);

      // Set BOTH fields that the controller might check
      formData.set("img", finalImageUrl); // This is the one it ultimately uses
      formData.set("imageUrl", finalImageUrl); // This is what it checks in the middle
      formData.set("imageSource", imageTab); // This tells it which tab was selected

      // Debug what we're sending
      console.log("Submitting with URL:", finalImageUrl);
      console.log("Using source:", imageTab);

      const response = await fetch("/api/protected/testimonials", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to add testimonial");
      }

      onSuccess();
    } catch (error: any) {
      console.error("Failed to submit testimonial:", error);
      setError(error.message || "An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-[#A28B55] mb-2">
          Add New Testimonial
        </h2>
        <p className="text-neutral-400">
          Add a new client testimonial to showcase on the website
        </p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-900/50 text-red-400 p-4 rounded-md flex items-start gap-3">
          <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-neutral-400">
              Customer Name
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="John Smith"
              required
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                handleUsernameChange(e);
              }}
              className="bg-neutral-950/60 border-[#3C3120] focus:border-[#A28B55]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="title" className="text-neutral-400">
              Job Title & Company
            </Label>
            <Input
              id="title"
              name="title"
              placeholder="CEO, ACME Corp"
              required
              className="bg-neutral-950/60 border-[#3C3120] focus:border-[#A28B55]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="location" className="text-neutral-400">
              Location
            </Label>
            <Input
              id="location"
              name="location"
              placeholder="Mumbai"
              required
              className="bg-neutral-950/60 border-[#3C3120] focus:border-[#A28B55]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="purchaseDate" className="text-neutral-400">
              Purchase Date
            </Label>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Input
                  readOnly
                  value={selectedMonth}
                  onClick={() => setShowMonths(!showMonths)}
                  className="bg-neutral-950/60 border-[#3C3120] focus:border-[#A28B55] cursor-pointer pl-3 pr-8"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  {showMonths ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </div>

                {showMonths && (
                  <div className="absolute z-50 mt-1 w-full bg-[#171410] border border-[#3C3120] rounded-md shadow-lg p-2">
                    <div className="grid grid-cols-4 gap-1">
                      {months.map((month) => (
                        <div
                          key={month}
                          onClick={() => {
                            setSelectedMonth(month);
                            setShowMonths(false);
                          }}
                          className={cn(
                            "px-2 py-1.5 text-xs rounded transition-colors cursor-pointer",
                            selectedMonth === month
                              ? "bg-[#A28B55]/20 text-[#A28B55]"
                              : "hover:bg-neutral-800",
                          )}
                        >
                          {month.substring(0, 3)}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Input
                id="yearInput"
                value={selectedYear}
                onChange={handleYearChange}
                placeholder="YYYY"
                maxLength={4}
                className="w-24 bg-neutral-950/60 border-[#3C3120] focus:border-[#A28B55]"
              />
            </div>
            {yearError && (
              <p className="text-xs text-red-400 mt-1">{yearError}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="context" className="text-neutral-400">
            Purchase Context
          </Label>
          <Input
            id="context"
            name="context"
            placeholder="Office Renovation Project"
            required
            className="bg-neutral-950/60 border-[#3C3120] focus:border-[#A28B55]"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="quote" className="text-neutral-400">
              Testimonial Quote
            </Label>
            <span className="text-xs text-neutral-500">Max 500 characters</span>
          </div>
          <Textarea
            id="quote"
            name="quote"
            rows={5}
            placeholder="Enter the client's testimonial here..."
            required
            maxLength={500}
            className="bg-neutral-950/60 border-[#3C3120] focus:border-[#A28B55] resize-none"
          />
        </div>

        <div className="space-y-3">
          <Label className="text-neutral-400">Profile Image</Label>

          <Tabs
            defaultValue="avatar"
            value={imageTab}
            onValueChange={setImageTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-2 mb-4 bg-neutral-900 p-0.5 rounded-md gap-2 border border-[#3C3120]">
              <TabsTrigger
                value="avatar"
                className="flex items-center justify-center gap-2 data-[state=active]:bg-[#A28B55] data-[state=active]:text-neutral-900 data-[state=active]:shadow-md data-[state=inactive]:bg-[#3C3120] data-[state=inactive]:text-neutral-200 py-1 transition-all duration-200"
              >
                Avatar
              </TabsTrigger>
              <TabsTrigger
                value="url"
                className="flex items-center justify-center gap-2 data-[state=active]:bg-[#A28B55] data-[state=active]:text-neutral-900 data-[state=active]:shadow-md data-[state=inactive]:bg-[#3C3120] data-[state=inactive]:text-neutral-200 py-1 transition-all duration-200"
              >
                Custom URL
              </TabsTrigger>
            </TabsList>

            <TabsContent value="avatar">
              <div
                ref={avatarsContainerRef}
                className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2 max-h-40 overflow-y-auto py-2 px-1 border border-[#3C3120] rounded-md"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "#3C3120 transparent",
                }}
              >
                {avatarNumbers.map((num) => (
                  <div
                    key={num}
                    onClick={() => setSelectedAvatar(num)}
                    className={cn(
                      "cursor-pointer rounded-md p-1 transition-all border-2",
                      selectedAvatar === num
                        ? "border-[#A28B55] bg-[#A28B55]/10"
                        : "border-transparent hover:border-[#3C3120]/50",
                    )}
                  >
                    <div className="aspect-square w-full relative overflow-hidden rounded-full">
                      <img
                        src={getAvatarUrl(num)}
                        alt={`Avatar ${num}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = "https://avatar.iran.liara.run/public";
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="url">
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-1">
                  <Link size={14} className="text-neutral-400" />
                  <Label htmlFor="imageUrl" className="text-neutral-400">
                    Image URL
                  </Label>
                </div>
                <Input
                  id="imageUrl"
                  value={imageUrl}
                  onChange={handleImageUrlChange}
                  placeholder="https://example.com/image.jpg"
                  className={cn(
                    "bg-neutral-950/60 border-[#3C3120] focus:border-[#A28B55]",
                    imageUrlError && "border-red-500 focus:border-red-500",
                  )}
                />

                {imageUrlError && (
                  <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                    <AlertCircle size={12} /> {imageUrlError}
                  </p>
                )}

                {imageUrl && !imageUrlError && (
                  <div className="mt-4 border border-[#3C3120] rounded-md p-4 bg-neutral-950/30">
                    <div className="relative aspect-square w-16 h-16 rounded-full overflow-hidden mx-auto">
                      <img
                        src={imageUrl}
                        alt="Preview"
                        className="object-cover w-full h-full"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src =
                            "https://via.placeholder.com/150?text=Error";
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Separator className="bg-gradient-to-r from-transparent via-[#3C3120] to-transparent" />

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => onSuccess()}
          disabled={isSubmitting}
          className="bg-transparent border-[#3C3120] text-neutral-300 hover:bg-neutral-900 hover:border-[#A28B55]"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting || !!yearError || !!imageUrlError}
          className="bg-[#A28B55] text-neutral-100 hover:bg-[#A28B55]/90"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={16} className="mr-2 animate-spin" /> Saving...
            </>
          ) : (
            <>
              <Check size={16} className="mr-2" /> Save Testimonial
            </>
          )}
        </Button>
      </div>

      <style jsx global>{`
        ::-webkit-scrollbar {
          width: 6px;
        }

        ::-webkit-scrollbar-track {
          background: transparent;
        }

        ::-webkit-scrollbar-thumb {
          background-color: #3c3120;
          border-radius: 3px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background-color: #a28b55;
        }
      `}</style>
    </form>
  );
};
