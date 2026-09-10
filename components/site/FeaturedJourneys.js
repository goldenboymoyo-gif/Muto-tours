"use client";

import Link from "next/link";
import MediaFrame from "@/components/MediaFrame";
import { ArrowRight, Route } from "lucide-react";
import HomeSectionIntro from "@/components/site/HomeSectionIntro";
import Reveal from "@/components/site/Reveal";
import { useSiteContent } from "@/components/site/ContentProvider";

export default function FeaturedJourneys() {
  const { content } = useSiteContent();
  const journeys = content.journeys || [];

  if (!journeys.length) return null;

  return (
    <section className="bg-sand py-20 md:py-28">
      <div className="container-content">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <HomeSectionIntro
            kicker="Featured Journeys"
            title="Journeys worth taking"
            dek="Multi-day routes through the highlights of the region — or the starting point for one built entirely around you."
          />
          <Link
            href="/itineraries"
            className="shrink-0 inline-flex items-center gap-2 text-sm font-semibold text-ink/70 hover:text-safari transition-colors"
          >
            All itineraries
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {journeys.map((j, i) => (
            <Reveal key={j.slug} delay={i * 90}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-ivory border border-charcoal/10 hover:border-charcoal/20 transition-colors">
                <Link
                  href="/contact"
                  className="relative block overflow-hidden aspect-[16/10]"
                  aria-label={`Plan ${j.name}`}
                >
                  <MediaFrame
                    src={j.image || null}
                    alt={j.imageAlt || j.name}
                    label={j.name}
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent"
                    aria-hidden="true"
                  />
                </Link>
                <div className="flex flex-1 flex-col p-7">
                  <ul className="flex flex-wrap gap-2 mb-4">
                    {(j.countries || []).map((c) => (
                      <li
                        key={c}
                        className="rounded-full bg-safari/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-safari"
                      >
                        {c}
                      </li>
                    ))}
                  </ul>
                  <h3 className="font-display text-2xl text-charcoal leading-snug">
                    {j.name}
                  </h3>
                  <p className="mt-3 text-sm text-ink/65 leading-relaxed flex-1">
                    {j.blurb}
                  </p>
                  {(j.stops && j.stops.length > 0) && (
                    <p className="mt-5 text-xs uppercase tracking-widest2 text-ink/50 inline-flex items-center gap-2">
                      <Route className="h-3.5 w-3.5 text-bronze" aria-hidden="true" />
                      {j.stops.length} stops — {j.stops.slice(0, 3).join(" · ")}
                      {j.stops.length > 3 ? "…" : ""}
                    </p>
                  )}
                  <a
                    href="/contact"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-safari group-hover:gap-3 transition-all"
                  >
                    Plan this journey
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}