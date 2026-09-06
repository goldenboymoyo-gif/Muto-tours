"use client";

import { useEffect, useState } from "react";
import { Field, TextArea, TextInput, ImageInput, Savebar, SectionIntro, btnGhost } from "./ui";

export default function GalleryForm({ value, onSave, onReset }) {
  const photos = value.photos || [];
  const [draft, setDraft] = useState(photos);
  const [selected, setSelected] = useState(0);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setDraft(value.photos || []);
    setSelected((s) => Math.min(s, Math.max((value.photos?.length || 0) - 1, 0)));
    setSaved(false);
  }, [value]);

  const dirty = JSON.stringify({ photos: draft }) !== JSON.stringify(value);
  const selectedSafe = Math.min(selected, Math.max(draft.length - 1, 0));
  const current = draft[selectedSafe];

  const mutate = (updater) => setDraft((prev) => updater(prev));

  async function handleSave() {
    setSaving(true);
    const ok = await onSave({ photos: draft });
    setSaving(false);
    if (ok) setSaved(true);
  }

  function handleAdd() {
    mutate((prev) => [
      ...prev,
      { src: "/images/gallery/g1.jpg", alt: "", caption: "Muto Tours — Southern Africa", category: "Gallery" },
    ]);
    setSelected(draft.length);
  }

  function handleDelete() {
    if (!current || !window.confirm("Delete this photo? Saved when you click Save changes.")) return;
    mutate((prev) => prev.filter((_, i) => i !== selectedSafe));
    setSelected(Math.max(selectedSafe - 1, 0));
  }

  return (
    <div>
      <SectionIntro
        kicker="Gallery"
        title="Gallery Photos"
        dek="Captions, alt text and categories for the photo grid. Categories map to the filter buttons — e.g. Wildlife, Adventure, Boat Cruises."
      />

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
        {draft.map((p, i) => (
          <button
            key={`${p.src}-${i}`}
            type="button"
            onClick={() => setSelected(i)}
            className={`relative aspect-square overflow-hidden rounded-lg border-2 transition ${
              i === selectedSafe ? "border-gold" : "border-transparent hover:border-ink/20"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.src} alt={p.alt || ""} className="h-full w-full object-cover" loading="lazy" />
            <span className="absolute inset-x-0 bottom-0 bg-ink/60 px-1.5 py-0.5 text-center text-[10px] text-ivory">
              {i + 1}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button type="button" className={btnGhost} onClick={handleAdd}>
          + Add photo
        </button>
        {draft.length > 1 && (
          <button type="button" className={`${btnGhost} !text-clay-dark`} onClick={handleDelete}>
            Delete selected ({selectedSafe + 1})
          </button>
        )}
      </div>

      {current && (
        <div className="mt-8 rounded-2xl border border-ink/10 bg-[#fffdf8] p-6">
          <div className="space-y-5">
            <Field label="Image" hint="Path like /images/gallery/g42.jpg, or a full URL">
              <ImageInput
                value={current.src}
                onChange={(v) =>
                  mutate((prev) => prev.map((p, i) => (i === selectedSafe ? { ...p, src: v } : p)))
                }
              />
            </Field>
            <Field label="Caption">
              <TextInput
                value={current.caption}
                onChange={(v) =>
                  mutate((prev) => prev.map((p, i) => (i === selectedSafe ? { ...p, caption: v } : p)))
                }
              />
            </Field>
            <Field label="Alt text">
              <TextArea
                rows={2}
                value={current.alt}
                onChange={(v) =>
                  mutate((prev) => prev.map((p, i) => (i === selectedSafe ? { ...p, alt: v } : p)))
                }
              />
            </Field>
            <Field label="Category" hint='Filter chips: "All", "Wildlife", "Adventure", "Boat Cruises", "Gallery", or a new one you introduce.'>
              <TextInput
                value={current.category}
                onChange={(v) =>
                  mutate((prev) => prev.map((p, i) => (i === selectedSafe ? { ...p, category: v } : p)))
                }
              />
            </Field>
          </div>
        </div>
      )}

      <Savebar onSave={handleSave} onReset={onReset} saving={saving} saved={saved} dirty={dirty} />
    </div>
  );
}