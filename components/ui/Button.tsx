import Link from "next/link";
import { type ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline";
  className?: string;
};

export default function Button({
  href,
  children,
  variant = "solid",
  className = "",
}: ButtonProps) {
  const base =
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 font-mono text-sm uppercase tracking-wide transition-all duration-300";

  const styles =
    variant === "solid"
      ? "bg-[var(--color-accent)] text-[var(--color-on-accent)] shadow-[0_0_0_0_rgba(255,106,0,0.5)] hover:shadow-[0_0_30px_4px_rgba(255,106,0,0.45)] hover:scale-[1.03] active:scale-[0.98]"
      : "border border-[var(--color-border)] text-[var(--color-ink)] hover:border-[var(--color-accent)]";

  const sheen =
    variant === "solid" ? (
      <span
        aria-hidden="true"
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
      />
    ) : null;

  const isInternal = href.startsWith("/") || href.startsWith("#");

  if (isInternal) {
    return (
      <Link href={href} className={`${base} ${styles} ${className}`}>
        {sheen}
        <span className="relative z-10">{children}</span>
      </Link>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${styles} ${className}`}
    >
      {sheen}
      <span className="relative z-10">{children}</span>
    </a>
  );
}
