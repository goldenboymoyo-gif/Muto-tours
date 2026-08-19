import Link from "next/link";
import MediaFrame from "./MediaFrame";

const products = [
  {
    title: "Safari Drives",
    desc: "Open-vehicle game drives timed for peak wildlife activity, led by experienced local guides.",
    image: "/images/safari-elephants-hq.jpg",
    imageAlt: "Elephants on a safari game drive",
    href: "/experiences/guided-game-drives",
  },
  {
    title: "River Cruises",
    desc: "Sunset and wildlife cruises along the Zambezi and Chobe rivers, with drinks on board.",
    image: "/images/zambezi-sunset-cruise.jpg",
    imageAlt: "Sunset cruise on the Zambezi River",
    href: "/experiences/zambezi-sunset-cruise",
  },
  {
    title: "Tours",
    desc: "Guided walking tours of Victoria Falls, cultural experiences, and full-day excursions.",
    image: "/images/victoria-falls-mist.jpg",
    imageAlt: "Victoria Falls guided tour",
    href: "/experiences/victoria-falls-tour",
  },
  {
    title: "Game Viewing",
    desc: "Multi-day safari circuits through Hwange, Chobe, and Etosha National Parks.",
    image: "/images/etosha-elephant.jpg",
    imageAlt: "Elephant at a waterhole in Etosha",
    href: "/experiences/guided-game-drives",
  },
];

export default function SignatureProducts() {
  return (
    <section className="bg-sand">
      <div className="container-editorial py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-5">
            <h2 className="font-display text-3xl sm:text-4xl text-ink mb-4">Signature Products</h2>
            <p className="text-sm text-ink/65 leading-relaxed max-w-sm">
              Explore Muto Tours&apos; signature products, where luxury meets adventure in the heart of Africa. From exclusive game drives to unforgettable river cruises, immerse yourself in unparalleled experiences tailored for the discerning traveller.
            </p>
          </div>

          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-2 gap-4">
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
                  sizes="(min-width: 768px) 35vw, 50vw"
                  className="absolute inset-0 h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-display italic text-lg text-ivory group-hover:text-gold transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-xs text-ivory/70 mt-1 leading-relaxed line-clamp-2 hidden sm:block">{product.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
