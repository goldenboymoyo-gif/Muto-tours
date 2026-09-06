"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useSiteContent } from "@/components/site/ContentProvider";

const FACTS = [
  {
    img: "/images/vicfalls.jpg",
    title: "Victoria Falls — the smoke that thunders",
    body: "One of the Seven Natural Wonders of the World — the world's largest sheet of falling water, straddling the border of Zimbabwe and Zambia.",
  },
  {
    img: "/images/hwange.jpg",
    title: "Etosha's wildlife",
    body: "The Namibian salt pan hosts some of Southern Africa's greatest concentrations of game, with floodlit waterholes for after-dark viewing.",
  },
];

export default function Facts() {
  const rootRef = useRef(null);
  const { content } = useSiteContent();
  const hp = content.media?.homepage || {};
  const facts = FACTS.map((f, i) => ({
    ...f,
    img: (i === 0 ? hp.facts1 : hp.facts2) || f.img,
  }));

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        root.querySelectorAll(".fact-card"),
        { yPercent: 25, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.25,
          ease: "power2.out",
          scrollTrigger: { trigger: root, start: "top 75%" },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="facts-section ess-section">
      <div className="facts-grid">
        {facts.map((f) => (
          <div className="fact-card" key={f.title}>
            <div className="fact-image" style={{ backgroundImage: `url(${f.img})` }} />
            <div className="nine-textbox">
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
