import React from 'react';
import { FaSpotify, FaSoundcloud, FaMusic } from 'react-icons/fa';
import TVFrame from '../components/ui/TVFrame';

export default function ListenPage() {
  return (
    <>
      {/* Full-screen background video */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        overflow: 'hidden',
      }}>
        <video
          autoPlay
          loop
          muted
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        >
          <source src="/videos/LISTENPAGEBG.mov" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Centered, scrollable content */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          maxHeight: '80vh',
          padding: '2rem',
          overflowY: 'auto',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1.5rem',
          backgroundColor: 'transparent',
          borderRadius: '0',
        }}
        className="hide-scrollbar"
      >
        <h1 className="text-6xl font-custom text-white text-center">LISTEN</h1>

        <div className="flex gap-16 justify-center items-center">
          <a
            href="https://open.spotify.com/album/3dQ3KA2C3L185Olu1Ls11D?si=1QDguFI9QUK9FnjUyvOr_g"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center group transition"
          >
            <FaSpotify size={100} className="text-white group-hover:text-green-400 transition" />
            <span className="mt-2 text-lg text-white group-hover:text-green-400 font-custom">SPOTIFY</span>
          </a>

          <a
            href="https://soundcloud.com/omniradio/radio4"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center group transition"
          >
            <FaSoundcloud size={100} className="text-white group-hover:text-orange-400 transition" />
            <span className="mt-2 text-lg text-white group-hover:text-orange-400 font-custom">SOUNDCLOUD</span>
          </a>

          <a
            href="https://music.apple.com/us/artist/omni/1755264397"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center group transition"
          >
            <FaMusic size={100} className="text-white group-hover:text-red-400 transition" />
            <span className="mt-2 text-lg text-white group-hover:text-red-400 font-custom">APPLE MUSIC</span>
          </a>
        </div>
      </div>

      {/* TV frame overlay */}
      <TVFrame><></></TVFrame>
    </>
  );
}
