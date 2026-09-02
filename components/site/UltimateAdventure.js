"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function UltimateAdventure() {
  const rootRef = useRef(null);
  const maskRef = useRef(null);
  const imgRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const mask = maskRef.current;
    const img = imgRef.current;
    if (!root || !mask || !img) return;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    mask.style.maskImage = "url(/paw.svg)";
    mask.style.webkitMaskImage = "url(/paw.svg)";
    mask.style.maskSize = "70%";
    mask.style.webkitMaskSize = "70%";
    mask.style.maskRepeat = "no-repeat";
    mask.style.webkitMaskRepeat = "no-repeat";
    mask.style.maskPosition = "center";
    mask.style.webkitMaskPosition = "center";

    let l = 0;
    const update = () => {
      const container = root;
      const containerHeight = container.offsetHeight;
      const windowHeight = window.innerHeight;
      const progress = (1 - (mask.getBoundingClientRect().bottom - windowHeight) / containerHeight);
      const g = Math.max(0, Math.min(1, progress));
      l += g * 0.5;
      const h = (isMobile ? 27 : 12) * l;
      const size = (isMobile ? 1 : 0.4) + h;
      mask.style.maskSize = `${size * 100}%`;
      mask.style.webkitMaskSize = `${size * 100}%`;
      requestAnimationFrame(update);
    };
    const raf = requestAnimationFrame(update);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: mask,
            start: "top bottom",
            end: "center center",
            scrub: true,
          },
        }
      );
      gsap.to(img, {
        filter: "brightness(0.5)",
        ease: "none",
        scrollTrigger: {
          trigger: mask,
          start: "top bottom",
          end: "center center",
          scrub: true,
        },
      });
    }, root);

    return () => {
      cancelAnimationFrame(raf);
      ctx.revert();
      const st = ScrollTrigger.getAll();
      st.forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={rootRef} className="ultimate-section ess-section">
      <div ref={maskRef} className="ultimate-sticky-mask">
        <img ref={imgRef} src="/images/slide2.jpg" alt="Southern African safari" />
        <div className="ultimate-overlay">
          <div ref={contentRef} className="ultimate-sticky-content">
            <p className="ultimate-kicker">Embark on the ultimate African safari adventure</p>
            <h2 className="ultimate-title">Ultimate Adventure</h2>
            <p className="ultimate-desc">
              From Victoria Falls and the Zambezi to the Okavango Delta, Namibia&apos;s dunes,
              and South Africa&apos;s bushveld — Muto Tours builds multi-country circuits that
              close on the falls themselves. Runs just as well in reverse.
            </p>
            <button
              type="button"
              className="ultimate-button"
              onClick={() =>
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
