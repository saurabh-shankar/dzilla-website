/**
 * The six services. Order is fixed (landing #services, header dropdown,
 * footer, service-page chips). Seeded from docs/handoff/content/services.json
 * plus the per-service page copy in docs/handoff/design-reference/*.dc.html.
 */

export type ServiceSlug =
  | "campaigns"
  | "social"
  | "studio-films"
  | "cgi-ai"
  | "brand-ip"
  | "political-pr";

export type Service = {
  n: string;
  slug: ServiceSlug;
  title: string;
  /** Short line used on the landing page "What we do" list. */
  description: string;
};

export const services: Service[] = [
  { n: "01", slug: "campaigns", title: "Campaigns", description: "Ad campaign development & execution, plus social media campaign strategy that holds up across every channel." },
  { n: "02", slug: "social", title: "Social", description: "Posts, reels, carousels and graphics, backed by content marketing." },
  { n: "03", slug: "studio-films", title: "Studio / Films", description: "Documentary and filmmaking, event coverage and production, video production and editing — shoot to delivery, one crew, one timeline." },
  { n: "04", slug: "cgi-ai", title: "CGI + AI", description: "CGI production in 3D and VFX, plus AI-generated content and visuals." },
  { n: "05", slug: "brand-ip", title: "Brand IP", description: "Owned content properties — formats, shows and characters a brand can run season after season." },
  { n: "06", slug: "political-pr", title: "Political PR", description: "Positioning, war-room content, constituency storytelling and rapid-response media for leaders and parties." },
];

export const serviceHref = (slug: ServiceSlug) => `/services/${slug}`;

type HeroMedia =
  | { kind: "film"; video: string; title: string }
  | { kind: "reel"; video: string; title: string };

type WorkGrid =
  | {
      kind: "embeds";
      label: string;
      aspect: "16/9" | "9/16";
      /** minmax() floor: 200px for 9:16, 320px for 16:9. */
      minCol: 200 | 320;
      items: { title: string; video: string }[];
      /**
       * Reproduces the designer's Studio-Films.dc.html render exactly: the first
       * item appears as a title only inside the grid, and the remaining items
       * stack full-width below it (a markup slip in the reference, kept on request).
       */
      designerOrphanFirst?: boolean;
    }
  | {
      kind: "caseStudy";
      label: string;
      items: { eyebrow: string; title: string; body: string; href: string; cta: string }[];
    };

export type ServicePage = {
  slug: Exclude<ServiceSlug, "political-pr">;
  title: string;
  sub: string;
  statement: string;
  heroMedia?: HeroMedia;
  included: { title: string; body: string }[];
  get: string[];
  numbers: { value: string; label: string }[];
  /**
   * OPEN ITEM — Campaigns has no tagged work yet. Leave undefined and the
   * section is not rendered. Do not borrow work from other services.
   */
  work?: WorkGrid;
  cta: string;
};

export const includedNote = "Scoped per project, never per template";

