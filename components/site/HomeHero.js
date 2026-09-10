"use client";

import { useEffect, useState } from "react";
import MediaFrame from "@/components/MediaFrame";
import Button from "@/components/Button";
import { useSiteContent } from "@/components/site/ContentProvider";

const CAPTIONS = ["Victoria Falls", "Okavango First Light", "Into the Namib"];

export default function HomeHero() {
  const { content } = useSiteContent();
  const slides = content.media?.heroSlides?.length
    ? content.media.heroSlides
    : [{ img: "/images/slide1.jpg" }, { img: "/images/slide2.jpg" }, { img: "/images/slide3.jpg" }];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, [slides.length]);

  return (
    <section className="relative h-[100svh] min-h-[600px] overflow-hidden bg-charcoal">
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-[1500ms] ease-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <MediaFrame
            src={slide.img}
            alt={CAPTIONS[i] || `Muto Tours — ${i + 1}`}
            priority={i === 0}
            sizes="100vw"
            className="absolute inset-0"
          />
          <div
            className={`absolute inset-0 bg-charcoal transition-opacity duration-1000 ${
              i === index ? "opacity-60" : "opacity-40"
            }`}
            style={{
              backgroundImage:
                "linear-gradient(to top, rgba(16,20,18,0.92) 0%, rgba(16,20,18,0.45) 45%, rgba(16,20,18,0.2) 100%)",
            }}
            aria-hidden="true"
          />
        </div>
      ))}

      <div className="relative z-10 container-content h-full flex flex-col justify-end pb-24 md:pb-28">
        <p className="eyebrow text-bronze mb-5 flex items-center gap-3">
          <span className="inline-block h-px w-10 bg-bronze" aria-hidden="true" />
          Born in Zimbabwe — built for Southern Africa
        </p>
        <h1 className="font-display text-white text-[13vw] leading-[0.98] sm:text-6xl md:text-7xl lg:text-[5.25rem] max-w-5xl text-balance">
          Explore Southern Africa
          <br />
          <em className="text-ivory/90">your way.</em>
        </h1>
        <p className="mt-6 max-w-xl text-white/80 text-base md:text-lg leading-relaxed font-ui">
          Tailor-made safaris, unforgettable experiences and locally guided
          journeys — from Victoria Falls to the wild heart of Southern Africa.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-4">
          <Button href="/contact" variant="primary">
            Plan My Journey
          </Button>
          <Button href="/destinations" variant="ghost">
            Explore Southern Africa
          </Button>
        </div>
      </div>

      {/* Side caption + scroll hint */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden lg:flex items-center gap-5 rotate-180"
        style={{ writingMode: "vertical-rl" }}
      >
        <span className="text-[11px] uppercase tracking-widest2 text-white/55">
          {CAPTIONS[index]}
        </span>
        <span className="h-px w-10 bg-bronze/70" aria-hidden="true" />
      </div>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/70"
        aria-hidden="true"
      >
        <span className="text-[10px] uppercase tracking-widest2">Scroll</span>
        <span className="h-10 w-px bg-white/40 overflow-hidden relative">
          <span className="absolute inset-x-0 top-0 h-3 bg-bronze animate-pulse" />
        </span>
      </div>
    </section>
  );
}