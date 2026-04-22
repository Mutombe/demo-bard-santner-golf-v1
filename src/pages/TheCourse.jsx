import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import SectionReveal from '../components/SectionReveal';
import CountUp from '../components/CountUp';
import SignatureHoleSvg from '../components/SignatureHoleSvg';
import HistoryTimeline from '../components/HistoryTimeline';
import SEO from '../components/SEO';
import { courseFacts, gallery } from '../data/siteData';

export default function TheCourse() {
  const courseShots = gallery.filter((g) => g.category === 'Course').slice(0, 6);

  return (
    <PageTransition>
      <SEO title="The Course — Royal Harare Golf Club" description="Inside Royal Harare — Africa's grand 18-hole championship layout, est. 1898. The stage for the Bard Santner Road to S.A. Challenge." />

      {/* Hero */}
      <section className="relative min-h-[80vh] bg-navy-950 text-white pt-20 overflow-hidden flex items-end">
        <div className="absolute inset-0">
          <img src={courseFacts.hero} alt="Royal Harare 9th fairway" loading="eager" fetchPriority="high" className="w-full h-full object-cover object-center" onError={(e) => (e.currentTarget.style.display = 'none')} />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-transparent" />
        </div>
        <div className="relative w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-14 sm:py-20">
          <p className="label-xs text-orange-500 mb-4"><span className="animate-keyline">02 / THE COURSE</span></p>
          <h1 className="font-display uppercase leading-[0.88]" style={{ fontSize: 'clamp(3rem, 10vw, 10rem)' }}>
            ROYAL<br /><span className="text-orange-500">HARARE.</span>
          </h1>
          <p className="mt-4 label-xs text-orange-400">
            ESTABLISHED <CountUp to={1898} from={1800} duration={2200} /> · PAR <CountUp to={72} duration={1200} /> · <CountUp to={6660} from={6000} duration={1800} />M
          </p>
        </div>
      </section>

      {/* Read key points */}
      <section className="bg-white pt-10 sm:pt-14">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="key-points">
            <span className="kp-label">THE COURSE AT A GLANCE</span>
            <ul>
              <li>Established 1898 — one of Africa's great championship layouts.</li>
              <li>18 holes · Par 72 · 6,660 metres · course rating 73.1.</li>
              <li>White tee markers for men · Red markers for ladies.</li>
              <li>Dense indigenous hardwoods, sweeping fairways, immaculate greens.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Overview + stats */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-12 gap-6 sm:gap-10 mb-14 sm:mb-20">
            <div className="col-span-12 lg:col-span-5">
              <SectionReveal>
                <p className="label-xs text-orange-500 mb-4">
                  EST. <CountUp to={1898} from={1800} duration={2200} />
                </p>
                <h2 className="font-display uppercase text-navy-900 leading-[0.9]" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
                  A CENTURY<br />
                  <span className="text-orange-500">ON ONE SITE.</span>
                </h2>
              </SectionReveal>
            </div>
            <div className="col-span-12 lg:col-span-7">
              <SectionReveal delay={100}>
                <div className="read-prose rich-copy text-steel-700">
                  <p>
                    Royal Harare is one of Africa's great championship layouts — dense indigenous
                    hardwoods, sweeping fairways, and immaculate greens that have bordered the same
                    fairways for over a century. Hosting <Link to="/event" className="prose-link">the Bard Santner Loyalty Event</Link> is
                    a homecoming for the club and a statement of intent for the city. The course
                    has staged Zimbabwe Opens, Commonwealth qualifiers, and most recently became
                    the proving ground for <Link to="/event#nedbank" className="prose-link">the Race to the Nedbank Golf Challenge</Link>{' '}
                    — a season-long loyalty series powered by{' '}
                    <a href="https://bardsantner.com" target="_blank" rel="noopener noreferrer" className="prose-link">Bard Santner Inc</a>.
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-3 text-sm text-steel-600">
                  <MapPin size={18} weight="fill" className="text-orange-500" />
                  <a
                    href="https://maps.google.com/?q=Royal+Harare+Golf+Club"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="prose-link"
                  >
                    {courseFacts.location}
                  </a>
                </div>
              </SectionReveal>
            </div>
          </div>

          {/* Stats card — every number counts up */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 pt-10 border-t-2 border-navy-900">
            {[
              { value: courseFacts.holes, label: 'HOLES', sub: 'Championship layout' },
              { value: courseFacts.par, label: 'PAR', sub: "Men's scorecard" },
              { value: 6660, label: 'METRES', sub: 'White tees' },
              { value: parseFloat(courseFacts.courseRating) * 10, label: 'RATING', sub: 'Royal course', divide: 10, decimals: 1 },
              { value: parseInt(courseFacts.slope, 10), label: 'SLOPE', sub: 'White tees' },
            ].map((s) => (
              <div key={s.label} className="border-l-4 border-orange-500 pl-4 sm:pl-5">
                <div className="scoreboard-num text-[clamp(2.4rem,5vw,3.6rem)] text-navy-900 tabular-nums">
                  {s.divide ? (
                    <CountUpDecimal to={s.value} divide={s.divide} decimals={s.decimals} />
                  ) : (
                    <CountUp to={s.value} duration={1400} />
                  )}
                </div>
                <div className="scoreboard-label text-navy-900 mt-2">{s.label}</div>
                <div className="text-xs text-steel-500 mt-1">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History timeline — brass rule with 4 dates */}
      <section className="py-14 sm:py-20 bg-steel-50 border-y-2 border-navy-900/10">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <SectionReveal>
            <p className="label-xs text-orange-500 mb-4">HISTORY</p>
            <h2 className="font-display uppercase text-navy-900 leading-[0.9] mb-6" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
              FOUR MOMENTS<br />
              <span className="text-orange-500">THAT MADE THE COURSE.</span>
            </h2>
            <p className="text-steel-600 max-w-2xl rich-copy mb-10">
              Hover a year — each dot opens a short anecdote from Royal Harare's{' '}
              <CountUp to={new Date().getFullYear() - 1898} className="!text-orange-600 font-semibold" />-year story.
              Read the full archive on the <a href="https://royalharare.co.zw/history" target="_blank" rel="noopener noreferrer" className="prose-link">club history page</a>.
            </p>
          </SectionReveal>

          <HistoryTimeline />
        </div>
      </section>

      {/* Signature holes */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <SectionReveal>
            <p className="label-xs text-orange-500 mb-4">SIGNATURE HOLES</p>
            <h2 className="font-display uppercase text-navy-900 leading-[0.9] mb-6" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
              THREE THAT<br />
              <span className="text-orange-500">DEFINE THE ROUND.</span>
            </h2>
            <p className="max-w-2xl text-steel-600 rich-copy mb-12">
              Every round of the <Link to="/event" className="prose-link">Road to S.A.</Link> turns on these.
              Study them before your next <Link to="/calendar" className="prose-link">qualifier</Link>.
            </p>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {courseFacts.signatureHoles.map((h, i) => (
              <SectionReveal key={h.name} delay={i * 100}>
                <div className="bg-white border-2 border-navy-900 overflow-hidden h-full">
                  <div className="relative photo-hover">
                    <img src={h.image} alt={h.name} loading="lazy" className="w-full aspect-[4/3] object-cover object-center" onError={(e) => (e.currentTarget.style.display = 'none')} />
                    <div className="absolute top-3 left-3 bg-orange-500 text-white px-3 py-1 label-xs font-bold">
                      PAR <CountUp to={h.par} duration={800} />
                    </div>
                  </div>
                  <div className="p-5 sm:p-6">
                    <h3 className="font-display text-2xl uppercase text-navy-900 mb-1">{h.name}</h3>
                    <p className="label-xs text-orange-500 mb-3">{h.length}</p>
                    <p className="text-sm text-steel-700 leading-relaxed">{h.note}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Signature 13th — SVG cross-section */}
      <section className="py-14 sm:py-20 bg-navy-950 text-white overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <SectionReveal>
            <p className="label-xs text-orange-500 mb-4">THE SIGNATURE 13TH</p>
            <motion.h2
              initial={{ opacity: 0, y: 16, rotate: -1 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
              className="font-display uppercase leading-[0.9] mb-6"
              style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
            >
              RANKED <span className="text-orange-500"><CountUp to={50} className="!text-orange-500" duration={1800} /></span> BEST<br />
              IN AFRICA.
            </motion.h2>
            <p className="text-steel-300 max-w-2xl italic rich-copy mb-10 animate-tremble-in">
              "A reachable par-5 with teeth. Water runs the full right side — the brave go for
              it in two, the wise lay up and trust the wedge." — <a href="https://www.top100golfcourses.com" target="_blank" rel="noopener noreferrer" className="prose-link !text-orange-400">Top 100 Golf Courses</a>
            </p>
          </SectionReveal>

          <SignatureHoleSvg />

          <p className="mt-6 text-sm text-steel-400 max-w-2xl rich-copy">
            Play the 13th in two and you're 3 under for the stretch. Play it safe and the{' '}
            <Link to="/conditions#format" className="prose-link !text-orange-400">stableford math</Link>{' '}
            still rewards the steady card.
          </p>
        </div>
      </section>

      {/* Gallery grid */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <SectionReveal>
            <p className="label-xs text-orange-500 mb-4">THE COURSE IN PHOTOS</p>
            <h2 className="font-display uppercase text-navy-900 leading-[0.9] mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
              THE WALK.
            </h2>
            <p className="text-steel-600 rich-copy mb-10">
              <CountUp to={courseShots.length} className="!text-orange-600 font-semibold" /> frames from the course — head to the{' '}
              <Link to="/media" className="prose-link">full gallery</Link> for another 20+.
            </p>
          </SectionReveal>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
            {courseShots.map((g, i) => (
              <SectionReveal key={i} delay={i * 60} className="photo-hover">
                <img
                  src={g.src}
                  alt={g.caption}
                  loading="lazy"
                  className={`w-full object-cover ${i % 3 === 1 ? 'aspect-[3/4]' : 'aspect-[4/3]'}`}
                  style={{ objectPosition: 'right center' }}
                  onError={(e) => (e.currentTarget.style.display = 'none')}
                />
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/caddie-flags-fairway.jpg" alt="" loading="lazy" className="w-full h-full object-cover object-center" onError={(e) => (e.currentTarget.style.display = 'none')} />
          <div className="absolute inset-0 bg-navy-950/70" />
        </div>
        <div className="relative max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-20 sm:py-28">
          <p className="label-xs text-orange-400 mb-6">YOUR TURN</p>
          <h2 className="font-display uppercase text-white leading-[0.88] mb-8" style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)' }}>
            WALK THE<br />
            <span className="text-orange-500">FAIRWAYS.</span>
          </h2>
          <p className="text-steel-200 max-w-xl text-lg rich-copy mb-8">
            Book your slot for the <Link to="/calendar" className="prose-link !text-orange-400">next qualifier</Link> —
            and see the 13th yourself.
          </p>
          <Link to="/register" className="inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-400 text-white px-8 py-5 label-xs font-bold transition clip-arrow-right">
            BOOK A ROUND <ArrowRight size={18} weight="bold" />
          </Link>
        </div>
      </section>
    </PageTransition>
  );
}

// ----- helper: decimal count-up for rating (73.1 etc) -----
function CountUpDecimal({ to, divide = 10, decimals = 1, duration = 1400 }) {
  const [n, setN] = React.useState(0);
  const ref = React.useRef(null);
  const started = React.useRef(false);
  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const t0 = performance.now();
        const tick = (now) => {
          const p = Math.min((now - t0) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setN(eased * to);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.4 });
    io.observe(node);
    return () => io.disconnect();
  }, [to, duration]);
  return <span ref={ref} className="tabular-nums">{(n / divide).toFixed(decimals)}</span>;
}
