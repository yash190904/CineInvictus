import type { LucideIcon } from "lucide-react";
import {
  Captions,
  Clapperboard,
  Megaphone,
  Minimize2,
  Scan,
  Send,
  Zap,
} from "lucide-react";

export type ServiceTag = {
  label: string;
  icon: LucideIcon;
};

export type Service = {
  title: string;
  description: string;
  tags: ServiceTag[];
  youtubeId: string;
  thumbnail: string;
};

export const services: Service[] = [
  {
    title: "Short-Form Video Editing",
    description:
      "I turn raw vertical clips into fast-paced, hook-driven Shorts built to stop the scroll and boost retention across Reels, Shorts, and TikTok.",
    tags: [
      { label: "Snappy Pacing", icon: Zap },
      { label: "Viral Ready", icon: Megaphone },
      { label: "Subtitled", icon: Captions },
    ],
    youtubeId: "1RmiNW_xYXg",
    thumbnail: "https://i.ytimg.com/vi/1RmiNW_xYXg/maxresdefault.jpg",
  },
  {
    title: "Content Repurposing",
    description:
      "I transform long-form videos into multiple high-impact vertical clips, extracting the strongest moments to maximize reach and content output.",
    tags: [{ label: "Multi Platform", icon: Minimize2 }],
    youtubeId: "sRUar8ODdd8",
    thumbnail: "https://i.ytimg.com/vi/sRUar8ODdd8/maxresdefault.jpg",
  },
  {
    title: "Speaker Demo Reel",
    description:
      "I create premium demo reels that position speakers as authority figures, showcasing powerful moments, audience engagement, and stage presence to attract high value events and keynote opportunities.",
    tags: [{ label: "Keynote Focused", icon: Scan }],
    youtubeId: "KjiWLohXDpk",
    thumbnail: "https://i.ytimg.com/vi_webp/KjiWLohXDpk/sddefault.webp",
  },
  {
    title: "Long Form Edits",
    description:
      "I transform raw footage into engaging, story-driven long-form videos that keep viewers watching from start to finish. Perfect for YouTube, podcasts, documentaries, and branded content focused on clarity, pacing, and emotional impact.",
    tags: [
      { label: "Retention Driven", icon: Send },
      { label: "Cinematic", icon: Clapperboard },
    ],
    youtubeId: "KvT7OMt8gRg",
    thumbnail: "https://i.ytimg.com/vi_webp/KvT7OMt8gRg/sddefault.webp",
  },
];

export const servicesTab1: Service[] = services.slice(0, 2);
export const servicesTab2: Service[] = services.slice(2, 4);
