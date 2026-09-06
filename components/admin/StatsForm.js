"use client";

import { useEffect, useState } from "react";
import { Field, Savebar, SectionIntro, TextInput, btnGhost, inputClass } from "./ui";
import { normalizeStats } from "@/lib/content";

function emptyRow() {
  return { label: "", value: "0" };
}

export default function StatsForm({ value, onSave, onReset }) {
  const [draft, setDraft] = useState(() => normalizeStats(value).map((r) => ({ ...r, value: String(r.value) })));
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [base, setBase] = useState(() => normalizeStats(value).map((r) => ({ ...r, value: String(r.value) })));

  useEffect(() => {
    const rows = normalizeStats(value).map((r) => ({ ...r, value: String(r.value) }));
    setDraft(rows);
    setBase(rows);
    setSaved(false);
  }, [value]);

  const dirty = JSON.stringify(draft) !== JSON.stringify(base);

  const setRow = (i, key, v) =>
    setDraft((d) => d.map((r, idx) => (idx === i ? { ...r, [key]: v } : r)));

  const addRow = () => setDraft((d) => [...d, emptyRow()]);

  const removeRow = (i) => setDraft((d) => d.filter((_, idx) => idx !== i));

  async function handleSave() {
    setSaving(true);
    const ok = await onSave({ rows: draft });
    setSaving(false);
    if (ok) setSaved(true);
  }

  return (
    <div>
      <SectionIntro
        kicker="Stats"
        title="Homepage Stats"
        dek="The big numbers on the homepage. Rename, renumber, add or remove rows — changes save straight to the live site."
      />

      <div className="max-w-2xl rounded-2xl border border-ink/10 bg-[#fffdf8] p-6">
        <div className="space-y-4">
          {draft.map((row, i) => (
            <div
              key={i}
              className="flex flex-wrap items-end gap-4 rounded-xl border border-ink/10 bg-sand/40 p-4"
            >
              <div className="min-w-[180px] flex-1">
                <Field label="Label">
                  <TextInput value={row.label} onChange={(v) => setRow(i, "label", v)} placeholder="e.g. Countries" />
                </Field>
              </div>
              <div className="w-32">
                <Field label="Number">
                  <input
                    type="number"
                    min="0"
                    step="1"
                    className={inputClass}
                    value={row.value}
                    onChange={(e) => setRow(i, "value", e.target.value)}
                  />
                </Field>
              </div>
              <button
                type="button"
                onClick={() => removeRow(i)}
                disabled={draft.length <= 1}
                className="rounded-md border border-ink/10 px-3 py-2 text-sm text-ink/50 transition hover:border-clay/40 hover:text-clay disabled:cursor-not-allowed disabled:opacity-40"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        {draft.length < 6 && (
          <button type="button" className={`${btnGhost} mt-4`} onClick={addRow}>
            + Add stat
          </button>
        )}
      </div>

      <Savebar onSave={handleSave} onReset={onReset} saving={saving} saved={saved} dirty={dirty} />
    </div>
  );
}