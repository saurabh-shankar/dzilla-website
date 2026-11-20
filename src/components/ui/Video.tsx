"use client";

import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { track } from "@/lib/analytics";

/** Self-hosted video files live in public/videos (see scripts/encode-videos.sh). */
export const videoSrc = (name: string) => `/videos/${name}.mp4`;
export const posterSrc = (name: string) => `/videos/posters/${name}.jpg`;

/** Only one video plays with sound at a time. */
const SOUND_EVENT = "dz:video-sound";

/*
 * Playback budget. Decoding many videos at once makes scrolling stutter,
 * especially on phones, so only the most visible few autoplay; the rest
 * hold their poster frame until they are among the most visible.
 */
type Entry = { v: HTMLVideoElement; ratio: number; manual: () => boolean };
const entries = new Set<Entry>();
let scheduled = false;
const maxPlaying = () => (window.matchMedia("(pointer: coarse)").matches ? 2 : 3);

function applyBudget() {
  scheduled = false;
  const ranked = [...entries]
    .filter((e) => e.ratio >= 0.25 && !e.manual())
    .sort((a, b) => b.ratio - a.ratio)
    .slice(0, maxPlaying());
  const allowed = new Set(ranked);
  for (const e of entries) {
    if (e.manual()) {
      if (e.ratio === 0 && !e.v.paused) e.v.pause(); // sound-on video scrolled away
      continue;
    }
    if (allowed.has(e)) {
      if (e.v.paused) e.v.play().catch(() => {});
    } else if (!e.v.paused) {
      e.v.pause();
    }
  }
}
function scheduleBudget() {
  if (scheduled) return;
  scheduled = true;
  requestAnimationFrame(applyBudget);
}

type Props = {
  /** File name in public/videos, without extension. */
  video: string;
  /** Optional lighter file for phones (≤639px wide); the browser picks one. */
  mobileVideo?: string;
  title: string;
  /** CSS aspect-ratio of the box, e.g. "16/9" or "9/16". */
  aspect: string;
  /** Lead/hero videos pass false so the first frames load straight away. */
  lazy?: boolean;
  /** Show the sound button (off for small cards inside moving marquees). */
  soundToggle?: boolean;
  /**
   * "visible" (default): autoplay muted while on screen, within the budget.
   * "hover": poster only; plays while hovered on desktop (marquee cards).
   */
  play?: "visible" | "hover";
  /** Hold on the first frame while the landing intro plays, then start from 0:00. */
  afterIntro?: boolean;
  className?: string;
  style?: CSSProperties;
};

/**
 * Muted, looping preview that plays only while on screen (nothing downloads
 * until it is near the viewport). The sound button unmutes it and reveals the
 * native controls. Under prefers-reduced-motion nothing autoplays: the poster
 * shows with native controls instead.
 */
export function Video({ video, mobileVideo, title, aspect, lazy = true, soundToggle = true, play = "visible", afterIntro = false, className = "", style }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const id = useId();
  const [soundOn, setSoundOn] = useState(false);
  const soundOnRef = useRef(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v.controls = true;
      v.preload = "metadata";
      return;
    }

    // Hover-only cards (marquees): poster until hovered; never on touch screens.
    if (play === "hover") {
      const box = v.parentElement!;
      const onEnter = () => {
        if (v.preload === "none") v.preload = "metadata";
        v.play().catch(() => {});
      };
      const onLeave = () => v.pause();
      box.addEventListener("pointerenter", onEnter);
      box.addEventListener("pointerleave", onLeave);
      return () => {
        box.removeEventListener("pointerenter", onEnter);
        box.removeEventListener("pointerleave", onLeave);
        v.pause();
      };
    }

    // Start fetching a little before the video scrolls into view.
    const near = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && v.preload === "none") v.preload = "metadata";
      },
      { rootMargin: "400px 0px" },
    );
    // Track how much is visible; the shared budget decides what plays.
    // Wait for the intro overlay (if one is showing) before joining the budget.
    let waiting =
      afterIntro &&
      !!document.querySelector(".dz-intro") &&
      !(window as Window & { __dzIntroDone?: boolean }).__dzIntroDone;
    const onIntroDone = () => {
      if (!waiting) return;
      waiting = false;
      v.currentTime = 0;
      scheduleBudget();
    };
    if (waiting) window.addEventListener("dz:intro-done", onIntroDone);

    const entry: Entry = { v, ratio: 0, manual: () => soundOnRef.current || waiting };
    entries.add(entry);
    const visible = new IntersectionObserver(
      ([e]) => {
        entry.ratio = e.isIntersecting ? e.intersectionRatio : 0;
        scheduleBudget();
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    near.observe(v);
    visible.observe(v);

    const onOtherSound = (e: Event) => {
      if ((e as CustomEvent<string>).detail !== id && soundOnRef.current) {
        soundOnRef.current = false;
        setSoundOn(false);
        v.muted = true;
        v.controls = false;
        scheduleBudget();
      }
    };
    window.addEventListener(SOUND_EVENT, onOtherSound);
    return () => {
      near.disconnect();
      visible.disconnect();
      entries.delete(entry);
      window.removeEventListener("dz:intro-done", onIntroDone);
      window.removeEventListener(SOUND_EVENT, onOtherSound);
      scheduleBudget();
    };
  }, [id, play, afterIntro]);

  const toggleSound = () => {
    const v = ref.current;
    if (!v) return;
    const next = !soundOnRef.current;
    soundOnRef.current = next;
    setSoundOn(next);
    v.muted = !next;
    v.controls = next;
    if (next) {
      window.dispatchEvent(new CustomEvent(SOUND_EVENT, { detail: id }));
      v.play().catch(() => {});
      track("video_sound_on", { video });
    }
    scheduleBudget();
  };

  return (
    <div className={`dz-embed ${className}`} style={{ aspectRatio: aspect, ...style }}>
      <video
        ref={ref}
        src={mobileVideo ? undefined : videoSrc(video)}
        poster={posterSrc(video)}
        title={title}
        aria-label={title}
        muted
        loop
        playsInline
        preload={lazy ? "none" : "metadata"}
        disablePictureInPicture
      >
        {mobileVideo ? (
          <>
            <source src={videoSrc(mobileVideo)} type="video/mp4" media="(max-width: 639px)" />
            <source src={videoSrc(video)} type="video/mp4" />
          </>
        ) : null}
      </video>
      {soundToggle ? (
        <button
          type="button"
          onClick={toggleSound}
          aria-label={soundOn ? `Mute ${title}` : `Play ${title} with sound`}
          aria-pressed={soundOn}
          className="absolute right-3 top-3 z-[1] grid h-9 w-9 cursor-pointer place-items-center rounded-full border-0 bg-[rgba(11,12,14,0.55)] text-paper backdrop-blur-sm hover:bg-[rgba(11,12,14,0.8)] motion-reduce:hidden"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M11 5 6 9H3v6h3l5 4V5z" fill="currentColor" />
            {soundOn ? (
              <>
                <path d="M15.5 8.5a5 5 0 0 1 0 7" />
                <path d="M18.5 5.5a9 9 0 0 1 0 13" />
              </>
            ) : (
              <>
                <path d="m16 9 5 6" />
                <path d="m21 9-5 6" />
              </>
            )}
          </svg>
        </button>
      ) : null}
    </div>
  );
}
