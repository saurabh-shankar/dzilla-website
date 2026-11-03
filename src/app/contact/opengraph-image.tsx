import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Contact D.zilla";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "CONTACT", title: "Let's build something worth noticing" });
}
