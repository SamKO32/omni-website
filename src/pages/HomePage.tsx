import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';

export default function HomePage() {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (path: string) => {
    navigate(path);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
    <div className="relative min-h-screen text-white flex items-center justify-center">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full max-w-none max-h-none"
        style={{ objectFit: 'fill' }}
      >
        <source src="/videos/HOMEPAGEBG.mov" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

  {/* Back to start */}
    <div
    onClick={() => handleSubmit('/')}
    className="absolute"
    style={{
      top: '4vh',
      left: '50vw',
      width: '9.5vw',
      height: '7vh',
      borderRadius: '70px',
      transform: 'translate(-50%, -50%)',
      cursor: 'pointer',
    }}
  ></div>
      {/* Store clickable area */}
  <div
    onClick={() => handleSubmit('/store')}
    className="absolute"
    style={{
      top: '68.5vh',
      left: '31.5vw',
      width: '8vw',
      height: '7vh',
      transform: 'translate(-50%, -50%)',
      cursor: 'pointer',
    }}
  ></div>
    <div
    onClick={() => handleSubmit('/store')}
    className="absolute"
    style={{
      top: '50vh',
      left: '31.5vw',
      width: '11vw',
      height: '18vh',
      transform: 'translate(-50%, -50%)',
      cursor: 'pointer',
    }}
  ></div>
   {/* Listen clickable area */}
  <div
    onClick={() => handleSubmit('/listen')}
    className="absolute"
    style={{
      top: '68.5vh',
      left: '43vw',
      width: '10vw',
      height: '7vh',
      transform: 'translate(-50%, -50%)',
      cursor: 'pointer',
    }}
  ></div>
    <div
    onClick={() => handleSubmit('/listen')}
    className="absolute"
    style={{
      top: '50vh',
      left: '43.5vw',
      width: '9vw',
      height: '18vh',
      transform: 'translate(-50%, -50%)',
      cursor: 'pointer',
    }}
  ></div>
        {/* About clickable area */}
  <div
    onClick={() => handleSubmit('/faq')}
    className="absolute"
    style={{
      top: '68.5vh',
      left: '55vw',
      width: '10vw',
      height: '7vh',
      transform: 'translate(-50%, -50%)',
      cursor: 'pointer',
    }}
  ></div>
    <div
    onClick={() => handleSubmit('/faq')}
    className="absolute"
    style={{
      top: '50vh',
      left: '55.5vw',
      width: '7.5vw',
      height: '18vh',
      transform: 'translate(-50%, -50%)',
      cursor: 'pointer',
    }}
  ></div>
   {/* Contact clickable area */}
  <div
    onClick={() => handleSubmit('/contact')}
    className="absolute"
    style={{
      top: '68.5vh',
      left: '67.5vw',
      width: '13vw',
      height: '7vh',
      transform: 'translate(-50%, -50%)',
      cursor: 'pointer',
    }}
  ></div>
    <div
    onClick={() => handleSubmit('/contact')}
    className="absolute"
    style={{
      top: '51vh',
      left: '67.25vw',
      width: '6.5vw',
      height: '18vh',
      transform: 'translate(-50%, -50%)',
      cursor: 'pointer',
    }}
  ></div>
  
    </div>
    </div>
  );
}
