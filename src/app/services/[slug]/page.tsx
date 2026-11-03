import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { DriveEmbed } from "@/components/ui/DriveEmbed";
import { JsonLd } from "@/components/ui/JsonLd";
import { Breadcrumb, DarkList, ServiceChips, ServiceCta, ServiceHeading, Statement, serviceMail } from "@/components/service/ServiceParts";
import { includedNote, servicePages, serviceHref, type ServicePage } from "@/content/services";
import { breadcrumbJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";

type Params = { slug: string };

const getPage = (slug: string): ServicePage | undefined =>
  Object.prototype.hasOwnProperty.call(servicePages, slug) ? servicePages[slug as ServicePage["slug"]] : undefined;

export function generateStaticParams(): Params[] {
  return Object.keys(servicePages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getPage(slug);
  if (!page) return {};
  return pageMetadata({ title: page.title, description: `${page.sub} ${page.statement}`, path: serviceHref(page.slug) });
}

function HeroMedia({ page }: { page: ServicePage }) {
  const m = page.heroMedia;
  if (!m) return null;
  return m.kind === "film" ? (
    <DriveEmbed
      driveId={m.driveId}
      title={m.title}
      aspect="16/9"
      lazy={false}
      className="mt-[clamp(26px,3.2vw,44px)] min-h-[min(64svh,680px)] rounded-media"
    />
  ) : (
    <DriveEmbed
      driveId={m.driveId}
      title={m.title}
      aspect="9/16"
      lazy={false}
      className="mt-[clamp(26px,3.2vw,44px)] max-w-[520px] rounded-media"
    />
  );
}

function WorkGrid({ page }: { page: ServicePage }) {
  const work = page.work;
  // OPEN ITEM — no tagged work (Campaigns): render nothing.
  if (!work || work.items.length === 0) return null;
  return (
    <section className="gutter-x pb-[clamp(56px,7vw,104px)]" data-track-section="service-work">
      <div className="mb-[clamp(24px,3vw,40px)] flex flex-wrap items-baseline justify-between gap-6">
        <h2 className="section-label">{work.label}</h2>
        <Link href="/#work" className="text-[15px] font-medium text-body hover:text-green">
          See all work →
        </Link>
      </div>
      {work.kind === "embeds" && work.designerOrphanFirst ? (
        <>
          <div
            className="grid gap-[clamp(18px,2.2vw,32px)]"
            style={{ gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${work.minCol}px), 1fr))` }}
          >
            <div className="px-1 pt-3.5">
              <h3 className="m-0 text-[clamp(17px,1.6vw,22px)] font-medium tracking-[-0.03em] text-ink">{work.items[0].title}</h3>
            </div>
          </div>
          {work.items.slice(1).map((item) => (
            <div key={item.driveId} className="flex min-w-0 flex-col">
              <DriveEmbed driveId={item.driveId} title={item.title} aspect={work.aspect} className="rounded-media" />
              <div className="px-1 pt-3.5">
                <h3 className="m-0 text-[clamp(17px,1.6vw,22px)] font-medium tracking-[-0.03em] text-ink">{item.title}</h3>
              </div>
            </div>
          ))}
        </>
      ) : work.kind === "embeds" ? (
        <div
          className="grid gap-[clamp(18px,2.2vw,32px)]"
          style={{ gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${work.minCol}px), 1fr))` }}
        >
          {work.items.map((item) => (
            <div key={item.driveId} className="flex min-w-0 flex-col">
              <DriveEmbed driveId={item.driveId} title={item.title} aspect={work.aspect} className="rounded-media" />
              <div className="px-1 pt-3.5">
                <h3 className="m-0 text-[clamp(17px,1.6vw,22px)] font-medium tracking-[-0.03em] text-ink">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-[clamp(20px,2.4vw,32px)]">
          {work.items.map((cs) => (
            <Link
              key={cs.href}
              href={cs.href}
              className="flex aspect-[4/5] flex-col justify-end rounded-media bg-ink p-[clamp(20px,2.4vw,32px)] text-paper hover:text-paper"
              data-track="case_study_click"
              data-track-label={cs.href}
            >
              <div className="eyebrow mb-2.5 text-green-bright">{cs.eyebrow}</div>
              <h3 className="m-0 text-[clamp(22px,2.4vw,32px)] font-medium tracking-[-0.035em]">{cs.title}</h3>
              <p className="mb-0 mt-2.5 text-[15px] leading-[1.6] text-[rgba(247,248,248,0.7)]">{cs.body}</p>
              <span className="mt-[18px] text-[14px] font-semibold text-green-bright">{cs.cta}</span>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

export default async function ServicePageRoute({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const page = getPage(slug);
  if (!page) notFound();

  const path = serviceHref(page.slug);
  return (
    <PageShell header="service">
      <JsonLd
        data={[
          serviceJsonLd({ name: page.title, description: page.sub, path }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/#services" },
            { name: page.title, path },
          ]),
        ]}
      />
      <section className="gutter-x pb-[clamp(32px,4vw,56px)] pt-[clamp(96px,12vh,132px)]">
        <Breadcrumb current={page.title} />
        <ServiceHeading title={page.title} sub={page.sub} />
        <ServiceChips current={page.slug} />
        <HeroMedia page={page} />
      </section>

      <Statement>{page.statement}</Statement>

      <DarkList label="WHAT'S INCLUDED" note={includedNote} items={page.included} />

      <section className="gutter-x py-[clamp(56px,7vw,104px)]">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] items-start gap-[clamp(28px,4vw,64px)]">
          <div>
            <h2 className="section-label mb-[18px]">WHAT YOU GET</h2>
            <ul className="m-0 flex list-none flex-col border-t border-rule p-0">
              {page.get.map((g) => (
                <li key={g} className="border-b border-rule py-3.5 text-[17px]">
                  {g}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="section-label mb-[18px]">IN NUMBERS</h2>
            <dl className="m-0 grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-6 border-t border-rule pt-[26px]">
              {page.numbers.map((n) => (
                <div key={n.label}>
                  <dt className="text-[clamp(30px,3.2vw,46px)] font-semibold leading-none tracking-[-0.04em]">{n.value}</dt>
                  <dd className="m-0 mt-2 text-[14px] text-muted">{n.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <WorkGrid page={page} />

      <ServiceCta title={page.cta} primary={{ href: serviceMail, label: "Send us a message" }} />
    </PageShell>
  );
}
