"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { useSiteContent } from "@/components/site/ContentProvider";
import { openCookiePreferences } from "@/components/site/CookieConsent";
import { safeUrl, externalLinkProps } from "@/lib/safeUrl";

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
  const { content } = useSiteContent();
  const brand = content.brand;
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

  const emailHref = safeUrl(`mailto:${brand.contact.email}`);
  const phoneHref = safeUrl(brand.contact.phoneHref);
  const instagramHref = safeUrl(brand.social.instagram);
  const facebookHref = safeUrl(brand.social.facebook);

  return (
    <footer ref={rootRef} className="site-footer">
      <div className="footer-cover-headline">{splitChars("MUTO TOURS")}</div>
      <div className="footer-row">
        {emailHref && <a href={emailHref}>{brand.contact.email}</a>}
        {instagramHref && (
          <a href={instagramHref} {...externalLinkProps(instagramHref)}>
            Instagram
          </a>
        )}
        {facebookHref && (
          <a href={facebookHref} {...externalLinkProps(facebookHref)}>
            Facebook
          </a>
        )}
        {phoneHref && <a href={phoneHref}>{brand.contact.phone}</a>}
      </div>
      <div className="footer-legal-nav">
        <Link href="/privacy">Privacy Policy</Link>
        <Link href="/cookies">Cookie Policy</Link>
        <Link href="/terms">Terms of Use</Link>
        <button type="button" onClick={openCookiePreferences}>
          Cookie Preferences
        </button>
      </div>
      <div className="footer-copyright">
        &copy; {new Date().getFullYear()} {brand.name}. All rights reserved.
      </div>
    </footer>
  );
}