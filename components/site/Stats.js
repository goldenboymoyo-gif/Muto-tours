"use client";

import { Fragment, useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const STATS = [
  { value: 4, suffix: "", label: "Countries" },
  { value: 2, suffix: "k+", label: "Satisfied Clients" },
  { value: 10, suffix: "+", label: "Years of Experience" },
];

export default function Stats() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      const boxes = root.querySelectorAll(".six-content-box");
      gsap.fromTo(
        boxes,
        { xPercent: -25, opacity: 0 },
        {
          xPercent: 0,
          opacity: 1,
          duration: 1,
          stagger: { amount: 0.75 },
          ease: "power4.out",
          scrollTrigger: { trigger: root, start: "top 80%" },
        }
      );

      boxes.forEach((box, i) => {
        const stat = STATS[i];
        const numEl = box.querySelector(".six-number-num");
        const obj = { n: 0 };
        gsap.to(obj, {
          n: stat.value,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: { trigger: box, start: "top 85%" },
          onUpdate: () => {
            numEl.textContent = Math.round(obj.n);
          },
        });
      });
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
                <span className="six-number-num">0</span>
                {s.suffix}
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