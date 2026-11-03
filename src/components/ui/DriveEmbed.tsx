import type { CSSProperties } from "react";

export const driveSrc = (id: string) => `https://drive.google.com/file/d/${id}/preview`;

type Props = {
  driveId: string;
  title: string;
  /** CSS aspect-ratio, e.g. "16/9" or "9/16". */
  aspect: string;
  /** Grid + marquee embeds are lazy; hero/lead embeds are not. */
  lazy?: boolean;
  className?: string;
  style?: CSSProperties;
};

/**
 * Google Drive video embed. The iframe is centred and over-scanned
 * (scale 1.06) inside an overflow-hidden wrapper — this is what removes
 * Drive's letterbox bars. Styling lives in `.dz-embed` (globals.css).
 */
export function DriveEmbed({ driveId, title, aspect, lazy = true, className = "", style }: Props) {
  return (
    <div className={`dz-embed ${className}`} style={{ aspectRatio: aspect, ...style }}>
      <iframe
        src={driveSrc(driveId)}
        title={title}
        allow="autoplay; fullscreen"
        allowFullScreen
        loading={lazy ? "lazy" : undefined}
      />
    </div>
  );
}
