import React, { useState, useRef, useEffect } from 'react';

interface VideoBackgroundProps {
  src: string;
  poster?: string;
  objectFit?: 'cover' | 'fill';
}

export default function VideoBackground({ src, poster, objectFit = 'cover' }: VideoBackgroundProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setIsLoaded(false);
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => setIsLoaded(true);
    video.addEventListener('canplay', handleCanPlay);
    video.load();

    return () => video.removeEventListener('canplay', handleCanPlay);
  }, [src]);

  return (
    <div className="relative w-full h-full">
      {/* Poster overlay — fades out once video is ready, never unmounts to avoid flash */}
      <div
        className={`absolute inset-0 z-10 bg-center ${objectFit === 'fill' ? 'bg-[length:100%_100%]' : 'bg-cover'}`}
        style={{
          backgroundImage: poster ? `url(${poster})` : undefined,
          backgroundColor: !poster ? 'black' : undefined,
          opacity: isLoaded ? 0 : 1,
          transition: 'opacity 0.5s ease',
          pointerEvents: 'none',
        }}
      />
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        src={src}
        className={`absolute inset-0 h-full w-full ${objectFit === 'fill' ? 'object-fill' : 'object-cover'}`}
      />
    </div>
  );
}
