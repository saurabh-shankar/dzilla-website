import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { JsonLd } from "@/components/ui/JsonLd";
import { Breadcrumb, DarkList, ServiceChips, ServiceCta, ServiceHeading, Statement } from "@/components/service/ServiceParts";
import { politicalPr, serviceHref } from "@/content/services";
import { site, telHref } from "@/content/site";
import { breadcrumbJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";

const path = serviceHref("political-pr");

export const metadata: Metadata = pageMetadata({
  title: politicalPr.title,
  description: `${politicalPr.sub} ${politicalPr.statement}`,
  path,
});

const statNum = "text-[clamp(34px,4.2vw,60px)] font-bold leading-none tracking-[-0.05em]";
const statUnit = "text-[0.5em] font-semibold";

/** Track-record figures — markup kept inline for the mixed-weight units. */
const trackRecord: { value: React.ReactNode; label: string }[] = [
  { value: "30,091", label: "Victory margin on a Lok Sabha campaign we ran PR for" },
  {
    value: (
      <>
        25K<span className="text-green"> → </span>185K
      </>
    ),
    label: "Follower growth on a managed leader page in one campaign cycle",
  },
  {
    value: (
      <>
        3 <span className={statUnit}>states</span>
      </>
    ),
    label: "Bihar, Rajasthan and Haryana — campaigns run on the ground",
  },
  {
    value: (
      <>
        &lt;60<span className={statUnit}>min</span>
      </>
    ),
    label: "Response time from brief to published during campaign weeks",
  },
];

export default function PoliticalPrPage() {
  // The PR desk number leads on this page (site.json → politicalPrOverride).
  const deskPhone = site.contact.phoneSecondary;

  return (
    <PageShell header="service" footer="political">
      <JsonLd
        data={[
          serviceJsonLd({ name: politicalPr.title, description: politicalPr.sub, path }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/#services" },
            { name: politicalPr.title, path },
          ]),
        ]}
      />
      <section className="gutter-x pb-[clamp(40px,5vw,72px)] pt-[clamp(96px,12vh,132px)]">
        <Breadcrumb current={politicalPr.title} />
        <ServiceHeading title={politicalPr.title} sub={politicalPr.sub} subMaxWidth={480} />
        <ServiceChips current="political-pr" />
      </section>

      <Statement maxWidth={980}>{politicalPr.statement}</Statement>

      <DarkList label="WHAT WE DO" note={politicalPr.whatWeDoNote} items={politicalPr.whatWeDo} variant="political" />

      <section className="gutter-x py-[clamp(56px,7vw,104px)]">
        <h2 className="section-label mb-[clamp(26px,3.2vw,44px)]">TRACK RECORD</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-[clamp(24px,3vw,48px)] border-t border-rule pt-[clamp(26px,3vw,40px)]">
          {trackRecord.map((t) => (
            <div key={t.label}>
              <div className={statNum}>{t.value}</div>
              <p className="mb-0 mt-2.5 text-base leading-[1.6] text-muted">{t.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="gutter-x pb-[clamp(56px,7vw,104px)]">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] items-start gap-[clamp(28px,4vw,72px)]">
          <div>
            <h2 className="section-label mb-5">WHO WE WORK WITH</h2>
            <ul className="m-0 flex list-none flex-col border-t border-rule p-0">
              {politicalPr.whoWeWorkWith.map((w) => (
                <li key={w} className="border-b border-rule py-[15px] text-[17px]">
                  {w}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="section-label mb-5">HOW AN ENGAGEMENT STARTS</h2>
            <ol className="m-0 flex list-none flex-col gap-[clamp(20px,2.4vw,30px)] border-t border-rule p-0 pt-[clamp(22px,2.6vw,32px)]">
              {politicalPr.engagement.map((step, i) => (
                <li key={step.title}>
                  <div className="mb-2 text-xs font-semibold text-green">{String(i + 1).padStart(2, "0")}</div>
                  <h3 className="mb-2 mt-0 text-[19px] font-semibold tracking-[-0.02em]">{step.title}</h3>
                  <p className="m-0 text-base leading-[1.65] text-muted">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* OPEN ITEM — no Political PR work tagged yet, so there is no work section. */}

      <ServiceCta
        title={politicalPr.cta}
        sub={politicalPr.ctaSub}
        primary={{ href: "/contact", label: "Send us a message" }}
        extra={
          <a href={telHref(deskPhone)} className="btn-outline px-[30px] py-3.5">
            {deskPhone}
          </a>
        }
      />
    </PageShell>
  );
}
