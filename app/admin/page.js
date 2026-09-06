"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { mergeContent, fetchStoredContent, saveContentSection, resetContentSection } from "@/lib/content";
import { checkAdminSession } from "@/lib/admin";
import BrandForm from "@/components/admin/BrandForm";
import CollectionForm from "@/components/admin/CollectionForm";
import GalleryForm from "@/components/admin/GalleryForm";
import MediaForm from "@/components/admin/MediaForm";
import ReviewsForm from "@/components/admin/ReviewsForm";
import StatsForm from "@/components/admin/StatsForm";
import EnquiriesTable from "@/components/admin/EnquiriesTable";

const DESTINATION_FIELDS = [
  { key: "name", label: "Name", type: "text", required: true },
  { key: "country", label: "Country", type: "text" },
  { key: "region", label: "Region", type: "text" },
  { key: "slug", label: "Slug (URL path)", type: "text", hint: "e.g. victoria-falls" },
  { key: "tagline", label: "Tagline", type: "text" },
  { key: "blurb", label: "Blurb (card summary)", type: "textarea", rows: 3 },
  { key: "description", label: "Full description", type: "textarea", rows: 9, hint: "Blank lines become paragraphs." },
  { key: "image", label: "Hero image", type: "image" },
  { key: "imageAlt", label: "Image alt text", type: "text" },
  { key: "highlights", label: "Highlights", type: "list" },
  { key: "pairsWith", label: "Pairs with (destination slugs)", type: "list" },
  { key: "gallery", label: "Gallery image paths", type: "list" },
];

const EXPERIENCE_FIELDS = [
  { key: "name", label: "Name", type: "text", required: true },
  { key: "slug", label: "Slug (URL path)", type: "text", hint: "e.g. zambezi-sunset-cruise" },
  { key: "category", label: "Category", type: "text", hint: "e.g. Wildlife, Boat Cruise, Adventure" },
  { key: "tagline", label: "Tagline", type: "text" },
  { key: "location", label: "Location", type: "text" },
  { key: "duration", label: "Duration", type: "text", hint: "e.g. Half day, 2–3 hours" },
  { key: "blurb", label: "Blurb (card summary)", type: "textarea", rows: 3 },
  { key: "description", label: "Full description", type: "textarea", rows: 9 },
  { key: "image", label: "Image", type: "image" },
  { key: "imageAlt", label: "Image alt text", type: "text" },
  {
    key: "sampleRoute",
    label: "Sample route (optional)",
    type: "group",
    fields: [
      { key: "label", label: "Label", type: "text" },
      { key: "stops", label: "Stops", type: "list" },
      { key: "note", label: "Note", type: "textarea", rows: 2 },
    ],
  },
  { key: "highlights", label: "Highlights", type: "list" },
  { key: "included", label: "Included", type: "list" },
  { key: "excluded", label: "Not included", type: "list" },
  { key: "pricingNote", label: "Pricing note", type: "textarea", rows: 2 },
];

const JOURNEY_FIELDS = [
  { key: "name", label: "Name", type: "text", required: true },
  { key: "slug", label: "Slug (URL path)", type: "text", hint: "e.g. namibia-explorer" },
  { key: "countries", label: "Countries", type: "list" },
  { key: "stops", label: "Route stops", type: "list" },
  { key: "blurb", label: "Blurb", type: "textarea", rows: 4 },
  { key: "image", label: "Image", type: "image" },
  { key: "imageAlt", label: "Image alt text", type: "text" },
  { key: "destinationSlug", label: "Destination slug (button link)", type: "text", hint: "e.g. namibia" },
];

const TABS = [
  { id: "enquiries", label: "Enquiries" },
  { id: "brand", label: "Brand" },
  { id: "destinations", label: "Destinations" },
  { id: "experiences", label: "Activities" },
  { id: "journeys", label: "Itineraries" },
  { id: "gallery", label: "Gallery" },
  { id: "media", label: "Media" },
  { id: "reviews", label: "Reviews" },
  { id: "stats", label: "Stats" },
];

