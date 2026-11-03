import Link from "next/link";

const bodyP = "m-0 text-[17px] leading-[1.7] text-body";
const microLabel = "eyebrow text-meta";

export function CaseHero({ tag, title, intro, introMaxWidth }: { tag: string; title: React.ReactNode; intro: string; introMaxWidth: number }) {
  return (
    <section className="gutter-x pb-[clamp(26px,3.2vw,44px)] pt-[clamp(100px,13vh,164px)]">
      <div className="max-w-[1100px] animate-dz-rise">
        <div className="eyebrow mb-[18px] text-green">{tag}</div>
        <h1 className="mb-[22px] mt-0 text-[clamp(38px,6.4vw,104px)] font-bold leading-[0.94] tracking-[-0.05em]">{title}</h1>
        <p className="m-0 text-[clamp(17px,1.5vw,21px)] leading-[1.6] text-body" style={{ maxWidth: introMaxWidth }}>
          {intro}
        </p>
      </div>
    </section>
  );
}

/** Two-column "The client / The problem" style block. */
export function TwoCol({ items }: { items: { heading: string; body: string }[] }) {
  return (
    <div className="grid max-w-[1400px] grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-[clamp(28px,4vw,80px)]">
      {items.map((it) => (
        <div key={it.heading}>
          <h2 className="mb-[18px] mt-0 text-[clamp(20px,2.4vw,34px)] font-medium tracking-[-0.035em]">{it.heading}</h2>
          <p className={bodyP}>{it.body}</p>
        </div>
      ))}
    </div>
  );
}

export function CaseSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`gutter-x border-t border-rule pb-[clamp(40px,5vw,72px)] pt-[clamp(48px,6vw,96px)] ${className}`}>
      {children}
    </section>
  );
}

export function NumberedHeading({ n, title }: { n: string; title: string }) {
  return (
    <div className="mb-[clamp(24px,3vw,40px)] flex items-baseline gap-5">
      <span className="flex-none text-xs font-semibold text-green">{n}</span>
      <h2 className="m-0 text-[clamp(26px,3.4vw,54px)] font-medium tracking-[-0.04em]">{title}</h2>
    </div>
  );
}

export function Chips({ items }: { items: string[] }) {
  return (
    <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
      {items.map((c) => (
        <li key={c} className="rounded-full border border-[rgba(11,12,14,0.16)] px-4 py-2 text-sm text-body">
          {c}
        </li>
      ))}
    </ul>
  );
}

/** "WHAT WE DID / HOW IT HELPED" pair with optional chips under the left column. */
export function DidHelped({
  leftLabel = "WHAT WE DID",
  left,
  chips,
  right,
  className = "",
}: {
  leftLabel?: string;
  left: string[];
  chips?: string[];
  right: string[];
  className?: string;
}) {
  const paras = (ps: string[], lastMb: string) =>
    ps.map((p, i) => (
      <p key={i} className={`${bodyP} ${i < ps.length - 1 ? "!mb-4" : lastMb}`}>
        {p}
      </p>
    ));
  return (
    <div className={`grid max-w-[1400px] grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-[clamp(28px,4vw,80px)] ${className}`}>
      <div>
        <div className={`${microLabel} mb-3.5`}>{leftLabel}</div>
        {paras(left, chips ? "!mb-5" : "")}
        {chips ? <Chips items={chips} /> : null}
      </div>
      <div>
        <div className={`${microLabel} mb-3.5`}>HOW IT HELPED</div>
        {paras(right, "")}
      </div>
    </div>
  );
}

export function ResultStat({ value, label, note }: { value: string; label: string; note: string }) {
  return (
    <div className="flex flex-wrap items-baseline gap-[clamp(20px,3vw,48px)] border-t border-rule pt-[clamp(20px,2.6vw,32px)]">
      <div>
        <div className="text-[clamp(40px,5vw,72px)] font-bold leading-none tracking-[-0.05em]">
          {value}
          <span className="text-green">+</span>
        </div>
        <p className="mb-0 mt-2 text-base leading-[1.6] text-muted">{label}</p>
      </div>
      <p className="m-0 max-w-[420px] text-base leading-[1.65] text-muted">{note}</p>
    </div>
  );
}

export function Closing({ heading, body, pull }: { heading: string; body: string; pull: string }) {
  return (
    <section className="gutter-x border-t border-rule py-[clamp(48px,6vw,96px)]">
      <div className="max-w-[820px]">
        <h2 className="mb-5 mt-0 text-[clamp(24px,3.2vw,48px)] font-medium tracking-[-0.04em]">{heading}</h2>
        <p className={`${bodyP} !mb-4`}>{body}</p>
        <p className="m-0 text-[clamp(19px,2vw,26px)] font-medium leading-[1.5] tracking-[-0.02em]">{pull}</p>
      </div>
    </section>
  );
}

export function CaseCta({ question, cta }: { question: string; cta: { href: string; label: string } }) {
  return (
    <section className="gutter-x border-t border-rule py-[clamp(48px,6vw,96px)]" data-track-section="case-cta">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="mb-[18px] mt-0 max-w-[560px] text-[clamp(24px,3.2vw,48px)] font-medium tracking-[-0.04em]">{question}</p>
          <Link href={cta.href} className="btn-solid hover-green px-7 py-[13px]" data-track="cta_click" data-track-label={`${cta.label} (case study)`}>
            {cta.label}
          </Link>
        </div>
        <Link href="/#work" className="text-[15px] font-semibold text-meta hover:text-green">
          ← Back to all work
        </Link>
      </div>
    </section>
  );
}
