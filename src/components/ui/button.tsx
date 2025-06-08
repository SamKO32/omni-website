import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, ...props }: ButtonProps) {
  return (
    <button {...props} className={`px-4 py-2 rounded ${props.className}`}>
      {children}
    </button>
  );
}