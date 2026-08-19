import { brand } from "@/data/brand";

// A typographic wordmark + simple sun-over-river mark, built entirely in SVG
// so the site never depends on a missing logo image file. The mark reads as
// a horizon line under a rising sun — Zambezi sunset, not a generic AI icon.
// Swap this component out wholesale once final logo artwork exists; nothing
// else in the codebase references logo geometry directly.
export default function Logo({ variant = "dark", className = "" }) {
  const isLight = variant === "light";
  const inkColor = isLight ? "#FBF8F2" : "#211D18";
  const clayColor = "#B5502B";
  const goldColor = "#D9A441";

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
        <circle cx="17" cy="13" r="7" fill={clayColor} />
        <path
          d="M2 22C2 22 8 18 17 18C26 18 32 22 32 22"
          stroke={goldColor}
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M0 27C5 25.5 12 25.5 17 27C22 28.5 29 28.5 34 27"
          stroke={inkColor}
          strokeOpacity="0.35"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className="font-display text-lg tracking-wide"
          style={{ color: inkColor }}
        >
          {brand.name}
        </span>
        <span
          className="text-[10px] uppercase tracking-widest2 mt-0.5"
          style={{ color: isLight ? "#D9A441" : "#B5502B" }}
        >
          Southern Africa
        </span>
      </span>
    </span>
  );
}
