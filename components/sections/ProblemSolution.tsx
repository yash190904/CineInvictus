import { Check, X } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Eyebrow from "@/components/ui/Eyebrow";

const problems = [
  "Editing takes me forever.",
  "I miss uploads trying to finish videos.",
  "I hate editing. I just want to record.",
  "My videos don't look pro enough.",
  "Captions are a pain to add.",
];

const solutions = [
  "Done-for-you edits, always on time.",
  "Fast turnaround.",
  "You record. I handle the rest.",
  "Cinematic, clean, and branded.",
  "Burned-in, style-matched captions.",
];

export default function ProblemSolution() {
  return (
    <section className="px-6 pt-10 pb-20 md:pt-14 md:pb-28">
      <div className="mx-auto max-w-6xl">
        <AnimatedSection>
          <Eyebrow label="Our Solution" />
          <h2 className="text-center font-display text-3xl font-bold text-[var(--color-ink)] sm:text-4xl">
            Why Most Creators Burn Out
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-[var(--color-ink-muted)]">
            A quick side-by-side of the struggles you shouldn&apos;t have to
            deal with, and how I make sure you don&apos;t.
          </p>
        </AnimatedSection>

        <div className="dot-grid mt-12 rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 md:p-8">
          <div className="grid gap-6 sm:grid-cols-2">
            <AnimatedSection delay={0.1}>
              <div className="h-full rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-surface)]/60 p-6">
                <p className="font-display text-xl text-[var(--color-ink)]">
                  Creators Problem
                </p>
                <ul className="mt-6 space-y-5">
                  {problems.map((p) => (
                    <li
                      key={p}
                      className="flex items-center gap-3 text-sm text-[var(--color-ink-muted)]"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--color-border)]">
                        <X
                          size={12}
                          className="text-[var(--color-ink-faint)]"
                        />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="h-full rounded-2xl bg-[var(--color-bg)] p-6">
                <p className="font-display text-xl text-[var(--color-accent)]">
                  My Solution
                </p>
                <ul className="mt-6 space-y-5">
                  {solutions.map((s) => (
                    <li
                      key={s}
                      className="flex items-center gap-3 text-sm text-[var(--color-ink)]"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)]">
                        <Check size={12} className="text-[var(--color-on-accent)]" />
                      </span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
