import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from '@phosphor-icons/react';

export default function TournamentRow({ round, index, isNext = false }) {
  const statusColor =
    round.status === 'past' ? 'text-steel-500' : isNext ? 'text-orange-500' : 'text-navy-900';
  const statusLabel =
    round.status === 'past' ? 'PAST' : isNext ? 'NEXT UP' : 'UPCOMING';

  return (
    <Link
      to="/register"
      className={`group grid grid-cols-12 items-center gap-3 py-6 px-4 sm:px-6 border-t transition ${
        isNext ? 'border-orange-500 bg-orange-50 hover:bg-orange-100' : 'border-steel-200 hover:bg-steel-50'
      }`}
    >
      {/* Round number */}
      <div className="col-span-2 sm:col-span-1">
        <div className="scoreboard-num text-3xl sm:text-4xl text-steel-300 tabular-nums">
          {String(round.round).padStart(2, '0')}
        </div>
      </div>

      {/* Date block */}
      <div className="col-span-3 sm:col-span-2">
        <div className={`scoreboard-num text-4xl sm:text-5xl ${statusColor} tabular-nums`}>
          {round.day}
        </div>
        <div className="label-xs text-steel-500 mt-1">{round.monthShort} 2025</div>
      </div>

      {/* Title + blurb */}
      <div className="col-span-5 sm:col-span-6">
        <p className="label-xs text-steel-400 mb-1">{statusLabel}</p>
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
          <span className="label-xs text-steel-400">COMPLETED</span>
        )}
      </div>
    </Link>
  );
}
