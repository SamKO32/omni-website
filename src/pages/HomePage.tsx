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
    <div className="relative min-h-screen text-white flex items-center justify-center">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/videos/omni home page.mov" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Back to start */}
    <div
    onClick={() => handleSubmit('/')}
    className="absolute"
    style={{
      top: '26.7%',
      left: '29.2%',
      width: '130px',
      height: '67px',
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
      top: '68.5%',
      left: '31.75%',
      width: '103px',
      height: '44px',
      transform: 'translate(-50%, -50%)',
      cursor: 'pointer',
    }}
  ></div>
    <div
    onClick={() => handleSubmit('/store')}
    className="absolute"
    style={{
      top: '50%',
      left: '31.25%',
      width: '155px',
      height: '150px',
      transform: 'translate(-50%, -50%)',
      cursor: 'pointer',
    }}
  ></div>
   {/* Listen clickable area */}
  <div
    onClick={() => handleSubmit('/listen')}
    className="absolute"
    style={{
      top: '68.5%',
      left: '43.5%',
      width: '140px',
      height: '44px',
      transform: 'translate(-50%, -50%)',
      cursor: 'pointer',
    }}
  ></div>
    <div
    onClick={() => handleSubmit('/listen')}
    className="absolute"
    style={{
      top: '50%',
      left: '43.25%',
      width: '130px',
      height: '150px',
      transform: 'translate(-50%, -50%)',
      cursor: 'pointer',
    }}
  ></div>
        {/* About clickable area */}
  <div
    onClick={() => handleSubmit('/faq')}
    className="absolute"
    style={{
      top: '68.5%',
      left: '55.25%',
      width: '132px',
      height: '44px',
      transform: 'translate(-50%, -50%)',
      cursor: 'pointer',
    }}
  ></div>
    <div
    onClick={() => handleSubmit('/faq')}
    className="absolute"
    style={{
      top: '50%',
      left: '55.55%',
      width: '105px',
      height: '145px',
      transform: 'translate(-50%, -50%)',
      cursor: 'pointer',
    }}
  ></div>
   {/* Contact clickable area */}
  <div
    onClick={() => handleSubmit('/contact')}
    className="absolute"
    style={{
      top: '68.5%',
      left: '67.25%',
      width: '177px',
      height: '44px',
      transform: 'translate(-50%, -50%)',
      cursor: 'pointer',
    }}
  ></div>
    <div
    onClick={() => handleSubmit('/contact')}
    className="absolute"
    style={{
      top: '50.5%',
      left: '67.25%',
      width: '100px',
      height: '150px',
      transform: 'translate(-50%, -50%)',
      cursor: 'pointer',
    }}
  ></div>
  
    </div>
  );
}
