import React from 'react';

export default function TVFrame({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      pointerEvents: 'none',
      zIndex: 10,
      backgroundImage: 'url("/images/tvframenew.png")',
      backgroundSize: '100% 100%',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}>
      {children}
    </div>
  );
}
