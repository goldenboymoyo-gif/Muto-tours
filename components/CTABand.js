import Link from "next/link";

export default function CTABand({
  kicker = "Start Planning",
  title = "Your African Safari Experience Begins Here",
  dek = "From exclusive accommodations to curated experiences, we tailor every detail to ensure an unparalleled journey that transcends expectations. Elevate your travel aspirations with our commitment to excellence and seamless service.",
}) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/images/bushveld-sunset.jpg"
          alt=""
          className="w-full h-full object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-ink/70" />
      </div>

      <div className="relative container-editorial py-20 md:py-28 text-center">
        <h2 className="font-display italic text-3xl sm:text-4xl md:text-5xl text-ivory leading-[1.1] text-balance max-w-3xl mx-auto">
          {title}
        </h2>
        <p className="mt-5 text-ivory/80 max-w-lg mx-auto leading-relaxed">{dek}</p>
        <div className="mt-8">
          <Link
            href="/contact"
            className="inline-block text-xs uppercase tracking-widest2 px-10 py-3.5 rounded-sm bg-clay text-ivory hover:bg-clay-dark transition-colors"
          >
            Book Now
          </Link>
        </div>
      </div>
    </section>
  );
}
