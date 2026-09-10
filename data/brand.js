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
// Aligned to the Essentia-style homepage palette so every sub-page matches
// the single-page aesthetic: a warm cream canvas with coffee text, Archivo
// Black headlines and an orange accent. The Tailwind tokens generated from
// this object (see tailwind.config.js) are the only color source used by the
// legacy sub-page components, so this one-file swap re-skins them all to the
// homepage look.
const colors = {
  clay: "#4b3621", // primary — coffee, the dark anchor (buttons / strong text)
  clayDark: "#181919", // hover — near-black
  river: "#4b3621", // secondary — also coffee for dark sections & text
  riverDark: "#181919",
  gold: "#fc6d42", // accent — orange highlight (kickers, hover)
  sage: "#71785C", // supporting — muted sage for tags / quiet UI
  sand: "#ece5d5", // background — cream (matches --cream)
  sandDeep: "#e2dabd", // slightly deeper cream for image placeholders
  ink: "#4b3621", // primary text — coffee
  ivory: "#f4efe3", // light cream — text over dark imagery & secondary bg
};

module.exports = { brand, colors };
