import Link from "next/link";
import { DriveEmbed } from "@/components/ui/DriveEmbed";
import { alchemyRail, workItems, type WorkItem } from "@/content/work";

function CaseStudyPill({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="dz-spread btn-outline mt-[18px] !text-[14px] px-[22px] py-[11px]"
      data-track="case_study_click"
      data-track-label={href}
    >
      <span>{label}</span>
    </Link>
  );
}

/** Caption hierarchy used under every tile: eyebrow → title → note → number. */
function Caption({
  tag,
  title,
  note,
  n,
  href,
  ctaLabel,
  className = "px-1",
}: {
  tag: string;
  title: string;
  note: string;
  n?: string;
  href?: string;
  ctaLabel?: string;
  className?: string;
}) {
  const titleCls = "block text-[clamp(20px,2.4vw,34px)] font-medium tracking-[-0.035em]";
  return (
    <div className={`flex items-baseline justify-between gap-4 pt-[18px] ${className}`}>
      <div className="min-w-0">
        <div className="eyebrow mb-2 text-green">{tag}</div>
        <h3 className="m-0 font-[inherit] text-[length:inherit]">
          {href ? (
            <Link href={href} data-title className={`dz-ink ${titleCls}`}>
              {title}
            </Link>
          ) : (
            <span data-title className={`${titleCls} text-ink group-hover:text-green`}>
              {title}
            </span>
          )}
        </h3>
        <p className="mt-2.5 mb-0 max-w-[520px] text-[15px] leading-[1.6] text-muted">{note}</p>
        {href && ctaLabel ? <CaseStudyPill href={href} label={ctaLabel} /> : null}
      </div>
      {n ? <span className="flex-none text-[12px] font-semibold text-meta">{n}</span> : null}
    </div>
  );
}

function FullTile({ item, lead }: { item: WorkItem; lead?: boolean }) {
  return (
    <article data-tile className="group mx-auto flex w-[min(100%,1680px)] max-w-full flex-col self-center">
      <DriveEmbed
        driveId={item.driveId}
        title={item.title}
        aspect={item.aspect}
        lazy={!lead}
        zoom={false}
        className={`rounded-media min-h-[min(82svh,860px)] ${lead ? "shadow-tile" : ""}`}
      />
      <Caption
        tag={item.tag}
        title={item.title}
        note={item.note}
        n={item.n}
        href={item.caseStudy}
        ctaLabel={item.caseStudy ? "Click here to view case study →" : undefined}
      />
    </article>
  );
}

function TrioTile({ item }: { item: WorkItem }) {
  return (
    <article data-tile className="group flex min-w-0 flex-col">
      <DriveEmbed driveId={item.driveId} title={item.title} aspect="9/16" zoom={false} className="rounded-media" />
      <Caption tag={item.tag} title={item.title} note={item.note} n={item.n} />
    </article>
  );
}

/** Full-bleed Alchemy IVF marquee — pauses on hover. */
function AlchemyRail() {
  const loop = [...alchemyRail.driveIds, ...alchemyRail.driveIds];
  return (
    <section
      aria-label="Alchemy IVF — ivf.for.all reels"
      className="group/rail ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] w-screen overflow-hidden py-1"
    >
      <div
        className="dz-marquee gap-[clamp(12px,1.4vw,22px)] px-[clamp(12px,1.4vw,22px)] group-hover/rail:[animation-play-state:paused]"
        style={{ ["--marquee-duration" as string]: "60s" }}
      >
        {loop.map((id, i) => (
          <DriveEmbed
            key={`${id}-${i}`}
            driveId={id}
            title={`Alchemy IVF reel ${(i % alchemyRail.driveIds.length) + 1}`}
            aspect="9/16"
            className="flex-none rounded-card w-[clamp(180px,16vw,268px)]"
          />
        ))}
      </div>
      <Caption
        tag={alchemyRail.tag}
        title={alchemyRail.title}
        note={alchemyRail.note}
        href={alchemyRail.cta.href}
        ctaLabel={alchemyRail.cta.label}
        className="gutter-x"
      />
    </section>
  );
}

export function WorkSection() {
  const [lead, ...rest] = workItems;
  const trio = rest.filter((w) => w.layout === "trio");
  const firstTrioIndex = rest.findIndex((w) => w.layout === "trio");

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="gutter-x scroll-mt-20 border-t border-rule pb-[clamp(48px,6vw,96px)] pt-[clamp(56px,7vw,110px)]"
    >
      <div className="mb-[clamp(32px,4vw,60px)] flex flex-wrap items-baseline justify-between gap-6">
        <h2
          id="work-heading"
          className="m-0 max-w-[600px] text-[clamp(20px,2.4vw,34px)] font-medium tracking-[-0.035em] [text-wrap:pretty]"
        >
          Work that earned its attention.
        </h2>
      </div>

      <div className="flex flex-col gap-[clamp(44px,6vw,120px)]">
        <FullTile item={lead} lead />
        <AlchemyRail />
        {rest.map((item, i) => {
          if (item.layout === "trio") {
            if (i !== firstTrioIndex) return null;
            return (
              <div
                key="trio"
                className="mx-auto grid w-full max-w-[1680px] grid-cols-[repeat(auto-fit,minmax(min(100%,170px),1fr))] items-start gap-[clamp(14px,1.8vw,32px)]"
              >
                {trio.map((t) => (
                  <TrioTile key={t.slug} item={t} />
                ))}
              </div>
            );
          }
          return <FullTile key={item.slug} item={item} />;
        })}
      </div>
    </section>
  );
}
