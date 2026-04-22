import React, { useEffect, useRef, useState } from 'react';

/**
 * RadialDial — SVG gauge that animates needle from 0 to `value` on scroll-in.
 * Used for qualifying-rules visualisation:
 *   e.g. value=3, max=9 → "Play 3 of 9 rounds to qualify for SA Open"
 *
 * Orange arc on filled portion, navy dormant, needle in brass.
 */
export default function RadialDial({
  value = 3,
  max = 9,
  label = 'ROUNDS',
  caption = 'TO QUALIFY',
  title = 'SA OPEN',
  duration = 1600,
  size = 200,
}) {
  const [progress, setProgress] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const t0 = performance.now();
        const tick = (now) => {
          const elapsed = now - t0;
          const p = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setProgress(eased);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.4 });
    io.observe(node);
    return () => io.disconnect();
  }, [duration]);

  const cx = size / 2;
  const cy = size / 2;
  const radius = size * 0.4;
  const stroke = 14;
  // Use a 270deg arc (-135° to +135°) for the gauge
  const startAngle = -225; // degrees (from +X axis, counter-clockwise)
  const endAngle = 45;
  const sweep = endAngle - startAngle; // 270°
  const pct = Math.min(value / max, 1);

  const toXY = (deg) => {
    const rad = (deg * Math.PI) / 180;
    return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
  };

  // Background arc (full 270°)
  const bgStart = toXY(startAngle);
  const bgEnd = toXY(endAngle);
  const bgLargeArc = sweep > 180 ? 1 : 0;
  const bgPath = `M ${bgStart.x} ${bgStart.y} A ${radius} ${radius} 0 ${bgLargeArc} 1 ${bgEnd.x} ${bgEnd.y}`;

  // Filled arc — animated
  const filledEndDeg = startAngle + sweep * pct * progress;
  const filledEnd = toXY(filledEndDeg);
  const filledSweep = (filledEndDeg - startAngle);
  const filledLargeArc = filledSweep > 180 ? 1 : 0;
  const filledPath =
    progress > 0.01
      ? `M ${bgStart.x} ${bgStart.y} A ${radius} ${radius} 0 ${filledLargeArc} 1 ${filledEnd.x} ${filledEnd.y}`
      : '';

  // Needle
  const needleDeg = startAngle + sweep * pct * progress;
  const needleTip = toXY(needleDeg);
  const displayValue = Math.floor(value * progress);

  // Tick marks
  const ticks = [];
  for (let t = 0; t <= max; t++) {
    const tDeg = startAngle + (sweep * t) / max;
    const r1 = radius + stroke / 2 + 3;
    const r2 = radius + stroke / 2 + (t % (max > 9 ? 3 : 1) === 0 ? 10 : 6);
    const rad = (tDeg * Math.PI) / 180;
    ticks.push({
      x1: cx + r1 * Math.cos(rad),
      y1: cy + r1 * Math.sin(rad),
      x2: cx + r2 * Math.cos(rad),
      y2: cy + r2 * Math.sin(rad),
      major: t === 0 || t === max || t === value,
    });
  }

  return (
    <div ref={ref} className="flex flex-col items-center">
      <svg width={size} height={size * 0.85} viewBox={`0 0 ${size} ${size * 0.85}`} className="overflow-visible">
        {/* Background arc */}
        <path
          d={bgPath}
          fill="none"
          stroke="var(--color-navy-200)"
          strokeWidth={stroke}
          strokeLinecap="round"
          opacity={0.35}
        />
        {/* Filled arc */}
        {filledPath && (
          <path
            d={filledPath}
            fill="none"
            stroke="var(--color-orange-500)"
            strokeWidth={stroke}
            strokeLinecap="round"
          />
        )}
        {/* Tick marks */}
        {ticks.map((t, i) => (
          <line
            key={i}
            x1={t.x1}
            y1={t.y1}
            x2={t.x2}
            y2={t.y2}
            stroke={t.major ? 'var(--color-navy-900)' : 'var(--color-steel-300)'}
            strokeWidth={t.major ? 2 : 1}
          />
        ))}
        {/* Needle */}
        <line
          x1={cx}
          y1={cy}
          x2={needleTip.x}
          y2={needleTip.y}
          stroke="var(--color-navy-900)"
          strokeWidth={3}
          strokeLinecap="round"
          style={{ filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.25))' }}
        />
        {/* Hub */}
        <circle cx={cx} cy={cy} r={8} fill="var(--color-orange-500)" stroke="var(--color-navy-900)" strokeWidth={2} />

        {/* Centre readout */}
        <text
          x={cx}
          y={cy + 36}
          textAnchor="middle"
          fontFamily="var(--font-display)"
          fontSize={42}
          fill="var(--color-navy-900)"
          style={{ letterSpacing: '-0.02em' }}
        >
          {displayValue}
          <tspan fontSize={18} fill="var(--color-steel-500)">/{max}</tspan>
        </text>
      </svg>

      <div className="mt-5 text-center">
        <p className="label-xs text-orange-500">{title}</p>
        <p className="font-display text-lg uppercase text-navy-900 mt-2 leading-tight">
          {value} {label}
        </p>
        <p className="label-xs text-steel-500 mt-1.5">{caption}</p>
      </div>
    </div>
  );
}
