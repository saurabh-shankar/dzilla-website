# Handoff 2: D.zilla Website — delta since Checkpoint 1

> **Read this first.** This package supersedes `design_handoff_dzilla_website/` (Checkpoint 1, 10 Nov 2026).
> Everything below is the **current, complete** spec — but only the items listed under **"Changes since last handoff"** differ from what you already built. If Checkpoint 1 is already implemented, apply just those changes. If you are starting fresh, build from this document in full and ignore Checkpoint 1 entirely.

## Changes since last handoff

### 1. Service pages reordered
On **Social, Studio / Films, CGI + AI and Brand IP**, the work videos now sit directly after the page description, before "What's included".

Order is now: **hero (eyebrow + H1 + one-line description) → work videos → What's included → What you get / In numbers → CTA → footer.**

Campaigns and Political PR are unchanged (they still have no work section).

### 2. Alchemy IVF case study — real stats, collective not per-reel
The stat band is no longer a placeholder and is no longer three items. It is now **four collective stats**, sourced from Instagram Insights for the 30-day window ending 1 Nov 2026 on `@ivf.for.all`:

| Value | Label |
|---|---|
| `6.8M` | Views in 30 days |
| `4.8M` | People reached |
| `99.7%` | Non-followers reached (the `%` is green `#12854A`) |
| `99` | Episodes published |

**Per-reel view captions have been removed** from the reel grid — the cards are now media only, no caption row. Do not reintroduce them; the client's decision is that the numbers read as one collective result, not a leaderboard.

A supporting line was added to "Why it compounds":
> "Almost none of this reach was bought or borrowed: 99.7% of the people who watched did not follow the account. The format found them."

Raw figures are preserved in `content/case-studies.json` under `rawInsights` if you need to render precise numbers anywhere.

### 3. Footer social links are real, and trimmed to two
Every footer previously had four dead links (Instagram, LinkedIn, YouTube, Behance) all pointing at `#contact`. Now:

- **Instagram** → `https://www.instagram.com/d.zillaagency?utm_source=ig_web_button_share_sheet&srtk=ZDNlZDc0MzIxNw==`
- **LinkedIn** → `https://www.linkedin.com/company/dzilla/`
- **YouTube and Behance removed entirely.**

Both open in a new tab (`target="_blank" rel="noopener"`). Applied across all 7 pages that have a footer.

---

## Overview

Marketing website for **D.zilla**, a campaign and content studio in Bihar, India. One landing page, six service pages, two case studies, and a contact page. The site is video-forward: nearly every content block is a Google Drive–embedded film or vertical reel.

Target stack for implementation: **Next.js (App Router) + TypeScript + Tailwind CSS**.

## About the Design Files

The files in `design-reference/` are **design references created in HTML** — prototypes showing the intended look and behaviour. They are **not production code to copy directly**. They use a custom runtime (`support.js`, `<x-dc>` tags, `renderVals()`), which has no place in a Next.js app.

Your task is to **recreate these designs in Next.js + TypeScript + Tailwind**, matching them exactly — same layout, same spacing, same type scale, same colours, same copy, same media, same interactions. Nothing should be dropped, re-worded, or re-designed.

Open each `.dc.html` file in a browser to see the rendered design. Read the markup for exact values.

## Fidelity

**High-fidelity.** These are final mocks. Colours, typography, spacing, radii and motion are decided and should be reproduced pixel-for-pixel. Where the HTML uses a `clamp()` expression, reproduce the `clamp()` — the fluid scaling is deliberate, not an approximation.

---

## Content — read these first

All content is extracted into `content/` as JSON. Use these as the seed for your data layer (a `lib/content/*.ts` module, local JSON, or a CMS — your call):

| File | Contains |
|---|---|
| `content/site.json` | Brand, contact details, landing-page section order, process steps, client logos, route map |
| `content/work.json` | All 10 landing-page work tiles + the Alchemy IVF marquee — tags, titles, notes, Drive IDs, aspect ratios, layout hints |
| `content/services.json` | The 6 services, their copy, and which work belongs to each |
| `content/case-studies.json` | Venus Capital Heights and Alchemy IVF media manifests |

**Every Drive ID in those files is live content.** Embed as:

```
https://drive.google.com/file/d/{driveId}/preview
```

---

## Design Tokens

### Colour

