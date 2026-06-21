export type Testimonial = {
  handle: string;
  quote: string;
  avatar: string;
};

export const testimonials: Testimonial[] = [
  {
    handle: "@danjames",
    quote:
      "He interacts with my clients so easily that I sometimes don't even know what's happening. He doesn't need anyone overseeing him.",
    avatar: "/testimonials/danjames.avif",
  },
  {
    handle: "@sagedmarketing_",
    quote:
      "Whoever's editing your videos now… they deserve a raise, this was smooth.",
    avatar: "/testimonials/sagedmedia.avif",
  },
  {
    handle: "@Guillaume",
    quote:
      "Editing leveled up big time. Timing, cuts, music — everything's just right.",
    avatar: "/testimonials/guillaume.avif",
  },
  {
    handle: "@DragonAuto",
    quote:
      "Noticed the pacing and flow are so much better lately. You working with someone new?",
    avatar: "/testimonials/dragonauto.avif",
  },
  {
    handle: "@CamBeaudoin",
    quote:
      "Yash did an amazing job. The music fit perfectly, and the final edit surpassed our expectations.",
    avatar: "",
  },
  {
    handle: "@GrillTheory",
    quote:
      "You improved this video in ways I didn't expect. Has great graphics, strong music, and thorough research throughout.",
    avatar: "/testimonials/grilltheory.jpg",
  },
  // Placeholder — swap in a real testimonial when you have one.
  {
    handle: "@PackVibes",
    quote:
      "An impressive first project, with creative graphics, strong visual storytelling, and excellent handling of complex scientific concepts while staying true to our established style.",
    avatar: "/testimonials/packvibes.jpg",
  },
];
