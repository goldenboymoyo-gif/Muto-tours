import MediaFrame from "./MediaFrame";
import BackLink from "./BackLink";

export default function PageHero({
  src,
  alt,
  kicker,
  title,
  subtitle,
  backHref = "/",
  backLabel = "Home",
  backLight = false,
  height = "h-[52vh] min-h-[380px]",
}) {
  return (
    <section className={`relative ${height} w-full pt-20`}>
      <MediaFrame
        src={src}
        alt={alt}
        priority
        className="absolute inset-0 h-full w-full"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/75" />
      <div className="relative h-full flex items-end">
        <div className="container-editorial pb-14">
          <BackLink
            fallbackHref={backHref}
            fallbackLabel={backLabel}
            className={backLight ? "text-gold hover:text-ivory mb-4" : "text-clay hover:text-clay-dark mb-4"}
          />
          {kicker && (
            <p className={`text-xs uppercase tracking-widest2 mb-4 ${backLight ? "text-gold" : "text-clay"}`}>
              {kicker}
            </p>
          )}
          <h1 className="font-display italic text-4xl sm:text-5xl md:text-6xl text-ivory max-w-3xl text-balance">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 text-ivory/80 text-base sm:text-lg max-w-xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
