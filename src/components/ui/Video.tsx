"use client";

import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { track } from "@/lib/analytics";

/** Self-hosted video files live in public/videos (see scripts/encode-videos.sh). */
export const videoSrc = (name: string) => `/videos/${name}.mp4`;
export const posterSrc = (name: string) => `/videos/posters/${name}.jpg`;

/** Only one video plays with sound at a time. */
const SOUND_EVENT = "dz:video-sound";

type Props = {
  /** File name in public/videos, without extension. */
  video: string;
  title: string;
  /** CSS aspect-ratio of the box, e.g. "16/9" or "9/16". */
  aspect: string;
  /** Lead/hero videos pass false so the first frames load straight away. */
  lazy?: boolean;
  /** Show the sound button (off for small cards inside moving marquees). */
  soundToggle?: boolean;
  className?: string;
  style?: CSSProperties;
};

/**
 * Muted, looping preview that plays only while on screen (nothing downloads
 * until it is near the viewport). The sound button unmutes it and reveals the
 * native controls. Under prefers-reduced-motion nothing autoplays: the poster
 * shows with native controls instead.
 */
export function Video({ video, title, aspect, lazy = true, soundToggle = true, className = "", style }: Props) {
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

    // Start fetching a little before the video scrolls into view.
    const near = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && v.preload === "none") v.preload = "metadata";
      },
      { rootMargin: "400px 0px" },
    );
    // Play while at least a quarter is visible; pause otherwise.
    const visible = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (!soundOnRef.current) v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.25 },
    );
    near.observe(v);
    visible.observe(v);

    const onOtherSound = (e: Event) => {
      if ((e as CustomEvent<string>).detail !== id && soundOnRef.current) {
        soundOnRef.current = false;
        setSoundOn(false);
        v.muted = true;
        v.controls = false;
      }
    };
    window.addEventListener(SOUND_EVENT, onOtherSound);
    return () => {
      near.disconnect();
      visible.disconnect();
      window.removeEventListener(SOUND_EVENT, onOtherSound);
    };
  }, [id]);

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
  };

  return (
    <div className={`dz-embed ${className}`} style={{ aspectRatio: aspect, ...style }}>
      <video
        ref={ref}
        src={videoSrc(video)}
        poster={posterSrc(video)}
        title={title}
        aria-label={title}
        muted
        loop
        playsInline
        preload={lazy ? "none" : "metadata"}
        disablePictureInPicture
      />
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
