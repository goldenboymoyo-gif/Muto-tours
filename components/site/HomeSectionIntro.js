export default function HomeSectionIntro({
  kicker,
  title,
  dek,
  align = "left",
  light = false,
}) {
  return (
    <div
      className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      {kicker && (
        <p className="eyebrow text-bronze mb-4">{kicker}</p>
      )}
      <h2
        className={`font-display text-4xl sm:text-5xl leading-[1.05] text-balance ${
          light ? "text-white" : "text-charcoal"
        }`}
      >
        {title}
      </h2>
      {dek && (
        <p
          className={`mt-5 text-base leading-relaxed font-ui ${
            light ? "text-ivory/70" : "text-ink/65"
          }`}
        >
          {dek}
        </p>
      )}
    </div>
  );
}