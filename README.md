# Muto Tours

A tour operator website for Muto Tours, specializing in travel experiences across Zimbabwe, Botswana, Namibia, and South Africa.

## Tech Stack

- Next.js 14 (App Router)
- React 18
- Tailwind CSS
- Express (contact form API — see `backend/`)
- Leaflet / React-Leaflet (interactive maps)
- Framer Motion (animations)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run start    # Run production build
npm run lint     # Lint
```

## Project Structure

```
app/                  # Pages (Next.js App Router)
  about/              # About page
  contact/            # Contact page
  destinations/       # Destination pages (dynamic routes)
  experiences/        # Activity/experience pages
  gallery/            # Photo gallery
  itineraries/        # Tour packages
components/           # React components
data/                 # Site data (destinations, experiences, journeys)
public/videos/        # Hero and gallery videos
public/images/        # Static images
```

## Key Features

- Hero section with looping Victoria Falls video
- Interactive destination map (Leaflet)
- Experience/activity pages
- Photo gallery with video support
- Contact form (Express API)
- Responsive design
- SEO (sitemap, robots)

## Deployment

Frontend deployed on Vercel (requires `.npmrc` with `legacy-peer-deps=true`). Backend (`backend/`) deployed separately as a Node web service (e.g. Render) — see `backend/.env.example`.

Build command:

```bash
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```
