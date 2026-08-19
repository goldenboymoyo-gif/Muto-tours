// ---------------------------------------------------------------------------
// Experiences — built from the activity types that actually appear across
// real Southern-Africa itineraries Muto Tours' network runs (guided falls
// tours, Zambezi sunset cruises, mokoro excursions, boma dinners, dune
// climbs, game drives) plus the custom-itinerary model and package list
// published on mutotours.africa. No per-activity pricing is invented, and no
// itinerary, lodge, or pricing detail is drawn from another operator's
// client quotes — see `pricingNote` on each entry.
// ---------------------------------------------------------------------------

export const experiences = [
  {
    slug: "custom-safari-itineraries",
    category: "Trip Planning",
    name: "Custom Multi-Day Safari Itineraries",
    tagline: "The trip built around you, not the other way round",
    location: "Zimbabwe, Botswana, Namibia & South Africa",
    duration: "Typically 5–15 days",
    blurb:
      "This is the core of what Muto Tours does: a route stitched together across two, three, or four countries, priced and paced for the travelers taking it.",
    description:
      "Most Muto Tours clients don't book a single activity — they book a route. A typical itinerary opens in Namibia's dunes or Zimbabwe's own Zambezi, threads through Botswana's Chobe and Okavango, and closes at Victoria Falls or a Johannesburg departure. Every day carries its own accommodation, meal plan, and activity slate, built around a traveler's pace, budget, and interests rather than a fixed template. Packages range from short 3-to-6-day Victoria Falls, Hwange, and Chobe combinations to full multi-country circuits like the Namibia Explorer, the Grand Tour of Zimbabwe, or the Windhoek to Victoria Falls Grand Explorer.\n\nTravel style is chosen up front and shapes everything downstream: luxury lodges, comfortable mid-range accommodation, or authentic camping, in any mix across the route. Longer circuits (8 days and up) typically cross two or three countries and involve several road-transfer days of a few hours each between stops, plus at least one border crossing — this is normal for the region and is built into the day-by-day pacing rather than treated as dead time.",
    image: "/images/sossusvlei-dune-climb.jpg",
    imageAlt: "Travelers climbing a red dune at Sossusvlei, Namibia, on a multi-day Southern Africa route",
    gallery: ["/images/sossusvlei-dune-sky.jpg", "/images/okavango-mokoro-sunset.jpg", "/images/zambezi-sunset-cruise.jpg", "/images/etosha-zebra-pair.jpg"],
    sampleRoute: {
      label: "One way this can run — a Namibia-to-Zimbabwe circuit",
      stops: [
        "Windhoek, Namibia — arrival",
        "Sossusvlei — dunes and Deadvlei",
        "Swakopmund — coastal town, scenic drives",
        "Damaraland — rock art, desert-adapted wildlife",
        "Etosha National Park — floodlit waterhole game viewing",
        "Okavango Delta / Chobe, Botswana — mokoro and river game drives",
        "Victoria Falls, Zimbabwe — the falls, sunset cruise, departure",
      ],
      note: "Illustrative only — every route is built and quoted around your own dates, pace, and interests, and can just as easily run in reverse, start in South Africa, or stay within a single country.",
    },
    highlights: [
      "Multi-country routing across Zimbabwe, Botswana, Namibia, and South Africa",
      "Accommodation matched to your comfort level, from tented camps to lodges",
      "Day-by-day activity planning with local guides at each stop",
      "Airport transfers and cross-border logistics handled end to end",
    ],
    included: [
      "Accommodation as specified in your itinerary",
      "Meals as noted per day (breakfast / dinner / full board varies by stop)",
      "Road transfers between destinations on your route",
      "Activities listed in your day-by-day itinerary",
    ],
    excluded: [
      "International flights to and from Southern Africa",
      "Visas and cross-border entry fees",
      "Travel insurance",
      "Items of a personal nature and gratuities",
    ],
    pricingNote:
      "Every route is quoted individually, based on your dates, party size, and choice of accommodation. Request a custom quote for exact pricing.",
  },
  {
    slug: "victoria-falls-tour",
    category: "Sightseeing",
    name: "Victoria Falls Guided Tour",
    tagline: "The falls, on foot, with someone who knows every viewpoint",
    location: "Victoria Falls, Zimbabwe",
    duration: "Half day",
    blurb:
      "A walking tour through the rainforest viewpoints of one of the Seven Natural Wonders of the World, timed to avoid both the crowds and the worst of the midday spray-out.",
    description:
      "Victoria Falls is best seen slowly and with a guide who can tell you which viewpoint will actually be visible that day — spray density changes by season and can hide the falls entirely from the wrong angle at the wrong time. The walking route covers the main viewpoints along the rainforest trail on the Zimbabwean side, with commentary on the geology, history, and the Kololo name Mosi-oa-Tunya, the smoke that thunders.\n\nHigh-water season (roughly April to June) brings the heaviest flow and the most dramatic spray, though visibility at some viewpoints can drop to almost nothing on the wettest days; low-water season (September to December) trades some of that drama for a clear view of the rock face and gorge. Either way, a rain jacket or poncho is worth having — the spray reaches well past the viewpoints on the Zimbabwean side.",
    image: "/images/bushveld-sunset.jpg",
    imageAlt: "Golden hour over the Southern African bush",
    gallery: ["/images/acacia-safari-vehicle.jpg"],
    highlights: [
      "Rainforest trail walking tour with a local guide",
      "Best-viewpoint timing based on seasonal water levels",
      "Optional add-on: helicopter flight over the falls",
      "Easily paired with a Zambezi sunset cruise the same day",
    ],
    included: ["Local guide", "Park entry", "Transfers to and from your Victoria Falls accommodation"],
    excluded: ["Optional activities (helicopter flights, bridge activities)", "Gratuities"],
    pricingNote: "Included in custom itineraries, or booked as a standalone day activity. Request a quote for current rates.",
  },
  {
    slug: "zambezi-sunset-cruise",
    category: "Boat Cruise",
    name: "Zambezi Sunset Cruise",
    tagline: "Elephants on the bank, the sky doing something ridiculous",
    location: "Zambezi River, Victoria Falls",
    duration: "2–3 hours, late afternoon",
    blurb:
      "A slow boat upriver from Victoria Falls as the light goes gold, with drinks on board and a fair chance of elephant, hippo, and crocodile sightings along the bank.",
    description:
      "The Zambezi above the falls is wide, calm, and lined with the kind of wildlife you'd otherwise need a vehicle and a lot of luck to find in one sitting. The sunset cruise is unhurried by design — the boat idles along the bank rather than chasing sightings, and the sky over the river does most of the work as the sun drops.\n\nBoats depart from jetties a short transfer from town, upstream of the falls themselves — there's no risk of drifting toward the edge, despite how it might sound. It's one of the more reliably relaxed activities on a Victoria Falls stop, which is why it's so often paired with a more physical day (the falls walk, white-water rafting, or a game drive) earlier on.",
    image: "/images/zambezi-sunset-cruise.jpg",
    imageAlt: "Sunset boat cruise on the Zambezi River near Victoria Falls",
    gallery: [],
    highlights: [
      "Wildlife viewing from the water: elephant, hippo, crocodile, and birdlife",
      "Drinks and snacks included on most departures",
      "Golden-hour photography conditions",
      "Frequently paired with a Boma dinner the same evening",
    ],
    included: ["Boat cruise with skipper and guide", "Welcome drink and snacks"],
    excluded: ["Hotel transfers (available on request)", "Gratuities"],
    pricingNote: "Included in custom itineraries, or booked as a standalone activity. Request a quote for current rates.",
  },
  {
    slug: "okavango-mokoro-excursion",
    category: "Adventure",
    name: "Okavango Mokoro Excursion",
    tagline: "No engine, no noise, no hurry",
    location: "Okavango Delta, Botswana",
    duration: "Half day to multi-day",
    blurb:
      "A traditional dugout canoe, poled through the reed channels of the Delta by a local guide, with island bush walks worked in along the way.",
    description:
      "The mokoro is the original way to move through the Okavango — a narrow dugout canoe poled from the stern, low enough to the water to put you at eye level with the lily pads and the reeds. Muto Tours books mokoro excursions as half-day add-ons from Maun or, for clients who want the full immersion, as overnight island camping with bush walks led by Delta-based guides.\n\nWater levels vary by season — the Delta floods between roughly June and August as water arrives from rainfall in the Angolan highlands months earlier, so channel depth and which islands are reachable can shift through the year. Whichever season you travel in, this is a slow, quiet activity by design: no motors are used on a mokoro, so wildlife along the banks — including plenty of birdlife — tends to stay close rather than bolt at the sound of an engine.",
    image: "/images/okavango-mokoro-sunset.jpg",
    imageAlt: "Mokoro dugout canoes on the Okavango Delta at sunset",
    gallery: ["/images/okavango-poler.jpg", "/images/okavango-mekoro-waterside.jpg", "/images/okavango-poler-passengers.jpg", "/images/okavango-village-mekoro.jpg"],
    highlights: [
      "Traditional mokoro poling through Delta channels",
      "Guided bush walks on Delta islands",
      "Option for overnight island camping",
      "Small groups, local Delta-based guides",
    ],
    included: ["Mokoro and poler guide", "Life jacket and safety briefing"],
    excluded: ["Delta flight transfers (quoted separately)", "Overnight camping gear, where applicable"],
    pricingNote: "Included in custom itineraries. Request a quote for current rates.",
  },
  {
    slug: "boma-cultural-dinner",
    category: "Culture & Entertainment",
    name: "Boma Dinner & Cultural Evening",
    tagline: "Local dishes, drumming, and a fire that stays lit late",
    location: "Victoria Falls, Zimbabwe",
    duration: "Evening, 3+ hours",
    blurb:
      "A traditional open-air boma dinner with a broad spread of Southern African dishes, followed by local dance and drumming around the fire.",
    description:
      "The boma format is built for a group at the end of a long day of activity — an open-air dining area, a wide-ranging menu that runs from local specialties to more familiar dishes, and a live show of traditional dance and drumming once the plates are cleared. It's one of the more social evenings on a Muto Tours itinerary, and usually pairs well with a Zambezi sunset cruise or a falls tour earlier the same day.\n\n\"Boma\" refers to the enclosed open-air gathering space itself, a format used across several Southern African countries for exactly this kind of communal evening. Dietary requirements are easy to accommodate given the range on offer — worth mentioning when you book so the venue can plan for it.",
    image: "/images/okavango-mekoro-waterside.jpg",
    imageAlt: "Evening light over a Southern African waterside",
    gallery: [],
    highlights: [
      "Wide-ranging Southern African menu",
      "Live traditional dance and drumming",
      "Open-air, fire-lit setting",
      "Popular pairing with the Zambezi sunset cruise",
    ],
    included: ["Dinner and one welcome drink", "Cultural performance"],
    excluded: ["Transfers (available on request)", "Additional beverages"],
    pricingNote: "Included in custom itineraries, or booked as a standalone evening. Request a quote for current rates.",
  },
  {
    slug: "sossusvlei-dune-adventure",
    category: "Nature & Adventure",
    name: "Sossusvlei & Namib Desert Adventure",
    tagline: "The tallest dunes you'll ever stand on top of",
    location: "Namib-Naukluft, Namibia",
    duration: "Full day, best at sunrise",
    blurb:
      "A pre-dawn departure to beat the heat, a climb up one of the Namib's towering red dunes, and a walk out across the white clay pan at Deadvlei.",
    description:
      "Sossusvlei is worth the early start. Departing before sunrise means reaching the dunes as the light turns them from grey to deep red, and the temperature is still manageable for the climb — daytime highs in the Namib can climb well past what's comfortable for a dune ascent by mid-morning, especially outside winter. From the ridge of a major dune, Deadvlei's dead camel-thorn trees are visible below — a stark white clay pan that hasn't held standing water in centuries, ringed by dunes among the tallest in the world.\n\nAccess to the pan is via a gravel road from the park gate to a car park, then either a soft-sand 4x4 transfer or a roughly 4-5km walk in, depending on the vehicle and the day's plan. This is a full-day activity by the time travel, the climb, and the walk out to Deadvlei are all accounted for.",
    image: "/images/sossusvlei-dune-sky.jpg",
    imageAlt: "Namib desert dune against a cloud-streaked sky at Sossusvlei",
    gallery: ["/images/sossusvlei-dune-climb.jpg", "/images/deadvlei-dunes.jpg", "/images/deadvlei-lone-tree.jpg", "/images/quiver-tree.jpg"],
    highlights: [
      "Pre-dawn departure for optimal light and temperature",
      "Guided dune climb (Dune 45 or Big Daddy, conditions dependent)",
      "Walk out to Deadvlei's fossilised camel-thorn trees",
      "4x4 transfer through the Namib-Naukluft park gate",
    ],
    included: ["4x4 transfer and park entry", "Guide"],
    excluded: ["Meals (packed breakfast available on request)", "Gratuities"],
    pricingNote: "Included in custom Namibia itineraries. Request a quote for current rates.",
  },
  {
    slug: "guided-game-drives",
    category: "Wildlife",
    name: "Guided Safari Game Drives",
    tagline: "Dawn and dusk, when the bush actually moves",
    location: "Hwange, Chobe & Etosha National Parks",
    duration: "3–4 hours, morning or evening",
    blurb:
      "Open-vehicle game drives timed for the hours wildlife is actually active, led by guides who know their park's territory down to individual herds.",
    description:
      "A game drive is only as good as its timing and its guide, and Muto Tours builds both in deliberately — dawn departures before the heat settles in, evening drives that run past sunset into the first hour of dark when nocturnal activity picks up. Guides are matched to whichever park is on the itinerary, whether that's Hwange's elephant-dense woodland, Chobe's riverfront, or Etosha's floodlit waterholes.\n\nEach of the three parks rewards a slightly different pace. Hwange's pumped waterholes concentrate wildlife especially in the dry season (May to October); Chobe's riverfront is often worked as a combination of vehicle drive and boat cruise rather than drive alone; Etosha's waterholes, several of them floodlit at the larger rest camps, mean worthwhile game viewing doesn't stop when the sun goes down. Vehicles are open-sided for visibility and photography, with a raised seating layout so every row has a clear line of sight.",
    image: "/images/etosha-elephant.jpg",
    imageAlt: "African elephant at a waterhole on a guided game drive",
    gallery: ["/images/etosha-safari-track.jpg", "/images/etosha-zebra-pair.jpg", "/images/etosha-zebra-foal.jpg", "/images/namibia-oryx.jpg"],
    highlights: [
      "Dawn and dusk departures for peak wildlife activity",
      "Open safari vehicles with experienced local guides",
      "Available across Hwange, Chobe, and Etosha",
      "Night drives available where park regulations permit",
    ],
    included: ["Open safari vehicle and guide", "Park fees where applicable"],
    excluded: ["Meals", "Gratuities"],
    pricingNote: "Included in custom itineraries. Request a quote for current rates.",
  },
];

export function getExperienceBySlug(slug) {
  return experiences.find((e) => e.slug === slug);
}
