"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import Button from "@/components/ui/Button";
import VideoEmbed from "@/components/ui/VideoEmbed";
import { testimonials } from "@/data/testimonials";

const featuredVideoId = "N-9cWyfPjeQ";
const featuredVideoThumbnail = `https://i.ytimg.com/vi_webp/${featuredVideoId}/sddefault.webp`;

const particleCount = 80;

const stats = [
  "500+ Videos Delivered",
  "2x Engagement Boost",
  "Retention Based Editing",
  "4 Years in Industry",
  "Fast Delivery",
];

const headlineLines = [
  { text: "Turn Your Vision", highlightWord: null },
  { text: "Into Visuals", highlightWord: "Visuals" },
];

const MarqueeGroup = () => (
  <>
    {stats.map((stat) => (
      <span
        key={stat}
        className="flex items-center gap-10 whitespace-nowrap font-mono text-xs uppercase tracking-wide text-[var(--color-ink-faint)]"
      >
        {stat}
        <span className="text-[var(--color-accent)]">•</span>
      </span>
    ))}
  </>
);

function HighlightWord({ word }: { word: string }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.span
      className="relative inline-block bg-clip-text text-transparent"
      style={{
        backgroundImage:
          "linear-gradient(110deg, var(--color-accent) 42%, #ffd9a8 50%, var(--color-accent) 58%)",
        backgroundSize: "260% 100%",
      }}
      animate={shouldReduceMotion ? undefined : { backgroundPosition: ["160% 0%", "-60% 0%"] }}
      transition={{
        duration: 3.4,
        repeat: Infinity,
        repeatDelay: 1.8,
        ease: "linear",
      }}
    >
      {word}
    </motion.span>
  );
}

type Particle = { id: number; top: number; left: number; size: number; duration: number; delay: number };

const mobileParticleCount = 20;

function HeroBackground() {
  const shouldReduceMotion = useReducedMotion();

  // Generated client-side only, after mount — Math.random() here during
  // render would produce different values on the server vs. the client,
  // causing a hydration mismatch (and crashing the page under Turbopack).
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);
    const count = mobile ? mobileParticleCount : particleCount;
    setParticles(
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: 2 + Math.random() * 3,
        duration: 6 + Math.random() * 8,
        delay: Math.random() * 6,
      }))
    );
  }, []);

  // On mobile, stagger the background's entrance so it doesn't compete with
  // the headline animation for compositor time right at first paint.
  const gradientDelay = isMobile ? 0.5 : 0;
  const particlesDelay = isMobile ? 0.9 : 0;

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <motion.div
        className="absolute -left-1/4 top-[-10%] h-[60%] w-[60%] rounded-full bg-[var(--color-accent)]/25 blur-[100px]"
        initial={isMobile ? { opacity: 0 } : undefined}
        animate={
          shouldReduceMotion
            ? undefined
            : isMobile
              ? { opacity: 1, x: ["0%", "20%", "-10%", "0%"], y: ["0%", "15%", "-5%", "0%"] }
              : { x: ["0%", "20%", "-10%", "0%"], y: ["0%", "15%", "-5%", "0%"] }
        }
        transition={{
          x: { duration: 22, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 22, repeat: Infinity, ease: "easeInOut" },
          opacity: { duration: 0.6, delay: gradientDelay },
        }}
      />
      <motion.div
        className="absolute right-[-15%] top-[10%] h-[50%] w-[50%] rounded-full bg-[var(--color-accent-dim)]/25 blur-[100px]"
        initial={isMobile ? { opacity: 0 } : undefined}
        animate={
          shouldReduceMotion
            ? undefined
            : isMobile
              ? { opacity: 1, x: ["0%", "-15%", "10%", "0%"], y: ["0%", "-10%", "10%", "0%"] }
              : { x: ["0%", "-15%", "10%", "0%"], y: ["0%", "-10%", "10%", "0%"] }
        }
        transition={{
          x: { duration: 26, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 26, repeat: Infinity, ease: "easeInOut" },
          opacity: { duration: 0.6, delay: gradientDelay },
        }}
      />

      {!shouldReduceMotion && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: particlesDelay }}
        >
          {particles.map((p) => (
            <motion.span
              key={p.id}
              className="absolute rounded-full bg-[var(--color-ink-faint)]"
              style={{
                top: `${p.top}%`,
                left: `${p.left}%`,
                width: p.size,
                height: p.size,
              }}
              animate={{
                y: [0, -42, 0],
                x: [0, p.id % 2 === 0 ? 16 : -16, 0],
                opacity: [0.15, 0.7, 0.15],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: p.delay,
              }}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
}

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const line: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 28 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="relative overflow-hidden px-6 pt-20 pb-24 md:pt-28 md:pb-32">
      <HeroBackground />
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1"
        >
          <div className="flex -space-x-1.5">
            {testimonials.slice(0, 3).map((t) => (
              <div
                key={t.handle}
                className="relative h-4 w-4 overflow-hidden rounded-full border border-[var(--color-bg)] bg-[var(--color-surface-2)]"
              >
                {t.avatar && (
                  <Image src={t.avatar} alt={t.handle} fill sizes="16px" className="object-cover" />
                )}
              </div>
            ))}
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--color-ink-muted)]">
            Trusted by 20+ Creators
          </span>
        </motion.div>

        <motion.h1
          variants={container}
          initial="hidden"
          animate="show"
          className="mt-6 font-display text-5xl font-bold leading-[0.95] tracking-tight text-[var(--color-ink)] sm:text-7xl md:text-8xl"
        >
          {headlineLines.map((l) => (
            <motion.span key={l.text} variants={line} className="block">
              {l.highlightWord
                ? l.text.split(l.highlightWord).map((part, i, arr) => (
                    <span key={i}>
                      {part}
                      {i < arr.length - 1 && <HighlightWord word={l.highlightWord} />}
                    </span>
                  ))
                : l.text}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mx-auto mt-8 max-w-xl text-lg text-[var(--color-ink-muted)]"
        >
          Hook faster. Edit smarter. Grow your audience with scroll-stopping
          YouTube videos.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="mt-10 flex flex-col items-center gap-3"
        >
          <Button href="/contact">Book a Call</Button>
          <span className="font-mono text-xs text-[var(--color-ink-faint)]">
            No pressure, just possibilities.
          </span>
        </motion.div>
      </div>

      <div
        className="mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
        aria-hidden="true"
      >
        <motion.div
          className="flex w-max"
          animate={{ x: "-50%" }}
          transition={{
            duration: 45,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
          }}
        >
          <div className="flex items-center gap-10 pr-10">
            <MarqueeGroup />
            <MarqueeGroup />
          </div>
          <div className="flex items-center gap-10 pr-10">
            <MarqueeGroup />
            <MarqueeGroup />
          </div>
        </motion.div>
      </div>
      <span className="sr-only">{stats.join(", ")}</span>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mx-auto mt-16 max-w-5xl"
      >
        <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl">
          <VideoEmbed
            youtubeId={featuredVideoId}
            thumbnail={featuredVideoThumbnail}
            title="Featured Work"
          />
        </div>
      </motion.div>
    </section>
  );
}
