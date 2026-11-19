# D.zilla — website

Marketing site for **D.zilla**, a campaign and content studio. Built with **Next.js 16 (App Router) + TypeScript + Tailwind CSS v4**, recreated from the design handoff in [`docs/handoff/`](docs/handoff/README.md) (currently **Handoff 2**).

## Hosting

Deployed on **Netlify** from GitHub (zero-config Next.js; see `netlify.toml`). Set `NEXT_PUBLIC_SITE_URL`, and optionally `NEXT_PUBLIC_GA_ID` and the Resend variables, in Netlify's environment settings, then redeploy.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run lint
```

Copy `.env.example` to `.env.local` and fill in what you need (all optional locally).

## Routes

| Route | Source |
|---|---|
| `/` | Landing — Hero → Trusted by → Work → What we do → Political PR → Process → Contact |
| `/services/[slug]` | Campaigns, Social, Studio / Films, CGI + AI, Brand IP (shared template) |
| `/services/political-pr` | Political PR (own layout) |
| `/work/venus-capital-heights` | Case study |
| `/work/alchemy-ivf` | Case study (Brand IP) |
| `/contact` | Enquiry form + direct contact |

## Where things live

```
src/content/        All copy, video names and data — edit content here, not in components
  site.ts           brand, contact details, socials (Instagram + LinkedIn), client logos, hero video slot, process
  work.ts           landing work tiles + Alchemy IVF marquee
  services.ts       6 services + per-service page copy + Political PR copy
  case-studies.ts   Venus + Alchemy media manifests; Alchemy's real Instagram stats
src/components/     layout (Header/Footer/PageShell), home sections, service + case parts
src/lib/seo.ts      metadata helper + JSON-LD builders
src/lib/analytics.ts track() → GA4 + Vercel Analytics
src/app/globals.css design tokens (@theme), motion, spread/ink/video/marquee styles
docs/handoff/       original handoff: spec README, content JSON, HTML references
```

## Videos (self-hosted)

All videos are served from the site itself — no Google Drive embeds. Files live in `public/videos/<name>.mp4` with a poster at `public/videos/posters/<name>.jpg`; content refers to them by `<name>` (e.g. `video: "nilf"`).

- `<Video>` (`src/components/ui/Video.tsx`) fills the design's aspect-ratio box. It plays **muted and looped only while on screen** and downloads nothing until it's near the viewport. A sound button (top-right) unmutes it and shows the native controls; only one video has sound at a time. Under reduced motion nothing autoplays.
- **Adding or replacing a video:** run `scripts/encode-video.sh <source.mp4> <name>` (needs ffmpeg), then reference `<name>` in `src/content/`. Films are encoded to ≤1080p and capped under ~90MB (GitHub's limit is 100MB per file); vertical reels to 720×1280. Use a new name when replacing a file — videos are cached for 30 days (`netlify.toml`).

## SEO

- Per-page `metadata` (title template, description, canonical, Open Graph, Twitter) via `pageMetadata()`.
- Generated 1200×630 Open Graph images per route (`opengraph-image.tsx`, brand font bundled in `src/assets/fonts`).
- `sitemap.xml`, `robots.txt`, `manifest.webmanifest`, favicons/app icons cut from the logo artwork.
- JSON-LD: `ProfessionalService` + `WebSite` (site-wide), `Service` + `BreadcrumbList` (service pages), `CreativeWork` (case studies), `ContactPage`.
- Semantic headings (one `h1` per page), all pages statically prerendered.
- **Set `NEXT_PUBLIC_SITE_URL` in production** — canonicals, sitemap and OG URLs are built from it (falls back to Netlify's `URL`, then the Vercel production URL, then `localhost`).
- Optional `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` for Search Console.

## Analytics

- **GA4** via `@next/third-parties` — set `NEXT_PUBLIC_GA_ID`. Off when unset.
- **Vercel Web Analytics + Speed Insights** — only load on Vercel deployments; on Netlify they're off (GA4 covers analytics).
- Custom events (`src/components/analytics/Analytics.tsx`, one delegated listener):

| Event | When |
|---|---|
| `cta_click` | Any element with `data-track="cta_click"` (Start a project, Contact Us, Talk to the PR desk, …) |
| `case_study_click` | Case-study pills/cards |
| `contact_email_click` / `contact_phone_click` | Any `mailto:` / `tel:` link |
| `outbound_click` | External links (client logos etc.) |
| `generate_lead` | Valid contact form submission (`service`, `method`) |
| `form_error` | Contact form validation failure |
| `web_vitals` | Core Web Vitals (LCP, INP, CLS, FCP, TTFB) |

`data-track-section` on a parent adds a `location` parameter. Mark `generate_lead` as a key event in GA4.

## Contact form

With `RESEND_API_KEY` + `CONTACT_FROM_EMAIL` set, the form posts to `/api/contact` and emails the enquiry (reply-to = the visitor). Without them — or if sending fails — it falls back to the reference behaviour: composing the email in the visitor's mail app. Includes validation shared between client and server, and a honeypot field.

## Open items (from the handoff — deliberately not invented)

1. **Hero video** — not supplied. Set `site.heroVideo` in `src/content/site.ts`; until then the grey `#EDEEF0` slot renders.
2. **Campaigns / Political PR work** — none tagged, so no work section renders. Add items to `servicePages.campaigns.work` when supplied.
3. **Terms / Privacy pages** — linked as placeholders (to `/contact`), as in the reference.
4. **Intro loader** plays on every load; the client may want once-per-session — confirm before changing.

Resolved in Handoff 2: Alchemy IVF stats are real (collective, from Instagram Insights — no per-reel captions); footer socials are Instagram + LinkedIn only.

## Fidelity to the design

The site is matched **pixel-for-pixel** to the designer's HTML files in `docs/handoff/design-reference/` (verified by full-page screenshot diffs at 390, 820 and 1440px). Where the handoff README and the HTML disagree, **the HTML wins**:

- **Trusted by** shows the 12 entries from the landing HTML (the README listed 8).
- **Marquees**: landing strips scroll right→left (landing HTML); the Alchemy IVF case-study strip scrolls left→right (its HTML). "Trusted by" doesn't pause on hover; the reel strips do.
- **Videos** are self-hosted instead of the HTML's Google Drive embeds (client decision); each fills its design box edge to edge.
- **Studio / Films work section** reproduces the HTML's render, in which a markup slip leaves "Venus Capital Heights" as a title only and the other five films full-width (`designerOrphanFirst` in `src/content/services.ts`; remove it for a normal grid).
- **"What we do" titles** clip descenders (e.g. the "g" in Campaigns) exactly as the HTML does.
- **Service pages** run hero → statement → work videos → What's included → What you get / In numbers → CTA (Handoff 2).
- **Mobile nav** is the compact inline nav from the HTML (no toggle menu); the header doesn't change on scroll.

Implementation notes that keep it exact: `line-height: normal` on the root (the references don't use Tailwind's 1.5), plain `text-[Npx]` sizes instead of `text-sm`/`text-xs` (those also set line-heights), `text-wrap: balance` only on `h1` and the display `h2`s the designer balanced, and the logo served un-resampled.