| Token | Value | Use |
|---|---|---|
| `ink` | `#0B0C0E` | Primary text, dark sections, video box backgrounds, primary buttons |
| `paper` | `#F7F8F8` | Page background, text on dark |
| `green` | `#12854A` | Accent on light backgrounds — eyebrows, hover, logo dot |
| `green-bright` | `#4ADE80` | Accent on dark backgrounds only |
| `body` | `#4B5157` | Body copy |
| `muted` | `#5A6066` | Secondary copy, tile notes |
| `meta` | `#6B7176` | Tile numbers, "back" links |
| `faint` | `#9BA1A6` | Smallest labels |
| `rule` | `#DDE0E3` | Section dividers, list rules |
| `placeholder` | `#EDEEF0` | Empty media slot (hero only) |

Dark-section text: `rgba(247,248,248,0.78)` for links, `rgba(247,248,248,0.7)` for body, `rgba(247,248,248,0.6)` for numbers.
Light-section borders on interactive elements: `rgba(11,12,14,0.22)` (buttons), `rgba(11,12,14,0.16)` (chips), `rgba(11,12,14,0.18)` (pills).

### Typography

Single family: **Plus Jakarta Sans** (400, 500, 600, 700, 800) via Google Fonts. (`Instrument Sans` is also linked in the reference files but unused — drop it.) Use `next/font/google`.

| Role | Size | Weight | Tracking |
|---|---|---|---|
| Hero H1 | `clamp(34px, 5.4vw, 92px)` | 700 | `-0.05em`, `line-height: 0.94` |
| Case-study H1 | `clamp(38px, 6.4vw, 104px)` | 700 | `-0.05em`, `line-height: 0.94` |
| Section H2 | `clamp(26px, 3.4vw, 54px)` | 500 | `-0.04em` |
| Tile title | `clamp(20px, 2.4vw, 34px)` | 500 | `-0.035em` |
| Large stat | `clamp(40px, 5.4vw, 78px)` | 700 | `-0.05em`, `line-height: 1` |
| Eyebrow / label | `12px` | 600 | `0.14em`, uppercase |
| Section label | `13px` | 600 | `0.16em`, uppercase, green |
| Body | `17px` | 400 | `line-height: 1.7` |
| Tile note | `15px` | 400 | `line-height: 1.6` |
| Nav / button | `15px` | 500–600 | — |

Headlines and paragraphs use `text-wrap: balance` and `text-wrap: pretty` respectively — keep them.

### Spacing & shape

- Page gutter: `clamp(16px, 3.4vw, 40px)`
- Section padding: `clamp(48px, 6vw, 96px)` vertical (case studies), `clamp(56px, 7vw, 110px)` (landing sections)
- Gap between work tiles: `clamp(44px, 6vw, 120px)`
- Media radius: `22px`. Marquee cards: `18px`. Buttons/pills: `999px`.
- Max content width: `1680px` for full-bleed media, `1400px` for text grids, `820px` for prose.

### Shadows

- Header: `0 12px 32px rgba(11,12,14,0.06)`
- Tile 01 only: `0 34px 70px -28px rgba(11,12,14,0.28), 0 12px 28px -18px rgba(11,12,14,0.18)`

### Motion

| Name | Definition |
|---|---|
| `dz-rise` | `from { opacity:0; transform:translateY(24px) } to { opacity:1; transform:translateY(0) }` — `0.9s cubic-bezier(0.22,1,0.36,1)` |
| `dz-marquee` | `from { transform:translate3d(-50%,0,0) } to { transform:translate3d(0,0,0) }` — linear infinite; 52s (case study) / 60s (landing) |
| Standard easing | `cubic-bezier(0.22, 1, 0.36, 1)` |

All of it must be disabled under `@media (prefers-reduced-motion: reduce)` — the reference files already do this; carry it over.

---

## Screens

### 1. Landing (`/`) — `design-reference/D.zilla.dc.html`

Section order is fixed: **Hero → Trusted by → Work → What we do → Political PR → Process → Contact.**

**Intro loader.** Full-screen `#000` overlay, `z-index: 300`, autoplaying muted `assets/intro.mp4` at `object-fit: cover; object-position: center top; transform: translateY(2%)`. Dismisses on video `ended`, on click, or after a **5000ms** fallback timer — whichever is first. Fades out via `opacity` over `520ms` then unmounts. Locks `document.documentElement.style.overflow` while visible. Skipped entirely under reduced motion.

