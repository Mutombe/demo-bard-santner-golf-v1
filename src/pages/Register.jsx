import React, { useReducer, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import {
  ArrowRight, ArrowLeft, Check, WhatsappLogo, Envelope, Lightning,
  Calendar as CalIcon, User, Target, Flag
} from '@phosphor-icons/react';

import PageTransition from '../components/PageTransition';
import TeeTimeSlot from '../components/TeeTimeSlot';
import FairwayProgress from '../components/FairwayProgress';
import CountUp from '../components/CountUp';
import SEO from '../components/SEO';
import { calendar, teeTimeSlots, business } from '../data/siteData';

// ============ State =============
const initial = {
  step: 0,
  event: '',
  firstName: '',
  surname: '',
  gender: '',
  club: 'Royal Harare Golf Club',
  handicap: '',
  membershipNumber: '',
  slot: '',
  cell: '',
  email: '',
  dietary: '',
  shirtSize: '',
  prizeGiving: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET': return { ...state, [action.field]: action.value };
    case 'NEXT': return { ...state, step: Math.min(state.step + 1, 4) };
    case 'BACK': return { ...state, step: Math.max(state.step - 1, 0) };
    case 'GOTO': return { ...state, step: action.step };
    default: return state;
  }
}

const steps = [
  { id: 0, label: 'EVENT', icon: CalIcon },
  { id: 1, label: 'PLAYER', icon: User },
  { id: 2, label: 'SLOT', icon: Target },
  { id: 3, label: 'DETAILS', icon: Flag },
  { id: 4, label: 'REVIEW', icon: Check },
];

