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
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
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
