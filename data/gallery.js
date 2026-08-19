// ---------------------------------------------------------------------------
// Gallery — every real tourism photo from the project's source folder.
// Excludes 4 images that carried a third-party photographer's watermark
// ("Harrison Photography") — not cleared for use on a marketing site.
// Every photo is a real, unedited photo from the supplied trip folder.
// ---------------------------------------------------------------------------

export const galleryPhotos = [
  // ── Zambezi & Victoria Falls ──────────────────────────────────────────
  { src: "/images/zambezi-sunset-cruise.jpg", alt: "Sunset river cruise on the Zambezi River near Victoria Falls", caption: "Zambezi Sunset Cruise", category: "Boat Cruises" },
  { src: "/images/zambezi-cruise-hq.jpg", alt: "High-quality view of the Zambezi River at golden hour", caption: "Zambezi River at Golden Hour", category: "Boat Cruises" },
  { src: "/images/victoria-falls-mist.jpg", alt: "Mist rising from Victoria Falls, one of the Seven Natural Wonders", caption: "Victoria Falls", category: "Destinations" },
  { src: "/images/river-cruise-boat.jpg", alt: "A cruise boat on the Zambezi River during a sunset excursion", caption: "Zambezi River Cruise", category: "Boat Cruises" },

  // ── Okavango Delta, Botswana ──────────────────────────────────────────
  { src: "/images/okavango-poler.jpg", alt: "A poler guiding a mokoro canoe through the Okavango Delta reeds", caption: "Mokoro Poling, Okavango Delta", category: "Adventure" },
  { src: "/images/okavango-poler-passengers.jpg", alt: "Tourists in a mokoro canoe guided through reed channels", caption: "Mokoro Excursion with Guide", category: "Adventure" },
  { src: "/images/okavango-mokoro-sunset.jpg", alt: "Mokoro dugout canoes silhouetted on the Okavango at sunset", caption: "Okavango Delta Sunset", category: "Nature" },
  { src: "/images/okavango-mekoro-waterside.jpg", alt: "Mokoro canoes at the water's edge in the Okavango Delta", caption: "Okavango Water's Edge", category: "Adventure" },
  { src: "/images/okavango-mekoro-dusk-a.jpg", alt: "Mekoro canoes silhouetted at dusk, Okavango Delta", caption: "Okavango at Dusk", category: "Nature" },
  { src: "/images/okavango-mekoro-dusk-b.jpg", alt: "Mekoro canoes at dusk with reflections on the still water", caption: "Okavango Still Water", category: "Nature" },
  { src: "/images/okavango-dusk-horizon.jpg", alt: "Dusk settling over the Okavango floodplain horizon", caption: "Okavango Floodplain", category: "Nature" },
  { src: "/images/okavango-village-mekoro.jpg", alt: "Mokoro canoes moored along the Okavango bank with cattle grazing", caption: "Okavango Village Life", category: "Culture" },
  { src: "/images/okavango-delta-aerial.jpg", alt: "Aerial view of the Okavango Delta's winding waterways", caption: "Okavango Delta Aerial View", category: "Destinations" },

  // ── Namibia — Sossusvlei & Deadvlei ───────────────────────────────────
  { src: "/images/deadvlei-dunes.jpg", alt: "Orange Namib dunes towering above the white clay pan at Deadvlei", caption: "Deadvlei, Namibia", category: "Destinations" },
  { src: "/images/deadvlei-lone-tree.jpg", alt: "A dead camel-thorn tree against the red dunes at Deadvlei", caption: "Deadvlei Dead Tree", category: "Nature" },
  { src: "/images/sossusvlei-dune-sky.jpg", alt: "A towering Namib desert dune against a cloud-streaked sky", caption: "Sossusvlei Dune", category: "Destinations" },
  { src: "/images/sossusvlei-dune-climb.jpg", alt: "Travelers climbing a massive red dune at Sossusvlei at sunrise", caption: "Dune Climb at Sossusvlei", category: "Adventure" },
  { src: "/images/sossusvlei-panorama.jpg", alt: "Panoramic view across the Sossusvlei dune field", caption: "Sossusvlei Panorama", category: "Destinations" },
  { src: "/images/namibia-dunes-hq.jpg", alt: "The rolling red dunes of the Namib Desert", caption: "Namib Desert Dunes", category: "Nature" },

  // ── Namibia — Wildlife & Landmarks ────────────────────────────────────
  { src: "/images/namibia-oryx.jpg", alt: "A gemsbok (oryx) standing in the Namibian bush", caption: "Gemsbok, Namibia", category: "Wildlife" },
  { src: "/images/namibia-rock-arch.jpg", alt: "A natural rock arch formation in the Namibian landscape", caption: "Namibian Rock Arch", category: "Nature" },
  { src: "/images/quiver-tree.jpg", alt: "A quiver tree against a clear Southern African sky", caption: "Quiver Tree, Namibia", category: "Nature" },

  // ── Namibia — Fish River Canyon ───────────────────────────────────────
  { src: "/images/fish-river-canyon.jpg", alt: "The layered walls of Fish River Canyon, Namibia", caption: "Fish River Canyon", category: "Destinations" },
  { src: "/images/fish-river-canyon-wide.jpg", alt: "A wide view across the hazy layered walls of Fish River Canyon", caption: "Fish River Canyon View", category: "Destinations" },

  // ── Etosha National Park, Namibia ─────────────────────────────────────
  { src: "/images/etosha-elephant.jpg", alt: "An African elephant at a waterhole during a game drive in Etosha", caption: "Elephant at Etosha Waterhole", category: "Wildlife" },
  { src: "/images/etosha-zebra-pair.jpg", alt: "Two zebras standing together on the Etosha salt pan plains", caption: "Zebra Pair, Etosha", category: "Wildlife" },
  { src: "/images/etosha-zebra-foal.jpg", alt: "A zebra with its foal on the open plains of Etosha", caption: "Zebra and Foal, Etosha", category: "Wildlife" },
  { src: "/images/etosha-safari-track.jpg", alt: "Safari vehicles on a game-viewing track in Etosha National Park", caption: "Safari Drive, Etosha", category: "Wildlife" },

  // ── Botswana — Makgadikgadi ───────────────────────────────────────────
  { src: "/images/makgadikgadi-palms-sunset.jpg", alt: "Palm trees silhouetted against a sunset at Makgadikgadi Pans", caption: "Makgadikgadi Pans Sunset", category: "Nature" },

  // ── Safari & Wildlife ─────────────────────────────────────────────────
  { src: "/images/safari-elephants-hq.jpg", alt: "Elephants on a safari game drive in Southern Africa", caption: "Safari Elephant Encounter", category: "Wildlife" },
  { src: "/images/elephants-watering-hole.jpg", alt: "Elephants drinking at a watering hole during the dry season", caption: "Elephants at Watering Hole", category: "Wildlife" },
  { src: "/images/lion-sunset-savanna.jpg", alt: "A lion resting on the savanna during golden hour", caption: "Lion at Golden Hour", category: "Wildlife" },
  { src: "/images/giraffe-acacia.jpg", alt: "A giraffe feeding from an acacia tree on the African plains", caption: "Giraffe at Acacia Tree", category: "Wildlife" },
  { src: "/images/zebra-herd-savanna.jpg", alt: "A herd of zebras grazing on the Southern African savanna", caption: "Zebra Herd, Savanna", category: "Wildlife" },

  // ── Safari Experience ─────────────────────────────────────────────────
  { src: "/images/acacia-safari-vehicle.jpg", alt: "A safari vehicle parked beneath a lone acacia tree on the plains", caption: "Safari Vehicle, Acacia Plains", category: "Experiences" },
  { src: "/images/safari-jeep-road.jpg", alt: "A safari jeep driving through the African bush on a game drive", caption: "Safari Jeep Game Drive", category: "Experiences" },
  { src: "/images/safari-sunset-drive.jpg", alt: "A sunset game drive through the Southern African bushveld", caption: "Sunset Game Drive", category: "Experiences" },
  { src: "/images/savanna-sunset-hq.jpg", alt: "A golden sunset over the Southern African savanna", caption: "Savanna Sunset", category: "Nature" },
  { src: "/images/savanna-sunset-small.jpg", alt: "Sunset light across the open savanna grasslands", caption: "Sunset Over the Savanna", category: "Nature" },
  { src: "/images/savanna-track-sunset.jpg", alt: "A bush track cutting through the savanna at sunset", caption: "Bush Track at Sunset", category: "Experiences" },
  { src: "/images/bushveld-sunset.jpg", alt: "Golden hour light over the Southern African bushveld", caption: "Bushveld Golden Hour", category: "Nature" },

  // ── South Africa ──────────────────────────────────────────────────────
  { src: "/images/cape-town-coast.jpg", alt: "The Cape Town coastline with mountains meeting the ocean", caption: "Cape Town Coastline", category: "Destinations" },
  { src: "/images/road-trip-africa.jpg", alt: "A road trip through the dramatic Southern African landscape", caption: "Road Trip Through Africa", category: "Experiences" },
];
