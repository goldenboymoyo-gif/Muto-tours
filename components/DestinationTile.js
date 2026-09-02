import Link from "next/link";
import MediaFrame from "./MediaFrame";

// Deliberately not a repeated card grid — aspect ratio is a prop so callers
// can vary composition (see app/page.js and app/destinations/page.js, which
// each pass different ratios per position to break up the rhythm).
export default function DestinationTile({ destination, aspect = "aspect-[4/5]", eager = false }) {
  return (
    <Link href={`/destinations/${destination.slug}`} className="group block">
      <div className={`relative ${aspect} rounded-[25px] overflow-hidden`}>
        <MediaFrame
          src={destination.image}
          alt={destination.imageAlt}
          label={destination.name}
          priority={eager}
          sizes="(min-width: 768px) 50vw, 100vw"
          className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-ink/0" />
        <div className="absolute left-0 bottom-0 p-6">
          <p className="text-[11px] uppercase tracking-widest2 text-gold mb-1.5">
            {destination.country}
          </p>
          <h3 className="font-archivo uppercase text-xl text-ivory">{destination.name}</h3>
        </div>
      </div>
      <p className="mt-4 text-sm text-ink/70 leading-relaxed max-w-md">{destination.tagline}</p>
    </Link>
  );
}
