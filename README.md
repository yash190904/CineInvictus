# Cine Invictus — Next.js Rebuild

Rebuild of cineinvictus.com on Next.js (App Router) + Tailwind CSS v4 +
Framer Motion, replacing the Framer template for better SEO control,
performance, and animation flexibility.

## Stack

- **Next.js 16** (App Router, Turbopack) — static generation for every
  page, Metadata API for per-page SEO, built-in sitemap.xml/robots.txt
- **Tailwind CSS v4** — theme tokens live in `app/globals.css`
- **Framer Motion** — scroll reveals, hero load sequence, FAQ accordion,
  mobile menu
- **TypeScript**

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run build   # production build — verifies everything compiles
npm run start   # run the production build locally
```

## Where to edit things

| What | File |
|---|---|
| Brand colors, fonts | `app/globals.css` (`@theme` block at the top) — currently placeholder cinematic dark theme (near-black + a "record red" accent), swap in your exact Framer hex codes whenever you have them |
| Site name, email, socials, nav links | `data/site.ts` |
| Services list | `data/services.ts` |
| Process steps | `data/process.ts` |
| Portfolio videos / shorts | `data/portfolio.ts` |
| Pricing plans | `data/pricing.ts` |
| Testimonials | `data/testimonials.ts` |
| FAQ | `data/faq.ts` |
| Page metadata (titles/descriptions) | top of each `app/**/page.tsx` |

Every section component pulls from these files, so most updates never
touch component code.

## Images

The portfolio/testimonial data currently points at the old Framer CDN
URLs (`framerusercontent.com`) and YouTube thumbnails (`i.ytimg.com`) so
the site works immediately. `next.config.ts` whitelists both as remote
image sources.

**Recommended next step:** download your real assets into `/public`
and point the data files at local paths (e.g. `/portfolio/dragon-auto.jpg`)
instead of the Framer CDN. That removes the dependency on Framer's
hosting entirely and lets `next/image` optimize from your own files.

## Contact form

`app/contact/page.tsx` renders a form that POSTs to
`app/api/contact/route.ts`. Right now that route validates the input
and logs it server-side — it doesn't send a real email yet, since that
needs an email provider API key (which I can't add for you, that's
yours to enter as a private deployment secret).

To wire it up:
1. Pick a provider — [Resend](https://resend.com) is the simplest for
   Next.js (`npm i resend`).
2. Get an API key, add it as an environment variable
   (`RESEND_API_KEY`) in your Vercel project settings — never commit
   it to the repo.
3. Uncomment/adapt the example block already left in
   `app/api/contact/route.ts`.

## SEO checklist already handled

- Static rendering on every page (fast, fully crawlable HTML)
- Per-page `<title>` / meta description via the Metadata API
- Auto-generated `/sitemap.xml` and `/robots.txt`
- JSON-LD structured data: `Person`, `Service`, and `FAQPage` schemas
  (`lib/structured-data.ts`) — helps with rich results/snippets
- `next/image` for automatic resizing, lazy-loading, modern formats
- Click-to-load YouTube facade (`components/ui/VideoEmbed.tsx`) so
  video embeds don't tank your Core Web Vitals on first load

Still worth doing yourself: a real Open Graph image at
`/public/og-image.jpg` (1200×630), and a Google Search Console
submission once it's deployed.

## Deploying (Vercel)

```bash
git init
git add .
git commit -m "Next.js rebuild of Cine Invictus"
git remote add origin <your-github-repo-url>
git push -u origin main
```

Then import the repo at vercel.com — it auto-detects Next.js, no
config needed. Point your `cineinvictus.com` domain at the new Vercel
project once you're happy with it.
