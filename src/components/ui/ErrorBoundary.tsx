import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
}

// Class component required — React has no hook-based error boundary API.
// Styled to match NotFoundPage's overlay so a crash still looks intentional
// rather than a blank white screen.
export default class ErrorBoundary extends React.Component<React.PropsWithChildren, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, info: React.ErrorInfo) {
    console.error('Uncaught render error:', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 2,
            background: 'rgba(0, 0, 0, 0.55)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
          }}
          className="text-white flex flex-col items-center justify-center gap-6 p-8"
        >
          <h2 className="font-custom font-bold text-2xl sm:text-3xl text-center tracking-widest">
            SOMETHING BROKE
          </h2>

          <p className="font-custom text-sm sm:text-base text-white/70 text-center max-w-sm">
            This page hit an error. Try heading back home.
          </p>

          {/* Plain anchor, not a router Link — a full reload is the safest way
             to recover from an unknown broken state. */}
          <a
            href="/home"
            className="font-custom text-xs sm:text-sm tracking-wider border border-white/30 rounded-full px-6 py-2 text-white/80 hover:text-white hover:border-white/60 transition-colors"
          >
            BACK TO HOME
          </a>
        </div>
      );
    }

    return this.props.children;
  }
}
