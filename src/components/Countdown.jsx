import React, { useEffect, useState, useMemo } from 'react';
import { calendar } from '../data/siteData';

function diff(target) {
  const now = new Date().getTime();
  const dt = new Date(target + 'T07:00:00+02:00').getTime();
  const ms = Math.max(0, dt - now);
  const s = Math.floor(ms / 1000);
  return {
    days: Math.floor(s / 86400),
    hrs: Math.floor((s % 86400) / 3600),
    min: Math.floor((s % 3600) / 60),
    sec: s % 60,
    isLive: ms === 0,
  };
}

function nextRound() {
  const now = new Date();
  const upcoming = calendar.find((r) => new Date(r.date + 'T07:00:00+02:00') > now);
  // Fallback to final scheduled round if all dates are past
  return upcoming || calendar[calendar.length - 1];
}

export default function Countdown({ compact = false }) {
  const round = useMemo(() => nextRound(), []);
  const [t, setT] = useState(() => diff(round.date));

  useEffect(() => {
    const id = setInterval(() => setT(diff(round.date)), 1000);
    return () => clearInterval(id);
  }, [round.date]);

  const pad = (n) => String(n).padStart(2, '0');

  const cells = [
    { label: 'DAYS', value: pad(t.days) },
    { label: 'HRS', value: pad(t.hrs) },
    { label: 'MIN', value: pad(t.min) },
    { label: 'SEC', value: pad(t.sec) },
  ];

  if (compact) {
    return (
      <div className="flex items-center gap-2 sm:gap-4 font-mono">
        {cells.map((c, i) => (
          <React.Fragment key={c.label}>
            {i > 0 && <span className="text-orange-500 font-display text-xl">:</span>}
            <div className="text-center">
              <div className="scoreboard-num text-2xl sm:text-3xl text-white">{c.value}</div>
              <div className="scoreboard-label text-orange-400 mt-1">{c.label}</div>
            </div>
          </React.Fragment>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <span className="h-2 w-2 bg-orange-500 animate-pulse-dot" />
        <span className="label-xs text-orange-400">NEXT TEE-OFF · ROUND {String(round.round).padStart(2, '0')}</span>
      </div>
      <p className="font-display text-2xl sm:text-3xl uppercase text-white mb-6">{round.dateLabel}</p>
      <div className="grid grid-cols-4 gap-3 sm:gap-5 max-w-xl">
        {cells.map((c) => (
          <div
            key={c.label}
            className="border-2 border-white/20 bg-black/20 backdrop-blur-sm px-2 sm:px-4 py-5 sm:py-8 text-center"
          >
            <div className="scoreboard-num text-[clamp(2.75rem,9vw,5rem)] text-white tabular-nums">
              {c.value}
            </div>
            <div className="scoreboard-label text-orange-400 mt-2">{c.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
