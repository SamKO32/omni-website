import React from 'react';

const BLOCK_COUNT = 12;

// Indeterminate — Suspense gives no real progress, so this is a looping
// scanner sweep (BIOS/boot-screen style) rather than a fill-to-100% bar.
export default function RetroLoader() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2,
        background: 'rgba(0, 0, 0, 0.55)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      }}
      className="flex flex-col items-center justify-center gap-4"
    >
      <div className="font-custom text-white text-xs sm:text-sm tracking-[0.3em] animate-flicker">
        LOADING
      </div>

      <div className="flex gap-1 border border-white/30 p-1.5">
        {Array.from({ length: BLOCK_COUNT }).map((_, i) => (
          <div
            key={i}
            className="w-2 h-4 sm:w-2.5 sm:h-5 bg-white"
            style={{
              animation: 'retro-block-pulse 1.2s ease-in-out infinite',
              animationDelay: `${i * 0.08}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
