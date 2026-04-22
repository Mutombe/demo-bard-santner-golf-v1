import React, { useEffect, useRef, useState } from 'react';

/**
 * SectionReveal — cinematic "unveil" rather than a fade.
 * - Shorter translate (12px) → arrives, not animates.
 * - Top-down clip-path sweep (sub-5% tint overlay) → section appears to be curtained in.
 * - Stagger-friendly via `delay` prop.
 *
 * Respects prefers-reduced-motion (instant reveal).
 */
export default function SectionReveal({
  children,
  className = '',
  delay = 0,
  as: Tag = 'div',
  from = 'up',
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    }
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  const hiddenTransform =
    from === 'left'
      ? 'translateX(-20px)'
      : from === 'right'
      ? 'translateX(20px)'
      : 'translateY(12px)';

  const duration = reducedMotion ? 0 : 700;
  const clipHidden = 'inset(0 0 100% 0)';
  const clipVisible = 'inset(0 0 0 0)';

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : hiddenTransform,
        clipPath: visible ? clipVisible : clipHidden,
        WebkitClipPath: visible ? clipVisible : clipHidden,
        transition: reducedMotion
          ? 'none'
          : `opacity ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, clip-path 400ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, -webkit-clip-path 400ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
        willChange: visible ? 'auto' : 'transform, opacity, clip-path',
      }}
    >
      {children}
    </Tag>
  );
}
