export default function SectionIntro({ kicker, title, dek, align = "left", light = false }) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {kicker && (
        <p className={`text-xs uppercase tracking-widest2 mb-4 ${light ? "text-gold" : "text-clay"}`}>
          {kicker}
        </p>
      )}
      <h2
        className={`font-display text-3xl sm:text-4xl md:text-[2.75rem] leading-[1.1] text-balance ${
          light ? "text-ivory" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {dek && (
        <p className={`mt-5 text-base leading-relaxed ${light ? "text-ivory/75" : "text-ink/70"}`}>
          {dek}
        </p>
      )}
    </div>
  );
}
