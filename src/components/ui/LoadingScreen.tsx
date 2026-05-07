import React from 'react';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[5] overflow-hidden">
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          background: '#1a1a1a',
        }}
      >
        <div className="tv-static" />
        <div className="scanlines" />
        <div className="vignette" />
      </div>
      
      <div className="relative z-10 flex flex-col items-center justify-center h-full gap-8">
        <h1 
          className="text-4xl sm:text-6xl md:text-8xl tracking-widest text-white animate-flicker"
          style={{ fontFamily: 'MyFont' }}
        >
          OMNI
        </h1>
        <div className="flex gap-2">
          <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
          <div className="w-3 h-3 bg-white rounded-full animate-pulse delay-75" />
          <div className="w-3 h-3 bg-white rounded-full animate-pulse delay-150" />
        </div>
      </div>
    </div>
  );
}