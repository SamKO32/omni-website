import React, { useMemo } from 'react';
import { FaSpotify, FaApple, FaSoundcloud } from 'react-icons/fa';

export default function ListenPage() {
  // Computed once per mount, not per render — otherwise every re-render
  // reshuffles all 40 bars instead of letting the CSS animation run in place.
  const bars = useMemo(
    () =>
      Array.from({ length: 40 }, () => ({
        height: Math.random() * 100 + 20,
        duration: 1 + Math.random(),
      })),
    []
  );

  return (
    <>
      {/* Background visualizer bars */}
      <div className="fixed inset-0 -z-10 flex items-end justify-center opacity-20 pointer-events-none">
        <div className="flex gap-[1px] h-40 items-end animate-pulse">
          {bars.map((bar, i) => (
            <div
              key={i}
              className="w-[2px] bg-green-400"
              style={{
                height: `${bar.height}%`,
                animation: `bounce ${bar.duration}s infinite ease-in-out`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Main content */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: '90%', maxWidth: '600px', maxHeight: '80vh',
        padding: '2rem', overflowY: 'auto', zIndex: 2,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        backgroundColor: 'transparent',
      }}
        className="hide-scrollbar text-white font-custom space-y-8 text-center"
      >
        <iframe
          src="https://open.spotify.com/embed/album/3dQ3KA2C3L185Olu1Ls11D?utm_source=generator"
          width="100%"
          style={{ height: 'clamp(160px, 45dvh, 380px)' }}
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="rounded-xl shadow-lg"
        />

        <div className="flex flex-wrap justify-center gap-3">
          <a href="https://open.spotify.com/album/3dQ3KA2C3L185Olu1Ls11D?si=1QDguFI9QUK9FnjUyvOr_g" target="_blank" rel="noreferrer"
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-full text-sm transition-colors">
            <FaSpotify /> Spotify
          </a>
          <a href="https://music.apple.com/us/artist/omni/1755264397" target="_blank" rel="noreferrer"
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full text-sm transition-colors">
            <FaApple /> Apple Music
          </a>
          <a href="https://soundcloud.com/omniradio/radio4" target="_blank" rel="noreferrer"
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-full text-sm transition-colors">
            <FaSoundcloud /> SoundCloud
          </a>
        </div>
      </div>
    </>
  );
}
