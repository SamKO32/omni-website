import React from 'react';
import { FaSpotify, FaSoundcloud } from 'react-icons/fa';
import TVFrame from '../components/ui/TVFrame';

export default function ListenPage() {
  return (
    <TVFrame>
      <div className="text-white text-center space-y-12">
        <h1 className="text-4xl font-bold">Listen</h1>

        <div className="flex gap-16 justify-center items-center">
          <a
            href="https://open.spotify.com/album/3dQ3KA2C3L185Olu1Ls11D?si=1QDguFI9QUK9FnjUyvOr_g"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center hover:text-green-400 transition"
          >
            <FaSpotify size={48} />
            <span className="mt-2 text-lg">Spotify</span>
          </a>

          <a
            href="https://soundcloud.com/omniradio/radio4"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center hover:text-orange-400 transition"
          >
            <FaSoundcloud size={48} />
            <span className="mt-2 text-lg">SoundCloud</span>
          </a>
        </div>
      </div>
    </TVFrame>
  );
}
