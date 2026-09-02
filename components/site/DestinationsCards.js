"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
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

const PLACES = [
  { slug: "/destinations/victoria-falls", title: "Victoria Falls", img: "/images/zambezi-sunset-cruise.jpg" },
  { slug: "/destinations/okavango-delta", title: "Okavango Delta", img: "/images/okavango-mokoro-sunset.jpg" },
  { slug: "/destinations/namibia", title: "Namibia", img: "/images/deadvlei-dunes.jpg" },
];

export default function DestinationsCards() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: "top 75%" },
      });
      tl.fromTo(
        root.querySelectorAll(".twelve-content-bottom-item"),
        { yPercent: 50, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.5, stagger: 0.25, ease: "power2.out" }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="accommodation-section ess-section">
      <h1 className="two-thin-headline">Discover some of our favourite places</h1>
      <div className="two-big-headline">{splitChars("Signature Destinations")}</div>
      <div className="accommodation-cards">
        {PLACES.map((p) => (
          <Link href={p.slug} className="twelve-content-bottom-item" key={p.title}>
            <div className="twelve-image-blur" style={{ backgroundImage: `url(${p.img})` }} />
            <div className="twelve-title">{p.title}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
