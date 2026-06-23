import type { Metadata } from "next";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Eyebrow from "@/components/ui/Eyebrow";
import VideoEmbed from "@/components/ui/VideoEmbed";
import Button from "@/components/ui/Button";
import WorkFillerCard from "@/components/ui/WorkFillerCard";
import ShortsGrid from "@/components/sections/ShortsGrid";
import { portfolioItems } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Projects & Portfolio",
  description:
    "A selection of long-form and short-form video edits delivered for YouTubers, vloggers, and creative teams — from talking-head videos to viral Shorts.",
  alternates: {
    canonical: "/projects",
  },
};

const fillerCopy = {
  title: "Your Video Could Be Here",
  description: "Got a channel that needs a retention-first edit? Let's fill this slot with your next video.",
};

export default function ProjectsPage() {
  const longFormItems = portfolioItems.slice(3);
  // Mobile is 1 column (always fills evenly, no filler needed), md is
  // 2 columns, lg+ is 3 columns — each of the latter two needs its own
  // even/odd check, shown only at its own breakpoint range.
  const tabletNeedsFiller = longFormItems.length % 2 !== 0;
  const desktopNeedsFiller = longFormItems.length % 3 !== 0;

  return (
    <div className="px-6 pt-10 pb-20 md:pt-14 md:pb-28">
      <div className="mx-auto max-w-6xl">
        <AnimatedSection>
          <Eyebrow label="Works" />
          <h1 className="text-center font-display text-4xl font-bold text-[var(--color-ink)] sm:text-5xl">
            Selected Projects
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-center text-[var(--color-ink-muted)]">
            Long-form, short-form, and everything in between — a look at how raw footage becomes
            results.
          </p>
        </AnimatedSection>

        <div className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {longFormItems.map((item, i) => (
            <AnimatedSection key={item.youtubeId} delay={i * 0.08}>
              <VideoEmbed
                youtubeId={item.youtubeId}
                thumbnail={item.thumbnail}
                title={item.title}
              />
              <div className="mt-4 flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-[var(--color-ink-faint)]">
                <span>{item.client}</span>
              </div>
              <h3 className="mt-2 font-display text-lg text-[var(--color-ink)]">{item.title}</h3>
              <p className="mt-1 text-sm text-[var(--color-ink-muted)]">{item.description}</p>
            </AnimatedSection>
          ))}
          {tabletNeedsFiller && (
            <WorkFillerCard aspect="video" visibility="hidden md:flex lg:hidden" {...fillerCopy} />
          )}
          {desktopNeedsFiller && (
            <WorkFillerCard aspect="video" visibility="hidden lg:flex" {...fillerCopy} />
          )}
        </div>

        <AnimatedSection className="mt-10">
          <Eyebrow label="Short Form" />
          <h2 className="text-center font-display text-2xl font-bold text-[var(--color-ink)] sm:text-3xl">
            Shorts &amp; Reels
          </h2>
        </AnimatedSection>

        <div className="mt-8">
          <ShortsGrid />
        </div>

        <AnimatedSection className="mt-20 text-center">
          <p className="text-[var(--color-ink-muted)]">Want results like these for your channel?</p>
          <div className="mt-6 flex justify-center">
            <Button href="/contact">Book a Call</Button>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
