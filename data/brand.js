// ---------------------------------------------------------------------------
// MUTO TOURS — Central brand configuration
// Edit this single file to update colors, contact details, nav, and social
// links across the entire site. Nothing below should need to be hunted for
// in individual page files.
// ---------------------------------------------------------------------------

const brand = {
  name: "Muto Tours",
  fullName: "Muto Tours and Travel",
  tagline: "Explore Southern Africa in Style",
  shortStatement:
    "Expertly guided tours across Zimbabwe and beyond — crafted for comfort, discovery, and unforgettable moments.",
  founded: "Victoria Falls, Zimbabwe",

  // Swap this for the finished logo mark when it's ready. Until then the
  // wordmark component (components/Logo.js) renders a typographic mark
  // built from the palette below, so the site never depends on a missing
  // image file.
  logo: {
    src: "/images/logo-placeholder.svg",
    width: 168,
    height: 40,
  },

  contact: {
    phone: "+263 715 127 562",
    phoneHref: "tel:+263715127562",
    whatsapp: "+263 77 784 9430",
    whatsappHref: "https://wa.me/263777849430",
    email: "info@mutotours.africa",
    address: {
      line1: "Muto Tours and Travels",
      line2: "10197 Mkhosana Township",
      line3: "Victoria Falls, Zimbabwe",
    },
  },

  social: {
    instagram: "https://instagram.com/mutotours",
    facebook: "https://facebook.com/mutotours",
  },

  nav: [
    { label: "Destinations", href: "/destinations" },
    { label: "Itineraries", href: "/itineraries" },
    { label: "Activities", href: "/experiences" },
    { label: "Gallery", href: "/gallery" },
    { label: "About", href: "/about" },
  ],

  primaryCta: { label: "Enquire", href: "/contact" },
};

// ---------------------------------------------------------------------------
// COLOR SYSTEM
// ---------------------------------------------------------------------------
// The Muto Tours logo asset could not be programmatically retrieved during
// this build (mutotours.africa/assets/logo.png did not resolve from this
// environment), so this palette was composed by hand from the destination
// photography supplied for the project and the brand's Zimbabwe / Zambezi
// setting — a warm, earthen safari-and-river system, deliberately far from
// generic SaaS blue/purple gradients. When the real logo file is available,
// re-sample its dominant hues and drop replacement hex values in here; every
// component below reads color only from this object or the Tailwind tokens
// generated from it (see tailwind.config.js), so a palette swap is a
// one-file change.
const colors = {
  clay: "#B5502B", // primary — sunset clay / terracotta, the brand's warm anchor
  clayDark: "#8F3D20",
  river: "#16302C", // secondary — deep river-teal, used for dark sections & header
  riverDark: "#0E211E",
  gold: "#D9A441", // accent — savanna gold, used sparingly for highlights
  sage: "#71785C", // supporting — muted sage for tags / quiet UI
  sand: "#F6F1E7", // background — warm sand / ivory
  sandDeep: "#EDE3D0",
  ink: "#211D18", // primary text — warm charcoal, not pure black
  ivory: "#FBF8F2",
};

module.exports = { brand, colors };
