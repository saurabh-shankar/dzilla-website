"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
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
      <nav aria-label="Primary" className="flex min-w-0 items-center gap-3.5 text-[14px] font-medium min-[661px]:hidden max-[399px]:hidden">
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
      className={`flex min-w-0 items-center text-[15px] font-medium max-[399px]:hidden ${variant === "service" ? "gap-[clamp(6px,1.4vw,22px)]" : "gap-[clamp(8px,1.4vw,22px)]"}`}
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

const menuItemCls =
  "dz-spread block rounded-xl px-3.5 py-[11px] text-[15px] text-body [--spread:var(--color-ink)] hover:text-paper";

/**
 * Phones narrower than 400px: logo + Contact pill + a menu button. The panel
 * reuses the Services dropdown styling and motion. (At 400px and up the
 * designed navs fit on one row and are used unchanged.)
 */
function MobileMenu({ variant }: { variant: HeaderVariant }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const pathname = usePathname();
  const [lastPath, setLastPath] = useState(pathname);

  // Close when the route changes.
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

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

  const close = () => setOpen(false);
  const items: { href: string; label: string }[] = [
    { href: "/#work", label: variant === "case" ? "All work" : "Work" },
    ...services.map((s) => ({ href: serviceHref(s.slug), label: s.title })),
  ];

  return (
    <div ref={ref} className="flex items-center gap-2 min-[400px]:hidden">
      {variant !== "contact" && (
      <Link
        href={variant === "home" ? "/contact" : "/#contact"}
        className="dz-spread btn-solid px-4 py-2.5 !text-[14px]"
        data-track="cta_click"
        data-track-label="Contact (mobile header)"
      >
        <span>Contact</span>
      </Link>
      )}
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((o) => !o)}
        className="relative grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-[rgba(11,12,14,0.18)] bg-transparent"
      >
        <span aria-hidden className="relative block h-3 w-4">
          <span
            className="absolute left-0 h-[1.5px] w-4 rounded-full bg-ink transition-transform duration-300 ease-dz"
            style={{ top: open ? 5 : 1, transform: open ? "rotate(45deg)" : "none" }}
          />
          <span
            className="absolute left-0 h-[1.5px] w-4 rounded-full bg-ink transition-transform duration-300 ease-dz"
            style={{ top: open ? 5 : 9, transform: open ? "rotate(-45deg)" : "none" }}
          />
        </span>
      </button>
      {open && (
        <div id={panelId} className="absolute inset-x-[var(--gutter)] top-full pt-2">
          <nav
            aria-label="Menu"
            className="overflow-hidden rounded-[18px] border border-[rgba(11,12,14,0.1)] bg-white p-1.5 shadow-[0_18px_40px_rgba(11,12,14,0.1)]"
            style={{ transformOrigin: "right top", animation: "dz-menu-in 460ms cubic-bezier(0.22,1,0.36,1) both" }}
          >
            {items.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={close}
                className={menuItemCls}
                style={{ animation: `dz-menu-item-in 520ms cubic-bezier(0.22,1,0.36,1) ${60 + i * 35}ms backwards` }}
              >
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}

/** Fixed glass header. */
export function Header({ variant }: { variant: HeaderVariant }) {
  return (
    <header className="fixed inset-x-0 top-0 z-60">
      <div
        className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2.5 px-[max(clamp(14px,3.4vw,40px),calc((100%-1680px)/2))] shadow-header backdrop-blur-[22px] backdrop-saturate-[180%]"
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
        <MobileMenu variant={variant} />
      </div>
    </header>
  );
}
