import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';

export default function GatePage({ onUnlock }: { onUnlock: () => void }) {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {

    navigate('/home');
    // if ((input === 'OMNIADMIN') || (input === 'omniadmin')) {
    //   setError('');
    //   onUnlock();
    //   navigate('/store');
    // } else {
    //   setError('Incorrect passcode. Try again.');
    // }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <div className="w-full h-full sm:aspect-[9/16] flex items-center justify-center">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-contain max-w-none max-h-none"
        >
          <source src="/videos/newgate2.mov" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Invisible clickable area */}
        <div
          onClick={handleSubmit}
          className="absolute"
          style={{
            top: '70%',
            left: '50.3%',
            width: '228px',
            height: '58px',
            transform: 'translate(-50%, -50%)',
            cursor: 'pointer',
          }}
        >
        </div>
      </div>
    </div>
  );
}
