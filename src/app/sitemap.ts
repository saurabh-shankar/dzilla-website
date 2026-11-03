import type { MetadataRoute } from "next";
import { serviceHref, services } from "@/content/services";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const entry = (path: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly") => ({
    url: absoluteUrl(path),
    changeFrequency,
    priority,
  });
  return [
    entry("/", 1, "weekly"),
    ...services.map((s) => entry(serviceHref(s.slug), 0.8)),
    entry("/work/venus-capital-heights", 0.7),
    entry("/work/alchemy-ivf", 0.7),
    entry("/contact", 0.6, "yearly"),
  ];
}
