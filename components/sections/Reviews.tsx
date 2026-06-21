import Image from "next/image";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Eyebrow from "@/components/ui/Eyebrow";
import { testimonials, type Testimonial } from "@/data/testimonials";

const SPAN_CLASS: Record<number, string> = {
  1: "",
  2: "sm:col-span-2",
  3: "sm:col-span-3",
};

const widthOf = (item: Testimonial) => (item.quote.length > 100 ? 2 : 1);

const capToRow = (desired: number, rowFill: number) =>
  Math.min(desired, 3 - rowFill);

const getInitials = (handle: string) =>
  handle
    .replace("@", "")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
// Walks the list row by row (3 columns), capping each card's width to
// whatever's left in the current row so no row ever overflows. The
// last two cards are deliberately mirrored (reversed) against the
// first two for a bookended design, as long as the first two cleanly
// close a row on their own (sum to 3) — otherwise it falls back to
// simply closing out the final row, so there's never a leftover empty
// cell no matter how many testimonials are added later (up to 8).
function computeSpans(items: Testimonial[]): number[] {
  const n = items.length;
  const spans: number[] = new Array(n).fill(1);

  if (n < 4) {
    let rowFill = 0;
    items.forEach((item, i) => {
      const span = i === n - 1 ? 3 - rowFill : capToRow(widthOf(item), rowFill);
      spans[i] = span;
      rowFill = (rowFill + span) % 3;
    });
    return spans;
  }

  let rowFill = 0;
  spans[0] = capToRow(widthOf(items[0]), rowFill);
  rowFill += spans[0];
  spans[1] = capToRow(widthOf(items[1]), rowFill);
  rowFill += spans[1];

  const firstTwoSum = spans[0] + spans[1];
  if (rowFill >= 3) rowFill = 0;

  const middleLast = n - 3;
  for (let i = 2; i <= middleLast; i++) {
    const isLastMiddle = i === middleLast && firstTwoSum === 3;
    const span = isLastMiddle
      ? 3 - rowFill
      : capToRow(widthOf(items[i]), rowFill);
    spans[i] = span;
    rowFill = (rowFill + span) % 3;
  }

  if (firstTwoSum === 3) {
    // Last two mirror the first two, regardless of their own quote length.
    spans[n - 2] = spans[1];
    spans[n - 1] = spans[0];
  } else {
    spans[n - 2] = capToRow(widthOf(items[n - 2]), rowFill);
    rowFill += spans[n - 2];
    spans[n - 1] = 3 - rowFill;
  }

  return spans;
}

export default function Reviews() {
  const spans = computeSpans(testimonials);

  return (
    <section id="reviews" className="px-6 pt-10 pb-20 md:pt-14 md:pb-28">
      <div className="mx-auto max-w-6xl">
        <AnimatedSection>
          <Eyebrow label="Reviews" />
          <h2 className="text-center font-display text-3xl font-bold text-[var(--color-ink)] sm:text-4xl">
            Loved by Creators
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-[var(--color-ink-muted)]">
            I don&apos;t just deliver edits — I make creators look good, grow
            faster, and stay consistent.
          </p>
        </AnimatedSection>

        <div className="mt-12 grid grid-cols-1 items-start gap-5 sm:grid-cols-3">
          {testimonials.map((t, i) => (
            <AnimatedSection
              key={t.handle}
              delay={i * 0.06}
              className={SPAN_CLASS[spans[i]]}
            >
              <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-accent)]/30 hover:bg-[var(--color-surface-2)]">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[var(--color-surface-2)]">
                    {t.avatar ? (
                      <Image
                        src={t.avatar}
                        alt={t.handle}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    ) : (
                      <span className="font-display text-lg text-[var(--color-accent)]">
                        {getInitials(t.handle)}
                      </span>
                    )}
                  </div>
                  <span className="font-mono text-sm text-[var(--color-ink-muted)]">
                    {t.handle}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-[var(--color-ink)]">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
