import React from 'react';
import { motion } from 'framer-motion';
import { Check } from '@phosphor-icons/react';

export default function TeeTimeSlot({ slot, selected, onSelect, index }) {
  return (
    <motion.button
      type="button"
      onClick={() => onSelect(slot.id)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: 'easeOut' }}
      whileHover={{ y: -4 }}
      className={`relative text-left border-2 p-5 sm:p-6 transition-all duration-300 overflow-hidden ${
        selected
          ? 'border-orange-500 bg-orange-500 text-white'
          : 'border-navy-900 bg-white text-navy-900 hover:border-orange-500'
      }`}
    >
      {/* lane number */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className={`label-xs mb-2 ${selected ? 'text-white' : 'text-orange-500'}`}>
            LANE {String(index + 1).padStart(2, '0')} · {slot.window}
          </p>
          <p className={`font-display text-2xl sm:text-3xl uppercase leading-tight tabular-nums ${
            selected ? 'text-white' : 'text-navy-900'
          }`}>
            {slot.label}
          </p>
          <p className={`label-xs mt-4 ${selected ? 'text-white/80' : 'text-steel-500'}`}>
            {slot.capacity} SLOTS / WAVE
          </p>
        </div>
        <div
          className={`h-10 w-10 border-2 flex items-center justify-center shrink-0 ${
            selected ? 'bg-white border-white text-orange-500' : 'border-navy-900'
          }`}
        >
          {selected && <Check size={20} weight="bold" />}
        </div>
      </div>

      {/* race lane stripes */}
      {selected && (
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="absolute bottom-0 left-0 h-1.5 bg-white"
        />
      )}
    </motion.button>
  );
}
