import React from 'react';
import TVFrame from '../components/ui/TVFrame';
import { FaInstagram, FaSpotify, FaApple, FaSoundcloud } from 'react-icons/fa';

export default function ListenPage() {
  return (
    <>
      {/* 🔊 Background Video */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, overflow: 'hidden' }}>
        <video autoPlay loop muted style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
          <source src="/videos/LISTENPAGEBG.mov" type="video/mp4" />
        </video>
      </div>

      {/* 🎵 Background Visualizer */}
      <div className="fixed inset-0 -z-10 flex items-end justify-center opacity-20 pointer-events-none">
        <div className="flex gap-[1px] h-40 items-end animate-pulse">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className="w-[2px] bg-green-400"
              style={{
                height: `${Math.random() * 100 + 20}%`,
                animation: `bounce ${1 + Math.random()}s infinite ease-in-out`,
              }}
            />
          ))}
        </div>
      </div>

      {/* 🎧 Main Content */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: '90%', maxWidth: '600px', maxHeight: '80vh',
        padding: '2rem', overflowY: 'auto', zIndex: 2,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        backgroundColor: 'transparent'
      }}
        className="hide-scrollbar text-white font-custom space-y-8 text-center"
      >

        {/* Vol 1 Spotify Embed */}
        <iframe
          src="https://open.spotify.com/embed/album/3dQ3KA2C3L185Olu1Ls11D?utm_source=generator"
          width="100%"
          height="380"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="rounded-xl shadow-lg"
        ></iframe>

        {/* Music Platforms */}
        <div className="flex flex-wrap justify-center gap-3">
          <a href="https://open.spotify.com/album/3dQ3KA2C3L185Olu1Ls11D?si=1QDguFI9QUK9FnjUyvOr_g" target="_blank" rel="noreferrer"
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-full text-sm">
            <FaSpotify /> Spotify
          </a>
          <a href="https://music.apple.com/us/artist/omni/1755264397" target="_blank" rel="noreferrer"
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full text-sm">
            <FaApple /> Apple Music
          </a>
          <a href="https://soundcloud.com/omniradio/radio4" target="_blank" rel="noreferrer"
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-full text-sm">
            <FaSoundcloud /> SoundCloud
          </a>
        </div>

        {/* Socials */}
        <div className="flex gap-6 mt-4 justify-center text-2xl">
          <a href="https://instagram.com/ontomynextidea" target="_blank" rel="noreferrer"
            className="text-pink-500 hover:text-pink-600">
            <FaInstagram />
          </a>
        </div>
      </div>

      {/* 📺 TV Overlay */}
      <TVFrame><></></TVFrame>
    </>
  );
}
