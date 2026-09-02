import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import MediaFrame from "@/components/MediaFrame";
import CTABand from "@/components/CTABand";
import Button from "@/components/Button";
import BackLink from "@/components/BackLink";
import { experiences, getExperienceBySlug } from "@/data/experiences";

const RouteMap = dynamic(() => import("@/components/RouteMap"), { ssr: false });

export function generateStaticParams() {
  return experiences.map((e) => ({ slug: e.slug }));
}

export function generateMetadata({ params }) {
  const experience = getExperienceBySlug(params.slug);
  if (!experience) return {};
  return {
    title: experience.name,
    description: experience.blurb,
    openGraph: experience.image ? { images: [{ url: experience.image }] } : undefined,
  };
}

export default function ExperiencePage({ params }) {
  const experience = getExperienceBySlug(params.slug);
  if (!experience) notFound();

  return (
    <div>
      <section className="relative h-[58vh] min-h-[400px] w-full pt-20">
        <MediaFrame
          src={experience.image}
          alt={experience.imageAlt}
          label={experience.name}
          priority
          className="absolute inset-0 h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-ink/0" />
        <div className="relative h-full flex items-end">
          <div className="container-editorial pb-14">
            <BackLink fallbackHref="/experiences" fallbackLabel="All Experiences" className="text-gold hover:text-ivory" />
            <p className="mt-4 text-ivory/80 text-sm uppercase tracking-widest2">{experience.category}</p>
            <h1 className="mt-3 font-archivo uppercase text-4xl sm:text-5xl md:text-6xl text-ivory max-w-3xl text-balance">
              {experience.name}
            </h1>
          </div>
        </div>
      </section>

      <section className="bg-sand">
        <div className="container-editorial py-16 md:py-24 grid md:grid-cols-12 gap-12">
          <div className="md:col-span-7">
            <p className="font-archivo uppercase text-xl sm:text-2xl text-clay leading-snug mb-6 text-balance">
              {experience.tagline}
            </p>
            {experience.description.split("\n\n").map((para, i) => (
              <p key={i} className="text-base leading-relaxed text-ink/80 mb-5 last:mb-0">
                {para}
              </p>
            ))}

            {experience.sampleRoute && (
              <div className="mt-10">
                <h2 className="text-xs uppercase tracking-widest2 text-ink/50 mb-2">
                  {experience.sampleRoute.label}
                </h2>
                <RouteMap stops={experience.sampleRoute.stops} />
                <ol className="mt-6 space-y-2.5">
                  {experience.sampleRoute.stops.map((stop, i) => (
                    <li key={stop} className="flex gap-3 text-sm text-ink/80 leading-relaxed">
                      <span className="text-gold shrink-0 tabular-nums font-archivo">{String(i + 1).padStart(2, "0")}</span>
                      {stop}
                    </li>
                  ))}
                </ol>
                <p className="mt-4 text-xs text-ink/50 leading-relaxed italic">{experience.sampleRoute.note}</p>
              </div>
            )}

            {experience.gallery?.length > 0 && (
              <div className="mt-10 grid grid-cols-3 gap-3">
                {experience.gallery.map((src) => (
                  <div key={src} className="relative aspect-square rounded-[25px] overflow-hidden">
                    <MediaFrame src={src} alt={`${experience.name} gallery photo`} label={experience.name} sizes="(min-width: 768px) 33vw, 100vw" className="h-full w-full" />
                  </div>
                ))}
              </div>
            )}
          </div>

          <aside className="md:col-span-4 md:col-start-9">
            <div className="border border-ink/15 p-7">
              <dl className="space-y-5 text-sm">
                <div>
                  <dt className="text-ink/50 uppercase tracking-widest2 text-[11px] mb-1">Location</dt>
                  <dd className="text-ink">{experience.location}</dd>
                </div>
                <div>
                  <dt className="text-ink/50 uppercase tracking-widest2 text-[11px] mb-1">Duration</dt>
                  <dd className="text-ink">{experience.duration}</dd>
                </div>
              </dl>

              <div className="hr-rule my-6" />

              <h2 className="text-xs uppercase tracking-widest2 text-ink/50 mb-4">Highlights</h2>
              <ul className="space-y-3">
                {experience.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-sm text-ink/80 leading-relaxed">
                    <span className="text-clay shrink-0">&mdash;</span>
                    {h}
                  </li>
                ))}
              </ul>

              <div className="hr-rule my-6" />

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xs uppercase tracking-widest2 text-ink/50 mb-3">Included</h3>
                  <ul className="space-y-2">
                    {experience.included.map((item) => (
                      <li key={item} className="text-xs text-ink/75 leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-widest2 text-ink/50 mb-3">Not included</h3>
                  <ul className="space-y-2">
                    {experience.excluded.map((item) => (
                      <li key={item} className="text-xs text-ink/60 leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <p className="mt-6 text-xs text-ink/60 leading-relaxed italic">{experience.pricingNote}</p>

              <Button href="/contact" variant="primary" fullWidth className="mt-6">
                Request a quote
              </Button>
            </div>
          </aside>
        </div>
      </section>

      <CTABand />
    </div>
  );
}