export default function AdminDashboardPage() {
  const router = useRouter();
  const [sessionOk, setSessionOk] = useState(null); // null = checking
  const [content, setContent] = useState(null);
  const [tab, setTab] = useState("enquiries");
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState(null);

  const flash = useCallback((msg) => {
    setNotice(msg);
    const t = setTimeout(() => setNotice(null), 5000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    let active = true;
    (async () => {
      const ok = await checkAdminSession();
      if (!active) return;
      if (!ok) {
        router.push("/admin/login");
        return;
      }
      setSessionOk(true);
    })();
    return () => {
      active = false;
    };
  }, [router]);

  const reload = useCallback(async () => {
    const stored = await fetchStoredContent();
    setContent(mergeContent(stored));
  }, []);

  useEffect(() => {
    if (sessionOk) reload();
  }, [sessionOk, reload]);

  const save = useCallback(
    async (section, data) => {
      setSaving(true);
      const ok = await saveContentSection(section, data);
      setSaving(false);
      if (ok) {
        await reload();
        flash(`${TABS.find((t) => t.id === section)?.label || section} saved — live on the site.`);
      } else {
        flash("Save failed — the backend may be waking up. Wait a moment and try again.");
      }
      return ok;
    },
    [reload, flash]
  );

  const reset = useCallback(
    async (section) => {
      const label = TABS.find((t) => t.id === section)?.label || section;
      if (!window.confirm(`Restore ${label} to the site's built-in defaults? This discards all CMS edits for this section.`)) {
        return false;
      }
      const ok = await resetContentSection(section);
      if (ok) {
        await reload();
        flash(`${label} reset to defaults.`);
      }
      return ok;
    },
    [reload, flash]
  );

  if (sessionOk === null || !content) {
    return <p className="text-sm text-ink/60">Loading workspace…</p>;
  }

  return (
    <div className="container-editorial py-10 md:py-14">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-archivo text-2xl uppercase text-ink">Muto Tours Admin</h1>
          <p className="mt-1 text-sm text-ink/60">
            Manage enquiries and the content shown across the live site.
          </p>
        </div>
        <a
          href="/"
          className="text-sm text-ink/50 underline decoration-ink/20 underline-offset-4 hover:text-ink"
        >
          View site →
        </a>
      </div>

      <div className="mt-8 flex flex-wrap gap-2 border-b border-ink/10 pb-px">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`rounded-t-lg px-4 py-2.5 text-xs uppercase tracking-widest2 transition ${
              tab === t.id
                ? "bg-clay text-ivory"
                : "text-ink/55 hover:bg-ink/5 hover:text-ink"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {notice && (
        <div className="mt-6 rounded-xl border border-gold/40 bg-gold/10 px-4 py-3 text-sm text-ink">
          {notice}
        </div>
      )}

      <div className={`mt-8 ${saving ? "opacity-70" : ""}`}>
        {tab === "enquiries" && <EnquiriesTable />}

        {tab === "brand" && (
          <BrandForm
            value={content.brand}
            onSave={(v) => save("brand", v)}
            onReset={() => reset("brand")}
          />
        )}

        {tab === "destinations" && (
          <CollectionForm
            section="destinations"
            kicker="Destinations"
            title="Destinations"
            dek="Where Muto Tours can build a route. Edits appear on /destinations and across the homepage."
            newItemLabel="destination"
            identify={(d) => d.name || d.slug}
            fields={DESTINATION_FIELDS}
            value={content.destinations}
            onSave={(v) => save("destinations", v)}
            onReset={() => reset("destinations")}
          />
        )}

        {tab === "experiences" && (
          <CollectionForm
            section="experiences"
            kicker="Activities"
            title="Activities & Experiences"
            dek="The activities shown on /experiences and the homepage carousel."
            newItemLabel="experience"
            identify={(e) => e.name || e.slug}
            fields={EXPERIENCE_FIELDS}
            value={content.experiences}
            onSave={(v) => save("experiences", v)}
            onReset={() => reset("experiences")}
          />
        )}

        {tab === "journeys" && (
          <CollectionForm
            section="journeys"
            kicker="Itineraries"
            title="Featured Itineraries"
            dek="The multi-day route highlights on /itineraries."
            newItemLabel="itinerary"
            identify={(j) => j.name || j.slug}
            fields={JOURNEY_FIELDS}
            value={content.journeys}
            onSave={(v) => save("journeys", v)}
            onReset={() => reset("journeys")}
          />
        )}

        {tab === "gallery" && (
          <GalleryForm
            value={content.gallery}
            onSave={(v) => save("gallery", v)}
            onReset={() => reset("gallery")}
          />
        )}

        {tab === "media" && (
          <MediaForm
            value={content.media}
            onSave={(v) => save("media", v)}
            onReset={() => reset("media")}
          />
        )}

        {tab === "reviews" && (
          <ReviewsForm
            value={content.reviews}
            onSave={(v) => save("reviews", v)}
            onReset={() => reset("reviews")}
          />
        )}

        {tab === "stats" && (
          <StatsForm
            value={content.stats}
            onSave={(v) => save("stats", v)}
            onReset={() => reset("stats")}
          />
        )}
      </div>
    </div>
  );
}