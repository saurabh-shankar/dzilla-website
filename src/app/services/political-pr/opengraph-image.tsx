import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Political PR — D.zilla";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "SERVICES", title: "Political PR" });
}
