"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";

// Interactive bento-style gallery: a variable-span grid of real trip photos
// (plus the real Zambezi cruise video) that expands into a modal on click,
// with a draggable dock of thumbnails for jumping between items and
// drag-to-reorder on the grid itself. Adapted to this project's plain
// JS/Tailwind setup (no TypeScript/shadcn here) and restyled to the site's
// warm ink/ivory/clay palette instead of the original gray/blue demo colors.

function MediaItem({ item, className = "", onClick }) {
  const videoRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [isBuffering, setIsBuffering] = useState(true);

  useEffect(() => {
    if (item.type !== "video") return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => setIsInView(entry.isIntersecting)),
      { root: null, rootMargin: "50px", threshold: 0.1 }
    );
    if (videoRef.current) observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, [item.type]);

  useEffect(() => {
    if (item.type !== "video") return;
    let mounted = true;

    const play = async () => {
      if (!videoRef.current || !isInView || !mounted) return;
      try {
        if (videoRef.current.readyState >= 3) {
          setIsBuffering(false);
          await videoRef.current.play();
        } else {
          setIsBuffering(true);
          await new Promise((resolve) => {
            if (videoRef.current) videoRef.current.oncanplay = resolve;
          });
          if (mounted) {
            setIsBuffering(false);
            await videoRef.current.play();
          }
        }
      } catch {
        /* Autoplay can be blocked by the browser; poster/frame stays visible. */
      }
    };

    if (isInView) play();
    else if (videoRef.current) videoRef.current.pause();

    return () => {
      mounted = false;
    };
  }, [isInView, item.type]);

  if (item.type === "video") {
    return (
      <div className={`${className} relative overflow-hidden`}>
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          onClick={onClick}
          playsInline
          muted
          loop
          preload="auto"
          style={{ opacity: isBuffering ? 0.8 : 1, transition: "opacity 0.2s" }}
        >
          <source src={item.url} type="video/mp4" />
        </video>
        {isBuffering && (
          <div className="absolute inset-0 flex items-center justify-center bg-ink/10">
            <div className="w-6 h-6 border-2 border-ivory/40 border-t-ivory rounded-full animate-spin" />
          </div>
        )}
      </div>
    );
  }

  return (
    <Image
      src={item.url}
      alt={item.title}
      fill
      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
      className={`${className} object-cover cursor-pointer`}
      onClick={onClick}
      loading="lazy"
      decoding="async"
    />
  );
}

