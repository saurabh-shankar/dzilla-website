import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { mailHref, site, telHref } from "@/content/site";
import { serviceHref, services } from "@/content/services";

const linkCls = "text-[15px] text-[rgba(247,248,248,0.78)] hover:text-green-bright";
const headCls = "mb-1.5 text-[12px] font-semibold tracking-[0.14em] text-[rgba(247,248,248,0.6)]";

/**
 * Site footer. `phoneOrder="political"` puts the PR desk number first
 * (site.json → contact.politicalPrOverride).
 */
export function Footer({ phoneOrder = "default" }: { phoneOrder?: "default" | "political" }) {
  const phones =
    phoneOrder === "political"
      ? [site.contact.phoneSecondary, site.contact.phonePrimary]
      : [site.contact.phonePrimary, site.contact.phoneSecondary];

  return (
    <footer className="gutter-x bg-night pb-7 pt-[clamp(44px,5.4vw,80px)] text-paper" data-track-section="footer">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,190px),1fr))] gap-[clamp(28px,3.4vw,48px)]">
        <div>
          <div className="mb-3.5">
            <Logo variant="light" height={28} />
          </div>
          <p className="mb-[18px] max-w-[260px] text-[15px] leading-[1.65] text-[rgba(247,248,248,0.7)]">{site.footerBlurb}</p>
          <a href={mailHref()} className="text-[15px] font-semibold text-paper hover:text-green-bright">
            {site.contact.email}
          </a>
          <div className="mt-3 flex flex-col gap-1.5">
            {phones.map((p) => (
              <a key={p} href={telHref(p)} className={linkCls}>
                {p}
              </a>
            ))}
          </div>
        </div>
        <nav aria-label="Company" className="flex flex-col gap-2.5">
          <div className={headCls}>COMPANY</div>
          <Link href="/" className={linkCls}>Home</Link>
          <Link href="/#work" className={linkCls}>Work</Link>
          <Link href="/#process" className={linkCls}>Process</Link>
          <Link href="/contact" className={linkCls}>Contact</Link>
        </nav>
        <nav aria-label="Services" className="flex flex-col gap-2.5">
          <div className={headCls}>SERVICES</div>
          {services.map((s) => (
            <Link key={s.slug} href={serviceHref(s.slug)} className={linkCls}>
              {s.title}
            </Link>
          ))}
        </nav>
        <nav aria-label="Social" className="flex flex-col gap-2.5">
          <div className={headCls}>SOCIAL</div>
          {site.social.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener" className={linkCls}>
              {s.label}
            </a>
          ))}
        </nav>
      </div>
      <div className="mt-[clamp(40px,5vw,72px)] flex flex-wrap justify-between gap-5 border-t border-white/14 pt-[22px] text-[14px] text-[rgba(247,248,248,0.7)]">
        <div>© 2026 D.zilla. All rights reserved.</div>
        <div className="flex gap-[26px]">
          <Link href="/contact" className="text-[rgba(247,248,248,0.7)] hover:text-green-bright">
            Terms of service
          </Link>
          <Link href="/contact" className="text-[rgba(247,248,248,0.7)] hover:text-green-bright">
            Privacy policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
