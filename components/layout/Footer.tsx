import Link from "next/link";
import { footerLinks, site, socials } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 pt-14 md:grid-cols-3">
        <div>
          <p className="font-display text-xl text-[var(--color-ink)]">
            {site.name}
          </p>
          <p className="mt-3 max-w-xs text-sm text-[var(--color-ink-muted)]">
            Helping content creators stand out with pro edits and fast delivery.
          </p>
          <p className="mt-3 max-w-xs text-sm text-[var(--color-ink-muted)]">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-ink-faint)]">
            Company
          </p>
          <ul className="mt-4 space-y-2">
            {footerLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm text-[var(--color-ink-muted)] transition-colors hover:text-[var(--color-ink)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-ink-faint)]">
            Socials
          </p>
          <ul className="mt-4 space-y-2">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--color-ink-muted)] transition-colors hover:text-[var(--color-ink)]"
                >
                  {s.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${site.email}`}
                className="text-sm text-[var(--color-ink-muted)] transition-colors hover:text-[var(--color-ink)]"
              >
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="select-none overflow-hidden px-6 pb-2 text-center leading-none [mask-image:linear-gradient(to_top,white,transparent_85%)] [-webkit-mask-image:linear-gradient(to_top,white,transparent_85%)]"
      >
        <span className="font-display text-[18vw] font-semibold text-[var(--color-footer-mark)] sm:text-[16vw] md:text-[14vw]">
          CineInvictus
        </span>
      </div>
    </footer>
  );
}
