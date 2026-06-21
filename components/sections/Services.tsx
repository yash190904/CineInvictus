import AnimatedSection from "@/components/ui/AnimatedSection";
import Eyebrow from "@/components/ui/Eyebrow";
import VideoEmbed from "@/components/ui/VideoEmbed";
import { servicesTab1, servicesTab2, type Service } from "@/data/services";

function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-accent)]/30 hover:bg-[var(--color-surface-2)]">
      {/* Visual context: real edit preview */}
      {/* <VideoEmbed
        youtubeId={service.youtubeId}
        thumbnail={service.thumbnail}
        title={service.title}
      /> */}

      {/* Title */}
      <h3 className="relative mt-6 font-display text-2xl text-[var(--color-ink)] md:text-3xl">
        {service.title}
      </h3>

      {/* Description */}
      <p className="relative mt-3 max-w-xl text-base leading-7 text-[var(--color-ink-muted)] md:text-lg">
        {service.description}
      </p>

      {/* Tags */}
      <div className="relative mt-auto flex flex-wrap gap-3 pt-6">
        {service.tags.map(({ label, icon: Icon }) => (
          <span
            key={label}
            className="flex items-center gap-2 rounded-full border border-[var(--color-border)] px-4 py-2.5 text-sm text-[var(--color-ink)] transition-colors group-hover:border-[var(--color-accent)]/30"
          >
            <Icon className="h-4 w-4 text-[var(--color-accent)]" />
            {label}
          </span>
        ))}
      </div>

      {/* Subtle Glow */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[var(--color-accent)]/10 blur-3xl" />
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <section id="services" className="px-6 pt-10 pb-20 md:pt-14 md:pb-28">
      <div className="mx-auto max-w-6xl">
        <AnimatedSection>
          <Eyebrow label="Services" />

          <h2 className="mt-4 text-center font-display text-4xl font-bold text-[var(--color-ink)] md:text-5xl">
            What I Do Best
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-center text-lg leading-8 text-[var(--color-ink-muted)]">
            I create retention-focused edits that help creators grow faster,
            look more professional, and keep viewers watching longer.
          </p>
        </AnimatedSection>

        <div className="mt-16 grid grid-cols-1 gap-5">
          <div className="grid grid-cols-12 gap-5">
            {servicesTab1.map((service, i) => (
              <AnimatedSection
                key={service.title}
                delay={i * 0.08}
                className={`
    ${i === 0 ? "col-span-12 md:col-span-7" : ""}
    ${i === 1 ? "col-span-12 md:col-span-5" : ""}
  `}
              >
                <ServiceCard service={service} />
              </AnimatedSection>
            ))}
          </div>
          <div className="grid grid-cols-12 gap-5">
            {servicesTab2.map((service, i) => (
              <AnimatedSection
                key={service.title}
                delay={i * 0.08}
                className={`
    ${i === 0 ? "col-span-12 md:col-span-5" : ""}
    ${i === 1 ? "col-span-12 md:col-span-7" : ""}
  `}
              >
                <ServiceCard service={service} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
