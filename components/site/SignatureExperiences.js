"use client";

import Link from "next/link";
import MediaFrame from "@/components/MediaFrame";
import { Clock, ArrowRight } from "lucide-react";
import HomeSectionIntro from "@/components/site/HomeSectionIntro";
import Reveal from "@/components/site/Reveal";
import { useSiteContent } from "@/components/site/ContentProvider";

export default function SignatureExperiences() {
  const { content } = useSiteContent();
  const experiences = (content.experiences || []).slice(0, 4);

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container-content">
        <HomeSectionIntro
          align="center"
          kicker="Signature Experiences"
          title="Experiences worth remembering"
          dek="Guided by locals who know the region like the back of their hand — each one can stand alone or fold into a custom route."
        />

        <div className="mt-16 space-y-16 md:space-y-24">
          {experiences.map((exp, i) => (
            <Reveal key={exp.slug}>
              <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <Link href={`/experiences/${exp.slug}`} className="group block relative overflow-hidden rounded-2xl">
                    <div className="aspect-[16/10]">
                      <MediaFrame
                        src={exp.image || null}
                        alt={exp.imageAlt || exp.name}
                        label={exp.name}
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />
                    </div>
                    <div
                      className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-charcoal/10"
                      aria-hidden="true"
                    />
                  </Link>
                </div>

                <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                  <p className="eyebrow text-bronze mb-3">{exp.category}</p>
                  <h3 className="font-display text-3xl md:text-4xl text-charcoal leading-[1.05]">
                    {exp.name}
                  </h3>
                  <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink/60 font-ui">
                    <span>{exp.location}</span>
                    {exp.duration && (
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="h-4 w-4" aria-hidden="true" />
                        {exp.duration}
                      </span>
                    )}
                  </div>
                  <p className="mt-5 text-base leading-relaxed text-ink/70 max-w-xl">
                    {exp.blurb}
                  </p>
                  <Link
                    href={`/experiences/${exp.slug}`}
                    className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-safari group hover:gap-3 transition-all"
                  >
                    View experience
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl bg-sand p-8 md:p-10">
          <p className="font-display text-2xl md:text-3xl text-charcoal text-balance max-w-xl">
            More ways to experience the region up close.
          </p>
          <Link
            href="/experiences"
            className="shrink-0 inline-flex items-center gap-2 rounded-full bg-charcoal px-7 py-3.5 text-sm font-semibold text-ivory hover:bg-safari transition-colors"
          >
            Explore all experiences
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}