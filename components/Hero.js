"use client";

import { useEffect, useRef, useState } from "react";
import { brand } from "@/data/brand";
import Button from "./Button";

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
        poster="/images/zambezi-sunset-cruise.jpg"
        aria-hidden="true"
      >
        <source src="/videos/hero.webm" type="video/webm" />
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(14,33,30,0.55) 0%, rgba(14,33,30,0.15) 35%, rgba(14,33,30,0.35) 70%, rgba(14,33,30,0.85) 100%)",
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
            className={`mt-6 text-ivory/85 text-base sm:text-lg max-w-xl leading-relaxed transition-all duration-700 delay-200 ${
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
            <Button href="/destinations" variant="primary">See Destinations</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
