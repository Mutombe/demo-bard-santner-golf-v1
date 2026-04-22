import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Phone, Envelope, MapPin, WhatsappLogo, Clock } from '@phosphor-icons/react';
import PageTransition from '../components/PageTransition';
import SectionReveal from '../components/SectionReveal';
import CountUp from '../components/CountUp';
import SEO from '../components/SEO';
import { business, contactBlocks } from '../data/siteData';

const iconFor = (t) => {
  if (t === 'phone') return Phone;
  if (t === 'email') return Envelope;
  return MapPin;
};

// SVG icons for channel toggle
function WhatsAppClubSvg({ active }) {
  return (
    <svg viewBox="0 0 64 64" width="56" height="56" aria-hidden="true" className={active ? 'animate-club-swing' : ''}>
      {/* Shaft */}
      <line x1="32" y1="56" x2="22" y2="14" stroke={active ? 'var(--color-orange-500)' : 'var(--color-navy-900)'} strokeWidth="2.2" strokeLinecap="round" />
      {/* Head — wedge */}
      <path d="M 22 14 L 16 8 L 10 16 L 16 22 Z" fill={active ? 'var(--color-orange-500)' : 'var(--color-navy-700)'} stroke="var(--color-navy-900)" strokeWidth="1" />
      {/* Grip */}
      <rect x="29" y="50" width="6" height="10" fill={active ? 'var(--color-navy-900)' : 'var(--color-steel-400)'} rx="2" />
    </svg>
  );
}

function EmailClubSvg({ active }) {
  return (
    <svg viewBox="0 0 64 64" width="56" height="56" aria-hidden="true" className={active ? 'animate-club-swing' : ''}>
      {/* Shaft */}
      <line x1="32" y1="56" x2="40" y2="18" stroke={active ? 'var(--color-orange-500)' : 'var(--color-navy-900)'} strokeWidth="2.2" strokeLinecap="round" />
      {/* Head — putter blade */}
      <rect x="36" y="14" width="16" height="6" rx="2" fill={active ? 'var(--color-orange-500)' : 'var(--color-navy-700)'} stroke="var(--color-navy-900)" strokeWidth="1" />
      {/* Golf ball */}
      <circle cx="48" cy="18" r="3" fill="white" stroke="var(--color-navy-900)" strokeWidth="0.8" />
      {/* Grip */}
      <rect x="29" y="50" width="6" height="10" fill={active ? 'var(--color-navy-900)' : 'var(--color-steel-400)'} rx="2" />
    </svg>
  );
}

