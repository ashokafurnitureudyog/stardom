"use client";
import { useState, useRef } from "react";
import Image from "next/image";
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
import {
  TESTIMONIAL_MONTHS,
  TESTIMONIAL_AVATAR_NUMBERS,
  MAX_TESTIMONIAL_IMAGE_URL_LENGTH,
} from "@/lib/constants/TestimonialConstants";

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
  const [selectedMonth, setSelectedMonth] = useState<string>(
    TESTIMONIAL_MONTHS[0],
  );
  const [selectedYear, setSelectedYear] = useState<string>(
    new Date().getFullYear().toString(),
  );
  const [selectedAvatar, setSelectedAvatar] = useState<number>(1);
  const [showMonths, setShowMonths] = useState(false);
  const [yearError, setYearError] = useState("");

  const avatarsContainerRef = useRef<HTMLDivElement>(null);

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setImageUrl(value);

    if (value.length > MAX_TESTIMONIAL_IMAGE_URL_LENGTH) {
      setImageUrlError(
        `URL must be less than ${MAX_TESTIMONIAL_IMAGE_URL_LENGTH} characters (currently ${value.length}).`,
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

  const getAvatarUrl = (avatarNumber: number): string =>
    `https://avatar.iran.liara.run/public/${avatarNumber}`;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (yearError) return;
    setError("");

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

    if (finalImageUrl.length > MAX_TESTIMONIAL_IMAGE_URL_LENGTH) {
      setError(
        `Image URL exceeds maximum allowed length of ${MAX_TESTIMONIAL_IMAGE_URL_LENGTH} characters.`,
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      const purchaseDate = `${selectedMonth} ${selectedYear}`;
      formData.set("purchaseDate", purchaseDate);
      formData.set("img", finalImageUrl);
      formData.set("imageUrl", finalImageUrl);
      formData.set("imageSource", imageTab);

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
    } catch (error: Error | unknown) {
      console.error("Failed to submit testimonial:", error);
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred",
      );
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
                      {TESTIMONIAL_MONTHS.map((month) => (
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
              >
                {TESTIMONIAL_AVATAR_NUMBERS.map((num) => (
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
                      <Image
                        src={getAvatarUrl(num)}
                        alt={`Avatar ${num}`}
                        fill
                        unoptimized
                        className="object-cover"
                        sizes="100vw"
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
                      <Image
                        src={imageUrl}
                        alt="Preview"
                        fill
                        unoptimized
                        className="object-cover w-full h-full"
                        sizes="64px"
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
    </form>
  );
};
