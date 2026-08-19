"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { brand } from "@/data/brand";
import Logo from "./Logo";
import Button from "./Button";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const transparent = isHome && !scrolled && !menuOpen;

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const q = searchQuery.trim().toLowerCase();
    // Search through nav items
    const match = brand.nav.find(
      (item) => item.label.toLowerCase().includes(q) || item.href.replace("/", "").includes(q)
    );
    if (match) {
      router.push(match.href);
    } else {
      // Default to destinations if no match
      router.push(`/destinations?q=${encodeURIComponent(searchQuery.trim())}`);
    }
    setSearchQuery("");
    setSearchOpen(false);
  };

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

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
              className={`text-sm tracking-wide transition-colors relative py-1 ${
                transparent ? "text-ivory/90 hover:text-gold" : "text-ink/80 hover:text-clay"
              } ${isActive(item.href) ? (transparent ? "text-gold" : "text-clay font-medium") : ""}`}
            >
              {item.label}
              {isActive(item.href) && (
                <span
                  className={`absolute -bottom-1 left-0 right-0 h-0.5 rounded-full ${
                    transparent ? "bg-gold" : "bg-clay"
                  }`}
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {/* Search toggle */}
          <button
            type="button"
            onClick={() => setSearchOpen((v) => !v)}
            className={`inline-flex items-center justify-center h-9 w-9 rounded-full transition-colors ${
              transparent
                ? "text-ivory/70 hover:text-gold hover:bg-ivory/10"
                : "text-ink/50 hover:text-clay hover:bg-ink/5"
            }`}
            aria-label="Search"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
          <Button href={brand.primaryCta.href} variant="primary" className="px-5 py-2.5">
            {brand.primaryCta.label}
          </Button>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <button
            type="button"
            onClick={() => setSearchOpen((v) => !v)}
            className={`inline-flex items-center justify-center h-9 w-9 rounded-full transition-colors ${
              transparent ? "text-ivory/70" : "text-ink/50"
            }`}
            aria-label="Search"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className={`inline-flex flex-col justify-center gap-1.5 h-10 w-10 ${
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
      </div>

      {/* Search bar dropdown */}
      {searchOpen && (
        <div className={`border-t ${transparent ? "bg-ink/80 backdrop-blur-sm border-ivory/10" : "bg-ivory border-ink/10"}`}>
          <div className="container-editorial py-4">
            <form onSubmit={handleSearch} className="flex items-center gap-3">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={transparent ? "text-ivory/50" : "text-ink/40"}>
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search destinations, experiences..."
                autoFocus
                className={`flex-1 bg-transparent border-b-2 outline-none text-sm py-2 placeholder:transition-colors ${
                  transparent
                    ? "text-ivory border-ivory/30 placeholder:text-ivory/40 focus:border-gold"
                    : "text-ink border-ink/20 placeholder:text-ink/40 focus:border-clay"
                }`}
              />
              <button
                type="submit"
                className={`text-sm font-medium px-4 py-2 rounded-full transition-colors ${
                  transparent
                    ? "text-gold hover:bg-ivory/10"
                    : "text-clay hover:bg-clay/10"
                }`}
              >
                Go
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {menuOpen && (
        <div id="mobile-menu" className="md:hidden bg-ivory border-t border-ink/10">
          <nav className="container-editorial py-6 flex flex-col gap-5" aria-label="Mobile">
            {brand.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-base flex items-center gap-3 ${
                  isActive(item.href) ? "text-clay font-medium" : "text-ink"
                }`}
              >
                {isActive(item.href) && (
                  <span className="w-1.5 h-1.5 rounded-full bg-clay shrink-0" />
                )}
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
