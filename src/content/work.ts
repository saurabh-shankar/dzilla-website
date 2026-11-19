/**
 * Landing-page work section, in display order.
 * Seeded from docs/handoff/content/work.json. Each `video` is a file name in public/videos (no extension).
 */

export type Aspect = "16/9" | "9/16";

export type WorkItem = {
  n: string;
  slug: string;
  tag: string;
  title: string;
  video: string;
  aspect: Aspect;
  note: string;
  caseStudy?: string;
  layout: "full" | "trio";
};

export const workItems: WorkItem[] = [
  { n: "01", slug: "venus-capital-heights", tag: "STUDIO / FILMS", title: "Venus Capital Heights", video: "venus-capital-heights-film", aspect: "16/9", note: "A city film, an experience centre and Bihar's first red-carpet carnival — building anticipation for a project still being built.", caseStudy: "/work/venus-capital-heights", layout: "full" },
  { n: "02", slug: "badalta-bihar", tag: "STUDIO / FILM", title: "Badalta Bihar", video: "badalta-bihar", aspect: "16/9", note: "A brand film taken end to end — concept, script, production and post.", layout: "full" },
  { n: "03", slug: "ava-x-mars", tag: "SOCIAL", title: "Ava X Mars", video: "ava-x-mars", aspect: "9/16", note: "Creative direction and a UGC shoot built for the feed.", layout: "trio" },
  { n: "04", slug: "aro-cafe", tag: "SOCIAL", title: "Aro Cafe", video: "aro-cafe", aspect: "9/16", note: "Creative direction and a UGC shoot built for the feed.", layout: "trio" },
  { n: "05", slug: "hyugaone", tag: "SOCIAL", title: "Hyugaone", video: "hyugaone", aspect: "9/16", note: "A hook-first UGC shoot — written to stop the scroll in the opening second.", layout: "trio" },
  { n: "06", slug: "nilf", tag: "STUDIO / FILMS", title: "NILF", video: "nilf", aspect: "16/9", note: "End-to-end event production for a literature festival.", layout: "full" },
  { n: "07", slug: "products-compilation", tag: "CGI + AI", title: "Products compilation", video: "products-compilation", aspect: "16/9", note: "A passion project — products, light and craft, made for its own sake.", layout: "full" },
  { n: "08", slug: "obop-industries-bihar", tag: "STUDIO / FILM", title: "OBOP Industries of Bihar (ODOP & OBOP)", video: "obop-industries-bihar", aspect: "16/9", note: "Production and post for Bihar’s One Block One Product initiative.", layout: "full" },
  { n: "09", slug: "documentary-ajit-kumar", tag: "STUDIO / FILM", title: "Documentary — Ajit Kumar", video: "documentary-ajit-kumar", aspect: "16/9", note: "A short biopic, shot and cut as a single portrait.", layout: "full" },
  { n: "10", slug: "campzilla-travel-film", tag: "STUDIO / FILM", title: "Campzilla travel film", video: "campzilla-travel-film", aspect: "16/9", note: "A documentary on the Sone — the Ganges’ second-largest tributary.", layout: "full" },
];

export const workBySlug = (slug: string) => workItems.find((w) => w.slug === slug);

/** Alchemy IVF marquee — sits immediately after tile 01, before tile 02. */
export const alchemyRail = {
  tag: "BRAND IP",
  title: "Alchemy IVF",
  note: "ivf.for.all — an owned series that answers the questions people are too private to ask, and keeps returning long after a campaign would have ended.",
  cta: { label: "Click here to view case study →", href: "/work/alchemy-ivf" },
  videos: [
    "ivf-for-all-01",
    "ivf-for-all-02",
    "ivf-for-all-03",
    "ivf-for-all-04",
    "ivf-for-all-05",
    "ivf-for-all-06",
    "ivf-for-all-07",
    "ivf-for-all-08",
  ],
};
