import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, DownloadSimple, CaretDown, Printer, CaretDoubleDown, CaretDoubleUp } from '@phosphor-icons/react';
import PageTransition from '../components/PageTransition';
import SectionReveal from '../components/SectionReveal';
import CountUp from '../components/CountUp';
import SEO from '../components/SEO';
import { tournamentConditions } from '../data/siteData';
import { haptic } from '../lib/haptics';

// Roman numeral converter (for 1–20)
const ROMAN = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

// Tiny illustrated SVG per section
function SectionIcon({ n, className = '' }) {
  const common = {
    width: 32,
    height: 32,
    viewBox: '0 0 32 32',
    className: `transition-transform duration-400 group-open:rotate-180 ${className}`,
    'aria-hidden': true,
  };
  switch (n) {
    case '01': // committee — group
      return (
        <svg {...common}>
          <circle cx="10" cy="12" r="3" fill="var(--color-orange-500)" />
          <circle cx="22" cy="12" r="3" fill="var(--color-orange-500)" />
          <circle cx="16" cy="10" r="3.5" fill="var(--color-navy-900)" />
          <path d="M 4 24 Q 10 18 16 22 T 28 24" stroke="var(--color-navy-900)" strokeWidth="2" fill="none" />
        </svg>
      );
    case '02': // rules — book
      return (
        <svg {...common}>
          <rect x="6" y="5" width="20" height="22" fill="var(--color-navy-900)" />
          <rect x="8" y="7" width="16" height="18" fill="white" />
          <line x1="11" y1="12" x2="21" y2="12" stroke="var(--color-orange-500)" strokeWidth="2" />
          <line x1="11" y1="16" x2="21" y2="16" stroke="var(--color-navy-900)" strokeWidth="1" />
          <line x1="11" y1="20" x2="18" y2="20" stroke="var(--color-navy-900)" strokeWidth="1" />
        </svg>
      );
    case '03': // eligibility — checkmark badge
      return (
        <svg {...common}>
          <circle cx="16" cy="16" r="12" fill="var(--color-orange-500)" />
          <path d="M 10 16 L 14 20 L 22 12" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case '04': // format — scorecard
      return (
        <svg {...common}>
          <rect x="5" y="6" width="22" height="20" fill="white" stroke="var(--color-navy-900)" strokeWidth="2" />
          <line x1="5" y1="12" x2="27" y2="12" stroke="var(--color-navy-900)" strokeWidth="1" />
          <line x1="16" y1="12" x2="16" y2="26" stroke="var(--color-navy-900)" strokeWidth="1" />
          <text x="11" y="21" textAnchor="middle" fontSize="8" fill="var(--color-orange-500)" fontWeight="700">75</text>
          <text x="22" y="21" textAnchor="middle" fontSize="8" fill="var(--color-navy-900)" fontWeight="700">%</text>
        </svg>
      );
    case '05': // draw — envelope
      return (
        <svg {...common}>
          <rect x="4" y="8" width="24" height="16" fill="white" stroke="var(--color-navy-900)" strokeWidth="2" />
          <path d="M 4 8 L 16 18 L 28 8" stroke="var(--color-orange-500)" strokeWidth="2" fill="none" />
        </svg>
      );
    case '06': // prizes — trophy
      return (
        <svg {...common}>
          <path d="M 10 6 L 22 6 L 22 14 Q 22 20 16 20 Q 10 20 10 14 Z" fill="var(--color-orange-500)" />
          <rect x="13" y="20" width="6" height="4" fill="var(--color-navy-900)" />
          <rect x="10" y="24" width="12" height="2" fill="var(--color-navy-900)" />
          <path d="M 7 8 Q 4 10 6 14" stroke="var(--color-orange-500)" strokeWidth="2" fill="none" />
          <path d="M 25 8 Q 28 10 26 14" stroke="var(--color-orange-500)" strokeWidth="2" fill="none" />
        </svg>
      );
    case '07': // ties — flag duo
      return (
        <svg {...common}>
          <line x1="8" y1="26" x2="8" y2="6" stroke="var(--color-navy-900)" strokeWidth="2" />
          <path d="M 8 6 L 18 9 L 14 12 L 18 15 L 8 13 Z" fill="var(--color-orange-500)" />
          <line x1="20" y1="26" x2="20" y2="10" stroke="var(--color-navy-900)" strokeWidth="2" />
          <path d="M 20 10 L 28 12 L 25 15 L 28 18 L 20 16 Z" fill="var(--color-orange-400)" />
        </svg>
      );
    case '08': // late — clock
      return (
        <svg {...common}>
          <circle cx="16" cy="16" r="11" fill="var(--color-orange-500)" />
          <line x1="16" y1="16" x2="16" y2="9" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="16" y1="16" x2="21" y2="18" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="16" cy="16" r="1.5" fill="white" />
        </svg>
      );
    case '09': // no-show — X circle
      return (
        <svg {...common}>
          <circle cx="16" cy="16" r="12" fill="var(--color-navy-900)" />
          <line x1="10" y1="10" x2="22" y2="22" stroke="var(--color-orange-500)" strokeWidth="3" strokeLinecap="round" />
          <line x1="22" y1="10" x2="10" y2="22" stroke="var(--color-orange-500)" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case '10': // spot prize — sparkle
      return (
        <svg {...common}>
          <path d="M 16 4 L 18 14 L 28 16 L 18 18 L 16 28 L 14 18 L 4 16 L 14 14 Z" fill="var(--color-orange-500)" stroke="var(--color-navy-900)" strokeWidth="1" />
        </svg>
      );
    default:
      return <svg {...common}><circle cx="16" cy="16" r="12" fill="var(--color-orange-500)" /></svg>;
  }
}

export default function Conditions() {
  const [openAll, setOpenAll] = useState(false);

  const handleExpandAll = () => {
    const nextState = !openAll;
    setOpenAll(nextState);
    document.querySelectorAll('details.tc-section').forEach((el) => {
      el.open = nextState;
    });
  };

  const handlePrint = () => window.print();

  return (
    <PageTransition>
      <SEO title="Tournament Conditions — Bard Santner Road to S.A." description="Full tournament conditions and rules for the Bard Santner Loyalty Event & The Race to the Nedbank Golf Challenge 2025." />

      {/* Hero */}
      <section className="relative bg-navy-950 text-white pt-24 sm:pt-32 pb-14 sm:pb-20 overflow-hidden no-print">
        <div className="absolute inset-0 grid-lines opacity-40" />
        <div className="relative max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <p className="label-xs text-orange-500 mb-4"><span className="animate-keyline">04 / RULES</span></p>
          <h1 className="font-display uppercase leading-[0.88] text-balance" style={{ fontSize: 'clamp(2.5rem, 8vw, 8rem)' }}>
            TOURNAMENT<br />
            <span className="text-orange-500">RULES.</span>
          </h1>
          <p className="mt-6 max-w-3xl text-steel-300 text-lg rich-copy">
            {tournamentConditions.subtitle}.{' '}
            <CountUp to={10} className="!text-orange-400 font-bold" duration={1200} /> binding sections —
            read them in full before each <Link to="/calendar" className="prose-link !text-orange-400">round</Link>.{' '}
            <a href="https://www.randa.org/rog/the-rules-of-golf" target="_blank" rel="noopener noreferrer" className="prose-link !text-orange-400">Rules of The R&amp;A</a>{' '}
            apply throughout.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href={tournamentConditions.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="animate-paper-flip inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-400 text-white px-6 sm:px-8 py-4 sm:py-5 label-xs font-bold transition clip-arrow-right"
            >
              <DownloadSimple size={18} weight="bold" />
              DOWNLOAD OFFICIAL PDF
            </a>
            <button
              onClick={handleExpandAll}
              className="inline-flex items-center gap-2 border-2 border-white hover:border-orange-500 text-white hover:text-orange-500 px-6 py-4 sm:py-5 label-xs font-bold transition"
            >
              {openAll ? <CaretDoubleUp size={16} weight="bold" /> : <CaretDoubleDown size={16} weight="bold" />}
              {openAll ? 'COLLAPSE ALL' : 'EXPAND ALL'}
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 border-2 border-white hover:border-orange-500 text-white hover:text-orange-500 px-6 py-4 sm:py-5 label-xs font-bold transition"
            >
              <Printer size={16} weight="bold" />
              PRINT
            </button>
          </div>
        </div>
      </section>

      {/* Print-only header */}
      <div className="hidden print:block p-8">
        <h1 className="text-2xl font-bold">{tournamentConditions.title}</h1>
        <p className="text-base mt-2">{tournamentConditions.subtitle}</p>
      </div>

      {/* Read key points */}
      <section className="bg-white pt-10 sm:pt-14 no-print">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="key-points">
            <span className="kp-label">THE ESSENTIAL RULES — SKIM BEFORE YOU TEE OFF</span>
            <ul>
              <li>Fully paid-up Royal Harare members with current HNA handicap only.</li>
              <li>Medal Stableford at 75% Bard Santner handicap allowance. Men: White tees. Ladies: Red tees.</li>
              <li>Maximum handicap index: 21.2 (Men) and 26.2 (Ladies). Age 25+ for travel prize.</li>
              <li>Within 5 min late = 2-stroke penalty. Over 5 min late = disqualification (Rule 5.3a).</li>
              <li>Play at least 7 of 11 events. Best 7 scores count toward the Order of Merit.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Accordion sections */}
      <section id="format" className="bg-white py-10 sm:py-14 print:py-0">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 read-prose">
          <div className="border-t-2 border-navy-900">
            {tournamentConditions.sections.map((s, i) => {
              const anchorId = s.heading.toLowerCase().includes('eligibility')
                ? 'eligibility'
                : s.heading.toLowerCase().includes('format')
                ? 'format'
                : s.heading.toLowerCase().includes('late')
                ? 'late'
                : `section-${s.number}`;
              const n = parseInt(s.number, 10);
              return (
                <SectionReveal key={s.number} delay={i * 40}>
                  <details id={anchorId} onToggle={() => haptic.toggle()} className="tc-section group border-b-2 border-steel-200 py-4 sm:py-5 print:!open">
                    <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                      <div className="flex items-start gap-4 sm:gap-6 flex-1">
                        <SectionIcon n={s.number} className="shrink-0 mt-1" />
                        <div className="flex-1">
                          <p className="label-xs text-orange-500 mb-1">
                            {ROMAN[n] || s.number} · SECTION {s.number}
                          </p>
                          <h2 className="font-display text-2xl sm:text-3xl uppercase text-navy-900 leading-tight">
                            {s.heading}
                          </h2>
                        </div>
                      </div>
                      <CaretDown size={24} weight="bold" className="text-navy-900 transition-transform group-open:rotate-180 shrink-0 mt-2 no-print" />
                    </summary>
                    <div className="mt-5 ml-0 sm:ml-[60px] pr-4 pb-2">
                      <pre className="whitespace-pre-wrap font-body text-base sm:text-[17px] leading-[1.65] text-steel-700">
{s.body}
                      </pre>
                    </div>
                  </details>
                </SectionReveal>
              );
            })}
          </div>

          <div className="mt-12 sm:mt-16 p-6 sm:p-8 bg-navy-950 text-white no-print">
            <p className="label-xs text-orange-400 mb-3">NOTE</p>
            <p className="text-sm leading-relaxed rich-copy">
              These conditions are published by the <Link to="/contact" className="prose-link !text-orange-400">Royal Harare Golf Club Tournament Committee</Link> and
              the Tournament Director. In the event of any discrepancy between this web version and the printed / PDF master,
              the <a href={tournamentConditions.pdfUrl} className="prose-link !text-orange-400" target="_blank" rel="noopener noreferrer">official PDF</a> shall prevail.
              Questions? <a href="mailto:golf@bardsantner.com" className="prose-link !text-orange-400">Email the tournament desk</a>.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-steel-50 py-14 sm:py-20 no-print">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <p className="label-xs text-orange-500 mb-4">READ IT. UNDERSTOOD IT.</p>
          <h2 className="font-display uppercase text-navy-900 leading-[0.9] mb-6" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
            LET'S BOOK<br />
            <span className="text-orange-500">YOUR SLOT.</span>
          </h2>
          <p className="text-steel-600 max-w-xl mx-auto mb-8 rich-copy">
            All <CountUp to={10} className="!text-orange-600 font-bold" duration={900} /> sections squared?
            Head straight to <Link to="/register" className="prose-link">registration</Link> — or{' '}
            <Link to="/contact" className="prose-link">ask the organiser</Link> if anything needs clarifying.
          </p>
          <Link to="/register" className="inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-400 text-white px-8 py-5 label-xs font-bold transition clip-arrow-right">
            REGISTER <ArrowRight size={18} weight="bold" />
          </Link>
        </div>
      </section>
    </PageTransition>
  );
}
