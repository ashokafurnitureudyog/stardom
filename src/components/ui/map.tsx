import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import { useTheme } from "next-themes";
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import { CompanyInfo } from '@/types/ComponentTypes';
import { InfoCard } from '../marketing/InfoCard';

// Override default Leaflet popup styles
import './Map.css';

const DefaultIcon = L.icon({
    iconUrl: icon.src,
    shadowUrl: iconShadow.src
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapSectionProps {
  companyInfo: CompanyInfo;
}

const mapStyle = {
  light: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  dark: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}.png'
};

export default function Map({ companyInfo }: MapSectionProps) {
  const { theme } = useTheme();
  
  const mapContainerStyle = {
    filter: theme === 'dark' ? 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)' : 'none'
  };

  return (
    <section className="relative h-[70vh] border-b border-border">
      <MapContainer
        center={companyInfo.address.coordinates}
        zoom={13}
        className="w-full h-full"
        style={mapContainerStyle}
        zoomControl={false}
      >
        <ZoomControl position="bottomright" />
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url={theme === 'dark' ? mapStyle.dark : mapStyle.light}
        />
        <Marker position={companyInfo.address.coordinates}>
          <Popup closeButton={false}>
            <div className="p-6 -m-4 bg-background shadow-lg rounded-lg">
              <div className="space-y-3">
                <h3 className="font-medium text-xl text-primary">{companyInfo.name}</h3>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">{companyInfo.address.street}</p>
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
                  >
                    Get Directions →
                  </a>
                </div>
              </div>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
      <InfoCard companyInfo={companyInfo} />
    </section>
  );
}