export default function Contact() {
  const [channel, setChannel] = useState('whatsapp');
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [focusedField, setFocusedField] = useState(null);

  const prefillMessage = useMemo(() => {
    return `Hi Bard Santner Tournament Desk,\n\nName: ${form.name || '[Your name]'}\nEmail: ${form.email || '[Your email]'}\nPhone: ${form.phone || '[Your phone]'}\n\n${form.message || '[Your message]'}\n`;
  }, [form]);

  const handleSend = () => {
    if (channel === 'whatsapp') {
      const url = `https://wa.me/${business.phoneDigits}?text=${encodeURIComponent(prefillMessage)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      const mailto = `mailto:${business.emailGolf}?subject=${encodeURIComponent('Bard Santner Tournament Desk')}&body=${encodeURIComponent(prefillMessage)}`;
      window.location.href = mailto;
    }
  };

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
          <p className="mt-6 max-w-2xl text-steel-300 text-lg rich-copy">
            Entries, draws, prize queries, dietary updates. We reply fast —{' '}
            <a href={business.whatsapp} target="_blank" rel="noopener noreferrer" className="prose-link !text-orange-400">WhatsApp</a>{' '}
            gets the quickest response during tournament weeks. Tournament mornings we reply in under{' '}
            <CountUp to={15} className="!text-orange-400 font-semibold" duration={900} /> minutes.
          </p>
        </div>
      </section>

      {/* Contact blocks */}
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

      {/* Send us a note — with channel toggle & golf-ball underline */}
      <section className="py-14 sm:py-20 bg-steel-50">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-12">
          <SectionReveal>
            <p className="label-xs text-orange-500 mb-4">DROP A NOTE</p>
            <h2 className="font-display uppercase text-navy-900 leading-[0.9] mb-6" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
              SEND IT YOUR<br />
              <span className="text-orange-500">WAY.</span>
            </h2>
            <p className="text-steel-600 rich-copy mb-10">
              Pick your club — <a href={business.whatsapp} target="_blank" rel="noopener noreferrer" className="prose-link">WhatsApp wedge</a> for speed,{' '}
              <a href={`mailto:${business.emailGolf}`} className="prose-link">email putter</a> for the long trail.
            </p>
          </SectionReveal>

          {/* Channel toggle — club selector */}
          <div className="bg-white border-2 border-navy-900 p-5 sm:p-6 mb-6">
            <p className="label-xs text-navy-900 mb-4">PICK YOUR CLUB</p>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setChannel('whatsapp')}
                className={`relative flex items-center gap-4 p-4 border-2 transition-all ${
                  channel === 'whatsapp'
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-steel-300 bg-white hover:border-navy-900'
                }`}
              >
                <WhatsAppClubSvg active={channel === 'whatsapp'} />
                <div className="text-left">
                  <p className="label-xs text-orange-600">WEDGE</p>
                  <p className="font-display text-xl uppercase text-navy-900 leading-tight">WhatsApp</p>
                  <p className="text-[11px] text-steel-500">Fastest · live during tournaments</p>
                </div>
                {channel === 'whatsapp' && (
                  <motion.span
                    layoutId="club-indicator"
                    className="absolute -bottom-0.5 left-0 right-0 h-1 bg-orange-500"
                  />
                )}
              </button>

              <button
                type="button"
                onClick={() => setChannel('email')}
                className={`relative flex items-center gap-4 p-4 border-2 transition-all ${
                  channel === 'email'
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-steel-300 bg-white hover:border-navy-900'
                }`}
              >
                <EmailClubSvg active={channel === 'email'} />
                <div className="text-left">
                  <p className="label-xs text-orange-600">PUTTER</p>
                  <p className="font-display text-xl uppercase text-navy-900 leading-tight">Email</p>
                  <p className="text-[11px] text-steel-500">Weekday replies · within the hour</p>
                </div>
                {channel === 'email' && (
                  <motion.span
                    layoutId="club-indicator"
                    className="absolute -bottom-0.5 left-0 right-0 h-1 bg-orange-500"
                  />
                )}
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white border-2 border-navy-900 p-5 sm:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <ContactField
                label="Your name *"
                value={form.name}
                onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                focused={focusedField === 'name'}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
              />
              <ContactField
                label="Phone (+263...)"
                value={form.phone}
                onChange={(v) => setForm((f) => ({ ...f, phone: v }))}
                focused={focusedField === 'phone'}
                onFocus={() => setFocusedField('phone')}
                onBlur={() => setFocusedField(null)}
              />
              <div className="sm:col-span-2">
                <ContactField
                  label="Email *"
                  type="email"
                  value={form.email}
                  onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                  focused={focusedField === 'email'}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                />
              </div>
              <div className="sm:col-span-2">
                <label className="label-xs text-navy-900 block mb-2">Message *</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  rows={5}
                  placeholder="Tell us about your query..."
                  className="w-full px-4 py-3 border-2 border-steel-300 focus:border-orange-500 focus:outline-none bg-white text-navy-900 transition font-body"
                />
              </div>
            </div>

            <div className="mt-6 pt-6 border-t-2 border-steel-100 flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs text-steel-500 rich-copy">
                By sending you'll open <b>{channel === 'whatsapp' ? 'WhatsApp' : 'your email app'}</b> with your message pre-filled.
              </p>
              <button
                type="button"
                onClick={handleSend}
                className={`inline-flex items-center gap-3 px-8 py-4 label-xs font-bold transition clip-arrow-right text-white ${
                  channel === 'whatsapp' ? 'bg-orange-500 hover:bg-orange-400' : 'bg-navy-900 hover:bg-navy-800'
                }`}
              >
                {channel === 'whatsapp' ? <WhatsappLogo size={18} weight="fill" /> : <Envelope size={18} weight="fill" />}
                SEND VIA {channel === 'whatsapp' ? 'WHATSAPP' : 'EMAIL'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Map + pulsing pin */}
      <section className="bg-white py-14 sm:py-20">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <SectionReveal>
            <p className="label-xs text-orange-500 mb-4">THE VENUE</p>
            <h2 className="font-display uppercase text-navy-900 leading-[0.9] mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
              FIND US.
            </h2>
            <p className="text-steel-600 rich-copy mb-8">
              <a href="https://maps.google.com/?q=Royal+Harare+Golf+Club" target="_blank" rel="noopener noreferrer" className="prose-link">Royal Harare Golf Club</a>,{' '}
              <a href="https://maps.google.com/?q=5th+Street+Extension+Harare" target="_blank" rel="noopener noreferrer" className="prose-link">5th Street Extension</a>,{' '}
              <a href="https://maps.google.com/?q=Harare+Zimbabwe" target="_blank" rel="noopener noreferrer" className="prose-link">Harare</a>,{' '}
              Zimbabwe — <CountUp to={17} duration={1200} />°48'S, <CountUp to={31} duration={1200} />°07'E.
            </p>
          </SectionReveal>
          <div className="relative aspect-[16/9] border-2 border-navy-900 overflow-hidden">
            <iframe
              title="Royal Harare Golf Club"
              src="https://maps.google.com/maps?q=Royal%20Harare%20Golf%20Club&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* Pulsing "YOU ARE HERE" pin — decorative overlay, pointer-events disabled so map stays interactive */}
            <div className="pointer-events-none absolute top-1/2 left-1/2 z-10 animate-map-pin-pulse">
              <div className="flex flex-col items-center">
                <span className="bg-orange-500 text-white px-2.5 py-1 label-xs font-bold whitespace-nowrap mb-1 shadow-lg">
                  YOU ARE HERE
                </span>
                <svg width="28" height="40" viewBox="0 0 28 40" aria-hidden="true">
                  <path d="M 14 2 C 20 2 25 7 25 13 C 25 22 14 38 14 38 C 14 38 3 22 3 13 C 3 7 8 2 14 2 Z" fill="var(--color-orange-500)" stroke="var(--color-navy-900)" strokeWidth="1.5" />
                  <circle cx="14" cy="13" r="5" fill="white" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
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
          <p className="text-steel-300 text-lg mb-8 rich-copy">
            Weekday replies within the <CountUp to={60} className="!text-orange-400 font-semibold" duration={900} />-minute window.
            Tournament mornings: real-time — direct to <Link to="/register" className="prose-link !text-orange-400">the draw</Link>.
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
    </PageTransition>
  );
}

function ContactField({ label, value, onChange, type = 'text', focused, onFocus, onBlur }) {
  return (
    <div>
      <label className="label-xs text-navy-900 block mb-2">{label}</label>
      <div className="relative">
        <input
          type={type}
          value={value}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 border-2 border-steel-300 focus:border-orange-500 focus:outline-none bg-white text-navy-900 transition"
        />
        {/* Golf-ball underline — travels left-to-right on focus */}
        <div
          className="absolute left-0 right-0 bottom-0 h-0.5 bg-orange-500 origin-left"
          style={{
            transform: focused ? 'scaleX(1)' : 'scaleX(0)',
            transition: 'transform 500ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        />
        <div
          className="absolute bottom-0 w-3 h-3 -mb-1.5 bg-white rounded-full border-2 border-orange-500 shadow"
          style={{
            left: focused ? 'calc(100% - 16px)' : '0px',
            opacity: focused ? 1 : 0,
            transition: 'left 500ms cubic-bezier(0.22, 1, 0.36, 1), opacity 300ms ease',
          }}
        />
      </div>
    </div>
  );
}
