import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
  AttributionControl,
} from "react-leaflet";
import { useTheme } from "next-themes";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import { CompanyInfo } from "@/types/ComponentTypes";
import { InfoCard } from "../marketing/InfoCard";
import { MapSkeleton } from "./MapSkeleton";

// Override default Leaflet popup styles
import "./Map.css";
type Coordinates = [number, number];

interface MapSectionProps {
  companyInfo: CompanyInfo;
  isLoading?: boolean;
}

// Default coordinates (fallback)
const DEFAULT_COORDINATES: Coordinates = [30.6960369, 76.7828628];
const DEFAULT_ZOOM = 16;

const DefaultIcon = L.icon({
  iconUrl: icon.src,
  shadowUrl: iconShadow.src,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

L.Marker.prototype.options.icon = DefaultIcon;

const mapStyle = {
  light: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  dark: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}.png",
};

export default function Map({
  companyInfo,
  isLoading = false,
}: MapSectionProps) {
  const { theme } = useTheme();
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mapHeight, setMapHeight] = useState("70vh");

  // Validate coordinates and use fallback if invalid
  const getValidCoordinates = (): Coordinates => {
    try {
      const [lat, lng] =
        companyInfo?.address?.coordinates || DEFAULT_COORDINATES;
      if (
        typeof lat === "number" &&
        typeof lng === "number" &&
        !isNaN(lat) &&
        !isNaN(lng) &&
        lat >= -90 &&
        lat <= 90 &&
        lng >= -180 &&
        lng <= 180
      ) {
        return companyInfo.address.coordinates;
      }
      console.warn("Invalid coordinates provided, using default");
      return DEFAULT_COORDINATES;
    } catch (e) {
      console.error("Error parsing coordinates:", e);
      return DEFAULT_COORDINATES;
    }
  };

  // Handle responsive height
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setMapHeight("50vh");
      } else {
        setMapHeight("70vh");
      }
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const mapContainerStyle = {
    filter:
      theme === "dark"
        ? "invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)"
        : "none",
  };

  // Handle map load events
  const handleMapLoad = () => {
    setIsMapLoaded(true);
  };

  const handleMapError = (e: L.LeafletEvent) => {
    console.error("Map failed to load:", e);
    setError("Failed to load map. Please try again later.");
  };

  // Show skeleton loader if data is loading
  if (isLoading) {
    return (
      <div className="relative">
        <MapSkeleton height={mapHeight} />
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Map section */}
      <section
        className="relative border-b border-border"
        style={{ height: mapHeight }}
      >
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
            <div className="p-6 bg-background shadow-lg rounded-lg">
              <p className="text-destructive">{error}</p>
              <button
                className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md"
                onClick={() => setError(null)}
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {!isMapLoaded && !error && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
            <div className="animate-pulse">Loading map...</div>
          </div>
        )}

        <div className="h-full" aria-label="Company location map">
          <MapContainer
            center={getValidCoordinates()}
            zoom={DEFAULT_ZOOM}
            className="w-full h-full"
            style={mapContainerStyle}
            zoomControl={false}
            attributionControl={false}
            whenReady={handleMapLoad}
            aria-label={`Map showing location of ${companyInfo.name}`}
          >
            <ZoomControl position="bottomright" />
            <AttributionControl position="bottomleft" />
            <TileLayer
              attribution='&copy; <a href="https://carto.com/">CARTO</a>'
              url={theme === "dark" ? mapStyle.dark : mapStyle.light}
              eventHandlers={{
                error: handleMapError,
              }}
            />
            <Marker position={getValidCoordinates()} keyboard={true}>
              <Popup
                closeButton={false}
                className="accessible-popup"
                autoClose={false}
                closeOnEscapeKey={true}
              >
                <div className="p-6 -m-4 bg-background shadow-lg rounded-lg">
                  <div className="space-y-3">
                    <h3 className="font-medium text-xl text-primary">
                      {companyInfo.name}
                    </h3>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">
                        {companyInfo.address.street}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {companyInfo.address.city}, {companyInfo.address.zip}
                      </p>
                    </div>
                    <div className="pt-2">
                      <a
                        href={companyInfo.mapsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm text-primary hover:text-primary/80 transition-colors"
                        aria-label={`Get directions to ${companyInfo.name}`}
                      >
                        Get Directions →
                      </a>
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </section>

      {/* Render InfoCard outside of the map section but with the same positioning */}
      <InfoCard companyInfo={companyInfo} isLoading={isLoading} />
    </div>
  );
}