**Header.** Fixed, `z-index: 60`. Glass treatment: `background: linear-gradient(180deg, rgba(255,255,255,0.68), rgba(247,248,248,0.42))` + `backdrop-filter: blur(22px) saturate(180%)`. Logo (`logo-dark.png`, 26px) left, nav right, "Contact Us" as a dark pill. Services is a dropdown listing all six.

**Hero.** Two-column flex, `min-height: 100svh`. Left: media box, `flex: 1 1 300px`, `min-height: clamp(260px, 44svh, 680px)`, radius 22px, **currently empty with `#EDEEF0` background** — the client has not supplied this video. Keep it as a configurable empty slot. Right: H1 "We build brands through media" with a green dot (`0.16em` circle, `#12854A`), sub-copy, CTA.

**Trusted by.** Client logo strip, 8 logos from `assets/logos/`. Names and files in `site.json`.

**Work.** Heading "Work that earned its attention". Tiles from `work.json`:

- Tiles with `layout: "full"` — single column, `width: min(100%, 1680px)`, centred, `aspect-ratio: 16/9`, `min-height: min(82svh, 860px)`.
- Tiles 03/04/05 (`layout: "trio"`) — one grid wrapper, `grid-template-columns: repeat(auto-fit, minmax(min(100%,170px), 1fr))`, `gap: clamp(14px,1.8vw,32px)`, `max-width: 1680px`. All three must stay on one row down to tablet; they are 9:16 reels and must render identically sized.
- Caption block under every tile: eyebrow (green, 12px/`0.14em`) → title → note → tile number right-aligned (`#6B7176`, 12px). Venus and Alchemy additionally carry a "Click here to view case study →" outline pill.
- Tile 01 carries the soft shadow listed above.

**Alchemy IVF marquee.** Sits between tile 01 and tile 02. Full-bleed (`width: 100vw; margin-left: calc(50% - 50vw)`), horizontally scrolling row of 9:16 cards (`clamp(180px,16vw,268px)` wide), the 8 Drive IDs duplicated to make the loop seamless, `dz-marquee 60s linear infinite`, **pauses on hover** by toggling `animationPlayState`. Caption below follows the same hierarchy as every other tile: eyebrow `BRAND IP` → title `Alchemy IVF` → note → case-study pill.

**What we do.** Dark section (`#0B0C0E`). Intro line, then 6 service cards numbered 01–06 linking to each service route. Copy in `services.json`.

**Political PR.** Dedicated section with its own numbers/offer.

**Process.** 4 numbered steps — see `site.json`.

**Contact.** "Let's build something worth noticing." + sub-line, email, both phone numbers, CTA.

**Footer.** Logo (`logo-light.png`, 28px), email, both phone numbers stacked, nav, and exactly two social links — Instagram and LinkedIn, both `target="_blank" rel="noopener"`. URLs in `site.json`. No YouTube, no Behance.

### 2. Service pages (6) — e.g. `design-reference/Social.dc.html`

Shared template: header → hero (eyebrow + H1 + one-line definition) → **work grid** → "What's included" list → "What you get" / "In numbers" two-column → CTA → footer.

The work grid sits directly below the description — the videos are the proof, so they come before the service explanation.

Work grids per service are in `services.json`. **Campaigns and Political PR have no work section at all** — the client hasn't tagged any work to them. Do not fill them with borrowed work; render nothing until content is supplied.

Service page work grids use `repeat(auto-fit, minmax(min(100%, 200px|320px), 1fr))` — 200px for the 9:16 Social grid, 320px for 16:9 grids.

### 3. Venus Capital Heights (`/work/venus-capital-heights`)

Hero film → intro → brand film → 3-up experience-centre reels → event film → 3-up Red Carpet Karnival reels → outcome → CTA. Media manifest in `case-studies.json`.

### 4. Alchemy IVF (`/work/alchemy-ivf`) — Brand IP case study

Hero (`ivf.for.all`) → 4-stat band → **full-bleed marquee** of all 15 reels (same mechanics as the landing marquee, 52s) → The client / The problem → 01 The format → 02 The work (full 9:16 grid, media only) → Why it compounds → CTA to `/services/brand-ip`.

**Stats are real** — see "Changes since last handoff" above and `content/case-studies.json`. They are collective figures, not per-reel. The reel grid carries **no view-count captions**.

