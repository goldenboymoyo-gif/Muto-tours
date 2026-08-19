import SectionIntro from "@/components/SectionIntro";
import CTABand from "@/components/CTABand";
import BentoGallery from "@/components/BentoGallery";
import BackLink from "@/components/BackLink";
import { galleryPhotos } from "@/data/gallery";

export const metadata = {
  title: "Gallery",
  description: "Real photography from Southern Africa trips — Victoria Falls, the Okavango Delta, Namibia, and beyond.",
};

// Repeating span pattern that gives the bento grid its varied rhythm —
// tall / wide / medium cells cycling across however many items there are.
const SPAN_PATTERN = [
  "col-span-1 row-span-3 md:col-span-1 md:row-span-3",
  "col-span-2 row-span-2 md:col-span-2 md:row-span-2",
  "col-span-1 row-span-2 md:col-span-1 md:row-span-2",
  "col-span-2 row-span-2 md:col-span-2 md:row-span-2",
  "col-span-1 row-span-3 md:col-span-1 md:row-span-3",
  "col-span-1 row-span-2 md:col-span-1 md:row-span-2",
];

// The real, unbranded cut of the Zambezi sunrise cruise footage (see
// public/videos/README.md) gets a spot in the gallery grid alongside the
// photos — genuine motion from an actual trip, not stock.
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
    <div className="pt-32 pb-8 bg-sand">
      <div className="container-editorial">
        <BackLink fallbackHref="/" fallbackLabel="Home" className="text-clay hover:text-clay-dark mb-8" />
        <SectionIntro
          kicker="Gallery"
          title="What it actually looks like out there."
          dek="Real photography (and real footage) from Southern Africa trips — no stock imagery. Tap anything for a closer look, or drag it around."
        />
      </div>

      <div className="container-editorial mt-14">
        <BentoGallery mediaItems={mediaItems} />
      </div>

      <div className="mt-24">
        <CTABand kicker="Like what you see?" title="This could be your trip." />
      </div>
    </div>
  );
}
