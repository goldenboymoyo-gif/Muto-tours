"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function LoadingScreen({ onDone }) {
  const rootRef = useRef(null);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const bars = root.querySelectorAll(".loading-screen-overlay-bar");
      const lineInside = root.querySelector(".loading-line-inside");
      const linebox = root.querySelector(".loading-linebox");

      const tl = gsap.timeline({
        onComplete: () => {
          doneRef.current?.();
          gsap.set(root, { display: "none" });
        },
      });

      tl.fromTo(lineInside, { xPercent: -100 }, { xPercent: 0, duration: 2.5, ease: "power1.out" })
        .to(linebox, { opacity: 0, duration: 0.5, delay: 0.4 }, "-=0.2")
        .to(
          bars,
          { height: 0, duration: 1.5, stagger: { amount: 0.75 }, ease: "power4.inOut" },
          "-=0.2"
        )
        .set(root, { pointerEvents: "none" }, "-=0.5");
    }, root);

    return () => ctx.revert();
  }, []);

  const renderBrand = () => {
    const name = "MUTO TOURS";
    return name
      .split("")
      .map((ch, i) => (ch === " " ? "\u00A0" : ch))
      .join("");
  };

  return (
    <div ref={rootRef} className="loading-screen" aria-hidden="true">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="loading-screen-overlay-bar" />
      ))}
      <div className="loading-linebox">
        <h1>{renderBrand()}</h1>
        <div className="loading-line">
          <div className="loading-line-inside" />
        </div>
      </div>
    </div>
  );
}
