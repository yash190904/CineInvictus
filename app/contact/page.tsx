import type { Metadata } from "next";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Eyebrow from "@/components/ui/Eyebrow";
import ContactForm from "@/components/sections/ContactForm";
import BookingWidget from "@/components/sections/BookingWidget";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a 15-minute intro call or send a message to start your next video editing project with Cine Invictus.",
};

export default function ContactPage() {
  return (
    <div className="px-6 pt-10 pb-20 md:pt-14 md:pb-28">
      <div className="mx-auto max-w-5xl">
        <AnimatedSection>
          <Eyebrow label="Contact" />
          <h1 className="text-center font-display text-4xl font-bold text-[var(--color-ink)] sm:text-5xl">
            Let&apos;s Talk Ideas
          </h1>
          <p className="mx-auto mt-4 max-w-md text-center text-[var(--color-ink-muted)]">
            Whether it&apos;s a one-off edit or a full channel transformation, tell me a bit about
            what you need and I&apos;ll get back to you within a day or two.
          </p>
        </AnimatedSection>

        <div className="mt-14 grid gap-14 md:grid-cols-2">
          <AnimatedSection delay={0.1}>
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
              <p className="font-mono text-xs uppercase tracking-wide text-[var(--color-ink-faint)]">
                Prefer to email?
              </p>
              <a
                href={`mailto:${site.email}`}
                className="mt-2 block font-display text-xl text-[var(--color-ink)] transition-colors hover:text-[var(--color-accent)]"
              >
                {site.email}
              </a>
            </div>

            <ul className="mt-8 space-y-2">
              {["Business Inquiry", "Want My Videos Edited", "Send Me Samples", "Long-Term Collaboration"].map(
                (reason) => (
                  <li
                    key={reason}
                    className="flex items-center gap-2 text-sm text-[var(--color-ink-muted)]"
                  >
                    <span className="h-1 w-1 rounded-full bg-[var(--color-accent)]" />
                    {reason}
                  </li>
                ),
              )}
            </ul>

            <div className="mt-10">
              <ContactForm />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <BookingWidget />
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
