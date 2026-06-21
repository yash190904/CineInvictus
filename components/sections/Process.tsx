import AnimatedSection from "@/components/ui/AnimatedSection";
import Eyebrow from "@/components/ui/Eyebrow";
import { processSteps } from "@/data/process";
import { VisualMockup } from "../ui/VisualMockup";

export default function Process() {
  return (
    <section id="process" className="px-6 pt-10 pb-20 md:pt-14 md:pb-28">
      <div className="mx-auto max-w-6xl">
        <AnimatedSection>
          <Eyebrow label="Process" />
          <h2 className="text-center font-display text-3xl font-bold text-[var(--color-ink)] sm:text-4xl">
            How It Works
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-[var(--color-ink-muted)]">
            A quick overview of how I work to make your edit best in class.
          </p>
        </AnimatedSection>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {processSteps.map((step, i) => (
            <AnimatedSection key={step.number} delay={i * 0.1}>
              <div className="relative rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 pt-9">
                <span className="absolute -top-3 -left-3 flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] font-mono text-sm text-[var(--color-ink)] shadow-sm">
                  {step.number}
                </span>

                <VisualMockup type={step.visualType} />

                <h3 className="mt-6 font-display text-xl text-[var(--color-ink)]">
                  {step.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-[var(--color-ink-muted)]">
                  {step.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
