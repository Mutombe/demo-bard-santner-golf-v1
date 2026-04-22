import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { List, X, MagnifyingGlass, WhatsappLogo } from '@phosphor-icons/react';
import { business, navLinks, calendar } from '../data/siteData';
import { haptic } from '../lib/haptics';

// Mini-ticker — breathing opacity showing next tee-off
function MiniTicker() {
  const next = calendar.find((r) => new Date(r.date + 'T07:00:00+02:00') > new Date()) || calendar[calendar.length - 1];
  return (
    <span className="hidden md:inline-flex items-center gap-2 animate-breathe">
      <span className="h-1.5 w-1.5 bg-orange-500 rounded-full" />
      <span className="label-xs text-steel-500 tracking-[0.2em]">NEXT · {next.dateLabel}</span>
    </span>
  );
}

export default function Navbar({ onOpenSearch }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 bg-white border-b border-navy-100 shadow-[0_1px_0_rgba(46,42,79,0.04)]">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-10">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
            {/* Brand lockup — full logo on white */}
            <Link to="/" className="flex items-center gap-4 min-w-0 shrink-0" aria-label="Bard Santner Road to S.A. — Home">
              <img
                src="/logo.png"
                alt="Bard Santner Inc"
                loading="eager"
                className="h-8 sm:h-10 w-auto"
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
              <MiniTicker />
            </Link>

            {/* Desktop nav — shortened labels, tight padding so no wrap */}
            <nav className="hidden lg:flex items-center gap-0">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  onClick={() => haptic()}
                  className={({ isActive }) =>
                    `press-physics px-3 py-2 text-[11px] tracking-[0.2em] uppercase font-semibold transition whitespace-nowrap ${
                      isActive
                        ? 'text-orange-600'
                        : 'text-navy-800 hover:text-orange-600'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              <button
                onClick={onOpenSearch}
                aria-label="Open search"
                className="hidden sm:flex h-10 w-10 items-center justify-center text-navy-800 hover:text-orange-600 transition"
              >
                <MagnifyingGlass size={20} weight="bold" />
              </button>
              <a
                href={business.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden xl:inline-flex items-center gap-2 px-3 py-2 text-[11px] tracking-[0.2em] uppercase font-bold text-navy-800 hover:text-orange-600 transition whitespace-nowrap"
              >
                <WhatsappLogo size={16} weight="fill" />
                CALL
              </a>
              <Link
                to="/register"
                onClick={() => haptic.advance()}
                className="press-physics hidden md:inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white px-4 lg:px-5 py-2.5 lg:py-3 text-[11px] tracking-[0.2em] uppercase font-bold transition whitespace-nowrap"
              >
                BOOK SLOT →
              </Link>

              {/* Mobile menu */}
              <button
                className="lg:hidden h-10 w-10 flex items-center justify-center text-navy-900"
                onClick={() => setOpen(!open)}
                aria-label="Menu"
              >
                {open ? <X size={24} weight="bold" /> : <List size={24} weight="bold" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile nav drawer */}
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden bg-navy-950 pt-20 animate-slide-in-right">
          <div className="grid-lines absolute inset-0 pointer-events-none" />
          <nav className="relative px-6 py-8 flex flex-col gap-1">
            {navLinks.map((link, i) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => haptic()}
                className={({ isActive }) =>
                  `press-physics block py-4 border-b border-navy-800 font-display text-3xl uppercase transition ${
                    isActive ? 'text-orange-500' : 'text-white hover:text-orange-400'
                  }`
                }
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <span className="label-xs text-steel-400 mr-3">0{i + 1}</span>
                {link.label}
              </NavLink>
            ))}
            <button
              onClick={() => { haptic(); onOpenSearch(); }}
              className="press-physics mt-6 flex items-center gap-3 py-3 text-white label-xs hover:text-orange-400"
            >
              <MagnifyingGlass size={18} weight="bold" /> Search
            </button>
            <Link
              to="/register"
              onClick={() => haptic.advance()}
              className="press-physics mt-4 inline-flex items-center justify-between bg-orange-500 text-white px-5 py-4 label-xs font-bold"
            >
              BOOK YOUR SLOT
              <span className="font-display text-2xl">→</span>
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
