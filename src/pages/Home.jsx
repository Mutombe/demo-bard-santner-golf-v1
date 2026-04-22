import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, ArrowUpRight, Lightning, MapPin, Trophy, Flag,
  Calendar as CalIcon, Users, Target, Clock, Envelope, WhatsappLogo
} from '@phosphor-icons/react';

import PageTransition from '../components/PageTransition';
import SectionReveal from '../components/SectionReveal';
import Countdown from '../components/Countdown';
import StatCounter from '../components/StatCounter';
import TournamentRow from '../components/TournamentRow';
import EventCard from '../components/EventCard';
import SEO from '../components/SEO';
import {
  business, calendar, eventStats, courseFacts, prizeLadder,
  partnership, sponsors, gallery, eligibility
} from '../data/siteData';

function nextRoundIndex() {
  const now = new Date();
  return calendar.findIndex((r) => new Date(r.date + 'T07:00:00+02:00') > now);
}

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
           HERO — kinetic scoreboard + countdown
      ================================================================ */}
      <section className="relative min-h-[calc(100svh-4rem)] bg-navy-950 text-white overflow-hidden pt-16 sm:pt-20">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/images/flags-fairway.jpg"
            alt=""
            loading="eager"
            fetchPriority="high"
            className="w-full h-full object-cover object-center opacity-50"
            onError={(e) => (e.currentTarget.style.display = 'none')}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-950/80 via-navy-950/60 to-navy-950/95" />
          <div className="absolute inset-0 grid-lines opacity-40" />
        </div>

        {/* Top status bar */}
        <div className="relative border-b border-white/10">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-3 flex items-center justify-between text-[11px] tracking-[0.2em] uppercase font-mono">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 bg-orange-500 animate-pulse-dot" />
              <span className="text-orange-400">SEASON 2025 — LIVE</span>
            </div>
            <div className="hidden sm:flex items-center gap-6 text-steel-300">
              <span>ROYAL HARARE · ZW</span>
              <span className="hidden md:inline">LAT -17.80 · LON 31.07</span>
              <span>{new Date().toUTCString().slice(5, 16)}</span>
            </div>
          </div>
        </div>

        {/* Hero body */}
        <div className="relative max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pt-10 sm:pt-16 pb-10 sm:pb-16">
          <div className="grid grid-cols-12 gap-6 sm:gap-8">
            {/* Left — title */}
            <div className="col-span-12 lg:col-span-7">
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="label-xs text-orange-500 mb-4 sm:mb-6"
              >
                BARD SANTNER LOYALTY EVENT // EDITION 2025
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-display uppercase leading-[0.88] text-balance"
                style={{ fontSize: 'clamp(3.2rem, 11vw, 10rem)' }}
              >
                ROAD
                <br />
                TO <span className="text-orange-500">S.A.</span>
                <br />
                GOLF<br />
                <span className="inline-flex items-baseline">
                  CHALLENGE
                </span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4"
              >
                <Link
                  to="/register"
                  className="group inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-400 text-white px-6 sm:px-8 py-4 sm:py-5 label-xs font-bold transition clip-arrow-right"
                >
                  BOOK YOUR TEE-TIME
                  <ArrowRight size={18} weight="bold" className="group-hover:translate-x-1 transition" />
                </Link>
                <Link
                  to="/calendar"
                  className="inline-flex items-center gap-3 border-2 border-white text-white hover:border-orange-500 hover:text-orange-500 px-6 sm:px-8 py-4 sm:py-5 label-xs font-bold transition"
                >
                  9-ROUND CALENDAR
                </Link>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-8 max-w-xl text-steel-200 text-base sm:text-lg leading-relaxed"
              >
                Nine qualifying rounds. Eleven months of stableford. One all-expenses-paid
                seat to watch the <span className="text-white font-semibold">Nedbank Golf Challenge</span> at Sun City.
                Play seven. Rank top. Fly south.
              </motion.p>
            </div>

            {/* Right — scoreboard panel */}
            <div className="col-span-12 lg:col-span-5 mt-6 lg:mt-4">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-navy-900/70 backdrop-blur-md border-2 border-white/15 p-6 sm:p-8"
              >
                <Countdown />

                <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-3 gap-4">
                  <div>
                    <div className="scoreboard-label text-orange-400">ROUND</div>
                    <div className="scoreboard-num text-3xl sm:text-4xl mt-1">{String(calendar[nextIdx].round).padStart(2, '0')}</div>
                  </div>
                  <div>
                    <div className="scoreboard-label text-orange-400">PAR</div>
                    <div className="scoreboard-num text-3xl sm:text-4xl mt-1">72</div>
                  </div>
                  <div>
                    <div className="scoreboard-label text-orange-400">H.A.</div>
                    <div className="scoreboard-num text-3xl sm:text-4xl mt-1">75<span className="text-lg">%</span></div>
                  </div>
                </div>
              </motion.div>

              {/* Partnership strip */}
              <div className="mt-6 bg-white p-4 flex items-center justify-between gap-4">
                <img src="/logo.png" alt="Bard Santner Inc" className="h-8 sm:h-10 w-auto" onError={(e) => (e.currentTarget.style.display = 'none')} />
                <span className="label-xs text-steel-500 hidden sm:inline">×</span>
                <img src="/logo-royal-harare.png" alt="Royal Harare Golf Club" className="h-12 sm:h-14 w-auto" onError={(e) => (e.currentTarget.style.display = 'none')} />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 label-xs text-white/60 hidden sm:block">
          ↓ SCROLL
        </div>
      </section>

      {/* ================================================================
           KINETIC TICKER BAR
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
                <p className="label-xs text-orange-500 mb-4">01 / THE EVENT</p>
                <h2 className="font-display uppercase text-navy-900 leading-[0.9] text-balance" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
                  THE BARD SANTNER<br />
                  <span className="text-orange-500">LOYALTY EVENT.</span>
                </h2>
              </div>
              <div className="col-span-12 lg:col-span-6 lg:col-start-7">
                <p className="text-steel-700 text-lg leading-relaxed">
                  Eleven qualifying events between October 2024 and September 2025.
                  Medal Stableford at 75% Bard Santner handicap allowance. Your best seven scores
                  accumulate on the Order of Merit. When the final card lands in November,
                  the leader flies to Sun City for the Nedbank Golf Challenge — courtesy of
                  Bard Santner Inc.
                </p>
              </div>
            </div>
          </SectionReveal>

          <SectionReveal delay={100}>
            <div className="mt-14 sm:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10">
              {eventStats.map((s) => (
                <StatCounter key={s.label} value={s.value} label={s.label} sub={s.sub} />
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ================================================================
           SECTION 02 — THE CALENDAR (leaderboard-style rows)
      ================================================================ */}
      <section className="relative py-14 sm:py-20 lg:py-28 bg-steel-50">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <SectionReveal>
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-10">
              <div>
                <p className="label-xs text-orange-500 mb-4">02 / THE CALENDAR</p>
                <h2 className="font-display uppercase text-navy-900 leading-[0.9]" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
                  9 ROUNDS.<br />
                  <span className="text-orange-500">ONE ORDER OF MERIT.</span>
                </h2>
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
                <p className="font-mono text-orange-500 label-xs mb-6">{courseFacts.est} · PAR {courseFacts.par} · {courseFacts.length}</p>
                <p className="text-steel-700 leading-relaxed mb-8">
                  {courseFacts.description}
                </p>
                <Link
                  to="/course"
                  className="inline-flex items-center gap-2 label-xs font-bold text-navy-900 hover:text-orange-500 border-b-2 border-navy-900 hover:border-orange-500 pb-1 transition"
                >
                  WALK THE FAIRWAYS <ArrowRight size={14} weight="bold" />
                </Link>

                <div className="mt-10 grid grid-cols-3 gap-4 pt-8 border-t-2 border-navy-900">
                  <div>
                    <div className="scoreboard-num text-4xl text-navy-900 tabular-nums">{courseFacts.holes}</div>
                    <div className="label-xs text-steel-500 mt-1">HOLES</div>
                  </div>
                  <div>
                    <div className="scoreboard-num text-4xl text-navy-900 tabular-nums">{courseFacts.courseRating}</div>
                    <div className="label-xs text-steel-500 mt-1">RATING</div>
                  </div>
                  <div>
                    <div className="scoreboard-num text-4xl text-navy-900 tabular-nums">{courseFacts.slope}</div>
                    <div className="label-xs text-steel-500 mt-1">SLOPE</div>
                  </div>
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
                    <span className="label-xs text-orange-400">PAR 4 · 385M</span>
                  </div>
                </div>
              </SectionReveal>

              <div className="mt-5 grid grid-cols-2 gap-5">
                <SectionReveal delay={150} className="photo-hover">
                  <img src="/images/clubhouse.jpg" alt="Clubhouse" loading="lazy" className="w-full aspect-square object-cover object-center" onError={(e) => (e.currentTarget.style.display = 'none')} />
                </SectionReveal>
                <SectionReveal delay={200} className="photo-hover">
                  <img src="/images/flag-sunset.jpg" alt="Flag at sunset" loading="lazy" className="w-full aspect-square object-cover object-center" onError={(e) => (e.currentTarget.style.display = 'none')} />
                </SectionReveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
           SECTION 05 — PRIZE LADDER
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
              <p className="max-w-md text-steel-700 text-sm sm:text-base">
                Three tiers of reward across the season — culminating in the grand
                prize flight to the Nedbank Golf Challenge at Sun City.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {prizeLadder.map((p, i) => (
              <SectionReveal key={p.title} delay={i * 100}>
                <div
                  className={`relative h-full p-6 sm:p-8 lg:p-10 border-2 ${
                    p.accent === 'orange'
                      ? 'bg-orange-500 text-white border-orange-500'
                      : p.accent === 'navy'
                      ? 'bg-navy-900 text-white border-navy-900'
                      : 'bg-white text-navy-900 border-navy-900'
                  }`}
                >
                  <p className="label-xs opacity-80 mb-2">{p.position}</p>
                  <h3 className="font-display text-3xl sm:text-4xl uppercase leading-[0.95] mb-6">
                    {p.title}
                  </h3>
                  <p className="font-semibold mb-2">{p.reward}</p>
                  <p className="label-xs opacity-70 mb-6">{p.destination}</p>
                  <p className="text-sm opacity-90 leading-relaxed">{p.detail}</p>

                  {p.accent === 'orange' && (
                    <div className="absolute -top-4 right-4 bg-navy-950 text-orange-500 px-3 py-1 label-xs font-bold">
                      <Trophy size={14} weight="fill" className="inline mr-1" />
                      GRAND PRIZE
                    </div>
                  )}
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

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
              </SectionReveal>
            </div>
            <div className="col-span-12 lg:col-span-7">
              <ul className="space-y-0">
                {eligibility.bullets.map((b, i) => (
                  <SectionReveal key={i} delay={i * 60}>
                    <li className="flex items-start gap-5 py-4 border-b-2 border-steel-100">
                      <div className="scoreboard-num text-2xl sm:text-3xl text-orange-500 tabular-nums shrink-0 w-14">
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      <p className="text-base sm:text-lg text-navy-900 pt-1 leading-relaxed">{b}</p>
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
              </div>
              <Link
                to="/media"
                className="hidden sm:inline-flex items-center gap-2 label-xs font-bold text-white hover:text-orange-500 border-b-2 border-white hover:border-orange-500 pb-1 transition"
              >
                MEDIA CENTER <ArrowRight size={14} weight="bold" />
              </Link>
            </div>
          </SectionReveal>
        </div>

        <div className="overflow-x-auto no-scrollbar">
          <div className="flex gap-4 sm:gap-6 px-5 sm:px-8 lg:px-12 pb-4">
            {gallery.slice(0, 10).map((g, i) => (
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
                  className="w-full aspect-[4/5] object-cover object-center"
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
            <p className="mt-6 sm:mt-8 text-steel-200 text-lg max-w-xl">
              Pick a lane. Lock a wave. Let's put you on the grid for the next qualifier at Royal Harare.
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
