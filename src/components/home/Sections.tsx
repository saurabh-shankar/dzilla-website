import Image from "next/image";
import Link from "next/link";
import { Video } from "@/components/ui/Video";
import {
  clients,
  contactBlock,
  hero,
  mailHref,
  politicalPrTeaser,
  processSteps,
  site,
  telHref,
  whatWeDo,
} from "@/content/site";
import { serviceHref, services } from "@/content/services";

/* ───────────────────────── Hero ───────────────────────── */

export function Hero() {
  return (
    <section
      id="top"
      data-track-section="hero"
      className="gutter-x flex min-h-svh flex-wrap items-stretch gap-[clamp(18px,2.4vw,36px)] bg-paper pb-[clamp(26px,3.2vw,44px)] pt-[clamp(84px,10vh,120px)] text-ink"
    >
      {/* Hero showreel fills the designed media slot (grey placeholder if unset). */}
      <div className="relative min-h-[clamp(260px,44svh,680px)] min-w-[min(100%,280px)] flex-[1_1_300px] overflow-hidden rounded-media bg-placeholder">
        {site.heroVideo ? (
          <Video
            video={site.heroVideo}
            mobileVideo={site.heroVideoMobile}
            title="D.zilla showreel"
            aspect="auto"
            lazy={false}
            afterIntro
            className="!absolute inset-0"
          />
        ) : null}
      </div>

      <div className="flex min-w-[min(100%,280px)] flex-[1_1_320px] flex-col justify-end gap-[clamp(18px,2.2vw,28px)] pb-[clamp(6px,1.4vw,16px)] pt-[clamp(6px,1.6vw,20px)]">
        <h1
          className="m-0 text-[clamp(34px,5.4vw,92px)] font-bold leading-[0.94] tracking-[-0.05em] text-ink"
          style={{ animation: "dz-rise 0.9s cubic-bezier(0.22,1,0.36,1) 0.08s both" }}
        >
          We build
          <br />
          brands through
          <br />
          media
          <span className="dz-dot" aria-hidden />
        </h1>
        <div style={{ animation: "dz-rise 0.9s cubic-bezier(0.22,1,0.36,1) 0.18s both" }}>
          <p className="mb-6 mt-0 max-w-[460px] text-[17px] leading-[1.65] text-body">{hero.sub}</p>
          <div className="flex flex-wrap gap-2.5">
            <Link href="/contact" className="dz-spread btn-solid px-7 py-[13px]" data-track="cta_click" data-track-label="Start a project (hero)">
              <span>Start a project</span>
            </Link>
            <Link href="#work" className="dz-spread btn-outline px-7 py-[13px]" data-track="cta_click" data-track-label="Watch the reel (hero)">
              <span>Watch the reel</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Trusted by ───────────────────────── */

function ClientRow({ hidden }: { hidden?: boolean }) {
  return (
    <ul
      aria-hidden={hidden || undefined}
      className="m-0 flex list-none items-center gap-[clamp(44px,6vw,92px)] p-0 pr-[clamp(44px,6vw,92px)]"
    >
      {clients.map((c) => (
        <li key={c.name} className="flex-none">
          <a
            href={c.href}
            target="_blank"
            rel="noopener"
            tabIndex={hidden ? -1 : undefined}
            className="group/logo flex items-center gap-3.5 text-logo-text"
          >
            <Image
              src={c.logo}
              alt={c.name}
              width={c.width}
              height={c.height}
              unoptimized={c.remote}
              sizes={`${Math.ceil((c.displayHeight * c.width) / c.height)}px`}
              className="block w-auto object-contain group-hover/logo:scale-[1.07]"
              style={{ height: c.displayHeight, maxWidth: c.maxWidth ?? 190 }}
            />
            {c.showName ? (
              <span className="whitespace-nowrap text-[17px] font-semibold tracking-[0.04em] text-logo-text">{c.name}</span>
            ) : null}
          </a>
        </li>
      ))}
    </ul>
  );
}

export function TrustedBy() {
  return (
    <section aria-labelledby="clients-heading" className="border-t border-rule py-[clamp(36px,4.6vw,64px)]" data-track-section="clients">
      <h2 id="clients-heading" className="section-label mx-[var(--gutter)] mb-[clamp(22px,2.6vw,34px)]">
        TRUSTED BY
      </h2>
      <div className="overflow-hidden">
        <div className="dz-marquee" style={{ ["--marquee-duration" as string]: "78s" }}>
          <ClientRow />
          <ClientRow hidden />
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── What we do ───────────────────────── */

export function WhatWeDo() {
  return (
    <section id="services" aria-labelledby="services-heading" className="gutter-x scroll-mt-16 bg-night py-[clamp(56px,7vw,112px)] text-paper">
      <div className="mb-[clamp(30px,3.6vw,52px)] flex flex-wrap items-baseline justify-between gap-6">
        <h2 id="services-heading" className="section-label !text-green-bright">
          WHAT WE DO
        </h2>
        <span className="text-[13px] text-[rgba(247,248,248,0.64)]">{whatWeDo.aside}</span>
      </div>

      <p
        data-reveal
        className="mb-[clamp(40px,5vw,76px)] mt-0 max-w-[820px] text-[clamp(22px,2.9vw,44px)] font-medium leading-[1.18] tracking-[-0.04em]"
      >
        {whatWeDo.intro}
      </p>

      <div className="flex flex-col border-t border-white/14">
        {services.map((s) => (
          <Link
            key={s.slug}
            href={serviceHref(s.slug)}
            data-reveal
            data-ink-host
            className="grid grid-cols-[minmax(0,1fr)] gap-2.5 border-b border-white/14 py-[clamp(22px,2.6vw,34px)] text-paper hover:text-paper"
          >
            <div className="flex items-baseline gap-[clamp(14px,2vw,32px)]">
              <span className="flex-none text-[12px] font-semibold text-[rgba(247,248,248,0.6)]">{s.n}</span>
              {/* Block-level ink, as in the reference (descenders clip at line-height 1). */}
              <h3 className="dz-ink dz-ink-light m-0 text-[clamp(24px,3.6vw,52px)] font-medium leading-none tracking-[-0.04em]">
                {s.title}
              </h3>
            </div>
            <p className="m-0 ml-[clamp(28px,3.4vw,62px)] max-w-[620px] text-[16px] leading-[1.65] text-[rgba(247,248,248,0.7)]">
              {s.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ───────────────────────── Political PR ───────────────────────── */

export function PoliticalPrTeaser() {
  return (
    <section id="pr" aria-labelledby="pr-heading" className="gutter-x relative overflow-hidden py-[clamp(56px,7vw,116px)]" data-track-section="political-pr">
      <div className="relative grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] items-end gap-[clamp(28px,4vw,72px)]">
        <div>
          <h2 id="pr-heading" className="section-label mb-[18px]">
            POLITICAL PR
          </h2>
          <p className="m-0 text-[clamp(24px,3.4vw,52px)] font-medium leading-[1.14] tracking-[-0.04em]">{politicalPrTeaser.heading}</p>
        </div>
        <div>
          <p className="mb-6 mt-0 max-w-[520px] text-[17px] leading-[1.68] text-body">{politicalPrTeaser.body}</p>
          <div className="flex flex-wrap gap-2.5">
            <Link href="/contact" className="dz-spread btn-solid px-7 py-[13px]" data-track="cta_click" data-track-label="Talk to the PR desk">
              <span>Talk to the PR desk</span>
            </Link>
            <Link href="#work" className="dz-spread btn-outline px-7 py-[13px]" data-track="cta_click" data-track-label="See campaign work">
              <span>See campaign work</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Process ───────────────────────── */

export function Process() {
  return (
    <section id="process" aria-labelledby="process-heading" className="gutter-x scroll-mt-16 border-t border-rule py-[clamp(56px,7vw,112px)]">
      <div className="mb-[clamp(30px,3.6vw,52px)] flex flex-wrap items-baseline justify-between gap-6">
        <h2 id="process-heading" className="section-label">
          PROCESS
        </h2>
        <p className="m-0 max-w-[560px] text-[clamp(20px,2.4vw,34px)] font-medium tracking-[-0.035em]">
          How a project moves through the studio.
        </p>
      </div>
      <ol
        data-reveal
        className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-[clamp(24px,3vw,44px)] border-t border-rule p-0 pt-[clamp(24px,3vw,40px)]"
      >
        {processSteps.map((step, i) => (
          <li key={step.n}>
            <div className={`eyebrow mb-3.5 ${i === 0 ? "text-green" : "text-meta"}`}>{step.n}</div>
            <h3 className="mb-2.5 mt-0 text-[clamp(19px,1.8vw,24px)] font-medium tracking-[-0.03em]">{step.title}</h3>
            <p className="m-0 text-[15px] leading-[1.65] text-muted">{step.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ───────────────────────── Contact ───────────────────────── */

export function ContactBlock() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="gutter-x relative scroll-mt-16 overflow-hidden border-t border-rule py-[clamp(60px,8vw,128px)]"
      data-track-section="contact-block"
    >
      <div className="relative">
        <h2
          id="contact-heading"
          className="m-0 max-w-[1100px] [text-wrap:balance] text-[clamp(34px,7.4vw,124px)] font-bold leading-[0.92] tracking-[-0.05em]"
        >
          {contactBlock.headline}
          <span className="text-green">.</span>
        </h2>
        <div className="mt-[clamp(32px,4vw,64px)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] items-end gap-[clamp(26px,3.4vw,56px)]">
          <div>
            <p className="mb-5 mt-0 max-w-[460px] text-[17px] leading-[1.68] text-body">{contactBlock.sub}</p>
            <a
              href={mailHref()}
              className="inline-block break-words border-b border-[rgba(11,12,14,0.24)] pb-1.5 text-[clamp(22px,3vw,44px)] font-semibold leading-none tracking-[-0.04em] text-ink hover:border-green hover:text-green"
            >
              {site.contact.email}
            </a>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <Link href="/contact" className="dz-spread btn-solid px-[30px] py-3.5" data-track="cta_click" data-track-label="Send us a message (contact block)">
              <span>Send us a message</span>
            </Link>
            <a href={telHref(site.contact.phonePrimary)} className="dz-spread btn-outline px-[30px] py-3.5">
              <span>{site.contact.phonePrimary}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
