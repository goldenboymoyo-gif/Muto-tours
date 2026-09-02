import Link from "next/link";
import MediaFrame from "./MediaFrame";

export default function ExperienceRow({ experience, reverse = false, index }) {
  return (
    <Link
      href={`/experiences/${experience.slug}`}
      className="group grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center py-10"
    >
      <div
        className={`md:col-span-5 relative aspect-[4/3] rounded-[25px] overflow-hidden ${
          reverse ? "md:col-start-8" : ""
        }`}
      >
        <MediaFrame
          src={experience.image}
          alt={experience.imageAlt}
          label={experience.name}
          sizes="(min-width: 768px) 40vw, 100vw"
          className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </div>
      <div className={`md:col-span-6 ${reverse ? "md:col-start-1 md:row-start-1" : "md:col-start-7"}`}>
        <p className="text-[11px] uppercase tracking-widest2 text-gold mb-3">
          {String(index).padStart(2, "0")} &mdash; {experience.category}
        </p>
        <h3 className="font-archivo uppercase text-2xl sm:text-3xl leading-tight text-ink group-hover:text-gold transition-colors">
          {experience.name}
        </h3>
        <p className="mt-4 text-sm sm:text-base text-ink/70 leading-relaxed max-w-lg">
          {experience.blurb}
        </p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm text-ink/80 group-hover:text-clay transition-colors">
          View experience
          <svg width="16" height="10" viewBox="0 0 16 10" fill="none" className="transition-transform group-hover:translate-x-1">
            <path d="M1 5H15M15 5L11 1M15 5L11 9" stroke="currentColor" strokeWidth="1.3" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
