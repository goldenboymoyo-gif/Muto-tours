import PageHero from "@/components/PageHero";
import CTABand from "@/components/CTABand";
import BentoGallery from "@/components/BentoGallery";
import { galleryPhotos } from "@/data/gallery";

export const metadata = {
  title: "Gallery",
  description: "Real photography and footage from Southern Africa trips — Victoria Falls, the Okavango Delta, Namibia, and beyond.",
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
    title: "Safari Game Drive",
    desc: "Point-of-view footage from a real safari game drive through the African bush.",
    url: "/videos/safari-drive.mp4",
    span: "col-span-2 row-span-3 md:col-span-2 md:row-span-3",
  },
  {
    id: 1,
    type: "video",
    title: "Zambezi Sunrise Cruise",
    desc: "Real footage from an early-morning boat cruise on the Zambezi River.",
    url: "/videos/hero.mp4",
    span: "col-span-2 row-span-2 md:col-span-2 md:row-span-2",
  },
  {
    id: 2,
    type: "video",
    title: "Sunset Boat Cruise",
    desc: "A golden sunset over the water from our boat cruise experience.",
    url: "/videos/sunset-boat-cruise.mp4",
    span: "col-span-1 row-span-3 md:col-span-1 md:row-span-3",
  },
  {
    id: 3,
    type: "video",
    title: "Giraffes in the Bush",
    desc: "A tower of giraffes crossing the African bush.",
    url: "/videos/giraffes-walking.mp4",
    span: "col-span-1 row-span-2 md:col-span-1 md:row-span-2",
  },
  {
    id: 4,
    type: "video",
    title: "Lions on Safari",
    desc: "A pride of lions relaxing during a game drive.",
    url: "/videos/lions-resting.mp4",
    span: "col-span-2 row-span-2 md:col-span-2 md:row-span-2",
  },
  {
    id: 5,
    type: "video",
    title: "Boats at Sunset",
    desc: "Traditional boats silhouetted against a golden African sunset.",
    url: "/videos/boats-sunset.mp4",
    span: "col-span-1 row-span-2 md:col-span-1 md:row-span-2",
  },
  {
    id: 6,
    type: "video",
    title: "Savanna Sunset",
    desc: "The African savanna bathed in golden light as the sun sets.",
    url: "/videos/savanna-sunset-mixkit.mp4",
    span: "col-span-1 row-span-2 md:col-span-1 md:row-span-2",
  },
  {
    id: 7,
    type: "video",
    title: "Zebra Herd",
    desc: "A dazzle of zebras grazing on the open plains.",
    url: "/videos/zebra-herd.mp4",
    span: "col-span-2 row-span-2 md:col-span-2 md:row-span-2",
  },
  {
    id: 8,
    type: "video",
    title: "Wildlife at Watering Hole",
    desc: "Animals gathering at a watering hole during the dry season.",
    url: "/videos/wildlife-watering.mp4",
    span: "col-span-1 row-span-2 md:col-span-1 md:row-span-2",
  },
  {
    id: 9,
    type: "video",
    title: "Safari SUV Off-Road",
    desc: "Our safari vehicle navigating rugged African terrain.",
    url: "/videos/safari-suv.mp4",
    span: "col-span-1 row-span-3 md:col-span-1 md:row-span-3",
  },
  {
    id: 10,
    type: "video",
    title: "Boat on Calm Waters",
    desc: "A peaceful boat ride on crystal-clear African waters.",
    url: "/videos/boat-calm-water.mp4",
    span: "col-span-2 row-span-2 md:col-span-2 md:row-span-2",
  },
  {
    id: 11,
    type: "video",
    title: "River Sunset Cruise",
    desc: "Cruising down the river as the sun dips below the horizon.",
    url: "/videos/boat-river-sunset.mp4",
    span: "col-span-1 row-span-2 md:col-span-1 md:row-span-2",
  },
  ...galleryPhotos.map((photo, i) => ({
    id: i + 12,
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
