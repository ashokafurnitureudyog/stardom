/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CompanyInfo } from "@/types/ComponentTypes";
import { Edit, Loader2, Check, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

interface EditBasicInfoDialogProps {
  initialData: CompanyInfo | null;
  onSuccess: () => Promise<void>;
  triggerClass?: string;
  triggerContent?: ReactNode;
  className?: string;
  triggerRef?: string;
}

export const EditBasicInfoDialog = ({
  initialData,
  onSuccess,
  triggerClass = "",
  triggerContent,
  className = "",
  triggerRef = "",
}: EditBasicInfoDialogProps) => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [formData, setFormData] = useState<CompanyInfo>(
    initialData || {
      name: "",
      parentCompany: "",
      established: "",
      address: {
        street: "",
        city: "",
        Country: "India",
        zip: "",
        coordinates: [0, 0],
      },
      hours: {
        weekday: "",
        sunday: "",
      },
      phone: "",
      email: "",
      website: "",
      mapsLink: "",
    },
  );
  const { toast } = useToast();

  const handleInputChange = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
    setValidationError(""); // Clear error when user makes changes
  };

  const handleAddressChange = (key: string, value: string) => {
    setFormData({
      ...formData,
      address: {
        ...formData.address,
        [key]: value,
      },
    });
    setValidationError(""); // Clear error when user makes changes
  };

  const handleCoordinatesChange = (index: number, value: string) => {
    const newCoordinates = [...formData.address.coordinates];
    newCoordinates[index] = parseFloat(value) || 0;

    setFormData({
      ...formData,
      address: {
        ...formData.address,
        coordinates: newCoordinates as [number, number],
      },
    });
    setValidationError(""); // Clear error when user makes changes
  };

  const handleHoursChange = (key: string, value: string) => {
    setFormData({
      ...formData,
      hours: {
        ...formData.hours,
        [key]: value,
      },
    });
    setValidationError(""); // Clear error when user makes changes
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check for empty fields
    const hasEmptyField =
      !formData.name.trim() ||
      !formData.parentCompany.trim() ||
      !formData.established.trim() ||
      !formData.address.street.trim() ||
      !formData.address.city.trim() ||
      !formData.address.Country.trim() ||
      !formData.address.zip.trim() ||
      !formData.hours.weekday.trim() ||
      !formData.hours.sunday.trim() ||
      !formData.phone.trim() ||
      !formData.email.trim() ||
      !formData.website.trim() ||
      !formData.mapsLink.trim();

    if (hasEmptyField) {
      setValidationError("Please fill in all fields to submit the form");
      return;
    }

    setValidationError(""); // Clear validation error
    setIsSubmitting(true);

    try {
      const submitFormData = new FormData();
      submitFormData.append("section", "basic");
      submitFormData.append("data", JSON.stringify(formData));

      const response = await fetch("/api/protected/company-info", {
        method: "POST",
        body: submitFormData,
      });

      if (!response.ok) {
        throw new Error("Failed to update company info");
      }

      toast({
        title: "Success",
        description: "Company information updated successfully",
        duration: 3000,
      });

      onSuccess();
      setOpen(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update company information",
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="bg-[#3C3120] text-[#A28B55] hover:bg-[#3C3120]/80 border-[#A28B55]/30 hover:border-[#A28B55] flex items-center gap-2"
        >
          <Edit size={16} /> Edit Details
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-6 bg-[#171410] border-[#352b1c]">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold text-[#A28B55] mb-2">
              Edit Company Details
            </h2>
            <p className="text-neutral-400">
              Update your basic company information
            </p>
          </div>

          <div className="space-y-6">
            {/* Company Identity */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-[#A28B55]">
                Company Identity
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-neutral-400">
                    Company Name
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Stardom"
                    className="bg-neutral-950/60 border-[#3C3120] focus:border-[#A28B55] text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="parentCompany" className="text-neutral-400">
                    Parent Company
                  </Label>
                  <Input
                    id="parentCompany"
                    value={formData.parentCompany}
                    onChange={(e) =>
                      handleInputChange("parentCompany", e.target.value)
                    }
                    placeholder="Ashoka Furniture Udyog"
                    className="bg-neutral-950/60 border-[#3C3120] focus:border-[#A28B55] text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="established" className="text-neutral-400">
                    Established Year
                  </Label>
                  <Input
                    id="established"
                    value={formData.established}
                    onChange={(e) =>
                      handleInputChange("established", e.target.value)
                    }
                    placeholder="1996"
                    className="bg-neutral-950/60 border-[#3C3120] focus:border-[#A28B55] text-white"
                  />
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-[#A28B55]">
                Company Address
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="street" className="text-neutral-400">
                    Street Address
                  </Label>
                  <Input
                    id="street"
                    value={formData.address.street}
                    onChange={(e) =>
                      handleAddressChange("street", e.target.value)
                    }
                    placeholder="Plot No. 304, Industrial Area Phase 2"
                    className="bg-neutral-950/60 border-[#3C3120] focus:border-[#A28B55] text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-neutral-400">
                    City
                  </Label>
                  <Input
                    id="city"
                    value={formData.address.city}
                    onChange={(e) =>
                      handleAddressChange("city", e.target.value)
                    }
                    placeholder="Chandigarh"
                    className="bg-neutral-950/60 border-[#3C3120] focus:border-[#A28B55] text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip" className="text-neutral-400">
                    Postal Code
                  </Label>
                  <Input
                    id="zip"
                    value={formData.address.zip}
                    onChange={(e) => handleAddressChange("zip", e.target.value)}
                    placeholder="160002"
                    className="bg-neutral-950/60 border-[#3C3120] focus:border-[#A28B55] text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country" className="text-neutral-400">
                    Country
                  </Label>
                  <Input
                    id="country"
                    value={formData.address.Country}
                    onChange={(e) =>
                      handleAddressChange("Country", e.target.value)
                    }
                    placeholder="India"
                    className="bg-neutral-950/60 border-[#3C3120] focus:border-[#A28B55] text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mapsLink" className="text-neutral-400">
                    Google Maps Link
                  </Label>
                  <Input
                    id="mapsLink"
                    value={formData.mapsLink}
                    onChange={(e) =>
                      handleInputChange("mapsLink", e.target.value)
                    }
                    placeholder="https://maps.app.goo.gl/example"
                    className="bg-neutral-950/60 border-[#3C3120] focus:border-[#A28B55] text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-[#3C3120]/50 pt-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="lat" className="text-neutral-400">
                    Latitude
                  </Label>
                  <Input
                    id="lat"
                    type="number"
                    step="any"
                    value={formData.address.coordinates[0]}
                    onChange={(e) => handleCoordinatesChange(0, e.target.value)}
                    placeholder="30.696056"
                    className="bg-neutral-950/60 border-[#3C3120] focus:border-[#A28B55] text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lng" className="text-neutral-400">
                    Longitude
                  </Label>
                  <Input
                    id="lng"
                    type="number"
                    step="any"
                    value={formData.address.coordinates[1]}
                    onChange={(e) => handleCoordinatesChange(1, e.target.value)}
                    placeholder="76.785417"
                    className="bg-neutral-950/60 border-[#3C3120] focus:border-[#A28B55] text-white"
                  />
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-[#A28B55]">
                Business Hours
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="weekday" className="text-neutral-400">
                    Weekday Hours
                  </Label>
                  <Input
                    id="weekday"
                    value={formData.hours.weekday}
                    onChange={(e) =>
                      handleHoursChange("weekday", e.target.value)
                    }
                    placeholder="10:00 AM - 6:30 PM"
                    className="bg-neutral-950/60 border-[#3C3120] focus:border-[#A28B55] text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sunday" className="text-neutral-400">
                    Sunday Hours
                  </Label>
                  <Input
                    id="sunday"
                    value={formData.hours.sunday}
                    onChange={(e) =>
                      handleHoursChange("sunday", e.target.value)
                    }
                    placeholder="Closed"
                    className="bg-neutral-950/60 border-[#3C3120] focus:border-[#A28B55] text-white"
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-[#A28B55]">
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-neutral-400">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="+91 62846 73783"
                    className="bg-neutral-950/60 border-[#3C3120] focus:border-[#A28B55] text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-neutral-400">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="hello@stardom.co.in"
                    className="bg-neutral-950/60 border-[#3C3120] focus:border-[#A28B55] text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website" className="text-neutral-400">
                    Website
                  </Label>
                  <Input
                    id="website"
                    value={formData.website}
                    onChange={(e) =>
                      handleInputChange("website", e.target.value)
                    }
                    placeholder="https://stardom.co.in/"
                    className="bg-neutral-950/60 border-[#3C3120] focus:border-[#A28B55] text-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {validationError && (
            <div className="bg-red-500/10 border border-red-900/50 text-red-400 p-3 rounded-md text-center">
              <AlertCircle className="h-4 w-4 inline-block mr-2" />
              {validationError}
            </div>
          )}

          <Separator className="bg-gradient-to-r from-transparent via-[#3C3120] to-transparent" />

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isSubmitting}
              className="bg-transparent border-[#3C3120] text-neutral-300 hover:bg-neutral-900 hover:border-[#A28B55]"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#A28B55] text-neutral-100 hover:bg-[#A28B55]/90"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="mr-2 animate-spin" /> Saving...
                </>
              ) : (
                <>
                  <Check size={16} className="mr-2" /> Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
