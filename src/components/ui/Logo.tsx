import Image from "next/image";
import { site } from "@/content/site";

/**
 * The D.zilla wordmark. Always the image — never substitute text.
 * `dark` for light backgrounds (header), `light` for dark backgrounds (footer).
 */
export function Logo({ variant, height, priority }: { variant: "dark" | "light"; height: number; priority?: boolean }) {
  const logo = site.logo[variant];
  return (
    <Image
      src={logo.src}
      alt={site.name}
      width={logo.width}
      height={logo.height}
      priority={priority}
      unoptimized
      sizes={`${Math.ceil((height * logo.width) / logo.height)}px`}
      style={{ display: "block", height, width: "auto" }}
    />
  );
}
