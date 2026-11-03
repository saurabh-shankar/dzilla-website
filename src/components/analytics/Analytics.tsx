"use client";

import { useEffect } from "react";
import { useReportWebVitals } from "next/web-vitals";
import { track } from "@/lib/analytics";

/**
 * Site-wide interaction tracking via one delegated click listener:
 *  - any element with data-track="event_name" (+ data-track-label / data-track-location)
 *  - every mailto: and tel: link (lead intent)
 *  - outbound links (client logos etc.)
 * Also forwards Core Web Vitals to GA4.
 */
export function Analytics() {
  useReportWebVitals((metric) => {
    track("web_vitals", {
      metric_name: metric.name,
      metric_value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
      metric_rating: metric.rating,
      metric_id: metric.id,
      non_interaction: true,
    });
  });

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const el = target?.closest<HTMLElement>("a, button, [data-track]");
      if (!el) return;

      const location = el.closest<HTMLElement>("[data-track-section]")?.dataset.trackSection;
      const explicit = el.dataset.track;
      const label = el.dataset.trackLabel || el.textContent?.trim().slice(0, 80) || undefined;

      if (explicit) {
        track(explicit, { label, location, page_path: window.location.pathname });
        return;
      }

      if (el instanceof HTMLAnchorElement) {
        const href = el.getAttribute("href") || "";
        if (href.startsWith("mailto:")) {
          track("contact_email_click", { label, location, page_path: window.location.pathname });
        } else if (href.startsWith("tel:")) {
          track("contact_phone_click", { label: href.slice(4), location, page_path: window.location.pathname });
        } else if (el.host && el.host !== window.location.host) {
          track("outbound_click", { label, link_url: el.href, location });
        }
      }
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
