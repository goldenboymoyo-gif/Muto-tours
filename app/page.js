import Hero from "@/components/Hero";
import CountryGrid from "@/components/CountryGrid";
import SignatureProducts from "@/components/SignatureProducts";
import Testimonials from "@/components/Testimonials";
import CTABand from "@/components/CTABand";
import LatestNews from "@/components/LatestNews";
import FeaturedItinerary from "@/components/FeaturedItinerary";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* About blurb — short, with a link through to the full About page */}
      <section className="bg-sand">
        <div className="container-editorial py-16 md:py-20 text-center">
          <p className="font-display italic text-xl sm:text-2xl text-clay leading-snug max-w-2xl mx-auto text-balance">
            Muto Tours is a Victoria Falls-based team building tours across four countries.
          </p>
          <p className="mt-5 text-sm text-ink/65 leading-relaxed max-w-xl mx-auto">
            Expertly guided tours across Zimbabwe and beyond — crafted for comfort, discovery, and unforgettable moments. Every itinerary is built from scratch around your dates, budget, and pace of travel.
          </p>
          <Link
            href="/about"
            className="mt-6 inline-flex items-center gap-2 text-sm text-clay border-b border-clay pb-0.5 hover:text-clay-dark hover:border-clay-dark transition-colors"
          >
            More about us
            <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden="true">
              <path d="M1 5H15M15 5L11 1M15 5L11 9" stroke="currentColor" strokeWidth="1.3" />
            </svg>
          </Link>
        </div>
      </section>

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

      {/* Featured Itinerary — highlighted route */}
      <FeaturedItinerary />
    </>
  );
}
