// Real case studies built from actual client work (see data/portfolio.ts
// and data/testimonials.ts). Add a new entry here to publish a new
// case study. app/case-studies/[slug]/page.tsx renders it automatically,
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
          "Garage and install footage is repetitive by nature. Wiping panels, prepping surfaces, applying film, all in long, similar-looking takes. Filmed in the order it happened, this kind of raw footage struggles to hold attention for more than a couple of minutes, let alone the length of a full install.",
          "Dragon Auto needed the BMW M3's Rocklear paint-protection install to read like a story with stakes, something closer to '750 Miles and Already Damaged?!' than a procedural how-to.",
        ],
      },
      {
        heading: "The Approach",
        body: [
          "The edit got restructured around that damage-and-fix hook, opening on the problem before flashing back to the install process. The repetitive prep work was compressed using quick cutaways and texture-matched transitions, so the visual rhythm never went flat.",
          "Motion graphics call-outs were added for technical terms like 'Rocklear' and 'PPF', so viewers who didn't already know paint protection film could keep up without breaking pace. Sound design was built to rise into the reveal moments instead of staying flat the whole way through.",
        ],
      },
      {
        heading: "The Result",
        body: [
          "Dragon Auto brought us back for this one after an earlier Corvette PPF vlog. A second project together is usually a decent sign the pacing and structure were working for their audience.",
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
          "Comparing seven grills across a huge price spread risks playing like a flat product list, where tier one feels about the same as tier seven, unless the edit actually builds anticipation as the stakes (and price tags) climb.",
        ],
      },
      {
        heading: "The Approach",
        body: [
          "Each tier got its own on-screen graphic treatment, and the pacing picked up deliberately as the price climbed: quicker cuts, bigger sound design swells, more dramatic camera moves the closer the video got to the $34,000 grill.",
          "Grill Theory's scripting was research-heavy, so the B-roll needed to match the voiceover beat for beat. Footage was chosen and timed to back up each claim as it landed, rather than running generic cutaways underneath.",
        ],
      },
      {
        heading: "The Result",
        body: [
          "The graphics, music, and research all came together well enough that Grill Theory called out the improvement directly, more on that below.",
        ],
      },
    ],
  },
  {
    slug: "packvibes-zombie-deer-disease-documentary",
    client: "PackVibes",
    title: "Editing a Science Documentary on Zombie Deer Disease Without Losing the Story",
    excerpt:
      "Chronic wasting disease is dense, unsettling science. The edit had to make it clear and watchable without softening the stakes, on a first project together.",
    youtubeId: "DfXt9bTfVFI",
    thumbnail: "https://i.ytimg.com/vi_webp/DfXt9bTfVFI/sddefault.webp",
    testimonialHandle: "@PackVibes",
    sections: [
      {
        heading: "The Challenge",
        body: [
          "This was the first project with PackVibes, covering a disease with no treatment, no vaccine, and a 100% fatality rate. The subject matter is genuinely unsettling science, and the edit needed to land that weight clearly, without dumbing it down and without losing viewers in jargon, all while matching a visual style PackVibes hadn't fully established on this channel yet.",
        ],
      },
      {
        heading: "The Approach",
        body: [
          "Custom motion graphics were built to visualize transmission and symptoms, since that kind of detail is hard to grasp from narration alone. Pacing followed the density of the science itself: slower on the critical claims, faster through the supporting context.",
          "Because it was a first collaboration, extra care went into nailing a visual identity PackVibes could actually carry into future videos, not just a one-off edit that wouldn't hold up afterward.",
        ],
      },
      {
        heading: "The Result",
        body: [
          "PackVibes came away calling it an impressive first project, with the graphics and storytelling holding up against the complexity of the subject. The full quote is below.",
        ],
      },
    ],
  },
];
