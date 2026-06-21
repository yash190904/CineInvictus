import AnimatedSection from "@/components/ui/AnimatedSection";
import Eyebrow from "@/components/ui/Eyebrow";
import VideoEmbed from "@/components/ui/VideoEmbed";
import { portfolioItems } from "@/data/portfolio";

const homeItems = portfolioItems.slice(0, 3);

export default function Portfolio() {
  return (
    <section className="px-6 pt-20 pb-10 md:pt-28 md:pb-14">
      <div className="mx-auto max-w-6xl">
        <AnimatedSection>
          <Eyebrow label="Hall of Fame" />
          <h2 className="text-center font-display text-3xl font-bold text-[var(--color-ink)] sm:text-4xl">
            My Recent Edits in Action
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-[var(--color-ink-muted)]">
            From vlogs to talking heads, here&apos;s a glimpse of how I turn raw footage into
            results.
          </p>
        </AnimatedSection>

        <div className="mt-12">
          {homeItems[0] && (
            <AnimatedSection className="mx-auto max-w-3xl">
              <VideoEmbed
                youtubeId={homeItems[0].youtubeId}
                thumbnail={homeItems[0].thumbnail}
                title={homeItems[0].title}
              />
              <div className="mt-4 font-mono text-xs uppercase tracking-wide text-[var(--color-ink-faint)]">
                {homeItems[0].client}
              </div>
              <h3 className="mt-2 font-display text-xl text-[var(--color-ink)]">
                {homeItems[0].title}
              </h3>
              <p className="mt-1 text-sm text-[var(--color-ink-muted)]">
                {homeItems[0].description}
              </p>
            </AnimatedSection>
          )}

          <div className="mx-auto mt-12 grid max-w-3xl gap-10 md:grid-cols-2">
            {homeItems.slice(1).map((item, i) => (
              <AnimatedSection key={item.youtubeId} delay={i * 0.1}>
                <VideoEmbed
                  youtubeId={item.youtubeId}
                  thumbnail={item.thumbnail}
                  title={item.title}
                />
                <div className="mt-4 font-mono text-xs uppercase tracking-wide text-[var(--color-ink-faint)]">
                  {item.client}
                </div>
                <h3 className="mt-2 font-display text-lg text-[var(--color-ink)]">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-[var(--color-ink-muted)]">{item.description}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
