import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { caseStudies } from "@/data/case-studies";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/projects", "/contact", "/case-studies"];

  const staticEntries: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));

  const caseStudyEntries: MetadataRoute.Sitemap = caseStudies.map((study) => ({
    url: `${site.url}/case-studies/${study.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...caseStudyEntries];
}
