import Link from "next/link";
import MediaFrame from "./MediaFrame";

const countries = [
  {
    name: "Zimbabwe",
    slug: "victoria-falls",
    image: "/images/victoria-falls-mist.jpg",
    imageAlt: "Victoria Falls, Zimbabwe",
    description: "Home to the mighty Victoria Falls and the Zambezi River.",
  },
  {
    name: "Botswana",
    slug: "okavango-delta",
    image: "/images/okavango-delta-aerial.jpg",
    imageAlt: "Okavango Delta, Botswana",
    description: "The Okavango Delta and Chobe's river wildlife.",
  },
  {
    name: "Namibia",
    slug: "namibia",
    image: "/images/deadvlei-dunes.jpg",
    imageAlt: "Deadvlei Dunes, Namibia",
    description: "The oldest desert, towering dunes, and Etosha's waterholes.",
  },
  {
    name: "Zambia",
    slug: "victoria-falls",
    image: "/images/zambezi-sunset-cruise.jpg",
    imageAlt: "Zambezi River, Zambia",
    description: "The Zambezi River and Victoria Falls from the Zambian side.",
  },
  {
    name: "South Africa",
    slug: "south-africa",
    image: "/images/cape-town-coast.jpg",
    imageAlt: "Cape Town, South Africa",
    description: "Kruger National Park and the Cape Town coastline.",
  },
];

export default function CountryGrid() {
  return (
    <section className="bg-ivory">
      <div className="container-editorial py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Destinations heading */}
          <div className="md:col-span-4">
            <h2 className="font-display text-3xl sm:text-4xl text-ink mb-4">Destinations</h2>
            <p className="text-sm text-ink/60 leading-relaxed max-w-sm">
              From the thunder of Victoria Falls to the dunes of Namibia and the waterways of Botswana — explore Southern Africa with Muto Tours.
            </p>
          </div>

          {/* Country cards */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {countries.map((country) => (
              <Link
                key={country.name}
                href={`/destinations/${country.slug}`}
                className="group relative aspect-[4/3] rounded-lg overflow-hidden"
              >
                <MediaFrame
                  src={country.image}
                  alt={country.imageAlt}
                  label={country.name}
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="absolute inset-0 h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <h3 className="font-display italic text-lg text-ivory group-hover:text-gold transition-colors">
                    {country.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
