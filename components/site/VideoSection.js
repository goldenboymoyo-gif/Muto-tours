"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const VIDEO_SRC = "/videos/vic-falls.mp4";
const POSTER = "/images/slide2.jpg";

export default function VideoSection() {
  const rootRef = useRef(null);
  const videoRef = useRef(null);

  // The video is a large file, so it's only fetched when the section actually
  // approaches the viewport. Before that the element renders with the poster
  // frame, keeping the first-load bandwidth down without changing the design.
  useEffect(() => {
    const root = rootRef.current;
    const video = videoRef.current;
    if (!root || !video || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          if (!video.getAttribute("src")) {
            video.setAttribute("src", VIDEO_SRC);
            video.load();
          }
          observer.disconnect();
        }
      },
      { rootMargin: "600px 0px" }
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

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
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster={POSTER}
          aria-label="Aerial footage of Victoria Falls"
        />
      </div>
    </section>
  );
}