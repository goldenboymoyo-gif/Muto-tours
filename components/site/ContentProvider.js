"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { DEFAULT_CONTENT, mergeContent, fetchStoredContent } from "@/lib/content";

const ContentContext = createContext({ content: DEFAULT_CONTENT });

// Hook for client components that need live site content (brand, listings…).
export function useSiteContent() {
  return useContext(ContentContext);
}

// Fetches CMS content once per page load and layers it over the static
// defaults. Everything rendered with the static default until the fetch
// resolves, so there is never a blank/loading flash.
export default function ContentProvider({ children }) {
  const [content, setContent] = useState(DEFAULT_CONTENT);

  useEffect(() => {
    let active = true;
    (async () => {
      const stored = await fetchStoredContent();
      if (active && stored) {
        setContent(mergeContent(stored));
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  return <ContentContext.Provider value={{ content }}>{children}</ContentContext.Provider>;
}