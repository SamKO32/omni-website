import React from 'react';

export default function TVFrame() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100svh',
      pointerEvents: 'none',
      zIndex: 9999,
      backgroundImage: 'url("/images/tvframenew.png")',
      backgroundSize: '100% 100%',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }} />
  );
}
