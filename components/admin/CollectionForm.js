"use client";

import { useEffect, useMemo, useState } from "react";
import { Field, TextArea, TextInput, ImageInput, ListEditor, Savebar, SectionIntro, btnGhost } from "./ui";

function updateValue(obj, key, value) {
  return { ...obj, [key]: value };
}

function UpdateObject({ fields, draft, onChange }) {
  return (
    <div className="space-y-5">
      {fields.map((field) => (
        <FieldRow key={field.key} field={field} draft={draft} onChange={onChange} />
      ))}
    </div>
  );
}

function FieldRow({ field, draft, onChange }) {
  switch (field.type) {
    case "textarea":
      return (
        <Field label={field.label} required={field.required} hint={field.hint}>
          <TextArea value={draft[field.key]} onChange={(v) => onChange(updateValue(draft, field.key, v))} rows={field.rows || 5} />
        </Field>
      );
    case "list":
      return (
        <Field label={field.label} hint={field.hint}>
          <ListEditor value={draft[field.key] || []} onChange={(v) => onChange(updateValue(draft, field.key, v))} />
        </Field>
      );
    case "image":
      return (
        <Field label={field.label}>
          <ImageInput value={draft[field.key]} onChange={(v) => onChange(updateValue(draft, field.key, v))} />
        </Field>
      );
    case "group":
      return (
        <Field label={field.label} hint={field.hint}>
          <div className="mt-2 space-y-4 rounded-xl border border-ink/10 bg-sand/50 p-4">
            <UpdateObject
              fields={field.fields}
              draft={draft[field.key] || {}}
              onChange={(key, value) =>
                onChange(updateValue(draft, field.key, { ...(draft[field.key] || {}), [key]: value }))
              }
            />
          </div>
        </Field>
      );
    default:
      return (
        <Field label={field.label} required={field.required} hint={field.hint}>
          <TextInput value={draft[field.key]} onChange={(v) => onChange(updateValue(draft, field.key, v))} />
        </Field>
      );
  }
}

function emptyItem(fields) {
  const item = {};
  for (const f of fields) {
    if (f.type === "list") item[f.key] = [];
    else if (f.type === "group") {
      item[f.key] = {};
      for (const inner of f.fields || []) {
        item[f.key][inner.key] = inner.type === "list" ? [] : "";
      }
    } else item[f.key] = "";
  }
  return item;
}

export default function CollectionForm({
  section,
  title,
  kicker,
  dek,
  newItemLabel,
  identify,
  fields,
  value,
  onSave,
  onReset,
}) {
  const [draft, setDraft] = useState(() => value || []);
  const [selected, setSelected] = useState(0);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [base, setBase] = useState(value || []);

  // Re-sync when the authoritative value changes (initial load, after save, after reset).
  useEffect(() => {
    setDraft(value || []);
    setBase(value || []);
    setSaved(false);
    setSelected((s) => Math.min(s, Math.max((value?.length || 0) - 1, 0)));
  }, [value]);

  const dirty = JSON.stringify(draft) !== JSON.stringify(base);
  const selectedSafe = Math.min(selected, Math.max(draft.length - 1, 0));
  const current = draft[selectedSafe];

  const labelFor = (item) => {
    const l = identify?.(item);
    return l && String(l).trim() ? l : "New item";
  };

  const mutate = (updater) => setDraft((prev) => updater(prev));

  async function handleSave() {
    setSaving(true);
    const ok = await onSave(draft);
    setSaving(false);
    if (ok) {
      setSaved(true);
    }
  }

  function handleDelete() {
    const item = current;
    if (!item || !window.confirm(`Delete "${labelFor(item)}"? This is saved as soon as you click Save.`)) return;
    const next = draft.filter((_, i) => i !== selectedSafe);
    const nextSelected = Math.min(selectedSafe, Math.max(next.length - 1, 0));
    setDraft(next);
    setSelected(nextSelected);
  }

  function handleAdd() {
    const item = emptyItem(fields);
    mutate((prev) => [...prev, item]);
    setSelected(draft.length);
  }

  if (!current) {
    return (
      <div>
        <SectionIntro kicker={kicker} title={title} dek={dek} />
        <div className="rounded-xl border border-dashed border-ink/15 p-10 text-center">
          <p className="text-sm text-ink/50">Nothing here yet.</p>
          <button type="button" className={`${btnGhost} mt-4`} onClick={handleAdd}>
            + Add {newItemLabel}
          </button>
        </div>
        <Savebar onSave={handleSave} onReset={onReset} saving={saving} saved={saved} dirty={dirty} />
      </div>
    );
  }

  return (
    <div>
      <SectionIntro kicker={kicker} title={title} dek={dek} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]">
        {/* Item list */}
        <div className="lg:max-h-[60vh] lg:overflow-y-auto">
          <div className="space-y-1.5">
            <button
              type="button"
              onClick={handleAdd}
              className="w-full rounded-lg border border-dashed border-ink/20 px-3 py-2 text-sm font-medium text-clay transition hover:border-clay hover:bg-clay/5"
            >
              + Add {newItemLabel}
            </button>
            {draft.map((item, i) => (
              <button
                key={`${item.slug || item.name || "item"}-${i}`}
                type="button"
                onClick={() => setSelected(i)}
                className={`w-full rounded-lg px-3 py-2.5 text-left text-sm transition ${
                  i === selectedSafe
                    ? "bg-clay text-ivory"
                    : "text-ink/70 hover:bg-ink/5 hover:text-ink"
                }`}
              >
                {labelFor(item)}
                {i === selectedSafe && <span className="sr-only">(selected)</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Item form */}
        <div className="rounded-2xl border border-ink/10 bg-[#fffdf8] p-6">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <h3 className="font-archivo text-lg uppercase text-ink">{labelFor(current)}</h3>
            <div className="flex items-center gap-2">
              {draft.length > 1 && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className={`${btnGhost} !text-clay-dark hover:!border-clay/40`}
                >
                  Delete
                </button>
              )}
              <button
                type="button"
                onClick={() => setDraft((prev) => prev.map((item, i) => (i === selectedSafe ? { ...item, ...emptyItem(fields) } : item)))}
                className={btnGhost}
              >
                Clear fields
              </button>
            </div>
          </div>

          <UpdateObject fields={fields} draft={current} onChange={(key, v) => mutate((prev) => prev.map((item, i) => (i === selectedSafe ? { ...item, [key]: v } : item)))} />
        </div>
      </div>

      <Savebar
        onSave={handleSave}
        onReset={onReset}
        saving={saving}
        saved={saved}
        dirty={dirty}
        disabled={!draft.length}
      />
    </div>
  );
}