export const servicePages: Record<ServicePage["slug"], ServicePage> = {
  campaigns: {
    slug: "campaigns",
    title: "Campaigns",
    sub: "Ad campaign development and execution, plus social campaign strategy that holds up across every channel.",
    statement: "A campaign is not a burst of posts. It is one idea, sharpened until it survives contact with a feed, a billboard and a sales floor at the same time.",
    included: [
      { title: "Positioning & big idea", body: "The single claim the campaign rests on, argued and pressure-tested before anything is shot." },
      { title: "Channel plan", body: "Where the idea lives, in what order, and what each placement is responsible for." },
      { title: "Key visual & film", body: "A hero asset built to be cut down without losing its shape." },
      { title: "Cutdowns & adaptations", body: "Every ratio, duration and language the plan calls for, delivered on one timeline." },
      { title: "Live optimisation", body: "Weekly reads on what is working, with the budget moved accordingly." },
    ],
    get: ["Strategy & idea deck", "Key visual system", "Hero film + cutdowns", "Channel calendar", "Performance report"],
    numbers: [
      { value: "40+", label: "campaigns shipped" },
      { value: "4×", label: "avg organic reach lift" },
      { value: "7d", label: "fastest launch cycle" },
    ],
    cta: "Start a campaigns project",
  },
  social: {
    slug: "social",
    title: "Social",
    sub: "Posts, reels, carousels and graphics, backed by content marketing that gives the calendar a reason to exist.",
    statement: "Consistency beats intensity. We build a monthly engine — formats, hooks and a shot list — so the channel never goes quiet and never repeats itself.",
    included: [
      { title: "Content pillars", body: "Three or four things you are known for, so every post ladders up to something." },
      { title: "Monthly shoot", body: "One production day that feeds four weeks of posts." },
      { title: "Reels & carousels", body: "Native-first edits, captions and covers, not resized ads." },
      { title: "Calendar & publishing", body: "Scheduled, captioned and tagged, with approvals built in." },
      { title: "Community & reporting", body: "Comment handling and a monthly read on what earned the saves." },
    ],
    get: ["Content pillar map", "Monthly shoot day", "20–30 assets / month", "Publishing calendar", "Monthly report"],
    numbers: [
      { value: "6", label: "channels fed monthly" },
      { value: "30", label: "assets per sprint" },
      { value: "1", label: "shoot day" },
    ],
    work: {
      kind: "embeds",
      label: "SOCIAL WORK",
      aspect: "9/16",
      minCol: 200,
      items: [
        { title: "Ava X Mars", video: "ava-x-mars" },
        { title: "Aro Cafe", video: "aro-cafe" },
        { title: "Hyugaone", video: "hyugaone" },
      ],
    },
    cta: "Start a social project",
  },
  "studio-films": {
    slug: "studio-films",
    title: "Studio / Films",
    sub: "Documentary and filmmaking, event coverage and production, video production and editing — shoot to delivery, one crew, one timeline.",
    statement: "We keep direction, camera and post under one roof, so the film you signed off on in the treatment is the film that gets graded.",
    heroMedia: { kind: "film", video: "venus-capital-heights-film", title: "Venus Capital Heights" },
    included: [
      { title: "Treatment & scripting", body: "Story, structure and the reason anyone watches past the first ten seconds." },
      { title: "Production", body: "Crew, kit, casting, locations and the schedule that holds it together." },
      { title: "Documentary & events", body: "Long-form and live coverage, cut for both the archive and the feed." },
      { title: "Edit, sound & grade", body: "Offline to online in-house, with one editor across the whole project." },
      { title: "Delivery", body: "Masters, subtitles and platform-specific versions." },
    ],
    get: ["Treatment & script", "Shoot & crew", "Graded master", "Subtitles & versions", "Social cutdowns"],
    numbers: [
      { value: "1", label: "continuous timeline" },
      { value: "2–5d", label: "typical shoot" },
      { value: "4K", label: "delivery standard" },
    ],
    work: {
      kind: "embeds",
      label: "STUDIO / FILMS WORK",
      aspect: "16/9",
      minCol: 320,
      designerOrphanFirst: true,
      items: [
        { title: "Venus Capital Heights", video: "venus-capital-heights-film" },
        { title: "Badalta Bihar", video: "badalta-bihar" },
        { title: "NILF", video: "nilf" },
        { title: "OBOP Industries of Bihar (ODOP & OBOP)", video: "obop-industries-bihar" },
        { title: "Documentary — Ajit Kumar", video: "documentary-ajit-kumar" },
        { title: "Campzilla travel film", video: "campzilla-travel-film" },
      ],
    },
    cta: "Start a studio / films project",
  },
  "cgi-ai": {
    slug: "cgi-ai",
    title: "CGI + AI",
    sub: "CGI production in 3D and VFX, plus AI-generated content and visuals.",
    statement: "When the shot cannot be filmed — or should not be — we build it. Product, environment and effect work that reads as photography, not render.",
    included: [
      { title: "Previs & boards", body: "The shot designed before the budget is spent." },
      { title: "3D product & environment", body: "Modelling, look-dev and lighting matched to real references." },
      { title: "VFX & compositing", body: "Cleanup, extensions and effects integrated into live plates." },
      { title: "AI-assisted visuals", body: "Generative passes used deliberately, with a human pass over every frame." },
      { title: "Motion & graphics", body: "Titles, UI and data motion that match the film grade." },
    ],
    get: ["Previs / boards", "Look-dev frames", "3D shots & VFX", "Motion graphics", "Graded master"],
    numbers: [
      { value: "0", label: "trucks on set" },
      { value: "∞", label: "reshoots without a reshoot" },
      { value: "4K", label: "render pipeline" },
    ],
    work: {
      kind: "embeds",
      label: "CGI + AI WORK",
      aspect: "16/9",
      minCol: 320,
      items: [{ title: "Products compilation", video: "products-compilation" }],
    },
    cta: "Start a cgi + ai project",
  },
  "brand-ip": {
    slug: "brand-ip",
    title: "Brand IP",
    sub: "Owned content properties — formats, shows and characters a brand can run season after season.",
    statement: "A founder brand fails on cadence, not on talent. We define the territory, then build a system that runs on an hour of your time a week.",
    heroMedia: { kind: "reel", video: "ivf-for-all-01", title: "ivf.for.all" },
    included: [
      { title: "Format design", body: "The idea, the shape and the reason it returns — before a frame is shot." },
      { title: "World & narrative", body: "Characters, tone and rules that stay consistent across every episode." },
      { title: "Pilot production", body: "One episode built properly, so the rest can be made at pace." },
      { title: "Season rollout", body: "A batch-shot slate, cut for every channel the property lives on." },
      { title: "Ownership & reuse", body: "Assets, bible and rights sit with the brand — reusable long after launch." },
    ],
    get: ["Format bible", "Episode slate", "Pilot episode", "Season assets", "Performance report"],
    numbers: [
      { value: "6wk", label: "to a working pilot" },
      { value: "8+", label: "episodes per season" },
      { value: "1", label: "owned formats" },
    ],
    work: {
      kind: "caseStudy",
      label: "BRAND IP WORK",
      items: [
        {
          eyebrow: "CASE STUDY",
          title: "ivf.for.all",
          body: "An owned series for Alchemy IVF Nepal that kept returning — and kept compounding.",
          href: "/work/alchemy-ivf",
          cta: "View case study →",
        },
      ],
    },
    cta: "Build an owned property",
  },
};

