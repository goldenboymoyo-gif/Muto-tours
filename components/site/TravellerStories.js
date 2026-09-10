"use client";

import { Star } from "lucide-react";
import HomeSectionIntro from "@/components/site/HomeSectionIntro";
import Reveal from "@/components/site/Reveal";
import { useSiteContent } from "@/components/site/ContentProvider";

export default function TravellerStories() {
  const { content } = useSiteContent();
  const reviews = content.reviews || { rating: "5.0", testimonials: [] };
  const testimonials = reviews.testimonials || [];

  if (!testimonials.length) return null;

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container-content">
        <HomeSectionIntro
          align="center"
          kicker="Traveller Stories"
          title="What our travellers say"
          dek="Shared by guests who have travelled with Muto Tours across Southern Africa."
        />

        <div className="grid gap-5 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <Reveal key={i} delay={i * 80}>
              <figure className="flex h-full flex-col rounded-2xl border border-charcoal/10 bg-sand p-8">
                <div className="flex items-center gap-1 text-bronze" aria-label="5 star review">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="h-4 w-4 fill-current" aria-hidden="true" />
                  ))}
                </div>
                <blockquote className="mt-5 flex-1 text-base leading-relaxed text-ink/80">
                  &ldquo;{t.text}&rdquo;
                </blockquote>
                <figcaption className="mt-7 flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-safari text-sm font-bold text-ivory">
                    {t.initials}
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-charcoal">{t.name}</span>
                    {t.location && (
                      <span className="block text-xs text-ink/55">{t.location}</span>
                    )}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}