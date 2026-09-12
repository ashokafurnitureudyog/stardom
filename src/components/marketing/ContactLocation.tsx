"use client";

import dynamic from "next/dynamic";
import { MapSkeleton } from "@/components/ui/MapSkeleton";
import type { CompanyInfo } from "@/types/ComponentTypes";

// Leaflet touches window on import, so the map is browser-only.
const LocationMap = dynamic(() => import("@/components/ui/map"), {
  ssr: false,
  loading: () => <MapSkeleton height="70vh" />,
});

export const ContactLocation = ({ companyInfo }: { companyInfo: CompanyInfo }) => (
  <LocationMap companyInfo={companyInfo} />
);
