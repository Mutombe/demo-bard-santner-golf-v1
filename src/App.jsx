import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'sonner';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import SearchModal from './components/SearchModal';
import ErrorBoundary from './components/ErrorBoundary';

import Home from './pages/Home';
import TheEvent from './pages/TheEvent';
import TheCourse from './pages/TheCourse';
import Calendar from './pages/Calendar';
import Register from './pages/Register';
import Conditions from './pages/Conditions';
import Media from './pages/Media';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

function ScrollReset() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

export default function App() {
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <ScrollReset />
      <Navbar onOpenSearch={() => setSearchOpen(true)} />

      <main className="min-h-screen">
        <ErrorBoundary>
          <AnimatePresence mode="popLayout" initial={false}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/event" element={<TheEvent />} />
              <Route path="/course" element={<TheCourse />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/register" element={<Register />} />
              <Route path="/conditions" element={<Conditions />} />
              <Route path="/media" element={<Media />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </ErrorBoundary>
      </main>

      <Footer />
      <ScrollToTop />
      <FloatingWhatsApp />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
      <Toaster
        position="top-center"
        theme="dark"
        closeButton
        toastOptions={{
          style: {
            fontFamily: 'Inter, system-ui, sans-serif',
            borderRadius: 0,
            background: '#0B0A19',
            color: '#fff',
            border: '1px solid #E87722',
          },
        }}
      />
    </>
  );
}
