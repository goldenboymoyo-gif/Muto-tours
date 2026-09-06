"use client";

import { useEffect, useState } from "react";
import { Field, Savebar, SectionIntro } from "./ui";
import { inputClass } from "./ui";

const STAT_FIELDS = [
  { key: "countries", label: "Countries", hint: "Number shown on the homepage in bold." },
  { key: "tourPackages", label: "Tour packages", hint: "Number of packages shown on the homepage in bold." },
];

export default function StatsForm({ value, onSave, onReset }) {
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

  const setValue = (key, v) => setDraft((d) => ({ ...d, [key]: v }));

  async function handleSave() {
    setSaving(true);
    const ok = await onSave(draft);
    setSaving(false);
    if (ok) setSaved(true);
  }

  return (
    <div>
      <SectionIntro
        kicker="Stats"
        title="Homepage Stats"
        dek="The two big numbers on the homepage. Set them to match your latest offering."
      />

      <div className="max-w-md rounded-2xl border border-ink/10 bg-[#fffdf8] p-6">
        <div className="space-y-5">
          {STAT_FIELDS.map((field) => (
            <Field label={field.label} hint={field.hint} key={field.key}>
              <input
                type="number"
                min="0"
                step="1"
                className={inputClass}
                value={draft?.[field.key] ?? ""}
                onChange={(e) => setValue(field.key, e.target.value)}
              />
            </Field>
          ))}
        </div>
      </div>

      <Savebar onSave={handleSave} onReset={onReset} saving={saving} saved={saved} dirty={dirty} />
    </div>
  );
}