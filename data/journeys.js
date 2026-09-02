// ---------------------------------------------------------------------------
// Journeys — sample multi-day routes for the homepage's "featured routes"
// section. These are not new invented packages: each name and stop sequence
// is pulled straight from what's already published in data/destinations.js
// and data/experiences.js (the Namibia Explorer arc described in
// destinations.js, the Windhoek-to-Victoria-Falls circuit already laid out
// as the sampleRoute on the custom-safari-itineraries experience, and the
// Zimbabwe-only combination implied by victoria-falls/hwange/matobo-hills'
// own pairsWith fields). No day-count or price is stated here beyond what's
// already established elsewhere on the site (experiences.js: custom
// itineraries typically run 5–15 days) — every route is illustrative and
// quoted individually, same as the rest of the site's pricing stance.
// ---------------------------------------------------------------------------

export const journeys = [
  {
    slug: "namibia-explorer",
    name: "Namibia Explorer",
    countries: ["Namibia"],
    stops: ["Windhoek", "Sossusvlei", "Swakopmund", "Damaraland", "Etosha National Park"],
    blurb:
      "A west-to-north arc through the Namib: the dunes of Sossusvlei, the ghost forest at Deadvlei, the coast road to Swakopmund, and Etosha's floodlit waterholes to close it out.",
    image: "/images/namibia.jpg",
    imageAlt: "Namib desert dunes above the white clay pan at Deadvlei, Namibia",
    destinationSlug: "namibia",
  },
  {
    slug: "windhoek-to-victoria-falls-grand-explorer",
    name: "Windhoek to Victoria Falls Grand Explorer",
    countries: ["Namibia", "Botswana", "Zimbabwe"],
    stops: ["Windhoek", "Sossusvlei", "Swakopmund", "Damaraland", "Etosha", "Okavango Delta / Chobe", "Victoria Falls"],
    blurb:
      "The full multi-country circuit — Namibia's desert and coast, Botswana's Delta and river game viewing, closing at the falls themselves. Runs just as well in reverse.",
    image: "/images/windhoek-vicfalls-15.jpg",
    imageAlt: "Mokoro dugout canoes on the Okavango Delta at sunset",
    destinationSlug: "okavango-delta",
  },
  {
    slug: "grand-tour-of-zimbabwe",
    name: "Grand Tour of Zimbabwe",
    countries: ["Zimbabwe"],
    stops: ["Victoria Falls", "Hwange National Park", "Matobo Hills"],
    blurb:
      "Home ground, in full: the falls and the Zambezi, Hwange's elephant herds, and Matobo's granite kopjes with rhino tracking on foot.",
    image: "/images/zimtour.jpg",
    imageAlt: "Golden-hour river cruise on the Zambezi near Victoria Falls",
    destinationSlug: "victoria-falls",
  },
];
