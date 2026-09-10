"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, Mail, Phone } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useSiteContent } from "@/components/site/ContentProvider";
import ContactForm from "@/components/ContactForm";
import { safeUrl } from "@/lib/safeUrl";

export default function Contact() {
  const { content } = useSiteContent();
  const brand = content.brand;
  const rootRef = useRef(null);
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        root.querySelectorAll(".eight-content-circle"),
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "power1.out",
          stagger: 0.25,
          scrollTrigger: { trigger: root, start: "top 75%" },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  const whatsappHref = safeUrl(brand.contact.whatsappHref);
  const phoneHref = safeUrl(brand.contact.phoneHref);
  const mailtoHref = safeUrl(`mailto:${brand.contact.email}`);

  return (
    <section id="contact" ref={rootRef} className="contact-section ess-section">
      <p className="contact-kicker">We always aim to reply within 24 hours.</p>
      <div className="contact-title">Speak With One Of Our Experts</div>
      <div className="contact-circles">
        {whatsappHref && (
          <a
            className="eight-content-circle"
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle />
            <span className="eight-circle-label">WhatsApp</span>
          </a>
        )}
        <button
          type="button"
          className="eight-content-circle"
          onClick={() => setEnquiryOpen((v) => !v)}
          aria-expanded={enquiryOpen}
          aria-controls="contact-enquiry-panel"
        >
          <Mail />
          <span className="eight-circle-label">Send us an enquiry</span>
        </button>
        {phoneHref && (
          <a className="eight-content-circle" href={phoneHref}>
            <Phone />
            <span className="eight-circle-label">{brand.contact.phone}</span>
          </a>
        )}
      </div>

      {enquiryOpen && (
        <div id="contact-enquiry-panel" className="contact-enquiry-panel">
          <div className="contact-enquiry-head">
            <p className="text-xs uppercase tracking-widest2 text-clay">Plan your trip</p>
            <button
              type="button"
              onClick={() => setEnquiryOpen(false)}
              aria-label="Close enquiry form"
              className="text-ink/50 transition hover:text-ink"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
          <ContactForm />
          {mailtoHref && (
            <p className="contact-enquiry-alt">
              Prefer email? Write to us at{" "}
              <a href={mailtoHref} className="border-b border-clay/40 pb-0.5 text-clay">
                {brand.contact.email}
              </a>
              .
            </p>
          )}
        </div>
      )}
    </section>
  );
}