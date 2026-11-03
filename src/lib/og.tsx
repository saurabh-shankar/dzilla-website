import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

let logoData: Promise<string> | null = null;
const logo = () =>
  (logoData ??= readFile(join(process.cwd(), "public/logo-light.png")).then(
    (buf) => `data:image/png;base64,${buf.toString("base64")}`,
  ));

let fontData: Promise<{ w600: Buffer; w700: Buffer }> | null = null;
const fonts = () =>
  (fontData ??= Promise.all([
    readFile(join(process.cwd(), "src/assets/fonts/plus-jakarta-sans-latin-600-normal.woff")),
    readFile(join(process.cwd(), "src/assets/fonts/plus-jakarta-sans-latin-700-normal.woff")),
  ]).then(([w600, w700]) => ({ w600, w700 })));

/** Branded social card: ink background, light wordmark, eyebrow + headline + green dot. */
export async function renderOg({ eyebrow, title }: { eyebrow: string; title: string }) {
  const [src, f] = await Promise.all([logo(), fonts()]);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#050506",
          color: "#F7F8F8",
          padding: "64px 72px",
          fontFamily: "Plus Jakarta Sans",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" width={182} height={60} style={{ width: 182, height: 60 }} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 24, letterSpacing: "0.14em", color: "#4ADE80", marginBottom: 24, fontWeight: 600 }}>
            {eyebrow}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              fontSize: title.length > 28 ? 76 : 96,
              fontWeight: 700,
              lineHeight: 0.96,
              letterSpacing: "-0.04em",
              maxWidth: 1000,
            }}
          >
            <span>{title}</span>
            <span
              style={{
                width: 22,
                height: 22,
                borderRadius: 999,
                background: "#12854A",
                marginLeft: 8,
                marginBottom: 12,
                flexShrink: 0,
              }}
            />
          </div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Plus Jakarta Sans", data: f.w600, weight: 600, style: "normal" },
        { name: "Plus Jakarta Sans", data: f.w700, weight: 700, style: "normal" },
      ],
    },
  );
}
