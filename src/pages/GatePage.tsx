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
    <div className="relative min-h-screen text-white flex items-center justify-center">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
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
    {/* Optional: add a transparent background to debug click zone */}
    {/* <div className="w-full h-full bg-red-500 bg-opacity-30" /> */}
  </div>

      {/* <div className="relative top-40 z-10 bg-transparent bg-opacity-100 p-8 rounded text-center text-xl font-bold max-w-sm w-full">
        <Button onClick={handleSubmit} className="bg-transparent font-custom text-white w-full animate-blink"> Enter</Button>
        {error && <p className="mt-2 text-red-500">{error}</p>}
      </div> */}
      {/* <div className="relative top-40 right-5 z-10 bg-transparent bg-opacity-100 p-8 rounded text-center max-w-sm w-full" 
      style={{ filter: 'drop-shadow(0 0 8px #ff00ff)' }}>
        <Button
          onClick={handleSubmit}
          className="bg-transparent font-custom text-white w-full text-5xl font-bold animate-blink"
        >
          &gt; ENTER
        </Button>
        {error && <p className="mt-2 text-red-500">{error}</p>}
      </div> */}

    </div>
  );
}
