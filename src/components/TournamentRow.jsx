import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from '@phosphor-icons/react';
import CountUp from './CountUp';

/**
 * TournamentRow — single leaderboard-style row.
 * Next round pulses orange. Past rounds stamped with check. Upcoming get a flag flutter.
 */
export default function TournamentRow({ round, index, isNext = false }) {
  const statusColor =
    round.status === 'past' ? 'text-steel-500' : isNext ? 'text-orange-500' : 'text-navy-900';
  const statusLabel =
    round.status === 'past' ? 'PAST' : isNext ? 'NEXT UP' : 'UPCOMING';

  // Days until this round
  const now = new Date();
  const target = new Date(round.date + 'T07:00:00+02:00');
  const daysToGo = Math.max(0, Math.ceil((target - now) / (1000 * 60 * 60 * 24)));

  return (
    <Link
      to="/register"
      className={`group grid grid-cols-12 items-center gap-3 py-6 px-4 sm:px-6 border-t transition ${
        isNext ? 'border-orange-500 bg-orange-50 hover:bg-orange-100 animate-pulse-ring' : 'border-steel-200 hover:bg-steel-50'
      }`}
    >
      {/* Round number + tiny tee */}
      <div className="col-span-2 sm:col-span-1 flex items-center gap-2">
        <svg width="12" height="16" viewBox="0 0 12 16" aria-hidden="true" className="shrink-0">
          <rect x="3" y="2" width="6" height="3" fill={isNext ? '#E87722' : round.status === 'past' ? '#9EA4B3' : '#0B0A19'} />
          <rect x="4.5" y="5" width="3" height="9" fill={isNext ? '#C65C14' : round.status === 'past' ? '#6E7586' : '#252144'} />
          <rect x="3" y="14" width="6" height="1.5" fill="#6E7586" opacity="0.6" />
        </svg>
        <div className="scoreboard-num text-2xl sm:text-3xl text-steel-300 tabular-nums">
          <CountUp to={round.round} pad={2} duration={900} />
        </div>
      </div>

      {/* Date block */}
      <div className="col-span-3 sm:col-span-2">
        <div className={`scoreboard-num text-4xl sm:text-5xl ${statusColor} tabular-nums`}>
          <CountUp to={parseInt(round.day, 10)} pad={2} duration={1000} />
        </div>
        <div className="label-xs text-steel-500 mt-1">{round.monthShort} 2025</div>
      </div>

      {/* Title + blurb */}
      <div className="col-span-5 sm:col-span-6">
        <div className="flex items-center gap-2 mb-1">
          <p className="label-xs text-steel-400">{statusLabel}</p>
          {round.status === 'past' && (
            <span className="inline-flex items-center gap-1 text-steel-500">
              <Check size={12} weight="bold" />
              <span className="label-xs text-[10px]">COMPLETED</span>
            </span>
          )}
          {!isNext && round.status !== 'past' && daysToGo > 0 && (
            <span className="label-xs text-orange-500 text-[10px]">
              · <CountUp to={daysToGo} duration={1000} /> DAYS
            </span>
          )}
          {isNext && daysToGo > 0 && (
            <span className="label-xs text-orange-600 font-bold text-[10px]">
              · <CountUp to={daysToGo} duration={1200} /> DAYS TO GO
            </span>
          )}
        </div>
        <h3 className="font-display text-xl sm:text-2xl uppercase text-navy-900">
          {round.title}
        </h3>
        <p className="text-xs sm:text-sm text-steel-600 mt-1 hidden sm:block">{round.blurb}</p>
      </div>

      {/* CTA arrow */}
      <div className="col-span-2 sm:col-span-3 flex justify-end">
        {round.status !== 'past' ? (
          <div className="inline-flex items-center gap-2 bg-navy-900 text-white px-3 sm:px-5 py-2 sm:py-3 label-xs font-bold group-hover:bg-orange-500 transition">
            <span className="hidden sm:inline">BOOK SLOT</span>
            <ArrowRight size={16} weight="bold" className="group-hover:translate-x-1 transition" />
          </div>
        ) : (
          <span className="label-xs text-steel-400 inline-flex items-center gap-1">
            <Check size={12} weight="bold" />
            COMPLETED
          </span>
        )}
      </div>
    </Link>
  );
}
