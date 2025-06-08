import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function GatePage({ onUnlock }: { onUnlock: () => void }) {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/home');
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      <div className="relative min-h-screen text-white flex items-center justify-center">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full z-10 pointer-events-none"
          style={{ objectFit: 'fill' }}
        >
          <source src="/videos/OMNIGATEPAGE.mov" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Invisible clickable area */}
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
        />
      </div>
    </div>
  );
}
