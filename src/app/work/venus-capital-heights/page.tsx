import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { DriveEmbed } from "@/components/ui/DriveEmbed";
import { JsonLd } from "@/components/ui/JsonLd";
import { CaseCta, CaseHero, CaseSection, Closing, DidHelped, NumberedHeading, ResultStat, TwoCol } from "@/components/case/CaseParts";
import { venus } from "@/content/case-studies";
import { breadcrumbJsonLd, caseStudyJsonLd, pageMetadata } from "@/lib/seo";

const path = `/work/${venus.slug}`;

export const metadata: Metadata = pageMetadata({
  title: `${venus.title} — Case study`,
  description: venus.intro,
  path,
  type: "article",
});

function ReelTrio({ ids, title }: { ids: string[]; title: string }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-[clamp(16px,2vw,28px)]">
      {ids.map((id, i) => (
        <DriveEmbed key={id} driveId={id} title={`${title} ${i + 1}`} aspect="9/16" className="rounded-media" />
      ))}
    </div>
  );
}

export default function VenusCaseStudy() {
  const m = venus.media;
  return (
    <PageShell header="case" footer={false}>
      <JsonLd
        data={[
          caseStudyJsonLd({
            name: venus.title,
            description: venus.intro,
            path,
            client: "Venus Star Construction",
            about: "Brand film, experience-centre content and event production for a premium residential project in Bihar.",
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Work", path: "/#work" },
            { name: venus.title, path },
          ]),
        ]}
      />

      <CaseHero
        tag={venus.tag}
        title={
          <>
            Venus Capital
            <br />
            Heights
          </>
        }
        intro={venus.intro}
        introMaxWidth={640}
      />

      <section className="gutter-x">
        <DriveEmbed
          driveId={m.hero}
          title="Venus Capital Heights brand film"
          aspect="16/9"
          lazy={false}
          className="min-h-[min(76svh,820px)] rounded-media"
        />
      </section>

      <section className="gutter-x py-[clamp(40px,5vw,80px)]">
        <dl className="m-0 grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-[clamp(20px,2.6vw,40px)] border-y border-rule py-[clamp(24px,3vw,40px)]">
          {venus.facts.map((f) => (
            <div key={f.label}>
              <dt className="eyebrow mb-2.5 text-meta">{f.label}</dt>
              <dd className="m-0 text-[17px] leading-[1.5]">{f.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="gutter-x pb-[clamp(48px,6vw,96px)]">
        <TwoCol
          items={[
            {
              heading: "The client",
              body: "Venus Star Construction is one of Bihar's leading real estate and construction brands, with projects delivered across the state.",
            },
            {
              heading: "The project",
              body: "Venus Capital Heights is the brand's most ambitious upcoming development — a premium residential project in Bihar. Our job is to build belief in it before it exists.",
            },
          ]}
        />
      </section>

      <CaseSection>
        <NumberedHeading n="01" title="The brand film" />
        <DidHelped
          className="mb-[clamp(28px,3.4vw,56px)]"
          left={[
            "A cinematic film on the transformation of the city — from Pataliputra to present-day Patna.",
            "It tied the city's changing lifestyle and aspirations to Venus Capital Heights, introducing the project as part of that shift rather than a listing.",
          ]}
          right={[
            "Instead of selling the property, the film sold the vision behind it — and the emotion attached to the city it stands in.",
            "It positioned Venus Capital Heights as a project connected to Patna's changing identity, and created the first wave of buzz around the launch.",
          ]}
        />
        <ResultStat
          value="40K"
          label="Views on Instagram"
          note="And an emotional connection between the audience and the brand that later work could build on."
        />
        <DriveEmbed driveId={m.brandFilm} title="Venus Capital Heights film" aspect="16/9" className="mt-[clamp(28px,3.4vw,52px)] rounded-media" />
      </CaseSection>

      <CaseSection>
        <NumberedHeading n="02" title="The experience centre" />
        <DidHelped
          className="mb-[clamp(28px,3.4vw,56px)]"
          left={[
            "Venus built an experience centre where visitors can see and feel how Venus Capital Heights will live.",
            "We produce the content around it — cinematic videos, reels and short-form, experience-led visuals, interior and detail shots, and promotional cutdowns.",
          ]}
          chips={["Cinematic video", "Reels & short-form", "Interior & detail", "Promotional"]}
          right={[
            "The content takes the experience centre beyond its physical space — people who haven't visited can still understand the vision.",
            "It builds curiosity, drives footfall to the centre, shows the premium experience digitally and keeps the brand's presence consistent between milestones.",
          ]}
        />
        <ReelTrio ids={m.experienceCentreReels} title="Experience centre reel" />
      </CaseSection>

      <CaseSection>
        <NumberedHeading n="03" title="Red Carpet Karnival" />
        <DidHelped
          className="mb-[clamp(28px,3.4vw,56px)]"
          left={[
            "Venus hosted Red Carpet Karnival — a first-of-its-kind carnival in Bihar, with international artists and multiple audience experiences.",
            "D.zilla was the official content and production team.",
          ]}
          chips={["Master event film", "Short-form reels", "Long-form content", "Photography", "Vox pop"]}
          right={[
            "The content turned a one-night event into a campaign that kept running — reaching far past the people who attended.",
            "It showed the scale of the carnival, built hype around the Venus brand, and positioned Venus Star Construction as a brand creating experiences, not only buildings.",
          ]}
        />
        <ResultStat
          value="1M"
          label="Collective views across event content"
          note="Strong engagement and visibility across social, from a single weekend of shooting."
        />
        <DriveEmbed driveId={m.eventFilm} title="Venus Capital Heights event film" aspect="16/9" className="mt-[clamp(28px,3.4vw,52px)] rounded-media" />
        <div className="mt-[clamp(16px,2vw,28px)]">
          <ReelTrio ids={m.redCarpetKarnivalReels} title="Red Carpet Karnival reel" />
        </div>
      </CaseSection>

      <Closing
        heading="Our role"
        body="Across these three projects, D.zilla continues as a consistent content and production partner for Venus Star Construction — cinematic, short-form and long-form work that shifts with what the brand needs next."
        pull="Content that doesn't just show a project — it builds excitement around the future of the brand."
      />

      <CaseCta question="Got something worth building anticipation for?" cta={{ href: "/#contact", label: "Start a project" }} />
    </PageShell>
  );
}
