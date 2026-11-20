"use client";

import { useEffect, useRef, useState } from "react";

/** Close if playback hasn't started by then (slow network, autoplay blocked). */
const START_TIMEOUT_MS = 6000;
/** Once playing, safety net if `ended` never fires: video length + this. */
const END_GRACE_MS = 1500;
const FADE_MS = 520;

/**
 * Full-screen intro animation. Dismisses when the video ends or on click,
 * then fades over 520ms and unmounts. Safety timers are tied to playback
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
    const onPlaying = () => {
      window.clearTimeout(timer);
      const remaining = v && Number.isFinite(v.duration) ? (v.duration - v.currentTime) * 1000 : 10000;
      timer = window.setTimeout(close, remaining + END_GRACE_MS);
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
        className="h-full w-full object-cover landscape:object-contain"
        style={{ objectPosition: "center", transform: "translateY(2%)" }}
      />
    </div>
  );
}
