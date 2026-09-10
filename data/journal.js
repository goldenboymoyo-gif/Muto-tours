// ---------------------------------------------------------------------------
// MUTO TOURS — Journal content structure
// ---------------------------------------------------------------------------
// Articles are planned topics based on the routes and experiences Muto Tours
// actually offers. No authors or publication dates are fabricated — status
// remains "planned" until real articles are written and published.
const journal = {
  intro:
    "Field notes on travelling through Zimbabwe and Southern Africa — planning, packing and the places worth the journey.",
  categories: [
    "Victoria Falls",
    "Zimbabwe",
    "Safari",
    "Travel Guide",
    "Southern Africa",
  ],
  posts: [
    {
      slug: "best-time-to-visit-victoria-falls",
      title: "Best Time to Visit Victoria Falls",
      excerpt:
        "How the Zambezi changes through the year, and how Victoria Falls is a completely different experience in each season.",
      category: "Victoria Falls",
      status: "planned",
    },
    {
      slug: "what-to-pack-for-a-zimbabwe-safari",
      title: "What to Pack for a Zimbabwe Safari",
      excerpt:
        "A practical packing list for Hwange, Mana Pools and the Zambezi — from layers to binoculars to a spare battery.",
      category: "Travel Guide",
      status: "planned",
    },
    {
      slug: "victoria-falls-vs-chobe",
      title: "Victoria Falls vs Chobe",
      excerpt:
        "Two icons of the region, an easy border apart. How to pair the falls with a Chobe river safari on one route.",
      category: "Southern Africa",
      status: "planned",
    },
    {
      slug: "how-to-plan-a-southern-africa-safari",
      title: "How to Plan a Southern Africa Safari",
      excerpt:
        "A step-by-step guide to building a multi-country journey through Zimbabwe, Botswana and Namibia — without over-planning.",
      category: "Travel Guide",
      status: "planned",
    },
  ],
};

module.exports = { journal };