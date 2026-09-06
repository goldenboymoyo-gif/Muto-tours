"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// A back-navigation link for every page. When the visitor arrived by
// clicking around the site (there's browser history to go back to), this
// steps back to whatever page they actually came from. When they landed
// here directly — a fresh tab, a shared link, a search result — there's no
// meaningful "back" to give them, so it falls back to a sensible parent
// link instead. Either way, every page always has something to navigate
// back with.
export default function BackLink({ fallbackHref = "/", fallbackLabel = "Home", className = "" }) {
  const router = useRouter();
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    setCanGoBack(window.history.length > 1);
  }, []);

  const classes =
    `inline-flex items-center gap-1.5 rounded-full bg-black/30 px-3 py-1.5 text-xs uppercase tracking-widest2 underline underline-offset-4 backdrop-blur-sm transition-colors ${className}`.trim();

  if (canGoBack) {
    return (
      <button type="button" onClick={() => router.back()} className={classes}>
        &larr; Back
      </button>
    );
  }

  return (
    <Link href={fallbackHref} className={classes}>
      &larr; {fallbackLabel}
    </Link>
  );
}
