import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";
import VideoEmbed from "@/components/ui/VideoEmbed";
import { caseStudies } from "@/data/case-studies";
import { testimonials } from "@/data/testimonials";
import { site } from "@/data/site";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);
  if (!study) return {};

  return {
    title: study.title,
    description: study.excerpt,
    alternates: {
      canonical: `/case-studies/${study.slug}`,
    },
    openGraph: {
      title: study.title,
      description: study.excerpt,
      type: "article",
    },
  };
}

export default async function CaseStudyPage({ params }: { params: Params }) {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);
  if (!study) notFound();

  const testimonial = testimonials.find((t) => t.handle === study.testimonialHandle);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: study.title,
    description: study.excerpt,
    author: {
      "@type": "Person",
      name: site.founder,
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
    mainEntityOfPage: `${site.url}/case-studies/${study.slug}`,
  };

  return (
    <div className="px-6 pt-10 pb-20 md:pt-14 md:pb-28">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="mx-auto max-w-3xl">
        <AnimatedSection>
          <Eyebrow label={study.client} />
          <h1 className="text-center font-display text-3xl font-bold text-[var(--color-ink)] sm:text-4xl">
            {study.title}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-center text-[var(--color-ink-muted)]">
            {study.excerpt}
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1} className="mt-10">
          <VideoEmbed youtubeId={study.youtubeId} thumbnail={study.thumbnail} title={study.title} />
        </AnimatedSection>

        <div className="mt-12 space-y-10">
          {study.sections.map((section, i) => (
            <AnimatedSection key={section.heading} delay={0.1 + i * 0.05}>
              <h2 className="font-display text-xl text-[var(--color-ink)]">{section.heading}</h2>
              <div className="mt-3 space-y-3">
                {section.body.map((paragraph, j) => (
                  <p key={j} className="text-[var(--color-ink-muted)]">
                    {paragraph}
                  </p>
                ))}
              </div>
            </AnimatedSection>
          ))}
        </div>

        {testimonial && (
          <AnimatedSection delay={0.2} className="mt-12 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
            <p className="font-display text-lg text-[var(--color-ink)]">
              &ldquo;{testimonial.quote}&rdquo;
            </p>
            <p className="mt-3 font-mono text-xs uppercase tracking-wide text-[var(--color-ink-faint)]">
              {testimonial.handle}
            </p>
          </AnimatedSection>
        )}

        <AnimatedSection delay={0.25} className="mt-16 text-center">
          <p className="text-[var(--color-ink-muted)]">Want an edit like this for your channel?</p>
          <div className="mt-6 flex justify-center">
            <Button href="/contact">Book a Call</Button>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
