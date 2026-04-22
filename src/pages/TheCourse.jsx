import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Flag, Target } from '@phosphor-icons/react';
import PageTransition from '../components/PageTransition';
import SectionReveal from '../components/SectionReveal';
import StatCounter from '../components/StatCounter';
import SEO from '../components/SEO';
import { courseFacts, gallery } from '../data/siteData';

export default function TheCourse() {
  const courseShots = gallery.filter((g) => g.category === 'Course').slice(0, 6);

  return (
    <PageTransition>
      <SEO title="The Course — Royal Harare Golf Club" description="Inside Royal Harare — Africa's grand 18-hole championship layout, est. 1898. The stage for the Bard Santner Road to S.A. Challenge." />

      {/* Hero */}
      <section className="relative min-h-[80vh] bg-navy-950 text-white pt-20 overflow-hidden flex items-end">
        <div className="absolute inset-0">
          <img src={courseFacts.hero} alt="Royal Harare 9th fairway" loading="eager" fetchPriority="high" className="w-full h-full object-cover object-center" onError={(e) => (e.currentTarget.style.display = 'none')} />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-transparent" />
        </div>
        <div className="relative w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-14 sm:py-20">
          <p className="label-xs text-orange-500 mb-4">02 / THE COURSE</p>
          <h1 className="font-display uppercase leading-[0.88]" style={{ fontSize: 'clamp(3rem, 10vw, 10rem)' }}>
            ROYAL<br /><span className="text-orange-500">HARARE.</span>
          </h1>
          <p className="mt-4 label-xs text-orange-400">{courseFacts.est} · PAR {courseFacts.par} · {courseFacts.length}</p>
        </div>
      </section>

      {/* Overview + stats */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-12 gap-6 sm:gap-10 mb-14 sm:mb-20">
            <div className="col-span-12 lg:col-span-5">
              <SectionReveal>
                <p className="label-xs text-orange-500 mb-4">EST. 1898</p>
                <h2 className="font-display uppercase text-navy-900 leading-[0.9]" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
                  A CENTURY<br />
                  <span className="text-orange-500">ON ONE SITE.</span>
                </h2>
              </SectionReveal>
            </div>
            <div className="col-span-12 lg:col-span-7">
              <SectionReveal delay={100}>
                <p className="text-steel-700 text-lg leading-relaxed">{courseFacts.description}</p>
                <div className="mt-4 flex items-center gap-3 text-sm text-steel-600">
                  <MapPin size={18} weight="fill" className="text-orange-500" />
                  <span>{courseFacts.location}</span>
                </div>
              </SectionReveal>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10">
            <StatCounter value={`${courseFacts.holes}`} label="HOLES" sub="Championship layout" />
            <StatCounter value={`${courseFacts.par}`} label="PAR" sub="Men's scorecard" />
            <StatCounter value={courseFacts.courseRating} label="RATING" sub="Royal course" />
            <StatCounter value={courseFacts.slope} label="SLOPE" sub="From the White tees" />
          </div>
        </div>
      </section>

      {/* Signature holes */}
      <section className="py-14 sm:py-20 bg-steel-50">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <SectionReveal>
            <p className="label-xs text-orange-500 mb-4">SIGNATURE HOLES</p>
            <h2 className="font-display uppercase text-navy-900 leading-[0.9] mb-12" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
              THREE THAT<br />
              <span className="text-orange-500">DEFINE THE ROUND.</span>
            </h2>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {courseFacts.signatureHoles.map((h, i) => (
              <SectionReveal key={h.name} delay={i * 100}>
                <div className="bg-white border-2 border-navy-900 overflow-hidden h-full">
                  <div className="relative photo-hover">
                    <img src={h.image} alt={h.name} loading="lazy" className="w-full aspect-[4/3] object-cover object-center" onError={(e) => (e.currentTarget.style.display = 'none')} />
                    <div className="absolute top-3 left-3 bg-orange-500 text-white px-3 py-1 label-xs font-bold">
                      PAR {h.par}
                    </div>
                  </div>
                  <div className="p-5 sm:p-6">
                    <h3 className="font-display text-2xl uppercase text-navy-900 mb-1">{h.name}</h3>
                    <p className="label-xs text-orange-500 mb-3">{h.length}</p>
                    <p className="text-sm text-steel-700 leading-relaxed">{h.note}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery grid */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <SectionReveal>
            <p className="label-xs text-orange-500 mb-4">THE COURSE IN PHOTOS</p>
            <h2 className="font-display uppercase text-navy-900 leading-[0.9] mb-10" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
              THE WALK.
            </h2>
          </SectionReveal>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
            {courseShots.map((g, i) => (
              <SectionReveal key={i} delay={i * 60} className="photo-hover">
                <img src={g.src} alt={g.caption} loading="lazy" className={`w-full object-cover object-center ${i % 3 === 1 ? 'aspect-[3/4]' : 'aspect-[4/3]'}`} onError={(e) => (e.currentTarget.style.display = 'none')} />
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/flags-fairway.jpg" alt="" loading="lazy" className="w-full h-full object-cover object-center" onError={(e) => (e.currentTarget.style.display = 'none')} />
          <div className="absolute inset-0 bg-navy-950/70" />
        </div>
        <div className="relative max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-20 sm:py-28">
          <p className="label-xs text-orange-400 mb-6">YOUR TURN</p>
          <h2 className="font-display uppercase text-white leading-[0.88] mb-8" style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)' }}>
            WALK THE<br />
            <span className="text-orange-500">FAIRWAYS.</span>
          </h2>
          <Link to="/register" className="inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-400 text-white px-8 py-5 label-xs font-bold transition clip-arrow-right">
            BOOK A ROUND <ArrowRight size={18} weight="bold" />
          </Link>
        </div>
      </section>
    </PageTransition>
  );
}
