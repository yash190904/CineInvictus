import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Eyebrow from "@/components/ui/Eyebrow";
import { caseStudies } from "@/data/case-studies";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "How Cine Invictus approaches real client edits, from garage vlogs to science documentaries, and what changed as a result.",
  alternates: {
    canonical: "/case-studies",
  },
};

export default function CaseStudiesPage() {
  return (
    <div className="px-6 pt-10 pb-20 md:pt-14 md:pb-28">
      <div className="mx-auto max-w-6xl">
        <AnimatedSection>
          <Eyebrow label="Case Studies" />
          <h1 className="text-center font-display text-4xl font-bold text-[var(--color-ink)] sm:text-5xl">
            Real Edits, Real Process
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-center text-[var(--color-ink-muted)]">
            A closer look at how specific videos came together: the challenge, the
            editing decisions, and what clients said afterward.
          </p>
        </AnimatedSection>

        <div className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((study, i) => (
            <AnimatedSection key={study.slug} delay={i * 0.08}>
              <Link href={`/case-studies/${study.slug}`} className="group block">
                <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-[var(--color-surface)]">
                  <Image
                    src={study.thumbnail}
                    alt={study.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="mt-4 font-mono text-xs uppercase tracking-wide text-[var(--color-ink-faint)]">
                  {study.client}
                </div>
                <h2 className="mt-2 font-display text-lg text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-accent)]">
                  {study.title}
                </h2>
                <p className="mt-1 text-sm text-[var(--color-ink-muted)]">{study.excerpt}</p>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}