const shirtSizes = ['S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'XXXXL', 'XXXXXL'];

export default function Register() {
  const [state, dispatch] = useReducer(reducer, initial);
  const step = state.step;

  const upcomingEvents = useMemo(() => {
    const now = new Date();
    return [
      { value: 'next-available', label: 'Next Available Round (auto-assign)' },
      ...calendar.map((r) => ({
        value: r.date,
        label: `${r.dateLabel} — ${r.title}${new Date(r.date) < now ? ' (COMPLETED)' : ''}`,
        disabled: new Date(r.date) < now,
      })),
    ];
  }, []);

  const canProceed = useMemo(() => {
    if (step === 0) return !!state.event;
    if (step === 1) return state.firstName && state.surname && state.gender && state.handicap && state.membershipNumber;
    if (step === 2) return !!state.slot;
    if (step === 3) return state.cell && state.email && state.shirtSize && state.prizeGiving;
    return true;
  }, [step, state]);

  const handleNext = () => {
    if (!canProceed) {
      toast.error('Please complete all fields before moving on.');
      return;
    }
    toast.success(`Step ${step + 1} locked. Moving to ${steps[step + 1]?.label || 'REVIEW'}.`);
    dispatch({ type: 'NEXT' });
  };

  const buildMessage = () => {
    const ev = upcomingEvents.find((e) => e.value === state.event)?.label || state.event;
    const slotLabel = teeTimeSlots.find((s) => s.id === state.slot)?.label || state.slot;
    return `BARD SANTNER ROAD TO S.A. — REGISTRATION\n\nEvent: ${ev}\nName: ${state.firstName} ${state.surname}\nGender: ${state.gender}\nClub: ${state.club}\nHandicap Index: ${state.handicap}\nRoyal Harare Membership #: ${state.membershipNumber}\nTee Slot: ${slotLabel}\nCell: ${state.cell}\nEmail: ${state.email}\nDietary: ${state.dietary || 'None'}\nShirt Size: ${state.shirtSize}\nPrize Giving Attendance: ${state.prizeGiving}\n\nPlease confirm my registration.`;
  };

  const handleSubmit = () => {
    const message = buildMessage();
    const waUrl = `https://wa.me/${business.phoneDigits}?text=${encodeURIComponent(message)}`;
    try {
      window.open(waUrl, '_blank', 'noopener,noreferrer');
      toast.success('Opening WhatsApp with your registration...');
    } catch (err) {
      const mailto = `mailto:${business.emailGolf}?subject=${encodeURIComponent('Bard Santner Road to S.A. — Registration')}&body=${encodeURIComponent(message)}`;
      window.location.href = mailto;
      toast.info('Falling back to email.');
    }
  };

  return (
    <PageTransition>
      <SEO
        title="Register — Bard Santner Road to S.A. Golf Challenge 2025"
        description="Book your tee-time for the next qualifying round. Multi-step entry: event, player, slot, details."
      />

      {/* Page hero */}
      <section className="relative bg-navy-950 text-white pt-24 sm:pt-32 pb-10 sm:pb-14 overflow-hidden">
        <div className="absolute inset-0 grid-lines opacity-40" />
        <div className="relative max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <p className="label-xs text-orange-500 mb-4"><span className="animate-keyline">REGISTRATION / MULTI-STEP ENTRY</span></p>
          <h1 className="font-display uppercase leading-[0.88] text-balance" style={{ fontSize: 'clamp(2.5rem, 8vw, 7rem)' }}>
            BOOK YOUR<br />
            <span className="text-orange-500">TEE-TIME.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-steel-300 text-lg rich-copy">
            <CountUp to={5} className="!text-orange-400 font-semibold" duration={900} /> steps.
            Pick the round, confirm your handicap, claim your wave, add contact details — and we'll confirm
            your slot on the grid by <a href={business.whatsapp} target="_blank" rel="noopener noreferrer" className="prose-link !text-orange-400">WhatsApp</a>.
            Review our <Link to="/conditions" className="prose-link !text-orange-400">tournament conditions</Link> first.
          </p>
        </div>
      </section>

      {/* Fairway progress bar — steps visualised as a golf hole */}
      <section className="bg-white border-b-2 border-navy-900">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12">
          <FairwayProgress step={step} />
        </div>
      </section>

      {/* Step progress */}
      <section className="bg-white sticky top-16 sm:top-20 z-30 border-b-2 border-navy-900">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-4">
          <div className="flex items-center justify-between">
            {steps.map((s, i) => {
              const Icon = s.icon;
              const done = step > s.id;
              const active = step === s.id;
              return (
                <React.Fragment key={s.id}>
                  <button
                    onClick={() => done && dispatch({ type: 'GOTO', step: s.id })}
                    disabled={!done && !active}
                    className={`flex items-center gap-2 sm:gap-3 ${done ? 'cursor-pointer' : 'cursor-default'}`}
                  >
                    <div className={`h-9 w-9 sm:h-11 sm:w-11 flex items-center justify-center border-2 transition ${
                      done ? 'bg-navy-900 border-navy-900 text-white' :
                      active ? 'bg-orange-500 border-orange-500 text-white' :
                      'bg-white border-steel-200 text-steel-300'
                    }`}>
                      {done ? <Check size={18} weight="bold" /> : <Icon size={18} weight="bold" />}
                    </div>
                    <div className="hidden md:block text-left">
                      <p className={`label-xs ${active ? 'text-orange-500' : done ? 'text-navy-900' : 'text-steel-300'}`}>
                        STEP <CountUp to={i + 1} pad={2} duration={600} />/<CountUp to={steps.length} pad={2} duration={600} />
                      </p>
                      <p className={`text-sm font-bold ${active ? 'text-navy-900' : done ? 'text-navy-900' : 'text-steel-300'}`}>
                        {s.label}
                      </p>
                    </div>
                  </button>
                  {i < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-2 sm:mx-3 ${step > i ? 'bg-navy-900' : 'bg-steel-200'}`} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </section>

      {/* Form body */}
      <section className="bg-steel-50 py-10 sm:py-16">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <AnimatePresence mode="popLayout">
            {/* Step 0 — Event */}
            {step === 0 && (
              <motion.div
                key="step-0"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white border-2 border-navy-900 p-6 sm:p-10"
              >
                <p className="label-xs text-orange-500 mb-3">STEP <CountUp to={1} pad={2} duration={600} /> / EVENT</p>
                <h2 className="font-display text-3xl sm:text-4xl uppercase text-navy-900 leading-tight mb-8">
                  WHICH ROUND<br />ARE YOU RUNNING?
                </h2>

                <div className="space-y-3">
                  {upcomingEvents.map((ev) => (
                    <label
                      key={ev.value}
                      className={`flex items-center gap-4 p-4 border-2 transition ${
                        ev.disabled ? 'opacity-40 cursor-not-allowed border-steel-200' :
                        state.event === ev.value ? 'border-orange-500 bg-orange-50 cursor-pointer' :
                        'border-steel-200 hover:border-navy-900 cursor-pointer'
                      }`}
                    >
                      <input
                        type="radio"
                        name="event"
                        value={ev.value}
                        disabled={ev.disabled}
                        checked={state.event === ev.value}
                        onChange={(e) => dispatch({ type: 'SET', field: 'event', value: e.target.value })}
                        className="hidden"
                      />
                      <div className={`h-5 w-5 border-2 flex items-center justify-center shrink-0 ${
                        state.event === ev.value ? 'bg-orange-500 border-orange-500' : 'border-steel-300'
                      }`}>
                        {state.event === ev.value && <Check size={14} weight="bold" color="#fff" />}
                      </div>
                      <span className={`text-sm sm:text-base ${state.event === ev.value ? 'text-navy-900 font-semibold' : 'text-steel-700'}`}>
                        {ev.label}
                      </span>
                    </label>
                  ))}
                </div>

                <p className="mt-6 text-xs text-steel-500 rich-copy">
                  Not sure? <Link to="/calendar" className="prose-link">Browse the 9-round calendar</Link>.
                </p>
              </motion.div>
            )}

            {/* Step 1 — Personal */}
            {step === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white border-2 border-navy-900 p-6 sm:p-10"
              >
                <p className="label-xs text-orange-500 mb-3">STEP <CountUp to={2} pad={2} duration={600} /> / PLAYER</p>
                <h2 className="font-display text-3xl sm:text-4xl uppercase text-navy-900 leading-tight mb-8">
                  WHO'S ON THE<br />STARTING GRID?
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="First Name *" value={state.firstName} onChange={(v) => dispatch({ type: 'SET', field: 'firstName', value: v })} />
                  <Field label="Surname *" value={state.surname} onChange={(v) => dispatch({ type: 'SET', field: 'surname', value: v })} />

                  <div>
                    <label className="label-xs text-navy-900 block mb-2">Gender *</label>
                    <div className="flex gap-3">
                      {['M', 'F'].map((g) => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => dispatch({ type: 'SET', field: 'gender', value: g })}
                          className={`flex-1 py-3 border-2 font-bold transition ${
                            state.gender === g
                              ? 'bg-orange-500 border-orange-500 text-white'
                              : 'bg-white border-steel-300 text-navy-900 hover:border-navy-900'
                          }`}
                        >
                          {g === 'M' ? 'MALE' : 'FEMALE'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Field label="Club" value={state.club} onChange={(v) => dispatch({ type: 'SET', field: 'club', value: v })} />
                  <Field label="HNA Handicap Index *" value={state.handicap} placeholder="e.g. 18.4" onChange={(v) => dispatch({ type: 'SET', field: 'handicap', value: v })} />
                  <Field label="Royal Harare Membership # *" value={state.membershipNumber} onChange={(v) => dispatch({ type: 'SET', field: 'membershipNumber', value: v })} />
                </div>

                <div className="mt-6 p-4 bg-orange-50 border-l-4 border-orange-500">
                  <p className="text-xs text-steel-700 rich-copy">
                    <span className="label-xs text-orange-600">REMINDER</span><br />
                    Max Handicap Index: <b><CountUp to={212} duration={1000} className="!text-navy-900" />/10</b> (Men) ·{' '}
                    <b><CountUp to={262} duration={1000} className="!text-navy-900" />/10</b> (Women). Only fully paid-up{' '}
                    <Link to="/course" className="prose-link">Royal Harare</Link> members are eligible — see{' '}
                    <Link to="/conditions#eligibility" className="prose-link">Tournament Conditions §03</Link>.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Step 2 — Slot */}
            {step === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white border-2 border-navy-900 p-6 sm:p-10"
              >
                <p className="label-xs text-orange-500 mb-3">STEP <CountUp to={3} pad={2} duration={600} /> / SLOT</p>
                <h2 className="font-display text-3xl sm:text-4xl uppercase text-navy-900 leading-tight mb-3">
                  PICK YOUR<br />TEE WAVE.
                </h2>
                <p className="text-steel-600 text-sm mb-8 rich-copy">
                  <CountUp to={3} className="!text-orange-600 font-bold" /> waves per round. Choose your lane —{' '}
                  <a href="https://bardsantner.com" target="_blank" rel="noopener noreferrer" className="prose-link">Bard Santner</a> will
                  confirm the exact tee-time in your <Link to="/contact" className="prose-link">draw email</Link>.
                </p>

                <div className="grid grid-cols-1 gap-4">
                  {teeTimeSlots.map((slot, i) => (
                    <TeeTimeSlot
                      key={slot.id}
                      slot={slot}
                      index={i}
                      selected={state.slot === slot.id}
                      onSelect={(id) => dispatch({ type: 'SET', field: 'slot', value: id })}
                    />
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t-2 border-steel-100 flex items-start gap-3 text-xs text-steel-600 rich-copy">
                  <Lightning size={18} className="text-orange-500 shrink-0 mt-0.5" weight="fill" />
                  <p>
                    Late on the tee &gt; <CountUp to={5} className="!text-orange-600 font-bold" duration={900} /> min ={' '}
                    <b className="text-navy-900">disqualification</b> (<Link to="/conditions#late" className="prose-link">Rule 5.3a</Link>).
                    Be on the grid early.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Step 3 — Contact */}
            {step === 3 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white border-2 border-navy-900 p-6 sm:p-10"
              >
                <p className="label-xs text-orange-500 mb-3">STEP <CountUp to={4} pad={2} duration={600} /> / CONTACT</p>
                <h2 className="font-display text-3xl sm:text-4xl uppercase text-navy-900 leading-tight mb-8">
                  HOW DO WE<br />REACH YOU?
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Cell (+263...) *" value={state.cell} placeholder="+263 77 000 0000" onChange={(v) => dispatch({ type: 'SET', field: 'cell', value: v })} />
                  <Field label="Email *" type="email" value={state.email} onChange={(v) => dispatch({ type: 'SET', field: 'email', value: v })} />
                  <Field label="Dietary requirements" value={state.dietary} placeholder="Optional" onChange={(v) => dispatch({ type: 'SET', field: 'dietary', value: v })} />

                  <div>
                    <label className="label-xs text-navy-900 block mb-2">Golf shirt size *</label>
                    <div className="grid grid-cols-4 gap-2">
                      {shirtSizes.map((sz) => (
                        <button
                          key={sz}
                          type="button"
                          onClick={() => dispatch({ type: 'SET', field: 'shirtSize', value: sz })}
                          className={`py-2.5 border-2 font-mono text-sm font-bold transition ${
                            state.shirtSize === sz
                              ? 'bg-navy-900 border-navy-900 text-white'
                              : 'bg-white border-steel-300 text-navy-900 hover:border-navy-900'
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="label-xs text-navy-900 block mb-2">
                      Prize giving attendance *{' '}
                      <span className="text-orange-500">
                        (MANDATORY — within <CountUp to={30} className="!text-orange-600" duration={900} /> min of final card)
                      </span>
                    </label>
                    <div className="flex gap-3">
                      {['Yes', 'No'].map((v) => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => dispatch({ type: 'SET', field: 'prizeGiving', value: v })}
                          className={`flex-1 py-3 border-2 font-bold transition ${
                            state.prizeGiving === v
                              ? v === 'Yes'
                                ? 'bg-orange-500 border-orange-500 text-white'
                                : 'bg-navy-900 border-navy-900 text-white'
                              : 'bg-white border-steel-300 text-navy-900 hover:border-navy-900'
                          }`}
                        >
                          {v === 'Yes' ? "YES — I'LL BE THERE" : 'NO'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4 — Review (scorecard styled) */}
            {step === 4 && (
              <motion.div
                key="step-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="relative bg-[#fdfaf2] border-4 border-navy-900 p-6 sm:p-10"
                style={{
                  backgroundImage: 'linear-gradient(180deg, rgba(232,119,34,0.04) 0%, rgba(253,250,242,1) 30%)',
                  boxShadow: '8px 8px 0 0 #E87722',
                }}
              >
                {/* Brass corners */}
                <span className="absolute top-0 left-0 h-6 w-6 border-t-4 border-l-4 border-orange-500" />
                <span className="absolute top-0 right-0 h-6 w-6 border-t-4 border-r-4 border-orange-500" />
                <span className="absolute bottom-0 left-0 h-6 w-6 border-b-4 border-l-4 border-orange-500" />
                <span className="absolute bottom-0 right-0 h-6 w-6 border-b-4 border-r-4 border-orange-500" />

                <div className="flex items-center gap-4 mb-6">
                  <div className="h-14 w-14 bg-orange-500 flex items-center justify-center font-display text-white text-2xl">
                    <CountUp to={5} pad={2} duration={900} />
                  </div>
                  <div>
                    <p className="label-xs text-orange-600">OFFICIAL SCORECARD · BARD SANTNER</p>
                    <p className="font-display text-2xl uppercase text-navy-900">REVIEW & CONFIRM</p>
                  </div>
                </div>

                <h2 className="font-display text-3xl sm:text-4xl uppercase text-navy-900 leading-tight mb-8 pb-4 border-b-2 border-navy-900">
                  YOUR STARTING<br />GRID CARD.
                </h2>

                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm font-mono">
                  <ScorecardRow label="Event" value={upcomingEvents.find((e) => e.value === state.event)?.label || '—'} />
                  <ScorecardRow label="Player" value={`${state.firstName} ${state.surname} (${state.gender})`} />
                  <ScorecardRow label="Club" value={state.club} />
                  <ScorecardRow label="Handicap" value={`HNA ${state.handicap}`} />
                  <ScorecardRow label="Membership #" value={state.membershipNumber} />
                  <ScorecardRow label="Tee Wave" value={teeTimeSlots.find((s) => s.id === state.slot)?.label || '—'} />
                  <ScorecardRow label="Cell" value={state.cell} />
                  <ScorecardRow label="Email" value={state.email} />
                  <ScorecardRow label="Shirt Size" value={state.shirtSize} />
                  <ScorecardRow label="Prize Giving" value={state.prizeGiving} />
                  {state.dietary && <ScorecardRow label="Dietary" value={state.dietary} />}
                </dl>

                {/* Signature line — scribble-in */}
                <div className="mt-10 pt-6 border-t-2 border-dashed border-navy-900/30">
                  <p className="label-xs text-steel-500 mb-2">PLAYER SIGNATURE</p>
                  <svg width="240" height="44" viewBox="0 0 240 44" className="animate-scribble" aria-hidden="true">
                    <path
                      d="M 10 30 Q 25 10, 45 25 T 85 28 Q 105 15, 130 30 T 175 26 Q 200 20, 225 32"
                      stroke="var(--color-navy-900)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </svg>
                  <div className="h-0.5 bg-navy-900 w-64" />
                  <p className="label-xs text-steel-500 mt-2">X {state.firstName} {state.surname}</p>
                </div>

                <div className="mt-8 pt-8 border-t-2 border-navy-900">
                  <p className="text-sm text-steel-700 mb-6 rich-copy">
                    Your registration will be sent through{' '}
                    <a href={business.whatsapp} target="_blank" rel="noopener noreferrer" className="prose-link">WhatsApp</a>{' '}
                    (or <a href={`mailto:${business.emailGolf}`} className="prose-link">email fallback</a>) for
                    confirmation by the Tournament Organiser — usually within{' '}
                    <CountUp to={60} className="!text-orange-600 font-bold" duration={900} /> minutes on weekdays.
                  </p>
                  <div className="flex flex-wrap items-center gap-4">
                    <button
                      onClick={handleSubmit}
                      className="inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-400 text-white px-8 py-5 label-xs font-bold transition clip-arrow-right"
                    >
                      <WhatsappLogo size={18} weight="fill" />
                      SUBMIT VIA WHATSAPP
                    </button>
                    <a
                      href={`mailto:${business.emailGolf}?subject=${encodeURIComponent('Bard Santner Road to S.A. — Registration')}&body=${encodeURIComponent(buildMessage())}`}
                      className="inline-flex items-center gap-3 border-2 border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white px-8 py-5 label-xs font-bold transition"
                    >
                      <Envelope size={18} weight="fill" />
                      EMAIL INSTEAD
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Nav buttons */}
          <div className="mt-8 flex items-center justify-between gap-4">
            <button
              onClick={() => dispatch({ type: 'BACK' })}
              disabled={step === 0}
              className={`inline-flex items-center gap-2 px-5 py-3 label-xs font-bold transition ${
                step === 0
                  ? 'opacity-30 cursor-not-allowed text-steel-500'
                  : 'text-navy-900 hover:text-orange-500'
              }`}
            >
              <ArrowLeft size={16} weight="bold" /> BACK
            </button>

            {step < 4 && (
              <button
                onClick={handleNext}
                disabled={!canProceed}
                className={`inline-flex items-center gap-3 px-8 py-5 label-xs font-bold transition clip-arrow-right ${
                  canProceed
                    ? 'bg-orange-500 hover:bg-orange-400 text-white'
                    : 'bg-steel-200 text-steel-400 cursor-not-allowed'
                }`}
              >
                NEXT <ArrowRight size={18} weight="bold" />
              </button>
            )}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

function Field({ label, value, onChange, type = 'text', placeholder = '' }) {
  const [focused, setFocused] = React.useState(false);
  return (
    <div>
      <label className="label-xs text-navy-900 block mb-2">{label}</label>
      <div className="relative">
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 border-2 border-steel-300 focus:border-orange-500 focus:outline-none bg-white text-navy-900 transition"
        />
        {/* Golf-ball underline on focus */}
        <div
          className="absolute left-0 right-0 bottom-0 h-0.5 bg-orange-500 transition-transform duration-400 origin-left"
          style={{
            transform: focused ? 'scaleX(1)' : 'scaleX(0)',
            transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        />
        <div
          className="absolute bottom-0 w-3 h-3 -mb-1.5 bg-white rounded-full border-2 border-orange-500 transition-all duration-500 shadow"
          style={{
            left: focused ? 'calc(100% - 16px)' : '0px',
            opacity: focused ? 1 : 0,
            transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        />
      </div>
    </div>
  );
}

function ScorecardRow({ label, value }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-navy-900/15 pb-2">
      <dt className="label-xs text-steel-600 shrink-0">{label}</dt>
      <dd className="text-navy-900 font-semibold text-right break-words max-w-[65%] font-mono tabular-nums">{value || '—'}</dd>
    </div>
  );
}
