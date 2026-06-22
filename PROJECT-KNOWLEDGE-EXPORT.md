# Cine Invictus — Project Knowledge Export

> **Read this first:** the original request that produced this document
> assumed a Cloudflare Workers + Wrangler + Vite stack, and a tool-driven
> "Framer extraction" process. **Neither was used here.** This project
> is a **Next.js 16 app deployed on Vercel**, hand-built section by
> section in conversation with an AI assistant, using the old Framer
> site purely as a visual/content reference (not as an automated
> extraction source). Sections below follow the original outline's
> structure where it applies, and explicitly say "Not applicable" where
> it doesn't, rather than inventing Wrangler configs that never existed.

---

## 1. Project Overview

### What was the original site?

`cineinvictus.com` was originally built on **Framer** (a no-code visual
website builder). It was a single-page portfolio site for a freelance
video editor ("Cine Invictus" / Yashraj), with a `/projects` subpage.
Sections on the original Framer site (recovered by viewing the live
site, not by importing a Framer project file):

- Hero with headline, CTA, trust badge
- Stats marquee
- About
- Services
- Process / how it works
- Portfolio ("Hall of Fame")
- Short-form video reel
- Problem/solution comparison
- Pricing
- Reviews/testimonials
- FAQ
- Final CTA
- Footer
- A separate `/projects` page listing long-form and short-form work

### Goal of the rebuild

Move off Framer onto a stack the owner (and a developer collaborator)
can fully control: better SEO (server-rendered metadata, sitemap,
structured data), real backend functionality (a booking system with
actual persistence, which Framer can't do natively), and full styling/
animation control via code instead of a visual builder.

### Final tech stack

| Layer | Choice |
|---|---|
| Framework | **Next.js 16** (App Router, Turbopack) |
| Language | **TypeScript** |
| Styling | **Tailwind CSS v4** (CSS-variable-based theme, light/dark via `prefers-color-scheme`) |
| Animation | **Framer Motion** |
| Icons | **lucide-react** |
| Database | **Turso** (hosted libSQL/SQLite) via `@libsql/client`, for the booking system |
| Email | **Resend** |
| Hosting | **Vercel** (auto-deploys on push to `main`) |
| Source control | **GitHub** |
| DNS / domain | **Namecheap** (registrar), pointed at Vercel |
| Local DB fallback | Plain SQLite file via the same `@libsql/client`, for zero-setup local dev |

No Cloudflare Workers, no Wrangler, no Vite, no Framer SDK/export
tooling were used anywhere in this project.

---

## 2. Full File & Folder Structure

```
cine-invictus/
├── app/                              # Next.js App Router root
│   ├── api/
│   │   ├── availability/route.ts     # GET: returns open booking slots
│   │   ├── book/route.ts             # POST: creates a booking, emails owner+client
│   │   └── contact/route.ts          # POST: handles contact form, emails owner+client
│   ├── case-studies/
│   │   ├── [slug]/page.tsx           # Dynamic case study detail page
│   │   └── page.tsx                  # Case studies listing page
│   ├── contact/page.tsx              # Contact page (form + booking widget)
│   ├── projects/page.tsx             # Full portfolio listing page
│   ├── globals.css                   # Tailwind import + theme tokens + light/dark vars
│   ├── icon.png                      # Favicon (auto-detected by Next.js convention)
│   ├── layout.tsx                    # Root layout: fonts, metadata, JSON-LD, Header/Footer
│   ├── opengraph-image.tsx           # Dynamically generated OG/social-share image
│   ├── page.tsx                      # Homepage (composes all section components)
│   ├── robots.ts                     # Generates /robots.txt
│   └── sitemap.ts                    # Generates /sitemap.xml (incl. case study slugs)
├── components/
│   ├── layout/
│   │   ├── Footer.tsx
│   │   └── Header.tsx                # Sticky nav, mobile menu
│   ├── sections/                     # One file per homepage section
│   │   ├── About.tsx
│   │   ├── BookingWidget.tsx         # Custom calendar + slot picker (client component)
│   │   ├── CTA.tsx
│   │   ├── ContactForm.tsx
│   │   ├── FAQ.tsx
│   │   ├── Hero.tsx                  # Headline, shimmer text, animated background
│   │   ├── Portfolio.tsx             # Homepage "Hall of Fame" (first 3 portfolio items)
│   │   ├── Pricing.tsx
│   │   ├── ProblemSolution.tsx
│   │   ├── Process.tsx
│   │   ├── Reviews.tsx
│   │   ├── ShortsGrid.tsx            # Static grid version of shorts (used on /projects)
│   │   ├── Services.tsx
│   │   └── ShortsMarquee.tsx         # Auto-scrolling marquee version (used on homepage)
│   └── ui/                           # Reusable, presentational components
│       ├── AnimatedSection.tsx       # Scroll-reveal wrapper (Framer Motion)
│       ├── Button.tsx                # Solid/outline CTA button
│       ├── Eyebrow.tsx                # Centered "— Label —" section divider
│       ├── VideoEmbed.tsx            # Click-to-load YouTube facade
│       └── VisualMockup.tsx          # Decorative animated UI mockup (Process section)
├── data/                             # All editable site content lives here as typed arrays
│   ├── booking.ts                    # Booking config: hours, slot length, days ahead
│   ├── case-studies.ts               # Case study content (challenge/approach/result)
│   ├── faq.ts
│   ├── portfolio.ts                  # Long-form + short-form video entries
│   ├── pricing.ts
│   ├── process.ts
│   ├── services.ts
│   ├── site.ts                       # Brand name, email, nav links, socials
│   └── testimonials.ts
├── lib/
│   ├── bookings-db.ts                # Turso/libSQL client + booking persistence logic
│   ├── email.ts                      # Resend wrapper (owner notification + client confirmation)
│   └── structured-data.ts            # JSON-LD schema builders (Person/Org/Service/FAQ/Article)
├── public/
│   ├── Rounded.png                   # Brand logo (also copied to app/icon.png as favicon)
│   └── testimonials/                 # Avatar images for testimonials
├── .gitignore
├── next-env.d.ts                     # Auto-generated by Next.js, not edited
├── next.config.ts                    # Remote image domains whitelist
├── package.json
├── package-lock.json
├── postcss.config.mjs                # Tailwind v4 PostCSS plugin registration
├── README.md
└── tsconfig.json
```

---

## 3. Every Config File — Full Content

### `package.json`

```json
{
  "name": "cine-invictus",
  "version": "0.1.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@libsql/client": "^0.17.4",
    "framer-motion": "^12.40.0",
    "lucide-react": "^1.21.0",
    "next": "^16.2.9",
    "react": "^19.2.7",
    "react-dom": "^19.2.7",
    "resend": "^6.14.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.3.1",
    "@types/node": "^26.0.0",
    "@types/react": "^19.2.17",
    "@types/react-dom": "^19.2.3",
    "postcss": "^8.5.15",
    "tailwindcss": "^4.3.1",
    "typescript": "^6.0.3"
  },
  "private": true
}
```

### `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts"
  ],
  "exclude": ["node_modules"]
}
```

### `next.config.ts`

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Temporary remote sources carried over from the old Framer site
    // (YouTube thumbnails + Framer-hosted images). Swap these for your
    // own optimized assets in /public when you have them, then remove
    // this block.
    remotePatterns: [
      { protocol: "https", hostname: "framerusercontent.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
    ],
  },
};

export default nextConfig;
```

