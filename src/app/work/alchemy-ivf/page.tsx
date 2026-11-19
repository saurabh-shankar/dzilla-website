import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { DriveEmbed } from "@/components/ui/DriveEmbed";
import { JsonLd } from "@/components/ui/JsonLd";
import { CaseCta, CaseHero, CaseSection, Closing, DidHelped, NumberedHeading, TwoCol } from "@/components/case/CaseParts";
import { alchemy } from "@/content/case-studies";
import { breadcrumbJsonLd, caseStudyJsonLd, pageMetadata } from "@/lib/seo";

const path = `/work/${alchemy.slug}`;

export const metadata: Metadata = pageMetadata({
  title: `${alchemy.title} for ${alchemy.client} — Case study`,
  description: alchemy.intro,
  path,
  type: "article",
});

export default function AlchemyCaseStudy() {
  const loop = [...alchemy.reels, ...alchemy.reels];
  return (
    <PageShell header="case" footer={false}>
      <JsonLd
        data={[
          caseStudyJsonLd({
            name: `${alchemy.title} — ${alchemy.client}`,
            description: alchemy.intro,
            path,
            client: alchemy.client,
            about: "An owned short-form content property (Brand IP) for a fertility clinic.",
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Work", path: "/#work" },
            { name: "Alchemy IVF", path },
          ]),
        ]}
      />

      <CaseHero tag={alchemy.tag} title={alchemy.title} intro={alchemy.intro} introMaxWidth={680} />

      <section className="gutter-x pb-[clamp(32px,4vw,64px)]">
        <dl className="m-0 flex flex-wrap gap-[clamp(20px,3vw,56px)] border-y border-rule py-[clamp(24px,3vw,40px)]">
          {alchemy.stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse">
              <dt className="mt-2 text-[16px] text-muted">{s.label}</dt>
              <dd className="m-0 text-[clamp(40px,5.4vw,78px)] font-bold leading-none tracking-[-0.05em]">
                {s.value}
                {s.accent ? <span className="text-green">{s.accent}</span> : null}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="pb-[clamp(48px,6vw,96px)]" aria-label="The series">
        <div className="group/rail relative overflow-hidden py-1">
          <div
            className="dz-marquee gap-[clamp(12px,1.4vw,22px)] px-[clamp(12px,1.4vw,22px)] group-hover/rail:[animation-play-state:paused]"
            style={{ ["--marquee-duration" as string]: "52s", ["--marquee-name" as string]: "dz-marquee-rev" }}
          >
            {loop.map((r, i) => (
              <DriveEmbed
                key={`${r.id}-${i}`}
                driveId={r.id}
                title={`ivf.for.all reel ${(i % alchemy.reels.length) + 1}`}
                aspect="9/16"
                className="w-[clamp(150px,16vw,268px)] flex-none rounded-card"
              />
            ))}
          </div>
        </div>
        <p className="mx-[var(--gutter)] mb-0 mt-[clamp(16px,2vw,24px)] text-[13px] tracking-[0.12em] text-faint">THE SERIES — SCROLLING</p>
      </section>

      <CaseSection>
        <TwoCol
          items={[
            {
              heading: "The client",
              body: "Alchemy IVF Nepal is a fertility clinic in a category people research quietly. Trust is earned before a call is ever made.",
            },
            {
              heading: "The problem",
              body: "Advertising doesn't move a decision this personal. The audience wanted answers, not offers — and nobody in the market was giving them plainly.",
            },
          ]}
        />
      </CaseSection>

      <CaseSection>
        <NumberedHeading n="01" title="The format" />
        <DidHelped
          leftLabel="WHAT WE BUILT"
          left={[
            "ivf.for.all — one question answered straight, every episode, by the people who actually treat it. A fixed shape, a fixed voice, a name the audience can follow.",
            "Because the format is owned, every episode makes the next one cheaper to produce and easier to find.",
          ]}
          chips={["Format design", "Scripting", "Batch production", "Publishing"]}
          right={[
            "The clinic stopped competing on ad spend and started owning the answer to the question everyone was already searching.",
            "Episodes keep pulling views months after publishing — the library works while the brand sleeps.",
          ]}
        />
      </CaseSection>

      <CaseSection>
        <NumberedHeading n="02" title="The work" />
        {/* Media only — no per-reel view captions (client decision, Handoff 2). */}
        <ul className="reel-grid-2 m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-[clamp(14px,1.8vw,26px)] p-0">
          {alchemy.reels.map((r, i) => (
            <li key={r.id} className="flex flex-col">
              <DriveEmbed driveId={r.id} title={`ivf.for.all episode ${i + 1}`} aspect="9/16" className="rounded-media" />
            </li>
          ))}
        </ul>
      </CaseSection>

      <Closing
        heading="Why it compounds"
        body={[
          "A campaign spends, runs and ends. An IP is an asset — the name, the format and the library stay with the brand, and every season costs less to make than the last.",
          "Almost none of this reach was bought or borrowed: 99.7% of the people who watched did not follow the account. The format found them.",
        ]}
        pull="We didn't run ads for a clinic. We built something it owns."
      />

      <CaseCta question="Want a property your brand actually owns?" cta={{ href: "/services/brand-ip", label: "Build an owned property" }} />
    </PageShell>
  );
}
