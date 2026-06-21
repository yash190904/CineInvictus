import { site } from "@/data/site";
import { faqItems } from "@/data/faq";
import { services } from "@/data/services";

// JSON-LD helpers. These power rich results in Google (sitelinks,
// FAQ accordions in search, knowledge panel hints). Rendered via
// <script type="application/ld+json"> in layout.tsx / page.tsx.

export function getPersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.founder,
    alternateName: site.name,
    url: site.url,
    jobTitle: "Video Editor",
    email: site.email,
    sameAs: ["https://www.instagram.com/clicksofyash/", "https://x.com/ChudasamaY1909"],
  };
}

export function getServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Video Editing",
    provider: {
      "@type": "Person",
      name: site.founder,
    },
    areaServed: "Worldwide",
    description: site.description,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Video Editing Services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.description,
        },
      })),
    },
  };
}

export function getFaqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
