import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Envelope, MapPin, WhatsappLogo, Clock } from '@phosphor-icons/react';
import PageTransition from '../components/PageTransition';
import SectionReveal from '../components/SectionReveal';
import SEO from '../components/SEO';
import { business, contactBlocks } from '../data/siteData';

const iconFor = (t) => {
  if (t === 'phone') return Phone;
  if (t === 'email') return Envelope;
  return MapPin;
};

export default function Contact() {
  return (
    <PageTransition>
      <SEO title="Contact — Bard Santner Road to S.A. Golf Challenge" description="Reach the Bard Santner Tournament desk and Royal Harare Club office." />

      <section className="relative bg-navy-950 text-white pt-24 sm:pt-32 pb-14 sm:pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-lines opacity-40" />
        <div className="relative max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <p className="label-xs text-orange-500 mb-4"><span className="animate-keyline">08 / CONTACT</span></p>
          <h1 className="font-display uppercase leading-[0.88] text-balance" style={{ fontSize: 'clamp(2.5rem, 8vw, 8rem)' }}>
            TALK TO THE<br />
            <span className="text-orange-500">TOURNAMENT DESK.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-steel-300 text-lg">
            Entries, draws, prize queries, dietary updates. We reply fast — WhatsApp gets
            the quickest response during tournament weeks.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {contactBlocks.map((block, i) => {
              const Icon = iconFor(block.type);
              return (
                <SectionReveal key={block.label} delay={i * 80}>
                  <a
                    href={block.action}
                    target={block.type === 'location' ? '_blank' : undefined}
                    rel={block.type === 'location' ? 'noopener noreferrer' : undefined}
                    className="group block bg-white border-2 border-navy-900 p-6 sm:p-8 hover:bg-navy-950 hover:text-white transition-colors duration-300 h-full"
                  >
                    <div className="flex items-start justify-between mb-8">
                      <Icon size={32} weight="duotone" className="text-orange-500" />
                      <ArrowRight size={20} weight="bold" className="text-navy-900 group-hover:text-orange-500 group-hover:translate-x-1 transition" />
                    </div>
                    <p className="label-xs text-orange-500 mb-3">{block.label}</p>
                    <p className="font-display text-2xl sm:text-3xl uppercase text-navy-900 group-hover:text-white mb-2 leading-tight break-words">
                      {block.primary}
                    </p>
                    <p className="text-sm text-steel-600 group-hover:text-steel-300">{block.secondary}</p>
                  </a>
                </SectionReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* WhatsApp mega CTA — brand orange, not canonical green */}
      <section className="relative py-14 sm:py-20 bg-navy-950 text-white overflow-hidden">
        <div className="absolute inset-0 grid-lines opacity-30" />
        <div className="relative max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 mb-6">
            <WhatsappLogo size={20} weight="fill" />
            <span className="label-xs font-bold">LIVE · FASTEST CHANNEL</span>
          </div>
          <h2 className="font-display uppercase leading-[0.88] mb-6" style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)' }}>
            WHATSAPP THE<br />
            <span className="text-orange-500">ORGANISER.</span>
          </h2>
          <p className="text-steel-300 text-lg mb-8">
            Weekday replies within the hour. Tournament mornings: real-time.
          </p>
          <a
            href={business.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-400 text-white px-8 py-5 label-xs font-bold transition clip-arrow-right"
          >
            <WhatsappLogo size={20} weight="fill" />
            OPEN WHATSAPP
          </a>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="bg-white py-14 sm:py-20">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <SectionReveal>
            <p className="label-xs text-orange-500 mb-4">THE VENUE</p>
            <h2 className="font-display uppercase text-navy-900 leading-[0.9] mb-8" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
              FIND US.
            </h2>
          </SectionReveal>
          <div className="aspect-[16/9] border-2 border-navy-900 overflow-hidden">
            <iframe
              title="Royal Harare Golf Club"
              src="https://maps.google.com/maps?q=Royal%20Harare%20Golf%20Club&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
