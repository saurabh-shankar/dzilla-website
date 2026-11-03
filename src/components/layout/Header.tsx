"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { serviceHref, services } from "@/content/services";

export type HeaderVariant = "home" | "service" | "case" | "contact";

const plainLink = "px-1 py-2.5 text-ink hover:text-green";
const contactPill = "btn-solid hover-green px-6 py-[11px]";

/** Services dropdown (landing page only). Opens on hover, focus, or tap. */
function ServicesMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onDown = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <Link
        href="/#services"
        className="dz-ink flex items-center gap-2 px-1 py-2.5"
        aria-haspopup="true"
        aria-expanded={open}
      >
        Services
        <span
          aria-hidden
          className="inline-block h-0 w-0 border-x-4 border-t-[5px] border-x-transparent border-t-green"
        />
      </Link>
      {open && (
        <div className="absolute left-[-14px] top-full w-[272px] pt-2.5">
          <div
            className="overflow-hidden rounded-[18px] border border-[rgba(11,12,14,0.1)] bg-white p-1.5 shadow-[0_18px_40px_rgba(11,12,14,0.1)]"
            style={{ transformOrigin: "18px top", animation: "dz-menu-in 460ms cubic-bezier(0.22,1,0.36,1) both" }}
          >
            {services.map((s, i) => (
              <Link
                key={s.slug}
                href={serviceHref(s.slug)}
                onClick={() => setOpen(false)}
                className="dz-spread block rounded-xl px-3.5 py-[11px] text-[15px] text-body [--spread:var(--color-ink)] hover:translate-x-[5px] hover:text-paper focus-visible:translate-x-[5px]"
                style={{ animation: `dz-menu-item-in 520ms cubic-bezier(0.22,1,0.36,1) ${60 + i * 45}ms backwards` }}
              >
                <span>{s.title}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function HomeNav() {
  return (
    <>
      {/* Full nav (> 660px) */}
      <nav aria-label="Primary" className="flex min-w-0 items-center gap-[clamp(6px,1.4vw,22px)] text-[15px] font-medium max-[660px]:hidden">
        <Link href="/#work" className="dz-ink px-1 py-2.5">
          Work
        </Link>
        <ServicesMenu />
        <Link href="/contact" className="dz-spread btn-solid px-6 py-[11px]" data-track="cta_click" data-track-label="Contact Us (header)">
          <span>Contact Us</span>
        </Link>
      </nav>
      {/* Compact nav (≤ 660px) */}
      <nav aria-label="Primary" className="flex min-w-0 items-center gap-3.5 text-[14px] font-medium min-[661px]:hidden">
        <Link href="/#work" className="dz-ink px-0.5 py-2.5">
          Work
        </Link>
        <Link href="/#services" className="dz-ink px-0.5 py-2.5">
          Services
        </Link>
        <Link
          href="/contact"
          className="dz-spread btn-solid px-[18px] py-2.5 !text-[14px]"
          data-track="cta_click"
          data-track-label="Contact (header)"
        >
          <span>Contact</span>
        </Link>
      </nav>
    </>
  );
}

function SubNav({ variant }: { variant: Exclude<HeaderVariant, "home"> }) {
  return (
    <nav
      aria-label="Primary"
      className={`flex min-w-0 items-center text-[15px] font-medium ${variant === "service" ? "gap-[clamp(6px,1.4vw,22px)]" : "gap-[clamp(8px,1.4vw,22px)]"}`}
    >
      {variant === "case" ? (
        <Link href="/#work" className={plainLink}>
          All work
        </Link>
      ) : (
        <Link href="/#work" className={plainLink}>
          Work
        </Link>
      )}
      {variant === "service" && (
        <Link href="/#services" className={plainLink}>
          All services
        </Link>
      )}
      {variant === "contact" && (
        <Link href="/#services" className={plainLink}>
          Services
        </Link>
      )}
      {variant !== "contact" && (
        <Link href="/#contact" className={contactPill} data-track="cta_click" data-track-label="Contact Us (header)">
          Contact Us
        </Link>
      )}
    </nav>
  );
}

/** Fixed glass header. */
export function Header({ variant }: { variant: HeaderVariant }) {
  return (
    <header className="fixed inset-x-0 top-0 z-60">
      <div
        className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2.5 px-[clamp(14px,3.4vw,40px)] shadow-header backdrop-blur-[22px] backdrop-saturate-[180%]"
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.68), rgba(247,248,248,0.42))",
          paddingTop: 14,
          paddingBottom: 14,
        }}
      >
        <Link href={variant === "home" ? "#top" : "/"} className="flex-none" aria-label="D.zilla — home">
          <Logo variant="dark" height={26} priority />
        </Link>
        {variant === "home" ? <HomeNav /> : <SubNav variant={variant} />}
      </div>
    </header>
  );
}
