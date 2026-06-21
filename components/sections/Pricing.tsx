"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";
import { pricingPlans } from "@/data/pricing";

export default function Pricing() {
  const reduceMotion = useReducedMotion();
  const mainPlans = pricingPlans.filter((plan) => !plan.custom);
  const customPlan = pricingPlans.find((plan) => plan.custom);

  return (
    <section id="pricing" className="px-6 pt-10 pb-20 md:pt-14 md:pb-28">
      <div className="mx-auto max-w-6xl">
        <AnimatedSection>
          <Eyebrow label="Pricing" />
          <h2 className="text-center font-display text-3xl font-bold text-[var(--color-ink)] sm:text-4xl">
            Simple Plans
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-[var(--color-ink-muted)]">
            Whether you&apos;re uploading weekly or scaling fast, there&apos;s a plan tailored to
            your content flow.
          </p>
        </AnimatedSection>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {mainPlans.map((plan, i) => (
            <AnimatedSection key={plan.name} delay={i * 0.08}>
              <div
                className={`flex h-full flex-col rounded-2xl border p-7 ${
                  plan.highlight
                    ? "border-[var(--color-accent)] bg-[var(--color-surface-2)]"
                    : "border-[var(--color-border)] bg-[var(--color-surface)]"
                }`}
              >
                {plan.highlight && (
                  <span className="mb-3 inline-block w-fit rounded-full bg-[var(--color-accent)] px-3 py-1 font-mono text-xs uppercase tracking-wide text-[var(--color-on-accent)]">
                    Most Popular
                  </span>
                )}
                <h3 className="font-display text-xl text-[var(--color-ink)]">{plan.name}</h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="font-display text-3xl text-[var(--color-ink)]">
                    {plan.price}
                  </span>
                  <span className="font-mono text-sm text-[var(--color-ink-faint)]">
                    {plan.cadence}
                  </span>
                </div>
                <p className="mt-2 text-sm text-[var(--color-ink-muted)]">{plan.audience}</p>

                <ul className="mt-6 flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-sm text-[var(--color-ink-muted)]"
                    >
                      <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-[var(--color-accent)]" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Button href="/contact" className="mt-8 w-full">
                  Book a Call
                </Button>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {customPlan && (
          <AnimatedSection delay={0.24} className="mt-6">
            <div className="dot-grid relative overflow-hidden rounded-2xl border border-dashed border-[var(--color-accent)]/40 bg-[var(--color-surface)] p-7 md:flex md:items-center md:justify-between md:gap-10">
              <div className="flex items-start gap-4">
                <motion.div
                  animate={reduceMotion ? undefined : { rotate: [0, 8, -8, 0] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                  className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[var(--color-accent)]/40 bg-[var(--color-surface-2)]"
                >
                  <div className="absolute inset-0 rounded-full bg-[var(--color-accent)]/20 blur-md" />
                  <Sparkles size={20} className="relative text-[var(--color-accent)]" />
                </motion.div>

                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-accent)]">
                    {customPlan.name}
                  </p>
                  <h3 className="mt-1 font-display text-2xl text-[var(--color-ink)]">
                    Got something different in mind?
                  </h3>
                  <p className="mt-2 max-w-md text-sm text-[var(--color-ink-muted)]">
                    {customPlan.audience}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-2 md:mt-0 md:max-w-xs md:justify-end">
                {customPlan.features.slice(0, 3).map((f) => (
                  <span
                    key={f}
                    className="rounded-full border border-[var(--color-border)] px-3 py-1.5 text-xs text-[var(--color-ink-muted)]"
                  >
                    {f}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex shrink-0 items-center gap-5 md:mt-0">
                <motion.span
                  animate={
                    reduceMotion ? undefined : { opacity: [0.5, 1, 0.5] }
                  }
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  className="font-display text-4xl text-[var(--color-accent)]"
                >
                  ?
                </motion.span>
                <Button href="/contact" className="whitespace-nowrap">
                  Let&apos;s Talk Pricing
                </Button>
              </div>
            </div>
          </AnimatedSection>
        )}
      </div>
    </section>
  );
}
