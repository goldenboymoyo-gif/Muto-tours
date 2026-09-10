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

  // Official Muto Tours logo (from mutotours.africa/assets/logo.png).
  logo: {
    src: "/images/muto-logo.png",
    width: 400,
    height: 400,
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
    { label: "Home", href: "/" },
    { label: "Destinations", href: "/destinations" },
    { label: "Itineraries", href: "/itineraries" },
    { label: "Activities", href: "/experiences" },
    { label: "About", href: "/about" },
  ],

  primaryCta: { label: "Enquire", href: "/contact" },
};

// ---------------------------------------------------------------------------
// COLOR SYSTEM
// ---------------------------------------------------------------------------
// Premium editorial palette: deep charcoal ink on a warm ivory canvas, with
// safari green as the primary brand anchor and bronze as the accent. The
// Tailwind tokens generated from this object (see tailwind.config.js) are the
// only color source used across the site, so this one-file swap re-skins every
// component consistently.
const colors = {
  // Core tokens
  charcoal: "#101412", // near-black ink
  safari: "#263D32", // deep safari green — primary brand anchor
  safariDark: "#1B2B23", // darker green for hover states
  bronze: "#B58A52", // earth/bronze accent
  ivory: "#FBF8F1", // lightest — text over dark imagery
  white: "#FFFFFF",

  // Legacy-compatible aliases (keep old classNames working while re-skinning)
  clay: "#263D32", // primary — maps to safari green (buttons / strong anchors)
  clayDark: "#1B2B23", // hover
  river: "#101412", // secondary — charcoal for dark sections & text
  riverDark: "#0B0E0C",
  gold: "#B58A52", // accent — bronze highlight (kickers, hover)
  sage: "#6E7B63", // supporting — muted sage for tags / quiet UI
  sand: "#F6F2E8", // background — warm ivory canvas
  sandDeep: "#EDE6D3", // slightly deeper ivory for image placeholders
  ink: "#101412", // primary text — charcoal
};

module.exports = { brand, colors };
