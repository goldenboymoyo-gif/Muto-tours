"use client";

import { useEffect, useRef } from "react";
import { MessageCircle, Mail, Phone } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useSiteContent } from "@/components/site/ContentProvider";

export default function Contact() {
  const { content } = useSiteContent();
  const brand = content.brand;
  const rootRef = useRef(null);

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

  const circles = [
    {
      Icon: MessageCircle,
      label: "WhatsApp",
      href: brand.contact.whatsappHref,
    },
    {
      Icon: Mail,
      label: "Send us an enquiry",
      href: `mailto:${brand.contact.email}`,
    },
    {
      Icon: Phone,
      label: brand.contact.phone,
      href: brand.contact.phoneHref,
    },
  ];

  return (
    <section id="contact" ref={rootRef} className="contact-section ess-section">
      <p className="contact-kicker">We always aim to reply within 24 hours.</p>
      <div className="contact-title">Speak With One Of Our Experts</div>
      <div className="contact-circles">
        {circles.map(({ Icon, label, href }) => (
          <a key={label} className="eight-content-circle" href={href}>
            <Icon />
            <span className="eight-circle-label">{label}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
