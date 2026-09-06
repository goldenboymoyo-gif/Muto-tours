// ---------------------------------------------------------------------------
// Gallery — the curated set of real Muto Tours photography.
// Only images actually used by the destination and experience pages are shown
// here; the rest of the old g1–g153 batch was removed from the site.
// ---------------------------------------------------------------------------

const CAPTION = "Muto Tours — Southern Africa";
const ALT = "Real photography from Muto Tours Southern African trips";
const CATEGORY = "Gallery";

const CURATED = [
  1, 8, 9, 14, 19, 28, 30, 40, 46, 56, 61, 62, 64, 65, 71, 74, 79, 91,
  92, 100, 105, 107, 110, 123, 130, 133, 145, 147, 151, 153,
];

export const galleryPhotos = CURATED.map((n) => ({
  src: `/images/gallery/g${n}.jpg`,
  alt: ALT,
  caption: CAPTION,
  category: CATEGORY,
}));