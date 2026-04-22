import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, HouseSimple } from '@phosphor-icons/react';
import PageTransition from '../components/PageTransition';
import CountUp from '../components/CountUp';
import SEO from '../components/SEO';
import { business } from '../data/siteData';

export default function NotFound() {
  return (
    <PageTransition>
      <SEO title="Page Not Found — Bard Santner Road to S.A." description="The page you're looking for has rolled off the fairway." />

      <section className="min-h-[80vh] bg-navy-950 text-white flex items-center pt-20 relative overflow-hidden">
        <div className="absolute inset-0 grid-lines opacity-30" />
        <div className="relative max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 w-full">
          <p className="label-xs text-orange-500 mb-4">OUT OF BOUNDS</p>
          <h1 className="font-display uppercase leading-[0.85]" style={{ fontSize: 'clamp(5rem, 20vw, 20rem)' }}>
            <span className="text-orange-500"><CountUp to={404} duration={1400} /></span>
          </h1>
          <p className="font-display text-3xl sm:text-5xl uppercase mt-4 mb-8 text-balance">
            Page rolled into the rough.
          </p>
          <p className="text-steel-300 max-w-xl text-lg mb-10 rich-copy">
            The link you followed doesn't match a page on this site. Head back to the{' '}
            <Link to="/" className="prose-link !text-orange-400">scoreboard</Link>, take a lap through{' '}
            <Link to="/calendar" className="prose-link !text-orange-400">the calendar</Link>, or{' '}
            <a href={business.whatsapp} target="_blank" rel="noopener noreferrer" className="prose-link !text-orange-400">ping the organiser</a>.
          </p>

          <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
            <Link to="/" className="inline-flex items-center justify-center gap-3 bg-orange-500 hover:bg-orange-400 text-white px-6 py-4 min-h-[48px] label-xs font-bold transition">
              <HouseSimple size={18} weight="fill" /> BACK TO SCOREBOARD
            </Link>
            <Link to="/calendar" className="inline-flex items-center justify-center gap-2 border-2 border-white hover:border-orange-500 text-white hover:text-orange-500 px-6 py-4 min-h-[48px] label-xs font-bold transition">
              CALENDAR <ArrowRight size={16} weight="bold" />
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
