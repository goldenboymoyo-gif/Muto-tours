import Hero from "@/components/Hero";
import SectionIntro from "@/components/SectionIntro";
import DestinationTile from "@/components/DestinationTile";
import ExperienceRow from "@/components/ExperienceRow";
import CTABand from "@/components/CTABand";
import MediaFrame from "@/components/MediaFrame";
import Button from "@/components/Button";
import WhatsAppButton from "@/components/WhatsAppButton";
import Link from "next/link";
import { destinations } from "@/data/destinations";
import { experiences } from "@/data/experiences";
import { brand } from "@/data/brand";

const featuredDestinations = destinations.filter((d) =>
  ["victoria-falls", "namibia", "okavango-delta", "chobe-national-park", "hwange-national-park"].includes(d.slug)
);

const featuredExperiences = experiences.filter((e) =>
  ["custom-safari-itineraries", "zambezi-sunset-cruise", "okavango-mokoro-excursion", "sossusvlei-dune-adventure"].includes(
    e.slug
  )
);

const whyMuto = [
  {
    title: "Local, on-the-ground guides",
    body: "Every route is walked by guides who work their home territory — Victoria Falls, the Delta, the Namib — day in and day out, not a call-centre itinerary read off a screen.",
  },
  {
    title: "Built around you, not a template",
    body: "No fixed package menu. Tell us your dates, budget, and pace, and we build the route — from a five-day Falls-and-Chobe combination to a full multi-country circuit.",
  },
  {
    title: "Comfort at every budget",
    body: "Tented bush camps to established lodges — the same care goes into a budget-conscious route as a luxury one.",
  },
  {
    title: "Support that doesn't stop at booking",
    body: "Cross-border transfers, changing weather, a missed connection — someone is reachable throughout your trip, not just before it.",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Arrival statement */}
      <section className="bg-sand">
        <div className="container-editorial py-20 md:py-28">
          <SectionIntro
            kicker="Muto Tours"
            title="Southern Africa is enormous, uneven, and rewards people who go slowly."
            dek={brand.shortStatement}
          />
        </div>
      </section>

      {/* Destination discovery — asymmetric, not a repeated grid */}
      <section className="bg-sand pb-24">
        <div className="container-editorial">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <SectionIntro kicker="Where We Go" title="Four countries, one continuous route." />
            <Link
              href="/destinations"
              className="text-sm text-clay border-b border-clay pb-0.5 hover:text-clay-dark hover:border-clay-dark transition-colors shrink-0"
            >
              All destinations
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
            <div className="md:col-span-7">
              <DestinationTile destination={featuredDestinations[0]} aspect="aspect-[16/11]" eager />
            </div>
            <div className="md:col-span-5">
              <DestinationTile destination={featuredDestinations[1]} aspect="aspect-[16/11]" />
            </div>
            <div className="md:col-span-4">
              <DestinationTile destination={featuredDestinations[2]} aspect="aspect-[4/5]" />
            </div>
            <div className="md:col-span-4">
              <DestinationTile destination={featuredDestinations[3]} aspect="aspect-[4/5]" />
            </div>
            <div className="md:col-span-4">
              <DestinationTile destination={featuredDestinations[4]} aspect="aspect-[4/5]" />
            </div>
          </div>
        </div>
      </section>

      {/* Story block — full width, editorial, no stock-photo cliches */}
      <section className="relative h-[70vh] min-h-[460px] w-full">
        <MediaFrame
          src="/images/okavango-mokoro-sunset.jpg"
          alt="A mokoro dugout canoe on the Okavango Delta at sunset"
          label="Okavango Delta"
          className="absolute inset-0 h-full w-full"
        />
        <div className="absolute inset-0 bg-ink/45" />
        <div className="relative h-full flex items-center">
          <div className="container-editorial">
            <p className="font-display italic text-ivory text-2xl sm:text-3xl md:text-4xl max-w-2xl leading-[1.35] text-balance">
              &ldquo;No engine on a mokoro. Just a pole finding the bottom, and reed beds close enough to touch on either side.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* Why Muto Tours — editorial list, not icon cards */}
      <section className="bg-ivory">
        <div className="container-editorial py-20 md:py-28">
          <SectionIntro kicker="Why Muto Tours" title="What actually changes when a local team plans your route." />
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {whyMuto.map((item, i) => (
              <div key={item.title} className="flex gap-6">
                <span className="font-display italic text-3xl text-clay/50 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-lg font-medium text-ink">{item.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink/70">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experiences */}
      <section className="bg-sand">
        <div className="container-editorial py-20 md:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-6">
            <SectionIntro kicker="Experiences" title="What a day on route actually looks like." />
            <Link
              href="/experiences"
              className="text-sm text-clay border-b border-clay pb-0.5 hover:text-clay-dark hover:border-clay-dark transition-colors shrink-0"
            >
              All experiences
            </Link>
          </div>
          <div className="divide-y divide-ink/10">
            {featuredExperiences.map((exp, i) => (
              <ExperienceRow key={exp.slug} experience={exp} reverse={i % 2 === 1} index={i + 1} />
            ))}
          </div>
        </div>
      </section>

      {/* About Muto Tours — editorial split with photo */}
      <section className="bg-ivory">
        <div className="container-editorial py-20 md:py-28 grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden">
              <MediaFrame
                src="/images/quiver-tree.jpg"
                alt="A quiver tree against a clear blue Southern African sky"
                label="Victoria Falls, Zimbabwe"
                className="h-full w-full"
              />
            </div>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <SectionIntro
              kicker="About Muto Tours"
              title="A Victoria Falls-based team building tours across four countries."
            />
            <div className="mt-8 space-y-4 text-base leading-relaxed text-ink/75">
              <p>
                Muto Tours is close enough to the falls to hear them on a quiet morning.
                We run expert-guided tours across Zimbabwe and its neighbours, built for
                comfort, discovery, and the kind of moments that are hard to plan for
                but easy to recognise once you're in them.
              </p>
              <p>
                Trips are tailored rather than templated — adventurers, honeymooners,
                families, and photographers each need a different pace, and the
                itinerary changes accordingly.
              </p>
            </div>
            <div className="mt-8">
              <Button href="/about" variant="primary">Read Our Story</Button>
            </div>
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
