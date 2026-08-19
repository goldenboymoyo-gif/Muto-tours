"use client";

import { useState } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";
import { brand } from "@/data/brand";
import Button from "./Button";

const initialState = {
  full_name: "",
  email: "",
  phone: "",
  destination_interest: "",
  travel_dates: "",
  party_size: "",
  message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");

    if (isSupabaseConfigured) {
      const { error } = await supabase.from("contact_submissions").insert([form]);
      if (error) {
        setStatus("error");
        return;
      }
      setStatus("success");
      setForm(initialState);
      return;
    }

    // No Supabase project wired up yet — fall back to a pre-filled mailto so
    // the form is fully usable the moment the site ships, before backend
    // setup happens. Swap this branch out once NEXT_PUBLIC_SUPABASE_URL /
    // NEXT_PUBLIC_SUPABASE_ANON_KEY are set (see .env.example).
    const body = [
      `Name: ${form.full_name}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      `Interested in: ${form.destination_interest}`,
      `Travel dates: ${form.travel_dates}`,
      `Party size: ${form.party_size}`,
      "",
      form.message,
    ].join("\n");
    window.location.href = `mailto:${brand.contact.email}?subject=${encodeURIComponent(
      "Trip enquiry via mutotours.africa"
    )}&body=${encodeURIComponent(body)}`;
    setStatus("success");
    setForm(initialState);
  }

  if (status === "success") {
    return (
      <div className="border border-clay/30 bg-clay/5 p-8">
        <h3 className="font-display text-2xl text-ink">Thank you — that's on its way.</h3>
        <p className="mt-3 text-sm text-ink/70 leading-relaxed">
          {isSupabaseConfigured
            ? "We've received your enquiry and will reply from " + brand.contact.email + " shortly."
            : "Your email app should have opened with your message ready to send. If it didn't, email us directly at " +
              brand.contact.email +
              "."}
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-5 text-sm text-clay border-b border-clay pb-0.5"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-6">
        <Field label="Full name" required>
          <input
            required
            type="text"
            value={form.full_name}
            onChange={(e) => update("full_name", e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Email" required>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className={inputClass}
          />
        </Field>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <Field label="Phone / WhatsApp">
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Party size">
          <input
            type="text"
            placeholder="e.g. 2 adults"
            value={form.party_size}
            onChange={(e) => update("party_size", e.target.value)}
            className={inputClass}
          />
        </Field>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <Field label="Destination or experience of interest">
          <input
            type="text"
            placeholder="e.g. Victoria Falls, Okavango Delta"
            value={form.destination_interest}
            onChange={(e) => update("destination_interest", e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Approximate travel dates">
          <input
            type="text"
            placeholder="e.g. Late September 2026"
            value={form.travel_dates}
            onChange={(e) => update("travel_dates", e.target.value)}
            className={inputClass}
          />
        </Field>
      </div>

      <Field label="Tell us about the trip" required>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          className={inputClass}
        />
      </Field>

      {status === "error" && (
        <p className="text-sm text-clay-dark">
          Something went wrong sending that — please try again, or email {brand.contact.email} directly.
        </p>
      )}

      <Button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : "Send Enquiry"}
      </Button>
    </form>
  );
}

const inputClass =
  "w-full border-0 border-b border-ink/25 bg-transparent py-2.5 text-ink placeholder:text-ink/35 focus:border-clay focus:ring-0 transition-colors";

function Field({ label, required, children }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-widest2 text-ink/50">
        {label} {required && <span className="text-clay">*</span>}
      </span>
      <span className="block mt-2">{children}</span>
    </label>
  );
}
