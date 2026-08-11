import React, { useEffect, useState } from 'react';
import RetroLoader from './RetroLoader';

interface DelayedFallbackProps {
  delayMs?: number;
}

// Suspense fallbacks render the instant a lazy chunk suspends — on a fast
// connection that's a loader flashing for a few dozen milliseconds, which
// reads as a glitch rather than help. Waiting delayMs before showing
// anything means fast loads (the common case here, given how small the
// route chunks are) never show a loader at all; only a load that's
// genuinely slow enough to notice gets one.
export default function DelayedFallback({ delayMs = 250 }: DelayedFallbackProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), delayMs);
    return () => clearTimeout(timer);
  }, [delayMs]);

  if (!show) return null;
  return <RetroLoader />;
}
