// ---------------------------------------------------------------------------
// Destinations — sourced from mutotours.africa's published coverage area
// (packages, key destinations list) and real Southern-Africa route logistics.
// Copy is original. No pricing, lodge names, or trip specifics are lifted
// from third-party quote documents belonging to other tour operators.
//
// Hwange, South Africa, and Matobo Hills didn't have their own cleared
// photography in the supplied image set, so each borrows a generic,
// non-landmark-specific safari photo from elsewhere in that set (noted
// inline below) rather than shipping a "coming soon" placeholder. Swap in
// real photography for these three the moment it's available — search this
// file for "stand-in".
// ---------------------------------------------------------------------------

export const destinations = [
  {
    slug: "victoria-falls",
    name: "Victoria Falls",
    country: "Zimbabwe",
    region: "The Zambezi",
    tagline: "Mosi-oa-Tunya — the smoke that thunders",
    blurb:
      "Muto Tours is based a short walk from the spray. This is home ground: the falls at dawn before the crowds, the Zambezi at last light, and the town's best guides on speed-dial.",
    description:
      "Every Southern Africa journey Muto Tours builds either starts or ends here, in the town that grew up around the world's largest sheet of falling water. Locally it's known as Mosi-oa-Tunya — the smoke that thunders — and the name undersells it. You feel the falls before you see them: a column of spray visible for kilometres, a low roar that gets into your chest. Beyond the viewpoints, Victoria Falls town is the adrenaline capital of the region and the gateway to the Zambezi itself, where sunset cruises drift past elephants drinking on the bank.\n\nThe falls straddle the border of Zimbabwe and Zambia, and the Zimbabwean side carries the majority of the main viewpoints along a signposted rainforest trail — roughly 90 minutes on foot at an easy pace, longer with photo stops. Spray levels change through the year: April to June, after the summer rains, the volume is at its heaviest and the mist can hide the falls themselves from close range; by late September through December, the flow drops and the rock face and gorge become clearly visible. Neither season is a wrong time to visit — they're simply different experiences of the same place.\n\nBecause Victoria Falls Airport handles direct and connecting flights from Johannesburg and other regional hubs, most Muto Tours itineraries either open or close here, with the town used as a base for a few nights before or after the harder travel days further into Botswana or Namibia.",
    image: "/images/zambezi-sunset-cruise.jpg",
    imageAlt: "Golden-hour river cruise on the Zambezi near Victoria Falls",
    highlights: [
      "Guided walking tour of the falls and rainforest viewpoints",
      "Sunset cruise on the Zambezi River",
      "Access to bungee, gorge swing, and white-water rafting operators",
      "Boma-style dinner with local dance and cuisine",
    ],
    pairsWith: ["chobe-national-park", "hwange-national-park"],
  },
  {
    slug: "hwange-national-park",
    name: "Hwange National Park",
    country: "Zimbabwe",
    region: "Matabeleland North",
    tagline: "Zimbabwe's largest wilderness, and its biggest herds",
    blurb:
      "Hwange holds more elephants than any park in the country — often several hundred at a single waterhole in the dry season. Slow game drives, real quiet, real bush.",
    description:
      "Hwange doesn't perform for visitors. It's Zimbabwe's largest national park at roughly 14,600 square kilometres — bigger than the country of Kuwait — and the reward for patience here is scale: elephant herds that take twenty minutes to cross a road, painted wolves (African wild dogs, one of the continent's rarest predators), and a birdlist that runs past 400 species. Muto Tours builds Hwange in as a slower chapter — two or three nights, dawn and dusk game drives, and evenings around a fire listening to what's moving in the dark just beyond camp.\n\nHwange has no permanent natural water source of its own, so its waterholes are pumped, which concentrates wildlife around them in a way few other parks can match, especially through the dry winter months (roughly May to October) when animals have fewer places to drink. It sits close enough to Victoria Falls — around 2 to 3 hours by road — that a short Hwange add-on is one of the more straightforward ways to extend a Falls-based trip into a proper game-viewing chapter, matching the kind of short safari extension Muto Tours regularly builds alongside a Victoria Falls stay.",
    image: "/images/acacia-safari-vehicle.jpg", // stand-in (a generic safari-vehicle photo from the trip folder, not shot in Hwange) — swap for real Hwange photography when available
    imageAlt: "A safari vehicle beneath a lone acacia tree on a game drive",
    highlights: [
      "Dawn and dusk game drives with local guides",
      "Some of Southern Africa's largest elephant herds",
      "Painted wolf (African wild dog) sightings",
      "Night drives and bush-camp evenings",
    ],
    pairsWith: ["victoria-falls", "chobe-national-park"],
  },
  {
    slug: "chobe-national-park",
    name: "Chobe National Park",
    country: "Botswana",
    region: "Kasane",
    tagline: "The river that never runs dry",
    blurb:
      "A short border crossing from Victoria Falls, Chobe trades bush tracks for a boat deck — game viewing from the water, elephant and buffalo herds thick along the banks.",
    description:
      "Chobe is often paired with Victoria Falls on a Muto Tours itinerary, and the pairing works because the two destinations show Africa from opposite angles — one on foot and by vehicle, the other from a flat-bottomed boat gliding along the Chobe River. The park holds one of the continent's densest elephant populations — estimates for the wider Chobe ecosystem run well into six figures — and a late-afternoon cruise puts you close enough to hear them drink.\n\nThe crossing from Victoria Falls into Chobe (via Kazungula, at the point where Zimbabwe, Zambia, Botswana, and Namibia meet) is typically a half-day affair by road, which is why Chobe works well as a single overnight extension or as the first leg of a longer Botswana route toward Maun and the Okavango Delta. Game viewing here splits naturally into two rhythms: a vehicle-based game drive through the riverfront and woodland, and a river cruise where hippos, crocodiles, and the birdlife along the banks come into much closer range than they would from a vehicle.",
    image: "/images/chobe.jpeg",
    imageAlt: "Scenic view of Chobe National Park, Botswana",
    highlights: [
      "River cruise game viewing along the Chobe River",
      "Dense elephant and buffalo populations",
      "Combined day trips from Victoria Falls",
      "Birding along the floodplain",
    ],
    pairsWith: ["victoria-falls", "okavango-delta"],
  },
  {
    slug: "okavango-delta",
    name: "Okavango Delta & Maun",
    country: "Botswana",
    region: "North-West District",
    tagline: "A desert that floods, and a delta unlike anywhere else",
    blurb:
      "The Okavango never reaches the sea — it fans out into the Kalahari and disappears. What's left is a maze of channels, reed islands, and mokoro canoes poled in complete silence.",
    description:
      "There's no engine on a mokoro. The traditional dugout canoe is poled through the reeds by a local guide, low enough to the water that you're at eye level with the lily pads, and the only sound is the pole finding the bottom. Muto Tours routes clients into the Delta from Maun for exactly this — a change of pace from vehicle-based safari, and a landscape that photographs like nowhere else in Southern Africa.\n\nThe Delta is a UNESCO World Heritage Site and one of the few large wetlands in the world that floods in the dry season rather than the wet one — water that falls as rain in the Angolan highlands months earlier arrives here between roughly June and August, right as the surrounding Kalahari is at its driest, drawing wildlife toward the water in large numbers. Maun, the gateway town, is where road travel usually ends and Delta access begins, whether that's a mokoro trip from a mainland lodge or a light-aircraft transfer into a camp deeper in the wetland itself.",
    image: "/images/okavango-poler.jpg",
    imageAlt: "A poler guiding a traditional mokoro canoe through the Okavango Delta reeds",
    highlights: [
      "Traditional mokoro (dugout canoe) excursions",
      "Guided bush walks on Delta islands",
      "Light-aircraft transfers over the floodplain",
      "Sunset departures from the water's edge",
    ],
    gallery: [
      "/images/okavango-mekoro-waterside.jpg",
      "/images/okavango-poler-passengers.jpg",
      "/images/okavango-village-mekoro.jpg",
      "/images/okavango-mekoro-dusk-a.jpg",
      "/images/okavango-mekoro-dusk-b.jpg",
      "/images/okavango-dusk-horizon.jpg",
    ],
    pairsWith: ["chobe-national-park", "namibia"],
  },
  {
    slug: "namibia",
    name: "Namibia",
    country: "Namibia",
    region: "Sossusvlei · Swakopmund · Etosha",
    tagline: "The oldest desert on earth, and the dunes to prove it",
    blurb:
      "Namibia is usually the opening chapter of a Muto Tours multi-country route — the towering red dunes of Sossusvlei, the ghost forest at Deadvlei, and Etosha's floodlit waterholes.",
    description:
      "Namibia works best as a slow build: a night or two in Windhoek, then west into the Namib, where the dunes at Sossusvlei rise higher than most buildings you've stood next to. Deadvlei, the white clay pan ringed by 900-year-old dead camel-thorn trees, is one of the most photographed landscapes on the continent for good reason. From there the route usually runs to the coast at Swakopmund, then north through Damaraland to Etosha, where a floodlit waterhole can put a dozen species in frame at once after dark.\n\nThis west-to-north arc — Windhoek, Sossusvlei, Swakopmund, Damaraland, Etosha — is the backbone of Muto Tours' own Namibia Explorer package, and it's also the shape most longer multi-country routes take when Namibia is combined with Botswana and Zimbabwe: Namibia opens the trip in the desert and coast, then the route moves east into the Delta and Chobe before finishing at Victoria Falls, or the reverse. Distances between stops are real — Namibia is a big, sparsely populated country, and road transfer days of several hours between destinations are normal and are built into the pacing rather than rushed.",
    image: "/images/deadvlei-dunes.jpg",
    imageAlt: "Namib desert dunes above the white clay pan at Deadvlei, Namibia",
    highlights: [
      "Sunrise dune climbs at Sossusvlei",
      "Deadvlei's fossilised camel-thorn trees",
      "Fish River Canyon, the second largest canyon on earth",
      "Floodlit waterhole game viewing in Etosha National Park",
    ],
    gallery: [
      "/images/deadvlei-lone-tree.jpg",
      "/images/sossusvlei-dune-sky.jpg",
      "/images/quiver-tree.jpg",
      "/images/namibia-oryx.jpg",
      "/images/namibia-rock-arch.jpg",
      "/images/fish-river-canyon-wide.jpg",
      "/images/etosha-zebra-pair.jpg",
      "/images/etosha-zebra-foal.jpg",
    ],
    pairsWith: ["okavango-delta", "victoria-falls"],
  },
  {
    slug: "south-africa",
    name: "South Africa",
    country: "South Africa",
    region: "Johannesburg · Kruger National Park",
    tagline: "A gateway city, and one of Africa's great parks",
    blurb:
      "Often the arrival or departure point on a longer Muto Tours route, with Kruger National Park close enough for a proper Big Five safari extension.",
    description:
      "Johannesburg is the region's main air hub, which makes it a natural start or end point for a longer Southern Africa itinerary — Muto Tours' own Johannesburg to Victoria Falls Safari Adventure runs this exact route in reverse of the more common Victoria-Falls-first pattern. Kruger National Park, a few hours' drive or a short flight from Johannesburg, is one of Africa's largest and best-established game reserves, with a road network and lodge infrastructure that makes it comfortable for a first or last safari stop on a longer circuit.\n\nMuto Tours extends South African legs out to Kruger for clients who want a classic Big Five safari (lion, leopard, elephant, rhino, and buffalo) alongside the Zambezi and Okavango chapters of a trip. Because Kruger sits on the opposite side of the region from Victoria Falls and the Okavango, it's usually built in as a bookend — the first or last stop — rather than a stop in the middle of a route.",
    image: "/images/savanna-sunset-small.jpg", // stand-in — a generic savanna sunset photo from the trip folder, not shot in Kruger/Johannesburg — swap for real photography when available
    imageAlt: "Sunset over the Southern African savanna",
    highlights: [
      "Big Five game drives in Kruger National Park",
      "Convenient international air access via Johannesburg",
      "Private and small-group safari vehicles",
      "Combinable with any Zimbabwe or Botswana itinerary",
    ],
    pairsWith: ["victoria-falls"],
  },
  {
    slug: "matobo-hills",
    name: "Matobo Hills",
    country: "Zimbabwe",
    region: "Matabeleland South",
    tagline: "Balancing granite, ancient rock art, and Zimbabwean history",
    blurb:
      "A UNESCO World Heritage site of sculpted granite kopjes, San rock art, and rhino tracking on foot — a different register of Zimbabwe than the Zambezi.",
    description:
      "Matobo trades water and wildlife spectacle for something quieter: whaleback granite hills balanced improbably on top of each other, San rock paintings that predate written history in the region by thousands of years, and some of the best rhino tracking on foot in Zimbabwe. It's usually built into an itinerary as a cultural and geological counterpoint to the Falls and the bigger parks.\n\nThe park sits a couple of hours' drive from Bulawayo, Zimbabwe's second city, which puts it slightly off the main Victoria-Falls-to-Chobe travel corridor most Southern Africa routes follow — so a Matobo stop generally works best as a deliberate detour or a dedicated day trip rather than a stop travelers stumble into along the way. Rhino tracking here is done on foot with an armed ranger, at a walking pace and a respectful distance, which is a markedly different kind of wildlife encounter than a vehicle-based game drive elsewhere on a Muto Tours route.",
    image: "/images/savanna-track-sunset.jpg", // stand-in — a generic bush-track sunset photo from the trip folder, not shot at Matobo — swap for real granite-kopje photography when available
    imageAlt: "Sunset over a Southern African bush track",
    highlights: [
      "Guided rhino tracking on foot",
      "San (Bushman) rock art sites",
      "Cecil Rhodes' grave and colonial-era history",
      "Sculpted granite kopje landscapes",
    ],
    pairsWith: ["victoria-falls"],
  },
];

export function getDestinationBySlug(slug) {
  return destinations.find((d) => d.slug === slug);
}
