/**
 * Case-study media manifests. Seeded from docs/handoff/content/case-studies.json.
 */

export const venus = {
  slug: "venus-capital-heights",
  tag: "STUDIO / FILMS",
  title: "Venus Capital Heights",
  intro:
    "Three bodies of work for Venus Star Construction — a city film, an experience centre and Bihar's first red-carpet carnival — built to create anticipation for a project still being built.",
  facts: [
    { label: "CLIENT", value: "Venus Star Construction" },
    { label: "SECTOR", value: "Real estate & construction" },
    { label: "SCOPE", value: "Content & production partner" },
    { label: "OUTPUT", value: "Brand film, short-form, event coverage, photography" },
  ],
  media: {
    hero: "venus-capital-heights-film",
    brandFilm: "venus-brand-film",
    experienceCentreReels: [
      "venus-experience-centre-1",
      "venus-experience-centre-2",
      "venus-experience-centre-3",
    ],
    eventFilm: "venus-event-film",
    redCarpetKarnivalReels: [
      "red-carpet-karnival-1",
      "red-carpet-karnival-2",
      "red-carpet-karnival-3",
    ],
  },
};

/**
 * Stats are collective figures from Instagram Insights (30 days ending
 * 1 Nov 2026, @ivf.for.all). Per-reel view counts are intentionally not shown.
 */
export const alchemy = {
  slug: "alchemy-ivf",
  tag: "BRAND IP",
  title: "ivf.for.all",
  client: "Alchemy IVF Nepal",
  intro:
    "An owned content property built for Alchemy IVF Nepal — not a campaign that ends, but a format that returns every week and compounds.",
  statsSource: "Instagram Insights, 30-day window ending 1 Nov 2026 (@ivf.for.all)",
  stats: [
    { value: "6.8M", accent: "", label: "Views in 30 days" },
    { value: "4.8M", accent: "", label: "People reached" },
    { value: "99.7", accent: "%", label: "Non-followers reached" },
    { value: "99", accent: "", label: "Episodes published" },
  ],
  rawInsights: {
    views30d: 6776754,
    viewers30d: 4801622,
    netFollowers30d: 2265,
    nonFollowerShare: 0.997,
    posts: 99,
    followers: 2427,
  },
  reels: [
    { id: "ivf-for-all-01" },
    { id: "ivf-for-all-02" },
    { id: "ivf-for-all-03" },
    { id: "ivf-for-all-04" },
    { id: "ivf-for-all-05" },
    { id: "ivf-for-all-06" },
    { id: "ivf-for-all-07" },
    { id: "ivf-for-all-08" },
    { id: "ivf-for-all-09" },
    { id: "ivf-for-all-10" },
    { id: "ivf-for-all-11" },
    { id: "ivf-for-all-12" },
    { id: "ivf-for-all-13" },
    { id: "ivf-for-all-14" },
    { id: "ivf-for-all-15" },
  ],
};
