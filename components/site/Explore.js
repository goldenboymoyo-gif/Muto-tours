"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { experiences } from "@/data/experiences";
import "flickity/dist/flickity.min.css";

function splitChars(text) {
  return text.split("").map((ch, i) =>
    ch === " " ? " " : (
      <span className="char" key={i}>
        {ch}
      </span>
    )
  );
}

const CARDS = experiences.map((e) => ({
  slug: e.slug,
  name: e.name,
  desc: e.blurb,
  img: e.image,
  destination: e.location.split(",")[0].trim(),
}));

export default function Explore() {
  const rootRef = useRef(null);
  const viewportRef = useRef(null);
  const flktyRef = useRef(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    let destroyed = false;
    import("flickity").then(({ default: Flickity }) => {
      if (destroyed || !viewportRef.current) return;
      const flkty = new Flickity(viewportRef.current, {
        freeScroll: true,
        draggable: true,
        wrapAround: false,
        contain: true,
        prevNextButtons: false,
        pageDots: false,
        cellAlign: "left",
      });
      flktyRef.current = flkty;
    });

    return () => {
      destroyed = true;
      flktyRef.current?.destroy();
      flktyRef.current = null;
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        root.querySelectorAll(".explore-heading .char"),
        { yPercent: 50, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.3,
          stagger: 0.025,
          ease: "power4.out",
          scrollTrigger: { trigger: root, start: "top 75%" },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  const move = (dir) => {
    flktyRef.current?.shift(dir === "next" ? 1 : -1);
  };

  return (
    <section id="explore" ref={rootRef} className="explore-section ess-section">
      <div className="explore-heading">{splitChars("Get Inspired")}</div>
      <p className="explore-dek">
        Browse some of our most well-known excursions across Southern Africa —
        each one can stand alone or become part of a longer tailor-made route.
      </p>

      <div className="explore-carousel">
        <button
          type="button"
          className="explore-arrow prev"
          onClick={() => move("prev")}
          aria-label="Previous"
        >
          &#8249;
        </button>
        <div className="explore-viewport" ref={viewportRef}>
          {CARDS.map((c) => (
            <Link href={`/experiences/${c.slug}`} className="three-slider-item" key={c.slug}>
              <div className="three-slider-item-wrapper">
                <img
                  className="three-slider-item-img"
                  src={c.img}
                  alt={c.name}
                  loading="lazy"
                />
                <div className="three-slider-item-content">
                  <h3 className="three-small-headline">{c.name}</h3>
                  <p className="three-desc">{c.desc}</p>
                  <div className="three-item-bottom">
                    <span className="three-slider-item-button">Learn More</span>
                    <span className="three-destination-tag">{c.destination}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <button
          type="button"
          className="explore-arrow next"
          onClick={() => move("next")}
          aria-label="Next"
        >
          &#8250;
        </button>
      </div>
    </section>
  );
}
