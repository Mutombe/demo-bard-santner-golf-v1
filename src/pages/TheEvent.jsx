import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Trophy, Target, Flag, Lightning, CaretDown } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import SectionReveal from '../components/SectionReveal';
import StatCounter from '../components/StatCounter';
import CountUp from '../components/CountUp';
import GolfFlag from '../components/GolfFlag';
import SEO from '../components/SEO';
import { business, eventStats, partnership, faq, eligibility } from '../data/siteData';
import { haptic } from '../lib/haptics';

export default function TheEvent() {
  const [hoveredFlag, setHoveredFlag] = useState(null);

  const qualifyingSteps = [
    { n: '01', h: 'ENTER', b: 'Register by 5:00pm Wednesday before each round.', icon: Flag, to: '/register', link: 'Register here' },
    { n: '02', h: 'PLAY', b: 'Medal Stableford at 75% Bard Santner handicap allowance.', icon: Target, to: '/conditions#format', link: 'Full format rules' },
    { n: '03', h: 'ACCUMULATE', b: 'Your best 7 scores from 11 qualifying events stack on the Order of Merit.', icon: Lightning, to: '/calendar', link: 'See the calendar' },
    { n: '04', h: 'WIN', b: 'Leader on the Order of Merit (age 25+, 7+ rounds) wins Sun City.', icon: Trophy, to: '/event#nedbank', link: 'About the prize' },
  ];

  return (
    <PageTransition>
      <SEO title="The Event — Bard Santner Road to S.A. Golf Challenge" description="Eleven rounds, seven best scores, one Sun City prize. Inside the Bard Santner Loyalty Event." />

      {/* Hero */}
      <section className="relative bg-navy-950 text-white pt-24 sm:pt-32 pb-14 sm:pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/trophy-presentation.jpg" alt="" loading="eager" className="w-full h-full object-cover object-center opacity-40" onError={(e) => (e.currentTarget.style.display = 'none')} />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-950/80 to-navy-950" />
          <div className="absolute inset-0 grid-lines opacity-30" />
        </div>
        <div className="relative max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <p className="label-xs text-orange-500 mb-4"><span className="animate-keyline">01 / THE EVENT</span></p>
          <h1 className="font-display uppercase leading-[0.88] text-balance" style={{ fontSize: 'clamp(2.5rem, 8vw, 8rem)' }}>
            THE LOYALTY<br /><span className="text-orange-500">EVENT.</span>
          </h1>
          <p className="mt-6 max-w-3xl text-steel-200 text-lg sm:text-xl leading-relaxed rich-copy">
            A season-long celebration of <Link to="/course" className="prose-link !text-orange-400">Royal Harare membership</Link> —
            structured like a championship season, played like a Monday medal,
            contested like a major. This is the road to <a href="https://www.suninternational.com/sun-city/" target="_blank" rel="noopener noreferrer" className="prose-link !text-orange-400">Sun City</a>.
          </p>
        </div>
      </section>

      {/* Read key points */}
      <section className="bg-white pt-10 sm:pt-14">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="key-points">
            <span className="kp-label">READ KEY POINTS — 30-SECOND BRIEF</span>
            <ul>
              <li>Nine qualifying rounds across 2025 at Royal Harare Golf Club.</li>
              <li>Medal Stableford at 75% Bard Santner handicap allowance.</li>
              <li>Play at least seven of eleven events to qualify for the grand prize.</li>
              <li>Grand prize: all-expenses-paid trip to the Nedbank Golf Challenge, Sun City.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10">
            {eventStats.map((s, i) => {
              const to = i === 0 ? '/calendar' : i === 1 ? '/register' : i === 2 ? '/conditions' : '/event';
              return (
                <Link key={s.label} to={to} className="group block relative">
                  <StatCounter {...s} />
                  <span className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition text-orange-500">
                    <ArrowRight size={20} weight="bold" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4 Ways to Qualify — with golf-flag plant-on-hover */}
      <section className="py-14 sm:py-20 bg-steel-50">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <SectionReveal>
            <p className="label-xs text-orange-500 mb-4">02 / FOUR WAYS TO QUALIFY</p>
            <h2 className="font-display uppercase text-navy-900 leading-[0.9] mb-4" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
              FOUR<br /><span className="text-orange-500">MOVES.</span>
            </h2>
            <p className="mt-3 max-w-2xl text-steel-600 text-base rich-copy mb-12">
              Every round plays the same way. Plant your flag, play your card, stack the points.
              Read the <Link to="/conditions" className="prose-link">Tournament Conditions</Link> for
              every comma — or <Link to="/register" className="prose-link">book your slot</Link> and move straight to the tee.
            </p>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {qualifyingSteps.map((step, i) => {
              const Icon = step.icon;
              const planted = hoveredFlag === i;
              return (
                <SectionReveal key={step.n} delay={i * 80}>
                  <Link
                    to={step.to}
                    onMouseEnter={() => setHoveredFlag(i)}
                    onMouseLeave={() => setHoveredFlag(null)}
                    onFocus={() => setHoveredFlag(i)}
                    onBlur={() => setHoveredFlag(null)}
                    className="group bg-white border-2 border-navy-900 p-6 h-full block transition-all duration-300 hover:-translate-y-1 hover:shadow-[6px_6px_0_0_#E87722] relative"
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className="scoreboard-num text-5xl text-orange-500 tabular-nums">
                        <CountUp to={Number(step.n)} pad={2} duration={1200} />
                      </div>
                      <GolfFlag planted={planted} size={50} flutter={planted} />
                    </div>
                    <h3 className="font-display text-2xl uppercase text-navy-900 mb-3 group-hover:text-orange-600 transition">{step.h}</h3>
                    <p className="text-sm text-steel-700 leading-relaxed">{step.b}</p>
                    <div className="mt-4 flex items-center gap-2 text-sm">
                      <Icon size={16} weight="duotone" className="text-orange-500" />
                      <span className="label-xs text-orange-500 group-hover:underline underline-offset-4">
                        {step.link}
                      </span>
                      <ArrowRight size={14} weight="bold" className="text-orange-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition" />
                    </div>
                  </Link>
                </SectionReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Prize section — two framed cards with pulsing corner accents */}
      <section id="nedbank" className="py-14 sm:py-20 bg-navy-950 text-white">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <SectionReveal>
            <p className="label-xs text-orange-500 mb-4">03 / THE PRIZE LADDER</p>
            <h2 className="font-display uppercase leading-[0.9] mb-4" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
              TWO PRIZES.<br /><span className="text-orange-500">ONE SEASON.</span>
            </h2>
            <p className="mt-3 max-w-2xl text-steel-300 text-base rich-copy mb-12">
              Play <CountUp to={3} className="!text-orange-400 font-semibold" duration={900} /> rounds and you're on the list for
              the <a href="https://www.southafricanopen.com" target="_blank" rel="noopener noreferrer" className="prose-link !text-orange-400">Investec SA Open</a>.
              Play <CountUp to={8} className="!text-orange-400 font-semibold" duration={900} /> rounds and you're eyeing the{' '}
              <a href="https://www.suninternational.com/sun-city/" target="_blank" rel="noopener noreferrer" className="prose-link !text-orange-400">Nedbank Challenge</a>.
            </p>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {/* SA Open */}
            <motion.div
              id="sa-open"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="relative bg-navy-900 border-2 border-orange-500/40 p-6 sm:p-8 lg:p-10 group overflow-hidden"
            >
              <span className="absolute top-0 left-0 h-2 w-2 bg-orange-500 group-hover:animate-pulse-dot transition" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-orange-500 group-hover:animate-pulse-dot transition" />
              <span className="absolute bottom-0 left-0 h-2 w-2 bg-orange-500 group-hover:animate-pulse-dot transition" />
              <span className="absolute bottom-0 right-0 h-2 w-2 bg-orange-500 group-hover:animate-pulse-dot transition" />

              <p className="label-xs text-orange-400 mb-3">UNLOCKS AT <CountUp to={3} className="!text-white font-bold" /> ROUNDS</p>
              <h3 className="font-display text-3xl sm:text-4xl uppercase mb-4">INVESTEC SA OPEN</h3>
              <p className="text-steel-300 leading-relaxed mb-6 rich-copy">
                One of the{' '}
                <a href="https://www.europeantour.com/dpworld-tour/" target="_blank" rel="noopener noreferrer" className="prose-link !text-orange-400">
                  DP World Tour's
                </a>{' '}
                oldest championships — a co-sanctioned event with a fierce local field. Your
                loyalty across <Link to="/calendar" className="prose-link !text-orange-400">three qualifying rounds</Link> opens the door.
              </p>
              <p className="scoreboard-num text-5xl text-orange-500 tabular-nums">
                <CountUp to={3} pad={2} duration={1200} /><span className="text-lg text-steel-400">/</span><CountUp to={9} pad={2} duration={1200} />
                <span className="label-xs text-steel-400 font-mono ml-3">ROUNDS MIN</span>
              </p>
            </motion.div>

            {/* Nedbank */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.12 }}
              className="relative bg-orange-500 text-white border-2 border-orange-500 p-6 sm:p-8 lg:p-10 group overflow-hidden"
            >
              <span className="absolute top-0 left-0 h-2 w-2 bg-white group-hover:animate-pulse-dot transition" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-white group-hover:animate-pulse-dot transition" />
              <span className="absolute bottom-0 left-0 h-2 w-2 bg-white group-hover:animate-pulse-dot transition" />
              <span className="absolute bottom-0 right-0 h-2 w-2 bg-white group-hover:animate-pulse-dot transition" />
              <span className="absolute -top-3 right-4 bg-navy-950 text-orange-500 px-3 py-1 label-xs font-bold animate-pulse-ring">
                <Trophy size={14} weight="fill" className="inline mr-1" />GRAND PRIZE
              </span>

              <p className="label-xs text-white/90 mb-3">UNLOCKS AT <CountUp to={8} className="!text-navy-950 font-bold" /> ROUNDS</p>
              <h3 className="font-display text-3xl sm:text-4xl uppercase mb-4">NEDBANK CHALLENGE</h3>
              <p className="text-white/95 leading-relaxed mb-6 rich-copy">
                Africa's Major — the{' '}
                <a href="https://www.suninternational.com/sun-city/" target="_blank" rel="noopener noreferrer" className="prose-link !text-white !underline-offset-4" style={{ textDecorationColor: 'rgba(255,255,255,0.7)' }}>Gary Player Country Club at Sun City</a>,
                every November. Flights, hotel, transfers, and grounds access — all on Bard Santner Inc.
                Play <CountUp to={8} /> of <CountUp to={9} /> rounds and you're in the frame.
              </p>
              <p className="scoreboard-num text-5xl text-navy-950 tabular-nums">
                <CountUp to={8} pad={2} duration={1400} /><span className="text-lg text-white/70">/</span><CountUp to={9} pad={2} duration={1400} />
                <span className="label-xs text-white/90 font-mono ml-3">ROUNDS MIN</span>
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partnership */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <SectionReveal>
            <p className="label-xs text-orange-500 mb-4">04 / PARTNERSHIP</p>
            <h2 className="font-display uppercase text-navy-900 leading-[0.9] mb-4" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
              TWO INSTITUTIONS.<br /><span className="text-orange-500">ONE MISSION.</span>
            </h2>
            <p className="mt-3 max-w-2xl text-steel-600 rich-copy mb-12">
              <a href="https://bardsantner.com" target="_blank" rel="noopener noreferrer" className="prose-link">Bard Santner Inc</a> and{' '}
              <a href="https://royalharare.co.zw" target="_blank" rel="noopener noreferrer" className="prose-link">Royal Harare Golf Club</a> — the
              partnership that built <Link to="/event" className="prose-link">this season</Link>.
            </p>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
            <SectionReveal>
              <div className="bg-navy-950 text-white p-8 lg:p-12 h-full">
                <div className="bg-white inline-block p-3 mb-6">
                  <img src={partnership.primary.logo} alt="Bard Santner" className="h-10 w-auto" onError={(e) => (e.currentTarget.style.display = 'none')} />
                </div>
                <h3 className="font-display text-3xl uppercase mb-4">{partnership.primary.name}</h3>
                <p className="text-steel-300 leading-relaxed mb-6 text-base sm:text-lg rich-copy">
                  A <a href="https://maps.google.com/?q=Zimbabwe+Harare" target="_blank" rel="noopener noreferrer" className="prose-link !text-orange-400">Zimbabwean</a> financial-services
                  firm — the title partner powering the Road to S.A. Golf Challenge.
                </p>
                <a href={partnership.primary.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-orange-500 label-xs font-bold border-b-2 border-orange-500 pb-1 hover:gap-4 transition-all">
                  VISIT BARDSANTNER.COM <ArrowRight size={14} weight="bold" />
                </a>
              </div>
            </SectionReveal>

            <SectionReveal delay={100}>
              <div className="bg-steel-50 p-8 lg:p-12 h-full border-2 border-navy-900">
                <div className="bg-white inline-block p-3 mb-6">
                  <img src={partnership.host.logo} alt="Royal Harare Golf Club" className="h-14 w-auto" onError={(e) => (e.currentTarget.style.display = 'none')} />
                </div>
                <h3 className="font-display text-3xl uppercase text-navy-900 mb-4">{partnership.host.name}</h3>
                <p className="text-steel-700 leading-relaxed mb-6 text-base sm:text-lg rich-copy">
                  Established <CountUp to={1898} from={1800} className="!text-orange-600 font-semibold" />. Eighteen championship holes
                  in the heart of <a href="https://maps.google.com/?q=Harare+Zimbabwe" target="_blank" rel="noopener noreferrer" className="prose-link">Harare</a>,
                  hosting every qualifying round of the race.
                </p>
                <Link to="/course" className="inline-flex items-center gap-2 text-navy-900 label-xs font-bold border-b-2 border-navy-900 pb-1 hover:gap-4 hover:text-orange-500 hover:border-orange-500 transition-all">
                  WALK THE COURSE <ArrowRight size={14} weight="bold" />
                </Link>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section id="eligibility" className="py-14 sm:py-20 bg-navy-950 text-white">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-12 gap-6 sm:gap-8">
            <div className="col-span-12 lg:col-span-5">
              <SectionReveal>
                <p className="label-xs text-orange-500 mb-4">05 / ELIGIBILITY</p>
                <h2 className="font-display uppercase leading-[0.9]" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
                  {eligibility.headline}
                </h2>
                <p className="mt-5 text-steel-300 rich-copy">
                  Six criteria — see <Link to="/conditions" className="prose-link !text-orange-400">Tournament Conditions §03</Link> for
                  the binding version.
                </p>
              </SectionReveal>
            </div>
            <div className="col-span-12 lg:col-span-7">
              <ul className="space-y-0">
                {eligibility.bullets.map((b, i) => (
                  <SectionReveal key={i} delay={i * 60}>
                    <li className="flex items-start gap-5 py-4 border-b-2 border-navy-800">
                      <div className="scoreboard-num text-2xl sm:text-3xl text-orange-500 tabular-nums shrink-0 w-14">
                        <CountUp to={i + 1} pad={2} duration={1000} />
                      </div>
                      <p className="text-base sm:text-lg text-white pt-1 leading-relaxed">{b}</p>
                    </li>
                  </SectionReveal>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12">
          <SectionReveal>
            <p className="label-xs text-orange-500 mb-4">06 / FAQ</p>
            <h2 className="font-display uppercase text-navy-900 leading-[0.9] mb-4" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
              <CountUp to={faq.length} className="!text-orange-500" duration={1200} /> QUESTIONS<br /><span className="text-orange-500">ANSWERED.</span>
            </h2>
            <p className="mt-3 text-steel-600 rich-copy mb-10">
              Can't find your question? <Link to="/contact" className="prose-link">WhatsApp the organiser</Link> — tournament weeks get same-day replies.
            </p>
          </SectionReveal>

          <div className="border-t-2 border-navy-900">
            {faq.map((item, i) => (
              <details key={i} onToggle={() => haptic.toggle()} className="group border-b-2 border-steel-200 py-4 sm:py-5">
                <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                  <span className="font-display text-xl sm:text-2xl uppercase text-navy-900 flex-1">
                    <span className="text-orange-500 font-mono text-sm mr-3">{String(i + 1).padStart(2, '0')}</span>
                    {item.q}
                  </span>
                  <CaretDown size={22} weight="bold" className="text-navy-900 transition-transform group-open:rotate-180 shrink-0 mt-1" />
                </summary>
                <p className="mt-4 ml-10 text-steel-700 leading-relaxed text-sm sm:text-base rich-copy">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/caddie-flags-fairway.jpg" alt="" loading="lazy" className="w-full h-full object-cover object-center" onError={(e) => (e.currentTarget.style.display = 'none')} />
          <div className="absolute inset-0 bg-navy-950/70" />
        </div>
        <div className="relative max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-20 sm:py-28">
          <p className="label-xs text-orange-400 mb-6">READY?</p>
          <h2 className="font-display uppercase text-white leading-[0.88] mb-8" style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)' }}>
            GET ON THE<br /><span className="text-orange-500">GRID.</span>
          </h2>
          <p className="text-steel-200 max-w-xl text-lg mb-8 rich-copy">
            Lock your next round. Pick your wave. We'll confirm by{' '}
            <a href={business.whatsapp} target="_blank" rel="noopener noreferrer" className="prose-link !text-orange-400">WhatsApp</a> within the hour.
          </p>
          <Link to="/register" className="inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-400 text-white px-8 py-5 label-xs font-bold transition clip-arrow-right">
            BOOK YOUR TEE-TIME <ArrowRight size={18} weight="bold" />
          </Link>
        </div>
      </section>
    </PageTransition>
  );
}
