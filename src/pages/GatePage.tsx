import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';

export default function GatePage({ onUnlock }: { onUnlock: () => void }) {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // ✅ hook to navigate programmatically

  const handleSubmit = () => {
    if (input === 'OMNIADMIN') {
      setError('');
      onUnlock();
      navigate('/store'); // ✅ navigate to /store
    } else {
      setError('Incorrect passcode. Try again.');
    }
  };

  return (
    <div className="relative min-h-screen text-white flex items-center justify-center">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/gatevid.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="relative z-10 bg-black bg-opacity-60 p-8 rounded shadow-lg text-center max-w-sm w-full">
        <p className="mb-6">Under construction. Enter passcode for access.</p>
        <input
          type="password"
          placeholder="Enter passcode"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border p-2 mb-2 w-full text-black"
        />
        <Button onClick={handleSubmit} className="bg-white text-black w-full">Enter</Button>
        {error && <p className="mt-2 text-red-500">{error}</p>}
      </div>
    </div>
  );
}
