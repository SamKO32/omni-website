import React from 'react';
import { FaSpotify, FaSoundcloud, FaApple, FaAppleAlt, FaMusic } from 'react-icons/fa';
import TVFrame from '../components/ui/TVFrame';

export default function ListenPage() {
  return (
    <TVFrame>
      <div className="relative w-full h-full overflow-hidden rounded-3xl">
        {/* ✅ Background video outside of foreground container */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-fill z-0"
        >
          <source src="/videos/bgspace.mov" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* ✅ Foreground content centered */}
        <div className="relative z-10 flex flex-col justify-center items-center h-full text-white text-center space-y-12 px-4">
          <h1 className="text-7xl font-bold">Listen</h1>

          <div className="flex gap-16 justify-center items-center">
           <a
              href="https://open.spotify.com/album/3dQ3KA2C3L185Olu1Ls11D?si=1QDguFI9QUK9FnjUyvOr_g"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center hover:text-green-400 transition"
            >
              <FaSpotify size={100} />
              <span className="mt-2 text-lg">Spotify</span>
            </a> 
            <a
              href="https://soundcloud.com/omniradio/radio4"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center hover:text-orange-400 transition"
            >
              <FaSoundcloud size={100} />
              <span className="mt-2 text-lg">SoundCloud</span>
            </a>
            
            <a
              href="https://music.apple.com/us/artist/omni/1755264397"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center hover:text-red-400 transition"
            >
              <FaMusic size={100} />
              <span className="mt-2 text-lg">Apple Music</span>
            </a>

            
          </div>
        </div>
      </div>
    </TVFrame>
  );
}
