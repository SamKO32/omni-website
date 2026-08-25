import React from "react";

interface ErrorBoundaryState {
  hasError: boolean;
}

// Class component required — React has no hook-based error boundary API.
// Styled to match NotFoundPage's overlay so a crash still looks intentional
// rather than a blank white screen.
export default class ErrorBoundary extends React.Component<
  React.PropsWithChildren,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, info: React.ErrorInfo) {
    console.error("Uncaught render error:", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 2,
            background: "rgba(0, 0, 0, 0.55)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
          }}
          className="flex flex-col items-center justify-center gap-6 p-8 text-white"
        >
          <h2 className="text-center font-custom text-2xl font-bold tracking-widest sm:text-3xl">
            SOMETHING BROKE
          </h2>

          <p className="max-w-sm text-center font-custom text-sm text-white/70 sm:text-base">
            This page hit an error. Try heading back home.
          </p>

          {/* Plain anchor, not a router Link — a full reload is the safest way
             to recover from an unknown broken state. */}
          <a
            href="/home"
            className="rounded-full border border-white/30 px-6 py-2 font-custom text-xs tracking-wider text-white/80 transition-colors hover:border-white/60 hover:text-white sm:text-sm"
          >
            BACK TO HOME
          </a>
        </div>
      );
    }

    return this.props.children;
  }
}
