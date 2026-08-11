import React from 'react';
import useCoverRect, { ObjectFit } from '../../hooks/useCoverRect';

interface VideoHitboxLayerProps {
  /** Intrinsic pixel size of the background video this layer's coordinates are calibrated against. */
  intrinsicWidth: number;
  intrinsicHeight: number;
  /** Must match the object-fit the corresponding <video> is actually rendered with. Defaults to 'cover'. */
  fit?: ObjectFit;
  children: React.ReactNode;
}

// Renders a fixed box that exactly tracks the background video's rendered frame,
// so that percentage-positioned children stay pinned to whatever is drawn in the
// video regardless of viewport size or aspect ratio.
export default function VideoHitboxLayer({ intrinsicWidth, intrinsicHeight, fit = 'cover', children }: VideoHitboxLayerProps) {
  const rect = useCoverRect(intrinsicWidth, intrinsicHeight, fit);

  return (
    <div
      style={{
        position: 'fixed',
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
      }}
    >
      {children}
    </div>
  );
}

interface HitboxProps {
  /** Bounds as percentages (0-100) of the video frame. */
  leftPct: number;
  topPct: number;
  widthPct: number;
  heightPct: number;
  onClick: () => void;
  ariaLabel: string;
  debug?: boolean;
}

// A single clickable zone positioned as a percentage of the enclosing VideoHitboxLayer.
export function Hitbox({ leftPct, topPct, widthPct, heightPct, onClick, ariaLabel, debug }: HitboxProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={`absolute cursor-pointer ${debug ? 'bg-red-500/50' : ''}`}
      style={{
        left: `${leftPct}%`,
        top: `${topPct}%`,
        width: `${widthPct}%`,
        height: `${heightPct}%`,
      }}
    />
  );
}
