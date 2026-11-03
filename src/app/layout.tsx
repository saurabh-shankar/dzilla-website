import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@/components/analytics/Analytics";
import { Interactions } from "@/components/ui/Interactions";
import { JsonLd } from "@/components/ui/JsonLd";
import { site } from "@/content/site";
import { organizationJsonLd, siteUrl, websiteJsonLd } from "@/lib/seo";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

const gaId = process.env.NEXT_PUBLIC_GA_ID;
/** Vercel Web Analytics + Speed Insights only exist on Vercel deployments. */
const onVercel = Boolean(process.env.VERCEL);

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "D.zilla",
    "creative agency",
    "content studio",
    "campaign agency India",
    "video production",
    "brand films",
    "social media agency",
    "CGI and AI content",
    "brand IP",
    "political PR",
    "Bihar",
    "Patna",
    "Gurgaon",
  ],
  authors: [{ name: site.name, url: siteUrl }],
  creator: site.name,
  publisher: site.name,
  formatDetection: { telephone: false, email: false, address: false },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_IN",
    url: "/",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-video-preview": -1, "max-snippet": -1 },
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
  category: "marketing",
};

export const viewport: Viewport = {
  themeColor: "#F7F8F8",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={jakarta.variable}>
      <head>
        <link rel="preconnect" href="https://drive.google.com" />
        <link rel="dns-prefetch" href="https://drive.google.com" />
      </head>
      <body>
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        {children}
        <Interactions />
        <Analytics />
        {onVercel ? (
          <>
            <VercelAnalytics />
            <SpeedInsights />
          </>
        ) : null}
      </body>
      {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
    </html>
  );
}
