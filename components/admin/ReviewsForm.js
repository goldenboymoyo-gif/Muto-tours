"use client";

import { useEffect, useState } from "react";
import { Field, Savebar, SectionIntro, TextArea, TextInput, btnGhost, inputClass } from "./ui";

const BAR_LABELS = ["5 stars", "4 stars", "3 stars", "2 stars", "1 star"];

function emptyTestimonial() {
  return { name: "", location: "", initials: "", text: "" };
}

export default function ReviewsForm({ value, onSave, onReset }) {
  const [draft, setDraft] = useState(value);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [base, setBase] = useState(value);

  useEffect(() => {
    setDraft(value);
    setBase(value);
    setSaved(false);
  }, [value]);

  const dirty = JSON.stringify(draft) !== JSON.stringify(base);

  const setTestimonial = (i, key, v) =>
    setDraft((d) => ({
      ...d,
      testimonials: (d.testimonials || []).map((t, idx) => (idx === i ? { ...t, [key]: v } : t)),
    }));

  const addTestimonial = () =>
    setDraft((d) => ({ ...d, testimonials: [...(d.testimonials || []), emptyTestimonial()] }));

  const removeTestimonial = (i) =>
    setDraft((d) => ({ ...d, testimonials: (d.testimonials || []).filter((_, idx) => idx !== i) }));

  async function handleSave() {
    setSaving(true);
    const ok = await onSave(draft);
    setSaving(false);
    if (ok) setSaved(true);
  }

  return (
    <div>
      <SectionIntro
        kicker="Reviews"
        title="Guest Reviews"
        dek="The rating shown on the homepage Reviews section. Edit the average, the star-breakdown bars, and the testimonials themselves."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-ink/10 bg-[#fffdf8] p-6">
          <h3 className="mb-5 font-archivo text-lg uppercase text-ink">Rating</h3>
          <div className="space-y-4">
            <Field label="Average rating" hint='e.g. "5.0"'>
              <TextInput
                value={draft?.rating}
                onChange={(v) => setDraft((d) => ({ ...d, rating: v }))}
              />
            </Field>
            {(BAR_LABELS).map((label, i) => (
              <Field label={`${label} share (%)`} key={label}>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.5"
                  className={inputClass}
                  value={draft?.bars?.[i]}
                  onChange={(e) =>
                    setDraft((d) => {
                      const bars = [...(d.bars || [])];
                      bars[i] = e.target.value;
                      return { ...d, bars };
                    })
                  }
                />
              </Field>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-ink/10 bg-[#fffdf8] p-6">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="font-archivo text-lg uppercase text-ink">Testimonials</h3>
            <button type="button" className={btnGhost} onClick={addTestimonial}>
              + Add review
            </button>
          </div>

          <div className="max-h-[70vh] space-y-6 overflow-y-auto pr-1">
            {(draft?.testimonials || []).map((t, i) => (
              <div key={`${i}-${t.name}`} className="rounded-xl border border-ink/10 bg-sand/40 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-xs font-medium uppercase tracking-widest2 text-ink/60">
                    Review {i + 1}
                  </p>
                  <button
                    type="button"
                    onClick={() => removeTestimonial(i)}
                    className="rounded-md border border-ink/10 px-2 py-1 text-xs text-ink/50 transition hover:border-clay/40 hover:text-clay"
                  >
                    Delete
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <Field label="Name">
                    <TextInput value={t.name} onChange={(v) => setTestimonial(i, "name", v)} />
                  </Field>
                  <Field label="Location">
                    <TextInput value={t.location} onChange={(v) => setTestimonial(i, "location", v)} />
                  </Field>
                  <Field label="Initials">
                    <TextInput value={t.initials} onChange={(v) => setTestimonial(i, "initials", v)} />
                  </Field>
                </div>
                <div className="mt-4">
                  <Field label="Review text">
                    <TextArea value={t.text} onChange={(v) => setTestimonial(i, "text", v)} rows={3} />
                  </Field>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Savebar onSave={handleSave} onReset={onReset} saving={saving} saved={saved} dirty={dirty} />
    </div>
  );
}