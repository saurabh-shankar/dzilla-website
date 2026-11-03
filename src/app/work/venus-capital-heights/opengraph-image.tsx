import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Venus Capital Heights — a D.zilla case study";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "CASE STUDY · STUDIO / FILMS", title: "Venus Capital Heights" });
}
