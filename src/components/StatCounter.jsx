import React, { useEffect, useRef, useState } from 'react';

export default function StatCounter({
  value,
  label,
  sub,
  duration = 1500,
  prefix = '',
  suffix = '',
  from = null, // optional custom start (e.g. year: 1800 → 1898)
  className = '',
  numClassName = '',
}) {
  const [n, setN] = useState(from ?? 0);
  const ref = useRef(null);
  const started = useRef(false);
  const numericValue = parseInt(String(value).replace(/\D/g, ''), 10) || 0;
  const isNumeric = !isNaN(numericValue) && /\d/.test(String(value));
  const start = from ?? 0;

  useEffect(() => {
    if (!isNumeric) return;
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const t0 = performance.now();
        const animate = (now) => {
          const elapsed = now - t0;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const v = Math.floor(start + eased * (numericValue - start));
          setN(v);
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }
    }, { threshold: 0.4 });
    io.observe(node);
    return () => io.disconnect();
  }, [numericValue, duration, isNumeric, start]);

  const displayValue = isNumeric
    ? `${prefix}${String(n).padStart(String(numericValue).length, '0')}${suffix}`
    : value;

  return (
    <div ref={ref} className={`border-l-4 border-orange-500 pl-5 sm:pl-6 ${className}`}>
      <div className={`scoreboard-num text-[clamp(2.75rem,8vw,5.5rem)] text-navy-900 tabular-nums leading-none ${numClassName}`}>
        {displayValue}
      </div>
      <div className="scoreboard-label text-navy-900 mt-3 sm:mt-2.5">{label}</div>
      {sub && <div className="text-xs text-steel-500 mt-1.5 leading-[1.5]">{sub}</div>}
    </div>
  );
}
