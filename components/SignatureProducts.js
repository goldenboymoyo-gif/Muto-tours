import Link from "next/link";
import MediaFrame from "./MediaFrame";

const products = [
  {
    title: "River Cruises",
    desc: "Sunset and wildlife cruises along the Zambezi and Chobe rivers.",
    image: "/images/zambezi-sunset-cruise.jpg",
    imageAlt: "Sunset cruise on the Zambezi River",
    href: "/experiences/zambezi-sunset-cruise",
  },
  {
    title: "Safari Drives",
    desc: "Dawn and dusk game drives through Hwange, Chobe, and Etosha.",
    image: "/images/safari-elephants-hq.jpg",
    imageAlt: "Elephants on a safari game drive",
    href: "/experiences/guided-game-drives",
  },
  {
    title: "Cultural Tours",
    desc: "Boma dinners, village visits, and cultural experiences.",
    image: "/images/bushveld-sunset.jpg",
    imageAlt: "Cultural experience in Southern Africa",
    href: "/experiences/boma-cultural-dinner",
  },
  {
    title: "Adventure Activities",
    desc: "Bungee, white-water rafting, and walking safaris.",
    image: "/images/sossusvlei-dune-sky.jpg",
    imageAlt: "Adventure activities in Southern Africa",
    href: "/experiences/sossusvlei-dune-adventure",
  },
];

export default function SignatureProducts() {
  return (
    <section className="bg-sand">
      <div className="container-editorial py-20 md:py-28">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl sm:text-4xl text-ink mb-3">Signature Products</h2>
          <p className="text-sm text-ink/60 max-w-xl mx-auto leading-relaxed">
            Explore Muto Tours' curated selection of experiences — from river cruises to safari drives, each one crafted for an unforgettable African journey.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link
              key={product.title}
              href={product.href}
              className="group relative aspect-[4/3] rounded-lg overflow-hidden"
            >
              <MediaFrame
                src={product.image}
                alt={product.imageAlt}
                label={product.title}
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="absolute inset-0 h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="font-display italic text-lg text-ivory group-hover:text-gold transition-colors">
                  {product.title}
                </h3>
                <p className="text-xs text-ivory/70 mt-1 leading-relaxed line-clamp-2">{product.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
