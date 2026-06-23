import Link from "next/link";
import { Plus } from "lucide-react";

type WorkFillerCardProps = {
  aspect: "video" | "portrait";
  title: string;
  description: string;
  hideBelow?: "sm" | "lg";
};

// Fills the trailing empty slot(s) in a 3-column grid when the item
// count isn't a multiple of 3, turning dead grid space into a soft
// CTA instead of an awkward half-empty last row.
export default function WorkFillerCard({
  aspect,
  title,
  description,
  hideBelow,
}: WorkFillerCardProps) {
  const visibility = hideBelow === "lg" ? "hidden lg:flex" : hideBelow === "sm" ? "hidden sm:flex" : "flex";

  return (
    <Link
      href="/contact"
      className={`group relative ${visibility} flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-[var(--color-border)] bg-[var(--color-surface)]/60 p-6 text-center transition-colors hover:border-[var(--color-accent)] ${
        aspect === "video" ? "aspect-video" : "aspect-[9/16]"
      }`}
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-full border border-dashed border-[var(--color-accent)]/50 text-[var(--color-accent)] transition-colors group-hover:bg-[var(--color-accent)] group-hover:text-[var(--color-on-accent)] group-hover:border-[var(--color-accent)]">
        <Plus size={22} />
      </span>
      <p className="font-display text-base text-[var(--color-ink)]">{title}</p>
      <p className="text-sm text-[var(--color-ink-muted)]">{description}</p>
    </Link>
  );
}
