const { colors: brandColors } = require("./data/brand.js");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./data/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: brandColors.charcoal,
        safari: { DEFAULT: brandColors.safari, dark: brandColors.safariDark },
        bronze: brandColors.bronze,
        clay: { DEFAULT: brandColors.clay, dark: brandColors.clayDark },
        river: { DEFAULT: brandColors.river, dark: brandColors.riverDark },
        gold: brandColors.gold,
        sage: brandColors.sage,
        sand: { DEFAULT: brandColors.sand, deep: brandColors.sandDeep },
        ink: brandColors.ink,
        ivory: brandColors.ivory,
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        ui: ["var(--font-ui)", "system-ui", "sans-serif"],
        sans: ["var(--font-ui)", "system-ui", "sans-serif"],
        archivo: ["var(--font-archivo)", "Impact", "sans-serif"],
      },
      maxWidth: {
        content: "1400px",
      },
      letterSpacing: {
        widest2: "0.22em",
      },
    },
  },
  plugins: [],
};
