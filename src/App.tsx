// App.tsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import StorePage from './pages/StorePage';
import ProductPage from './pages/ProductPage';
import GatePage from './pages/GatePage';
import FAQPage from './pages/FAQPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import Layout from './Layout';
import { StoreProvider } from './context/StoreContext';

function App() {
  const [unlocked, setUnlocked] = useState(true);

  return (
    <StoreProvider>
      <Router>
        <Routes>
          {/* Gate page at root */}
          <Route path="/" element={<GatePage onUnlock={() => setUnlocked(true)} />} />

          {unlocked ? (
            <>
              {/* Protected routes inside Layout */}
              <Route element={<Layout />}>
                <Route path="/store" element={<StorePage />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
              </Route>
            </>
          ) : (
            // Redirect any route to GatePage if not unlocked
            <Route path="*" element={<Navigate to="/" replace />} />
          )}
        </Routes>
      </Router>
    </StoreProvider>
  );
}

export default App;