### 5. Contact (`/contact`)

Form (name, email, phone, message), direct contact details, both phone numbers. The reference form has no backend — wire it to whatever the project uses.

---

## Interactions & Behaviour

| Behaviour | Spec |
|---|---|
| **Intro loader** | As above. Currently runs on every load. Client may want once-per-session — confirm before changing. |
| **Marquee** | Infinite left→right translate of a duplicated list; pause on `mouseenter`, resume on `mouseleave`. |
| **Ink sweep on titles** | Case-study title links use a radial-gradient background clipped to text, animating `--sr` from `0px` on hover over **900ms** with the standard easing. Requires `@property --sr { syntax: '<length>'; inherits: false; initial-value: 0px }` to animate — register it. |
| **Spread buttons** | Outline/filled pills render a `::before` circle (160px, `rgba(18,133,74,0.12)`) that scales from 0 and follows the pointer via `--sx`/`--sy`/`--ss` custom properties set on `mousemove`, `620ms` transition. |
| **Reveal on scroll** | Elements with `data-reveal` fade/rise in via IntersectionObserver using `dz-rise`. |
| **Header compaction** | Header shrinks/condenses past a scroll threshold. |
| **Mobile menu** | Nav collapses to a toggle below the breakpoint. |
| **Video embeds** | Every Drive iframe is centred and slightly over-scanned to kill letterboxing: `position:absolute; top:50%; left:50%; width:100%; height:100%; transform:translate(-50%,-50%) scale(1.06); transform-origin:center; border:0`. Wrapper is `position:relative; overflow:hidden` with the aspect ratio and a `#0B0C0E` background. **Use this exact treatment on every embed** — it is what removes the black bars. |
| **Lazy loading** | Grid and marquee iframes carry `loading="lazy"`; hero/lead embeds do not. |

### Responsive

Fluid throughout — `clamp()` for type and padding, `repeat(auto-fit, minmax(...))` for grids, `flex-wrap` for rows. No fixed pixel widths on text containers. Verify the 03/04/05 trio stays on one row at tablet widths and that full-bleed marquees don't cause horizontal overflow on mobile.

---

## State

Minimal — this is a marketing site.

- `menuOpen: boolean` — mobile nav
- `servicesOpen: boolean` — header dropdown
- `compact: boolean` — scrolled header
- `introVisible: boolean` — loader, client-only
- Contact form field state + validation

Content should be static/server-rendered from the `content/` data. No fetching required beyond the Drive iframes.

---

## Assets

In `assets/`:

| File | Use |
|---|---|
| `logo-dark.png` | Wordmark for light backgrounds (header, service pages) |
| `logo-light.png` | Wordmark for dark backgrounds (footer, dark sections) |
| `intro.mp4` | Opening loader animation |
| `logos/*.png` (8) | Client logos for the Trusted by strip |

Both logo variants were generated from the client's master artwork: white or `#0B0C0E` body with a `#12B96B` dot, alpha-matted, transparent background. **Never substitute text for the logo.**

Serve from `public/`. All video content is Google Drive `/preview` embeds — nothing is self-hosted. If Drive embeds become a performance or reliability problem, flag it; the client owns the masters and can move to a proper video host.

---

## Files

```
design-reference/
  D.zilla.dc.html                     landing page (main)
  Campaigns.dc.html                   /services/campaigns
  Social.dc.html                      /services/social
  Studio-Films.dc.html                /services/studio-films
  CGI-AI.dc.html                      /services/cgi-ai
  Brand-IP.dc.html                    /services/brand-ip
  Political-PR.dc.html                /services/political-pr
  Case-Venus-Capital-Heights.dc.html  /work/venus-capital-heights
  Case-Alchemy-IVF.dc.html            /work/alchemy-ivf
  Contact.dc.html                     /contact
  support.js                          prototype runtime — DO NOT PORT
content/
  site.json  work.json  services.json  case-studies.json
assets/
  logo-dark.png  logo-light.png  intro.mp4  logos/
```

To view a reference file, open it directly in a browser — `support.js` must sit alongside it.

---

## Open items (do not invent)

1. **Hero video** — not supplied. Keep the empty slot.
2. **Campaigns and Political PR work** — no tagged work exists yet.
3. **Contact form** has no backend.

Resolved since Checkpoint 1: Alchemy IVF stats are now real; footer social links are now real.
