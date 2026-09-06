"use client";

import { useEffect, useState } from "react";
import { Field, TextArea, TextInput, ImageInput, Savebar, SectionIntro } from "./ui";

function Group({ title, children }) {
  return (
    <div className="rounded-xl border border-ink/10 bg-sand/50 p-5">
      <p className="mb-4 text-xs uppercase tracking-widest2 text-ink/50">{title}</p>
      <div className="space-y-5">{children}</div>
    </div>
  );
}

export default function BrandForm({ value, onSave, onReset }) {
  const [draft, setDraft] = useState(value);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setDraft(value);
    setSaved(false);
  }, [value]);

  const dirty = JSON.stringify(draft) !== JSON.stringify(value);

  const set = (path, v) =>
    setDraft((prev) => {
      const copy = { ...prev };
      let node = copy;
      for (let i = 0; i < path.length - 1; i++) node = node[path[i]];
      node[path[path.length - 1]] = v;
      return copy;
    });

  async function handleSave() {
    setSaving(true);
    const ok = await onSave(draft);
    setSaving(false);
    if (ok) setSaved(true);
  }

  const b = draft;

  return (
    <div>
      <SectionIntro
        kicker="Brand"
        title="Site Brand & Contact"
        dek="Name, tagline, and the contact details shown across the whole site."
      />

      <div className="space-y-6">
        <Group title="Identity">
          <Field label="Site name">
            <TextInput value={b.name} onChange={(v) => set(["name"], v)} />
          </Field>
          <Field label="Full name">
            <TextInput value={b.fullName} onChange={(v) => set(["fullName"], v)} />
          </Field>
          <Field label="Tagline">
            <TextInput value={b.tagline} onChange={(v) => set(["tagline"], v)} />
          </Field>
          <Field label="Short statement">
            <TextArea value={b.shortStatement} onChange={(v) => set(["shortStatement"], v)} rows={3} />
          </Field>
          <Field label="Founded">
            <TextInput value={b.founded} onChange={(v) => set(["founded"], v)} />
          </Field>
          <Field label="Logo">
            <ImageInput value={b.logo?.src} onChange={(v) => set(["logo", "src"], v)} />
          </Field>
        </Group>

        <Group title="Contact">
          <Field label="Phone (display)">
            <TextInput value={b.contact?.phone} onChange={(v) => set(["contact", "phone"], v)} />
          </Field>
          <Field label="Phone (link)" hint="e.g. tel:+263715127562">
            <TextInput value={b.contact?.phoneHref} onChange={(v) => set(["contact", "phoneHref"], v)} />
          </Field>
          <Field label="WhatsApp (display)">
            <TextInput value={b.contact?.whatsapp} onChange={(v) => set(["contact", "whatsapp"], v)} />
          </Field>
          <Field label="WhatsApp (link)" hint="e.g. https://wa.me/263777849430">
            <TextInput value={b.contact?.whatsappHref} onChange={(v) => set(["contact", "whatsappHref"], v)} />
          </Field>
          <Field label="Email">
            <TextInput value={b.contact?.email} onChange={(v) => set(["contact", "email"], v)} />
          </Field>
          <Field label="Address line 1">
            <TextInput value={b.contact?.address?.line1} onChange={(v) => set(["contact", "address", "line1"], v)} />
          </Field>
          <Field label="Address line 2">
            <TextInput value={b.contact?.address?.line2} onChange={(v) => set(["contact", "address", "line2"], v)} />
          </Field>
          <Field label="Address line 3">
            <TextInput value={b.contact?.address?.line3} onChange={(v) => set(["contact", "address", "line3"], v)} />
          </Field>
        </Group>

        <Group title="Social">
          <Field label="Instagram URL">
            <TextInput value={b.social?.instagram} onChange={(v) => set(["social", "instagram"], v)} />
          </Field>
          <Field label="Facebook URL">
            <TextInput value={b.social?.facebook} onChange={(v) => set(["social", "facebook"], v)} />
          </Field>
        </Group>
      </div>

      <Savebar onSave={handleSave} onReset={onReset} saving={saving} saved={saved} dirty={dirty} />
    </div>
  );
}