import PageHero from "@/components/PageHero";
import CTABand from "@/components/CTABand";
import BentoGallery from "@/components/BentoGallery";
import { galleryPhotos } from "@/data/gallery";

export const metadata = {
  title: "Gallery",
  description: "Real photography from Southern Africa trips — Victoria Falls, the Okavango Delta, Namibia, and beyond.",
};

const SPAN_PATTERN = [
  "col-span-1 row-span-3 md:col-span-1 md:row-span-3",
  "col-span-2 row-span-2 md:col-span-2 md:row-span-2",
  "col-span-1 row-span-2 md:col-span-1 md:row-span-2",
  "col-span-2 row-span-2 md:col-span-2 md:row-span-2",
  "col-span-1 row-span-3 md:col-span-1 md:row-span-3",
  "col-span-1 row-span-2 md:col-span-1 md:row-span-2",
];

const mediaItems = [
  {
    id: 0,
    type: "video",
    title: "Zambezi Sunrise Cruise",
    desc: "Real footage from an early-morning boat cruise on the Zambezi.",
    url: "/videos/hero.mp4",
    span: "col-span-2 row-span-3 md:col-span-2 md:row-span-3",
  },
  ...galleryPhotos.map((photo, i) => ({
    id: i + 1,
    type: "image",
    title: photo.caption,
    desc: photo.alt,
    url: photo.src,
    span: SPAN_PATTERN[i % SPAN_PATTERN.length],
  })),
];

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
        <div className="container-editorial py-20 md:py-24">
          <BentoGallery mediaItems={mediaItems} />
        </div>
      </section>

      <CTABand kicker="Like what you see?" title="This could be your trip." />
    </div>
  );
}
