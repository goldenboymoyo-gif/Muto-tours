"use client";

import { Fragment, useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { normalizeStats } from "@/lib/content";
import { useSiteContent } from "@/components/site/ContentProvider";

export default function Stats() {
  const rootRef = useRef(null);
  const enteredRef = useRef(false);
  const { content } = useSiteContent();

  const STATS = normalizeStats(content.stats).map((row) => ({
    label: row.label || "",
    value: Number(row.value) || 0,
  }));
  const statsKey = `${STATS.length}:${STATS.map((s) => s.value).join(",")}`;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      const boxes = root.querySelectorAll(".six-content-box");

      // Slide-in entrance — run once, not on every stats change.
      if (!enteredRef.current) {
        enteredRef.current = true;
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
      }

      // Count-up to whatever the CMS currently says, restarting each time the
      // stored values change so saved numbers always end up on screen.
      boxes.forEach((box, i) => {
        const stat = STATS[i];
        const numEl = box.querySelector(".six-number-num");
        if (!stat || !numEl) return;
        numEl.textContent = "0";
        const final = stat.value;
        const obj = { n: 0 };
        gsap.to(obj, {
          n: final,
          duration: 2,
          ease: "power2.out",
          overwrite: "auto",
          scrollTrigger: { trigger: root, start: "top 80%", once: true },
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
  }, [statsKey]);

  return (
    <section className="stats-section ess-section">
      <div className="stats-row">
        {STATS.map((s, i) => (
          <Fragment key={`${i}-${s.label}-${s.value}`}>
            {i > 0 && <div className="six-mobile-divider" />}
            <div className="six-content-box">
              <h1 className="six-number">
                <span className="six-number-num">{s.value}</span>
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