# D.zilla — website

Marketing site for **D.zilla**, a campaign and content studio. Built with **Next.js 16 (App Router) + TypeScript + Tailwind CSS v4**, recreated from the design handoff in [`docs/handoff/`](docs/handoff/README.md).

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
src/content/        All copy, Drive IDs and data — edit content here, not in components
  site.ts           brand, contact details, socials, client logos, hero video slot, process
  work.ts           landing work tiles + Alchemy IVF marquee
  services.ts       6 services + per-service page copy + Political PR copy
  case-studies.ts   Venus + Alchemy media manifests and placeholder stats
src/components/     layout (Header/Footer/PageShell), home sections, service + case parts
src/lib/seo.ts      metadata helper + JSON-LD builders
src/lib/analytics.ts track() → GA4 + Vercel Analytics
src/app/globals.css design tokens (@theme), motion, spread/ink/embed/marquee styles
docs/handoff/       original handoff: spec README, content JSON, HTML references
```

Every video is a Google Drive embed (`DriveEmbed`), centred and over-scanned (`scale(1.06)`) to remove letterboxing. Lead/hero embeds load eagerly; grid and marquee embeds are `loading="lazy"`.

## SEO

- Per-page `metadata` (title template, description, canonical, Open Graph, Twitter) via `pageMetadata()`.
- Generated 1200×630 Open Graph images per route (`opengraph-image.tsx`, brand font bundled in `src/assets/fonts`).
- `sitemap.xml`, `robots.txt`, `manifest.webmanifest`, favicons/app icons cut from the logo artwork.
- JSON-LD: `ProfessionalService` + `WebSite` (site-wide), `Service` + `BreadcrumbList` (service pages), `CreativeWork` (case studies), `ContactPage`.
- Semantic headings (one `h1` per page), all pages statically prerendered.
- **Set `NEXT_PUBLIC_SITE_URL` in production** — canonicals, sitemap and OG URLs are built from it (falls back to the Vercel production URL, then `localhost`).
- Optional `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` for Search Console.

## Analytics

- **GA4** via `@next/third-parties` — set `NEXT_PUBLIC_GA_ID`. Off when unset.
- **Vercel Web Analytics + Speed Insights** — enabled automatically on Vercel deployments (enable them in the Vercel dashboard).
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
2. **Alchemy IVF stats + per-reel view counts** — placeholders (`00M+`, `00+`, `00`, `— views`) in `src/content/case-studies.ts`, flagged with `statsPending` / `reelViewCountsPending`.
3. **Campaigns / Political PR work** — none tagged, so no work section renders. Add items to `servicePages.campaigns.work` when supplied.
4. **Social profile URLs** — footer links point to `/contact` until `site.social[].href` is filled (they then also feed JSON-LD `sameAs`).
5. **Terms / Privacy pages** — linked as placeholders (to `/contact`), as in the reference.
6. **Intro loader** plays on every load; the client may want once-per-session — confirm before changing.

## Decisions where the handoff disagreed with itself

- **Trusted by**: the README/`site.json` list 8 logos; the landing reference HTML shows 12 (adds Venus Star India, Prime Group, NILF and EFA Public School using Google favicons). The site follows the HTML reference. Remove entries in `clients` if the client prefers the 8.
- **Marquee direction**: the README defines `dz-marquee` as `-50% → 0` (left→right); the landing HTML used the opposite. The README definition is used everywhere.
- **Mobile nav**: the reference shows a compact inline nav (Work / Services / Contact) at ≤660px rather than a toggle menu; that is what's implemented.
- **Every embed** uses the over-scan treatment (the landing reference had a few without it; the README says use it on all).
