// App.tsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import StorePage from './pages/StorePage';
import GatePage from './pages/GatePage';
import FAQPage from './pages/FAQPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import Layout from './Layout';
import { StoreProvider } from './context/StoreContext';

function App() {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <StoreProvider>
        <Router>
            <Routes>
                <Route path="/" element={<GatePage onUnlock={() => setUnlocked(true)} />} />

                {/* Protected routes under layout */}
                {unlocked ? (
                <Route element={<Layout />}>
                    <Route path="/store" element={<StorePage />} />
                    <Route path="/faq" element={<FAQPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/privacy" element={<PrivacyPage />} />
                </Route>
                ) : (
                // Redirect to home if not unlocked
                <Route path="*" element={<Navigate to="/" replace />} />
                )}
            </Routes>
        </Router>
    </StoreProvider>
  );
}

export default App;
