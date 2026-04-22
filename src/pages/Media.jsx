import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { X, CaretLeft, CaretRight, MagnifyingGlass } from '@phosphor-icons/react';
import PageTransition from '../components/PageTransition';
import SectionReveal from '../components/SectionReveal';
import SEO from '../components/SEO';
import { gallery } from '../data/siteData';

const FILTERS = ['All', 'Tournament', 'Course', 'Clubhouse', 'Players'];

export default function Media() {
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');
  const [lightboxIdx, setLightboxIdx] = useState(null);

  const filtered = useMemo(() => {
    let out = gallery;
    if (filter !== 'All') out = out.filter((g) => g.category === filter);
    if (query.trim()) {
      const n = query.trim().toLowerCase();
      out = out.filter((g) => (g.caption + g.category).toLowerCase().includes(n));
    }
    return out;
  }, [filter, query]);

  const close = useCallback(() => setLightboxIdx(null), []);
  const prev = useCallback(
    () => setLightboxIdx((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length)),
    [filtered.length]
  );
  const next = useCallback(
    () => setLightboxIdx((i) => (i === null ? null : (i + 1) % filtered.length)),
    [filtered.length]
  );

  useEffect(() => {
    const onKey = (e) => {
      if (lightboxIdx === null) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [lightboxIdx, close, prev, next]);

  // Masonry column distribution (3-col on lg, 2-col on sm)
  const masonry = useMemo(() => {
    const cols = [[], [], []];
    filtered.forEach((g, i) => cols[i % 3].push({ ...g, idx: i }));
    return cols;
  }, [filtered]);

  return (
    <PageTransition>
      <SEO title="Gallery — Bard Santner Road to S.A. Golf Challenge" description="Course, clubhouse, players, and tournament imagery from the Bard Santner Loyalty Event seasons." />

      {/* Hero */}
      <section className="relative bg-navy-950 text-white pt-24 sm:pt-32 pb-10 sm:pb-14 overflow-hidden">
        <div className="absolute inset-0 grid-lines opacity-40" />
        <div className="relative max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <p className="label-xs text-orange-500 mb-4"><span className="animate-keyline">05 / GALLERY</span></p>
          <h1 className="font-display uppercase leading-[0.88] text-balance" style={{ fontSize: 'clamp(2.5rem, 8vw, 8rem)' }}>
            THE<br />
            <span className="text-orange-500">GALLERY.</span>
          </h1>
          <p className="mt-6 max-w-xl text-steel-300 text-lg">
            The face of the tournament. {gallery.length} images from the course, clubhouse, players,
            and podium celebrations.
          </p>
        </div>
      </section>

      {/* Filter bar */}
      <section className="sticky top-16 sm:top-20 z-30 bg-white border-b-2 border-navy-900">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 sm:px-4 py-2 label-xs font-bold border-2 transition ${
                  filter === f
                    ? 'bg-navy-900 border-navy-900 text-white'
                    : 'bg-white border-steel-300 text-navy-900 hover:border-navy-900'
                }`}
              >
                {f.toUpperCase()}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-72">
            <MagnifyingGlass size={16} weight="bold" className="absolute left-3 top-1/2 -translate-y-1/2 text-steel-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search captions..."
              className="w-full pl-9 pr-3 py-2.5 border-2 border-steel-300 focus:border-orange-500 focus:outline-none bg-white text-navy-900"
            />
          </div>
        </div>
      </section>

      {/* Masonry grid */}
      <section className="bg-steel-50 py-8 sm:py-14">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="label-xs text-steel-500 mb-3">NO MATCHES</p>
              <p className="text-navy-900 text-lg">Try another filter or search term.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
              {masonry.map((col, ci) => (
                <div key={ci} className="flex flex-col gap-3 sm:gap-5">
                  {col.map((g) => (
                    <button
                      key={g.idx}
                      onClick={() => setLightboxIdx(g.idx)}
                      className="group relative block text-left photo-hover overflow-hidden bg-white"
                    >
                      <img
                        src={g.src}
                        alt={g.caption}
                        loading="lazy"
                        className="w-full h-auto object-cover object-center block"
                        onError={(e) => (e.currentTarget.style.display = 'none')}
                      />
                      <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-navy-950/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="label-xs text-orange-400 mb-1">{g.category}</p>
                        <p className="text-white text-xs line-clamp-2">{g.caption}</p>
                      </div>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <div
          className="fixed inset-0 z-[70] bg-navy-950/98 flex items-center justify-center p-4 sm:p-8"
          onClick={close}
        >
          <button
            onClick={close}
            aria-label="Close"
            className="absolute top-4 right-4 h-12 w-12 bg-white text-navy-900 flex items-center justify-center hover:bg-orange-500 hover:text-white transition z-10"
          >
            <X size={22} weight="bold" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Previous"
            className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 bg-white/10 hover:bg-orange-500 text-white flex items-center justify-center transition"
          >
            <CaretLeft size={24} weight="bold" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Next"
            className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 bg-white/10 hover:bg-orange-500 text-white flex items-center justify-center transition"
          >
            <CaretRight size={24} weight="bold" />
          </button>

          <div className="max-w-5xl max-h-[85vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <img
              src={filtered[lightboxIdx].src}
              alt={filtered[lightboxIdx].caption}
              className="max-w-full max-h-[78vh] object-contain"
            />
            <div className="mt-4 text-center">
              <p className="label-xs text-orange-400 mb-2">
                {filtered[lightboxIdx].category} · {lightboxIdx + 1} / {filtered.length}
              </p>
              <p className="text-white text-sm sm:text-base">{filtered[lightboxIdx].caption}</p>
            </div>
          </div>
        </div>
      )}
    </PageTransition>
  );
}
