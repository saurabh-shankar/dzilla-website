import type { Metadata } from "next";
import { site, telHref } from "@/content/site";

/** Canonical origin, without trailing slash. */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  // Netlify sets URL to the site's primary URL at build time.
  process.env.URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");

export const absoluteUrl = (path = "/") => `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;

type PageMetaInput = {
  title?: string;
  description: string;
  path: string;
  /** Use the title as-is (no "— D.zilla" suffix). */
  absoluteTitle?: boolean;
  type?: "website" | "article";
};

/** Per-page metadata with canonical URL, Open Graph and Twitter cards. */
export function pageMetadata({ title, description, path, absoluteTitle, type = "website" }: PageMetaInput): Metadata {
  const fullTitle = title ? (absoluteTitle ? title : `${title} — ${site.name}`) : `${site.name} — ${site.tagline}`;
  return {
    title: title ? (absoluteTitle ? { absolute: title } : title) : undefined,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      siteName: site.name,
      title: fullTitle,
      description,
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

/* ───────────────────────── JSON-LD ───────────────────────── */

export const organizationId = `${siteUrl}/#organization`;

export function organizationJsonLd() {
  const sameAs = site.social.map((s) => s.href).filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": organizationId,
    name: site.name,
    url: siteUrl,
    logo: absoluteUrl(site.logo.dark.src),
    image: absoluteUrl("/opengraph-image"),
    slogan: site.tagline,
    description: site.description,
    email: site.contact.email,
    telephone: telHref(site.contact.phonePrimary).replace("tel:", ""),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Gurgaon",
      addressRegion: "Haryana",
      addressCountry: "IN",
    },
    areaServed: { "@type": "Country", name: "India" },
    contactPoint: [site.contact.phonePrimary, site.contact.phoneSecondary].map((p) => ({
      "@type": "ContactPoint",
      telephone: telHref(p).replace("tel:", ""),
      email: site.contact.email,
      contactType: "sales",
      areaServed: "IN",
      availableLanguage: ["en", "hi"],
    })),
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: site.name,
    description: site.description,
    publisher: { "@id": organizationId },
    inLanguage: "en-IN",
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceJsonLd({ name, description, path }: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    serviceType: name,
    description,
    url: absoluteUrl(path),
    provider: { "@id": organizationId },
    areaServed: { "@type": "Country", name: "India" },
  };
}

export function caseStudyJsonLd({
  name,
  description,
  path,
  client,
  about,
}: {
  name: string;
  description: string;
  path: string;
  client: string;
  about: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name,
    headline: name,
    description,
    url: absoluteUrl(path),
    about,
    creator: { "@id": organizationId },
    sourceOrganization: { "@id": organizationId },
    funder: { "@type": "Organization", name: client },
    inLanguage: "en-IN",
  };
}
