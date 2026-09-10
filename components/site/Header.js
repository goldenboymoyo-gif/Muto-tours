"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, CalendarHeart } from "lucide-react";
import { useSiteContent } from "@/components/site/ContentProvider";

function Wordmark({ dark }) {
  return (
    <Link
      href="/"
      className="group flex items-center gap-2.5"
      aria-label="Muto Tours — home"
    >
      <span
        className={`font-display text-xl sm:text-2xl leading-none font-medium tracking-tight ${
          dark ? "text-charcoal" : "text-white"
        }`}
      >
        Muto<span className="text-bronze">Tours</span>
      </span>
      <span className="hidden sm:block h-px w-8 bg-bronze/70" aria-hidden="true" />
      <span
        className={`hidden md:block font-ui text-[10px] uppercase tracking-widest2 ${
          dark ? "text-ink/50" : "text-white/60"
        }`}
      >
        Southern Africa
      </span>
    </Link>
  );
}

const DARK_HERO_PREFIXES = ["/about", "/contact", "/destinations", "/experiences", "/itineraries"];

export default function Header() {
  const { content } = useSiteContent();
  const { brand } = content;
  const nav = brand?.nav?.length ? brand.nav : [];
  const cta = brand?.primaryCta || { label: "Enquire", href: "/contact" };

  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isDarkStart =
    pathname === "/" || DARK_HERO_PREFIXES.some((p) => pathname.startsWith(p));
  const dark = scrolled || open || !isDarkStart;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled && !open
          ? "bg-ivory/90 backdrop-blur-md border-b border-charcoal/10 shadow-[0_1px_20px_-12px_rgba(16,20,18,0.4)]"
          : open
          ? "bg-ivory"
          : "bg-transparent"
      }`}
    >
      <div className="container-content flex items-center justify-between h-16 sm:h-20">
        <Wordmark dark={dark} />

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8" aria-label="Primary">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium tracking-wide transition-colors ${
                  dark ? "text-ink/75 hover:text-charcoal" : "text-white/80 hover:text-white"
                } ${active ? (dark ? "text-charcoal" : "text-white") : ""} relative group`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1.5 left-0 h-px transition-all duration-300 ${
                    active ? "w-full bg-bronze" : "w-0 group-hover:w-full bg-bronze/70"
                  }`}
                  aria-hidden="true"
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={cta.href}
            className={`hidden lg:inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold tracking-wide transition-all duration-300 hover:-translate-y-0.5 ${
              dark
                ? "bg-charcoal text-ivory hover:bg-safari"
                : "bg-white/10 text-white border border-white/40 backdrop-blur-sm hover:bg-white/20"
            }`}
          >
            <CalendarHeart className="h-4 w-4" aria-hidden="true" />
            {cta.label}
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className={`rounded-full p-2.5 transition-colors lg:hidden ${
              dark ? "text-charcoal hover:bg-charcoal/5" : "text-white hover:bg-white/10"
            }`}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-menu"
          className="lg:hidden bg-ivory text-charcoal h-[calc(100vh-4rem)] overflow-y-auto"
        >
          <nav className="container-content py-8 flex flex-col gap-1" aria-label="Mobile">
            {nav.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-baseline justify-between border-b border-charcoal/10 py-4 ${
                  pathname === item.href ? "text-safari" : "text-charcoal"
                }`}
              >
                <span className="font-display text-3xl leading-none">
                  {item.label}
                </span>
                <span className="font-ui text-xs text-bronze tracking-widest2">
                  0{i + 1}
                </span>
              </Link>
            ))}
            <a
              href={cta.href}
              onClick={() => setOpen(false)}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-charcoal px-6 py-4 text-sm font-semibold tracking-wide text-ivory hover:bg-safari transition-colors"
            >
              <CalendarHeart className="h-4 w-4" aria-hidden="true" />
              {cta.label}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}