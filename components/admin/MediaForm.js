"use client";

import { useEffect, useState } from "react";
import { Field, ImageInput, Savebar, SectionIntro } from "./ui";

const HERO_LABELS = ["Slide 1", "Slide 2", "Slide 3"];
const PAGE_HERO_SLOTS = [
  { key: "about", label: "About page" },
  { key: "destinations", label: "Destinations page" },
  { key: "experiences", label: "Activities page" },
  { key: "gallery", label: "Gallery page" },
  { key: "itineraries", label: "Itineraries page" },
  { key: "contact", label: "Contact page" },
  { key: "contactSide", label: "Contact page — side image" },
];
const HOMEPAGE_SLOTS = [
  { key: "about1", label: "About — large grid image" },
  { key: "about2", label: "About — small grid image" },
  { key: "ultimateAdventure", label: "Ultimate Adventure section" },
  { key: "ctaBand", label: "CTA band (bottom-of-page banner)" },
  { key: "cardVictoriaFalls", label: "Destination card — Victoria Falls" },
  { key: "cardOkavangoDelta", label: "Destination card — Okavango Delta" },
  { key: "cardNamibia", label: "Destination card — Namibia" },
  { key: "facts1", label: "Facts card — first" },
  { key: "facts2", label: "Facts card — second" },
];

export default function MediaForm({ value, onSave, onReset }) {
  const [draft, setDraft] = useState(value);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [base, setBase] = useState(value);

  useEffect(() => {
    setDraft(value);
    setBase(value);
    setSaved(false);
  }, [value]);

  const setSlide = (i, key, v) =>
    setDraft((d) => ({
      ...d,
      heroSlides: (d.heroSlides || []).map((s, idx) => (idx === i ? { ...s, [key]: v } : s)),
    }));

  const setPageHero = (key, v) => setDraft((d) => ({ ...d, pageHero: { ...d.pageHero, [key]: v } }));

  const setHomepage = (key, v) => setDraft((d) => ({ ...d, homepage: { ...d.homepage, [key]: v } }));

  const dirty = JSON.stringify(draft) !== JSON.stringify(base);

  async function handleSave() {
    setSaving(true);
    const ok = await onSave(draft);
    setSaving(false);
    if (ok) setSaved(true);
  }

  return (
    <div>
      <SectionIntro
        kicker="Media"
        title="Site Images"
        dek="The hero slider, page covers, and homepage section images that aren't tied to a single destination or activity. Clearing a field reverts that image to its built-in default."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-ink/10 bg-[#fffdf8] p-6">
          <h3 className="mb-1 font-archivo text-lg uppercase text-ink">Homepage hero slider</h3>
          <p className="mb-5 text-xs text-ink/50">Each slide has a desktop image and a mobile image.</p>
          <div className="space-y-6">
            {HERO_LABELS.map((label, i) => (
              <div key={label} className="space-y-4">
                <p className="text-xs font-medium uppercase tracking-widest2 text-ink/60">{label}</p>
                <Field label="Desktop image">
                  <ImageInput
                    value={draft?.heroSlides?.[i]?.img}
                    onChange={(v) => setSlide(i, "img", v)}
                  />
                </Field>
                <Field label="Mobile image">
                  <ImageInput
                    value={draft?.heroSlides?.[i]?.mob}
                    onChange={(v) => setSlide(i, "mob", v)}
                  />
                </Field>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-ink/10 bg-[#fffdf8] p-6">
            <h3 className="mb-1 font-archivo text-lg uppercase text-ink">Page hero covers</h3>
            <p className="mb-5 text-xs text-ink/50">The large banner image at the top of each top-level page.</p>
            <div className="space-y-4">
              {PAGE_HERO_SLOTS.map((slot) => (
                <Field label={slot.label} key={slot.key}>
                  <ImageInput value={draft?.pageHero?.[slot.key]} onChange={(v) => setPageHero(slot.key, v)} />
                </Field>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-ink/10 bg-[#fffdf8] p-6">
            <h3 className="mb-1 font-archivo text-lg uppercase text-ink">Homepage sections</h3>
            <div className="space-y-4">
              {HOMEPAGE_SLOTS.map((slot) => (
                <Field label={slot.label} key={slot.key}>
                  <ImageInput value={draft?.homepage?.[slot.key]} onChange={(v) => setHomepage(slot.key, v)} />
                </Field>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Savebar onSave={handleSave} onReset={onReset} saving={saving} saved={saved} dirty={dirty} />
    </div>
  );
}