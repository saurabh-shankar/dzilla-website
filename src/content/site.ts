/**
 * Site-wide content. Seeded from docs/handoff/content/site.json and the
 * landing-page reference (docs/handoff/design-reference/D.zilla.dc.html).
 */

export const site = {
  name: "D.zilla",
  tagline: "We build brands through media",
  description:
    "D.zilla is a campaign and content studio — strategy, film, CGI and social under one roof, for brands and leaders who would rather be remembered than merely seen.",
  footerBlurb:
    "Campaigns, content and films for brands and leaders who want to be remembered.",
  logo: {
    dark: { src: "/logo-dark.png", width: 867, height: 286 },
    light: { src: "/logo-light.png", width: 867, height: 286 },
  },
  /**
   * OPEN ITEM — the client has not supplied the hero video yet.
   * Set to a video URL (e.g. "/hero.mp4") to replace the grey placeholder.
   */
  heroVideo: "",
  introVideo: "/intro.mp4",
  contact: {
    email: "info@zillabiz.com",
    phonePrimary: "+91 77669 38518",
    phoneSecondary: "+91 90651 00482",
    studio: "Gurgaon, Haryana",
    hours: "Mon–Sat, 10am–7pm IST",
  },
  /** Social profiles (footer + Organization JSON-LD `sameAs`). Only these two — per Handoff 2. */
  social: [
    { label: "Instagram", href: "https://www.instagram.com/d.zillaagency?utm_source=ig_web_button_share_sheet&srtk=ZDNlZDc0MzIxNw==" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/dzilla/" },
  ],
} as const;

export const telHref = (phone: string) => `tel:${phone.replace(/\s+/g, "")}`;
export const mailHref = (email: string = site.contact.email) => `mailto:${email}`;

export const hero = {
  sub: "Strategy, film, CGI and social under one roof — for brands and leaders who would rather be remembered than merely seen.",
};

export const whatWeDo = {
  aside: "Six capabilities, one creative team",
  intro:
    "We bring strategy, creativity, production, and distribution together to build campaigns, create compelling content, and help brands make their mark.",
};

export const politicalPrTeaser = {
  heading: "A team that understands both the booth and the algorithm.",
  body: "Positioning, war-room content, constituency storytelling and rapid-response media for leaders and parties — run by a team that understands both the booth and the algorithm.",
};

export const processSteps = [
  { n: "01", title: "Define", body: "Audience, goal and the one idea worth the budget." },
  { n: "02", title: "Design", body: "Look, script, storyboard and channel plan, signed off." },
  { n: "03", title: "Build", body: "Shoot, CGI, edit and grade on one continuous timeline." },
  { n: "04", title: "Launch", body: "Cutdowns per platform, live monitoring, a report you can act on." },
] as const;

export const contactBlock = {
  headline: "Let's build something worth noticing",
  sub: "Tell us the goal. We'll come back with the idea, the plan and the number.",
};

export type Client = {
  name: string;
  href: string;
  /** Local file in /public, or a remote favicon URL. */
  logo: string;
  width: number;
  height: number;
  /** Rendered height in px, per the reference. */
  displayHeight: number;
  maxWidth?: number;
  /** Show the name next to the mark (used for marks that are not wordmarks). */
  showName?: boolean;
  remote?: boolean;
};

const favicon = (domain: string) =>
  `https://www.google.com/s2/favicons?domain=${domain}&sz=256`;

/** "Trusted by" strip — order and sizing from the landing reference. */
export const clients: Client[] = [
  { name: "Venus Star India", href: "https://venusstarindia.com/venus-capital-heights/", logo: favicon("venusstarindia.com"), width: 256, height: 256, displayHeight: 48, showName: true, remote: true },
  { name: "Piramal", href: "https://www.piramalpharma.com", logo: "/logos/piramal.png", width: 2000, height: 913, displayHeight: 38 },
  { name: "MARS Cosmetics", href: "https://marscosmetics.in", logo: "/logos/mars-cosmetics.png", width: 266, height: 68, displayHeight: 32 },
  { name: "YourStory", href: "https://yourstory.com", logo: "/logos/yourstory.png", width: 540, height: 210, displayHeight: 34 },
  { name: "Royal Enfield", href: "https://www.royalenfield.com/in/en/home/", logo: "/logos/royal-enfield.png", width: 2000, height: 266, displayHeight: 26, maxWidth: 210 },
  { name: "Election Commission of India", href: "https://www.eci.gov.in", logo: "/logos/eci.png", width: 1280, height: 1200, displayHeight: 48, showName: true },
  { name: "Prime Group", href: "https://myprimegroup.in", logo: favicon("myprimegroup.in"), width: 256, height: 256, displayHeight: 48, showName: true, remote: true },
  { name: "Industries Dept, Bihar", href: "https://www.youtube.com/@IndustriesDeptBihar/playlists", logo: "/logos/dept-industries-bihar.png", width: 792, height: 792, displayHeight: 48, showName: true },
  { name: "NILF", href: "https://nalandainternationalliteraturefestival.org", logo: favicon("nalandainternationalliteraturefestival.org"), width: 256, height: 256, displayHeight: 48, showName: true, remote: true },
  { name: "EFA Public School", href: "https://www.efapublicschool.com", logo: favicon("efapublicschool.com"), width: 256, height: 256, displayHeight: 48, showName: true, remote: true },
  { name: "Kaimur Forest Division", href: "https://www.facebook.com/DfoKaimurWLS/", logo: "/logos/kaimur-forest-division.png", width: 502, height: 666, displayHeight: 48, showName: true },
  { name: "Bihar State Sports Authority", href: "https://www.biharsports.org", logo: "/logos/bihar-state-sports-authority.png", width: 2836, height: 1832, displayHeight: 54 },
];
