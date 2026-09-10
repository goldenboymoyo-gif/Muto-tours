"use client";

import Link from "next/link";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { useSiteContent } from "@/components/site/ContentProvider";

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export default function Footer() {
  const { content } = useSiteContent();
  const { brand } = content;

  const explore = [
    { label: "Destinations", href: "/destinations" },
    { label: "Activities", href: "/experiences" },
    { label: "Itineraries", href: "/itineraries" },
    { label: "About Muto", href: "/about" },
  ];

  const plan = [
    { label: "Plan My Journey", href: "/contact" },
    { label: "Contact", href: "/contact" },
    { label: "FAQs", href: "/contact#faq" },
    { label: "Chat on WhatsApp", href: brand?.contact?.whatsappHref },
  ];

  const legal = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Use", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ];

  return (
    <footer className="bg-charcoal text-ivory">
      <div className="container-content py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <p className="font-display text-2xl leading-none text-white">
              Muto<span className="text-bronze">Tours</span>
            </p>
            <p className="mt-4 text-sm text-ivory/60 leading-relaxed max-w-sm">
              {brand?.fullName}. {brand?.tagline} — guided journeys across
              Zimbabwe, Botswana, Namibia and South Africa.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {brand?.social?.instagram && (
                <a
                  href={brand.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Muto Tours on Instagram"
                  className="rounded-full border border-ivory/20 p-2.5 text-ivory/70 hover:text-bronze hover:border-bronze transition-colors"
                >
                  <InstagramIcon />
                </a>
              )}
              {brand?.social?.facebook && (
                <a
                  href={brand.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Muto Tours on Facebook"
                  className="rounded-full border border-ivory/20 p-2.5 text-ivory/70 hover:text-bronze hover:border-bronze transition-colors"
                >
                  <FacebookIcon />
                </a>
              )}
            </div>
          </div>

          {/* Explore */}
          <div className="lg:col-span-2">
            <h3 className="eyebrow text-bronze mb-6">Explore</h3>
            <ul className="space-y-3">
              {explore.map((l) => (
                <li key={l.href + l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-ivory/70 hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Plan */}
          <div className="lg:col-span-2">
            <h3 className="eyebrow text-bronze mb-6">Plan</h3>
            <ul className="space-y-3">
              {plan.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target={l.href?.startsWith("https") ? "_blank" : undefined}
                    rel={l.href?.startsWith("https") ? "noopener noreferrer" : undefined}
                    className="text-sm text-ivory/70 hover:text-white transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h3 className="eyebrow text-bronze mb-6">Contact</h3>
            <ul className="space-y-4 text-sm text-ivory/70">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 text-bronze shrink-0" aria-hidden="true" />
                <span>
                  {brand?.contact?.address?.line1}
                  <br />
                  {brand?.contact?.address?.line2}, {brand?.contact?.address?.line3}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-bronze shrink-0" aria-hidden="true" />
                <a href={brand?.contact?.phoneHref} className="hover:text-white transition-colors">
                  {brand?.contact?.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-bronze shrink-0" aria-hidden="true" />
                <a
                  href={`mailto:${brand?.contact?.email}`}
                  className="hover:text-white transition-colors"
                >
                  {brand?.contact?.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle className="h-4 w-4 text-bronze shrink-0" aria-hidden="true" />
                <a
                  href={brand?.contact?.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {brand?.contact?.whatsapp}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <div className="container-content py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-ivory/50">
            © {new Date().getFullYear()} {brand?.fullName || "Muto Tours and Travel"}. All rights reserved.
          </p>
          <ul className="flex items-center gap-6">
            {legal.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="text-xs text-ivory/50 hover:text-ivory transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}