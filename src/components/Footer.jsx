import React from 'react';
import { Link } from 'react-router-dom';
import { FacebookLogo, InstagramLogo, LinkedinLogo, WhatsappLogo, Envelope, Phone } from '@phosphor-icons/react';
import { business, navLinks, sponsors, partnership } from '../data/siteData';

export default function Footer() {
  return (
    <footer className="relative bg-navy-950 text-white overflow-hidden">
      <div className="grid-lines absolute inset-0 pointer-events-none" />

      {/* Sponsors / brand strip */}
      <div className="relative border-y border-navy-800 py-6 overflow-hidden">
        <div className="flex whitespace-nowrap animate-ticker-fast">
          {[...sponsors, ...sponsors, ...sponsors].map((s, i) => (
            <span
              key={i}
              className="px-10 label-xs text-steel-400 flex items-center gap-10"
            >
              {s}
              <span className="text-orange-500">◆</span>
            </span>
          ))}
        </div>
      </div>

      <div className="relative max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-14 sm:py-20">
        {/* Massive wordmark */}
        <div className="mb-12 pb-10 border-b border-navy-800">
          <p className="label-xs text-orange-500 mb-4">ROAD TO S.A. 2025</p>
          <h2 className="font-display text-6xl sm:text-8xl lg:text-[140px] uppercase leading-[0.85] tracking-tight">
            THE RACE<br />
            <span className="text-orange-500">IS ON.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Col 1 — brand */}
          <div>
            <div className="bg-white p-3 inline-block mb-4">
              <img
                src="/logo.png"
                alt="Bard Santner"
                className="h-8 w-auto"
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
            </div>
            <p className="text-sm text-steel-300 leading-relaxed mb-4">
              {partnership.primary.description}
            </p>
            <p className="label-xs text-orange-500 mb-3">IN PARTNERSHIP WITH</p>
            <div className="bg-white p-2 inline-block">
              <img
                src="/logo-royal-harare.png"
                alt="Royal Harare Golf Club"
                className="h-14 w-auto"
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
            </div>
            <p className="text-xs text-steel-400 mt-2">EST. 1898</p>
          </div>

          {/* Col 2 — navigate */}
          <div>
            <p className="label-xs text-orange-500 mb-5">NAVIGATE</p>
            <ul className="space-y-2.5">
              {navLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-steel-300 hover:text-orange-400 text-sm link-underline transition"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — contact */}
          <div>
            <p className="label-xs text-orange-500 mb-5">CONTACT</p>
            <ul className="space-y-3">
              <li>
                <a href="tel:+263861200070" className="flex items-start gap-3 text-steel-300 hover:text-white transition text-sm">
                  <Phone size={18} className="mt-0.5 text-orange-500 shrink-0" weight="fill" />
                  <span>{business.phone}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${business.emailGolf}`} className="flex items-start gap-3 text-steel-300 hover:text-white transition text-sm break-all">
                  <Envelope size={18} className="mt-0.5 text-orange-500 shrink-0" weight="fill" />
                  <span>{business.emailGolf}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${business.emailClub}`} className="flex items-start gap-3 text-steel-300 hover:text-white transition text-sm break-all">
                  <Envelope size={18} className="mt-0.5 text-orange-500 shrink-0" weight="fill" />
                  <span>{business.emailClub}</span>
                </a>
              </li>
              <li>
                <a href={business.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-steel-300 hover:text-white transition text-sm">
                  <WhatsappLogo size={18} className="mt-0.5 text-orange-500 shrink-0" weight="fill" />
                  <span>WhatsApp the organiser</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4 — venue + socials */}
          <div>
            <p className="label-xs text-orange-500 mb-5">THE VENUE</p>
            <p className="font-display text-2xl uppercase mb-2">Royal Harare Golf Club</p>
            <p className="text-steel-300 text-sm leading-relaxed">
              5th Street Extension<br />Harare, Zimbabwe
            </p>

            <p className="label-xs text-orange-500 mt-8 mb-4">FOLLOW BARD SANTNER</p>
            <div className="flex items-center gap-3">
              <a href={business.socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="h-10 w-10 bg-navy-800 hover:bg-orange-500 flex items-center justify-center transition">
                <FacebookLogo size={18} weight="fill" />
              </a>
              <a href={business.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="h-10 w-10 bg-navy-800 hover:bg-orange-500 flex items-center justify-center transition">
                <InstagramLogo size={18} weight="fill" />
              </a>
              <a href={business.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="h-10 w-10 bg-navy-800 hover:bg-orange-500 flex items-center justify-center transition">
                <LinkedinLogo size={18} weight="fill" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="mt-14 pt-8 border-t border-navy-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-steel-400">
          <p>
            © {new Date().getFullYear()} Bard Santner Inc · Royal Harare Golf Club · All rights reserved.
          </p>
          <p>
            Website by{' '}
            <a
              href="https://bitstudio.co.zw"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-500 hover:text-orange-400 transition"
            >
              Bit Studio
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
