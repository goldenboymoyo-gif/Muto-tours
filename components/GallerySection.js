"use client";

import { useState } from "react";
import BentoGallery from "@/components/BentoGallery";
import { galleryPhotos } from "@/data/gallery";

const CATEGORIES = [
  "All",
  "Wildlife",
  "Adventure",
  "Boat Cruises",
  "Destinations",
  "Nature",
];

const SPAN_PATTERN = [
  "col-span-1 row-span-3 md:col-span-1 md:row-span-3",
  "col-span-2 row-span-2 md:col-span-2 md:row-span-2",
  "col-span-1 row-span-2 md:col-span-1 md:row-span-2",
  "col-span-2 row-span-2 md:col-span-2 md:row-span-2",
  "col-span-1 row-span-3 md:col-span-1 md:row-span-3",
  "col-span-1 row-span-2 md:col-span-1 md:row-span-2",
];

const videos = [
  {
    type: "video",
    title: "Elephant in the Wild",
    desc: "An African elephant roaming freely in its natural habitat.",
    url: "/videos/elephant-wildlife.mp4",
    category: "Wildlife",
    span: "col-span-2 row-span-3 md:col-span-2 md:row-span-3",
  },
  {
    type: "video",
    title: "Hippo in the Water",
    desc: "A hippopotamus wading through a river in Southern Africa.",
    url: "/videos/hippo-water.mp4",
    category: "Wildlife",
    span: "col-span-2 row-span-2 md:col-span-2 md:row-span-2",
  },
  {
    type: "video",
    title: "Buffalo Herd",
    desc: "Cape buffalo grazing on the open savanna.",
    url: "/videos/buffalo-wildlife.mp4",
    category: "Wildlife",
    span: "col-span-1 row-span-3 md:col-span-1 md:row-span-3",
  },
  {
    type: "video",
    title: "Savanna Sunset",
    desc: "The African savanna bathed in golden light as the sun sets.",
    url: "/videos/savanna-sunset-mixkit.mp4",
    category: "Nature",
    span: "col-span-1 row-span-2 md:col-span-1 md:row-span-2",
  },
];

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState("All");

  const allItems = [
    ...videos.map((v, i) => ({ ...v, id: `v${i}` })),
    ...galleryPhotos.map((photo, i) => ({
      id: `p${i}`,
      type: "image",
      title: photo.caption,
      desc: photo.alt,
      url: photo.src,
      category: photo.category,
      span: SPAN_PATTERN[i % SPAN_PATTERN.length],
    })),
  ];

  const filteredItems =
    activeCategory === "All"
      ? allItems
      : allItems.filter((item) => item.category === activeCategory);

  return (
    <div>
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-10 md:mb-14 justify-center">
        {CATEGORIES.map((cat) => {
          const count =
            cat === "All"
              ? allItems.length
              : allItems.filter((i) => i.category === cat).length;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-clay text-ivory shadow-sm"
                  : "bg-ink/[0.05] text-ink/70 hover:bg-ink/[0.1] hover:text-ink"
              }`}
            >
              {cat}
              <span className="ml-1.5 text-xs opacity-60">{count}</span>
            </button>
          );
        })}
      </div>

      <BentoGallery mediaItems={filteredItems} key={activeCategory} />
    </div>
  );
}
