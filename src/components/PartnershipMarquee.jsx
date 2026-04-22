import React from 'react';

/**
 * PartnershipMarquee — quiet sideways procession of Bard Santner + Royal Harare logos.
 * CSS-driven infinite drift; pauses on hover.
 */
export default function PartnershipMarquee() {
  const items = [
    { type: 'logo', src: '/icon.png', alt: 'Bard Santner' },
    { type: 'text', text: 'BARD SANTNER INC.' },
    { type: 'sep' },
    { type: 'logo', src: '/logo-royal-harare.png', alt: 'Royal Harare' },
    { type: 'text', text: 'ROYAL HARARE GC · EST. 1898' },
    { type: 'sep' },
    { type: 'text', text: 'IN PARTNERSHIP' },
    { type: 'sep' },
    { type: 'text', text: 'ROAD TO S.A. · 2025' },
    { type: 'sep' },
  ];
  const sequence = [...items, ...items, ...items];

  return (
    <div className="bg-white border-y-2 border-navy-900/10 overflow-hidden py-5">
      <div className="flex whitespace-nowrap items-center animate-ticker-slow hover:[animation-play-state:paused]">
        {sequence.map((it, i) => {
          if (it.type === 'logo') {
            return (
              <span key={i} className="px-8 flex items-center">
                <img
                  src={it.src}
                  alt={it.alt}
                  className="h-8 sm:h-10 w-auto object-contain"
                  onError={(e) => (e.currentTarget.style.display = 'none')}
                />
              </span>
            );
          }
          if (it.type === 'sep') {
            return (
              <span key={i} className="px-6 text-orange-500">◆</span>
            );
          }
          return (
            <span key={i} className="px-6 font-display uppercase text-navy-900 text-sm sm:text-base tracking-wider">
              {it.text}
            </span>
          );
        })}
      </div>
    </div>
  );
}
