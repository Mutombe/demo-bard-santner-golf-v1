import React, { useEffect, useState } from 'react';
import { ArrowUp } from '@phosphor-icons/react';
import { haptic } from '../lib/haptics';

/**
 * ScrollToTop — perfect circle, brand orange, sits to the LEFT of the FloatingWhatsApp.
 * Visible after 400px of scroll. 48px on mobile, 52px on md+.
 */
export default function ScrollToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      onClick={() => {
        haptic();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      aria-label="Scroll to top"
      className="press-physics fixed bottom-6 right-24 z-40 h-12 w-12 md:h-[52px] md:w-[52px] rounded-full bg-orange-500 text-white flex items-center justify-center shadow-lg hover:bg-orange-400 transition-colors duration-300"
    >
      <ArrowUp size={20} weight="bold" />
    </button>
  );
}
