import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from '@phosphor-icons/react';

export default function EventCard({ round, isNext = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -6 }}
      className={`relative group overflow-hidden ${
        isNext ? 'bg-orange-500 text-white animate-pulse-ring' : 'bg-navy-950 text-white'
      }`}
    >
      <div className="p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <p className="label-xs opacity-70">ROUND {String(round.round).padStart(2, '0')} / 09</p>
            <p className="label-xs opacity-70 mt-1">{isNext ? 'NEXT UP' : round.status === 'past' ? 'COMPLETED' : 'SCHEDULED'}</p>
          </div>
          {isNext && (
            <span className="h-2.5 w-2.5 bg-white rounded-full animate-pulse-dot" />
          )}
        </div>

        <div className="mb-4">
          <div className="scoreboard-num text-[clamp(5rem,14vw,9rem)] leading-none tabular-nums">
            {round.day}
          </div>
          <div className="font-display text-3xl sm:text-4xl uppercase mt-1">{round.month}</div>
        </div>

        <h3 className="font-display text-xl uppercase mt-8 mb-2">{round.title}</h3>
        <p className="text-sm opacity-80 mb-8">{round.blurb}</p>

        {round.status !== 'past' && (
          <Link
            to="/register"
            className={`inline-flex items-center gap-2 label-xs font-bold border-b-2 pb-1 ${
              isNext ? 'border-white hover:gap-4' : 'border-orange-500 hover:gap-4 hover:text-orange-400'
            } transition-all duration-300`}
          >
            BOOK THIS ROUND
            <ArrowRight size={14} weight="bold" />
          </Link>
        )}
      </div>

      {/* diagonal corner slash */}
      <div
        className={`absolute top-0 right-0 h-6 w-6 ${
          isNext ? 'bg-white' : 'bg-orange-500'
        }`}
        style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}
      />
    </motion.div>
  );
}
