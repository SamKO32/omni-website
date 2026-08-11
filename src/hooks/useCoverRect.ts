import { useEffect, useState } from 'react';

export interface CoverRect {
  left: number;
  top: number;
  width: number;
  height: number;
}

export type ObjectFit = 'cover' | 'fill';

// The background videos render with `object-fit: cover` (or, on some routes/breakpoints,
// `fill`) inside a viewport-filling container. Hitboxes are calibrated as percentages of
// the *video's own frame* (e.g. "the SHOP icon sits at 27%-38% of the video width"), so to
// place them correctly on screen we need to know exactly where that frame currently lands
// in the viewport — this reproduces the corresponding object-fit math. Percentage-of-frame
// coordinates are valid under either fit mode, so callers can switch fit per breakpoint
// without recalibrating.
function computeRect(intrinsicWidth: number, intrinsicHeight: number, fit: ObjectFit): CoverRect {
  const cw = window.innerWidth;
  const ch = window.innerHeight;

  if (fit === 'fill') {
    return { left: 0, top: 0, width: cw, height: ch };
  }

  const scale = Math.max(cw / intrinsicWidth, ch / intrinsicHeight);
  const width = intrinsicWidth * scale;
  const height = intrinsicHeight * scale;
  return { left: (cw - width) / 2, top: (ch - height) / 2, width, height };
}

export default function useCoverRect(
  intrinsicWidth: number,
  intrinsicHeight: number,
  fit: ObjectFit = 'cover'
): CoverRect {
  const [rect, setRect] = useState<CoverRect>(() => computeRect(intrinsicWidth, intrinsicHeight, fit));

  useEffect(() => {
    const onResize = () => setRect(computeRect(intrinsicWidth, intrinsicHeight, fit));
    onResize();
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
    };
  }, [intrinsicWidth, intrinsicHeight, fit]);

  return rect;
}
