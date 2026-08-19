"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// GPS coordinates for all route stops across Southern Africa
const COORDS = {
  "Windhoek, Namibia": [-22.5609, 17.0658],
  "Windhoek — arrival": [-22.5609, 17.0658],
  "Sossusvlei — dunes and Deadvlei": [-24.7267, 15.2939],
  "Sossusvlei & Deadvlei": [-24.7267, 15.2939],
  "Swakopmund — coastal town": [-22.6792, 14.5266],
  "Swakopmund": [-22.6792, 14.5266],
  "Damaraland — rock art, desert wildlife": [-20.2283, 14.3700],
  "Damaraland": [-20.2283, 14.3700],
  "Etosha National Park — floodlit waterholes": [-18.8500, 14.8500],
  "Etosha National Park": [-18.8500, 14.8500],
  "Okavango Delta / Chobe, Botswana — mokoro and river game drives": [-19.8256, 22.3667],
  "Okavango Delta / Chobe": [-19.8256, 22.3667],
  "Okavango Delta": [-19.5000, 22.9667],
  "Victoria Falls, Zimbabwe — the falls, sunset cruise, departure": [-17.9243, 25.8572],
  "Victoria Falls, Zimbabwe": [-17.9243, 25.8572],
  "Hwange National Park": [-18.6283, 26.7383],
  "Chobe National Park, Botswana": [-18.1667, 25.1333],
  "Kasane": [-17.8167, 25.1500],
  "Kasane / Chobe": [-17.8167, 25.1500],
  "Maun": [-19.9833, 23.4167],
  "Johannesburg — arrival": [-26.2041, 28.0473],
  "Johannesburg": [-26.2041, 28.0473],
  "Kruger National Park": [-24.0128, 31.4860],
  "OR depart to Victoria Falls / Windhoek": [-26.2041, 28.0473],
  "Bulawayo": [-20.1325, 28.5803],
  "Matobo Hills National Park": [-20.5500, 28.4833],
  "Return to Bulawayo or continue to Victoria Falls": [-20.1325, 28.5803],
  "Kazungula": [-17.7925, 25.2633],
};

function getCoords(stop) {
  if (COORDS[stop]) return COORDS[stop];
  // Try partial match
  const key = Object.keys(COORDS).find(
    (k) => stop.includes(k.split(",")[0].split("—")[0].trim()) || k.includes(stop.split(",")[0].split("—")[0].trim())
  );
  return key ? COORDS[key] : null;
}

export default function RouteMap({ stops = [], className = "" }) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;
    if (!stops.length) return;

    const coords = stops
      .map((stop) => ({ stop, ll: getCoords(stop) }))
      .filter((s) => s.ll);

    if (coords.length < 2) return;

    const map = L.map(mapRef.current, {
      scrollWheelZoom: false,
      attributionControl: false,
      zoomControl: true,
    });

    // Warm-toned tile layer matching the site palette
    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      maxZoom: 19,
    }).addTo(map);

    const latlngs = coords.map((c) => c.ll);

    // Draw route line
    L.polyline(latlngs, {
      color: "#B5502B",
      weight: 3,
      opacity: 0.8,
      dashArray: "8, 6",
    }).addTo(map);

    // Add markers with numbered labels
    coords.forEach((c, i) => {
      const icon = L.divIcon({
        className: "route-map-marker",
        html: `<div style="
          width:28px;height:28px;border-radius:50%;
          background:#B5502B;color:#FBF8F2;
          display:flex;align-items:center;justify-content:center;
          font-size:12px;font-weight:600;font-family:Inter,sans-serif;
          box-shadow:0 2px 8px rgba(0,0,0,0.25);
          border:2px solid #FBF8F2;
        ">${i + 1}</div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });

      L.marker(c.ll, { icon })
        .addTo(map)
        .bindPopup(
          `<div style="font-family:Inter,sans-serif;font-size:13px;font-weight:500;color:#211D18;white-space:nowrap;">
            <span style="color:#B5502B;font-weight:700;">${i + 1}.</span> ${c.stop}
          </div>`,
          { closeButton: false, offset: [0, -8] }
        );
    });

    // Fit map to show all markers with padding
    const bounds = L.latLngBounds(latlngs);
    map.fitBounds(bounds, { padding: [40, 40] });

    mapInstance.current = map;

    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, [stops]);

  if (stops.length < 2) return null;

  return (
    <div className={`mt-8 rounded-xl overflow-hidden border border-ink/10 ${className}`}>
      <div ref={mapRef} className="w-full h-[320px] md:h-[400px]" />
    </div>
  );
}
