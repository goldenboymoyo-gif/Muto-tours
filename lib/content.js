// ---------------------------------------------------------------------------
// Runtime content layer.
//
// The site ships with static defaults in data/*.js and layers admin edits on
// top at runtime: the backend stores whole "sections" (brand, destinations,
// experiences, journeys, gallery) and this module merges anything stored over
// the shipped defaults. When the backend is unreachable the site simply falls
// back to the defaults, so content management never breaks the site.
//
// Isomorphic: used by server components (request-time fetch for SEO) and by
// the client ContentProvider (one fetch per page load) alike — it only relies
// on `fetch` and `process.env.NEXT_PUBLIC_API_URL`.
// ---------------------------------------------------------------------------

import { brand as defaultBrand } from "@/data/brand";
import { destinations as defaultDestinations } from "@/data/destinations";
import { experiences as defaultExperiences } from "@/data/experiences";
import { journeys as defaultJourneys } from "@/data/journeys";
import { galleryPhotos as defaultGalleryPhotos } from "@/data/gallery";
import { media as defaultMedia } from "@/data/media";
import { reviews as defaultReviews } from "@/data/reviews";
import { stats as defaultStats } from "@/data/stats";

export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

// Every section the site knows how to merge, and its default value.
export const DEFAULT_CONTENT = {
  brand: defaultBrand,
  destinations: defaultDestinations,
  experiences: defaultExperiences,
  journeys: defaultJourneys,
  gallery: { photos: defaultGalleryPhotos },
  media: defaultMedia,
  reviews: defaultReviews,
  stats: defaultStats,
};

export const CONTENT_SECTIONS = Object.keys(DEFAULT_CONTENT);

// Layer stored sections (from the backend) over the static defaults.
export function mergeContent(remote) {
  const merged = {};
  for (const key of CONTENT_SECTIONS) {
    merged[key] =
      remote && remote[key] !== undefined && remote[key] !== null ? remote[key] : DEFAULT_CONTENT[key];
  }
  return merged;
}

async function fetchWithTimeout(url, { timeout = 3000, ...options } = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(url, {
      ...options,
      signal: controller.signal,
      // Server fetches must not be cached by Next, or CMS edits would never
      // show up. Browsers disregard this key entirely.
      ...(typeof window === "undefined" ? { cache: "no-store" } : {}),
    });
    return res;
  } finally {
    clearTimeout(timer);
  }
}

// Returns the raw stored sections ({ section: value }) or null on failure.
// The backend is a free Render instance that cold-starts in 30–60s, so the
// default fetch is intentionally generous: the client ContentProvider and the
// admin dashboard wait it out so saved content actually shows, instead of
// silently falling back to the shipped defaults. Server component renders pass
// a short timeout so pages never stall — they render defaults at once and the
// client provider hydrates the real content afterwards.
export async function fetchStoredContent(timeout = 90000) {
  try {
    const res = await fetchWithTimeout(`${API_URL}/api/content`, { timeout });
    if (!res.ok) return null;
    const body = await res.json();
    return body?.content || null;
  } catch {
    return null;
  }
}

// Resolves the effective content (stored over defaults) in one call.
// Server components `await getContent()`; the client provider mirrors it.
export async function getContent() {
  const stored = await fetchStoredContent(8000);
  return mergeContent(stored);
}

// Admin helpers ---------------------------------------------------------------
// These run in the browser and rely on the HttpOnly admin session cookie set
// by the backend login — no token is ever stored in or read from JavaScript.

export async function saveContentSection(section, data) {
  try {
    const res = await fetchWithTimeout(`${API_URL}/api/admin/content/${section}`, {
      method: "PUT",
      timeout: 60000,
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function resetContentSection(section) {
  try {
    const res = await fetchWithTimeout(`${API_URL}/api/admin/content/${section}`, {
      method: "DELETE",
      timeout: 60000,
      credentials: "include",
    });
    return res.ok;
  } catch {
    return false;
  }
}