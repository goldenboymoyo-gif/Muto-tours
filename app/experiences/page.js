import PageHero from "@/components/PageHero";
import SectionIntro from "@/components/SectionIntro";
import ExperienceRow from "@/components/ExperienceRow";
import CTABand from "@/components/CTABand";
import { getContent } from "@/lib/content";

export const metadata = {
  title: "Experiences",
  description:
    "Guided game drives, the Zambezi sunset cruise, mokoro excursions in the Okavango, Sossusvlei dune climbs, and fully custom multi-day safari itineraries.",
};

export default async function ExperiencesPage() {
  const { experiences, media } = await getContent();

  return (
    <div>
      <PageHero
        src={media?.pageHero?.experiences || "/images/vicfalls.jpg"}
        alt="A boat cruise on the Zambezi River"
        kicker="Experiences"
        title="What a day on route actually looks like."
        subtitle="Guided game drives, sunset cruises, mokoro excursions, dune climbs — each one can stand alone or become a day inside a longer route."
      />

      <section className="bg-sand">
        <div className="container-editorial py-20 md:py-28">
          <SectionIntro
            kicker="Experiences"
            title="Each one can stand alone, or become a day inside a longer route."
            dek="Everything below has run as part of a real Muto Tours itinerary. Pricing is built per trip rather than listed per activity — ask for a quote and we'll tell you exactly what's included."
          />
        </div>
      </section>

      <div className="bg-sand pb-8">
        <div className="container-editorial divide-y divide-ink/10">
          {experiences.map((exp, i) => (
            <ExperienceRow key={exp.slug} experience={exp} reverse={i % 2 === 1} index={i + 1} />
          ))}
        </div>
      </div>

      <CTABand image={media?.homepage?.ctaBand} />
    </div>
  );
}
