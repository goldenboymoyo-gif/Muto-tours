"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { destinations } from "@/data/destinations";
import { experiences } from "@/data/experiences";

// Real, static site search — no backend needed since everything searchable
// (7 destinations, 7 experiences) already lives in data/*.js. Typing filters
// a small dropdown; selecting a result or hitting Enter navigates straight
// to that page.
const INDEX = [
  ...destinations.map((d) => ({
    type: "Destination",
    label: d.name,
    sub: d.country,
    href: `/destinations/${d.slug}`,
  })),
  ...experiences.map((e) => ({
    type: "Experience",
    label: e.name,
    sub: e.location,
    href: `/experiences/${e.slug}`,
  })),
];

function search(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return INDEX.filter((item) => `${item.label} ${item.sub}`.toLowerCase().includes(q)).slice(0, 6);
}

// Expanding search — a circular icon button that springs open into a full
// input pill. The "squish" on open/close (a spring that slightly overshoots)
// is what stands in for a literal gooey-blob effect here: a real gooey
// filter (feGaussianBlur + feColorMatrix) blurs whatever sits inside it,
// which is fine for a solid button shape but blurs input text/placeholder
// too, which isn't an acceptable tradeoff for something people need to
// actually read and type into.
//
// `light` mirrors Header.js's `transparent` state — true when this sits over
// the dark/transparent hero, false once the header has a solid background.
export default function SearchBar({ light = false, alwaysOpen = false, className = "" }) {
  const [open, setOpen] = useState(alwaysOpen);
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const router = useRouter();

  const results = search(query);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (alwaysOpen) return;
    function onPointerDown(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
        setQuery("");
      }
    }
    function onKeyDown(e) {
      if (e.key === "Escape") {
        setOpen(false);
        setQuery("");
        inputRef.current?.blur();
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [alwaysOpen]);

  function goTo(href) {
    setOpen(alwaysOpen);
    setQuery("");
    router.push(href);
  }

  function onSubmit(e) {
    e.preventDefault();
    if (results[0]) goTo(results[0].href);
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <motion.div
        initial={false}
        animate={{ width: open ? (alwaysOpen ? "100%" : 288) : 40 }}
        transition={{ type: "spring", stiffness: 320, damping: 22 }}
        className={`h-10 rounded-full flex items-center overflow-hidden transition-colors duration-300 ${
          light
            ? "bg-ivory/10 focus-within:bg-ivory/20"
            : "bg-ink/[0.04] focus-within:bg-ink/[0.08]"
        }`}
      >
        <button
          type="button"
          onClick={() => setOpen((v) => (alwaysOpen ? true : !v))}
          className={`h-10 w-10 shrink-0 flex items-center justify-center ${light ? "text-ivory" : "text-ink/70"}`}
          aria-label={open ? "Search" : "Open search"}
        >
          <Search className="h-4 w-4" />
        </button>

        <form onSubmit={onSubmit} className="flex-1 flex items-center min-w-0 pr-2">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search destinations, experiences…"
            className={`w-full min-w-0 bg-transparent text-sm outline-none ${
              light ? "text-ivory placeholder:text-ivory/50" : "text-ink placeholder:text-ink/40"
            }`}
          />
        </form>

        {open && !alwaysOpen && (
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              setQuery("");
            }}
            className={`h-10 w-9 shrink-0 flex items-center justify-center ${light ? "text-ivory/70 hover:text-ivory" : "text-ink/50 hover:text-ink"}`}
            aria-label="Close search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </motion.div>

      <AnimatePresence>
        {open && query.trim().length > 0 && (
          <motion.ul
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-full min-w-[280px] max-w-sm rounded-2xl bg-ivory shadow-[0_20px_50px_-15px_rgba(33,29,24,0.35)] border border-ink/10 overflow-hidden z-10"
          >
            {results.length > 0 ? (
              results.map((r) => (
                <li key={r.href}>
                  <button
                    type="button"
                    onClick={() => goTo(r.href)}
                    className="w-full text-left px-4 py-3 hover:bg-sand transition-colors flex items-center justify-between gap-3"
                  >
                    <span className="min-w-0">
                      <span className="block text-sm text-ink truncate">{r.label}</span>
                      <span className="block text-xs text-ink/50 truncate">{r.sub}</span>
                    </span>
                    <span className="shrink-0 text-[10px] uppercase tracking-widest2 text-clay">{r.type}</span>
                  </button>
                </li>
              ))
            ) : (
              <li className="px-4 py-3 text-sm text-ink/50">No matches for “{query}”</li>
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
