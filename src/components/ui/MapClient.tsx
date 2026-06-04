"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const pin = L.divIcon({
  className: "",
  html: `<div style="width:26px;height:26px;border-radius:50% 50% 50% 0;background:#e3b466;transform:rotate(-45deg);box-shadow:0 6px 16px rgba(0,0,0,0.4);border:2px solid #14100a"></div>`,
  iconSize: [26, 26],
  iconAnchor: [13, 26],
  popupAnchor: [0, -24],
});

export default function MapClient({
  lat,
  lng,
  label,
}: {
  lat: number;
  lng: number;
  label: string;
}) {
  return (
    <MapContainer
      center={[lat, lng]}
      zoom={15}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%", background: "#efe8da" }}
      attributionControl={false}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        // CARTO light tiles for the bright editorial theme.
      />
      <Marker position={[lat, lng]} icon={pin}>
        <Popup>{label}</Popup>
      </Marker>
    </MapContainer>
  );
}
