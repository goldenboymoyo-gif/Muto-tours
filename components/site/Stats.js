"use client";

import { Fragment, useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { stats as defaultStats } from "@/data/stats";
import { useSiteContent } from "@/components/site/ContentProvider";

export default function Stats() {
  const rootRef = useRef(null);
  const { content } = useSiteContent();
  const saved = content.stats || {};
  const STATS = [
    { value: Number(saved.countries ?? defaultStats.countries) || 0, suffix: "", label: "Countries" },
    { value: Number(saved.tourPackages ?? defaultStats.tourPackages) || 0, suffix: "", label: "Tour Packages" },
  ];

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
          scrollTrigger: { trigger: root, start: "top 80%", once: true },
        }
      );

      boxes.forEach((box, i) => {
        const stat = STATS[i];
        const numEl = box.querySelector(".six-number-num");
        if (!numEl) return;
        const final = stat.value;
        const obj = { n: 0 };
        gsap.to(obj, {
          n: final,
          duration: 2,
          ease: "power2.out",
          overwrite: "auto",
          scrollTrigger: {
            trigger: root,
            start: "top 80%",
            once: true,
            onEnter: () => {},
            onEnterBack: () => {},
          },
          onUpdate: () => {
            numEl.textContent = Math.round(obj.n);
          },
          onComplete: () => {
            numEl.textContent = final;
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