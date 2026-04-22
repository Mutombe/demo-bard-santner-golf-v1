import React, { useEffect, useRef, useState } from 'react';

/**
 * CountUp — lightweight inline number animation.
 * Fires once when scrolled into view (IntersectionObserver).
 * - to: target number (required)
 * - from: starting number (default 0)
 * - duration: ms (default 1500)
 * - pad: zero-pad to this many digits (default: digits of `to`)
 * - prefix / suffix: e.g. "$", "PM"
 * - easing: cubic ease-out only; pass `linear` to disable
 */
export default function CountUp({
  to,
  from = 0,
  duration = 1500,
  pad = null,
  prefix = '',
  suffix = '',
  className = '',
  easing = 'easeOut',
  threshold = 0.4,
}) {
  const [n, setN] = useState(from);
  const ref = useRef(null);
  const started = useRef(false);
  const target = Number(to) || 0;
  const digits = pad ?? String(Math.max(Math.abs(target), Math.abs(from))).length;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const t0 = performance.now();
        const animate = (now) => {
          const elapsed = now - t0;
          const progress = Math.min(elapsed / duration, 1);
          const eased =
            easing === 'linear' ? progress : 1 - Math.pow(1 - progress, 3);
          const v = Math.floor(from + eased * (target - from));
          setN(v);
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }
    }, { threshold });
    io.observe(node);
    return () => io.disconnect();
  }, [target, from, duration, easing, threshold]);

  const display = String(n).padStart(digits, '0');

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {prefix}{display}{suffix}
    </span>
  );
}
