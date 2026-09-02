"use client";

import { Fragment, useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const STATS = [
  { number: "4", label: "Countries" },
  { number: "2k+", label: "Satisfied Clients" },
  { number: "10+", label: "Years of Experience" },
];

export default function Stats() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        root.querySelectorAll(".six-content-box"),
        { xPercent: -25, opacity: 0 },
        {
          xPercent: 0,
          opacity: 1,
          duration: 1,
          stagger: { amount: 0.75 },
          ease: "power4.out",
          scrollTrigger: { trigger: root, start: "top 75%" },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="stats-section ess-section">
      <div className="stats-row">
        {STATS.map((s, i) => (
          <Fragment key={s.label}>
            {i > 0 && <div className="six-mobile-divider" />}
            <div className="six-content-box">
              <h1 className="six-number">
                {s.number}
                <span className="six-bullet">.</span>
              </h1>
              <p className="six-label">{s.label}</p>
            </div>
          </Fragment>
        ))}
      </div>
    </section>
  );
}
