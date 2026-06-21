export type PortfolioItem = {
  client: string;
  title: string;
  description: string;
  youtubeId: string;
  thumbnail: string;
};

// Replace youtubeId/thumbnail with your own video IDs and exported
// thumbnails as you swap in new work. Add or remove entries freely —
// the Portfolio and Projects sections both read from this array.
export const portfolioItems: PortfolioItem[] = [
  {
    client: "Dragon Auto",
    title:
      "This $150K C8 Corvette Owner Ditched PPF for a Permanent Paint Upgrade",
    description: "Surgical process of applying Rocklear covered as a vlog.",
    youtubeId: "KvT7OMt8gRg",
    thumbnail: "https://i.ytimg.com/vi_webp/KvT7OMt8gRg/sddefault.webp",
  },
  {
    client: "Netcord – Agence Discord",
    title: "L'infopreneuriat 3.0",
    description:
      "French talking-head edit about how infopreneurship is changing.",
    youtubeId: "cVISColFDds",
    thumbnail: "https://i.ytimg.com/vi_webp/cVISColFDds/sddefault.webp",
  },
  {
    client: "Rian Doris",
    title: "The Flow State",
    description:
      "Why you are not progressing, and how to remove that cap and grow further.",
    youtubeId: "KjiWLohXDpk",
    thumbnail: "https://i.ytimg.com/vi_webp/KjiWLohXDpk/sddefault.webp",
  },
  {
    client: "PackVibes",
    title: "Why Zombie Deer Disease Is a Biological Nightmare",
    description:
      "Documentary on a disease with no treatment, no vaccine, no environmental remedy, and a 100 percent fatality rate.",
    youtubeId: "DfXt9bTfVFI",
    thumbnail: "https://i.ytimg.com/vi_webp/DfXt9bTfVFI/sddefault.webp",
  },
  {
    client: "Grill Theory",
    title: "The 7 Levels of Grills",
    description: "Documentary about different grills ranging from $200 to $34,000.",
    youtubeId: "fefvpsS2k6I",
    thumbnail: "https://i.ytimg.com/vi_webp/fefvpsS2k6I/sddefault.webp",
  },
  {
    client: "Cine Invictus",
    title: "Rise of Austin Russell",
    description:
      "Documenting the life of a tech billionaire Austin Russell from his childhood to his larger than life achievements.",
    youtubeId: "w5B4dHNmsKU",
    thumbnail: "https://i.ytimg.com/vi_webp/w5B4dHNmsKU/sddefault.webp",
  },
  {
    client: "Dragon Auto",
    title: "750 Miles and Already Damaged?! Protecting a RARE $100K BMW M3",
    description:
      "Vlog depicting the application of Rocklear paint protection on a BMW M4.",
    youtubeId: "GvSlmJgq0QQ",
    thumbnail: "https://i.ytimg.com/vi_webp/GvSlmJgq0QQ/sddefault.webp",
  },
  {
    client: "Cine Invictus",
    title:
      'I retired 12 years early using the "Rule of 72" (Millionaire explains)',
    description:
      "Imagine waking up without an alarm, knowing financial freedom is within reach.",
    youtubeId: "ADTFO70UPRg",
    thumbnail: "https://i.ytimg.com/vi_webp/ADTFO70UPRg/sddefault.webp",
  },
  {
    client: "Cine Invictus",
    title: "Editing from the start",
    description:
      "Narrative about video editing history, starting with the first captured image sequence of a moving horse.",
    youtubeId: "j_a8qs6VEGw",
    thumbnail: "https://i.ytimg.com/vi_webp/j_a8qs6VEGw/sddefault.webp",
  },
  {
    client: "Dan James",
    title: "Tissa Richards - Speaker Demo Reel",
    description: "Short demonstration reel highlighting speaker presence.",
    youtubeId: "trnpUGz8ic4",
    thumbnail: "https://i.ytimg.com/vi_webp/trnpUGz8ic4/sddefault.webp",
  },
  {
    client: "Sage-D Media",
    title: "Rugby Cinematic",
    description:
      "When the lights go out, champions keep going. This is where discipline turns into dominance.",
    youtubeId: "0WtVkwcqMbw",
    thumbnail: "https://i.ytimg.com/vi_webp/0WtVkwcqMbw/sddefault.webp",
  },
  {
    client: "Cine Invictus",
    title: "A Week of Eating in Rome as a Gym Girl",
    description: "Vlog edit following a week of meals and training while exploring Rome.",
    youtubeId: "2wH7FIdJMK8",
    thumbnail: "https://i.ytimg.com/vi_webp/2wH7FIdJMK8/sddefault.webp",
  },
];

