import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "ivf.for.all for Alchemy IVF — a D.zilla case study";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "CASE STUDY · BRAND IP", title: "ivf.for.all" });
}
