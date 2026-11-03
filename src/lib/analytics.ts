"use client";

import { sendGAEvent } from "@next/third-parties/google";
import { track as vercelTrack } from "@vercel/analytics";

export type AnalyticsParams = Record<string, string | number | boolean | undefined>;

/**
 * Fire a custom event to every configured analytics backend.
 * - GA4 (only when NEXT_PUBLIC_GA_ID is set and gtag has loaded)
 * - Vercel Web Analytics (no-op outside Vercel)
 */
export function track(event: string, params: AnalyticsParams = {}) {
  const clean = Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined)) as Record<
    string,
    string | number | boolean
  >;
  try {
    if (process.env.NEXT_PUBLIC_GA_ID && typeof window !== "undefined" && window.dataLayer) {
      sendGAEvent("event", event, clean);
    }
  } catch {
    /* analytics must never break the page */
  }
  try {
    vercelTrack(event, clean);
  } catch {
    /* ignore */
  }
}
