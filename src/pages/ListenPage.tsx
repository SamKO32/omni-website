import React from 'react';
import { FaSpotify, FaSoundcloud } from 'react-icons/fa';

export default function ListenPage() {
  return (
    <div className="min-h-screen bg-black text-white px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-3xl font-bold">Listen</h1>
      </div>

      <div className="flex justify-center items-center]">
        <div className="flex gap-12">
          <a
            href="https://open.spotify.com/album/3dQ3KA2C3L185Olu1Ls11D?si=1QDguFI9QUK9FnjUyvOr_g"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center hover:text-green-400 transition"
          >
            <FaSpotify size={40} />
            <span className="mt-2 text-sm">Spotify</span>
          </a>

          <a
            href="https://soundcloud.com/omniradio/radio4"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center hover:text-orange-400 transition"
          >
            <FaSoundcloud size={40} />
            <span className="mt-2 text-sm">SoundCloud</span>
          </a>
        </div>
      </div>
    </div>
  );
}
