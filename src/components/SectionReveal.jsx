import React, { useEffect, useRef, useState } from 'react';

/**
 * SectionReveal — safe opacity + subtle translate reveal.
 * Fails visible (if observer never fires, content still renders).
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
      { threshold: 0.05, rootMargin: '0px 0px -10px 0px' }
    );
    io.observe(node);
    // Safety net: if observer doesn't fire within 2s, reveal anyway
    const fallback = setTimeout(() => setVisible(true), 2000);
    return () => { io.disconnect(); clearTimeout(fallback); };
  }, []);

  const hiddenTransform =
    from === 'left'
      ? 'translateX(-16px)'
      : from === 'right'
      ? 'translateX(16px)'
      : 'translateY(12px)';

  const duration = reducedMotion ? 0 : 700;

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : hiddenTransform,
        transition: reducedMotion
          ? 'none'
          : `opacity ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
        willChange: visible ? 'auto' : 'transform, opacity',
      }}
    >
      {children}
    </Tag>
  );
}
