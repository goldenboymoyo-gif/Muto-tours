"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

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
    <section className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-ink">
      {/* Hero video — sourced from Bush Tracks Africa, loaded from Wix CDN.
          Replace with self-hosted Muto Tours footage when available. */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        muted
        loop
        playsInline
        autoPlay
        poster="/images/safari-jeep-road.jpg"
        aria-hidden="true"
      >
        <source
          src="https://static.wixstatic.com/video/6beb6f_bf4507874c7b4023bb6d8da380439d47/720p/mp4/file.mp4"
          type="video/mp4"
        />
        <source src="/videos/sunset-boat-cruise.mp4" type="video/mp4" />
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-ink/40" />

      {/* Gradient overlays matching Bush Tracks style */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-transparent to-ink/70" />

      <div className="relative h-full flex flex-col justify-center">
        <div className="container-editorial text-center px-6">
          <p
            className={`text-gold text-xs sm:text-sm uppercase tracking-[0.3em] mb-6 transition-all duration-700 ${
              entered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Zimbabwe &middot; Botswana &middot; Namibia &middot; South Africa
          </p>
          <h1
            className={`font-display italic text-ivory text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] max-w-4xl mx-auto text-balance transition-all duration-700 delay-100 ${
              entered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            A Leading Tour Operator in Southern Africa
          </h1>
          <p
            className={`mt-4 text-ivory/80 text-sm sm:text-base uppercase tracking-[0.2em] transition-all duration-700 delay-200 ${
              entered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Operating from the Heart of Africa
          </p>
          <div
            className={`mt-10 transition-all duration-700 delay-300 ${
              entered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-ivory text-sm uppercase tracking-widest2 border border-ivory/50 px-8 py-3 rounded-sm hover:bg-ivory hover:text-ink transition-all duration-300"
            >
              More About Us
              <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden="true">
                <path d="M1 5H15M15 5L11 1M15 5L11 9" stroke="currentColor" strokeWidth="1.3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
