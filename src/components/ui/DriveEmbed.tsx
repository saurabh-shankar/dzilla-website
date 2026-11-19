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
  /**
   * Over-scan the iframe (scale 1.06) to hide Drive's letterbox bars.
   * The designer's HTML leaves landing tiles 01–10 and the three Venus films
   * un-zoomed (zoom={false}); everything else is zoomed.
   */
  zoom?: boolean;
};

/**
 * Google Drive video embed. The iframe is centred and over-scanned
 * (scale 1.06) inside an overflow-hidden wrapper — this is what removes
 * Drive's letterbox bars. Styling lives in `.dz-embed` (globals.css).
 */
export function DriveEmbed({ driveId, title, aspect, lazy = true, className = "", style, zoom = true }: Props) {
  return (
    <div className={`dz-embed ${zoom ? "" : "dz-embed-plain"} ${className}`} style={{ aspectRatio: aspect, ...style }}>
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
