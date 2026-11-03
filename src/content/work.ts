/**
 * Landing-page work section, in display order.
 * Seeded from docs/handoff/content/work.json. Every driveId is live content.
 */

export type Aspect = "16/9" | "9/16";

export type WorkItem = {
  n: string;
  slug: string;
  tag: string;
  title: string;
  driveId: string;
  aspect: Aspect;
  note: string;
  caseStudy?: string;
  layout: "full" | "trio";
};

export const workItems: WorkItem[] = [
  { n: "01", slug: "venus-capital-heights", tag: "STUDIO / FILMS", title: "Venus Capital Heights", driveId: "1dZh9Z6dFU-u7ZwN5YwiqglkKAXQNNcMW", aspect: "16/9", note: "A city film, an experience centre and Bihar's first red-carpet carnival — building anticipation for a project still being built.", caseStudy: "/work/venus-capital-heights", layout: "full" },
  { n: "02", slug: "badalta-bihar", tag: "STUDIO / FILM", title: "Badalta Bihar", driveId: "1QEj78CLhHePA9c8Qs1cSN8OhfuZ9Q29K", aspect: "16/9", note: "A brand film taken end to end — concept, script, production and post.", layout: "full" },
  { n: "03", slug: "ava-x-mars", tag: "SOCIAL", title: "Ava X Mars", driveId: "1GEJsZMZLRu6rmg8gbRbszrvhpUlxbVlp", aspect: "9/16", note: "Creative direction and a UGC shoot built for the feed.", layout: "trio" },
  { n: "04", slug: "aro-cafe", tag: "SOCIAL", title: "Aro Cafe", driveId: "1B9sEIdy9nEPnC7VQNAT2P4JwKKeFSM_J", aspect: "9/16", note: "Creative direction and a UGC shoot built for the feed.", layout: "trio" },
  { n: "05", slug: "hyugaone", tag: "SOCIAL", title: "Hyugaone", driveId: "1B-LBJX_k1TmlC91r_HKN7iw14zYMr9Io", aspect: "9/16", note: "A hook-first UGC shoot — written to stop the scroll in the opening second.", layout: "trio" },
  { n: "06", slug: "nilf", tag: "STUDIO / FILMS", title: "NILF", driveId: "1TnHj2Lfk0_xdlPEiXkBVofUfO62M9wZy", aspect: "16/9", note: "End-to-end event production for a literature festival.", layout: "full" },
  { n: "07", slug: "products-compilation", tag: "CGI + AI", title: "Products compilation", driveId: "15bEoSxAt-lj9hF2bBms3DGgAvaky_RgJ", aspect: "16/9", note: "A passion project — products, light and craft, made for its own sake.", layout: "full" },
  { n: "08", slug: "obop-industries-bihar", tag: "STUDIO / FILM", title: "OBOP Industries of Bihar (ODOP & OBOP)", driveId: "1kq6sPwUDBQyL0gRk7Kvx2nxPvKTzITVq", aspect: "16/9", note: "Production and post for Bihar’s One Block One Product initiative.", layout: "full" },
  { n: "09", slug: "documentary-ajit-kumar", tag: "STUDIO / FILM", title: "Documentary — Ajit Kumar", driveId: "10-OCoU-f_i6fDcT7n87PIKm2DHJnAzPg", aspect: "16/9", note: "A short biopic, shot and cut as a single portrait.", layout: "full" },
  { n: "10", slug: "campzilla-travel-film", tag: "STUDIO / FILM", title: "Campzilla travel film", driveId: "1P8YpuIL-rQdY8jPb3uL9m366jdbVrbw0", aspect: "16/9", note: "A documentary on the Sone — the Ganges’ second-largest tributary.", layout: "full" },
];

export const workBySlug = (slug: string) => workItems.find((w) => w.slug === slug);

/** Alchemy IVF marquee — sits immediately after tile 01, before tile 02. */
export const alchemyRail = {
  tag: "BRAND IP",
  title: "Alchemy IVF",
  note: "ivf.for.all — an owned series that answers the questions people are too private to ask, and keeps returning long after a campaign would have ended.",
  cta: { label: "Click here to view case study →", href: "/work/alchemy-ivf" },
  driveIds: [
    "19Cc91a52PDA_trEQeeQA9J-sFkkJGifl",
    "1Gi_xvY4aPn0Rl1rAiPuGj6BrDoflbVHH",
    "1fZlJvtwApHNSyQS-9FpDpRJPMJaZK9pd",
    "1c6KzqcFqvLOaGb6MP5ckaSK1hbvXaMIK",
    "1WleWnG9BBa6v6p6B8j_oaETKpj2ad3OD",
    "1biNKSX80pc-unVzL39v2BXQ-5rTuKO_-",
    "1jNQX7aSTzd-r35zRlq9EUM0_p2MG6jQB",
    "1foxWo2r67UmgTNzTr7jZYtP-488AVoWK",
  ],
};
