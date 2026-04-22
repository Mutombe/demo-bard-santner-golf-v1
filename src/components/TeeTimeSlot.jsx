import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from '@phosphor-icons/react';

/**
 * TeeTimeSlot — tee wave selector with slot-capacity bar.
 * Shows "14/18 slots · 4 open" with a filled bar that animates on scroll-in.
 */
export default function TeeTimeSlot({ slot, selected, onSelect, index }) {
  const [progress, setProgress] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  // Simulate filled capacity — in prod this would come from DB
  const filled = slot.capacity ? Math.floor(slot.capacity * (index === 0 ? 0.83 : index === 1 ? 0.5 : 0.25)) : 0;
  const totalCapacity = slot.capacity ? slot.capacity + 6 : 18; // say 18 total
  const filledPct = totalCapacity > 0 ? (filled / totalCapacity) * 100 : 0;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const t0 = performance.now();
        const tick = (now) => {
          const p = Math.min((now - t0) / 1400, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setProgress(eased);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.3 });
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <motion.button
      ref={ref}
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
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <p className={`label-xs mb-2 ${selected ? 'text-white' : 'text-orange-500'}`}>
            LANE {String(index + 1).padStart(2, '0')} · {slot.window}
          </p>
          <p className={`font-display text-2xl sm:text-3xl uppercase leading-tight tabular-nums ${
            selected ? 'text-white' : 'text-navy-900'
          }`}>
            {slot.label}
          </p>

          {/* Slot capacity bar */}
          <div className="mt-4">
            <div className="flex items-baseline justify-between mb-1.5">
              <p className={`label-xs ${selected ? 'text-white/85' : 'text-steel-600'}`}>
                <span className="tabular-nums font-bold">{Math.floor(filled * progress)}</span>
                <span className={selected ? 'text-white/60' : 'text-steel-400'}>/{totalCapacity}</span>{' '}
                SLOTS FILLED
              </p>
              <p className={`label-xs tabular-nums ${selected ? 'text-white' : 'text-orange-600 font-bold'}`}>
                {Math.floor((totalCapacity - filled) * 1)} OPEN
              </p>
            </div>
            <div className={`relative h-2 ${selected ? 'bg-white/30' : 'bg-steel-100'} overflow-hidden`}>
              <div
                className={`absolute inset-y-0 left-0 ${selected ? 'bg-white' : 'bg-orange-500'}`}
                style={{
                  width: `${filledPct * progress}%`,
                  transition: 'width 0.2s linear',
                }}
              />
            </div>
          </div>
        </div>
        <div
          className={`h-10 w-10 border-2 flex items-center justify-center shrink-0 ${
            selected ? 'bg-white border-white text-orange-500' : 'border-navy-900'
          }`}
        >
          {selected && <Check size={20} weight="bold" />}
        </div>
      </div>

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