function GalleryModal({ selectedItem, onClose, setSelectedItem, mediaItems }) {
  const [dockPosition, setDockPosition] = useState({ x: 0, y: 0 });

  return (
    <>
      <motion.div
        className="fixed inset-0 z-[90] bg-ink/85 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      <motion.div
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.98, opacity: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="fixed inset-4 sm:inset-8 md:inset-16 z-[91] rounded-xl overflow-hidden"
      >
        <div className="h-full flex flex-col">
          <div className="flex-1 p-2 sm:p-3 md:p-4 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedItem.id}
                className="relative w-full aspect-[16/9] max-w-3xl h-auto max-h-[75vh] rounded-lg overflow-hidden shadow-2xl"
                initial={{ y: 20, scale: 0.97 }}
                animate={{ y: 0, scale: 1, transition: { type: "spring", stiffness: 500, damping: 30, mass: 0.5 } }}
                exit={{ y: 20, scale: 0.97, transition: { duration: 0.15 } }}
                onClick={(e) => e.stopPropagation()}
              >
                <MediaItem item={selectedItem} className="w-full h-full object-contain bg-ink" />
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-5 bg-gradient-to-t from-ink/85 to-transparent">
                  <h3 className="text-ivory text-base sm:text-lg md:text-xl font-display italic">{selectedItem.title}</h3>
                  <p className="text-ivory/80 text-xs sm:text-sm mt-1">{selectedItem.desc}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <motion.button
          type="button"
          className="absolute top-3 right-3 p-2 rounded-full bg-ivory/90 text-ink hover:bg-ivory backdrop-blur-sm"
          onClick={onClose}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </motion.button>
      </motion.div>

      <motion.div
        drag
        dragMomentum={false}
        dragElastic={0.1}
        initial={false}
        animate={{ x: dockPosition.x, y: dockPosition.y }}
        onDragEnd={(_, info) =>
          setDockPosition((prev) => ({ x: prev.x + info.offset.x, y: prev.y + info.offset.y }))
        }
        className="fixed z-[92] left-1/2 bottom-6 -translate-x-1/2 touch-none max-w-[92vw]"
      >
        <div className="relative rounded-xl bg-ink/70 backdrop-blur-xl border border-ivory/20 shadow-lg cursor-grab active:cursor-grabbing overflow-x-auto">
          <div className="flex items-center -space-x-2 px-3 py-2">
            {mediaItems.map((item, index) => (
              <motion.div
                key={item.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedItem(item);
                }}
                style={{ zIndex: selectedItem.id === item.id ? 30 : mediaItems.length - index }}
                className={`relative shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-lg overflow-hidden cursor-pointer ${
                  selectedItem.id === item.id ? "ring-2 ring-ivory shadow-lg" : "hover:ring-2 hover:ring-ivory/40"
                }`}
                initial={{ rotate: index % 2 === 0 ? -12 : 12 }}
                animate={{
                  scale: selectedItem.id === item.id ? 1.2 : 1,
                  rotate: selectedItem.id === item.id ? 0 : index % 2 === 0 ? -12 : 12,
                  y: selectedItem.id === item.id ? -8 : 0,
                }}
                whileHover={{ scale: 1.3, rotate: 0, y: -10, transition: { type: "spring", stiffness: 400, damping: 25 } }}
              >
                <MediaItem item={item} className="w-full h-full" onClick={() => setSelectedItem(item)} />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default function BentoGallery({ mediaItems }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState(mediaItems);
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div>
      <AnimatePresence mode="wait">
        {selectedItem ? (
          <GalleryModal
            selectedItem={selectedItem}
            onClose={() => setSelectedItem(null)}
            setSelectedItem={setSelectedItem}
            mediaItems={items}
          />
        ) : (
          <motion.div
            className="grid grid-flow-dense grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 auto-rows-[110px] sm:auto-rows-[90px] md:auto-rows-[80px]"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } }}
          >
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                layoutId={`media-${item.id}`}
                className={`relative overflow-hidden rounded-xl cursor-move bg-sand-deep ${item.span}`}
                onClick={() => !isDragging && setSelectedItem(item)}
                variants={{
                  hidden: { y: 40, scale: 0.94, opacity: 0 },
                  visible: {
                    y: 0,
                    scale: 1,
                    opacity: 1,
                    transition: { type: "spring", stiffness: 350, damping: 25, delay: index * 0.02 },
                  },
                }}
                whileHover={{ scale: 1.02 }}
                drag
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                dragElastic={1}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={(e, info) => {
                  setIsDragging(false);
                  const moveDistance = info.offset.x + info.offset.y;
                  if (Math.abs(moveDistance) > 50) {
                    const newItems = [...items];
                    const draggedItem = newItems[index];
                    const targetIndex = moveDistance > 0 ? Math.min(index + 1, items.length - 1) : Math.max(index - 1, 0);
                    newItems.splice(index, 1);
                    newItems.splice(targetIndex, 0, draggedItem);
                    setItems(newItems);
                  }
                }}
              >
                <MediaItem
                  item={item}
                  className="absolute inset-0 w-full h-full"
                  onClick={() => !isDragging && setSelectedItem(item)}
                />
                <motion.div
                  className="absolute inset-0 flex flex-col justify-end p-2 sm:p-3"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent" />
                  <h3 className="relative text-ivory text-xs sm:text-sm font-medium line-clamp-1">{item.title}</h3>
                  <p className="relative text-ivory/75 text-[10px] sm:text-xs mt-0.5 line-clamp-2">{item.desc}</p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
