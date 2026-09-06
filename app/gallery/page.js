import PageHero from "@/components/PageHero";
import CTABand from "@/components/CTABand";
import GallerySection from "@/components/GallerySection";
import { getContent } from "@/lib/content";

export const metadata = {
  title: "Gallery",
  description: "Real photography and footage from Southern Africa trips — Victoria Falls, the Okavango Delta, Namibia, and beyond.",
};

export default async function GalleryPage() {
  const { media } = await getContent();

  return (
    <div>
      <PageHero
        src={media?.pageHero?.gallery || "/images/slide3.jpg"}
        alt="A giraffe under an acacia tree in the African savanna"
        kicker="Gallery"
        title="What it actually looks like out there."
        subtitle="Real photography and footage from Southern Africa trips — no stock imagery."
      />

      <section className="bg-sand">
        <div className="container-editorial py-16 md:py-24">
          <GallerySection />
        </div>
      </section>

      <CTABand kicker="Like what you see?" title="This could be your trip." image={media?.homepage?.ctaBand} />
    </div>
  );
}
