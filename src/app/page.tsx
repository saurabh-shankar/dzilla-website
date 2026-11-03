import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { IntroLoader } from "@/components/home/IntroLoader";
import { WorkSection } from "@/components/home/WorkSection";
import { ContactBlock, Hero, PoliticalPrTeaser, Process, TrustedBy, WhatWeDo } from "@/components/home/Sections";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: `${site.name} — ${site.tagline}`,
  absoluteTitle: true,
  description: site.description,
  path: "/",
});

/** Section order is fixed: Hero → Trusted by → Work → What we do → Political PR → Process → Contact. */
export default function HomePage() {
  return (
    <>
      <IntroLoader src={site.introVideo} />
      <PageShell header="home">
        <Hero />
        <TrustedBy />
        <WorkSection />
        <WhatWeDo />
        <PoliticalPrTeaser />
        <Process />
        <ContactBlock />
      </PageShell>
    </>
  );
}
