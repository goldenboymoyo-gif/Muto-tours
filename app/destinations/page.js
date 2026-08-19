import SectionIntro from "@/components/SectionIntro";
import DestinationTile from "@/components/DestinationTile";
import CTABand from "@/components/CTABand";
import BackLink from "@/components/BackLink";
import { destinations } from "@/data/destinations";

export const metadata = {
  title: "Destinations",
  description:
    "Victoria Falls, Hwange, Chobe, the Okavango Delta, Namibia, South Africa, and the Matobo Hills — where Muto Tours builds Southern Africa routes.",
};

const aspects = ["aspect-[4/5]", "aspect-[4/3]", "aspect-[4/5]", "aspect-[4/3]", "aspect-[4/5]", "aspect-[4/3]", "aspect-[4/5]"];

export default function DestinationsPage() {
  return (
    <div className="pt-32 pb-8 bg-sand">
      <div className="container-editorial">
        <BackLink fallbackHref="/" fallbackLabel="Home" className="text-clay hover:text-clay-dark mb-8" />
        <SectionIntro
          kicker="Destinations"
          title="A route usually crosses two or three of these before it's done."
          dek="Each destination below is one Muto Tours can build into a longer circuit or offer as its own standalone trip. Start with the place that pulls at you most."
        />
      </div>

      <div className="container-editorial mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
        {destinations.map((d, i) => (
          <DestinationTile key={d.slug} destination={d} aspect={aspects[i % aspects.length]} eager={i < 2} />
        ))}
      </div>

      <div className="mt-24">
        <CTABand
          kicker="Not sure where to start?"
          title="We'll help you pick the right combination."
          dek="Tell us how much time you have and what you want to feel on this trip — wildlife-heavy, water-and-relaxation, adventure-forward — and we'll suggest a route."
        />
      </div>
    </div>
  );
}
