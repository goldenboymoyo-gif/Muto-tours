"use client";

import Link from "next/link";

// ---------------------------------------------------------------------------
// Button — single source of truth for every call-to-action on the site.
// Pill-shaped, with a soft lift-and-shadow on hover rather than the old
// sharp-edged rectangles. Renders a Next.js <Link> when `href` is passed, or
// a plain <button> otherwise (for form submits).
//
// Variants:
//   primary  — solid clay fill wrapped in a slow-rotating gold/clay gradient
//              ring (see .rotating-gradient in app/globals.css), ivory text.
//              Default — the site's strongest call-to-action style. Works on
//              both light and dark backgrounds since the ring itself is
//              opaque, not a mask of whatever's behind it.
//   outline  — clay border and text, fills clay on hover. Use on light/sand backgrounds.
//   inverse  — solid ivory fill, clay text. Use on clay backgrounds (e.g. CTABand).
//   ghost    — ivory border and text over photos/video. Use on dark hero imagery.
// ---------------------------------------------------------------------------

const VARIANTS = {
  outline:
    "border border-clay text-clay bg-transparent hover:bg-clay hover:text-ivory focus-visible:bg-clay focus-visible:text-ivory",
  inverse: "bg-ivory text-clay hover:bg-sand focus-visible:bg-sand",
  ghost:
    "border border-ivory/50 text-ivory bg-transparent hover:border-ivory hover:bg-ivory/10 focus-visible:border-ivory focus-visible:bg-ivory/10",
};

const SOLID_BASE =
  "relative inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-8px_rgba(33,29,24,0.35)] focus-visible:outline-none focus-visible:-translate-y-0.5 disabled:opacity-60 disabled:pointer-events-none disabled:translate-y-0 disabled:shadow-none";

// The primary variant is two nested elements: an outer pill carrying the
// rotating conic-gradient (revealed only in the ~2.5px padding ring) and an
// inner pill with the actual solid-clay fill and text. Keeping the fill on
// an inner element — rather than masking to match whatever page background
// sits behind the button, as the simplest version of this effect usually
// does — means the ring looks right whether the button sits on the sand
// page background, a photo (Hero), or the clay CTABand.
const RING_BASE =
  "group relative inline-flex items-center justify-center rounded-full p-[2.5px] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-8px_rgba(181,80,43,0.45)] focus-visible:outline-none focus-visible:-translate-y-0.5 disabled:opacity-60 disabled:pointer-events-none disabled:translate-y-0 disabled:shadow-none";

export default function Button({
  href,
  variant = "primary",
  className = "",
  fullWidth = false,
  type = "button",
  onClick,
  disabled,
  children,
}) {
  const width = fullWidth ? "w-full" : "";
  const isPrimary = variant === "primary" || !VARIANTS[variant];

  if (isPrimary) {
    const classes = `${RING_BASE} rotating-gradient ${width} ${className}`.trim();
    const inner = (
      <span className="relative z-[1] flex w-full items-center justify-center gap-2 rounded-full bg-clay px-[1.6rem] py-[0.75rem] text-sm font-medium tracking-wide text-ivory transition-colors duration-300 group-hover:bg-clay-dark">
        {children}
      </span>
    );

    if (href) {
      return (
        <Link href={href} className={classes}>
          {inner}
        </Link>
      );
    }

    return (
      <button type={type} onClick={onClick} disabled={disabled} className={classes}>
        {inner}
      </button>
    );
  }

  const classes = `${SOLID_BASE} ${VARIANTS[variant]} ${width} ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
