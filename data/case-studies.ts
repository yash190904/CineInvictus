// Real case studies built from actual client work (see data/portfolio.ts
// and data/testimonials.ts). Add a new entry here to publish a new
// case study — app/case-studies/[slug]/page.tsx renders it automatically
// and app/sitemap.ts picks it up for indexing.
export type CaseStudySection = {
  heading: string;
  body: string[];
};

export type CaseStudy = {
  slug: string;
  client: string;
  title: string;
  excerpt: string;
  youtubeId: string;
  thumbnail: string;
  testimonialHandle: string;
  sections: CaseStudySection[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "dragon-auto-bmw-paint-protection-vlog",
    client: "Dragon Auto",
    title: "Turning a Paint-Protection Install Into a Binge-Worthy Garage Vlog",
    excerpt:
      "How a straightforward BMW M3 Rocklear application became one of Dragon Auto's better-paced garage videos through retention-first editing.",
    youtubeId: "GvSlmJgq0QQ",
    thumbnail: "https://i.ytimg.com/vi_webp/GvSlmJgq0QQ/sddefault.webp",
    testimonialHandle: "@DragonAuto",
    sections: [
      {
        heading: "The Challenge",
        body: [
          "Garage and install footage is repetitive by nature — wiping panels, prepping surfaces, applying film in long, similar-looking takes. Filmed in the order it happened, this kind of raw footage struggles to hold attention for more than a couple of minutes, let alone the length of a full install.",
          "Dragon Auto needed the BMW M3's Rocklear paint-protection install to read as a story with stakes — '750 Miles and Already Damaged?!' — not a procedural how-to.",
        ],
      },
      {
        heading: "The Approach",
        body: [
          "The edit was restructured around the damage-and-fix narrative hinted at in the title, opening on the problem before flashing back to the install process. Repetitive prep work was compressed with quick cutaways and texture-matched transitions so the visual rhythm never flattened out.",
          "Motion graphics call-outs were added for technical terms like 'Rocklear' and 'PPF' so viewers unfamiliar with paint protection film could follow along without breaking pace, and sound design was built to rise into the reveal moments rather than stay flat throughout.",
        ],
      },
      {
        heading: "The Result",
        body: [
          "Dragon Auto came back for this as a second project together after an earlier Corvette PPF vlog — a good sign the pacing and structure were landing with their audience.",
        ],
      },
    ],
  },
  {
    slug: "grill-theory-7-levels-of-grills",
    client: "Grill Theory",
    title: "Structuring a $200-to-$34,000 Grill Documentary So Viewers Stay for the Climb",
    excerpt:
      "Editing 'The 7 Levels of Grills' meant building escalating tension across seven price tiers without the video ever feeling like a flat list.",
    youtubeId: "fefvpsS2k6I",
    thumbnail: "https://i.ytimg.com/vi_webp/fefvpsS2k6I/sddefault.webp",
    testimonialHandle: "@GrillTheory",
    sections: [
      {
        heading: "The Challenge",
        body: [
          "Comparing seven grills across a huge price spread risks playing like a flat product list — tier one feels the same as tier seven if the edit doesn't do the work of building anticipation as the stakes (and price tags) climb.",
        ],
      },
      {
        heading: "The Approach",
        body: [
          "Each tier got its own on-screen graphic treatment, and the pacing intensified deliberately as the price climbed — quicker cuts, bigger sound design swells, more dramatic camera moves the closer the video got to the $34,000 grill.",
          "Grill Theory's research-heavy scripting needed B-roll that matched the voiceover beat-for-beat, so footage was selected and timed specifically to back up each claim as it was made rather than running generic cutaways underneath.",
        ],
      },
      {
        heading: "The Result",
        body: [
          "“You improved this video in ways I didn't expect. Has great graphics, strong music, and thorough research throughout.” — Grill Theory",
        ],
      },
    ],
  },
  {
    slug: "packvibes-zombie-deer-disease-documentary",
    client: "PackVibes",
    title: "Editing a Science Documentary on Zombie Deer Disease Without Losing the Story",
    excerpt:
      "Chronic wasting disease is dense, unsettling science — the edit had to make it clear and watchable without softening the stakes, on a first project together.",
    youtubeId: "DfXt9bTfVFI",
    thumbnail: "https://i.ytimg.com/vi_webp/DfXt9bTfVFI/sddefault.webp",
    testimonialHandle: "@PackVibes",
    sections: [
      {
        heading: "The Challenge",
        body: [
          "This was the first project with PackVibes, covering a disease with no treatment, no vaccine, and a 100% fatality rate. The subject matter is genuinely unsettling science, and the edit needed to land that weight clearly without either dumbing it down or losing viewers in jargon — all while matching a visual style PackVibes hadn't yet established on this channel.",
        ],
      },
      {
        heading: "The Approach",
        body: [
          "Custom motion graphics were built to visualize transmission and symptoms — the kind of thing that's hard to grasp from narration alone — paced to match the density of the science being explained: slower on the critical claims, faster through supporting context.",
          "Because it was a first collaboration, extra care went into nailing a visual identity PackVibes could carry into future videos, rather than just delivering a one-off edit.",
        ],
      },
      {
        heading: "The Result",
        body: [
          "“An impressive first project, with creative graphics, strong visual storytelling, and excellent handling of complex scientific concepts while staying true to our established style.” — PackVibes",
        ],
      },
    ],
  },
];
