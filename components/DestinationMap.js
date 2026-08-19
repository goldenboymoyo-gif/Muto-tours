"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const DESTINATIONS = [
  { name: "Zimbabwe", slug: "victoria-falls", lat: -17.9243, lng: 25.8572 },
  { name: "Botswana", slug: "okavango-delta", lat: -22.3285, lng: 24.6849 },
  { name: "Namibia", slug: "namibia", lat: -22.5609, lng: 17.0658 },
  { name: "Zambia", slug: "victoria-falls", lat: -13.1339, lng: 27.8493 },
  { name: "South Africa", slug: "south-africa", lat: -30.5595, lng: 22.9375 },
];

export default function DestinationMap({ className = "" }) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const map = L.map(mapRef.current, {
      scrollWheelZoom: false,
      attributionControl: false,
      zoomControl: false,
      dragging: false,
    });

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      maxZoom: 19,
    }).addTo(map);

    DESTINATIONS.forEach((dest) => {
      const icon = L.divIcon({
        className: "destination-map-marker",
        html: `<a href="/destinations/${dest.slug}" style="text-decoration:none;display:block;position:relative;">
          <div style="
            width:14px;height:14px;border-radius:50%;
            background:#B5502B;
            border:2.5px solid #FBF8F2;
            box-shadow:0 2px 8px rgba(0,0,0,0.3);
            cursor:pointer;
            transition:transform 0.2s;
          " onmouseover="this.style.transform='scale(1.5)'" onmouseout="this.style.transform='scale(1)'"></div>
          <span style="
            position:absolute;left:20px;top:50%;transform:translateY(-50%);
            background:#211D18;color:#FBF8F2;
            font-size:10px;font-weight:600;font-family:Inter,sans-serif;
            text-transform:uppercase;letter-spacing:0.08em;
            padding:3px 8px;border-radius:3px;white-space:nowrap;
            pointer-events:none;opacity:0.9;
          ">${dest.name}</span>
        </a>`,
        iconSize: [0, 0],
        iconAnchor: [0, 0],
      });

      L.marker([dest.lat, dest.lng], { icon }).addTo(map);
    });

    const bounds = L.latLngBounds(DESTINATIONS.map((d) => [d.lat, d.lng]));
    map.fitBounds(bounds, { padding: [50, 50] });

    mapInstance.current = map;

    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, []);

  return (
    <div className={`relative rounded-lg overflow-hidden border border-ink/10 ${className}`}>
      <div ref={mapRef} className="w-full h-[380px] md:h-[440px]" />
    </div>
  );
}
