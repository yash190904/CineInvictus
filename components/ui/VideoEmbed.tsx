"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

type VideoEmbedProps = {
  youtubeId: string;
  thumbnail: string;
  title: string;
};

// Click-to-load facade: renders just a thumbnail + play button until
// clicked, so the heavy YouTube iframe never loads on first paint.
// Good for Core Web Vitals (LCP/TBT) and therefore SEO ranking signals.
export default function VideoEmbed({ youtubeId, thumbnail, title }: VideoEmbedProps) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="h-full w-full"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Play video: ${title}`}
      className="group relative block aspect-video w-full overflow-hidden rounded-xl bg-[var(--color-surface)]"
    >
      <Image
        src={thumbnail}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/40" />
      <motion.span
        whileHover={{ scale: 1.08 }}
        className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--color-accent)]"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 translate-x-[1px]">
          <path d="M6 4.5v15l13-7.5-13-7.5Z" fill="var(--color-on-accent)" />
        </svg>
      </motion.span>
    </button>
  );
}
