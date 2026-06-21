"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Eyebrow from "@/components/ui/Eyebrow";
import { faqItems } from "@/data/faq";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="px-6 pt-10 pb-20 md:pt-14 md:pb-28">
      <div className="mx-auto max-w-3xl">
        <AnimatedSection>
          <Eyebrow label="FAQ" />
          <h2 className="text-center font-display text-3xl font-bold text-[var(--color-ink)] sm:text-4xl">
            Got Questions? I Got Answers
          </h2>
          <p className="mt-3 text-center text-[var(--color-ink-muted)]">
            Straightforward, no-fluff answers to help you feel confident about working together.
          </p>
        </AnimatedSection>

        <div className="mt-10 divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
          {faqItems.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.question}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="font-display text-lg text-[var(--color-ink)]">
                    {item.question}
                  </span>
                  <span
                    className={`flex-shrink-0 font-mono text-xl text-[var(--color-accent)] transition-transform ${
                      isOpen ? "rotate-45" : ""
                    }`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 text-sm text-[var(--color-ink-muted)]">{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
