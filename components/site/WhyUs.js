"use client";

import { useEffect, useRef } from "react";
import { CalendarDays, PiggyBank, MapPinned, Users } from "lucide-react";
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

const FEATURES = [
  {
    Icon: CalendarDays,
    title: "Tailored Packages",
    body: "Multi-country routes built around your pace, budget, and interests rather than a fixed template.",
  },
  {
    Icon: PiggyBank,
    title: "Value For Money",
    body: "Transparent, individually quoted trips with no hidden add-ons — matched to any comfort level.",
  },
  {
    Icon: MapPinned,
    title: "Exclusive Access",
    body: "Guides who work these parks and rivers daily open doors that aren't in any brochure.",
  },
  {
    Icon: Users,
    title: "Experienced Team",
    body: "Victoria Falls-based operators who plan and run every step of the route in person.",
  },
];

export default function WhyUs() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: "top 75%" },
      });
      tl.fromTo(
        root.querySelectorAll(".whyus-item"),
        { yPercent: 100 },
        { yPercent: 0, duration: 0.6, stagger: 0.25, ease: "power4.out" }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="whyus-section ess-section">
      <h1 className="two-thin-headline">Why us</h1>
      <div className="two-big-headline">{splitChars("Reasons to travel with us")}</div>
      <div className="whyus-row">
        {FEATURES.map(({ Icon, title, body }) => (
          <div className="whyus-item" key={title}>
            <Icon />
            <h3>{title}</h3>
            <p>{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
