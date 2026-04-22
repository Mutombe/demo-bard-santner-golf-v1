import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { List, X, MagnifyingGlass, WhatsappLogo } from '@phosphor-icons/react';
import { business, navLinks } from '../data/siteData';

export default function Navbar({ onOpenSearch }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Transparent over hero on home page when not scrolled; solid everywhere else
  const transparent = isHome && !scrolled;

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          transparent
            ? 'bg-transparent'
            : 'bg-navy-950/95 backdrop-blur-md border-b border-navy-800'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Brand lockup — Bard Santner wordmark + partner */}
            <Link to="/" className="flex items-center gap-3 sm:gap-4 min-w-0">
              <div className="bg-white px-2 py-1.5 sm:py-2 flex items-center">
                <img
                  src="/logo.png"
                  alt="Bard Santner Inc"
                  loading="eager"
                  className="h-6 sm:h-7 w-auto"
                  onError={(e) => (e.currentTarget.style.display = 'none')}
                />
              </div>
              <div className="hidden md:flex items-center gap-3">
                <span className="label-xs text-orange-400">IN PARTNERSHIP WITH</span>
                <img
                  src="/logo-royal-harare.png"
                  alt="Royal Harare Golf Club"
                  loading="eager"
                  className="h-8 w-auto bg-white p-1"
                  onError={(e) => (e.currentTarget.style.display = 'none')}
                />
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `px-3 xl:px-4 py-2 text-[11px] tracking-[0.22em] uppercase font-semibold transition ${
                      isActive
                        ? 'text-orange-400'
                        : 'text-white/80 hover:text-orange-400'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button
                onClick={onOpenSearch}
                aria-label="Open search"
                className="hidden sm:flex h-10 w-10 items-center justify-center text-white hover:text-orange-400 transition"
              >
                <MagnifyingGlass size={20} weight="bold" />
              </button>
              <a
                href={business.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-2 px-3 py-2 text-[11px] tracking-[0.2em] uppercase font-bold text-white hover:text-orange-400 transition"
              >
                <WhatsappLogo size={18} weight="fill" />
                CALL
              </a>
              <Link
                to="/register"
                className="hidden md:inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white px-4 lg:px-5 py-2.5 lg:py-3 text-[11px] tracking-[0.2em] uppercase font-bold transition"
              >
                REGISTER →
              </Link>

              {/* Mobile menu */}
              <button
                className="lg:hidden h-10 w-10 flex items-center justify-center text-white"
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
                className={({ isActive }) =>
                  `block py-4 border-b border-navy-800 font-display text-3xl uppercase transition ${
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
              onClick={onOpenSearch}
              className="mt-6 flex items-center gap-3 py-3 text-white label-xs hover:text-orange-400"
            >
              <MagnifyingGlass size={18} weight="bold" /> Search
            </button>
            <Link
              to="/register"
              className="mt-4 inline-flex items-center justify-between bg-orange-500 text-white px-5 py-4 label-xs font-bold"
            >
              REGISTER FOR NEXT ROUND
              <span className="font-display text-2xl">→</span>
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
