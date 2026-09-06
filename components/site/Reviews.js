"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { reviews as defaultReviews } from "@/data/reviews";
import { useSiteContent } from "@/components/site/ContentProvider";

function splitChars(text) {
  return text.split("").map((ch, i) =>
    ch === " " ? " " : (
      <span className="char" key={i}>
        {ch}
      </span>
    )
  );
}

const DEFAULT_BARS = [85, 12.5, 2.5, 0, 0];

export default function Reviews() {
  const rootRef = useRef(null);
  const { content } = useSiteContent();
  const saved = content.reviews || {};
  const rating = (saved.rating && String(saved.rating).trim()) || defaultReviews.rating;
  const bars = DEFAULT_BARS.map((d, i) => Number(saved.bars?.[i] ?? d));
  const testimonials = saved.testimonials && saved.testimonials.length ? saved.testimonials : defaultReviews.testimonials;

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
            <div className="four-number-text">{rating}</div>
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
          {bars.map((pct, i) => (
            <div className="four-bar-row" key={`${5 - i}`}>
              <span className="four-bar-label">{5 - i}</span>
              <div className="four-content-slider">
                <div
                  className="four-content-slider-filled"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="four-review-list">
          {testimonials.map((t) => (
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