export type ShortFormItem = {
  url: string;
  label: string;
  youtubeId: string;
  thumbnail: string;
};

export const shortFormItems: ShortFormItem[] = [
  {
    url: "https://youtube.com/shorts/1RmiNW_xYXg",
    label: "YouTube Short",
    youtubeId: "1RmiNW_xYXg",
    thumbnail: "https://i.ytimg.com/vi/1RmiNW_xYXg/maxresdefault.jpg",
  },
  {
    url: "https://youtu.be/fnP9ggs2rI4",
    label: "YouTube",
    youtubeId: "fnP9ggs2rI4",
    thumbnail: "https://i.ytimg.com/vi/fnP9ggs2rI4/maxresdefault.jpg",
  },
  {
    url: "https://www.youtube.com/shorts/sRUar8ODdd8",
    label: "YouTube Short",
    youtubeId: "sRUar8ODdd8",
    thumbnail: "https://i.ytimg.com/vi/sRUar8ODdd8/maxresdefault.jpg",
  },
  {
    url: "https://www.youtube.com/shorts/K56XwX1ss_c",
    label: "YouTube Short",
    youtubeId: "K56XwX1ss_c",
    thumbnail: "https://i.ytimg.com/vi/K56XwX1ss_c/maxresdefault.jpg",
  },
  {
    url: "https://www.youtube.com/shorts/URoRkBqEzFw",
    label: "YouTube Short",
    youtubeId: "URoRkBqEzFw",
    thumbnail: "https://i.ytimg.com/vi/URoRkBqEzFw/maxresdefault.jpg",
  },
  {
    url: "https://www.youtube.com/shorts/8nD-BTiq3Z8",
    label: "YouTube Short",
    youtubeId: "8nD-BTiq3Z8",
    thumbnail: "https://i.ytimg.com/vi_webp/8nD-BTiq3Z8/maxresdefault.webp",
  },
  {
    url: "https://www.youtube.com/shorts/_57ZDijcc6k",
    label: "YouTube Short",
    youtubeId: "_57ZDijcc6k",
    thumbnail: "https://i.ytimg.com/vi_webp/_57ZDijcc6k/maxresdefault.webp",
  },
  {
    url: "https://www.youtube.com/shorts/k1rqIJmo-IM",
    label: "YouTube Short",
    youtubeId: "k1rqIJmo-IM",
    thumbnail: "https://i.ytimg.com/vi_webp/k1rqIJmo-IM/maxresdefault.webp",
  },
  {
    url: "https://www.youtube.com/shorts/iUFN-FVQlvo",
    label: "YouTube Short",
    youtubeId: "iUFN-FVQlvo",
    thumbnail: "https://i.ytimg.com/vi_webp/iUFN-FVQlvo/maxresdefault.webp",
  },
  {
    url: "https://www.youtube.com/shorts/BoMwXWsUYYg",
    label: "YouTube Short",
    youtubeId: "BoMwXWsUYYg",
    thumbnail: "https://i.ytimg.com/vi_webp/BoMwXWsUYYg/maxresdefault.webp",
  },
  {
    url: "https://www.youtube.com/shorts/5DkBOnM-1xc",
    label: "YouTube Short",
    youtubeId: "5DkBOnM-1xc",
    thumbnail: "https://i.ytimg.com/vi_webp/5DkBOnM-1xc/maxresdefault.webp",
  },
];
