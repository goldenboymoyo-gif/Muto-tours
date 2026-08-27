import PageHero from "@/components/PageHero";
import SectionIntro from "@/components/SectionIntro";
import DestinationTile from "@/components/DestinationTile";
import CTABand from "@/components/CTABand";
import { destinations } from "@/data/destinations";

export const metadata = {
  title: "Destinations",
  description:
    "Victoria Falls, Hwange, Chobe, the Okavango Delta, Namibia, South Africa, and the Matobo Hills — where Muto Tours builds Southern Africa routes.",
};

const aspects = ["aspect-[4/5]"]; // uniform ratio — the alternating 4/5/4/3 mix left cards visibly misaligned within each grid row

export default function DestinationsPage() {
  return (
    <div>
      <PageHero
        src="/images/fish-river-canyon.jpg"
        alt="The vast Fish River Canyon in Namibia"
        kicker="Destinations"
        title="Four countries, one continuous route."
        subtitle="Victoria Falls, Hwange, Chobe, the Okavango Delta, Namibia, and beyond — where Muto Tours builds its routes."
      />

      <section className="bg-sand">
        <div className="container-editorial py-20 md:py-28">
          <SectionIntro
            kicker="Where We Go"
            title="A route usually crosses two or three of these before it's done."
            dek="Each destination below is one Muto Tours can build into a longer circuit or offer as its own standalone trip. Start with the place that pulls at you most."
          />
        </div>
      </section>

      <div className="bg-sand pb-8">
        <div className="container-editorial grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
          {destinations.map((d, i) => (
            <DestinationTile key={d.slug} destination={d} aspect={aspects[i % aspects.length]} eager={i < 2} />
          ))}
        </div>
      </div>

      <CTABand
        kicker="Not sure where to start?"
        title="We'll help you pick the right combination."
        dek="Tell us how much time you have and what you want to feel on this trip — wildlife-heavy, water-and-relaxation, adventure-forward — and we'll suggest a route."
      />
    </div>
  );
}
