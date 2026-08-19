import Image from "next/image";

// Renders a photo when one exists, or a deliberate editorial placeholder
// when it doesn't — never a broken image or a generic stock substitute.
// Several destinations/experiences in data/*.js ship with image: null
// because no cleared photography exists for them yet; this makes that an
// intentional design state rather than a bug.
export default function MediaFrame({
  src,
  alt,
  label,
  fill = true,
  sizes = "100vw",
  priority = false,
  className = "",
}) {
  // Callers either drop this component into a sized wrapper (DestinationTile,
  // ExperienceRow — plain `relative` fills that wrapper) or use it as a
  // full-bleed hero background and pass `absolute inset-0 ...` to override
  // the default. Both `relative` and `absolute` utilities set the same CSS
  // `position` property, so if both ever land in the class list together,
  // Tailwind's stylesheet order — not the order they're written here —
  // decides which one wins, silently breaking the "absolute" case. Only add
  // the default when the caller hasn't already specified a position.
  const hasPositionOverride = /(^|\s)(absolute|fixed|sticky|static)(\s|$)/.test(className);
  const base = hasPositionOverride ? "" : "relative ";

  if (!src) {
    // Deliberately does NOT render `label` here — every caller (DestinationTile,
    // ExperienceRow, detail-page heroes) already places its own title text
    // over or beside this frame, so repeating it here would double it up.
    // This is just the decorative "no photo yet" backdrop. Uses the warm
    // sand-deep tone rather than the dark river-green, so it reads as a
    // quiet design placeholder rather than a broken/loading image.
    return (
      <div
        className={`${base}bg-sand-deep overflow-hidden ${className}`}
        role="img"
        aria-label={`${label} — photography coming soon`}
      >
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.35]"
          preserveAspectRatio="none"
          viewBox="0 0 400 300"
          aria-hidden="true"
        >
          <path d="M0 220 C 80 180, 140 260, 220 200 S 340 150, 400 190 L 400 300 L 0 300 Z" fill="#D9A441" fillOpacity="0.35" />
          <circle cx="320" cy="70" r="46" fill="#B5502B" fillOpacity="0.2" />
        </svg>
      </div>
    );
  }

  return (
    <div className={`${base}overflow-hidden bg-sand-deep ${className}`}>
      <Image
        src={src}
        alt={alt || label}
        fill={fill}
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    </div>
  );
}
