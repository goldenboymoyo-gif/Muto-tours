# Muto Tours — website

A from-scratch rebuild of the Muto Tours site (Next.js App Router + Tailwind
CSS, Supabase for the contact form and future content management). Built to
replace mutotours.africa's current design while keeping its real company
information, destinations, and contact details.

## Quick start

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## What's real vs. placeholder in this build

- **Company info, destinations, contact details** — pulled from the live
  mutotours.africa site and cross-checked against real Southern Africa
  itineraries supplied for this project. See `data/brand.js`,
  `data/destinations.js`, `data/experiences.js` — every file has a comment
  explaining its sourcing.
- **Photography** — 14 real travel photos from the project folder are in
  `public/images/`, used across the destinations and experiences they
  genuinely match. Three photos in the source folder carried a third-party
  photographer's watermark ("Harrison Photography") and were **not** used
  anywhere on the site — they aren't cleared for commercial use on a
  business's marketing site. Destinations/experiences without a matching
  photo render a deliberate typographic placeholder (`components/MediaFrame.js`)
  instead of a stock substitute — search `image: null` in `data/*.js` to see
  which ones need photography.
- **Hero video** — `components/Hero.js` is wired for a real cinematic brand
  film at `/public/videos/hero.mp4` and falls back cleanly to a poster image
  until that file exists. See `public/videos/README.md` for the shot list
  and edit structure the brief calls for.
- **Brand colors** — the Muto Tours logo file (`mutotours.africa/assets/logo.png`)
  could not be fetched from this build environment, so the palette in
  `data/brand.js` was composed by hand from the destination photography and
  the brand's Zambezi/Victoria Falls setting (terracotta clay, deep river
  teal, savanna gold). Swap in real logo-derived hex values in that one file
  once the asset is available — every color in the site traces back to it.
- **Pricing** — no price is invented. The one figure shown on the "Custom
  Safari Itineraries" experience page ($5,279 per person, 15-day route) is
  quoted directly from a real sample itinerary supplied for this project, and
  is labelled as an indicative reference point, not a live rate. Every other
  experience points to "request a quote," matching how mutotours.africa
  itself sells (no published price list; custom quote system).

## Project structure

```
app/                 Next.js App Router pages
  destinations/       destinations index + [slug] detail
  experiences/         experiences index + [slug] detail
  about/, contact/
components/          Reusable UI (Header, Footer, Hero, cards, form, etc.)
data/                 brand.js, destinations.js, experiences.js — all site
                      content and the brand config lives here
lib/supabaseClient.js  Supabase browser client (safe if unconfigured)
supabase/schema.sql    Run this in the Supabase SQL editor
public/images/          Real project photography
public/videos/          Hero video slot + spec
```

## Wiring up Supabase (optional but recommended)

The site works today without any backend — the contact form falls back to a
pre-filled email link. To make it write to a real database:

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the SQL editor.
3. Copy `.env.example` to `.env.local` and fill in your project URL + anon
   key.
4. Restart the dev server. `components/ContactForm.js` will now insert
   directly into `contact_submissions`.

The schema also includes `destinations` and `experiences` tables with the
same field names as `data/destinations.js` / `data/experiences.js`, so moving
content management into Supabase later (for non-technical editing) is a
drop-in swap rather than a redesign.

## Editing brand info

Everything that changes as the business evolves — logo, name, tagline,
colors, contact details, nav, social links — lives in **one file**:
`data/brand.js`.

## Deployment

Framework-agnostic Next.js app; deploys cleanly to Vercel or any Node
hosting that supports Next.js 14. `next build && next start`, or connect the
repo to your hosting provider of choice.
