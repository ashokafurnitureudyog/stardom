"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CompanyInfo } from "@/types/ComponentTypes";
import { EditBasicInfoDialog } from "./EditBasicInfoDialog";
import {
  BuildingIcon,
  MapPin,
  Phone,
  Clock,
  Calendar,
  Globe,
  PenSquare,
} from "lucide-react";

interface CompanyDetailsCardProps {
  companyInfo: CompanyInfo | null;
  onRefresh: () => Promise<void>;
}

export const CompanyDetailsCard = ({
  companyInfo,
  onRefresh,
}: CompanyDetailsCardProps) => {
  return (
    <div className="relative group h-full">
      <Card className="bg-black/40 border-[#3C3120] h-full group-hover:border-[#A28B55] transition-colors duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-semibold text-[#A28B55] flex items-center gap-2">
            <BuildingIcon className="w-5 h-5" /> Company Details
          </CardTitle>

          {/* Original edit button */}
          {companyInfo && (
            <EditBasicInfoDialog
              initialData={companyInfo}
              onSuccess={onRefresh}
            />
          )}
        </CardHeader>

        <CardContent className="pt-4">
          {companyInfo ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="col-span-1 md:col-span-2">
                <div className="bg-black/30 rounded-md p-4 border border-[#3C3120]/50 hover:border-[#A28B55]/60 hover:bg-black/40 transition-colors duration-200">
                  <h3 className="text-lg font-medium text-white mb-1">
                    {companyInfo.name}
                  </h3>
                  <p className="text-neutral-400">
                    {companyInfo.parentCompany}
                  </p>
                  <p className="text-sm text-[#A28B55] mt-2 flex items-center">
                    <Calendar className="h-3.5 w-3.5 mr-1.5" /> Est.{" "}
                    {companyInfo.established}
                  </p>
                </div>
              </div>

              <div className="bg-black/30 rounded-md p-4 border border-[#3C3120]/50 hover:border-[#A28B55]/60 hover:bg-black/40 transition-colors duration-200">
                <h4 className="text-xs uppercase text-[#A28B55] mb-2 flex items-center font-medium">
                  <MapPin className="h-3 w-3 mr-1" /> Address
                </h4>
                <p className="text-neutral-300 text-sm">
                  {companyInfo.address.street}
                </p>
                <p className="text-neutral-300 text-sm">
                  {companyInfo.address.city}, {companyInfo.address.Country}{" "}
                  {companyInfo.address.zip}
                </p>
                {companyInfo.mapsLink && (
                  <a
                    href={companyInfo.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#A28B55] hover:underline text-xs mt-2"
                  >
                    <Globe className="h-3 w-3" /> View on Maps
                  </a>
                )}
              </div>

              <div className="bg-black/30 rounded-md p-4 border border-[#3C3120]/50 hover:border-[#A28B55]/60 hover:bg-black/40 transition-colors duration-200">
                <h4 className="text-xs uppercase text-[#A28B55] mb-2 flex items-center font-medium">
                  <Phone className="h-3 w-3 mr-1" /> Contact
                </h4>
                <p className="text-neutral-300 text-sm">{companyInfo.phone}</p>
                <p className="text-neutral-300 text-sm">{companyInfo.email}</p>
                {companyInfo.website && (
                  <a
                    href={companyInfo.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#A28B55] hover:underline text-xs mt-2"
                  >
                    <Globe className="h-3 w-3" /> Visit Website
                  </a>
                )}
              </div>

              <div className="bg-black/30 rounded-md p-4 border border-[#3C3120]/50 hover:border-[#A28B55]/60 hover:bg-black/40 transition-colors duration-200">
                <h4 className="text-xs uppercase text-[#A28B55] mb-2 flex items-center font-medium">
                  <Clock className="h-3 w-3 mr-1" /> Hours
                </h4>
                <p className="text-neutral-300 text-sm">
                  Weekdays: {companyInfo.hours.weekday}
                </p>
                <p className="text-neutral-300 text-sm">
                  Sunday: {companyInfo.hours.sunday}
                </p>
              </div>

              {/* Adding the coordinates block in the bottom right corner */}
              <div className="bg-black/30 rounded-md p-4 border border-[#3C3120]/50 hover:border-[#A28B55]/60 hover:bg-black/40 transition-colors duration-200">
                <h4 className="text-xs uppercase text-[#A28B55] mb-2 flex items-center font-medium">
                  <MapPin className="h-3 w-3 mr-1" /> Coordinates
                </h4>
                <p className="text-neutral-300 text-sm">
                  Latitude: {companyInfo.address.coordinates[0]}
                </p>
                <p className="text-neutral-300 text-sm">
                  Longitude: {companyInfo.address.coordinates[1]}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[240px]">
              <BuildingIcon className="h-16 w-16 text-[#A28B55]/30 mb-4" />
              <p className="text-neutral-500 mb-5 text-center">
                No company details added yet
              </p>

              <EditBasicInfoDialog
                initialData={null}
                onSuccess={onRefresh}
                triggerClass="bg-[#3C3120]/60 text-[#A28B55] hover:bg-[#3C3120] border-[#A28B55]/30 hover:border-[#A28B55] flex items-center gap-2"
                triggerContent={
                  <>
                    <PenSquare size={16} /> Add Company Details
                  </>
                }
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
