// ---------------------------------------------------------------------------
// Gallery — authentic photography from mutotours.africa.
// The full set of live-site gallery images (g1–g153) is served locally from
// /images/gallery/. Captions/categories are generic because each image's
// specific scene was not individually labelled.
// ---------------------------------------------------------------------------

const CAPTION = "Muto Tours — Southern Africa";
const ALT = "Real photography from a Muto Tours Southern African trip";
const CATEGORY = "Gallery";

export const galleryPhotos = Array.from({ length: 153 }, (_, i) => {
  const n = i + 1;
  return {
    src: `/images/gallery/g${n}.jpg`,
    alt: ALT,
    caption: CAPTION,
    category: CATEGORY,
  };
});
