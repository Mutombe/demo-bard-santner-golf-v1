import React from 'react';

/**
 * HeroCarousel — infinite LEFT-drifting horizontal treadmill of photos.
 * CSS-driven (no JS animation frame) so it's buttery on low-end devices.
 * Photos are the UNWATERMARKED set — DSC press shots with clean corners.
 * Pauses on hover.
 *
 * Sits as an absolute background layer; caller overlays navy darken + content.
 */
// These images verified unwatermarked (Bard Santner mark not embedded in the frame).
const DEFAULT_IMAGES = [
  '/images/caddie-flags-fairway.jpg',
  '/images/hero-9th-fairway.jpg',
  '/images/trophy-presentation.jpg',
  '/images/wide-action.jpg',
  '/images/player-putting-green.jpg',
  '/images/slide-morning.jpg',
  '/images/clubhouse.jpg',
];

export default function HeroCarousel({ images = DEFAULT_IMAGES, speed = 36 }) {
  // Duplicate the list once — 50% translate covers the full loop seamlessly
  const seq = [...images, ...images];

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="flex h-full animate-treadmill"
        style={{
          animationDuration: `${speed}s`,
          width: 'max-content',
        }}
      >
        {seq.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className="relative h-full shrink-0"
            style={{ width: 'clamp(320px, 32vw, 560px)' }}
          >
            <img
              src={src}
              alt=""
              loading={i < 3 ? 'eager' : 'lazy'}
              fetchPriority={i === 0 ? 'high' : 'auto'}
              className="h-full w-full object-cover object-center"
              onError={(e) => (e.currentTarget.style.display = 'none')}
            />
          </div>
        ))}
      </div>

      {/* Edge fades — navy gradients L/R so headline sits on solid bg */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-navy-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-navy-950 to-transparent" />
    </div>
  );
}
