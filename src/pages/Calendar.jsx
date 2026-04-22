import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar as CalIcon } from '@phosphor-icons/react';
import PageTransition from '../components/PageTransition';
import SectionReveal from '../components/SectionReveal';
import TournamentRow from '../components/TournamentRow';
import EventCard from '../components/EventCard';
import Countdown from '../components/Countdown';
import SEO from '../components/SEO';
import { calendar } from '../data/siteData';

function nextRoundIndex() {
  const now = new Date();
  return calendar.findIndex((r) => new Date(r.date + 'T07:00:00+02:00') > now);
}

export default function Calendar() {
  const nextIdx = useMemo(() => {
    const i = nextRoundIndex();
    return i === -1 ? calendar.length - 1 : i;
  }, []);

  return (
    <PageTransition>
      <SEO title="Calendar — 9 Rounds at Royal Harare 2025" description="The full nine-round calendar for the Bard Santner Road to S.A. Golf Challenge 2025." />

      {/* Hero with countdown */}
      <section className="relative bg-navy-950 text-white pt-24 sm:pt-32 pb-14 sm:pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-lines opacity-30" />
        <div className="relative max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-12 gap-6 sm:gap-8">
            <div className="col-span-12 lg:col-span-7">
              <p className="label-xs text-orange-500 mb-4"><span className="animate-keyline">03 / CALENDAR</span></p>
              <h1 className="font-display uppercase leading-[0.88] text-balance" style={{ fontSize: 'clamp(3rem, 9vw, 9rem)' }}>
                NINE<br />
                ROUNDS.<br />
                <span className="text-orange-500">ONE SEASON.</span>
              </h1>
              <p className="mt-6 max-w-xl text-steel-300 text-lg">
                Your full 2025 schedule at Royal Harare. Play seven of the eleven qualifying
                events to stay in the running for Sun City.
              </p>
            </div>
            <div className="col-span-12 lg:col-span-5 flex items-end">
              <div className="w-full bg-navy-900/70 border-2 border-white/15 backdrop-blur-md p-6 sm:p-8">
                <Countdown />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full leaderboard */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="border-2 border-navy-900 bg-white">
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

      {/* Card grid */}
      <section className="py-14 sm:py-20 bg-steel-50">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <SectionReveal>
            <p className="label-xs text-orange-500 mb-4"><span className="animate-keyline">AT A GLANCE</span></p>
            <h2 className="font-display uppercase text-navy-900 leading-[0.9] mb-10" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
              EVERY ROUND.
            </h2>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {calendar.map((r, i) => (
              <SectionReveal key={r.round} delay={i * 40}>
                <EventCard round={r} isNext={i === nextIdx} />
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-950 text-white py-14 sm:py-20">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <p className="label-xs text-orange-500 mb-6">LOCK YOUR ROUNDS</p>
          <h2 className="font-display uppercase leading-[0.88] mb-8" style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)' }}>
            STAY IN<br />
            <span className="text-orange-500">THE RACE.</span>
          </h2>
          <Link to="/register" className="inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-400 text-white px-8 py-5 label-xs font-bold transition clip-arrow-right">
            REGISTER FOR NEXT ROUND <ArrowRight size={18} weight="bold" />
          </Link>
        </div>
      </section>
    </PageTransition>
  );
}
