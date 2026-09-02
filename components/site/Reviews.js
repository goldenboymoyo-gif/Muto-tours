"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

function splitChars(text) {
  return text.split("").map((ch, i) =>
    ch === " " ? " " : (
      <span className="char" key={i}>
        {ch}
      </span>
    )
  );
}

const TESTIMONIALS = [
  {
    name: "Sarah M.",
    location: "United Kingdom",
    initials: "SM",
    text: "Muto Tours handled all my tours for my stay in Victoria Falls. Not only were they very communicative prior to our arrival, but they were great to deal with on-site — both their representative as well as their guides and drivers for every activity we planned.",
  },
  {
    name: "James K.",
    location: "Australia",
    initials: "JK",
    text: "Thank you Muto Tours for a fabulous day trip to Chobe. From the start right to the end we were looked after. Everything ran smoothly, the pick-up, the border crossing, the ferry into Botswana. Our guide was a good driver. The afternoon cruise along the Chobe River was superb!",
  },
  {
    name: "Maria L.",
    location: "Germany",
    initials: "ML",
    text: "Muto Tours went above and beyond our expectations. They were always on time to pick us up, staff were friendly, their tours and airport transfers well organised. The transport was always clean and the drivers friendly.",
  },
  {
    name: "David W.",
    location: "United States",
    initials: "DW",
    text: "We used Muto Tours for a walking tour of the falls and a sunset cruise. Our guide was absolutely amazing, very friendly and so knowledgeable. The sunset cruise was beautiful and one of the highlights of our entire trip here in Africa.",
  },
];

const BARS = [
  { label: "5", pct: 85 },
  { label: "4", pct: 12.5 },
  { label: "3", pct: 2.5 },
  { label: "2", pct: 0 },
  { label: "1", pct: 0 },
];

export default function Reviews() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: "top 75%" },
      });
      tl.fromTo(
        root.querySelectorAll(".four-title .char"),
        { yPercent: 50, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.3, stagger: 0.03, ease: "power4.out" }
      );
      tl.fromTo(
        root.querySelectorAll(".four-content-slider-filled"),
        { xPercent: -110 },
        { xPercent: 0, duration: 1, ease: "power4.out" },
        "-=0.1"
      );
      tl.fromTo(
        root.querySelectorAll(".four-review-row"),
        { yPercent: 25, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" },
        "-=0.4"
      );

    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="reviews" ref={rootRef} className="reviews-section ess-section">
      <div className="reviews-container">
        <div className="four-title">{splitChars("Reviews")}</div>
        <div className="four-divider" />

        <div className="four-top">
          <div>
            <div className="four-number-text">5.0</div>
          </div>
          <div className="four-vertical-divider" />
          <div>
            <div className="four-rating-info">
              <div className="four-stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>&#9733;</span>
                ))}
              </div>
              <p className="four-rating-label">Rated by our guests</p>
            </div>
          </div>
        </div>

        <div className="four-bars">
          {BARS.map((b) => (
            <div className="four-bar-row" key={b.label}>
              <span className="four-bar-label">{b.label}</span>
              <div className="four-content-slider">
                <div
                  className="four-content-slider-filled"
                  style={{ width: `${b.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="four-review-list">
          {TESTIMONIALS.map((t) => (
            <div className="four-review-row" key={t.name}>
              <div
                className="four-review-profile"
                style={{ backgroundColor: "#4b3621", color: "#ece5d5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1vw", fontWeight: 600 }}
              >
                {t.initials}
              </div>
              <div>
                <p className="four-review-name">
                  {t.name} &middot; {t.location}
                </p>
                <div className="four-review-stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i}>&#9733;</span>
                  ))}
                </div>
                <p className="four-review-quote">&ldquo;{t.text}&rdquo;</p>
              </div>
            </div>
          ))}
        </div>

        <div className="four-bottom">
          <button
            type="button"
            className="four-bottom-button"
            onClick={() =>
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Plan your safari
          </button>
        </div>
      </div>
    </section>
  );
}
