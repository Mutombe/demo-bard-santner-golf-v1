import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import { haptic } from '../lib/haptics';

/**
 * HeroCarousel — proper single-photo-at-a-time hero.
 * One photo fills the hero background; on tick the current slides OUT to the LEFT
 * while the next slides IN from the RIGHT. Dwell between slides = 6s.
 * Pagination dots at bottom-center, arrow controls on desktop, pause-on-hover.
 *
 * Verified clean images only (no embedded photo watermark).
 */
const DEFAULT_IMAGES = [
  '/images/caddie-flags-fairway.jpg',
  '/images/hero-9th-fairway.jpg',
  '/images/trophy-presentation.jpg',
  '/images/wide-action.jpg',
  '/images/player-putting-green.jpg',
  '/images/slide-morning.jpg',
  '/images/clubhouse.jpg',
];

const DWELL_MS = 6000;
const MANUAL_PAUSE_MS = 10000;

export default function HeroCarousel({ images = DEFAULT_IMAGES }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1); // +1 = forward, -1 = back
  const [hovered, setHovered] = useState(false);
  const [manualPause, setManualPause] = useState(false);
  const manualTimerRef = useRef(null);

  const advance = useCallback((dir = 1) => {
    setDirection(dir);
    setIndex((i) => (i + dir + images.length) % images.length);
  }, [images.length]);

  const goTo = useCallback((target) => {
    setDirection(target > index ? 1 : -1);
    setIndex(target);
  }, [index]);

  // Auto-play cycle
  useEffect(() => {
    if (hovered || manualPause) return;
    const id = setTimeout(() => advance(1), DWELL_MS);
    return () => clearTimeout(id);
  }, [index, hovered, manualPause, advance]);

  // Manual interaction pauses the carousel briefly
  const handleManual = useCallback((fn) => {
    fn();
    setManualPause(true);
    if (manualTimerRef.current) clearTimeout(manualTimerRef.current);
    manualTimerRef.current = setTimeout(() => setManualPause(false), MANUAL_PAUSE_MS);
  }, []);

  useEffect(() => () => {
    if (manualTimerRef.current) clearTimeout(manualTimerRef.current);
  }, []);

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 1 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 1 }),
  };

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      aria-roledescription="carousel"
      aria-label="Bard Santner tournament gallery"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={index}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 1.25, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
          aria-hidden={false}
        >
          <img
            src={images[index]}
            alt=""
            loading={index === 0 ? 'eager' : 'lazy'}
            fetchPriority={index === 0 ? 'high' : 'auto'}
            className="w-full h-full object-cover object-center"
            onError={(e) => (e.currentTarget.style.display = 'none')}
          />
        </motion.div>
      </AnimatePresence>

      {/* Legibility gradient: heavier bottom so headline reads */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/50 to-navy-950/30" />

      {/* Arrow controls — desktop only */}
      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => { haptic(); handleManual(() => advance(-1)); }}
        className="press-physics hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 h-12 w-12 items-center justify-center border-2 border-orange-500/70 text-orange-500 hover:bg-orange-500 hover:text-white transition backdrop-blur-sm bg-navy-950/30"
      >
        <CaretLeft size={22} weight="bold" />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={() => { haptic(); handleManual(() => advance(1)); }}
        className="press-physics hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 h-12 w-12 items-center justify-center border-2 border-orange-500/70 text-orange-500 hover:bg-orange-500 hover:text-white transition backdrop-blur-sm bg-navy-950/30"
      >
        <CaretRight size={22} weight="bold" />
      </button>

      {/* Pagination dots — bottom-center */}
      <div className="absolute bottom-20 sm:bottom-24 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
        {images.map((_, i) => {
          const active = i === index;
          return (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={active ? 'true' : undefined}
              onClick={() => handleManual(() => goTo(i))}
              className={`transition-all duration-300 h-2 ${
                active ? 'w-10 bg-orange-500' : 'w-2 bg-navy-800/80 hover:bg-orange-400/80'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
