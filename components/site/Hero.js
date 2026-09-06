"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useSiteContent } from "@/components/site/ContentProvider";

const SLIDES = [
  { img: "/images/slide1.jpg", mob: "/images/slide1.jpg" },
  { img: "/images/slide2.jpg", mob: "/images/slide2.jpg" },
  { img: "/images/slide3.jpg", mob: "/images/slide3.jpg" },
];

function splitChars(text) {
  return text.split("").map((ch, i) =>
    ch === " " ? " " : (
      <span className="char" key={i}>
        {ch}
      </span>
    )
  );
}

export default function Hero({ ready }) {
  const rootRef = useRef(null);
  const slideIndex = useRef(0);
  const intervalRef = useRef(null);

  const { content } = useSiteContent();
  const rawSlides = content.media?.heroSlides;
  const slides = SLIDES.map((def, i) => {
    const s = rawSlides && rawSlides[i];
    return { img: (s && s.img) || def.img, mob: (s && s.mob) || def.mob };
  });

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const items = root.querySelectorAll(".slider-item");
      const progressBars = root.querySelectorAll(".progress");
      const headline = root.querySelector(".one-cover-headline .char");

      if (ready) {
        gsap.fromTo(
          headline,
          { yPercent: 200, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.5, ease: "power3.inOut", stagger: 0.05 }
        );
        gsap.fromTo(
          root.querySelector(".one-image-container"),
          { scale: 1.2 },
          { scale: 1, duration: 1.5, ease: "power3.inOut" }
        );
      }

      // Parallax on scroll
      gsap.to(root.querySelector(".one-contents"), {
        scale: 1.2,
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, [ready]);

  // Carousel auto-advance with progress bars
  useEffect(() => {
    if (!rootRef.current) return;
    const items = rootRef.current.querySelectorAll(".slider-item");
    const progressBars = rootRef.current.querySelectorAll(".progress");

    const show = (idx) => {
      items.forEach((el, i) => el.classList.toggle("active", i === idx));
    };

    const step = () => {
      gsap.killTweensOf(progressBars);
      gsap.set(progressBars, { width: "0%" });
      const activeBar = progressBars[slideIndex.current];
      gsap.to(activeBar, {
        width: "100%",
        duration: 4,
        ease: "none",
        onComplete: () => {
          slideIndex.current = (slideIndex.current + 1) % items.length;
          show(slideIndex.current);
          step();
        },
      });
    };

    show(0);
    const t = setTimeout(step, 0);

    return () => {
      clearTimeout(t);
      gsap.killTweensOf(progressBars);
    };
  }, []);

  return (
    <section ref={rootRef} className="hero-section ess-section">
      <div className="one-contents">
        <div className="one-image-container">
          <div className="slider">
            {slides.map((s, i) => (
              <div
                key={i}
                className={`slider-item ${i === 0 ? "active" : ""}`}
                style={{
                  backgroundImage: `url(${s.img})`,
                }}
              />
            ))}
          </div>
          <h1 className="one-cover-headline">
            {splitChars("MUTO")}
          </h1>
          <div className="progress-wrapper">
            {slides.map((_, i) => (
              <div className="carousel-progress" key={i}>
                <div className="progress" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
