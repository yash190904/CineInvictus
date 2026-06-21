"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Play, X } from "lucide-react";
import { shortFormItems, type ShortFormItem } from "@/data/portfolio";

function ShortCard({ item, onPlay }: { item: ShortFormItem; onPlay: () => void }) {
  return (
    <button
      type="button"
      onClick={onPlay}
      aria-label={`Play short: ${item.label}`}
      className="group relative block aspect-[9/16] w-full overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]"
    >
      <Image
        src={item.thumbnail}
        alt={item.label}
        fill
        sizes="(min-width: 768px) 33vw, 50vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/40" />
      <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--color-accent)]">
        <Play size={20} className="translate-x-px fill-[var(--color-on-accent)] text-[var(--color-on-accent)]" />
      </span>
    </button>
  );
}

export default function ShortsGrid() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = shortFormItems.find((item) => item.youtubeId === activeId);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {shortFormItems.map((item) => (
          <ShortCard key={item.url} item={item} onPlay={() => setActiveId(item.youtubeId)} />
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setActiveId(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 px-6 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotate: -6, y: 40 }}
              animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
              exit={{ opacity: 0, scale: 0.6, rotate: 5, y: 30 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
              className="relative aspect-[9/16] w-full max-w-sm overflow-hidden rounded-2xl bg-black shadow-[0_30px_80px_-20px_rgba(255,106,0,0.45)]"
            >
              <button
                type="button"
                onClick={() => setActiveId(null)}
                aria-label="Close"
                className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-[var(--color-on-accent)] transition-colors hover:bg-[var(--color-accent)]"
              >
                <X size={18} />
              </button>
              {active && (
                <iframe
                  src={`https://www.youtube.com/embed/${active.youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                  title={active.label}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
