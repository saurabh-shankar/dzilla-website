"use client";

import { useEffect, useRef, useState } from "react";

/** Close if playback hasn't started by then (slow network, autoplay blocked). */
const START_TIMEOUT_MS = 6000;
/**
 * The "D.zilla" wordmark finishes writing at 4.8s of intro.mp4 and the rest
 * is a static hold. Start fading a short beat after it completes.
 * (If intro.mp4 is replaced, re-measure this.)
 */
const FADE_AT_S = 5.1;
/** Safety net if playback stalls: fade this long after the expected point. */
const STALL_GRACE_MS = 2500;
const FADE_MS = 800;

/**
 * Full-screen intro animation. Fades out (800ms) as soon as the wordmark has
 * finished writing, or on click / video end, then unmounts. Safety timers are tied to playback
 * (not page load), so a slow-loading video is never cut off mid-animation.
 * Portrait screens fill the frame; landscape screens show the whole frame
 * (on black) so the logo stays centred and visible.
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
    let timer = window.setTimeout(close, START_TIMEOUT_MS);
    let raf = 0;
    // Watch the playhead every frame and fade as soon as the wordmark is written.
    const watch = () => {
      if (done.current || !v) return;
      if (v.currentTime >= FADE_AT_S) return close();
      raf = requestAnimationFrame(watch);
    };
    const onPlaying = () => {
      window.clearTimeout(timer);
      const remaining = v ? Math.max(0, FADE_AT_S - v.currentTime) * 1000 : 0;
      timer = window.setTimeout(close, remaining + STALL_GRACE_MS);
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(watch);
    };
    if (v) {
      v.muted = true;
      v.addEventListener("ended", close);
      v.addEventListener("playing", onPlaying);
      // It may already be playing (autoplay can start before this script runs).
      if (!v.paused && v.currentTime > 0) onPlaying();
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(close);
    }
    closeRef.current = close;

    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(raf);
      v?.removeEventListener("ended", close);
      v?.removeEventListener("playing", onPlaying);
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
        transition: `opacity ${FADE_MS}ms cubic-bezier(0.4,0,0.2,1)`,
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
        className="h-full w-full object-cover landscape:object-contain"
        style={{ objectPosition: "center", transform: "translateY(2%)" }}
      />
    </div>
  );
}
