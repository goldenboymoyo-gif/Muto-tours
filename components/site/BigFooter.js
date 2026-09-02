"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { brand } from "@/data/brand";

function splitChars(text) {
  return text.split("").map((ch, i) =>
    ch === " " ? " " : (
      <span className="char" key={i}>
        {ch}
      </span>
    )
  );
}

export default function BigFooter() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        root.querySelectorAll(".footer-cover-headline .char"),
        { yPercent: 200, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.5,
          stagger: 0.05,
          ease: "power3.inOut",
          scrollTrigger: { trigger: root, start: "top 75%" },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={rootRef} className="site-footer">
      <div className="footer-cover-headline">{splitChars("MUTO TOURS")}</div>
      <div className="footer-row">
        <a href={`mailto:${brand.contact.email}`}>{brand.contact.email}</a>
        <a href={brand.social.instagram} target="_blank" rel="noreferrer">
          Instagram
        </a>
        <a href={brand.social.facebook} target="_blank" rel="noreferrer">
          Facebook
        </a>
        <a href={brand.contact.phoneHref}>{brand.contact.phone}</a>
      </div>
      <div className="footer-copyright">
        &copy; {new Date().getFullYear()} {brand.name}. All rights reserved.
      </div>
    </footer>
  );
}
