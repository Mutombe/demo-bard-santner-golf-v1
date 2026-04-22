import React from 'react';

/**
 * FairwayProgress — 5-step progress bar styled as a golf hole.
 * Tee (step 0) → Fairway → Approach → Green → Hole (step 4).
 * A small white golf-ball icon slides along the bar as the user advances.
 */
const STEPS = ['TEE', 'FAIRWAY', 'APPROACH', 'GREEN', 'HOLE'];

export default function FairwayProgress({ step = 0 }) {
  const pct = STEPS.length > 1 ? (step / (STEPS.length - 1)) * 100 : 0;

  return (
    <div className="w-full py-6 px-2 sm:px-4" aria-label={`Registration progress: ${STEPS[step]}`}>
      <div className="relative h-3 bg-gradient-to-r from-green-200 via-green-300 to-green-400 rounded-full overflow-visible">
        {/* Fairway texture */}
        <div
          className="absolute inset-0 rounded-full opacity-30"
          style={{
            backgroundImage:
              'repeating-linear-gradient(90deg, rgba(255,255,255,0.15) 0 6px, transparent 6px 12px)',
          }}
        />
        {/* Progress fill */}
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-orange-500 to-orange-400 transition-all duration-700"
          style={{ width: `${pct}%`, transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
        />
        {/* Hole marker at far right */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 h-5 w-5 bg-navy-950 rounded-full border-2 border-orange-500" />
        {/* Flag at hole */}
        <svg
          className="absolute -right-1 -top-8"
          width="28"
          height="32"
          viewBox="0 0 32 32"
          aria-hidden="true"
        >
          <line x1="8" y1="30" x2="8" y2="4" stroke="var(--color-navy-900)" strokeWidth="1.5" />
          <path d="M 8 4 L 26 8 L 22 12 L 26 16 L 8 14 Z" fill="var(--color-orange-500)" />
        </svg>
        {/* Ball — moves along */}
        <div
          className="absolute top-1/2 -translate-y-1/2 transition-all duration-700"
          style={{ left: `calc(${pct}% - 10px)`, transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
        >
          <div className="h-5 w-5 bg-white rounded-full border-2 border-navy-900 shadow-md relative">
            <span className="absolute inset-0 rounded-full" style={{
              backgroundImage: 'radial-gradient(circle at 30% 30%, rgba(0,0,0,0.18) 0 1px, transparent 1px)',
              backgroundSize: '3px 3px',
              opacity: 0.6,
            }} />
          </div>
        </div>
      </div>

      {/* Step labels */}
      <div className="mt-4 grid grid-cols-5 gap-1">
        {STEPS.map((s, i) => (
          <div key={s} className="text-center">
            <span className={`label-xs transition-colors ${
              i === step
                ? 'text-orange-500'
                : i < step
                ? 'text-navy-900'
                : 'text-steel-400'
            }`}>
              {String(i + 1).padStart(2, '0')} · {s}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
