"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Button from "@/components/ui/Button";

type Tag = {
  label: string;
  variant: "solid" | "ghost";
  horizontal: string;
  topPx: number;
  rotate: number;
};

// "ghost" tags are the faint, rotated decorative labels sitting behind
// the solid pills — purely for visual texture. Each tag hangs from a
// thin string anchored to the top of the card; topPx controls both the
// string's length and the tag's resting depth (fixed px, since the
// card's own height is intrinsic — percentage heights wouldn't resolve
// against an auto-height positioned ancestor).
const tags: Tag[] = [
  {
    label: "Low Views? Fixed",
    variant: "ghost",
    horizontal: "right-4 sm:right-20",
    topPx: 56,
    rotate: -6,
  },
  {
    label: "From meh to wow!",
    variant: "ghost",
    horizontal: "left-4 sm:left-35",
    topPx: 196,
    rotate: 10,
  },
  {
    label: "Watch Time Wins",
    variant: "ghost",
    horizontal: "right-[32%] sm:right-[28%]",
    topPx: 188,
    rotate: -8,
  },
  {
    label: "No Editor?  No Problem",
    variant: "solid",
    horizontal: "left-6 sm:left-28",
    topPx: 276,
    rotate: -8,
  },
  {
    label: "Conversion Boost",
    variant: "solid",
    horizontal: "right-6 sm:right-40",
    topPx: 276,
    rotate: 8,
  },
];

// Per-tag vertical nudge for the mobile "dropped on the floor" look —
// combined with each tag's own rotate, cycles if more tags are added.
const MOBILE_DROP_OFFSETS = [6, -10, 4, -6, 8];

export default function CTA() {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  // Tracked on the stable container, not the falling tags themselves —
  // those start transformed far above their resting spot, so observing
  // their own (shifted) bounding box was unreliable for triggering.
  const inView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section className="px-6 py-20 md:py-28">
      <AnimatedSection>
        <div
          ref={containerRef}
          className="dot-grid relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] px-8 pt-16 pb-3 text-center sm:min-h-[360px] sm:pb-16"
        >
          <div className="relative z-10">
            <h2 className="font-display text-3xl font-bold text-[var(--color-ink)] sm:text-5xl">
              Ready to Level Up?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[var(--color-ink-muted)]">
              Whether it&apos;s a one-off edit or a full channel transformation,
              I&apos;m ready when you are. Let&apos;s talk ideas.
            </p>
            <div className="mt-8 flex justify-center">
              <Button href="/contact">Book a Call</Button>
            </div>

            {/* Mobile: no strings, no fall — tags sit scattered below the button
                like someone dropped them, via a per-tag vertical nudge + tilt. */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:hidden">
              {tags.map((tag, i) => (
                <span
                  key={tag.label}
                  style={{ transform: `translateY(${MOBILE_DROP_OFFSETS[i % MOBILE_DROP_OFFSETS.length]}px) rotate(${tag.rotate}deg)` }}
                  className={`select-none whitespace-nowrap rounded-full px-3 py-1.5 font-mono text-[11px] uppercase tracking-wide ${
                    tag.variant === "solid"
                      ? "bg-[var(--color-accent)] text-[var(--color-on-accent)] shadow-[0_8px_24px_-8px_rgba(255,106,0,0.5)]"
                      : "bg-[var(--color-bg)]/80 text-[var(--color-ink-faint)]"
                  }`}
                >
                  {tag.label}
                </span>
              ))}
            </div>
          </div>

          {/* Desktop/tablet: tags hang from strings */}
          <div className="hidden sm:contents">
            {tags.map((tag, i) => {
              const fallDelay = reduceMotion ? 0 : 0.3 + i * 0.18;

              return (
                <div
                  key={tag.label}
                  className={`absolute top-0 z-0 ${tag.horizontal}`}
                >
                  {/* String the tag hangs from */}
                  <motion.div
                    initial={reduceMotion ? { scaleY: 1 } : { scaleY: 0 }}
                    animate={{ scaleY: reduceMotion || inView ? 1 : 0 }}
                    transition={{
                      duration: 0.5,
                      ease: "easeOut",
                      delay: fallDelay,
                    }}
                    style={{ height: `${tag.topPx}px`, transformOrigin: "top" }}
                    className="mx-auto w-px bg-[var(--color-ink-faint)]/50"
                  />
                  {/* Knot where the string meets the tag */}
                  <span
                    className="absolute h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[var(--color-ink-faint)]/50"
                    style={{ top: `${tag.topPx}px`, left: 0 }}
                  />

                  <motion.span
                    initial={
                      reduceMotion
                        ? { rotate: tag.rotate }
                        : { y: -420, rotate: tag.rotate * 4, opacity: 0 }
                    }
                    animate={
                      reduceMotion
                        ? { rotate: tag.rotate }
                        : inView
                          ? { y: 0, rotate: tag.rotate, opacity: 1 }
                          : { y: -420, rotate: tag.rotate * 4, opacity: 0 }
                    }
                    transition={{
                      type: "spring",
                      stiffness: 60,
                      damping: 13,
                      mass: 1.4,
                      delay: fallDelay,
                    }}
                    style={{ top: `${tag.topPx}px` }}
                    className={`absolute left-1/2 -translate-x-1/2 select-none whitespace-nowrap rounded-full px-4 py-2 font-mono text-xs uppercase tracking-wide ${
                      tag.variant === "solid"
                        ? "bg-[var(--color-accent)] text-[var(--color-on-accent)] shadow-[0_8px_24px_-8px_rgba(255,106,0,0.5)]"
                        : "bg-[var(--color-bg)]/80 text-[var(--color-ink-faint)]"
                    }`}
                  >
                    {tag.label}
                  </motion.span>
                </div>
              );
            })}
          </div>

        </div>
      </AnimatedSection>
    </section>
  );
}
