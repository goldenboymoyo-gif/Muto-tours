import Link from "next/link";
import MediaFrame from "./MediaFrame";

// A "featured route" card — a named sample itinerary rather than a single
// destination or activity (see DestinationTile / ExperienceRow for those).
// Deliberately doesn't show a price or day-count beyond what's already
// established sitewide (every route is quoted individually) — this links
// straight through to the custom-itinerary request flow, not a checkout.
export default function JourneyCard({ journey }) {
  return (
    <Link href={`/experiences/custom-safari-itineraries`} className="group block">
      <div className="relative aspect-[4/5]">
        <MediaFrame
          src={journey.image}
          alt={journey.imageAlt}
          label={journey.name}
          className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-ink/0" />
        <div className="absolute left-0 right-0 bottom-0 p-6">
          <p className="text-[11px] uppercase tracking-widest2 text-gold mb-1.5">
            {journey.countries.join(" · ")}
          </p>
          <h3 className="font-display italic text-xl sm:text-2xl text-ivory leading-tight">{journey.name}</h3>
        </div>
      </div>
      <p className="mt-4 text-sm text-ink/70 leading-relaxed">{journey.blurb}</p>
      <p className="mt-3 text-xs text-ink/50">{journey.stops.join(" → ")}</p>
    </Link>
  );
}
