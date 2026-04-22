import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, ArrowUpRight, Trophy, Flag,
  WhatsappLogo
} from '@phosphor-icons/react';

import PageTransition from '../components/PageTransition';
import SectionReveal from '../components/SectionReveal';
import Countdown from '../components/Countdown';
import StatCounter from '../components/StatCounter';
import TournamentRow from '../components/TournamentRow';
import EventCard from '../components/EventCard';
import CountUp from '../components/CountUp';
import HeroCarousel from '../components/HeroCarousel';
import LeaderboardTicker from '../components/LeaderboardTicker';
import QualifyingDials from '../components/QualifyingDials';
import GolfFlag from '../components/GolfFlag';
import PartnershipMarquee from '../components/PartnershipMarquee';
import SEO from '../components/SEO';
import FrameRule from '../components/FrameRule';
import { useTilt } from '../hooks/useTilt';
import { haptic } from '../lib/haptics';

// Tiltable wrapper for prize cards — subtle ±4° rotation tracking the cursor.
function TiltWrap({ children, className = '' }) {
  const t = useTilt(4);
  return (
    <div
      ref={t.ref}
      onMouseMove={t.onMouseMove}
      onMouseLeave={t.onMouseLeave}
      style={{ ...t.style, transition: 'transform 140ms ease-out', transformStyle: 'preserve-3d' }}
      className={className}
    >
      {children}
    </div>
  );
}
import {
  business, calendar, eventStats, courseFacts, prizeLadder,
  gallery, eligibility
} from '../data/siteData';

function nextRoundIndex() {
  const now = new Date();
  return calendar.findIndex((r) => new Date(r.date + 'T07:00:00+02:00') > now);
}

// Photos with embedded watermark — exclude from non-Gallery strips/grids.
const WATERMARKED = new Set([
  '/images/flags-fairway.jpg',
  '/images/tee-off-jan2025.jpg',
  '/images/flag-sunset.jpg',
  '/images/player-swing-banner.jpg',
  '/images/pro-swing.jpg',
  '/images/players-lining-up-putt.jpg',
  '/images/fairway-action-2.jpg',
  '/images/registration-tent.jpg',
]);

