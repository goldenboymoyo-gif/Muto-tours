"use client";

import Link from "next/link";
import { useSiteContent } from "@/components/site/ContentProvider";
import { openCookiePreferences } from "@/components/site/CookieConsent";
import { safeUrl } from "@/lib/safeUrl";

export default function SubFooter() {
  const { content } = useSiteContent();
  const brand = content.brand;
  const emailHref = safeUrl(`mailto:${brand.contact.email}`);
  const phoneHref = safeUrl(brand.contact.phoneHref);
  return (
    <footer
      style={{
        background: "#4b3621",
        backgroundImage: "url(/images/noise2.png)",
        color: "#ece5d5",
        marginTop: 0,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "48px 24px",
          display: "flex",
          flexDirection: "column",
          gap: 32,
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-archivo)",
            fontSize: 22,
            letterSpacing: "0.02em",
          }}
        >
          {brand.name}
        </div>
        <div
          style={{
            display: "flex",
            gap: 28,
            flexWrap: "wrap",
            fontSize: 13,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          {emailHref && (
            <a href={emailHref} style={{ color: "#ece5d5", textDecoration: "none" }}>
              {brand.contact.email}
            </a>
          )}
          {phoneHref && (
            <a href={phoneHref} style={{ color: "#ece5d5", textDecoration: "none" }}>
              {brand.contact.phone}
            </a>
          )}
          <Link href="/destinations" style={{ color: "#ece5d5", textDecoration: "none" }}>
            Destinations
          </Link>
          <Link href="/experiences" style={{ color: "#ece5d5", textDecoration: "none" }}>
            Activities
          </Link>
          <Link href="/contact" style={{ color: "#ece5d5", textDecoration: "none" }}>
            Contact
          </Link>
        </div>
        <div
          style={{
            display: "flex",
            gap: 24,
            flexWrap: "wrap",
            fontSize: 13,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            opacity: 1,
          }}
        >
          <Link href="/privacy" style={{ color: "#ece5d5", textDecoration: "none" }}>
            Privacy Policy
          </Link>
          <Link href="/cookies" style={{ color: "#ece5d5", textDecoration: "none" }}>
            Cookie Policy
          </Link>
          <Link href="/terms" style={{ color: "#ece5d5", textDecoration: "none" }}>
            Terms of Use
          </Link>
          <button
            type="button"
            onClick={openCookiePreferences}
            style={{
              color: "#ece5d5",
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
              font: "inherit",
              letterSpacing: "inherit",
              textTransform: "inherit",
            }}
          >
            Cookie Preferences
          </button>
        </div>
        <p style={{ margin: 0, fontSize: 12, opacity: 0.7 }}>
          {brand.contact.address.line1}, {brand.contact.address.line2}, {brand.contact.address.line3}
        </p>
        <p style={{ margin: 0, fontSize: 12, opacity: 0.6 }}>
          &copy; {new Date().getFullYear()} {brand.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}