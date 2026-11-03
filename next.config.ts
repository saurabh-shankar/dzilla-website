import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // OG image routes read these from disk at request time for non-prerendered params.
  outputFileTracingIncludes: {
    "/**/opengraph-image": ["./src/assets/fonts/*.woff", "./public/logo-light.png"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // Client favicons used in the "Trusted by" strip (see src/content/site.ts).
    remotePatterns: [{ protocol: "https", hostname: "www.google.com", pathname: "/s2/favicons" }],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
