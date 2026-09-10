"use client";

import Link from "next/link";
import MediaFrame from "@/components/MediaFrame";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/site/Reveal";
import { useSiteContent } from "@/components/site/ContentProvider";

export default function BeyondZimbabwe() {
  const { content } = useSiteContent();
  const beyond = (content.destinations || []).filter(
    (d) => d.country && d.country.toLowerCase() !== "zimbabwe"
  );

  if (!beyond.length) return null;

  return (
    <section className="bg-charcoal text-ivory py-20 md:py-28">
      <div className="container-content">
        <div className="max-w-2xl mb-14">
          <p className="eyebrow text-bronze mb-4">Beyond Zimbabwe</p>
          <h2 className="font-display text-4xl sm:text-5xl leading-[1.05] text-white text-balance">
            Botswana. Namibia. South Africa.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ivory/70">
            A short flight, drive or border crossing from Victoria Falls takes
            you into some of Africa's most iconic wilderness.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {beyond.map((d, i) => (
            <Reveal key={d.slug} delay={i * 80}>
              <Link
                href={`/destinations/${d.slug}`}
                className="group relative block overflow-hidden rounded-2xl aspect-[3/4]"
              >
                <MediaFrame
                  src={d.image || null}
                  alt={d.imageAlt || `${d.name} — ${d.country}`}
                  label={d.name}
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                  className="transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/25 to-transparent"
                  aria-hidden="true"
                />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="eyebrow text-bronze mb-2">{d.country}</p>
                  <h3 className="font-display text-2xl text-white leading-none">
                    {d.name}
                  </h3>
                  {d.tagline && (
                    <p className="mt-2 text-xs text-white/60 italic font-display">
                      {d.tagline}
                    </p>
                  )}
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-white/80">
                    Explore
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}