### `postcss.config.mjs`

```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```

### `.gitignore`

```
# dependencies
/node_modules

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*

# local env
.env*.local
.env

# typescript
*.tsbuildinfo
next-env.d.ts

# local bookings database (see lib/bookings-db.ts)
/var/

# local tool/editor config
.claude/
```

### `.env.example` — does not exist in this repo

No `.env` file is committed (correctly — see `.gitignore` above).
Required environment variables, set directly in the **Vercel dashboard**
(Settings → Environment Variables), not in a committed file:

| Variable | Purpose | Required? |
|---|---|---|
| `TURSO_DATABASE_URL` | Hosted libSQL database URL for bookings | Required in production (falls back to local SQLite file if unset, which doesn't persist on Vercel) |
| `TURSO_AUTH_TOKEN` | Auth token for the above | Required alongside the URL |
| `RESEND_API_KEY` | Enables email sending | Optional — code logs a warning and skips sending if unset |
| `RESEND_FROM` | Sender address, e.g. `Cine Invictus <hello@cineinvictus.com>` | Optional — falls back to Resend's sandbox sender, which can only email the Resend account owner until a custom domain is verified |
| `NOTIFY_EMAIL` | Where owner notifications go | Optional — defaults to a hardcoded address in `lib/email.ts` |
| `BOOKINGS_DB_PATH` | Override path for the local SQLite fallback | Optional, dev-only |

If you replicate this project, create a `.env.example` file listing
these keys (no real values) so collaborators know what to set.

### Wrangler / Vite config

**Not applicable.** This project has no Cloudflare Workers deployment
and no Vite build step, so there is no `wrangler.toml` or
`vite.config.ts` anywhere in the repo.

---

## 4. Cloudflare Workers Setup

**Not applicable — this project is not deployed on Cloudflare Workers.**
See Section 11 for the actual deployment process (GitHub → Vercel).

---

## 5. Framer → Code Conversion Logic

No automated extraction tool was used. The process was manual,
section by section, over an extended conversation:

- **Visual reference**: the live Framer site (`cineinvictus.com`,
  before the rebuild) was viewed directly in the browser as a styling
  and content reference. No `.framer` project file, Framer API, or
  scraping tool was used to pull structured data out of Framer.
- **Components rebuilt from scratch**: every section (Hero, About,
  Services, Process, Portfolio, Pricing, Reviews, FAQ, CTA, Footer,
  Header) was hand-written as a new React component in
  `components/sections/` and `components/layout/`, styled with
  Tailwind utility classes, not copied from Framer's generated DOM/CSS.
- **Colors**: defined as CSS custom properties in a `@theme` block in
  `app/globals.css` (see Section 3's note — actually inline below in
  Section 7), not extracted from Framer's design tokens. The dark
  theme was treated as a placeholder initially ("swap in your exact
  Framer hex codes" — see the README), then a real accent color
  (`#FF6A00`) was chosen later in the project and a light-mode variant
  was added afterward via `prefers-color-scheme`.
- **Fonts**: a single Google Font, **Bricolage Grotesque**, loaded via
  `next/font/google` in `app/layout.tsx` and exposed as a CSS variable
  (`--font-bricolage`) consumed by `--font-display`/`--font-body`/
  `--font-mono` tokens in `globals.css`. Not extracted from Framer;
  chosen fresh for the rebuild.
- **Spacing**: standard Tailwind spacing scale, tuned manually per
  section through iterative feedback (e.g. multiple rounds of
  adjusting `pt-*`/`pb-*` values between sections to fix inconsistent
  gaps).
- **Animations/interactions**: entirely rebuilt with **Framer Motion**
  (ironically, a different product also named "Framer," made by the
  same company as the no-code site builder, but here used purely as
  the npm animation library `framer-motion`). Examples: scroll-reveal
  wrapper (`AnimatedSection.tsx`), hero load sequence, infinite
  marquee, FAQ accordion, mobile nav slide-down, falling CTA tags,
  shimmer text effect on a headline word, animated background blobs
  and particles.
- **Logo**: the user supplied the actual brand logo file (`Rounded.png`)
  directly; it was not extracted from the Framer site programmatically.

---

## 6. Routing & Pages

Routing is Next.js App Router file-based routing — no router library,
no config file defines routes; folder structure under `app/` *is* the
route table.

| Route | File | Type |
|---|---|---|
| `/` | `app/page.tsx` | Static — composes all homepage section components |
| `/projects` | `app/projects/page.tsx` | Static — full portfolio + shorts grid |
| `/contact` | `app/contact/page.tsx` | Static — contact form + booking widget |
| `/case-studies` | `app/case-studies/page.tsx` | Static — case study listing |
| `/case-studies/[slug]` | `app/case-studies/[slug]/page.tsx` | Static-generated per slug via `generateStaticParams` |
| `/api/availability` | `app/api/availability/route.ts` | Dynamic API route (GET) |
| `/api/book` | `app/api/book/route.ts` | Dynamic API route (POST) |
| `/api/contact` | `app/api/contact/route.ts` | Dynamic API route (POST) |
| `/sitemap.xml` | `app/sitemap.ts` | Generated |
| `/robots.txt` | `app/robots.ts` | Generated |
| `/icon.png` | `app/icon.png` | Auto-served favicon (Next.js file convention) |
| `/opengraph-image` | `app/opengraph-image.tsx` | Generated PNG for social share previews |

In-page anchor links (not separate routes) are used for some nav items,
e.g. `/#services`, `/#process`, `/#reviews`, `/#pricing`, `/#faq` —
defined in `data/site.ts`'s `navLinks`/`footerLinks`.

---

## 7. Assets

### Images

- **Logo**: `public/Rounded.png`, also duplicated as `app/icon.png` so
  Next.js auto-serves it as the favicon.
- **Testimonial avatars**: `public/testimonials/*.avif` / `*.jpg` — a
  mix of formats as supplied by the user, referenced by relative path
  in `data/testimonials.ts`.
- **Portfolio/video thumbnails**: **not stored locally.** They're
  hotlinked directly from YouTube's CDN (`i.ytimg.com/vi_webp/<id>/
  sddefault.webp`), derived from each video's YouTube ID. This is
  flagged as a known limitation in Section 10.
- **About section photo**: still hotlinked from the old Framer CDN
  (`framerusercontent.com`) — also a known limitation.
- **OG/social image**: not a static file — generated at request time
  by `app/opengraph-image.tsx` using Next.js's `ImageResponse` API
  (JSX/CSS rendered to a PNG, no design tool or external asset needed).

All remote image hosts must be explicitly whitelisted in
`next.config.ts`'s `images.remotePatterns` or `next/image` will
refuse to optimize them — this project whitelists `framerusercontent.com`
and `i.ytimg.com` for that reason.

### Icons

`lucide-react` — an npm icon library, used as React components
throughout (e.g. `<Calendar />`, `<Clock />`, `<X />`), not SVG files
in `/public`.

### Fonts

Single Google Font (Bricolage Grotesque) via `next/font/google`,
self-hosted automatically by Next.js at build time (no Google Fonts
`<link>` tag, no separate font files committed to the repo).

---

## 8. SEO & Meta

- **Per-page metadata**: every route exports a `metadata` object (or
  `generateMetadata` function for the dynamic case-study route) using
  Next.js's typed Metadata API — title, description, canonical URL via
  `alternates.canonical`.
- **Title templating**: root layout sets a title template
  (`"%s | Cine Invictus"`) so every page's title automatically gets the
  brand suffix.
- **Open Graph / Twitter cards**: configured in `app/layout.tsx`'s
  `metadata.openGraph`/`metadata.twitter`. Images are *not* hardcoded —
  Next.js's file-convention (`app/opengraph-image.tsx`) supplies them
  automatically, avoiding the need for the broken static
  `/og-image.jpg` reference that existed earlier in the project.
- **JSON-LD structured data** (`lib/structured-data.ts`), injected via
  `<script type="application/ld+json">` tags:
  - `Person` schema (site layout) — the founder as an individual
  - `Organization` schema (site layout) — brand entity, logo, sameAs
    social links
  - `Service` schema (homepage) — service catalog, derived from
    `data/services.ts`
  - `FAQPage` schema (homepage) — derived from `data/faq.ts`
  - `Article` schema (each case study page) — headline, author,
    publisher
- **Sitemap**: `app/sitemap.ts`, dynamically includes every static
  route plus one entry per case study slug (pulled from
  `data/case-studies.ts`, so new case studies are auto-included with
  no manual sitemap editing).
- **Robots**: `app/robots.ts` allows all crawlers and points at the
  sitemap.
- **Search engine submission** (manual, done in the respective
  dashboards, not via code):
  - **Google Search Console**: verified via a DNS TXT record
    (`google-site-verification=...`) added at Namecheap, Domain
    property type (covers all subdomains/protocols). Sitemap submitted
    at the canonical `https://www.cineinvictus.com/sitemap.xml` URL
    (the bare-domain URL 308-redirects to `www`, which tripped up the
    first submission attempt — see Section 10).
  - **Bing Webmaster Tools**: imported directly from the already-
    verified Google Search Console property, auto-verifying and
    auto-submitting the sitemap with no separate DNS step.
- **Performance-related SEO**: `components/ui/VideoEmbed.tsx`
  implements a click-to-load facade for YouTube embeds (renders just a
  thumbnail + play button until clicked) specifically to avoid loading
  a heavy iframe on first paint, which helps Core Web Vitals (a ranking
  factor).

---

## 9. Third-Party Integrations

| Service | Purpose | How it's wired in |
|---|---|---|
| **Turso** | Hosted database for the booking system | `@libsql/client` in `lib/bookings-db.ts`, connected via `TURSO_DATABASE_URL` + `TURSO_AUTH_TOKEN` env vars |
| **Resend** | Transactional email (owner notifications + client confirmations for bookings and contact form) | `resend` npm package in `lib/email.ts`, connected via `RESEND_API_KEY`; sender domain (`cineinvictus.com`) verified through Resend's dashboard with DNS records (DKIM, SPF/MX, DMARC) added at Namecheap |
| **YouTube** | Video hosting/playback for all portfolio and case-study videos | Embedded via `<iframe>` (in `VideoEmbed.tsx`) pointing at `youtube.com/embed/<id>`; thumbnails hotlinked from `i.ytimg.com` |
| **Google Search Console** | Indexing, sitemap submission, search performance monitoring | Domain-level DNS verification (TXT record); no code integration, dashboard-only |
| **Bing Webmaster Tools** | Same, for Bing/Yahoo search | Imported from Search Console; no code integration |
| **Vercel** | Hosting, CI/CD, environment variables, custom domain/SSL | GitHub integration auto-deploys on push to `main`; no Vercel-specific config file in the repo (zero-config Next.js deployment) |
| **Namecheap** | Domain registrar / DNS host | Manual DNS record management (A/CNAME for Vercel, TXT for Google/Resend verification, MX/TXT for Resend sending) |

No analytics package (e.g. Google Analytics, Plausible) and no CMS
were integrated. All content lives in typed TypeScript files under
`data/`.

---

## 10. Known Limitations / Things to Redo

- **Portfolio/testimonial images are hotlinked from third-party CDNs**
  (`i.ytimg.com`, `framerusercontent.com`) rather than stored in
  `/public`. This is a dependency risk (if YouTube changes a thumbnail
  URL pattern or Framer's CDN access lapses, images break) and skips
  `next/image`'s full optimization benefits for self-hosted assets.
  **Redo**: download real assets into `/public` and update `data/
  portfolio.ts`/`data/testimonials.ts` to local paths.
- **Booking persistence has a local/production split**: locally it
  falls back to a SQLite file (`var/bookings.db`, gitignored); in
  production it requires Turso env vars. If someone deploys without
  setting `TURSO_DATABASE_URL`/`TURSO_AUTH_TOKEN`, bookings will not
  persist reliably on Vercel's ephemeral filesystem. This is
  intentional graceful-degradation, not a bug, but it's a step that's
  easy to forget when replicating the project.
  **Redo nothing** — just don't skip the Turso setup step.
  **Already fixed once**: an earlier version used Node's built-in
  `node:sqlite` directly with a static import, which crashed the whole
  app on older Node versions; this was replaced with `@libsql/client`,
  which works identically for local files and hosted Turso DBs.
- **Email sending degrades silently** if `RESEND_API_KEY` is unset —
  by design, but worth knowing: a misconfigured deployment will *look*
  like it's working (bookings/contact form succeed) while quietly
  never sending any email. Check server logs for the
  `[email] RESEND_API_KEY not set` warning if emails seem missing.
- **Client-facing confirmation emails require a verified sending
  domain** on Resend; without it, `sendConfirmation()` will fail
  silently for any recipient other than the Resend account owner. This
  was discovered partway through the project (owner notifications
  worked immediately via Resend's sandbox sender, but client
  confirmations didn't until the domain was verified).
- **Sitemap submission to Google Search Console initially failed**
  because the bare domain (`cineinvictus.com/sitemap.xml`) 308-redirects
  to `www.cineinvictus.com/sitemap.xml` (an intentional apex→www
  redirect set up in Vercel's domain settings), and Search Console's
  submission field didn't like being given a URL that immediately
  redirects. Fixed by submitting the canonical `www` URL directly.
  **Redo**: if you set up an apex→www (or vice versa) redirect, always
  submit the sitemap at the final, non-redirecting URL.
- **No automated tests.** Verification throughout the project was done
  via `npx tsc --noEmit`, `next build`, and manual `curl`/browser
  checks — there's no Jest/Playwright/Vitest setup.
- **Git author identity was never configured** for the local
  repository (commits show a default `Committer:` warning derived from
  the OS username/hostname). Cosmetic, but worth fixing with
  `git config --global user.name`/`user.email` if you replicate this.
- **Case study content quality depends on you, not a tool.** The three
  case studies were hand-written narrative pieces grounded in real
  portfolio facts already in the codebase (testimonial quotes, video
  descriptions) — there is no CMS or generator; replicate by writing
  similarly grounded, factual case studies per project rather than
  inventing metrics.

---

## 11. Exact Replication Checklist

Follow this to do the same kind of rebuild for a different Framer site.

1. **Scaffold the Next.js project.**
   ```bash
   npx create-next-app@latest your-project-name --typescript --tailwind --app
   cd your-project-name
   ```
2. **Install the same core dependencies used here:**
   ```bash
   npm install framer-motion lucide-react @libsql/client resend
   ```
3. **Set up the theme.** In `app/globals.css`, define your brand colors
   as CSS custom properties inside a Tailwind v4 `@theme` block (see
   Section 3/7 above for the exact pattern), so every component can
   reference `var(--color-accent)` etc. instead of hardcoded hex codes.
   Add a `@media (prefers-color-scheme: light)` block if you want
   automatic light/dark support.
4. **Pick and load a font** via `next/font/google` (or
   `next/font/local` for a custom font file) in `app/layout.tsx`,
   exposed as a CSS variable consumed by your theme tokens.
5. **Rebuild each section of the old site as its own component** under
   `components/sections/`, styled with Tailwind, animated with Framer
   Motion where the original had motion/interaction. Reference the old
   live site visually section by section — don't try to scrape or
   import the Framer project file; there's no reliable tooling for
   that, and hand-rebuilding gives you full control anyway.
6. **Move all editable content into typed data files** under `data/`
   (one file per content type: services, pricing, FAQ, testimonials,
   portfolio, etc.) so non-developers can update copy without touching
   component code.
7. **Set up routing** by creating folders under `app/` — each
   `page.tsx` is a route, each `[param]` folder is a dynamic route.
   Add `generateStaticParams` to dynamic routes you want pre-rendered
   at build time.
8. **Add SEO plumbing**:
   - `app/sitemap.ts` and `app/robots.ts` (Next.js Metadata API
     conventions, both auto-served at `/sitemap.xml`/`/robots.txt`)
   - Per-page `metadata` exports with title/description/canonical
   - `app/opengraph-image.tsx` using `ImageResponse` for a generated
     social-share image (avoids needing a static designed asset)
   - JSON-LD structured data builders in a `lib/structured-data.ts`,
     injected via `<script type="application/ld+json">`
9. **If you need a backend feature Framer can't do** (a real booking
   system, in this case): sign up for **Turso** (turso.tech, free
   tier), create a database, grab the URL + auth token. Wire up
   `@libsql/client` with a fallback to a local file path for zero-setup
   local dev (see `lib/bookings-db.ts`'s pattern).
10. **Set up transactional email**: sign up for **Resend**, get an API
    key. For owner-only notifications, no domain verification is
    needed (sandbox sender works). For emailing arbitrary recipients
    (e.g. client confirmations), verify your domain on Resend first —
    it'll give you DKIM/SPF/MX/DMARC DNS records to add at your
    registrar.
11. **Push to GitHub.**
    ```bash
    git init
    git add -A
    git commit -m "Initial commit"
    # create an empty repo on github.com first, then:
    git remote add origin https://github.com/<you>/<repo>.git
    git branch -M main
    git push -u origin main
    ```
    If `git push` hangs on auth, install GitHub's CLI (`brew install
    gh`, then `gh auth login`) rather than fighting with credential
    prompts.
12. **Deploy on Vercel.** Go to vercel.com, "Add New Project," import
    the GitHub repo — it auto-detects Next.js, zero config needed.
    Before the first deploy, add your `TURSO_DATABASE_URL`,
    `TURSO_AUTH_TOKEN`, `RESEND_API_KEY`, and `RESEND_FROM` as
    Environment Variables in the project settings.
13. **Connect your custom domain.** In Vercel: Settings → Domains, add
    your domain. Vercel gives you an A record (for the apex domain)
    and a CNAME record (for `www`). Add both at your DNS
    registrar (replacing any old A/CNAME records pointing at Framer's
    hosting), then wait for propagation — Vercel auto-issues SSL once
    it verifies.
14. **Verify the domain on Resend** (if you skipped it in step 10):
    Resend dashboard → Domains → Add Domain → add the DKIM/SPF/DMARC
    records it gives you at your registrar → wait for "Verified."
15. **Submit to search engines:**
    - Google Search Console (search.google.com/search-console): add a
      **Domain** property, verify via the TXT record it gives you
      (added at your registrar), submit `sitemap.xml` using the
      *final, non-redirecting* URL of your domain.
    - Bing Webmaster Tools (bing.com/webmasters): import directly from
      the verified Search Console property to skip a second DNS step.
16. **Build backlinks** (the actual ranking driver, not on-page code):
    add the new domain to social bios, past-client video descriptions,
    freelance platform profiles, relevant directories.
17. **Write a few real case studies** grounded in actual past work
    (challenge → approach → result, with a real testimonial quote if
    you have one) rather than generic blog filler — add them to a
    `data/case-studies.ts`-style array and a `[slug]` dynamic route, and
    make sure `app/sitemap.ts` picks them up automatically.
