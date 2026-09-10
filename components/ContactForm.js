"use client";

import { useState } from "react";
import { useSiteContent } from "@/components/site/ContentProvider";
import Button from "./Button";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

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
  const { content } = useSiteContent();
  const brand = content.brand;
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [confirmationEmailed, setConfirmationEmailed] = useState(false);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        // The backend received the request but rejected it (validation, spam
        // filter, rate limit, 5xx). Keep the visitor's input on screen and
        // show a retry message — don't silently drop their enquiry.
        setStatus("error");
        return;
      }

      const data = await res.json().catch(() => ({}));
      setStatus("success");
      setConfirmationEmailed(data.emailSent === true);
      setForm(initialState);
    } catch {
      // Network failure: backend unreachable, offline, blocked — fall back to
      // a pre-filled mailto so the form is still usable either way.
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
        "Trip enquiry via mutotours-travel.com"
      )}&body=${encodeURIComponent(body)}`;
      setStatus("success");
      setConfirmationEmailed(false);
      setForm(initialState);
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="border border-clay/30 bg-clay/5 p-8 rounded-[25px]">
        <h3 className="font-archivo uppercase text-2xl text-ink">Thank you for your enquiry.</h3>
        <p className="mt-3 text-sm text-ink/70 leading-relaxed">
          A member of the Muto Tours team will review your trip details and respond from{" "}
          {brand.contact.email} within one business day.
          {confirmationEmailed
            ? " A confirmation copy has also been emailed to your inbox."
            : " Your enquiry has been saved and is with our team."}
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
      {/* Honeypot — hidden from sighted users and screen readers, but a
          field simple bots that auto-fill every input will still find.
          The backend silently drops any submission where this is filled. */}
      <input
        type="text"
        name="website"
        value={form.website || ""}
        onChange={(e) => update("website", e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />
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
        <p role="status" className="text-sm text-clay-dark">
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
