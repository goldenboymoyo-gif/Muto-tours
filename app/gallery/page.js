import PageHero from "@/components/PageHero";
import CTABand from "@/components/CTABand";
import GallerySection from "@/components/GallerySection";

export const metadata = {
  title: "Gallery",
  description: "Real photography and footage from Southern Africa trips — Victoria Falls, the Okavango Delta, Namibia, and beyond.",
};

export default function GalleryPage() {
  return (
    <div>
      <PageHero
        src="/images/deadvlei-dunes.jpg"
        alt="The orange dunes of Deadvlei against a deep blue sky"
        kicker="Gallery"
        title="What it actually looks like out there."
        subtitle="Real photography and footage from Southern Africa trips — no stock imagery."
      />

      <section className="bg-sand">
        <div className="container-editorial py-16 md:py-24">
          <GallerySection />
        </div>
      </section>

      <CTABand kicker="Like what you see?" title="This could be your trip." />
    </div>
  );
}
