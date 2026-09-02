"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function VideoSection() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        root.querySelector(".seven-video-content"),
        { width: "90vw", borderRadius: 25 },
        {
          width: "100vw",
          borderRadius: 0,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top center",
            end: "bottom bottom",
            scrub: true,
          },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="video-section ess-section">
      <div className="seven-video-content">
        <video src="/videos/hero.mp4" autoPlay muted loop playsInline preload="auto" />
      </div>
    </section>
  );
}
