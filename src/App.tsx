import React, { useState, useTransition, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Layout from './Layout';
import { StoreProvider } from './context/StoreContext';
import TVFrame from './components/ui/TVFrame';
import VideoBackground from './components/ui/VideoBackground';
import './styles/fonts.css';

const StorePage = lazy(() => import('./pages/StorePage'));
const ProductPage = lazy(() => import('./pages/ProductPage'));
const GatePage = lazy(() => import('./pages/GatePage'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const ListenPage = lazy(() => import('./pages/ListenPage'));
const HomePage = lazy(() => import('./pages/HomePage'));

type RouteVideo = { src: string; poster: string };

const ROUTE_VIDEO: Record<string, RouteVideo | null> = {
  '/':       { src: '/videos/GATEPAGEBG.mp4',   poster: '/images/posters/GATEPAGEBG_poster.jpg' },
  '/home':   { src: '/videos/HOMEPAGEBG.mp4',   poster: '/images/posters/HOMEPAGEBG_poster.jpg' },
  '/listen': { src: '/videos/LISTENPAGEBG.mp4', poster: '/images/posters/LISTENPAGEBG_poster.jpg' },
  '/store':  null,
};
const DEFAULT_VIDEO: RouteVideo = { src: '/videos/bgspace.mp4', poster: '/images/posters/bgspace_poster.jpg' };

function getRouteVideo(pathname: string): RouteVideo | null {
  if (Object.prototype.hasOwnProperty.call(ROUTE_VIDEO, pathname)) return ROUTE_VIDEO[pathname];
  if (pathname.startsWith('/product/')) return null;
  return DEFAULT_VIDEO;
}

function AppInner() {
  const location = useLocation();
  const navigate = useNavigate();
  const [, startTransition] = useTransition();

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

  const video = getRouteVideo(displayLocation.pathname);

  return (
    <>
      {video && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100svh',
          zIndex: 0,
          overflow: 'hidden',
        }}>
          <VideoBackground src={video.src} poster={video.poster} />
        </div>
      )}

      {/* CRT screen effect — scanlines + edge vignette, sits above video below content */}
      <div className="vignette" style={{ position: 'fixed', inset: 0, zIndex: 100, pointerEvents: 'none' }} />

      <TVFrame />

      {/* Global OMNI sign — always navigates to /home (or / when already on /home) */}
      <div
        onClick={() => navigate(location.pathname === '/home' ? '/' : '/home')}
        style={{
          position: 'fixed',
          top: '4vh',
          left: '50vw',
          width: '9.5vw',
          height: '7vh',
          borderRadius: '70px',
          transform: 'translate(-50%, -50%)',
          cursor: 'pointer',
          zIndex: 10000,
        }}
      />

      <Suspense fallback={null}>
        <Routes location={displayLocation}>
          <Route path="/" element={<GatePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route element={<Layout />}>
            <Route path="/store" element={<StorePage />} />
            <Route path="/listen" element={<ListenPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
          </Route>
        </Routes>
      </Suspense>
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
