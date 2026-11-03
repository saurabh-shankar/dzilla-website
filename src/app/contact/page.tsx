import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { ContactForm } from "@/components/contact/ContactForm";
import { JsonLd } from "@/components/ui/JsonLd";
import { contactBlock, mailHref, site, telHref } from "@/content/site";
import { absoluteUrl, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: `${contactBlock.sub} Email ${site.contact.email} or call ${site.contact.phonePrimary}.`,
  path: "/contact",
});

const card = "block rounded-media border border-[rgba(11,12,14,0.1)] p-[clamp(22px,2.6vw,32px)] transition-[border-color] duration-200";

export default function ContactPage() {
  const hasBackend = Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_FROM_EMAIL);
  return (
    <PageShell header="contact" footer={false}>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: `Contact ${site.name}`,
            url: absoluteUrl("/contact"),
          },
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        ]}
      />
      <section className="gutter-x pb-[clamp(32px,4vw,56px)] pt-[clamp(100px,13vh,164px)]">
        <div className="max-w-[960px] animate-dz-rise">
          <div className="eyebrow mb-[18px] text-green">CONTACT</div>
          <h1 className="mb-5 mt-0 text-[clamp(36px,6.2vw,96px)] font-bold leading-[0.94] tracking-[-0.05em]">
            Send us a message
            <span aria-hidden className="ml-[0.06em] inline-block h-[0.14em] w-[0.14em] rounded-full bg-green" />
          </h1>
          <p className="m-0 max-w-[560px] text-[clamp(17px,1.5vw,20px)] leading-[1.6] text-body">{contactBlock.sub}</p>
        </div>
      </section>

      <section className="gutter-x pb-[clamp(56px,7vw,110px)]">
        <div className="grid max-w-[1400px] grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] items-start gap-[clamp(28px,4vw,72px)]">
          <ContactForm email={site.contact.email} hasBackend={hasBackend} />

          <div className="order-0 flex flex-col gap-3.5" data-track-section="contact-cards">
            <a href={mailHref()} className={`${card} bg-white hover:border-green`}>
              <div className="eyebrow mb-3.5 text-meta">EMAIL US</div>
              <div className="break-words text-[clamp(20px,2.2vw,30px)] font-semibold tracking-[-0.035em] text-ink">{site.contact.email}</div>
              <div className="mt-3 text-[15px] text-muted">Tap to open your mail app →</div>
            </a>
            <div className={`${card} bg-white`}>
              <div className="eyebrow mb-3.5 text-meta">CALL US</div>
              <a href={telHref(site.contact.phonePrimary)} className="block text-[clamp(20px,2.2vw,30px)] font-semibold tracking-[-0.035em] text-ink hover:text-green">
                {site.contact.phonePrimary}
              </a>
              <a href={telHref(site.contact.phoneSecondary)} className="mt-2 block text-base font-medium text-muted hover:text-green">
                {site.contact.phoneSecondary}
              </a>
              <div className="mt-3 text-[15px] text-muted">Tap to call →</div>
            </div>
            <div className={card}>
              <div className="eyebrow mb-3.5 text-meta">STUDIO</div>
              <p className="mb-2.5 mt-0 text-[17px] leading-[1.6] text-ink">{site.contact.studio}</p>
              <p className="m-0 text-[15px] leading-[1.6] text-muted">{site.contact.hours}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="gutter-x border-t border-rule py-[clamp(32px,4vw,56px)]">
        <Link href="/" className="text-[15px] font-semibold text-meta hover:text-green">
          ← Back to D.zilla
        </Link>
      </section>
    </PageShell>
  );
}
