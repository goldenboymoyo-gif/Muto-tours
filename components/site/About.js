"use client";

import { useEffect, useRef } from "react";
import { Drama, Leaf, Heart } from "lucide-react";
import { gsap } from "@/lib/gsap";

function ClipGridImage({ src, className, initial }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !initial) return;
    el.querySelectorAll(".mask").forEach((m) => {
      m.style.clipPath = "polygon(0 0, 0 0, 0 0, 0 0)";
    });

    const reveal = [
      [".m-1"],
      [".m-2", ".m-4"],
      [".m-3", ".m-5", ".m-7"],
      [".m-6", ".m-8"],
      [".m-9"],
    ];

    const tl = gsap.timeline({
      scrollTrigger: { trigger: el, start: "top bottom" },
      delay: 0.2,
    });

    reveal.forEach((group, gi) => {
      tl.addLabel(`g${gi}`, gi * 0.125);
      group.forEach((sel) => {
        tl.to(
          el.querySelector(sel),
          {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.1,
          },
          `g${gi}`
        );
      });
    });

    return () => {
      tl.kill();
    };
  }, [initial]);

  return (
    <div ref={ref} className={className}>
      {Array.from({ length: 9 }).map((_, i) => (
        <div
          key={i}
          className={`mask m-${i + 1}`}
          style={{
            backgroundImage: `url(${src})`,
            ...gridPos(i),
          }}
        />
      ))}
    </div>
  );
}

function gridPos(i) {
  // Each .mask represents one cell of a 3x3 grid; shifting background-position
  // shows only that portion of the full image inside the cell.
  const row = Math.floor(i / 3);
  const col = i % 3;
  const x = (col / 2) * 100;
  const y = (row / 2) * 100;
  return {
    backgroundSize: "300% 300%",
    backgroundPosition: `${x}% ${y}%`,
  };
}

function splitChars(text) {
  return text.split("").map((ch, i) =>
    ch === " " ? " " : (
      <span className="char" key={i}>
        {ch}
      </span>
    )
  );
}

const ITEMS = [
  {
    Icon: Drama,
    title: "Curated Itineraries",
    body: "Routes stitched across Zimbabwe, Botswana, Namibia, and South Africa — priced and paced for the travellers taking them.",
  },
  {
    Icon: Leaf,
    title: "Responsible Travel",
    body: "Guides, lodges, and operators chosen for how they treat the land and the communities around it, not just the guest experience.",
  },
  {
    Icon: Heart,
    title: "Local Expertise",
    body: "Built from the ground by people who work the roads, rivers, and parks daily — not assembled from a brochure.",
  },
];

export default function About({ brandName }) {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: "top 70%" },
      });
      tl.fromTo(
        root.querySelectorAll(".two-big-headline .char"),
        { yPercent: 50, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.25, stagger: 0.025, ease: "power4.out" }
      );
      tl.fromTo(
        root.querySelectorAll(".two-paragraph"),
        { yPercent: 25, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" },
        "-=0.1"
      );
      tl.fromTo(
        root.querySelectorAll(".two-content-item"),
        { yPercent: 25, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.5, stagger: 0.12, ease: "power2.out" },
        "-=0.4"
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={rootRef} className="about-section ess-section">
      <h1 className="two-thin-headline">Explore Southern Africa in style</h1>
      <div className="two-big-headline">
        {splitChars(brandName)}
      </div>
      <div className="two-grid">
        <div className="two-images">
          <ClipGridImage
            src="/images/safari-elephants-hq.jpg"
            className="two-image-box-big"
            initial
          />
          <ClipGridImage
            src="/images/okavango-mokoro-sunset.jpg"
            className="two-image-box-small"
            initial
          />
        </div>

        <div className="two-text-column">
          <p className="two-paragraph">
            Muto Tours is a Southern Africa travel operator based in Victoria Falls,
            Zimbabwe — close enough to the falls to hear them on a quiet morning. The
            business runs on expert-guided tours across Zimbabwe and its neighbours,
            built for comfort, discovery, and moments that are hard to plan for but
            easy to recognise once you&apos;re in them.
          </p>
          <p className="two-paragraph">
            Trips are tailored rather than templated: adventurers, honeymooners,
            families, and photographers each need a different pace, and the itinerary
            changes accordingly — from established lodges to budget-conscious tented
            camps, depending on what a trip calls for.
          </p>
        </div>

        <div className="two-content-items">
          {ITEMS.map(({ Icon, title, body }) => (
            <div className="two-content-item" key={title}>
              <Icon />
              <div>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
