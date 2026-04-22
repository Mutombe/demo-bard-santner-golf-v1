import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, DownloadSimple, CaretDown, Printer, CaretDoubleDown, CaretDoubleUp } from '@phosphor-icons/react';
import PageTransition from '../components/PageTransition';
import SectionReveal from '../components/SectionReveal';
import SEO from '../components/SEO';
import { tournamentConditions } from '../data/siteData';

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
          <p className="mt-6 max-w-3xl text-steel-300 text-lg">
            {tournamentConditions.subtitle}. Ten binding sections — read them in full before
            each round. Rules of the Royal and Ancient Golf Club of St Andrews apply throughout.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href={tournamentConditions.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-400 text-white px-6 sm:px-8 py-4 sm:py-5 label-xs font-bold transition clip-arrow-right"
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

      {/* Read key points — older-reader summary */}
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
      <section className="bg-white py-10 sm:py-14 print:py-0">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 read-prose">
          <div className="border-t-2 border-navy-900">
            {tournamentConditions.sections.map((s, i) => (
              <SectionReveal key={s.number} delay={i * 40}>
                <details className="tc-section group border-b-2 border-steel-200 py-4 sm:py-5 print:!open">
                  <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                    <div className="flex items-start gap-4 sm:gap-6 flex-1">
                      <div className="scoreboard-num text-3xl sm:text-4xl text-orange-500 tabular-nums shrink-0 pt-1">
                        {s.number}
                      </div>
                      <h2 className="font-display text-2xl sm:text-3xl uppercase text-navy-900 leading-tight pt-1">
                        {s.heading}
                      </h2>
                    </div>
                    <CaretDown size={24} weight="bold" className="text-navy-900 transition-transform group-open:rotate-180 shrink-0 mt-2 no-print" />
                  </summary>
                  <div className="mt-5 ml-0 sm:ml-[88px] pr-4 pb-2">
                    <pre className="whitespace-pre-wrap font-body text-base sm:text-[17px] leading-[1.65] text-steel-700">
{s.body}
                    </pre>
                  </div>
                </details>
              </SectionReveal>
            ))}
          </div>

          <div className="mt-12 sm:mt-16 p-6 sm:p-8 bg-navy-950 text-white no-print">
            <p className="label-xs text-orange-400 mb-3">NOTE</p>
            <p className="text-sm leading-relaxed">
              These conditions are published by the Royal Harare Golf Club Tournament
              Committee and the Tournament Director. In the event of any
              discrepancy between this web version and the printed / PDF master,
              the <a href={tournamentConditions.pdfUrl} className="text-orange-500 underline hover:text-orange-400" target="_blank" rel="noopener noreferrer">official PDF</a> shall prevail.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-steel-50 py-14 sm:py-20 no-print">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <p className="label-xs text-orange-500 mb-4">READ IT. UNDERSTOOD IT.</p>
          <h2 className="font-display uppercase text-navy-900 leading-[0.9] mb-8" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
            LET'S BOOK<br />
            <span className="text-orange-500">YOUR SLOT.</span>
          </h2>
          <Link to="/register" className="inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-400 text-white px-8 py-5 label-xs font-bold transition clip-arrow-right">
            REGISTER <ArrowRight size={18} weight="bold" />
          </Link>
        </div>
      </section>
    </PageTransition>
  );
}
