import Link from "next/link";
import MediaFrame from "./MediaFrame";

// A single-destination feature — one large image, one write-up, one link —
// as opposed to DestinationTile's repeated grid treatment. Sits right under
// the homepage's About blurb, mirroring the "one destination, told properly"
// pattern common on tourism-operator homepages before a fuller grid/menu of
// everything else further down the page.
export default function DestinationSpotlight({ destination }) {
  return (
    <section className="bg-sand">
      <div className="container-editorial py-20 md:py-28 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
        <div className="md:col-span-6 relative aspect-[4/3]">
          <MediaFrame
            src={destination.image}
            alt={destination.imageAlt}
            label={destination.name}
            sizes="(min-width: 768px) 50vw, 100vw"
            className="h-full w-full"
          />
        </div>
        <div className="md:col-span-6">
          <p className="text-xs uppercase tracking-widest2 text-clay mb-4">Destination Spotlight</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-[2.75rem] leading-[1.1] text-ink text-balance">
            {destination.name}
          </h2>
          <p className="mt-3 font-display italic text-lg text-clay">{destination.tagline}</p>
          <p className="mt-5 text-base leading-relaxed text-ink/70 max-w-lg">{destination.blurb}</p>
          <Link
            href={`/destinations/${destination.slug}`}
            className="mt-6 inline-flex items-center gap-2 text-sm text-clay border-b border-clay pb-0.5 hover:text-clay-dark hover:border-clay-dark transition-colors"
          >
            Explore {destination.name}
            <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden="true">
              <path d="M1 5H15M15 5L11 1M15 5L11 9" stroke="currentColor" strokeWidth="1.3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
