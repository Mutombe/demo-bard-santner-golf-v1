import React, { useState } from 'react';
import CountUp from './CountUp';

/**
 * HistoryTimeline — horizontal brass rule with 4 pulsing dots (key dates).
 * Hover a dot to expand an anecdote card.
 */
const EVENTS = [
  { year: 1898, label: 'FOUNDED', text: 'Royal Harare Golf Club lays its first nine holes — one of Africa\'s earliest championship courses.' },
  { year: 1934, label: 'ROYAL CHARTER', text: 'Granted royal status — cementing its place among the continent\'s great institutions.' },
  { year: 1979, label: 'CLUBHOUSE', text: 'The current clubhouse opens — still the beating heart of member life today.' },
  { year: 2024, label: 'THE RACE', text: 'Bard Santner Inc becomes title partner of the Loyalty Event — Road to S.A. begins.' },
];

export default function HistoryTimeline() {
  const [active, setActive] = useState(null);

  return (
    <div className="relative py-8">
      {/* Brass rule */}
      <div className="relative h-px bg-gradient-to-r from-orange-300 via-orange-500 to-orange-300 animate-keyline" style={{ transformOrigin: 'center' }} />

      {/* Dots */}
      <div className="relative flex justify-between items-center -mt-2">
        {EVENTS.map((ev, i) => {
          const isActive = active === i;
          return (
            <button
              key={ev.year}
              type="button"
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              onClick={() => setActive(isActive ? null : i)}
              className="relative flex flex-col items-center group"
              aria-label={`${ev.year} — ${ev.label}`}
            >
              {/* Dot */}
              <span className={`h-4 w-4 rounded-full border-2 border-navy-900 transition-all duration-300 ${
                isActive ? 'bg-orange-500 scale-150' : 'bg-white scale-100'
              } animate-pulse-dot-soft`} />
              {/* Year */}
              <span className="mt-3 scoreboard-num text-xl sm:text-2xl text-navy-900 tabular-nums">
                <CountUp to={ev.year} from={1800} duration={2000} />
              </span>
              <span className="label-xs text-orange-500 mt-1">{ev.label}</span>

              {/* Anecdote popover */}
              <span
                className={`absolute top-full mt-12 w-48 sm:w-64 px-4 py-3 bg-navy-900 text-white text-xs sm:text-sm leading-relaxed transition-all duration-300 pointer-events-none z-10 ${
                  isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                }`}
                style={{
                  left: i === 0 ? '0%' : i === EVENTS.length - 1 ? 'auto' : '50%',
                  right: i === EVENTS.length - 1 ? '0%' : 'auto',
                  transform: i === 0 || i === EVENTS.length - 1 ? 'translateX(0)' : 'translateX(-50%)',
                }}
              >
                <span
                  className="absolute -top-2 h-3 w-3 bg-navy-900 rotate-45"
                  style={{
                    left: i === 0 ? '8px' : i === EVENTS.length - 1 ? 'auto' : '50%',
                    right: i === EVENTS.length - 1 ? '8px' : 'auto',
                    marginLeft: i === 0 || i === EVENTS.length - 1 ? '0' : '-6px',
                  }}
                />
                {ev.text}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
