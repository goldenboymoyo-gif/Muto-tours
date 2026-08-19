import Link from "next/link";
import Hero from "@/components/Hero";
import CountryGrid from "@/components/CountryGrid";
import SignatureProducts from "@/components/SignatureProducts";
import Testimonials from "@/components/Testimonials";
import CTABand from "@/components/CTABand";
import LatestNews from "@/components/LatestNews";
import MediaFrame from "@/components/MediaFrame";
import { journeys } from "@/data/journeys";

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Destinations — 5 country cards with map */}
      <CountryGrid />

      {/* Signature Products — 4 curated experience cards */}
      <SignatureProducts />

      {/* Testimonials — client reviews */}
      <Testimonials />

      {/* CTA — "Your African Safari Experience Begins Here" */}
      <CTABand />

      {/* Latest News — 3 blog post cards */}
      <LatestNews />

      {/* Itineraries — route cards */}
      <section className="bg-ivory">
        <div className="container-editorial py-20 md:py-28">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl sm:text-4xl text-ink mb-3">Itineraries</h2>
            <p className="text-sm text-ink/60 max-w-lg mx-auto leading-relaxed">
              Pre-designed routes that work as starting points — every one is quoted individually and adjusted to your dates, pace, and interests.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {journeys.map((journey) => (
              <Link
                key={journey.slug}
                href={`/itineraries`}
                className="group relative aspect-[4/3] rounded-lg overflow-hidden"
              >
                <MediaFrame
                  src={journey.image}
                  alt={journey.imageAlt}
                  label={journey.name}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="absolute inset-0 h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-[11px] uppercase tracking-widest2 text-gold mb-1">
                    {journey.countries.join(" · ")}
                  </p>
                  <h3 className="font-display italic text-lg text-ivory group-hover:text-gold transition-colors">
                    {journey.name}
                  </h3>
                  <p className="text-xs text-ivory/70 mt-1 leading-relaxed line-clamp-2 hidden sm:block">
                    {journey.blurb}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/itineraries"
              className="text-xs uppercase tracking-widest2 text-clay border-b border-clay pb-0.5 hover:text-clay-dark hover:border-clay-dark transition-colors"
            >
              View All Itineraries
            </Link>
          </div>
        </div>
      </section>

      {/* Holidays to Book Now */}
      <section className="bg-sand">
        <div className="container-editorial py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-5">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <MediaFrame
                  src="/images/okavango-mokoro-sunset.jpg"
                  alt="Mokoro canoes on the Okavango Delta"
                  label="Okavango Delta"
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="h-full w-full"
                />
              </div>
            </div>
            <div className="md:col-span-6 md:col-start-7">
              <p className="text-xs uppercase tracking-widest2 text-clay mb-3">Holidays to Book Now</p>
              <h2 className="font-display italic text-3xl sm:text-4xl text-ink leading-tight mb-4">
                Bespoke adventures specially curated by Muto Tours
              </h2>
              <p className="text-sm text-ink/70 leading-relaxed mb-6">
                Where every moment is meticulously crafted to suit your unique desires and preferences. From thrilling safari excursions to cultural immersions, let us curate a journey that exceeds your expectations and leaves you with unforgettable memories of Africa.
              </p>
              <Link
                href="/contact"
                className="inline-block text-xs uppercase tracking-widest2 px-8 py-3 rounded-sm bg-clay text-ivory hover:bg-clay-dark transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <CTABand />
    </>
  );
}
