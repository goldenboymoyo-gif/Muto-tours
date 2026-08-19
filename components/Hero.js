"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";

const CLIPS = [
  { src: "/videos/vic-falls.mp4", type: "video/mp4" },
  { src: "/videos/elephant-wildlife.mp4", type: "video/mp4" },
  { src: "/videos/sunset-boat-cruise.mp4", type: "video/mp4" },
  { src: "/videos/safari-drive.mp4", type: "video/mp4" },
];

export default function Hero() {
  const videoARef = useRef(null);
  const videoBRef = useRef(null);
  const [entered, setEntered] = useState(false);
  const activeRef = useRef("A");
  const clipIndexRef = useRef(0);
  const [fadeA, setFadeA] = useState(true);
  const [fadeB, setFadeB] = useState(false);

  const getNextClip = useCallback(() => {
    clipIndexRef.current = (clipIndexRef.current + 1) % CLIPS.length;
    return clipIndexRef.current;
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 150);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const connection = navigator.connection || navigator.webkitConnection;
    const saveData = connection?.saveData || ["slow-2g", "2g"].includes(connection?.effectiveType);

    const playIfAllowed = (vid) => {
      if (vid && !prefersReducedMotion && !saveData) {
        vid.play().catch(() => {});
      }
    };

    if (videoARef.current) {
      videoARef.current.src = CLIPS[0].src;
      videoARef.current.load();
      playIfAllowed(videoARef.current);
    }

    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handleEndedA = () => {
      if (activeRef.current !== "A") return;
      const nextIdx = getNextClip();
      const nextClip = CLIPS[nextIdx];
      if (videoBRef.current) {
        videoBRef.current.src = nextClip.src;
        videoBRef.current.load();
        videoBRef.current.play().catch(() => {});
      }
      setFadeA(false);
      setFadeB(true);
      activeRef.current = "B";
    };

    const handleEndedB = () => {
      if (activeRef.current !== "B") return;
      const nextIdx = getNextClip();
      const nextClip = CLIPS[nextIdx];
      if (videoARef.current) {
        videoARef.current.src = nextClip.src;
        videoARef.current.load();
        videoARef.current.play().catch(() => {});
      }
      setFadeB(false);
      setFadeA(true);
      activeRef.current = "A";
    };

    const vA = videoARef.current;
    const vB = videoBRef.current;
    if (vA) vA.addEventListener("ended", handleEndedA);
    if (vB) vB.addEventListener("ended", handleEndedB);
    return () => {
      if (vA) vA.removeEventListener("ended", handleEndedA);
      if (vB) vB.removeEventListener("ended", handleEndedB);
    };
  }, [getNextClip]);

  return (
    <section className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-ink">
      <video
        ref={videoARef}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[2000ms] ${
          fadeA ? "opacity-100" : "opacity-0"
        }`}
        muted
        playsInline
        poster="/images/victoria-falls-mist.jpg"
        aria-hidden="true"
      />
      <video
        ref={videoBRef}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[2000ms] ${
          fadeB ? "opacity-100" : "opacity-0"
        }`}
        muted
        playsInline
        aria-hidden="true"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-transparent to-ink/70" />

      <div className="relative h-full flex items-end pb-24 md:pb-32 lg:pb-40">
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
