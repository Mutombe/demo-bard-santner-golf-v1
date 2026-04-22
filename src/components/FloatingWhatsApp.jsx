import React, { useState } from 'react';
import { WhatsappLogo } from '@phosphor-icons/react';
import { business } from '../data/siteData';

export default function FloatingWhatsApp() {
  const [hover, setHover] = useState(false);

  return (
    <a
      href={business.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp the tournament organiser"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-3 group"
    >
      {/* Hover label — chat with us */}
      <span
        className={`hidden sm:inline-flex items-center px-3 py-2 bg-navy-950 text-white label-xs font-bold tracking-[0.22em] transition-all duration-300 ${
          hover ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 pointer-events-none'
        }`}
      >
        CHAT WITH US
      </span>

      {/* Round button — brand orange + pulse ring */}
      <span className="relative flex h-[60px] w-[60px] items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-orange-500 animate-pulse-ring" />
        <span className="relative flex h-[60px] w-[60px] items-center justify-center rounded-full bg-orange-500 shadow-xl transition-transform duration-300 group-hover:scale-110">
          <WhatsappLogo size={30} weight="fill" color="#fff" />
        </span>
      </span>
    </a>
  );
}
