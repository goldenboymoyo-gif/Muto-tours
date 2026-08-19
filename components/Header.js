"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { brand } from "@/data/brand";
import Logo from "./Logo";
import Button from "./Button";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // On the homepage the header starts transparent over the hero video and
  // solidifies on scroll. On every other page it's solid from the start,
  // since there's no full-bleed hero behind it to read against.
  const transparent = isHome && !scrolled && !menuOpen;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-500 ${
        transparent ? "bg-transparent" : "bg-ivory/95 backdrop-blur-sm shadow-[0_1px_0_rgba(33,29,24,0.08)]"
      }`}
    >
      <div className="container-editorial flex items-center justify-between h-20">
        <Link href="/" className="shrink-0" aria-label="Muto Tours home">
          <Logo variant={transparent ? "light" : "dark"} />
        </Link>

        <nav className="hidden md:flex items-center gap-9" aria-label="Primary">
          {brand.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm tracking-wide transition-colors ${
                transparent ? "text-ivory/90 hover:text-gold" : "text-ink/80 hover:text-clay"
              } ${pathname === item.href ? (transparent ? "text-gold" : "text-clay") : ""}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center">
          <Button href={brand.primaryCta.href} variant="primary" className="px-5 py-2.5">
            {brand.primaryCta.label}
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className={`md:hidden inline-flex flex-col justify-center gap-1.5 h-10 w-10 ${
            transparent ? "text-ivory" : "text-ink"
          }`}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
        >
          <span className={`block h-px w-6 bg-current transition-transform ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
          <span className={`block h-px w-6 bg-current transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-px w-6 bg-current transition-transform ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
        </button>
      </div>

      {menuOpen && (
        <div id="mobile-menu" className="md:hidden bg-ivory border-t border-ink/10">
          <nav className="container-editorial py-6 flex flex-col gap-5" aria-label="Mobile">
            {brand.nav.map((item) => (
              <Link key={item.href} href={item.href} className="text-base text-ink">
                {item.label}
              </Link>
            ))}
            <Button href={brand.primaryCta.href} variant="primary" className="w-fit mt-2">
              {brand.primaryCta.label}
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
