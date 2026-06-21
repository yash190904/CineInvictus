"use client";

import { useEffect, useState } from "react";
import { animate, motion, useReducedMotion } from "framer-motion";
import {
  FileArchive,
  FileVideo,
  Image as ImageIcon,
  TrendingUp,
  Trophy,
  UploadCloud,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import type { visualTypes } from "@/data/process";

function CountUp({ target, duration = 2.6 }: { target: number; duration?: number }) {
  const reduceMotion = useReducedMotion();
  const [value, setValue] = useState(reduceMotion ? target : 0);

  useEffect(() => {
    if (reduceMotion) {
      setValue(target);
      return;
    }
    const controls = animate(0, target, {
      duration,
      repeat: Infinity,
      repeatDelay: 0.8,
      ease: "easeOut",
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [reduceMotion, target, duration]);

  return (
    <span className="inline-block min-w-[7ch] tabular-nums">{value.toLocaleString()}</span>
  );
}

function IconOrb({
  icon: Icon,
  size = "md",
  delay = 0,
}: {
  icon: LucideIcon;
  size?: "sm" | "md" | "lg";
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();
  const dims = size === "lg" ? "h-16 w-16" : size === "sm" ? "h-10 w-10" : "h-12 w-12";
  const iconSize = size === "lg" ? 26 : size === "sm" ? 16 : 20;

  return (
    <motion.div
      animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
      transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay }}
      className={`relative flex ${dims} shrink-0 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface-2)]`}
    >
      <motion.div
        animate={reduceMotion ? undefined : { opacity: [0.15, 0.45, 0.15] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay }}
        className="absolute inset-0 rounded-full bg-[var(--color-accent)] blur-md"
      />
      <Icon size={iconSize} className="relative text-[var(--color-accent)]" />
    </motion.div>
  );
}

export function VisualMockup({ type }: { type: visualTypes }) {
  const reduceMotion = useReducedMotion();

  switch (type) {
    case "upload": {
      const incomingFiles = [
        { icon: FileVideo, top: "18%", left: "14%", toX: 46, toY: 22, delay: 0 },
        { icon: ImageIcon, top: "70%", left: "16%", toX: 44, toY: -20, delay: 0.6 },
        { icon: FileArchive, top: "20%", left: "82%", toX: -44, toY: 22, delay: 1.2 },
      ];

      return (
        <div className="dot-grid relative h-36 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-2)]">
          {incomingFiles.map((file, i) => (
            <motion.div
              key={i}
              animate={
                reduceMotion
                  ? undefined
                  : { x: [0, file.toX, 0], y: [0, file.toY, 0], opacity: [0.3, 1, 0.3] }
              }
              transition={{
                duration: 2.6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: file.delay,
              }}
              className="absolute flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]"
              style={{ top: file.top, left: file.left }}
            >
              <file.icon size={16} className="text-[var(--color-ink-muted)]" />
            </motion.div>
          ))}

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <IconOrb icon={UploadCloud} size="lg" />
          </div>
        </div>
      );
    }

    case "timeline": {
      const videoClips = [22, 14, 30, 18];
      const waveform = [4, 9, 6, 14, 8, 16, 7, 11, 5, 10, 13, 6, 9, 15, 8, 12, 6, 10, 14, 7];

      return (
        <div className="dot-grid relative h-36 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-2)] p-4">
          <div className="flex h-full flex-col justify-center gap-2.5">
            {/* Video track */}
            <div className="flex h-6 justify-center gap-1">
              {videoClips.map((w, i) => (
                <span
                  key={i}
                  className={`h-full rounded-md ${
                    i === 1 ? "bg-[var(--color-accent)]/70" : "bg-[var(--color-border)]"
                  }`}
                  style={{ width: `${w}%` }}
                />
              ))}
            </div>

            {/* Audio waveform track */}
            <div className="flex h-5 items-center justify-center gap-[3px]">
              {waveform.map((h, i) => (
                <span
                  key={i}
                  className="w-1 rounded-full bg-[var(--color-border)]"
                  style={{ height: `${h}px` }}
                />
              ))}
            </div>

            {/* Secondary clip track */}
            <div className="flex h-4 justify-center gap-1">
              <span className="h-full w-1/4 rounded-md bg-[var(--color-border)]" />
              <span className="h-full w-2/5 rounded-md bg-[var(--color-border)]" />
              <span className="h-full w-1/5 rounded-md bg-[var(--color-border)]" />
            </div>
          </div>

          {/* Scrubbing playhead */}
          <motion.div
            animate={reduceMotion ? undefined : { left: ["6%", "92%", "6%"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-3 bottom-3 w-px bg-[var(--color-accent)]"
            style={{ left: "6%" }}
          >
            <span className="absolute -top-1 -left-[3px] h-2 w-2 rounded-full bg-[var(--color-accent)]" />
          </motion.div>
        </div>
      );
    }

    case "feedback": {
      const cycle = { duration: 6, repeat: Infinity, ease: "easeInOut" as const };

      const clientBubble = reduceMotion
        ? { opacity: 1, y: 0 }
        : {
            opacity: [0, 1, 1, 1, 1, 0],
            y: [8, 0, 0, 0, 0, 0],
            transition: { ...cycle, times: [0, 0.05, 0.4, 0.6, 0.9, 1] },
          };

      const typingDots = reduceMotion
        ? { opacity: 0 }
        : {
            opacity: [0, 0, 1, 1, 0, 0],
            transition: { ...cycle, times: [0, 0.35, 0.4, 0.55, 0.6, 1] },
          };

      const replyBubble = reduceMotion
        ? { opacity: 1, y: 0 }
        : {
            opacity: [0, 0, 0, 1, 1, 0],
            y: [8, 8, 8, 0, 0, 0],
            transition: { ...cycle, times: [0, 0.55, 0.6, 0.65, 0.9, 1] },
          };

      return (
        <div className="dot-grid relative h-36 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-2)] px-5 py-4">
          <motion.div
            animate={clientBubble}
            className="absolute left-8 top-5 flex max-w-[58%] items-start gap-2 rounded-2xl rounded-tl-sm border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-[11px] leading-tight text-[var(--color-ink)]"
          >
            <span className="mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-border)]">
              <UserRound size={11} className="text-[var(--color-ink-muted)]" />
            </span>
            Can we trim the intro a bit?
          </motion.div>

          <motion.div
            animate={typingDots}
            className="absolute bottom-5 right-8 flex items-center gap-1 rounded-2xl rounded-br-sm border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/15 px-3 py-2.5"
          >
            {[0, 0.15, 0.3].map((d) => (
              <motion.span
                key={d}
                animate={reduceMotion ? undefined : { y: [0, -3, 0] }}
                transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut", delay: d }}
                className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]"
              />
            ))}
          </motion.div>

          <motion.div
            animate={replyBubble}
            className="absolute bottom-5 right-8 max-w-[58%] rounded-2xl rounded-br-sm bg-[var(--color-accent)] px-3 py-2 text-[11px] leading-tight text-[var(--color-on-accent)]"
          >
            Done! Sent the new cut 🎬
          </motion.div>
        </div>
      );
    }

    case "delivery": {
      const confetti = [
        { x: -38, y: -28, delay: 0 },
        { x: 36, y: -32, delay: 0.2 },
        { x: -34, y: 30, delay: 0.4 },
        { x: 40, y: 26, delay: 0.6 },
        { x: 0, y: -42, delay: 0.8 },
        { x: 0, y: 40, delay: 1 },
      ];

      return (
        <div className="dot-grid relative flex h-36 items-center justify-center gap-6 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-2)] px-6">
          <div className="relative flex h-16 w-16 shrink-0 items-center justify-center">
            {confetti.map((c, i) => (
              <motion.span
                key={i}
                animate={
                  reduceMotion
                    ? undefined
                    : { x: [0, c.x], y: [0, c.y], opacity: [1, 0], scale: [1, 0.4] }
                }
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: c.delay,
                }}
                className={`absolute h-1.5 w-1.5 rounded-full ${
                  i % 2 === 0 ? "bg-[var(--color-accent)]" : "bg-[var(--color-ink)]"
                }`}
              />
            ))}
            <motion.div
              animate={reduceMotion ? undefined : { scale: [1, 1.12, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="relative flex h-16 w-16 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface-2)]"
            >
              <div className="absolute inset-0 rounded-full bg-[var(--color-accent)]/25 blur-md" />
              <Trophy size={26} className="relative text-[var(--color-accent)]" />
            </motion.div>
          </div>

          <div className="flex flex-col">
            <span className="font-display text-3xl text-[var(--color-ink)]">
              <CountUp target={948546} />
            </span>
            <span className="mt-1 flex items-center gap-1 font-mono text-[10px] uppercase tracking-wide text-[var(--color-ink-muted)]">
              <TrendingUp size={12} className="text-[var(--color-accent)]" />
              Views &amp; Growing
            </span>
          </div>
        </div>
      );
    }

    default:
      return null;
  }
}
