export type FaqItem = {
  question: string;
  answer: string;
};

// NOTE: original site listed these questions without answers visible
// in the page content — placeholder answers below, replace with your
// real copy.
export const faqItems: FaqItem[] = [
  {
    question: "What types of videos do you edit?",
    answer:
      "Long-form YouTube videos, podcasts, documentaries, and short-form content for Reels, TikTok, and Shorts — plus speaker demo reels and content repurposing.",
  },
  {
    question: "How fast is the delivery?",
    answer:
      "Turnaround depends on the plan: 24–48 hours for short-form, 48–72 hours for long-form, with priority options on higher tiers.",
  },
  {
    question: "Can I request revisions?",
    answer:
      "Yes — every plan includes revision rounds so the final cut matches your vision before it goes live.",
  },
  {
    question: "Do I need to provide all the footage and assets?",
    answer:
      "Just send your raw footage via WeTransfer, Drive, or Dropbox. I'll handle the cutting, grading, sound, and captions from there.",
  },
  {
    question: "What if I'm not happy with the result?",
    answer:
      "We'll keep refining within your plan's revision rounds until the edit hits the mark — clear feedback gets a fast turnaround.",
  },
];
