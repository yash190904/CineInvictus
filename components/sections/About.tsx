import Image from "next/image";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Eyebrow from "@/components/ui/Eyebrow";

export default function About() {
  return (
    <section className="px-6 pt-10 pb-20 md:pt-14 md:pb-28">
      <div className="mx-auto max-w-6xl">
        <AnimatedSection>
          <Eyebrow label="About" />
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <h2 className="mx-auto mt-6 max-w-4xl text-center font-display text-3xl font-bold leading-tight text-[var(--color-ink)] sm:text-4xl md:text-5xl">
            <span className="text-[var(--color-accent)]">Cine Invictus</span> delivers
            cinematic video editing for <span className="text-[var(--color-accent)]">YouTubers</span> and{" "}
            <span className="text-[var(--color-accent)]">creative teams.</span>
          </h2>
        </AnimatedSection>

        <div className="mt-16 grid gap-12 md:grid-cols-2 md:items-start">
          {/* Image */}
          <AnimatedSection delay={0.2}>
            <div className="relative aspect-square overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]">
              <Image
                src="https://framerusercontent.com/images/bF9g0k0lxLsir2H4IFjNFZJwj4.png"
                alt="Yashraj, founder of Cine Invictus"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-top"
              />
            </div>
          </AnimatedSection>

          {/* Content */}
          <AnimatedSection delay={0.3}>
            <div className="flex h-full flex-col justify-start">
              <p className="text-xl leading-9 text-[var(--color-ink-muted)]">
                I'm Yashraj, a professional video editor and the creator of Cine
                Invictus. I help creators transform raw footage into engaging,
                story-driven content that gets results.
              </p>

              <p className="mt-8 text-xl leading-9 text-[var(--color-ink-muted)]">
                Every edit is crafted with audience retention, pacing, sound
                design, and visual storytelling in mind. My goal is simple:
                create videos that capture attention, strengthen your brand, and
                help your content perform better.
              </p>

              <p className="mt-8 text-xl leading-9 text-[var(--color-ink-muted)]">
                With experience across YouTube, documentaries, talking-head
                content, shorts, and cinematic edits, I focus on turning ideas
                into content that people actually want to watch.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
