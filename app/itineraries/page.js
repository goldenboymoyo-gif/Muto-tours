import Link from "next/link";
import MediaFrame from "@/components/MediaFrame";
import PageHero from "@/components/PageHero";
import CTABand from "@/components/CTABand";
import { journeys } from "@/data/journeys";

export const metadata = {
  title: "Itineraries",
  description: "Multi-day tour routes across Zimbabwe, Botswana, Namibia, and South Africa — custom-built and quoted around your dates and pace.",
};

export default function ItinerariesPage() {
  return (
    <div>
      <PageHero
        src="/images/okavango-mokoro-sunset.jpg"
        alt="Mokoro canoes on the Okavango Delta at sunset"
        kicker="Multi-Day Routes"
        title="Tour Itineraries"
        subtitle="Pre-designed routes that work as starting points — every one is quoted individually and adjusted to your dates, pace, and interests."
        backHref="/"
        backLabel="Home"
        backLight
        height="h-[50vh] min-h-[360px]"
      />

      <section className="bg-ivory">
        <div className="container-editorial py-16 md:py-24">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl sm:text-4xl text-ink mb-3">Destinations</h2>
            <p className="text-sm text-ink/60 max-w-lg mx-auto leading-relaxed">
              From short Zimbabwe-only circuits to full multi-country explorer routes — these are the arcs we run most often.
            </p>
          </div>

          <div className="space-y-16">
            {journeys.map((journey) => (
              <article key={journey.slug} className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-5">
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                    <MediaFrame
                      src={journey.image}
                      alt={journey.imageAlt}
                      label={journey.name}
                      sizes="(min-width: 768px) 40vw, 100vw"
                      className="h-full w-full"
                    />
                  </div>
                </div>

                <div className="md:col-span-6 md:col-start-7">
                  <p className="text-xs uppercase tracking-widest2 text-clay mb-3">
                    {journey.countries.join(" · ")}
                  </p>
                  <h3 className="font-display italic text-2xl sm:text-3xl text-ink leading-tight mb-4">
                    {journey.name}
                  </h3>
                  <p className="text-sm text-ink/70 leading-relaxed mb-6">{journey.blurb}</p>

                  <div className="mb-6">
                    <h4 className="text-xs uppercase tracking-widest2 text-ink/50 mb-3">Route</h4>
                    <ol className="flex flex-wrap gap-2">
                      {journey.stops.map((stop, i) => (
                        <li key={stop} className="flex items-center gap-2 text-xs text-ink/70">
                          <span className="text-clay tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                          {stop}
                          {i < journey.stops.length - 1 && <span className="text-ink/30">→</span>}
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <Link
                      href={`/destinations/${journey.destinationSlug}`}
                      className="text-xs uppercase tracking-widest2 px-6 py-2.5 rounded-sm border border-clay text-clay hover:bg-clay hover:text-ivory transition-all"
                    >
                      View Destination
                    </Link>
                    <Link
                      href="/contact"
                      className="text-xs uppercase tracking-widest2 px-6 py-2.5 rounded-sm bg-clay text-ivory hover:bg-clay-dark transition-colors"
                    >
                      Request a Quote
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sand">
        <div className="container-editorial py-16 md:py-20 text-center">
          <p className="font-display italic text-xl sm:text-2xl text-clay leading-snug max-w-2xl mx-auto text-balance">
            Every itinerary is a starting point — not a fixed package.
          </p>
          <p className="mt-4 text-sm text-ink/65 max-w-lg mx-auto leading-relaxed">
            Dates, pace, accommodation level, and activities are adjusted to suit your party. Request a quote and we'll build the route around you.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-block text-xs uppercase tracking-widest2 px-8 py-3 rounded-sm bg-clay text-ivory hover:bg-clay-dark transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>

      <CTABand />
    </div>
  );
}
