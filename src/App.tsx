import React, { useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout';
import { StoreProvider } from './context/StoreContext';
import TVFrame from './components/ui/TVFrame';
import './styles/fonts.css';

const StorePage = lazy(() => import('./pages/StorePage'));
const ProductPage = lazy(() => import('./pages/ProductPage'));
const GatePage = lazy(() => import('./pages/GatePage'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const ListenPage = lazy(() => import('./pages/ListenPage'));
const HomePage = lazy(() => import('./pages/HomePage'));

function App() {
  const [unlocked] = useState(true);

  return (
    <StoreProvider>
      <Router>
        <TVFrame />
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<GatePage />} />
            <Route path="/home" element={<HomePage />} />
            {unlocked ? (
              <>
                <Route element={<Layout />}>
                  <Route path="/store" element={<StorePage />} />
                  <Route path="/listen" element={<ListenPage />} />
                  <Route path="/product/:id" element={<ProductPage />} />
                  <Route path="/faq" element={<FAQPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/privacy" element={<PrivacyPage />} />
                </Route>
              </>
            ) : (
              <Route path="*" element={<Navigate to="/" replace />} />
            )}
          </Routes>
        </Suspense>
      </Router>
    </StoreProvider>
  );
}

export default App;