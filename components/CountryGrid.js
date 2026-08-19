"use client";

import Link from "next/link";
import MediaFrame from "./MediaFrame";

const countries = [
  {
    name: "Zimbabwe",
    slug: "victoria-falls",
    image: "/images/victoria-falls-mist.jpg",
    imageAlt: "Victoria Falls, Zimbabwe",
    description:
      "Zimbabwe is a landlocked country of rugged terrain and home to incredible numbers of Africa's most-feted wild mammals and extraordinary birdlife.",
    lat: -17.9243,
    lng: 25.8572,
  },
  {
    name: "Botswana",
    slug: "okavango-delta",
    image: "/images/okavango-delta-aerial.jpg",
    imageAlt: "Okavango Delta, Botswana",
    description:
      "Botswana is a landlocked country in Southern Africa with the Okavango Delta, a vast inland river delta, and Chobe National Park, known for its massive elephant herds.",
    lat: -22.3285,
    lng: 24.6849,
  },
  {
    name: "Namibia",
    slug: "namibia",
    image: "/images/deadvlei-dunes.jpg",
    imageAlt: "Deadvlei Dunes, Namibia",
    description:
      "Namibia is a country in southwestern Africa known for the Namib Desert along its Atlantic coast, towering red dunes at Sossusvlei, and Etosha National Park's waterhole game viewing.",
    lat: -22.5609,
    lng: 17.0658,
  },
  {
    name: "Zambia",
    slug: "victoria-falls",
    image: "/images/zambezi-sunset-cruise.jpg",
    imageAlt: "Zambezi River, Zambia",
    description:
      "Zambia is a landlocked country of rugged terrain and home to incredible numbers of Africa's most-feted wild mammals and extraordinary birdlife.",
    lat: -13.1339,
    lng: 27.8493,
  },
  {
    name: "South Africa",
    slug: "south-africa",
    image: "/images/cape-town-coast.jpg",
    imageAlt: "Cape Town, South Africa",
    description:
      "South Africa is a country on the continent's southern tip, with a coastline stretching more than 2,500 km. Home to Kruger National Park and the iconic Table Mountain.",
    lat: -30.5595,
    lng: 22.9375,
  },
];

export default function CountryGrid() {
  return (
    <section className="bg-ivory">
      <div className="container-editorial py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          {/* Left: heading + country cards */}
          <div className="md:col-span-7">
            <h2 className="font-display text-3xl sm:text-4xl text-ink mb-8">Destinations</h2>

            <div className="space-y-4">
              {countries.map((country) => (
                <Link
                  key={country.name}
                  href={`/destinations/${country.slug}`}
                  className="group block relative overflow-hidden rounded-lg"
                >
                  <div className="relative aspect-[16/7]">
                    <MediaFrame
                      src={country.image}
                      alt={country.imageAlt}
                      label={country.name}
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="absolute inset-0 h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/30 to-transparent" />
                    <div className="absolute inset-0 flex items-center">
                      <div className="p-6 max-w-sm">
                        <h3 className="font-display italic text-xl text-ivory group-hover:text-gold transition-colors">
                          {country.name}
                        </h3>
                        <p className="mt-2 text-xs text-ivory/75 leading-relaxed line-clamp-2 hidden sm:block">
                          {country.description}
                        </p>
                        <span className="mt-3 inline-block text-xs uppercase tracking-widest2 text-gold">
                          Go
                          <svg className="inline-block ml-2 w-4 h-4" viewBox="0 0 16 10" fill="none">
                            <path d="M1 5H15M15 5L11 1M15 5L11 9" stroke="currentColor" strokeWidth="1.3" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Right: map of Southern Africa */}
          <div className="md:col-span-5 md:sticky md:top-28">
            <div className="relative rounded-lg overflow-hidden border border-ink/10">
              <img
                src="/images/southern-africa-map.png"
                alt="Map of Southern Africa showing Muto Tours destinations across Zimbabwe, Botswana, Namibia, Zambia, and South Africa"
                className="w-full h-auto"
                loading="lazy"
              />
              {/* Overlay markers on the map */}
              <div className="absolute inset-0">
                {countries.map((country) => {
                  // Position markers based on rough relative coordinates on the map image
                  const positions = {
                    Zimbabwe: { top: "42%", left: "58%" },
                    Botswana: { top: "55%", left: "48%" },
                    Namibia: { top: "45%", left: "28%" },
                    Zambia: { top: "28%", left: "55%" },
                    "South Africa": { top: "72%", left: "45%" },
                  };
                  const pos = positions[country.name];
                  return (
                    <Link
                      key={country.name}
                      href={`/destinations/${country.slug}`}
                      className="absolute group/marker"
                      style={{ top: pos.top, left: pos.left }}
                      title={country.name}
                    >
                      <div className="w-3 h-3 bg-clay rounded-full border-2 border-ivory shadow-md hover:scale-150 transition-transform cursor-pointer" />
                      <span className="absolute left-5 top-1/2 -translate-y-1/2 bg-ink/90 text-ivory text-[10px] uppercase tracking-wider px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover/marker:opacity-100 transition-opacity pointer-events-none">
                        {country.name}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
