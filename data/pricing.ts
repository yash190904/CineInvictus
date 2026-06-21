export type PricingPlan = {
  name: string;
  price: string; // "1299" or "???" for custom
  cadence: string;
  audience: string;
  features: string[];
  highlight?: boolean;
  custom?: boolean;
};

export const pricingPlans: PricingPlan[] = [
  {
    name: "Long-Form Essential",
    price: "$1,299",
    cadence: "/month",
    audience: "For growing creators who post 4–6 videos/month",
    features: [
      "4–6 long-form video edits (based on duration)",
      "Clean editing with natural pacing",
      "2 revision rounds per video",
      "72 hour turnaround",
      "Message support",
    ],
  },
  {
    name: "Shorts Growth Engine",
    price: "$1,399",
    cadence: "/month",
    audience: "For creators who post 15–20 shorts/month",
    features: [
      "15–20 short-form edits per month",
      "Scroll-stopping, retention-focused editing",
      "Optimized for Reels, TikTok & Shorts",
      "24–48 hour turnaround",
      "Video call + message support",
    ],
  },
  {
    name: "Creator Pro",
    price: "$1,999",
    cadence: "/month",
    audience: "For growing creators who post 4–6 videos/month",
    highlight: true,
    features: [
      "4–6 long-form video edits per month",
      "Repurposing long-form videos into short content",
      "Advanced cinematic editing & storytelling",
      "48 hour turnaround",
      "Priority video call + message support",
    ],
  },
  {
    name: "Custom Plan",
    price: "???",
    cadence: "/month",
    audience: "For one-time projects or creators with custom content needs",
    custom: true,
    features: [
      "One-time or multi-project engagements",
      "Flexible delivery: 24h / 48h / 72h",
      "Content ideas & creative direction",
      "Shorts, Reels, Long-form, Vlogs & Podcasts",
      "Multi-platform content from a single edit",
    ],
  },
];
