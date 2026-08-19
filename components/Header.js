"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { brand } from "@/data/brand";
import Logo from "./Logo";

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

        <nav className="hidden lg:flex items-center gap-8" aria-label="Primary">
          {brand.nav.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-xs uppercase tracking-widest2 transition-colors relative py-1 ${
                  transparent ? "text-ivory/90 hover:text-gold" : "text-ink/70 hover:text-clay"
                } ${active ? (transparent ? "text-gold" : "text-clay font-medium") : ""}`}
              >
                {item.label}
                {active && (
                  <span
                    className={`absolute -bottom-1 left-0 right-0 h-0.5 rounded-full ${
                      transparent ? "bg-gold" : "bg-clay"
                    }`}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <Link
            href={brand.primaryCta.href}
            className={`text-xs uppercase tracking-widest2 px-6 py-2.5 rounded-sm border transition-all duration-300 ${
              transparent
                ? "border-ivory/60 text-ivory hover:bg-ivory hover:text-ink"
                : "border-clay text-clay hover:bg-clay hover:text-ivory"
            }`}
          >
            {brand.primaryCta.label}
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className={`lg:hidden inline-flex flex-col justify-center gap-1.5 h-10 w-10 ${
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
        <div id="mobile-menu" className="lg:hidden bg-ivory border-t border-ink/10">
          <nav className="container-editorial py-6 flex flex-col gap-5" aria-label="Mobile">
            {brand.nav.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm uppercase tracking-widest2 flex items-center gap-3 ${
                    active ? "text-clay font-medium" : "text-ink"
                  }`}
                >
                  {active && <span className="w-1.5 h-1.5 rounded-full bg-clay shrink-0" />}
                  {item.label}
                </Link>
              );
            })}
            <Link
              href={brand.primaryCta.href}
              className="text-xs uppercase tracking-widest2 px-6 py-2.5 rounded-sm border border-clay text-clay hover:bg-clay hover:text-ivory transition-all w-fit mt-2"
            >
              {brand.primaryCta.label}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
