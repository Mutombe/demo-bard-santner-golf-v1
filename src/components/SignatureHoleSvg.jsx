import React, { useEffect, useRef, useState } from 'react';
import CountUp from './CountUp';

/**
 * SignatureHoleSvg — horizontal cross-section of the 13th hole.
 * Tee on the left, green on the right, a dashed ball-trajectory line draws
 * itself on scroll-in. Distance markers count up.
 */
export default function SignatureHoleSvg() {
  const [draw, setDraw] = useState(0);
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
          const p = Math.min((now - t0) / 2400, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setDraw(eased);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.35 });
    io.observe(node);
    return () => io.disconnect();
  }, []);

  // Path length — arc from tee (80, 170) through apex (500, 80) to green (900, 175)
  const d =
    'M 80 170 Q 300 60 500 80 T 900 175';
  // Use a big stroke-dasharray trick
  const LEN = 1100;

  return (
    <div ref={ref} className="relative bg-navy-900 border-2 border-orange-500/40 overflow-hidden">
      <svg viewBox="0 0 1000 240" className="w-full h-auto block" role="img" aria-label="Signature 13th hole cross-section">
        {/* Sky */}
        <defs>
          <linearGradient id="sky" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#1a1830" />
            <stop offset="100%" stopColor="#0B0A19" />
          </linearGradient>
          <linearGradient id="fwy" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#2d5f2d" />
            <stop offset="100%" stopColor="#194819" />
          </linearGradient>
        </defs>
        <rect width="1000" height="240" fill="url(#sky)" />

        {/* Tree silhouettes (randomish) */}
        {[80, 140, 220, 310, 380, 470, 560, 640, 730, 810, 890].map((x, i) => (
          <g key={i} opacity={0.45 + (i % 3) * 0.12}>
            <ellipse cx={x} cy={195 - (i % 3) * 8} rx={22 + (i % 4) * 3} ry={14 + (i % 3) * 2} fill="#0f2a18" />
            <rect x={x - 2} y={195} width="4" height="15" fill="#1c1935" />
          </g>
        ))}

        {/* Fairway surface */}
        <path d="M 0 200 Q 500 180 1000 200 L 1000 240 L 0 240 Z" fill="url(#fwy)" />

        {/* Water hazard along the right side */}
        <path
          d="M 540 200 Q 680 195 820 198 L 820 215 Q 680 210 540 213 Z"
          fill="#2a5478"
          opacity={0.85}
        />
        {/* Ripple */}
        <path
          d="M 580 206 Q 620 204 660 206 M 680 210 Q 720 208 760 210"
          stroke="#88c0e0"
          strokeWidth="1"
          fill="none"
          opacity="0.6"
        />

        {/* Tee box */}
        <g>
          <rect x="55" y="168" width="40" height="8" fill="var(--color-orange-500)" />
          <text x="75" y="195" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="var(--color-orange-400)" letterSpacing="2">
            TEE
          </text>
        </g>

        {/* Green */}
        <g>
          <ellipse cx="900" cy="180" rx="55" ry="12" fill="#7bc77b" />
          <ellipse cx="900" cy="180" rx="45" ry="9" fill="#5fa55f" />
          {/* Flag */}
          <line x1="900" y1="180" x2="900" y2="130" stroke="white" strokeWidth="1.8" />
          <path d="M 900 130 L 925 135 L 920 142 L 925 150 L 900 145 Z" fill="var(--color-orange-500)" />
          <text x="900" y="210" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="var(--color-orange-400)" letterSpacing="2">
            GREEN
          </text>
        </g>

        {/* Ball trajectory — dashed, drawn on scroll */}
        <path
          d={d}
          fill="none"
          stroke="var(--color-orange-400)"
          strokeWidth="2.5"
          strokeDasharray="6 6"
          strokeDashoffset={LEN * (1 - draw)}
          style={{
            strokeDasharray: `${LEN}`,
            strokeDashoffset: `${LEN * (1 - draw)}`,
            transition: 'stroke-dashoffset 0.2s linear',
          }}
        />

        {/* Ball */}
        {draw > 0.95 && (
          <circle cx="900" cy="175" r="4" fill="white" stroke="var(--color-navy-900)" strokeWidth="1" />
        )}

        {/* Distance markers */}
        <g fontFamily="var(--font-mono)" fontSize="11" fill="var(--color-orange-300)" letterSpacing="2">
          <line x1="80" y1="32" x2="900" y2="32" stroke="var(--color-orange-500)" strokeWidth="0.8" strokeDasharray="2 4" opacity="0.55" />
          <text x="75" y="25" textAnchor="start">0M</text>
          <text x="500" y="25" textAnchor="middle">~250M APEX</text>
          <text x="905" y="25" textAnchor="end">512M</text>
        </g>
      </svg>

      {/* Stats row below */}
      <div className="grid grid-cols-3 border-t-2 border-orange-500/40 divide-x-2 divide-orange-500/40 text-white">
        <div className="p-4 sm:p-5 text-center">
          <div className="scoreboard-num text-3xl sm:text-4xl text-orange-400 tabular-nums">
            <CountUp to={512} duration={1600} />
            <span className="text-sm text-steel-400 ml-1">M</span>
          </div>
          <div className="label-xs text-steel-400 mt-1">LENGTH</div>
        </div>
        <div className="p-4 sm:p-5 text-center">
          <div className="scoreboard-num text-3xl sm:text-4xl text-orange-400 tabular-nums">
            <CountUp to={5} pad={1} duration={900} />
          </div>
          <div className="label-xs text-steel-400 mt-1">PAR</div>
        </div>
        <div className="p-4 sm:p-5 text-center">
          <div className="scoreboard-num text-3xl sm:text-4xl text-orange-400 tabular-nums">
            #<CountUp to={13} pad={2} duration={900} />
          </div>
          <div className="label-xs text-steel-400 mt-1">HOLE</div>
        </div>
      </div>
    </div>
  );
}
