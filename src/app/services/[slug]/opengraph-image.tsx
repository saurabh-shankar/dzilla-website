import { ogContentType, ogSize, renderOg } from "@/lib/og";
import { servicePages, type ServicePage } from "@/content/services";

export const alt = "A D.zilla service";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return Object.keys(servicePages).map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = servicePages[slug as ServicePage["slug"]];
  return renderOg({ eyebrow: "SERVICES", title: page?.title ?? "D.zilla" });
}
