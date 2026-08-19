import Link from "next/link";
import MediaFrame from "./MediaFrame";

// A four-item category grid — image-led cards, one line each, no
// description — distinct on purpose from ExperienceRow's detailed
// alternating rows further down the page. This is the "browse by kind of
// day" entry point; ExperienceRow further down is the "read the details"
// version of the same content.
export default function SignatureGrid({ items }) {
  return (
    <section className="bg-ivory">
      <div className="container-editorial py-20 md:py-28">
        <div className="max-w-2xl mb-12">
          <p className="text-xs uppercase tracking-widest2 text-clay mb-4">Signature Experiences</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-[2.75rem] leading-[1.1] text-ink text-balance">
            Four ways to spend your days in Southern Africa.
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {items.map((item) => (
            <Link key={item.slug} href={`/experiences/${item.slug}`} className="group block">
              <div className="relative aspect-[3/4]">
                <MediaFrame
                  src={item.image}
                  alt={item.imageAlt}
                  label={item.name}
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-ink/0" />
                <div className="absolute left-0 right-0 bottom-0 p-4 sm:p-5">
                  <h3 className="font-display italic text-base sm:text-lg text-ivory leading-tight">{item.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
