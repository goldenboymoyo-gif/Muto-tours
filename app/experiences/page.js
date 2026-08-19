import SectionIntro from "@/components/SectionIntro";
import ExperienceRow from "@/components/ExperienceRow";
import CTABand from "@/components/CTABand";
import BackLink from "@/components/BackLink";
import { experiences } from "@/data/experiences";

export const metadata = {
  title: "Experiences",
  description:
    "Guided game drives, the Zambezi sunset cruise, mokoro excursions in the Okavango, Sossusvlei dune climbs, and fully custom multi-day safari itineraries.",
};

export default function ExperiencesPage() {
  return (
    <div className="pt-32 pb-8 bg-sand">
      <div className="container-editorial">
        <BackLink fallbackHref="/" fallbackLabel="Home" className="text-clay hover:text-clay-dark mb-8" />
        <SectionIntro
          kicker="Experiences"
          title="Each one can stand alone, or become a day inside a longer route."
          dek="Everything below has run as part of a real Muto Tours itinerary. Pricing is built per trip rather than listed per activity — ask for a quote and we'll tell you exactly what's included."
        />
      </div>

      <div className="container-editorial mt-8 divide-y divide-ink/10">
        {experiences.map((exp, i) => (
          <ExperienceRow key={exp.slug} experience={exp} reverse={i % 2 === 1} index={i + 1} />
        ))}
      </div>

      <div className="mt-16">
        <CTABand />
      </div>
    </div>
  );
}
