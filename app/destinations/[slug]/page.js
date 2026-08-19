import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import Link from "next/link";
import MediaFrame from "@/components/MediaFrame";
import CTABand from "@/components/CTABand";
import ExperienceRow from "@/components/ExperienceRow";
import Button from "@/components/Button";
import BackLink from "@/components/BackLink";
import { destinations, getDestinationBySlug } from "@/data/destinations";
import { experiences } from "@/data/experiences";

const RouteMap = dynamic(() => import("@/components/RouteMap"), { ssr: false });

const ROUTE_MAP = {
  "victoria-falls": {
    title: "Typical Route",
    description: "Victoria Falls sits at the eastern end of most multi-country circuits — the grand finale after Botswana's rivers and Namibia's dunes, or the starting point for routes heading west.",
    stops: ["Windhoek, Namibia", "Sossusvlei & Deadvlei", "Swakopmund", "Damaraland", "Etosha National Park", "Okavango Delta / Chobe", "Victoria Falls, Zimbabwe"],
    note: "Most itineraries end here before departure from Victoria Falls Airport.",
  },
  "hwange-national-park": {
    title: "Typical Route",
    description: "Hwange is a natural add-on from Victoria Falls — just 2–3 hours by road — and often appears as a short safari chapter between the Falls and Chobe.",
    stops: ["Victoria Falls, Zimbabwe", "Hwange National Park", "Chobe, Botswana", "Okavango Delta"],
    note: "Often combined as a 2–3 day extension from Victoria Falls.",
  },
  "chobe-national-park": {
    title: "Typical Route",
    description: "Chobe sits just across the border from Victoria Falls and is typically visited as a day trip or overnight before heading deeper into Botswana.",
    stops: ["Victoria Falls, Zimbabwe", "Chobe National Park, Botswana", "Kasane", "Okavango Delta", "Maun"],
    note: "Border crossing at Kazungula — a half-day transfer from Victoria Falls.",
  },
  "okavango-delta": {
    title: "Typical Route",
    description: "The Okavango Delta is the quiet centre of most Botswana itineraries — reached from Maun after Chobe, or as a multi-day fly-in from the south.",
    stops: ["Windhoek, Namibia", "Etosha National Park", "Kasane / Chobe", "Maun", "Okavango Delta"],
    note: "Water levels peak June–August as Angolan floodwaters arrive.",
  },
  "namibia": {
    title: "The Namibia Explorer Route",
    description: "Namibia's west-to-north arc is the backbone of Muto Tours' own Namibia Explorer package and the opening chapter of most multi-country circuits.",
    stops: ["Windhoek — arrival", "Sossusvlei — dunes and Deadvlei", "Swakopmund — coastal town", "Damaraland — rock art, desert wildlife", "Etosha National Park — floodlit waterholes"],
    note: "Road transfers of several hours between stops are normal and built into the pacing.",
  },
  "south-africa": {
    title: "Typical Route",
    description: "South Africa usually serves as the bookend — the arrival or departure point — with Kruger National Park as a Big Five safari extension.",
    stops: ["Johannesburg — arrival", "Kruger National Park", "OR depart to Victoria Falls / Windhoek"],
    note: "Johannesburg is the region's main air hub for international connections.",
  },
  "matobo-hills": {
    title: "Typical Route",
    description: "Matobo is a deliberate detour from the main Victoria Falls–Chobe corridor — best as a dedicated day or overnight from Bulawayo.",
    stops: ["Bulawayo", "Matobo Hills National Park", "Return to Bulawayo or continue to Victoria Falls"],
    note: "A cultural and geological counterpoint to the bigger wildlife parks.",
  },
};

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export function generateMetadata({ params }) {
  const destination = getDestinationBySlug(params.slug);
  if (!destination) return {};
  return {
    title: destination.name,
    description: destination.blurb,
    openGraph: destination.image ? { images: [{ url: destination.image }] } : undefined,
  };
}

