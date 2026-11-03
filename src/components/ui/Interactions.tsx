"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const EASE = "cubic-bezier(0.22,1,0.36,1)";

function place(el: HTMLElement, e: PointerEvent) {
  const r = el.getBoundingClientRect();
  el.style.setProperty("--sx", `${e.clientX - r.left}px`);
  el.style.setProperty("--sy", `${e.clientY - r.top}px`);
  return r;
}

function inkTargets(host: HTMLElement): HTMLElement[] {
  return host.classList.contains("dz-ink") ? [host] : Array.from(host.querySelectorAll<HTMLElement>(".dz-ink"));
}

/**
 * Global pointer effects, bound once via event delegation so the markup can
 * stay in server components:
 *  - `.dz-spread`  → circle grows from the pointer (--sx/--sy/--ss)
 *  - `.dz-ink`     → ink sweep grows from the pointer (--sx/--sy/--sr);
 *                    `[data-ink-host]` lets a larger parent trigger it.
 * Plus reveal-on-scroll for `[data-reveal]`, re-run on every navigation.
 */
export function Interactions() {
  const pathname = usePathname();

  useEffect(() => {
    const handle = (entering: boolean) => (e: PointerEvent) => {
      const t = e.target as Element | null;
      if (!t || !(t instanceof Element)) return;
      const related = e.relatedTarget as Node | null;

      const spread = t.closest<HTMLElement>(".dz-spread");
      if (spread && !(related && spread.contains(related))) {
        const r = place(spread, e);
        spread.style.setProperty("--ss", entering ? (Math.hypot(r.width, r.height) / 70).toFixed(2) : "0");
      }

      const host = t.closest<HTMLElement>("[data-ink-host]") ?? t.closest<HTMLElement>(".dz-ink");
      if (host && !(related && host.contains(related))) {
        for (const ink of inkTargets(host)) {
          const r = place(ink, e);
          ink.style.setProperty("--sr", entering ? `${Math.hypot(r.width, r.height)}px` : "0px");
        }
      }
    };
    const over = handle(true);
    const out = handle(false);
    document.addEventListener("pointerover", over);
    document.addEventListener("pointerout", out);
    return () => {
      document.removeEventListener("pointerover", over);
      document.removeEventListener("pointerout", out);
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;
    const pending = new Set<HTMLElement>();
    const show = (el: HTMLElement) => {
      el.style.opacity = "1";
      el.style.transform = "none";
      pending.delete(el);
    };
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          show(entry.target as HTMLElement);
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.06 },
    );
    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el, i) => {
      if (el.dataset.revealed) return;
      el.dataset.revealed = "1";
      if (el.getBoundingClientRect().top < window.innerHeight) return;
      const delay = (i % 4) * 70;
      el.style.opacity = "0";
      el.style.transform = "translateY(24px)";
      el.style.transition = `opacity 700ms ${EASE} ${delay}ms, transform 700ms ${EASE} ${delay}ms, color 320ms ${EASE}, background-color 320ms ${EASE}, border-color 320ms ${EASE}`;
      pending.add(el);
      io.observe(el);
    });
    return () => {
      io.disconnect();
      // Never leave content hidden if the effect is torn down early.
      for (const el of pending) {
        show(el);
        delete el.dataset.revealed;
      }
    };
  }, [pathname]);

  return null;
}
