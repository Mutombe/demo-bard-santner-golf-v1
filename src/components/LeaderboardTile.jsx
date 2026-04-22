import React from 'react';

export default function LeaderboardTile({ position, value, label, accent = 'orange' }) {
  const accentClass =
    accent === 'orange' ? 'bg-orange-500 text-white' :
    accent === 'navy' ? 'bg-navy-900 text-white' :
    'bg-steel-200 text-navy-900';

  return (
    <div className="relative">
      <div className={`absolute top-0 left-0 ${accentClass} px-3 py-1.5 label-xs font-bold z-10`}>
        {position}
      </div>
      <div className="bg-white border-2 border-navy-900 pt-10 pb-6 px-6">
        <div className="scoreboard-num text-5xl sm:text-6xl text-navy-900 tabular-nums mb-2">{value}</div>
        <div className="label-xs text-steel-500">{label}</div>
      </div>
    </div>
  );
}
