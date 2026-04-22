import React, { useEffect, useMemo, useRef, useState } from 'react';
import { X, MagnifyingGlass, ArrowRight } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { calendar, tournamentConditions, mediaItems, courseFacts, faq } from '../data/siteData';

export default function SearchModal({ open, onClose }) {
  const [q, setQ] = useState('');
  const ref = useRef(null);

  useEffect(() => {
    if (open) setTimeout(() => ref.current?.focus(), 40);
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return [];
    const out = [];

    calendar.forEach((r) => {
      if ((r.title + r.blurb + r.dateLabel).toLowerCase().includes(needle))
        out.push({ type: 'Round', title: r.title, sub: r.dateLabel, to: '/calendar' });
    });

    tournamentConditions.sections.forEach((s) => {
      if ((s.heading + s.body).toLowerCase().includes(needle))
        out.push({ type: 'T&Cs', title: s.heading, sub: `Section ${s.number}`, to: '/conditions' });
    });

    faq.forEach((f) => {
      if ((f.q + f.a).toLowerCase().includes(needle))
        out.push({ type: 'FAQ', title: f.q, sub: 'Event', to: '/event' });
    });

    courseFacts.signatureHoles.forEach((h) => {
      if ((h.name + h.note).toLowerCase().includes(needle))
        out.push({ type: 'Course', title: h.name, sub: `Par ${h.par} · ${h.length}`, to: '/course' });
    });

    mediaItems.slice(0, 40).forEach((m) => {
      if ((m.category + m.caption).toLowerCase().includes(needle))
        out.push({ type: 'Gallery', title: m.caption.slice(0, 60), sub: m.category, to: '/media' });
    });

    return out.slice(0, 14);
  }, [q]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-navy-950/95 backdrop-blur-md flex items-start justify-center pt-24 sm:pt-32 px-5">
      <div className="w-full max-w-2xl">
        <div className="flex items-center gap-3 bg-white text-navy-900 p-4 border-b-2 border-orange-500">
          <MagnifyingGlass size={22} weight="bold" />
          <input
            ref={ref}
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search rounds, conditions, course, media..."
            className="flex-1 bg-transparent outline-none text-base sm:text-lg"
          />
          <button onClick={onClose} aria-label="Close search" className="text-steel-500 hover:text-orange-500">
            <X size={22} weight="bold" />
          </button>
        </div>

        <div className="bg-white text-navy-900 max-h-[60vh] overflow-auto">
          {!q && (
            <div className="p-8 text-center text-steel-500">
              <p className="label-xs mb-3">QUICK SEARCH</p>
              <p className="text-sm">Try "stableford", "late", "tee", "Sun City" or a date.</p>
            </div>
          )}
          {q && !results.length && (
            <div className="p-8 text-center text-steel-500 text-sm">
              No matches for <span className="font-bold">"{q}"</span>.
            </div>
          )}
          {results.map((r, i) => (
            <Link
              key={i}
              to={r.to}
              onClick={onClose}
              className="flex items-center justify-between px-5 py-4 border-b border-steel-100 hover:bg-orange-50 transition group"
            >
              <div>
                <p className="label-xs text-orange-500">{r.type}</p>
                <p className="font-semibold mt-0.5">{r.title}</p>
                <p className="text-xs text-steel-500">{r.sub}</p>
              </div>
              <ArrowRight size={18} weight="bold" className="text-steel-400 group-hover:text-orange-500 group-hover:translate-x-1 transition" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
