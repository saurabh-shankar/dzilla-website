import Link from "next/link";
import { mailHref } from "@/content/site";
import { serviceHref, services, type ServiceSlug } from "@/content/services";

/** HOME / SERVICES / NAME */
export function Breadcrumb({ current }: { current: string }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-[clamp(20px,2.6vw,32px)] flex items-center gap-2.5 text-[12px] font-semibold tracking-[0.16em] text-meta"
    >
      <Link href="/" className="text-meta hover:text-green">
        HOME
      </Link>
      <span aria-hidden>/</span>
      <Link href="/#services" className="text-meta hover:text-green">
        SERVICES
      </Link>
      <span aria-hidden>/</span>
      <span aria-current="page" className="text-green">
        {current.toUpperCase()}
      </span>
    </nav>
  );
}

export function ServiceHeading({ title, sub, subMaxWidth = 460 }: { title: string; sub: string; subMaxWidth?: number }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-[clamp(22px,3vw,48px)]">
      <h1
        className="m-0 text-[clamp(38px,7vw,116px)] font-bold leading-[0.92] tracking-[-0.05em]"
        style={{ animation: "dz-rise 0.8s cubic-bezier(0.22,1,0.36,1) both" }}
      >
        {title}
        <span className="dz-dot" aria-hidden />
      </h1>
      <p
        className="m-0 text-[17px] leading-[1.65] text-body"
        style={{ maxWidth: subMaxWidth, animation: "dz-rise 0.8s cubic-bezier(0.22,1,0.36,1) 0.1s both" }}
      >
        {sub}
      </p>
    </div>
  );
}

/** Pill row linking all six services; the current one is a filled chip. */
export function ServiceChips({ current }: { current: ServiceSlug }) {
  return (
    <nav aria-label="Services" className="mt-[clamp(26px,3.2vw,44px)] flex flex-wrap gap-2">
      {services.map((s) =>
        s.slug === current ? (
          <span
            key={s.slug}
            aria-current="page"
            className="whitespace-nowrap rounded-full bg-ink px-[18px] py-[9px] text-[14px] font-semibold text-paper"
          >
            {s.title}
          </span>
        ) : (
          <Link
            key={s.slug}
            href={serviceHref(s.slug)}
            className="whitespace-nowrap rounded-full border border-[rgba(11,12,14,0.18)] px-[18px] py-[9px] text-[14px] font-medium text-body hover:border-ink hover:text-ink"
          >
            {s.title}
          </Link>
        ),
      )}
    </nav>
  );
}

export function Statement({ children, maxWidth = 900 }: { children: React.ReactNode; maxWidth?: number }) {
  return (
    <section className="gutter-x pb-[clamp(48px,6vw,88px)]">
      <p
        className="m-0 text-[clamp(22px,2.8vw,42px)] font-medium leading-[1.2] tracking-[-0.04em]"
        style={{ maxWidth }}
      >
        {children}
      </p>
    </section>
  );
}

/** Dark numbered list ("What's included" / "What we do"). */
export function DarkList({
  label,
  note,
  items,
  variant = "service",
}: {
  label: string;
  note: string;
  items: { title: string; body: string }[];
  variant?: "service" | "political";
}) {
  const pr = variant === "political";
  return (
    <section className="gutter-x bg-night py-[clamp(56px,7vw,112px)] text-paper">
      <div className="mb-[clamp(28px,3.4vw,48px)] flex flex-wrap items-baseline justify-between gap-6">
        <h2 className="section-label !text-green-bright">{label}</h2>
        <span className={`text-[13px] ${pr ? "text-[rgba(247,248,248,0.7)]" : "text-[rgba(247,248,248,0.64)]"}`}>{note}</span>
      </div>
      <ol className="m-0 flex list-none flex-col border-t border-white/14 p-0">
        {items.map((item, i) => (
          <li
            key={item.title}
            className={`${pr ? "" : "grid grid-cols-[minmax(0,1fr)] gap-2.5"} border-b border-white/14 py-[clamp(20px,2.4vw,32px)]`}
          >
            <div className="flex items-baseline gap-[clamp(14px,2vw,32px)]">
              <span className={`flex-none text-[12px] font-semibold ${pr ? "text-[rgba(247,248,248,0.7)]" : "text-[rgba(247,248,248,0.6)]"}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className={`m-0 text-[clamp(22px,3.2vw,44px)] font-medium tracking-[-0.04em] ${pr ? "leading-[1.05]" : "leading-none"}`}>
                {item.title}
              </h3>
            </div>
            <p
              className={
                pr
                  ? "mb-0 ml-[clamp(28px,3.4vw,62px)] mr-0 mt-3 max-w-[660px] text-[16px] leading-[1.65] text-[rgba(247,248,248,0.76)]"
                  : "m-0 ml-[clamp(28px,3.4vw,62px)] max-w-[620px] text-[16px] leading-[1.65] text-[rgba(247,248,248,0.7)]"
              }
            >
              {item.body}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}

/** Closing CTA block: big headline + green dot + buttons. */
export function ServiceCta({
  title,
  sub,
  primary,
  extra,
}: {
  title: string;
  sub?: string;
  primary: { href: string; label: string };
  extra?: React.ReactNode;
}) {
  const isMail = primary.href.startsWith("mailto:");
  const primaryCls = "btn-solid hover-green px-[30px] py-3.5";
  return (
    <section className="gutter-x border-t border-rule py-[clamp(56px,8vw,120px)]" data-track-section="service-cta">
      <h2 className="m-0 max-w-[1000px] [text-wrap:balance] text-[clamp(32px,6.4vw,104px)] font-bold leading-[0.94] tracking-[-0.05em]">
        {title}
        <span className="dz-dot" aria-hidden />
      </h2>
      {sub ? <p className="mb-0 mt-[clamp(20px,2.4vw,28px)] max-w-[520px] text-[17px] leading-[1.65] text-body">{sub}</p> : null}
      <div className={`flex flex-wrap gap-2.5 ${sub ? "mt-[clamp(24px,3vw,40px)]" : "mt-[clamp(28px,3.4vw,48px)]"}`}>
        {isMail ? (
          <a href={primary.href} className={primaryCls}>
            {primary.label}
          </a>
        ) : (
          <Link href={primary.href} className={primaryCls} data-track="cta_click" data-track-label={`${primary.label} (${title})`}>
            {primary.label}
          </Link>
        )}
        {extra}
        <Link href="/#services" className="btn-outline px-[30px] py-3.5">
          Back to services
        </Link>
      </div>
    </section>
  );
}

export const serviceMail = mailHref();
