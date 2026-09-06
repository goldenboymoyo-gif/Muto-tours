"use client";

export const inputClass =
  "w-full border border-ink/15 bg-[#fffdf8] rounded-lg px-3 py-2 text-sm text-ink placeholder:text-ink/35 focus:border-clay focus:outline-none focus:ring-1 focus:ring-clay/30 transition-colors";

export const btnPrimary =
  "inline-flex items-center gap-2 rounded-full bg-clay px-5 py-2.5 text-xs uppercase tracking-widest2 text-ivory transition hover:bg-clay-dark disabled:opacity-50";

export const btnGhost =
  "inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-xs uppercase tracking-widest2 text-ink/70 transition hover:border-ink/30 hover:text-ink disabled:opacity-50";

export function Field({ label, required, hint, children }) {
  return (
    <label className="block">
      <span className="flex items-baseline gap-2 text-xs uppercase tracking-widest2 text-ink/50">
        {label} {required && <span className="text-gold">*</span>}
      </span>
      <span className="mt-1.5 block">{children}</span>
      {hint && <span className="mt-1 block text-xs text-ink/40">{hint}</span>}
    </label>
  );
}

export function TextInput({ value, onChange, ...rest }) {
  return <input type="text" className={inputClass} value={value ?? ""} onChange={(e) => onChange?.(e.target.value)} {...rest} />;
}

export function TextArea({ value, onChange, rows = 5, ...rest }) {
  return <textarea className={inputClass} rows={rows} value={value ?? ""} onChange={(e) => onChange?.(e.target.value)} {...rest} />;
}

export function ImageInput({ value, onChange, label = "Image" }) {
  return (
    <div className="flex items-start gap-3">
      <div className="h-16 w-24 shrink-0 overflow-hidden rounded-lg border border-ink/10 bg-sand-deep">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[10px] uppercase tracking-widest text-ink/35">
            None
          </div>
        )}
      </div>
      <div className="flex-1">
        <TextInput value={value} onChange={onChange} placeholder="/images/… or https://…" />
      </div>
    </div>
  );
}

export function ListEditor({ value = [], onChange, placeholder = "Add an item…" }) {
  const set = (i, v) => onChange?.(value.map((item, idx) => (idx === i ? v : item)));
  const remove = (i) => onChange?.(value.filter((_, idx) => idx !== i));
  const add = () => onChange?.([...value, ""]);

  return (
    <div className="space-y-2">
      {value.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <TextInput value={item} onChange={(v) => set(i, v)} placeholder={placeholder} />
          <button
            type="button"
            onClick={() => remove(i)}
            className="shrink-0 rounded-md border border-ink/10 px-2 py-1.5 text-xs text-ink/50 transition hover:border-clay/40 hover:text-clay"
            aria-label="Remove item"
          >
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={add} className={`${btnGhost} !py-1.5`}>
        + Add
      </button>
    </div>
  );
}

export function Savebar({ onSave, onReset, onCancel, saving, saved, dirty, disabled }) {
  return (
    <div className="sticky bottom-4 z-20 mt-10 flex items-center justify-between gap-4 rounded-2xl border border-ink/10 bg-[#fffdf8]/95 px-5 py-4 shadow-lg backdrop-blur">
      <div className="text-xs text-ink/50">
        {saved && "Saved — live on the site."}
        {!saved && dirty && "Unsaved changes."}
        {!saved && !dirty && "No changes yet."}
      </div>
      <div className="flex items-center gap-3">
        {onCancel && (
          <button type="button" className={btnGhost} onClick={onCancel}>
            Back
          </button>
        )}
        {onReset && (
          <button type="button" className={btnGhost} onClick={onReset} disabled={saving}>
            Reset to defaults
          </button>
        )}
        <button type="button" className={btnPrimary} onClick={onSave} disabled={saving || disabled}>
          {saving ? "Saving…" : "Save changes"}
        </button>
      </div>
    </div>
  );
}

export function SectionIntro({ kicker, title, dek }) {
  return (
    <div className="mb-8">
      <p className="text-xs uppercase tracking-widest2 text-gold">{kicker}</p>
      <h2 className="mt-1 font-archivo text-2xl uppercase text-ink">{title}</h2>
      {dek && <p className="mt-2 max-w-2xl text-sm text-ink/60">{dek}</p>}
    </div>
  );
}