/** Political PR has its own page layout — copy from Political-PR.dc.html. */
export const politicalPr = {
  title: "Political PR",
  sub: "A full campaign desk for candidates, parties and government departments — narrative, content, ground production and daily publishing, run by one team.",
  statement: "Campaigns are won on speed and discipline. We run a desk that understands the booth and the algorithm, and can publish inside the hour.",
  whatWeDoNote: "Take the whole desk, or only the parts you need",
  whatWeDo: [
    { title: "Campaign PR management", body: "Full-cycle campaign PR for Lok Sabha, Assembly and by-elections — message, content calendar, publishing rhythm and ground coordination, run as a two to three month sprint." },
    { title: "Narrative films & documentaries", body: "Candidate documentaries, work-record films and curated videos that set the narrative early instead of reacting to someone else's." },
    { title: "Page growth & social management", body: "Daily posting, campaign creatives and community handling across Facebook, Instagram, YouTube and WhatsApp channels — handles we manage have grown several times over inside a single campaign." },
    { title: "Ground coverage & rally production", body: "A crew that travels with the candidate — rallies, padyatras, door-to-door and nukkad sabhas shot, cut and published the same day." },
    { title: "Rapid-response desk", body: "Monitoring, drafting, approval and publishing compressed into the hour through campaign weeks, with a daily read for the candidate and core team." },
    { title: "Government & institutional communication", body: "Public-awareness films, scheme documentaries, voter-engagement content and tourism promotion for departments, authorities and commissions." },
  ],
  whoWeWorkWith: [
    "Sitting MPs and MLAs",
    "First-time candidates and by-election contests",
    "Party units and constituency teams",
    "Government departments and state authorities",
    "Election commissions and public missions",
  ],
  engagement: [
    { title: "Tell us the seat and the timeline", body: "Constituency, contest, how long you have and what already exists." },
    { title: "We come back with the plan and the number", body: "Scope, crew size, publishing cadence and cost — no templates." },
    { title: "The desk goes live", body: "One point of contact, daily output, daily reporting until the result." },
  ],
  cta: "Want this desk on your campaign",
  ctaSub: "Send us the seat, the timeline and what you need covered. We reply with a plan you can act on.",
};
