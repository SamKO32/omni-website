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
          <source src="/videos/GATEPAGEBG.mov" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div
            onClick={handleSubmit}
            className="absolute"
            style={{
              top: '68.5vh',
              left: '50.5vw',
              width: '12vw',
              height: '7vh',
              transform: 'translate(-50%, -50%)',
              cursor: 'pointer',
            }}
          ></div>
      </div>
       
    </div>
    
  );
}
