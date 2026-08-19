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
        <source src="/videos/safari-drive.mp4" type="video/mp4" />
        <source src="/videos/sunset-boat-cruise.mp4" type="video/mp4" />
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-transparent to-ink/70" />

      <div className="relative h-full flex items-center">
        <div className="container-editorial px-6 sm:px-10 lg:px-16">
          <div className="max-w-2xl">
            <h1
              className={`font-display text-ivory text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase leading-[1.15] text-balance transition-all duration-700 ${
                entered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              A Leading Tour Operator in Southern Africa
            </h1>
            <p
              className={`mt-4 text-gold text-xs sm:text-sm uppercase tracking-[0.25em] transition-all duration-700 delay-100 ${
                entered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Operating from the Heart of Africa
            </p>
            <p
              className={`mt-6 text-ivory/85 text-sm sm:text-base leading-relaxed max-w-lg transition-all duration-700 delay-200 ${
                entered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Welcome to Muto Tours, where we craft bespoke African travel experiences across Zimbabwe, Botswana, Namibia, and South Africa. With a commitment to excellence, we curate unforgettable journeys that immerse you in the wonders of Africa&apos;s wilderness and culture. Every moment is designed to exceed your expectations.
            </p>
            <div
              className={`mt-8 transition-all duration-700 delay-300 ${
                entered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-ivory text-xs uppercase tracking-widest2 border border-ivory/50 px-8 py-3 rounded-sm hover:bg-ivory hover:text-ink transition-all duration-300"
              >
                More About Us
                <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden="true">
                  <path d="M1 5H15M15 5L11 1M15 5L11 9" stroke="currentColor" strokeWidth="1.3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
