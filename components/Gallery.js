"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

export default function Gallery({ photos }) {
  const [openIndex, setOpenIndex] = useState(null);
  const isOpen = openIndex !== null;

  const close = useCallback(() => setOpenIndex(null), []);
  const next = useCallback(() => setOpenIndex((i) => (i + 1) % photos.length), [photos.length]);
  const prev = useCallback(() => setOpenIndex((i) => (i - 1 + photos.length) % photos.length), [photos.length]);

  useEffect(() => {
    if (!isOpen) return;
    function onKey(e) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close, next, prev]);

  return (
    <>
      <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => setOpenIndex(i)}
            className="block w-full break-inside-avoid relative group"
            aria-label={`Open larger view: ${photo.caption}`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={800}
              height={600}
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <span className="absolute inset-0 bg-ink/0 group-hover:bg-ink/10 transition-colors" />
            <span className="absolute bottom-2 left-2 text-[10px] uppercase tracking-widest2 text-ivory bg-ink/60 px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {photo.caption}
            </span>
          </button>
        ))}
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-[100] bg-ink/95 flex items-center justify-center px-4"
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            className="absolute top-6 right-6 text-ivory/80 hover:text-ivory text-sm uppercase tracking-widest2"
            aria-label="Close"
          >
            Close &times;
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-3 sm:left-6 text-ivory/70 hover:text-ivory p-3"
            aria-label="Previous photo"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M15 5L8 12L15 19" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>

          <div className="relative max-w-5xl max-h-[80vh] w-full" onClick={(e) => e.stopPropagation()}>
            <div className="relative w-full h-[70vh]">
              <Image
                src={photos[openIndex].src}
                alt={photos[openIndex].alt}
                fill
                sizes="90vw"
                className="object-contain"
                priority
              />
            </div>
            <p className="mt-4 text-center text-ivory/70 text-sm">{photos[openIndex].caption}</p>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-3 sm:right-6 text-ivory/70 hover:text-ivory p-3"
            aria-label="Next photo"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
