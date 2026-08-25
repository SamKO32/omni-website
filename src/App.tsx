import React, { useState, useTransition, useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Layout from "./Layout";
import { StoreProvider } from "./context/StoreContext";
import { useStore } from "./context/useStore";
import TVFrame from "./components/ui/TVFrame";
import VideoBackground from "./components/ui/VideoBackground";
import ErrorBoundary from "./components/ui/ErrorBoundary";
import DelayedFallback from "./components/ui/DelayedFallback";
import useIsMobile from "./hooks/useIsMobile";
import "./styles/fonts.css";

const StorePage = lazy(() => import("./pages/StorePage"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const GatePage = lazy(() => import("./pages/GatePage"));
const FAQPage = lazy(() => import("./pages/FAQPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const ListenPage = lazy(() => import("./pages/ListenPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

type RouteVideo = {
  src: string;
  poster: string;
  mobileSrc?: string;
  mobilePoster?: string;
  /** Object-fit to use for this route's video on mobile only; desktop is always 'cover'. */
  mobileObjectFit?: "cover" | "fill";
};

const ROUTE_VIDEO: Record<string, RouteVideo | null> = {
  "/": {
    src: "/videos/GATEPAGEBG.mp4",
    poster: "/images/posters/GATEPAGEBG_poster.jpg",
    // No dedicated portrait video for the gate page — stretch to fill on mobile
    // instead of cropping the (landscape) source, matching the gate hitbox's
    // percentage-of-frame calibration either way.
    mobileObjectFit: "fill",
  },
  "/home": {
    src: "/videos/HOMEPAGEBG.mp4",
    poster: "/images/posters/HOMEPAGEBG_poster.jpg",
    mobileSrc: "/videos/HOMEPAGEBG_MOBILE.mp4",
    mobilePoster: "/images/posters/HOMEPAGEBG_MOBILE_poster.jpg",
  },
  "/listen": { src: "/videos/LISTENPAGEBG.mp4", poster: "/images/posters/LISTENPAGEBG_poster.jpg" },
  "/store": null,
};
const DEFAULT_VIDEO: RouteVideo = {
  src: "/videos/bgspace.mp4",
  poster: "/images/posters/bgspace_poster.jpg",
};

function getRouteVideo(pathname: string): RouteVideo | null {
  if (Object.prototype.hasOwnProperty.call(ROUTE_VIDEO, pathname)) return ROUTE_VIDEO[pathname];
  if (pathname.startsWith("/product/")) return null;
  return DEFAULT_VIDEO;
}

function AppInner() {
  const location = useLocation();
  const navigate = useNavigate();
  const [, startTransition] = useTransition();
  const { setShowCart } = useStore();

  // showCart is shared app-wide state, not page-local — close it on every route
  // change so leaving a page (e.g. via the OMNI logo) doesn't leave the cart
  // popup marked "open" for whichever store/product page you land on next.
  useEffect(() => {
    setShowCart(false);
  }, [location.pathname, setShowCart]);

  // displayLocation lags behind location — it only updates once the new page
  // chunk has finished loading, so the old page stays visible until the new
  // one is ready. startTransition tells React to keep the current UI while
  // the deferred state update resolves (i.e. while Suspense is pending).
  const [displayLocation, setDisplayLocation] = useState(location);

  useEffect(() => {
    startTransition(() => {
      setDisplayLocation(location);
    });
  }, [location]);

  const isMobile = useIsMobile();
  const routeVideo = getRouteVideo(displayLocation.pathname);
  const video = routeVideo
    ? {
        src: isMobile && routeVideo.mobileSrc ? routeVideo.mobileSrc : routeVideo.src,
        poster:
          isMobile && routeVideo.mobileSrc
            ? (routeVideo.mobilePoster ?? routeVideo.poster)
            : routeVideo.poster,
        objectFit: (isMobile ? (routeVideo.mobileObjectFit ?? "cover") : "cover") as
          "cover" | "fill",
      }
    : null;

  return (
    <>
      {video && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100svh",
            zIndex: 0,
            overflow: "hidden",
          }}
        >
          <VideoBackground src={video.src} poster={video.poster} objectFit={video.objectFit} />
        </div>
      )}

      {/* CRT screen effect — scanlines + edge vignette, sits above video below content */}
      <div
        className="vignette"
        style={{ position: "fixed", inset: 0, zIndex: 100, pointerEvents: "none" }}
      />

      <TVFrame />

      {/* Global OMNI sign — always navigates to /home (or / when already on /home) */}
      <div
        onClick={() => navigate(location.pathname === "/home" ? "/" : "/home")}
        style={{
          position: "fixed",
          top: "4vh",
          left: "50vw",
          width: "max(9.5vw, 44px)",
          height: "max(7vh, 44px)",
          borderRadius: "70px",
          transform: "translate(-50%, -50%)",
          cursor: "pointer",
          zIndex: 10000,
        }}
      />

      <ErrorBoundary>
        <Suspense fallback={<DelayedFallback />}>
          <Routes location={displayLocation}>
            <Route path="/" element={<GatePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route element={<Layout />}>
              <Route path="/store" element={<StorePage />} />
              <Route path="/listen" element={<ListenPage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

function App() {
  return (
    <StoreProvider>
      <Router>
        <AppInner />
      </Router>
    </StoreProvider>
  );
}

export default App;
