import React, { useEffect, useRef, useState } from 'react';

/**
 * FrameRule — a single-pixel orange horizontal rule that draws itself
 * left → right (scaleX(0) → scaleX(1)) as it enters the viewport.
 * Feels like a film-frame advance between scenes. Subtle, almost undetectable.
 *
 * Place between major sections:
 *   <FrameRule />
 */
export default function FrameRule({ className = '' }) {
  const ref = useRef(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true);
          io.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 ${className}`}
    >
      <div
        style={{
          height: '1px',
          background: 'var(--color-orange-500)',
          transform: drawn ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left center',
          transition: 'transform 800ms cubic-bezier(0.22, 1, 0.36, 1)',
          opacity: 0.55,
        }}
      />
    </div>
  );
}
