import Link from "next/link";
import MediaFrame from "./MediaFrame";

export default function FeaturedItinerary() {
  return (
    <section className="bg-ivory">
      <div className="container-editorial py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-5">
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden">
              <MediaFrame
                src="/images/okavango-mokoro-sunset.jpg"
                alt="Mokoro canoes on the Okavango Delta at sunset"
                label="Okavango Delta"
                sizes="(min-width: 768px) 40vw, 100vw"
                className="h-full w-full"
              />
            </div>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <p className="text-xs uppercase tracking-widest2 text-clay mb-3">Featured Itinerary</p>
            <h2 className="font-display italic text-3xl sm:text-4xl text-ink leading-tight mb-4">
              Windhoek to Victoria Falls Grand Explorer
            </h2>
            <p className="text-sm text-ink/70 leading-relaxed mb-3">
              <span className="text-ink/50">Namibia</span> &middot; <span className="text-ink/50">Botswana</span> &middot; <span className="text-ink/50">Zimbabwe</span>
            </p>
            <p className="text-base text-ink/70 leading-relaxed mb-8 max-w-lg">
              The full multi-country circuit — Namibia's desert and coast, Botswana's Delta and river game viewing, closing at the falls themselves. Runs just as well in reverse.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/itineraries"
                className="text-xs uppercase tracking-widest2 px-8 py-3 rounded-sm bg-clay text-ivory hover:bg-clay-dark transition-colors"
              >
                View Itineraries
              </Link>
              <Link
                href="/contact"
                className="text-xs uppercase tracking-widest2 px-8 py-3 rounded-sm border border-clay text-clay hover:bg-clay hover:text-ivory transition-all"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
