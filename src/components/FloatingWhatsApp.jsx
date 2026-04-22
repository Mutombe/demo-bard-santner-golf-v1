import React from 'react';
import { WhatsappLogo } from '@phosphor-icons/react';
import { business } from '../data/siteData';

export default function FloatingWhatsApp() {
  return (
    <a
      href={business.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp the tournament organiser"
      className="fixed bottom-6 right-6 z-40 h-14 w-14 flex items-center justify-center shadow-xl transition-transform duration-300 hover:scale-110"
      style={{ background: '#25D366', borderRadius: 0 }}
    >
      <WhatsappLogo size={30} weight="fill" color="#fff" />
      <span className="absolute -top-1 -right-1 h-3 w-3 bg-orange-500 animate-pulse-dot" />
    </a>
  );
}
