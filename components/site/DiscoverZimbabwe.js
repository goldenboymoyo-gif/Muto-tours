"use client";

import Link from "next/link";
import MediaFrame from "@/components/MediaFrame";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import HomeSectionIntro from "@/components/site/HomeSectionIntro";
import Reveal from "@/components/site/Reveal";
import { useSiteContent } from "@/components/site/ContentProvider";

function ZimCard({ dest }) {
  return (
    <Link
      href={`/destinations/${dest.slug}`}
      className="group relative block overflow-hidden rounded-2xl bg-charcoal h-full"
    >
      <MediaFrame
        src={dest.image || null}
        alt={dest.imageAlt || `${dest.name} — Zimbabwe`}
        label={dest.name}
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/25 to-transparent"
        aria-hidden="true"
      />
      <div className="relative z-10 p-7 md:p-9 flex flex-col justify-end h-full min-h-[240px] md:min-h-0">
        <p className="eyebrow text-bronze mb-2">Zimbabwe</p>
        <h3 className="font-display text-white text-3xl md:text-4xl leading-none">
          {dest.name}
        </h3>
        {dest.tagline && (
          <p className="mt-2 text-sm text-white/70 italic font-display">
            {dest.tagline}
          </p>
        )}
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white">
          Explore{" "}
          <ArrowRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </span>
      </div>
    </Link>
  );
}

export default function DiscoverZimbabwe() {
  const { content } = useSiteContent();
  const zim = (content.destinations || []).filter(
    (d) => d.country && d.country.toLowerCase() === "zimbabwe"
  );
  const [feature, hwange, ...rest] = zim;

  return (
    <section className="bg-ivory py-20 md:py-28">
      <div className="container-content">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <HomeSectionIntro
            kicker="Discover"
            title="Zimbabwe is more than Victoria Falls"
            dek="From the Smoke That Thunders to the wild heart of Hwange, Zimbabwe has stories that stay with you long after the journey ends."
          />
          <Link
            href="/destinations"
            className="shrink-0 inline-flex items-center gap-2 text-sm font-semibold text-ink/70 hover:text-safari transition-colors"
          >
            View all destinations
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-12 md:grid-cols-2 md:gap-8">
          {feature && (
            <Reveal className="lg:col-span-7">
              <div className="h-full aspect-[16/11] md:aspect-auto md:h-full min-h-[320px]">
                <ZimCard dest={feature} />
              </div>
            </Reveal>
          )}
          {hwange && (
            <Reveal delay={120} className="lg:col-span-5">
              <div className="h-full aspect-[4/3] md:aspect-auto md:h-full min-h-[300px] lg:mt-16">
                <ZimCard dest={hwange} />
              </div>
            </Reveal>
          )}
          {rest.slice(0, 1).map((d, i) => (
            <Reveal
              key={d.slug}
              delay={120 * (i + 1)}
              className="lg:col-span-5 lg:-mt-8"
            >
              <div className="h-full aspect-[4/3] min-h-[260px]">
                <ZimCard dest={d} />
              </div>
            </Reveal>
          ))}
          {rest.slice(0, 1).length > 0 && (
            <Reveal className="lg:col-span-7 lg:-mt-8 bg-white border border-charcoal/10 rounded-2xl p-8 md:p-10 flex flex-col justify-center">
              <p className="font-display text-2xl md:text-3xl text-charcoal leading-snug text-balance max-w-lg">
                And beyond the borders — Botswana, Namibia and South Africa, on
                one route if you wish.
              </p>
              <Link
                href="/destinations"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-safari"
              >
                Plan a multi-country journey
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}