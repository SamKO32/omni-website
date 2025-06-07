import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function GatePage({ onUnlock }: { onUnlock: () => void }) {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/home');
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="relative w-full h-full sm:aspect-[9/16]">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-contain"
          >
            <source src="/videos/newgate2.mov" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Clickable area */}
        <div
          onClick={handleSubmit}
          className="absolute z-10"
          style={{
            top: '70%',
            left: '50.3%',
            width: '228px',
            height: '58px',
            transform: 'translate(-50%, -50%)',
            cursor: 'pointer',
          }}
        ></div>
      </div>
    </div>
  );
}

