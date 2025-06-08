import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function TVFrame({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/home');
  };

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden">
      {/* TV Bezel / Frame */}
      <img
        src="/images/OMNIPCFRAME.png"
        alt="TV Frame"
        className="absolute inset-0 w-full h-full z-10 pointer-events-none"
      />

      {/* Inner screen content area */}
      <div className="absolute inset-[15%] sm:inset-[12%] md:inset-[10%] z-20 flex items-center justify-center">
        <div className="w-full h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent p-4">
          {children}
        </div>
      </div>

      {/* Invisible clickable area */}
      <div
        onClick={handleSubmit}
        className="absolute z-30"
        style={{
          top: '4%',
          left: '51.1%',
          width: '120px',
          height: '58px',
          transform: 'translate(-50%, -50%)',
          cursor: 'pointer',
        }}
      />
    </div>
  );
}
