import React, { useEffect, useRef, useState } from 'react';

export default function StatCounter({ value, label, sub, duration = 1400, prefix = '', suffix = '' }) {
  const [n, setN] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  const numericValue = parseInt(String(value).replace(/\D/g, ''), 10) || 0;
  const isNumeric = !isNaN(numericValue) && /\d/.test(String(value));

  useEffect(() => {
    if (!isNumeric) return;
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const animate = (now) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setN(Math.floor(eased * numericValue));
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }
    }, { threshold: 0.4 });
    io.observe(node);
    return () => io.disconnect();
  }, [numericValue, duration, isNumeric]);

  const displayValue = isNumeric ? `${prefix}${String(n).padStart(String(numericValue).length, '0')}${suffix}` : value;

  return (
    <div ref={ref} className="border-l-4 border-orange-500 pl-5 sm:pl-6">
      <div className="scoreboard-num text-[clamp(3rem,8vw,5.5rem)] text-navy-900 tabular-nums">
        {displayValue}
      </div>
      <div className="scoreboard-label text-navy-900 mt-2">{label}</div>
      {sub && <div className="text-xs text-steel-500 mt-1">{sub}</div>}
    </div>
  );
}
