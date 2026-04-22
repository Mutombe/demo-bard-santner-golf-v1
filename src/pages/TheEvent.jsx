import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Trophy, Target, Flag, Lightning, CaretDown } from '@phosphor-icons/react';
import PageTransition from '../components/PageTransition';
import SectionReveal from '../components/SectionReveal';
import StatCounter from '../components/StatCounter';
import SEO from '../components/SEO';
import { business, eventStats, partnership, faq, eligibility } from '../data/siteData';

export default function TheEvent() {
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
          <p className="label-xs text-orange-500 mb-4">01 / THE EVENT</p>
          <h1 className="font-display uppercase leading-[0.88] text-balance" style={{ fontSize: 'clamp(2.5rem, 8vw, 8rem)' }}>
            THE LOYALTY<br /><span className="text-orange-500">EVENT.</span>
          </h1>
          <p className="mt-6 max-w-3xl text-steel-200 text-lg sm:text-xl leading-relaxed">
            A season-long celebration of Royal Harare membership — structured like a championship season,
            played like a Monday medal, contested like a major. This is the road to Sun City.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10">
            {eventStats.map((s) => (
              <StatCounter key={s.label} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-14 sm:py-20 bg-steel-50">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <SectionReveal>
            <p className="label-xs text-orange-500 mb-4">02 / HOW IT WORKS</p>
            <h2 className="font-display uppercase text-navy-900 leading-[0.9] mb-12" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
              FOUR<br /><span className="text-orange-500">MOVES.</span>
            </h2>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { n: '01', h: 'ENTER', b: 'Register by 5:00pm Wednesday before each round. Royal Harare members with HNA handicaps.', icon: Flag },
              { n: '02', h: 'PLAY', b: 'Medal Stableford at 75% Bard Santner handicap allowance. White tees (men), Red tees (women).', icon: Target },
              { n: '03', h: 'ACCUMULATE', b: 'Your best 7 scores from 11 qualifying events stack on the Order of Merit.', icon: Lightning },
              { n: '04', h: 'WIN', b: 'Leader on the Order of Merit (age 25+, 7+ rounds) wins the all-expenses-paid Sun City trip.', icon: Trophy },
            ].map((step, i) => {
              const Icon = step.icon;
              return (
                <SectionReveal key={step.n} delay={i * 80}>
                  <div className="bg-white border-2 border-navy-900 p-6 h-full">
                    <div className="flex items-start justify-between mb-6">
                      <div className="scoreboard-num text-5xl text-orange-500 tabular-nums">{step.n}</div>
                      <Icon size={28} weight="duotone" className="text-navy-900" />
                    </div>
                    <h3 className="font-display text-2xl uppercase text-navy-900 mb-3">{step.h}</h3>
                    <p className="text-sm text-steel-700 leading-relaxed">{step.b}</p>
                  </div>
                </SectionReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partnership */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <SectionReveal>
            <p className="label-xs text-orange-500 mb-4">03 / PARTNERSHIP</p>
            <h2 className="font-display uppercase text-navy-900 leading-[0.9] mb-12" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
              TWO INSTITUTIONS.<br /><span className="text-orange-500">ONE MISSION.</span>
            </h2>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
            <SectionReveal>
              <div className="bg-navy-950 text-white p-8 lg:p-12 h-full">
                <div className="bg-white inline-block p-3 mb-6">
                  <img src={partnership.primary.logo} alt="Bard Santner" className="h-10 w-auto" onError={(e) => (e.currentTarget.style.display = 'none')} />
                </div>
                <h3 className="font-display text-3xl uppercase mb-4">{partnership.primary.name}</h3>
                <p className="text-steel-300 leading-relaxed mb-6">{partnership.primary.description}</p>
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
                <p className="text-steel-700 leading-relaxed mb-6">{partnership.host.description}</p>
                <Link to="/course" className="inline-flex items-center gap-2 text-navy-900 label-xs font-bold border-b-2 border-navy-900 pb-1 hover:gap-4 hover:text-orange-500 hover:border-orange-500 transition-all">
                  WALK THE COURSE <ArrowRight size={14} weight="bold" />
                </Link>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="py-14 sm:py-20 bg-navy-950 text-white">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-12 gap-6 sm:gap-8">
            <div className="col-span-12 lg:col-span-5">
              <SectionReveal>
                <p className="label-xs text-orange-500 mb-4">04 / ELIGIBILITY</p>
                <h2 className="font-display uppercase leading-[0.9]" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
                  {eligibility.headline}
                </h2>
              </SectionReveal>
            </div>
            <div className="col-span-12 lg:col-span-7">
              <ul className="space-y-0">
                {eligibility.bullets.map((b, i) => (
                  <SectionReveal key={i} delay={i * 60}>
                    <li className="flex items-start gap-5 py-4 border-b-2 border-navy-800">
                      <div className="scoreboard-num text-2xl sm:text-3xl text-orange-500 tabular-nums shrink-0 w-14">
                        {String(i + 1).padStart(2, '0')}
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
            <p className="label-xs text-orange-500 mb-4">05 / FAQ</p>
            <h2 className="font-display uppercase text-navy-900 leading-[0.9] mb-10" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
              QUESTIONS<br /><span className="text-orange-500">ANSWERED.</span>
            </h2>
          </SectionReveal>

          <div className="border-t-2 border-navy-900">
            {faq.map((item, i) => (
              <details key={i} className="group border-b-2 border-steel-200 py-4 sm:py-5">
                <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                  <span className="font-display text-xl sm:text-2xl uppercase text-navy-900 flex-1">
                    <span className="text-orange-500 font-mono text-sm mr-3">{String(i + 1).padStart(2, '0')}</span>
                    {item.q}
                  </span>
                  <CaretDown size={22} weight="bold" className="text-navy-900 transition-transform group-open:rotate-180 shrink-0 mt-1" />
                </summary>
                <p className="mt-4 ml-10 text-steel-700 leading-relaxed text-sm sm:text-base">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/tee-off-jan2025.jpg" alt="" loading="lazy" className="w-full h-full object-cover object-center" onError={(e) => (e.currentTarget.style.display = 'none')} />
          <div className="absolute inset-0 bg-navy-950/70" />
        </div>
        <div className="relative max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-20 sm:py-28">
          <p className="label-xs text-orange-400 mb-6">READY?</p>
          <h2 className="font-display uppercase text-white leading-[0.88] mb-8" style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)' }}>
            GET ON THE<br /><span className="text-orange-500">GRID.</span>
          </h2>
          <Link to="/register" className="inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-400 text-white px-8 py-5 label-xs font-bold transition clip-arrow-right">
            BOOK YOUR TEE-TIME <ArrowRight size={18} weight="bold" />
          </Link>
        </div>
      </section>
    </PageTransition>
  );
}
