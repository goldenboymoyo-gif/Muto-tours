import MediaFrame from "@/components/MediaFrame";
import SectionIntro from "@/components/SectionIntro";
import CTABand from "@/components/CTABand";
import BackLink from "@/components/BackLink";
import { brand } from "@/data/brand";

export const metadata = {
  title: "About",
  description: "Muto Tours is a Victoria Falls-based operator running custom-built tours across Southern Africa.",
};

const approach = [
  {
    title: "We plan from the ground, not a brochure",
    body: "Routes are built by people who work these roads and rivers regularly — not assembled from a fixed package list.",
  },
  {
    title: "Every trip is quoted individually",
    body: "Accommodation, activities, and pacing are matched to who's actually travelling: honeymooners, families, photographers, first-time safari-goers.",
  },
  {
    title: "Responsible by default",
    body: "Guides, lodges, and activity operators are chosen with an eye on how they treat the land and the communities around it, not just the guest experience.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <section className="relative h-[52vh] min-h-[380px] w-full pt-20">
        <MediaFrame
          src="/images/quiver-tree.jpg"
          alt="A quiver tree against a clear blue Southern African sky"
          label="Southern Africa"
          priority
          className="absolute inset-0 h-full w-full"
        />
        <div className="absolute inset-0 bg-ink/45" />
        <div className="relative h-full flex items-end">
          <div className="container-editorial pb-14">
            <BackLink fallbackHref="/" fallbackLabel="Home" className="text-gold hover:text-ivory mb-4" />
            <p className="text-xs uppercase tracking-widest2 text-gold mb-4">About</p>
            <h1 className="font-display italic text-4xl sm:text-5xl md:text-6xl text-ivory max-w-2xl text-balance">
              {brand.name}
            </h1>
          </div>
        </div>
      </section>

      <section className="bg-sand">
        <div className="container-editorial py-16 md:py-24 grid md:grid-cols-12 gap-12">
          <div className="md:col-span-7">
            <p className="font-display italic text-xl sm:text-2xl text-clay leading-snug mb-6 text-balance">
              A Victoria Falls-based team building tours across four countries.
            </p>
            <div className="space-y-5 text-base leading-relaxed text-ink/80">
              <p>
                Muto Tours is a Southern Africa travel operator based in Victoria Falls,
                Zimbabwe — close enough to the falls to hear them on a quiet morning. The
                business runs on expert-guided tours across Zimbabwe and its neighbours,
                built for comfort, discovery, and the kind of moments that are hard to
                plan for but easy to recognise once you're in them.
              </p>
              <p>
                Trips are tailored rather than templated: adventurers, honeymooners,
                families, and photographers each need a different pace and a different
                mix of activity and rest, and the itinerary changes accordingly. Options
                range from established lodges to more budget-conscious tented camps,
                depending on what a trip calls for.
              </p>
            </div>
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <h2 className="text-xs uppercase tracking-widest2 text-ink/50 mb-5">Approach</h2>
            <div className="space-y-8">
              {approach.map((item) => (
                <div key={item.title}>
                  <h3 className="text-base font-medium text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm text-ink/70 leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ivory">
        <div className="container-editorial py-16 md:py-20">
          <SectionIntro
            kicker="Coverage"
            title="Zimbabwe, Botswana, Namibia, and South Africa — one continuous route."
            dek="Most itineraries cross at least two of these. See where Muto Tours currently operates and what a route between them tends to look like."
          />
        </div>
      </section>

      <CTABand />
    </div>
  );
}
