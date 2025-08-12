"use client";
import { useState, useRef, useEffect } from "react";
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
  X,
} from "lucide-react";
import { cn } from "@/lib/utils/utils";
import {
  TESTIMONIAL_MONTHS,
  TESTIMONIAL_AVATAR_NUMBERS,
  MAX_TESTIMONIAL_IMAGE_URL_LENGTH,
} from "@/lib/constants/TestimonialConstants";
import { ClientTestimonial } from "@/types/ComponentTypes";

interface TestimonialFormProps {
  onSuccess: () => void;
  initialData?: ClientTestimonial;
  isEditing?: boolean;
}

export const TestimonialForm = ({
  onSuccess,
  initialData,
  isEditing = false,
}: TestimonialFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Parse the initial purchase date if it exists
  const parsePurchaseDate = () => {
    if (!initialData?.purchaseDate)
      return {
        month: TESTIMONIAL_MONTHS[0],
        year: new Date().getFullYear().toString(),
      };

    const parts = initialData.purchaseDate.split(" ");
    // Handle cases where the purchaseDate might not be in "Month Year" format
    if (parts.length < 2)
      return {
        month: TESTIMONIAL_MONTHS[0],
        year: new Date().getFullYear().toString(),
      };

    const month = parts[0];
    const year = parts[1];

    // Validate the month
    const validMonth = TESTIMONIAL_MONTHS.includes(month)
      ? month
      : TESTIMONIAL_MONTHS[0];

    return { month: validMonth, year };
  };

  // Extract the purchase date parts
  const { month: initialMonth, year: initialYear } = parsePurchaseDate();

  // Image handling
  const [imageUrl, setImageUrl] = useState<string>(initialData?.img || "");
  const [imageUrlError, setImageUrlError] = useState<string>("");
  const [imageTab, setImageTab] = useState<string>(
    initialData?.img
      ? initialData.img.includes("avatar.iran.liara.run")
        ? "avatar"
        : "url"
      : "avatar",
  );
  const [isImageRemoved, setIsImageRemoved] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<number>(1);

  // Form fields
  const [username, setUsername] = useState(initialData?.name || "");
  const [selectedMonth, setSelectedMonth] = useState<string>(initialMonth);
  const [selectedYear, setSelectedYear] = useState<string>(initialYear);
  const [showMonths, setShowMonths] = useState(false);
  const [yearError, setYearError] = useState("");

  const avatarsContainerRef = useRef<HTMLDivElement>(null);

  // Extract avatar number from URL if available
  useEffect(() => {
    if (
      isEditing &&
      initialData?.img &&
      initialData.img.includes("avatar.iran.liara.run")
    ) {
      const match = initialData.img.match(/\/public\/(\d+)$/);
      if (match && match[1]) {
        const avatarNumber = parseInt(match[1]);
        if (
          !isNaN(avatarNumber) &&
          TESTIMONIAL_AVATAR_NUMBERS.includes(avatarNumber)
        ) {
          setSelectedAvatar(avatarNumber);
        }
      }
    }
  }, [isEditing, initialData]);

  // When image tab changes, update the preview
  useEffect(() => {
    if (imageTab === "avatar" && isImageRemoved) {
      // When switching to avatar tab after removing an image, generate a preview
      setImageUrl(getAvatarUrl(selectedAvatar));
    }
  }, [imageTab, isImageRemoved, selectedAvatar]);

  // When avatar selection changes, update the image URL if in avatar tab
  useEffect(() => {
    if (imageTab === "avatar") {
      setImageUrl(getAvatarUrl(selectedAvatar));
      setIsImageRemoved(false); // Reset removed state when selecting a new avatar
    }
  }, [selectedAvatar, imageTab]);

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setImageUrl(value);
    setIsImageRemoved(false);

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

  const handleRemoveImage = () => {
    setImageUrl("");
    setIsImageRemoved(true);
    // Don't automatically switch tabs when removing an image
  };

  const getAvatarUrl = (avatarNumber: number): string =>
    `https://avatar.iran.liara.run/public/${avatarNumber}`;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (yearError) return;
    setError("");

    let finalImageUrl = "";

    // Only set image if it's not explicitly removed
    if (!isImageRemoved) {
      if (imageTab === "url" && imageUrl) {
        finalImageUrl = imageUrl.trim();
      } else if (imageTab === "avatar") {
        finalImageUrl = getAvatarUrl(selectedAvatar);
      }

      if (finalImageUrl.length > MAX_TESTIMONIAL_IMAGE_URL_LENGTH) {
        setError(
          `Image URL exceeds maximum allowed length of ${MAX_TESTIMONIAL_IMAGE_URL_LENGTH} characters.`,
        );
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      const purchaseDate = `${selectedMonth} ${selectedYear}`;
      formData.set("purchaseDate", purchaseDate);
      formData.set("img", finalImageUrl);
      formData.set("imageUrl", finalImageUrl);
      formData.set("imageSource", imageTab);
      formData.set("imageRemoved", isImageRemoved.toString());

      // If editing, include the testimonial ID
      if (isEditing && initialData) {
        const testimonialId = initialData.id || initialData.$id;
        if (testimonialId) {
          formData.set("id", testimonialId);
        }
      }

      // Use POST method for both create and update
      const response = await fetch("/api/protected/testimonials", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(
          data.message ||
            `Failed to ${isEditing ? "update" : "add"} testimonial`,
        );
      }

      onSuccess();
    } catch (error: Error | unknown) {
      console.error(
        `Failed to ${isEditing ? "update" : "submit"} testimonial:`,
        error,
      );
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render the current profile image if editing and not removed
  const renderCurrentImage = () => {
    if (!isEditing || isImageRemoved || (!initialData?.img && !imageUrl))
      return null;

    const displayUrl = imageUrl || initialData?.img || "";

    return (
      <div className="mb-6 border border-[#3C3120] rounded-md p-4 bg-neutral-950/30">
        <h4 className="text-sm font-medium text-neutral-400 mb-3">
          Current Profile Image
        </h4>
        <div className="group relative w-16 h-16 mx-auto">
          <div className="aspect-square rounded-full overflow-hidden border border-[#3C3120]">
            <Image
              src={displayUrl}
              alt="Current image"
              fill
              unoptimized
              className="object-cover"
              sizes="64px"
            />
          </div>

          {/* Delete button */}
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute -top-2 -right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
            onClick={handleRemoveImage}
          >
            <X size={12} />
          </Button>
        </div>
      </div>
    );
  };

  // Show preview for avatar selection even when editing
  const renderAvatarPreview = () => {
    if (
      imageTab !== "avatar" ||
      (!isImageRemoved && isEditing && initialData?.img)
    )
      return null;

    return (
      <div className="mt-4 border border-[#3C3120] rounded-md p-4 bg-neutral-950/30">
        <div className="relative aspect-square w-16 h-16 rounded-full overflow-hidden mx-auto">
          <Image
            src={getAvatarUrl(selectedAvatar)}
            alt="Avatar preview"
            fill
            unoptimized
            className="object-cover"
            sizes="64px"
          />
        </div>
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-[#A28B55] mb-2">
          {isEditing ? "Edit Testimonial" : "Add New Testimonial"}
        </h2>
        <p className="text-neutral-400">
          {isEditing
            ? "Update this client testimonial displayed on the website"
            : "Add a new client testimonial to showcase on the website"}
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
              defaultValue={initialData?.title || ""}
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
              defaultValue={initialData?.location || ""}
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
            defaultValue={initialData?.context || ""}
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
            defaultValue={initialData?.quote || ""}
            maxLength={500}
            className="bg-neutral-950/60 border-[#3C3120] focus:border-[#A28B55] resize-none"
          />
        </div>

        <div className="space-y-3">
          <Label className="text-neutral-400">Profile Image</Label>

          {/* Display current image if editing */}
          {renderCurrentImage()}

          {/* Show avatar/URL selection if:
              1. Not editing, OR
              2. Image was removed, OR
              3. No initial image exists */}
          {(!isEditing ||
            isImageRemoved ||
            (!initialData?.img && !imageUrl)) && (
            <Tabs
              defaultValue={imageTab}
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

                {/* Show avatar preview */}
                {renderAvatarPreview()}
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
          )}
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
              <Check size={16} className="mr-2" />{" "}
              {isEditing ? "Update" : "Save"} Testimonial
            </>
          )}
        </Button>
      </div>
    </form>
  );
};
