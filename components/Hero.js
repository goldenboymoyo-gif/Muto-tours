"use client";

import { useEffect, useRef, useState } from "react";
import { brand } from "@/data/brand";
import Button from "./Button";

const stats = [
  { value: "4", label: "Countries" },
  { value: "7+", label: "Destinations" },
  { value: "12+", label: "Experiences" },
  { value: "100%", label: "Tailor-made" },
];

export default function Hero() {
  const videoRef = useRef(null);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 150);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const connection = navigator.connection || navigator.webkitConnection;
    const saveData = connection?.saveData || ["slow-2g", "2g"].includes(connection?.effectiveType);

    if (videoRef.current && !prefersReducedMotion && !saveData) {
      videoRef.current.play().catch(() => {});
    }

    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-sand-deep">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover animate-kenburns"
        muted
        loop
        playsInline
        preload="auto"
        poster="/images/safari-jeep-road.jpg"
        aria-hidden="true"
      >
        <source src="/videos/sunset-boat-cruise.mp4" type="video/mp4" />
        <source src="/videos/hero.mp4" type="video/mp4" />
        <source src="/videos/hero.webm" type="video/webm" />
      </video>

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(14,33,30,0.65) 0%, rgba(14,33,30,0.25) 30%, rgba(14,33,30,0.35) 65%, rgba(14,33,30,0.9) 100%)",
        }}
      />

      <div className="relative h-full flex flex-col justify-end">
        <div className="container-editorial pb-24 md:pb-28">
          <p
            className={`text-gold text-xs sm:text-sm uppercase tracking-widest2 mb-5 transition-all duration-700 ${
              entered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            Zimbabwe &middot; Botswana &middot; Namibia &middot; South Africa
          </p>
          <h1
            className={`font-display italic text-ivory text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] max-w-3xl text-balance transition-all duration-700 delay-100 ${
              entered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {brand.tagline}
          </h1>
          <p
            className={`mt-6 text-ivory/90 text-base sm:text-lg max-w-xl leading-relaxed transition-all duration-700 delay-200 ${
              entered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {brand.shortStatement}
          </p>
          <div
            className={`mt-9 flex flex-wrap items-center gap-5 transition-all duration-700 delay-300 ${
              entered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Button href="/experiences" variant="primary">Explore Experiences</Button>
            <Button href="/contact" variant="primary">Plan Your Trip</Button>
          </div>
        </div>

        {/* Stats bar */}
        <div
          className={`border-t border-ivory/15 transition-all duration-700 delay-500 ${
            entered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="container-editorial py-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center sm:text-left">
                  <p className="font-display italic text-2xl sm:text-3xl text-gold">{stat.value}</p>
                  <p className="text-xs uppercase tracking-widest2 text-ivory/60 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