export default function DestinationPage({ params }) {
  const destination = getDestinationBySlug(params.slug);
  if (!destination) notFound();

  const relatedExperiences = experiences
    .filter((e) => e.location?.includes(destination.name) || e.location?.includes(destination.country))
    .slice(0, 3);

  const currentIndex = destinations.findIndex((d) => d.slug === destination.slug);
  const next = destinations[(currentIndex + 1) % destinations.length];

  const pairedDestinations = (destination.pairsWith || [])
    .map((slug) => getDestinationBySlug(slug))
    .filter(Boolean);

  return (
    <div>
      <section className="relative h-[62vh] min-h-[420px] w-full pt-20">
        <MediaFrame
          src={destination.image}
          alt={destination.imageAlt}
          label={destination.name}
          priority
          className="absolute inset-0 h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-ink/0" />
        <div className="relative h-full flex items-end">
          <div className="container-editorial pb-14">
            <BackLink fallbackHref="/destinations" fallbackLabel="All Destinations" className="text-gold hover:text-ivory" />
            <p className="mt-4 text-ivory/80 text-sm uppercase tracking-widest2">
              {destination.country} &middot; {destination.region}
            </p>
            <h1 className="mt-3 font-display italic text-4xl sm:text-5xl md:text-6xl text-ivory max-w-3xl text-balance">
              {destination.name}
            </h1>
          </div>
        </div>
      </section>

      <section className="bg-sand">
        <div className="container-editorial py-16 md:py-24 grid md:grid-cols-12 gap-12">
          <div className="md:col-span-7">
            <p className="font-display italic text-xl sm:text-2xl text-clay leading-snug mb-6 text-balance">
              {destination.tagline}
            </p>
            {destination.description.split("\n\n").map((para, i) => (
              <p key={i} className="text-base leading-relaxed text-ink/80 mb-5 last:mb-0">
                {para}
              </p>
            ))}

            {ROUTE_MAP[destination.slug] && (
              <div className="mt-10">
                <h2 className="text-xs uppercase tracking-widest2 text-ink/50 mb-2">
                  {ROUTE_MAP[destination.slug].title}
                </h2>
                <p className="text-sm text-ink/70 mb-4 leading-relaxed">
                  {ROUTE_MAP[destination.slug].description}
                </p>

                <RouteMap stops={ROUTE_MAP[destination.slug].stops} />

                <ol className="mt-6 space-y-2.5">
                  {ROUTE_MAP[destination.slug].stops.map((stop, i) => (
                    <li key={stop} className="flex gap-3 text-sm text-ink/80 leading-relaxed">
                      <span className="text-clay shrink-0 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                      {stop}
                    </li>
                  ))}
                </ol>
                <p className="mt-4 text-xs text-ink/50 leading-relaxed italic">{ROUTE_MAP[destination.slug].note}</p>
              </div>
            )}
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <h2 className="text-xs uppercase tracking-widest2 text-ink/50 mb-5">On route here</h2>
            <ul className="space-y-4">
              {destination.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-sm text-ink/80 leading-relaxed">
                  <span className="text-clay shrink-0">&mdash;</span>
                  {h}
                </li>
              ))}
            </ul>

            {pairedDestinations.length > 0 && (
              <>
                <div className="hr-rule my-7" />
                <h2 className="text-xs uppercase tracking-widest2 text-ink/50 mb-5">Pairs well with</h2>
                <div className="space-y-3">
                  {pairedDestinations.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/destinations/${p.slug}`}
                      className="flex items-center gap-3 text-sm text-ink/80 hover:text-clay transition-colors group"
                    >
                      <span className="w-6 h-6 rounded-full bg-clay/10 flex items-center justify-center shrink-0 group-hover:bg-clay/20 transition-colors">
                        <span className="w-1.5 h-1.5 rounded-full bg-clay" />
                      </span>
                      <span className="underline decoration-ink/20 underline-offset-4 group-hover:decoration-clay">
                        {p.name}, {p.country}
                      </span>
                    </Link>
                  ))}
                </div>
              </>
            )}

            <Button href="/contact" variant="primary" className="mt-8">
              Plan a trip to {destination.name}
            </Button>
          </div>
        </div>
      </section>

      {destination.gallery?.length > 0 && (
        <section className="bg-sand">
          <div className="container-editorial pb-16 md:pb-24 grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {destination.gallery.map((src, i) => (
              <div
                key={src}
                className={`relative aspect-[4/3] ${i === 0 ? "col-span-2 md:col-span-1 md:aspect-square" : ""}`}
              >
                <MediaFrame src={src} alt={`${destination.name} photo`} label={destination.name} sizes="(min-width: 768px) 33vw, 50vw" className="h-full w-full" />
              </div>
            ))}
          </div>
        </section>
      )}

      {relatedExperiences.length > 0 && (
        <section className="bg-ivory">
          <div className="container-editorial py-16 md:py-20">
            <h2 className="font-display text-2xl sm:text-3xl text-ink mb-2">Experiences here</h2>
            <div className="divide-y divide-ink/10">
              {relatedExperiences.map((exp, i) => (
                <ExperienceRow key={exp.slug} experience={exp} reverse={i % 2 === 1} index={i + 1} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABand
        kicker="Next stop"
        title={`Pair it with ${next.name}`}
        dek={next.tagline}
      />
    </div>
  );
}
