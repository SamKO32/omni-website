import React, { useState, useRef, useEffect } from 'react';

interface VideoBackgroundProps {
  src: string;
  poster?: string;
}

export default function VideoBackground({ src, poster }: VideoBackgroundProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => setIsLoaded(true);
    video.addEventListener('canplay', handleCanPlay);

    // Already ready from cache — won't fire canplay again
    if (video.readyState >= 3) setIsLoaded(true);

    return () => video.removeEventListener('canplay', handleCanPlay);
  }, []);

  return (
    <div className="relative w-full h-full">
      {!isLoaded && (
        <div
          className="absolute inset-0 bg-black z-10"
          style={
            poster
              ? { backgroundImage: `url(${poster})`, backgroundSize: 'cover', backgroundPosition: 'center' }
              : undefined
          }
        />
      )}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster={poster}
        className="absolute inset-0 h-full w-full"
        style={{ objectFit: 'fill' }}
      >
        {/* No type= attribute — let the browser detect format from Content-Type */}
        <source src={src} />
      </video>
    </div>
  );
}