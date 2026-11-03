import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <PageShell header="contact" footer="default">
      <section className="gutter-x flex min-h-[70svh] flex-col justify-end pb-[clamp(48px,6vw,96px)] pt-[clamp(100px,13vh,164px)]">
        <div className="eyebrow mb-[18px] text-green">404</div>
        <h1 className="mb-5 mt-0 text-[clamp(36px,6.2vw,96px)] font-bold leading-[0.94] tracking-[-0.05em]">
          This page isn&apos;t here
          <span className="dz-dot" aria-hidden />
        </h1>
        <div className="mt-4 flex flex-wrap gap-2.5">
          <Link href="/" className="btn-solid hover-green px-7 py-[13px]">
            Back to D.zilla
          </Link>
          <Link href="/#work" className="btn-outline px-7 py-[13px]">
            See the work
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
