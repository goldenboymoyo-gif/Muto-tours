"use client";

import { useCallback, useEffect, useState } from "react";

// Per-visitor cookie preference, saved in a plain same-site cookie. The site
// doesn't currently set any non-essential cookies, so these choices are
// forward-looking: they decide whether optional categories may be loaded, and
// are recorded so the operator can prove consent-gated features were honoured.
const COOKIE_NAME = "muto_cc";

const DEFAULT_PREFS = {
  necessary: true,
  functional: false,
  analytics: false,
  marketing: false,
};

const CATEGORIES = [
  {
    key: "necessary",
    name: "Necessary",
    locked: true,
    description: "Required for the core site to work, including remembering this preference.",
  },
  {
    key: "functional",
    name: "Functional",
    description: "Remembers choices you make, such as language or regions you prefer.",
  },
  {
    key: "analytics",
    name: "Analytics",
    description: "Helps us understand how the site is used so we can improve it.",
  },
  {
    key: "marketing",
    name: "Marketing",
    description: "Lets us show you relevant offers, for example on newsletters or social media.",
  },
];

function readStored() {
  try {
    const raw = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${COOKIE_NAME}=`));
    if (!raw) return null;
    const parsed = JSON.parse(decodeURIComponent(raw.slice(COOKIE_NAME.length + 1)));
    if (parsed && typeof parsed.necessary !== "undefined") {
      return { ...DEFAULT_PREFS, ...parsed };
    }
  } catch {
    // corrupt/old value — treat as no choice
  }
  return null;
}

function store(prefs) {
  const value = encodeURIComponent(
    JSON.stringify({ ...prefs, updated: new Date().toISOString() })
  );
  document.cookie = `${COOKIE_NAME}=${value}; max-age=31536000; path=/; SameSite=Lax`;
}

// Lets footer "Cookie Preferences" links reopen the panel from anywhere.
export function openCookiePreferences() {
  document.dispatchEvent(new CustomEvent("muto:open-cookie-preferences"));
}

export default function CookieConsent() {
  const [view, setView] = useState(null); // null | "banner" | "manage"
  const [prefs, setPrefs] = useState(DEFAULT_PREFS);

  useEffect(() => {
    const stored = readStored();
    if (stored) {
      setPrefs(stored);
      return; // already decided — stay hidden
    }
    setView("banner");
  }, []);

  useEffect(() => {
    function open() {
      setView((v) => (v === null ? "banner" : "manage"));
    }
    document.addEventListener("muto:open-cookie-preferences", open);
    return () => document.removeEventListener("muto:open-cookie-preferences", open);
  }, []);

  const acceptAll = useCallback(() => {
    const next = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
    };
    setPrefs(next);
    store(next);
    setView(null);
  }, []);

  const rejectNonEssential = useCallback(() => {
    setPrefs(DEFAULT_PREFS);
    store(DEFAULT_PREFS);
    setView(null);
  }, []);

  const save = useCallback(() => {
    store(prefs);
    setView(null);
  }, [prefs]);

  if (!view) return null;

  const toggle = (key) =>
    setPrefs((p) => ({ ...p, [key]: !p[key] }));

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie preferences"
      className="fixed inset-x-0 bottom-0 z-[100] p-4"
    >
      <div className="mx-auto max-w-2xl rounded-[25px] border border-clay/20 bg-ivory px-6 py-5 shadow-2xl md:px-8 md:py-6">
        {view === "manage" ? (
          <>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-widest2 text-clay">Manage preferences</p>
                <h3 className="mt-1 font-archivo text-lg uppercase text-ink md:text-xl">
                  Cookie preferences
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setView(null)}
                aria-label="Close cookie preferences"
                className="text-ink/50 transition hover:text-ink"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mt-6 space-y-4">
              {CATEGORIES.map((cat) => {
                const checked = prefs[cat.key];
                return (
                  <div
                    key={cat.key}
                    className="flex items-center justify-between gap-6 rounded-xl border border-clay/10 bg-sand px-4 py-3"
                  >
                    <div>
                      <p className="text-sm font-medium text-ink">
                        {cat.name}
                        {cat.locked && (
                          <span className="ml-2 text-[11px] uppercase tracking-widest2 text-ink/40">
                            Always on
                          </span>
                        )}
                      </p>
                      <p className="mt-0.5 text-xs leading-relaxed text-ink/60">{cat.description}</p>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={checked}
                      disabled={cat.locked}
                      onClick={() => toggle(cat.key)}
                      className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                        checked ? "bg-clay" : "bg-ink/20"
                      } ${cat.locked ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}
                      aria-label={`${cat.name} cookies`}
                    >
                      <span
                        className={`absolute top-0.5 block h-5 w-5 rounded-full bg-ivory transition ${
                          checked ? "left-[22px]" : "left-0.5"
                        }`}
                      />
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
              <button
                type="button"
                onClick={rejectNonEssential}
                className="rounded-full border border-clay/30 px-5 py-2.5 text-xs uppercase tracking-widest2 text-ink transition hover:bg-ink/5"
              >
                Reject non-essential
              </button>
              <button
                type="button"
                onClick={save}
                className="rounded-full bg-clay px-7 py-2.5 text-xs uppercase tracking-widest2 text-ivory transition hover:bg-clay-dark"
              >
                Save preferences
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="text-xs uppercase tracking-widest2 text-clay">Cookies</p>
            <p className="mt-2 text-sm leading-relaxed text-ink/80">
              We use a small number of cookies to keep the site working and to remember this
              choice. We don&apos;t currently set any tracking or advertising cookies on this
              site.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={acceptAll}
                className="rounded-full bg-clay px-6 py-2.5 text-xs uppercase tracking-widest2 text-ivory transition hover:bg-clay-dark"
              >
                Accept all
              </button>
              <button
                type="button"
                onClick={rejectNonEssential}
                className="rounded-full border border-clay/30 px-6 py-2.5 text-xs uppercase tracking-widest2 text-ink transition hover:bg-ink/5"
              >
                Reject non-essential
              </button>
              <button
                type="button"
                onClick={() => setView("manage")}
                className="px-2 py-2.5 text-xs uppercase tracking-widest2 text-clay underline decoration-clay/30 underline-offset-4 transition hover:text-clay-dark"
              >
                Manage preferences
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}