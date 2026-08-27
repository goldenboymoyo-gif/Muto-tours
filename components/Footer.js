"use client";

import { useState } from "react";
import Link from "next/link";
import { brand } from "@/data/brand";
import Logo from "./Logo";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

function MailingListForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    try {
      const res = await fetch(`${API_URL}/api/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const body = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus("error");
        setError(body?.error || "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
      setError("Couldn't reach the server. Please try again shortly.");
    }
  }

  if (status === "success") {
    return <p className="text-sm text-gold">You're on the list — thank you.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <input
        type="email"
        required
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-ivory/10 border border-ivory/20 rounded-sm px-4 py-2.5 text-sm text-ivory placeholder:text-ivory/40 flex-1 min-w-0 focus:outline-none focus:border-gold"
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        className="bg-clay text-ivory px-5 py-2.5 rounded-sm text-xs uppercase tracking-widest2 hover:bg-clay-dark transition-colors shrink-0 disabled:opacity-60"
      >
        {status === "submitting" ? "Joining\u2026" : "Subscribe"}
      </button>
      {status === "error" && <p className="text-xs text-clay sm:hidden">{error}</p>}
    </form>
  );
}

export default function Footer() {
  return (
    <footer className="bg-ink text-ivory">
      {/* Mailing list + Travel Partners + Follow Us */}
      <div className="container-editorial py-14 border-b border-ivory/10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          {/* Mailing list */}
          <div className="md:col-span-4">
            <h3 className="text-xs uppercase tracking-widest2 text-ivory/50 mb-4">Join Our Mailing List</h3>
            <p className="text-sm text-ivory/60 leading-relaxed mb-5">
              Travel ideas, inspiration, and wonderful places to stay, delivered to your inbox.
            </p>
            <MailingListForm />
          </div>

          {/* Travel Partners */}
          <div className="md:col-span-3 md:col-start-6">
            <h3 className="text-xs uppercase tracking-widest2 text-ivory/50 mb-4">Travel Partners</h3>
            <div className="flex flex-col gap-3">
              <span className="text-xs text-ivory/40">ATTA — Association of Tour & Travel Agents</span>
              <span className="text-xs text-ivory/40">KAZA — Kavango-Zambezi Transfrontier</span>
              <span className="text-xs text-ivory/40">Zimbabwe Tourism Authority</span>
            </div>
          </div>

          {/* Follow Us */}
          <div className="md:col-span-2 md:col-start-10">
            <h3 className="text-xs uppercase tracking-widest2 text-ivory/50 mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a href={brand.social.facebook} target="_blank" rel="noopener noreferrer" className="text-ivory/60 hover:text-gold transition-colors" aria-label="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href={brand.social.instagram} target="_blank" rel="noopener noreferrer" className="text-ivory/60 hover:text-gold transition-colors" aria-label="Instagram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Link columns */}
      <div className="container-editorial py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
          {/* Destinations */}
          <div>
            <h3 className="text-xs uppercase tracking-widest2 text-ivory/50 mb-5">Destinations</h3>
            <ul className="space-y-3">
              <li><Link href="/destinations/victoria-falls" className="text-sm text-ivory/70 hover:text-gold transition-colors">Zimbabwe</Link></li>
              <li><Link href="/destinations/okavango-delta" className="text-sm text-ivory/70 hover:text-gold transition-colors">Botswana</Link></li>
              <li><Link href="/destinations/namibia" className="text-sm text-ivory/70 hover:text-gold transition-colors">Namibia</Link></li>
              <li><Link href="/destinations/victoria-falls" className="text-sm text-ivory/70 hover:text-gold transition-colors">Zambia</Link></li>
              <li><Link href="/destinations/south-africa" className="text-sm text-ivory/70 hover:text-gold transition-colors">South Africa</Link></li>
            </ul>
          </div>

          {/* Itineraries */}
          <div>
            <h3 className="text-xs uppercase tracking-widest2 text-ivory/50 mb-5">Itineraries</h3>
            <ul className="space-y-3">
              <li><Link href="/itineraries" className="text-sm text-ivory/70 hover:text-gold transition-colors">Zimbabwe</Link></li>
              <li><Link href="/itineraries" className="text-sm text-ivory/70 hover:text-gold transition-colors">Botswana</Link></li>
              <li><Link href="/itineraries" className="text-sm text-ivory/70 hover:text-gold transition-colors">Namibia</Link></li>
              <li><Link href="/itineraries" className="text-sm text-ivory/70 hover:text-gold transition-colors">Combined Region</Link></li>
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-xs uppercase tracking-widest2 text-ivory/50 mb-5">Explore</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-sm text-ivory/70 hover:text-gold transition-colors">About Us</Link></li>
              <li><Link href="/experiences" className="text-sm text-ivory/70 hover:text-gold transition-colors">Activities</Link></li>
            </ul>
          </div>

          {/* Get in Touch */}
          <div>
            <h3 className="text-xs uppercase tracking-widest2 text-ivory/50 mb-5">Get in Touch</h3>
            <ul className="space-y-3 text-sm text-ivory/70">
              <li>
                <a href={brand.contact.phoneHref} className="hover:text-gold transition-colors">
                  {brand.contact.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${brand.contact.email}`} className="hover:text-gold transition-colors">
                  {brand.contact.email}
                </a>
              </li>
              <li className="text-ivory/50 leading-relaxed pt-1">
                {brand.contact.address.line1}<br />
                {brand.contact.address.line2}<br />
                {brand.contact.address.line3}
              </li>
            </ul>
          </div>

          {/* More */}
          <div>
            <h3 className="text-xs uppercase tracking-widest2 text-ivory/50 mb-5">More</h3>
            <ul className="space-y-3">
              <li><Link href="/contact" className="text-sm text-ivory/70 hover:text-gold transition-colors">Enquire</Link></li>
              <li><Link href="/itineraries" className="text-sm text-ivory/70 hover:text-gold transition-colors">Itineraries</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-ivory/10">
        <div className="container-editorial py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ivory/40">
          <p>Copyright {new Date().getFullYear()} {brand.fullName}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold transition-colors">Subscription Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
