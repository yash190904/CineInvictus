type EyebrowProps = {
  label: string;
};

// The site's signature detail: a centered section label flanked by a
// thin "timeline" rule on either side.
export default function Eyebrow({ label }: EyebrowProps) {
  return (
    <div className="mb-6 flex items-center justify-center gap-3">
      <span className="timeline-rule flex-1" />
      <span className="font-mono text-sm uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
        {label}
      </span>
      <span className="timeline-rule timeline-rule--end flex-1" />
    </div>
  );
}
