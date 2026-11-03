import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "D.zilla — We build brands through media";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "CAMPAIGN & CONTENT STUDIO", title: "We build brands through media" });
}