export default function Home() {
  const nextIdx = useMemo(() => {
    const i = nextRoundIndex();
    return i === -1 ? calendar.length - 1 : i;
  }, []);

  return (
    <PageTransition>
      <SEO
        title="Bard Santner Road to S.A. Golf Challenge 2025 — Royal Harare"
        description="Nine tournaments at Royal Harare. One Sun City prize. The Race to the Nedbank Golf Challenge 2025 — register now."
      />

      {/* ================================================================
           HERO — single-photo slide-left carousel · scoreboard
      ================================================================ */}
      <section
        className="relative bg-navy-950 text-white overflow-hidden flex flex-col pt-16 sm:pt-20"
        style={{ height: '100svh', minHeight: '640px' }}
      >
        {/* Proper single-photo-at-a-time carousel */}
        <HeroCarousel />
        <div className="absolute inset-0 grid-lines opacity-20 pointer-events-none" />

        {/* Top status bar */}
        <div className="relative border-b border-white/10 shrink-0 z-10">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-2.5 flex items-center justify-between text-[10px] tracking-[0.2em] uppercase font-mono">
            <div className="flex items-center gap-2.5">
              <span className="h-2 w-2 bg-orange-500 rounded-full animate-pulse-dot" />
              <span className="text-orange-400">SEASON 2025 — LIVE</span>
            </div>
            <div className="hidden sm:flex items-center gap-4 text-steel-300">
              <span>ROYAL HARARE · ZW</span>
              <span className="hidden md:inline">LAT -17.80 · LON 31.07</span>
            </div>
          </div>
        </div>

        {/* Hero body */}
        <div className="relative flex-1 flex items-center z-10">
          <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-4 sm:py-6">
            <div className="grid grid-cols-12 gap-5 lg:gap-8 items-center">
              {/* Left — title */}
              <div className="col-span-12 lg:col-span-7">
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="label-xs text-orange-500 mb-3 sm:mb-4"
                >
                  <span className="animate-keyline">BARD SANTNER LOYALTY EVENT // EDITION 2025</span>
                </motion.p>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="font-display uppercase leading-[0.86] text-balance"
                  style={{ fontSize: 'clamp(2.6rem, 8.5vw, 8rem)' }}
                >
                  ROAD TO <span className="text-orange-500">S.A.</span>
                  <br />
                  GOLF CHALLENGE
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.35 }}
                  className="mt-4 sm:mt-5 max-w-xl text-steel-200 text-sm sm:text-base leading-relaxed rich-copy"
                >
                  Nine qualifying rounds at{' '}
                  <Link to="/course" className="prose-link !text-orange-400">Royal Harare Golf Club</Link>.
                  Eleven months of stableford. One all-expenses-paid seat to the{' '}
                  <Link to="/event#nedbank" className="prose-link !text-orange-400">Nedbank Golf Challenge</Link>{' '}
                  at <a href="https://www.suninternational.com/sun-city/" target="_blank" rel="noopener noreferrer" className="prose-link !text-orange-400">Sun City</a>.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="mt-5 sm:mt-7 flex flex-wrap items-center gap-3"
                >
                  <Link
                    to="/register"
                    className="group inline-flex items-center gap-2.5 bg-orange-500 hover:bg-orange-400 text-white px-5 sm:px-7 py-3 sm:py-4 label-xs font-bold transition clip-arrow-right"
                  >
                    BOOK YOUR TEE-TIME
                    <ArrowRight size={16} weight="bold" className="group-hover:translate-x-1 transition" />
                  </Link>
                  <Link
                    to="/calendar"
                    className="inline-flex items-center gap-2 border-2 border-white text-white hover:border-orange-500 hover:text-orange-500 px-5 sm:px-7 py-3 sm:py-4 label-xs font-bold transition"
                  >
                    9-ROUND CALENDAR
                  </Link>
                </motion.div>
              </div>

              {/* Right — compact scoreboard panel */}
              <div className="col-span-12 lg:col-span-5 mt-2 lg:mt-0">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-navy-900/75 backdrop-blur-md border-2 border-white/15 p-4 sm:p-6"
                >
                  <Countdown compact />

                  <div className="mt-5 pt-4 border-t border-white/10 grid grid-cols-3 gap-3">
                    <div>
                      <div className="scoreboard-label text-orange-400">ROUND</div>
                      <div className="scoreboard-num text-2xl sm:text-3xl mt-0.5 tabular-nums">
                        <CountUp to={calendar[nextIdx].round} pad={2} duration={1400} />
                        <span className="text-steel-500 text-base"> / <CountUp to={9} pad={2} duration={1400} /></span>
                      </div>
                    </div>
                    <div>
                      <div className="scoreboard-label text-orange-400">PAR</div>
                      <div className="scoreboard-num text-2xl sm:text-3xl mt-0.5 tabular-nums">
                        <CountUp to={72} duration={1400} />
                      </div>
                    </div>
                    <div>
                      <div className="scoreboard-label text-orange-400">H.A.</div>
                      <div className="scoreboard-num text-2xl sm:text-3xl mt-0.5 tabular-nums">
                        <CountUp to={75} duration={1400} /><span className="text-sm">%</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom — scroll hint */}
        <div className="relative shrink-0 pb-3 sm:pb-5 flex justify-center z-10">
          <span className="label-xs text-white/50 animate-breathe">↓ SCROLL</span>
        </div>
      </section>

      {/* ================================================================
           LEADERBOARD TICKER — "live" round results strip
      ================================================================ */}
      <LeaderboardTicker />

      {/* ================================================================
           KINETIC TICKER BAR (orange)
      ================================================================ */}
      <div className="relative bg-orange-500 text-white py-3 border-y-4 border-navy-950 overflow-hidden">
        <div className="flex whitespace-nowrap animate-ticker">
          {[...Array(3)].flatMap((_, i) =>
            [
              'ROAD TO S.A. 2025',
              '9 ROUNDS',
              'ROYAL HARARE GC',
              'STABLEFORD 75%',
              'SUN CITY PRIZE',
              'NEDBANK CHALLENGE',
              'PLAY 7 OF 11',
              'ORDER OF MERIT',
              'WHITE TEES · RED TEES',
              'HNA HANDICAP',
            ].map((t, j) => (
              <span key={`${i}-${j}`} className="px-8 label-xs font-bold flex items-center gap-8">
                {t}
                <span className="text-navy-950">▲</span>
              </span>
            ))
          )}
        </div>
      </div>

      {/* ================================================================
           SECTION 01 — THE EVENT (big number stats + pitch)
      ================================================================ */}
      <section className="relative py-14 sm:py-20 lg:py-28 bg-white">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <SectionReveal>
            <div className="grid grid-cols-12 gap-6 sm:gap-8 items-end">
              <div className="col-span-12 lg:col-span-5">
                <p className="label-xs text-orange-500 mb-4"><span className="animate-keyline">01 / THE EVENT</span></p>
                <h2 className="font-display uppercase text-navy-900 leading-[0.9] text-balance" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
                  THE BARD SANTNER<br />
                  <span className="text-orange-500">LOYALTY EVENT.</span>
                </h2>
              </div>
              <div className="col-span-12 lg:col-span-6 lg:col-start-7">
                <p className="text-steel-700 text-lg leading-relaxed rich-copy">
                  Eleven qualifying events between{' '}
                  <Link to="/calendar" className="prose-link">October 2024 and September 2025</Link>.
                  Medal Stableford at <Link to="/conditions#format" className="prose-link">75% Bard Santner handicap allowance</Link>.
                  Your best seven scores accumulate on the Order of Merit.
                  When the final card lands in November, the leader flies to{' '}
                  <a href="https://www.suninternational.com/sun-city/" target="_blank" rel="noopener noreferrer" className="prose-link">Sun City</a>{' '}
                  for the Nedbank Golf Challenge — courtesy of{' '}
                  <a href="https://bardsantner.com" target="_blank" rel="noopener noreferrer" className="prose-link">Bard Santner Inc</a>.
                </p>
              </div>
            </div>
          </SectionReveal>

          <SectionReveal delay={100}>
            <div className="mt-14 sm:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10">
              {eventStats.map((s, i) => {
                const to = i === 0 ? '/calendar' : i === 1 ? '/register' : i === 2 ? '/conditions' : '/event';
                return (
                  <Link
                    key={s.label}
                    to={to}
                    className="group block relative transition"
                  >
                    <StatCounter value={s.value} label={s.label} sub={s.sub} />
                    <span className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition text-orange-500">
                      <ArrowUpRight size={22} weight="bold" />
                    </span>
                    <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-orange-500 group-hover:w-full transition-all duration-500" />
                  </Link>
                );
              })}
            </div>
          </SectionReveal>
        </div>
      </section>

      <FrameRule className="py-2" />

      {/* ================================================================
           QUALIFYING DIALS — radial gauges (the "surprise" moment)
      ================================================================ */}
      <section className="relative py-14 sm:py-20 bg-steel-50 border-y-2 border-navy-900/10">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <SectionReveal>
            <div className="mb-12 text-center max-w-2xl mx-auto">
              <p className="label-xs text-orange-500 mb-4"><span className="animate-keyline">THE MATH OF QUALIFYING</span></p>
              <h2 className="font-display uppercase text-navy-900 leading-[0.9] text-balance" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
                HOW MANY ROUNDS<br />
                <span className="text-orange-500">DO YOU NEED?</span>
              </h2>
              <p className="mt-5 text-steel-600 rich-copy">
                Different stages of <Link to="/event" className="prose-link">the Race</Link> unlock at different
                thresholds. Here's the cutline maths — with{' '}
                <Link to="/conditions" className="prose-link">full tournament conditions</Link>{' '}
                linked below each gauge.
              </p>
            </div>
          </SectionReveal>
          <SectionReveal delay={120}>
            <QualifyingDials />
          </SectionReveal>
        </div>
      </section>

      {/* ================================================================
           SECTION 02 — THE CALENDAR (leaderboard-style rows)
      ================================================================ */}
      <section className="relative py-14 sm:py-20 lg:py-28 bg-white">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <SectionReveal>
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-10">
              <div>
                <p className="label-xs text-orange-500 mb-4">02 / THE CALENDAR</p>
                <h2 className="font-display uppercase text-navy-900 leading-[0.9]" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
                  <CountUp to={9} className="text-orange-500" /> ROUNDS.<br />
                  <span className="text-orange-500">ONE ORDER OF MERIT.</span>
                </h2>
                <p className="mt-4 max-w-xl text-steel-600 text-sm sm:text-base rich-copy">
                  See <Link to="/calendar" className="prose-link">every month</Link> laid out — pick your rounds, lock your slots.
                </p>
              </div>
              <Link
                to="/calendar"
                className="inline-flex items-center gap-2 label-xs font-bold text-navy-900 hover:text-orange-500 transition border-b-2 border-navy-900 hover:border-orange-500 pb-1"
              >
                FULL CALENDAR <ArrowRight size={14} weight="bold" />
              </Link>
            </div>
          </SectionReveal>

          <div className="bg-white border-2 border-navy-900">
            <div className="grid grid-cols-12 items-center gap-3 py-4 px-4 sm:px-6 bg-navy-900 text-white">
              <div className="col-span-2 sm:col-span-1 label-xs text-orange-400">RD</div>
              <div className="col-span-3 sm:col-span-2 label-xs text-orange-400">DATE</div>
              <div className="col-span-5 sm:col-span-6 label-xs text-orange-400">TOURNAMENT</div>
              <div className="col-span-2 sm:col-span-3 label-xs text-orange-400 text-right">ACTION</div>
            </div>
            {calendar.map((r, idx) => (
              <TournamentRow key={r.round} round={r} index={idx} isNext={idx === nextIdx} />
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
           SECTION 03 — NEXT UP / FEATURED ROUNDS (card grid)
      ================================================================ */}
      <section className="relative py-14 sm:py-20 lg:py-28 bg-navy-950 text-white overflow-hidden">
        <div className="absolute inset-0 grid-lines opacity-30 pointer-events-none" />
        <div className="relative max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <SectionReveal>
            <p className="label-xs text-orange-500 mb-4">03 / NEXT ON THE GRID</p>
            <h2 className="font-display uppercase leading-[0.9] text-balance mb-10" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
              THE RACE<br />
              <span className="text-orange-500">IS LIVE.</span>
            </h2>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {calendar.slice(Math.max(0, nextIdx - 0), nextIdx + 3).slice(0, 3).map((r) => (
              <EventCard key={r.round} round={r} isNext={r.round === calendar[nextIdx].round} />
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
           SECTION 04 — THE COURSE (editorial feature)
      ================================================================ */}
      <section className="relative py-14 sm:py-20 lg:py-28 bg-white">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-12 gap-6 sm:gap-8">
            <div className="col-span-12 lg:col-span-5">
              <SectionReveal>
                <p className="label-xs text-orange-500 mb-4">04 / THE COURSE</p>
                <h2 className="font-display uppercase text-navy-900 leading-[0.88] mb-6" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
                  ROYAL<br />HARARE.
                </h2>
                <p className="font-mono text-orange-500 label-xs mb-6">
                  ESTABLISHED <CountUp to={1898} from={1800} duration={2000} /> · PAR <CountUp to={72} duration={1200} /> · <CountUp to={6660} from={6000} duration={1800} />M
                </p>
                <p className="text-steel-700 leading-relaxed mb-8 rich-copy">
                  One of <a href="https://maps.google.com/?q=Royal+Harare+Golf+Club" target="_blank" rel="noopener noreferrer" className="prose-link">Africa's grand 18-hole championship layouts</a> —
                  dense indigenous hardwoods, sweeping fairways, immaculate greens. Home of{' '}
                  <Link to="/event" className="prose-link">the Bard Santner Loyalty Event</Link> and
                  every qualifier of <Link to="/event#nedbank" className="prose-link">the Race to Sun City</Link>.
                </p>
                <Link
                  to="/course"
                  className="inline-flex items-center gap-2 label-xs font-bold text-navy-900 hover:text-orange-500 border-b-2 border-navy-900 hover:border-orange-500 pb-1 transition"
                >
                  WALK THE FAIRWAYS <ArrowRight size={14} weight="bold" />
                </Link>

                <div className="mt-10 grid grid-cols-3 gap-4 pt-8 border-t-2 border-navy-900">
                  <Link to="/course" className="group block">
                    <div className="scoreboard-num text-4xl text-navy-900 tabular-nums group-hover:text-orange-500 transition">
                      <CountUp to={courseFacts.holes} />
                    </div>
                    <div className="label-xs text-steel-500 mt-1 group-hover:text-navy-900 transition">HOLES</div>
                  </Link>
                  <Link to="/course" className="group block">
                    <div className="scoreboard-num text-4xl text-navy-900 tabular-nums group-hover:text-orange-500 transition">
                      {courseFacts.courseRating}
                    </div>
                    <div className="label-xs text-steel-500 mt-1 group-hover:text-navy-900 transition">RATING</div>
                  </Link>
                  <Link to="/course" className="group block">
                    <div className="scoreboard-num text-4xl text-navy-900 tabular-nums group-hover:text-orange-500 transition">
                      <CountUp to={parseInt(courseFacts.slope, 10)} />
                    </div>
                    <div className="label-xs text-steel-500 mt-1 group-hover:text-navy-900 transition">SLOPE</div>
                  </Link>
                </div>
              </SectionReveal>
            </div>

            <div className="col-span-12 lg:col-span-7">
              <SectionReveal delay={100}>
                <div className="relative photo-hover">
                  <img
                    src={courseFacts.hero}
                    alt="Royal Harare 9th fairway"
                    loading="lazy"
                    className="w-full aspect-[4/3] object-cover object-center"
                    onError={(e) => (e.currentTarget.style.display = 'none')}
                  />
                  <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1.5 label-xs font-bold">
                    THE 9TH FAIRWAY
                  </div>
                  <div className="absolute bottom-4 right-4 bg-navy-950/90 backdrop-blur-sm text-white px-3 py-2">
                    <span className="label-xs text-orange-400">PAR <CountUp to={4} duration={900} /> · <CountUp to={385} duration={1200} />M</span>
                  </div>
                </div>
              </SectionReveal>

              <div className="mt-5 grid grid-cols-2 gap-5">
                <SectionReveal delay={150} className="photo-hover">
                  <img src="/images/clubhouse.jpg" alt="Clubhouse" loading="lazy" className="w-full aspect-square object-cover object-center" onError={(e) => (e.currentTarget.style.display = 'none')} />
                </SectionReveal>
                <SectionReveal delay={200} className="photo-hover">
                  <img src="/images/wide-action.jpg" alt="Wide fairway action" loading="lazy" className="w-full aspect-square object-cover" style={{ objectPosition: 'center center' }} onError={(e) => (e.currentTarget.style.display = 'none')} />
                </SectionReveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
           SECTION 05 — PRIZE LADDER (with flags)
      ================================================================ */}
      <section className="relative py-14 sm:py-20 lg:py-28 bg-steel-50">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <SectionReveal>
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-12">
              <div>
                <p className="label-xs text-orange-500 mb-4">05 / PRIZE LADDER</p>
                <h2 className="font-display uppercase text-navy-900 leading-[0.9]" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
                  WIN<br />
                  <span className="text-orange-500">BIG.</span>
                </h2>
              </div>
              <p className="max-w-md text-steel-700 text-sm sm:text-base rich-copy">
                Three tiers of reward across the season — culminating in the grand prize flight
                to the <a href="https://www.suninternational.com/sun-city/" target="_blank" rel="noopener noreferrer" className="prose-link">Nedbank Golf Challenge at Sun City</a>.
              </p>
            </div>
          </SectionReveal>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12 } },
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6"
          >
            {prizeLadder.map((p, i) => (
              <motion.div
                key={p.title}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
                }}
              >
                <TiltWrap className="h-full">
                <Link
                  to="/event"
                  onClick={() => haptic()}
                  className={`press-physics group relative block h-full p-6 sm:p-8 lg:p-10 border-2 transition-all duration-300 hover:-translate-y-1 ${
                    p.accent === 'orange'
                      ? 'bg-orange-500 text-white border-orange-500 hover:shadow-[6px_6px_0_0_#0B0A19]'
                      : p.accent === 'navy'
                      ? 'bg-navy-900 text-white border-navy-900 hover:shadow-[6px_6px_0_0_#E87722]'
                      : 'bg-white text-navy-900 border-navy-900 hover:shadow-[6px_6px_0_0_#E87722]'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <p className="label-xs opacity-80">{p.position}</p>
                    <GolfFlag
                      planted={false}
                      color={p.accent === 'orange' ? 'white' : 'var(--color-orange-500)'}
                      pinColor={p.accent === 'orange' ? 'white' : p.accent === 'navy' ? 'var(--color-orange-400)' : 'var(--color-navy-900)'}
                      size={44}
                      flutter
                      className="group-hover:[transform:rotate(0deg)]"
                    />
                  </div>
                  <h3 className="font-display text-3xl sm:text-4xl uppercase leading-[0.95] mb-6">
                    {p.title}
                  </h3>
                  <p className="font-semibold mb-2">{p.reward}</p>
                  <p className="label-xs opacity-70 mb-6">{p.destination}</p>
                  <p className="text-sm opacity-90 leading-relaxed">{p.detail}</p>

                  <span className="mt-6 inline-flex items-center gap-1 label-xs font-bold opacity-0 group-hover:opacity-100 transition">
                    READ MORE <ArrowRight size={12} weight="bold" />
                  </span>

                  {p.accent === 'orange' && (
                    <div className="absolute -top-4 right-4 bg-navy-950 text-orange-500 px-3 py-1 label-xs font-bold animate-pulse-ring">
                      <Trophy size={14} weight="fill" className="inline mr-1" />
                      GRAND PRIZE
                    </div>
                  )}
                </Link>
                </TiltWrap>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <FrameRule />

      {/* ================================================================
           SECTION 06 — ELIGIBILITY
      ================================================================ */}
      <section className="relative py-14 sm:py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-12 gap-6 sm:gap-8">
            <div className="col-span-12 lg:col-span-5">
              <SectionReveal>
                <p className="label-xs text-orange-500 mb-4">06 / ELIGIBILITY</p>
                <h2 className="font-display uppercase text-navy-900 leading-[0.9]" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
                  {eligibility.headline}
                </h2>
                <p className="mt-5 text-steel-600 rich-copy">
                  Who can run the race — see <Link to="/conditions#eligibility" className="prose-link">Tournament Conditions §03</Link> for
                  the full rules.
                </p>
              </SectionReveal>
            </div>
            <div className="col-span-12 lg:col-span-7">
              <ul className="space-y-0">
                {eligibility.bullets.map((b, i) => (
                  <SectionReveal key={i} delay={i * 60}>
                    <li>
                      <Link
                        to="/conditions"
                        className="group flex items-start gap-5 py-4 border-b-2 border-steel-100 hover:bg-steel-50 transition -mx-2 px-2"
                      >
                        <div className="scoreboard-num text-2xl sm:text-3xl text-orange-500 tabular-nums shrink-0 w-14">
                          <CountUp to={i + 1} pad={2} duration={1000} />
                        </div>
                        <p className="text-base sm:text-lg text-navy-900 pt-1 leading-relaxed flex-1 group-hover:text-orange-600 transition">{b}</p>
                        <ArrowRight size={18} weight="bold" className="text-steel-300 group-hover:text-orange-500 group-hover:translate-x-1 transition shrink-0 mt-2" />
                      </Link>
                    </li>
                  </SectionReveal>
                ))}
              </ul>

              <SectionReveal delay={500}>
                <Link
                  to="/conditions"
                  className="mt-8 inline-flex items-center gap-2 label-xs font-bold text-navy-900 hover:text-orange-500 border-b-2 border-navy-900 hover:border-orange-500 pb-1 transition"
                >
                  FULL TOURNAMENT CONDITIONS <ArrowRight size={14} weight="bold" />
                </Link>
              </SectionReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
           SECTION 07 — GALLERY STRIP
      ================================================================ */}
      <section className="relative py-14 sm:py-20 bg-navy-950 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <SectionReveal>
            <div className="flex items-end justify-between gap-6 mb-10">
              <div>
                <p className="label-xs text-orange-500 mb-4">07 / ON THE GRID</p>
                <h2 className="font-display uppercase text-white leading-[0.9]" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
                  INSIDE<br />THE RACE.
                </h2>
                <p className="mt-4 text-steel-300 text-sm max-w-xl rich-copy">
                  <CountUp to={gallery.length} duration={1400} className="!text-orange-400 font-semibold" />{' '}
                  frames from past seasons. Head to <Link to="/media" className="prose-link !text-orange-400">the gallery</Link> for the full set.
                </p>
              </div>
              <Link
                to="/media"
                className="hidden sm:inline-flex items-center gap-2 label-xs font-bold text-white hover:text-orange-500 border-b-2 border-white hover:border-orange-500 pb-1 transition"
              >
                FULL GALLERY <ArrowRight size={14} weight="bold" />
              </Link>
            </div>
          </SectionReveal>
        </div>

        <div className="overflow-x-auto no-scrollbar">
          <div className="flex gap-4 sm:gap-6 px-5 sm:px-8 lg:px-12 pb-4">
            {gallery.filter((g) => !WATERMARKED.has(g.src)).slice(0, 10).map((g, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="relative shrink-0 w-[260px] sm:w-[340px] photo-hover"
              >
                <img
                  src={g.src}
                  alt={g.caption}
                  loading="lazy"
                  className="w-full aspect-[4/5] object-cover"
                  style={{ objectPosition: 'right center' }}
                  onError={(e) => (e.currentTarget.style.display = 'none')}
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-navy-950 to-transparent">
                  <p className="label-xs text-orange-400 mb-1">{g.category}</p>
                  <p className="text-white text-sm">{g.caption}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 mt-8 sm:hidden">
          <Link
            to="/media"
            className="inline-flex items-center gap-2 label-xs font-bold text-white hover:text-orange-500 border-b-2 border-white hover:border-orange-500 pb-1 transition"
          >
            MEDIA CENTER <ArrowRight size={14} weight="bold" />
          </Link>
        </div>
      </section>

      {/* ================================================================
           PARTNERSHIP MARQUEE — quiet procession
      ================================================================ */}
      <PartnershipMarquee />

      {/* ================================================================
           SECTION 08 — CTA
      ================================================================ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/caddie-flags-fairway.jpg"
            alt=""
            loading="lazy"
            className="w-full h-full object-cover object-center"
            onError={(e) => (e.currentTarget.style.display = 'none')}
          />
          <div className="absolute inset-0 bg-navy-950/70" />
        </div>

        <div className="relative max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-20 sm:py-28 lg:py-36">
          <div className="max-w-3xl">
            <p className="label-xs text-orange-400 mb-6">08 / TAKE YOUR SHOT</p>
            <h2 className="font-display uppercase text-white leading-[0.88] text-balance" style={{ fontSize: 'clamp(2.5rem, 8vw, 7rem)' }}>
              BOOK YOUR<br />
              <span className="text-orange-500">TEE-TIME.</span>
            </h2>
            <p className="mt-6 sm:mt-8 text-steel-200 text-lg max-w-xl rich-copy">
              Pick a lane. Lock a wave. Let's put you on the grid for the{' '}
              <Link to="/calendar" className="prose-link !text-orange-400">next qualifier</Link> at Royal Harare.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/register"
                className="inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-400 text-white px-8 py-5 label-xs font-bold transition clip-arrow-right"
              >
                REGISTER NOW <ArrowRight size={18} weight="bold" />
              </Link>
              <a
                href={business.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 border-2 border-white text-white hover:border-orange-500 hover:text-orange-500 px-8 py-5 label-xs font-bold transition"
              >
                <WhatsappLogo size={18} weight="fill" />
                WHATSAPP THE DESK
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
