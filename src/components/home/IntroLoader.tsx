"use client";

import { useEffect, useRef, useState } from "react";

const FALLBACK_MS = 5000;
const FADE_MS = 520;

/**
 * Full-screen intro animation. Dismisses on video end, click, or a 5s
 * fallback — whichever comes first — then fades over 520ms and unmounts.
 * Rendered on the server so it covers the page from first paint; hidden
 * by CSS (and skipped here) under prefers-reduced-motion.
 * Runs on every load (client may want once-per-session — confirm first).
 */
export function IntroLoader({ src }: { src: string }) {
  const [phase, setPhase] = useState<"visible" | "fading" | "gone">("visible");
  const videoRef = useRef<HTMLVideoElement>(null);
  const done = useRef(false);
  const closeRef = useRef<() => void>(() => {});

  useEffect(() => {
    const root = document.documentElement;
    const close = () => {
      if (done.current) return;
      done.current = true;
      root.style.overflow = "";
      setPhase("fading");
      window.setTimeout(() => setPhase("gone"), FADE_MS + 40);
    };

    // Under reduced motion the overlay is display:none via CSS — nothing to run.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    root.style.overflow = "hidden";
    const v = videoRef.current;
    if (v) {
      v.muted = true;
      v.addEventListener("ended", close);
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(close);
    }
    const timer = window.setTimeout(close, FALLBACK_MS);
    closeRef.current = close;

    return () => {
      window.clearTimeout(timer);
      v?.removeEventListener("ended", close);
      root.style.overflow = "";
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div
      aria-hidden
      className="dz-intro fixed inset-0 z-[300] flex items-center justify-center bg-black"
      style={{
        opacity: phase === "fading" ? 0 : 1,
        pointerEvents: phase === "fading" ? "none" : undefined,
        transition: `opacity ${FADE_MS}ms cubic-bezier(0.22,1,0.36,1)`,
      }}
      onClick={() => closeRef.current()}
    >
      <video
        ref={videoRef}
        src={src}
        muted
        playsInline
        autoPlay
        preload="auto"
        className="h-full w-full object-cover"
        style={{ objectPosition: "center top", transform: "translateY(2%)" }}
      />
    </div>
  );
}
