"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSiteContent } from "@/components/site/ContentProvider";

const NAV = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "Itineraries", href: "/itineraries" },
  { label: "Activities", href: "/experiences" },
  { label: "About", href: "/about" },
];

export default function SubHeader() {
  const { content } = useSiteContent();
  const brand = content.brand;
  const pathname = usePathname();

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(236, 229, 213, 0.92)",
        backdropFilter: "blur(6px)",
        borderBottom: "1px solid rgba(75, 54, 33, 0.15)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-archivo)",
            fontSize: 18,
            letterSpacing: "0.02em",
            color: "#4b3621",
            textDecoration: "none",
          }}
        >
          {brand.name}
        </Link>
        <nav style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          {NAV.map((item) => {
            const active = item.href !== "/" && pathname.startsWith(item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                style={{
                  fontSize: 13,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  color: active ? "#fc6d42" : "#4b3621",
                  borderBottom: active ? "1px solid #fc6d42" : "1px solid transparent",
                  paddingBottom: 2,
                }}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            style={{
              fontSize: 13,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              textDecoration: "none",
              color: "#ece5d5",
              background: "#4b3621",
              padding: "8px 18px",
              borderRadius: 50,
            }}
          >
            Enquire
          </Link>
        </nav>
      </div>
    </header>
  );
}
