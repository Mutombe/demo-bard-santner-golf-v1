import React from 'react';

/**
 * LeaderboardTicker — right-to-left scrolling "live" results strip.
 * Cycle continuously; pauses on hover. Fake but plausible sample entries.
 */
const SAMPLE = [
  { rd: 'R 07', name: 'T. Mhlanga', score: '74 NET', delta: '+2' },
  { rd: 'R 07', name: 'N. Gatsi', score: '72 NET', delta: 'E' },
  { rd: 'R 07', name: 'A. Chatora', score: '71 NET', delta: '-1' },
  { rd: 'R 07', name: 'I. Musora', score: '75 NET', delta: '+3' },
  { rd: 'R 06', name: 'S. Murungweni', score: '69 NET', delta: '-3' },
  { rd: 'R 06', name: 'T. Tamba', score: '73 NET', delta: '+1' },
];

export default function LeaderboardTicker() {
  const duped = [...SAMPLE, ...SAMPLE, ...SAMPLE];

  return (
    <div
      className="relative bg-navy-900 border-y-2 border-orange-500/60 overflow-hidden py-3"
      aria-label="Live leaderboard ticker"
    >
      <div className="absolute left-0 top-0 bottom-0 z-20 flex items-center pl-3 sm:pl-5 bg-gradient-to-r from-navy-900 via-navy-900/95 to-transparent pr-8">
        <span className="label-xs text-orange-500 flex items-center gap-2">
          <span className="h-1.5 w-1.5 bg-orange-500 rounded-full animate-pulse-dot" />
          LIVE SCORES
        </span>
      </div>

      <div className="flex whitespace-nowrap animate-ticker hover:[animation-play-state:paused]">
        {duped.map((row, i) => (
          <span
            key={i}
            className="px-6 sm:px-8 font-mono text-xs sm:text-sm text-steel-200 flex items-center gap-3"
          >
            <span className="text-orange-400 font-semibold tracking-wider">{row.rd}</span>
            <span className="text-steel-500">·</span>
            <span className="text-white font-semibold">{row.name}</span>
            <span className="text-steel-500">·</span>
            <span className="tabular-nums">{row.score}</span>
            <span
              className={`tabular-nums font-semibold ${
                row.delta.startsWith('-')
                  ? 'text-orange-500'
                  : row.delta === 'E'
                  ? 'text-steel-300'
                  : 'text-steel-400'
              }`}
            >
              {row.delta}
            </span>
            <span className="text-orange-500 ml-3">▲</span>
          </span>
        ))}
      </div>
    </div>
  );
}
