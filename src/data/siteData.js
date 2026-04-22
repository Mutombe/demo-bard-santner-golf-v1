// ================================================================
// Bard Santner Road to S.A. Golf Challenge 2025 — site data
// ================================================================

export const business = {
  name: 'Bard Santner Road to S.A.',
  fullName: 'Bard Santner Loyalty Event & Race to the Nedbank Golf Challenge 2025',
  tagline: 'ROAD TO S.A. GOLF CHALLENGE',
  subtitle: 'Nine rounds. One Sun City prize. The race is on.',
  year: '2025',
  logo: '/logo.png',
  partnerLogo: '/logo-royal-harare.png',
  venue: 'Royal Harare Golf Club',
  venueEst: 'EST. 1898',
  city: 'Harare',
  country: 'Zimbabwe',
  grandPrize: 'All-expenses-paid trip to the Nedbank Golf Challenge, Sun City',
  phone: '+263 861 2000 700',
  phoneDigits: '263861200070',
  emailGolf: 'golf@bardsantner.com',
  emailClub: 'office@royalharare.co.zw',
  whatsapp: 'https://wa.me/263861200070',
  socials: {
    facebook: 'https://www.facebook.com/BardSantnerInc',
    instagram: 'https://www.instagram.com/bardsantnerinc',
    linkedin: 'https://www.linkedin.com/company/bard-santner',
    web: 'https://www.bardsantner.com',
  },
};

export const partnership = {
  primary: {
    name: 'Bard Santner Inc',
    logo: '/logo.png',
    description:
      'A Zimbabwean financial services firm — the title partner powering the Road to S.A. Golf Challenge.',
    url: 'https://www.bardsantner.com',
  },
  host: {
    name: 'Royal Harare Golf Club',
    logo: '/logo-royal-harare.png',
    description:
      'Established 1898. Eighteen championship holes in the heart of Harare, hosting every qualifying round of the Race to S.A.',
    url: 'https://royalharare.co.zw',
  },
  destinationPartner: {
    name: 'Sun City — Nedbank Golf Challenge',
    description:
      "Africa's Major. The Gary Player Country Club hosts the DP World Tour's Nedbank Golf Challenge every November.",
  },
};

// The race — 9 qualifying tournament dates for 2025
// Dates per brief: 8 Feb, 22 Mar, 26 Apr, 24 May, 28 Jun, 26 Jul, 30 Aug, 25 Oct, 15 Nov
export const calendar = [
  {
    round: 1,
    date: '2025-02-08',
    dateLabel: '08 FEB 2025',
    month: 'FEBRUARY',
    monthShort: 'FEB',
    day: '08',
    title: 'Round 01 — Season Opener',
    blurb: 'The race begins. Stableford off the White & Red markers.',
    status: 'past',
  },
  {
    round: 2,
    date: '2025-03-22',
    dateLabel: '22 MAR 2025',
    month: 'MARCH',
    monthShort: 'MAR',
    day: '22',
    title: 'Round 02 — Autumn Stage',
    blurb: 'Second leg of the qualifying eleven. Points on the board.',
    status: 'past',
  },
  {
    round: 3,
    date: '2025-04-26',
    dateLabel: '26 APR 2025',
    month: 'APRIL',
    monthShort: 'APR',
    day: '26',
    title: 'Round 03 — Independence Cup',
    blurb: 'Third qualifier. Order of Merit tightening.',
    status: 'past',
  },
  {
    round: 4,
    date: '2025-05-24',
    dateLabel: '24 MAY 2025',
    month: 'MAY',
    monthShort: 'MAY',
    day: '24',
    title: 'Round 04 — Mid-Season Push',
    blurb: 'Midway through the calendar. The gap narrows.',
    status: 'past',
  },
  {
    round: 5,
    date: '2025-06-28',
    dateLabel: '28 JUN 2025',
    month: 'JUNE',
    monthShort: 'JUN',
    day: '28',
    title: 'Round 05 — Winter Classic',
    blurb: 'Cool morning tee-offs. Crisp fairways. High stakes.',
    status: 'past',
  },
  {
    round: 6,
    date: '2025-07-26',
    dateLabel: '26 JUL 2025',
    month: 'JULY',
    monthShort: 'JUL',
    day: '26',
    title: 'Round 06 — The Chairman',
    blurb: 'Signature round. The Bard Santner Chairman Cup on the line.',
    status: 'past',
  },
  {
    round: 7,
    date: '2025-08-30',
    dateLabel: '30 AUG 2025',
    month: 'AUGUST',
    monthShort: 'AUG',
    day: '30',
    title: 'Round 07 — Heritage Stage',
    blurb: 'Seven of eleven rounds logged. Qualification pressure peaks.',
    status: 'past',
  },
  {
    round: 8,
    date: '2025-10-25',
    dateLabel: '25 OCT 2025',
    month: 'OCTOBER',
    monthShort: 'OCT',
    day: '25',
    title: 'Round 08 — Spring Showdown',
    blurb: 'Penultimate Zimbabwean leg. Sun City in sight.',
    status: 'upcoming',
  },
  {
    round: 9,
    date: '2025-11-15',
    dateLabel: '15 NOV 2025',
    month: 'NOVEMBER',
    monthShort: 'NOV',
    day: '15',
    title: 'Round 09 — The Finale',
    blurb: 'Final qualifier at Royal Harare. The winner flies to Sun City.',
    status: 'upcoming',
  },
];

export const teeTimeSlots = [
  { id: 'slot-a', label: '11:08 AM – 11:40 AM', window: 'EARLY WAVE', capacity: 12 },
  { id: 'slot-b', label: '11:48 AM – 12:20 PM', window: 'MID WAVE', capacity: 12 },
  { id: 'slot-c', label: '12:28 PM – 1:00 PM', window: 'LATE WAVE', capacity: 12 },
];

export const eligibility = {
  headline: 'WHO RUNS THIS RACE',
  bullets: [
    'Fully paid-up Members of Royal Harare Golf Club',
    'Current HNA Handicap holders only',
    'Over 25 years of age to qualify for any travel prize',
    'Must attend prize giving (within 30 min of final card)',
    'Maximum Handicap Index: 21.2 (Men) · 26.2 (Ladies)',
    'Play in at least 7 of the 11 qualifying events',
  ],
};

export const eventStats = [
  { label: 'ROUNDS IN SEASON', value: '09', sub: 'Royal Harare 2025' },
  { label: 'TEE WAVES PER ROUND', value: '03', sub: 'Early · Mid · Late' },
  { label: 'MIN ROUNDS TO QUALIFY', value: '07', sub: 'Out of 11 events' },
  { label: 'GRAND PRIZE', value: '1', sub: 'Sun City, S.A.' },
];

export const courseFacts = {
  name: 'Royal Harare Golf Club',
  est: '1898',
  location: "5th Street Extension, Harare",
  holes: 18,
  par: 72,
  length: '6,660 m',
  courseRating: '73.1',
  slope: '130',
  hero: '/images/hero-9th-fairway.jpg',
  description:
    "Royal Harare is one of Africa's great championship layouts — dense indigenous hardwoods, sweeping fairways, immaculate greens, and a genuine clubhouse heritage that stretches back more than a century. Hosting the Bard Santner Loyalty Event is a homecoming for the club and a statement of intent for the city.",
  signatureHoles: [
    {
      name: 'THE 9TH FAIRWAY',
      par: 4,
      length: '385m',
      note: 'Doglegs right through mature jacarandas. Position off the tee is everything.',
      image: '/images/hero-9th-fairway.jpg',
    },
    {
      name: 'THE LONG 13TH',
      par: 5,
      length: '512m',
      note: 'Reachable in two for the brave. Water runs down the right the whole way.',
      image: '/images/wide-action.jpg',
    },
    {
      name: 'THE CLUBHOUSE PAR 3',
      par: 3,
      length: '168m',
      note: 'A pressure finish in view of the terrace — scoring window closes fast.',
      image: '/images/clubhouse.jpg',
    },
  ],
};

// ---------------- Tournament Conditions (extracted verbatim from PDF) ----------------
// 10 sections — source: TOURNAMENT-CONDITIONS-BARD-SANTNER-RACE-TO-NEDBANK-GOLF-CHALLENGE.pdf
export const tournamentConditions = {
  title: 'TOURNAMENT CONDITIONS',
  subtitle: 'The Bard Santner Loyalty Event & The Race to the Nedbank Golf Challenge 2025',
  pdfUrl: '/tournament-conditions.pdf',
  sections: [
    {
      number: '01',
      heading: 'TOURNAMENT COMMITTEE',
      body: `The Race is administered by the Royal Harare Golf Club Tournament Committee:

• Club Captain — Mr Audily Chatora
• Club Vice Captain — Mr Tinashe Tamba
• Lady Captain — Ms Yeukai Gatsi
• Lady Vice Captain — Mrs Ivy Musora
• Tournament Director — Mr Simon Murungweni

The Committee has final authority on all rulings, extenuating circumstances and eligibility.`,
    },
    {
      number: '02',
      heading: 'RULES OF GOLF',
      body: `The Rules of Golf as published by the Royal and Ancient Golf Club of St Andrews shall apply together with the Local Rules as published by the Tournament Committee.`,
    },
    {
      number: '03',
      heading: 'ELIGIBILITY',
      body: `Men and ladies who are fully paid-up Members of Royal Harare Golf Club with a current HNA Handicap are eligible to take part in the qualifying events in the Race to the Nedbank Golf Challenge 2025 at Sun City and in additional special events that may arise.

To qualify for a travel prize, players must be over the age of 25. Players must also attend prize giving, which will be held within 30 minutes of the final score card being handed in.`,
    },
    {
      number: '04',
      heading: 'FORMAT',
      body: `The competition format is MEDAL STABLEFORD.

Players will all start with stableford points equal to their HNA HANDICAP INDEX (H.I), converted to a Royal COURSE HANDICAP (C.H.) and then play off their BARD SANTNER HANDICAP ALLOWANCE (H.A) of 75% of their Royal C.H.

Worked example — Player A (Male):
  Handicap Index .............. 21.2
  Royal Course Handicap ....... 24
  Bard Santner H.A. @ 75% ..... 18

Thereafter players will play off scratch, scoring 3 points for a birdie, 2 points for a par and 1 point for a bogey. Players MUST pick up once they cannot score a point.

Points scored against the course will be added to the points calculated on the player's Bard Santner H.A. and will be the player's final score.

Maximum Handicap Index allowed: 21.2 (Men) · 26.2 (Ladies).
Men play from the White Tee Markers. Ladies play from the Red Tee Markers.`,
    },
    {
      number: '05',
      heading: 'THE DRAW',
      body: `Entries for the Bard Santner Loyalty Event will close at 5:00pm on the Wednesday prior to the published date. Late entries will not be accepted.

The draw will be published by email to all entered players prior to the event.`,
    },
    {
      number: '06',
      heading: 'PRIZES',
      body: `The player with the most stableford points will be the winner of that qualifying round. Prizes will be awarded to the players finishing in positions 1 – 3 in each qualifying round.

To qualify for the Race to the Nedbank Golf Challenge, participants must have played in at least 7 of the 11 events over the course of October 2024 – September 2025.

Players will earn Order of Merit points from each event they play in. Only players over 25 years of age with 7 or more rounds out of a possible 11 will become eligible to participate in the final prize of an all-expenses-paid trip to watch the Nedbank Golf Challenge at Sun City, South Africa.

Stableford points for the best 7 scores out of a possible 11 events will be added together to determine the overall winner of the Race to the Nedbank Golf Challenge.`,
    },
    {
      number: '07',
      heading: 'TIES',
      body: `Ties in the monthly qualifying events will be decided on the total stableford points for the final 9 holes on the score card (holes 10 – 18).

If no result: totals for holes 13 – 18.
If no result: totals for holes 16 – 18.
If no result: highest stableford points on the stroke 1 hole, then stroke 2, and so on until a winner is determined.

In the event of a tie for the top Player to qualify for the Race to the Nedbank Golf Challenge, a playoff will take place on the Tuesday after the final event. The format will be 18 holes stableford. If still tied, a sudden-death play-off commences on Hole One.

If a player is unable to participate in the play-off on the prescribed day, a walk-over will be awarded.`,
    },
    {
      number: '08',
      heading: 'LATE ON THE TEE',
      body: `Rule 5.3a applies.

A player who arrives within 5 minutes of their published start time will be penalised 2 strokes.

A player arriving later than 5 minutes after their published start time will be disqualified.`,
    },
    {
      number: '09',
      heading: 'NO SHOW',
      body: `Any member who puts their name down to play in the Bard Santner Loyalty Event and then fails to arrive — and has not contacted the Tournament Organiser or the Club to explain why they could not play — will be penalised and excluded from the next event.

In the event of extenuating circumstances, the Tournament Committee will have the final say on the re-admission of the defaulting member to the tournament.`,
    },
    {
      number: '10',
      heading: 'SPOT PRIZE',
      body: `Spot prizes will be awarded to players who hand in their business cards at prize giving to be part of the lucky card draw.`,
    },
  ],
};

export const faq = [
  {
    q: 'What is the Race to the Nedbank Golf Challenge?',
    a: 'A season-long order of merit contested across 11 tournaments between October 2024 and September 2025 at Royal Harare. Your best 7 stableford scores accumulate, and the top eligible player wins an all-expenses-paid trip to watch the Nedbank Golf Challenge at Sun City.',
  },
  {
    q: 'Who can enter?',
    a: 'Fully paid-up members of Royal Harare Golf Club with a current HNA handicap. To be eligible for the Sun City travel prize, you must be over 25 and have played at least 7 of the 11 events.',
  },
  {
    q: 'What is the format?',
    a: 'Medal Stableford. You start with points equal to your HNA handicap index, converted to Royal course handicap, then played at 75% Bard Santner handicap allowance. Thereafter 3 for a birdie, 2 for par, 1 for bogey.',
  },
  {
    q: 'When do entries close?',
    a: '5:00pm on the Wednesday before each qualifying round. Late entries are not accepted.',
  },
  {
    q: 'What happens if I am late to the tee?',
    a: 'Within 5 minutes: 2-stroke penalty. Over 5 minutes: disqualification from that round (Rule 5.3a).',
  },
  {
    q: 'What if I can\'t play my scheduled round?',
    a: 'Contact the Tournament Organiser or the Club as early as possible. No-shows without notice are penalised and excluded from the next event.',
  },
];

export const gallery = [
  { src: '/images/flags-fairway.jpg', category: 'Course', caption: 'Orange flags on the fairway — Bard Santner branding day.' },
  { src: '/images/hero-9th-fairway.jpg', category: 'Course', caption: 'The signature 9th fairway — doglegs right through jacaranda.' },
  { src: '/images/clubhouse.jpg', category: 'Clubhouse', caption: 'Inside the Royal Harare clubhouse on tournament morning.' },
  { src: '/images/trophy-presentation.jpg', category: 'Tournament', caption: 'Trophy & prize presentation after a qualifying round.' },
  { src: '/images/players-lining-up-putt.jpg', category: 'Players', caption: 'Reading the line. Caddie and player on the green.' },
  { src: '/images/registration-tent.jpg', category: 'Tournament', caption: 'Registration under the Bard Santner tent.' },
  { src: '/images/tee-off-jan2025.jpg', category: 'Players', caption: 'Tee-off. January 2025 qualifier.' },
  { src: '/images/player-address-tee.jpg', category: 'Players', caption: 'Addressing the ball — branded tee block.' },
  { src: '/images/lady-golfer-links.jpg', category: 'Players', caption: 'Lady golfer at The Links. Red markers.' },
  { src: '/images/player-swing-banner.jpg', category: 'Players', caption: 'Follow-through in front of the Bard Santner banner.' },
  { src: '/images/fourball-posed.jpg', category: 'Players', caption: 'Four-ball posed before round off the 1st.' },
  { src: '/images/fairway-action-2.jpg', category: 'Course', caption: 'Fairway action — Bard Santner flags behind.' },
  { src: '/images/players-four-posed.jpg', category: 'Players', caption: 'Playing partners — full four-ball.' },
  { src: '/images/pro-swing.jpg', category: 'Players', caption: 'Club speed through impact. Signature swing.' },
  { src: '/images/registration-table.jpg', category: 'Tournament', caption: 'Registration at the Bard Santner table.' },
  { src: '/images/group-tee-green-shirt.jpg', category: 'Players', caption: 'Group tee-off — Royal Harare clubhouse in the distance.' },
  { src: '/images/tee-orange-shirt.jpg', category: 'Players', caption: 'On the tee. Bard Santner banner alongside.' },
  { src: '/images/blue-stripe-player.jpg', category: 'Players', caption: 'Address position — blue stripes, focused eyes.' },
  { src: '/images/caddie-flags-fairway.jpg', category: 'Course', caption: 'Caddie escorting the bag down the fairway under Bard Santner flags.' },
  { src: '/images/player-putting-green.jpg', category: 'Players', caption: 'On the green. Orange flag, Royal Harare afternoon.' },
  { src: '/images/player-address-tee-2.jpg', category: 'Players', caption: 'Ready position at the tee. Land Rover tee block.' },
  { src: '/images/flag-sunset.jpg', category: 'Course', caption: 'Golden hour on the course. Bard Santner flag.' },
  { src: '/images/slide-morning.jpg', category: 'Course', caption: 'Early morning on the course.' },
  { src: '/images/slide-golfers.jpg', category: 'Players', caption: 'Golfers on approach.' },
  { src: '/images/wide-action.jpg', category: 'Course', caption: 'Wide fairway view — the stage.' },
];

export const prizeLadder = [
  {
    title: 'GRAND PRIZE',
    position: '1ST OVERALL',
    reward: 'All-expenses-paid trip to the Nedbank Golf Challenge',
    destination: 'Sun City · South Africa',
    detail:
      "Attend Africa's premier professional golf week — DP World Tour. Flights, hotel, transfers, and grounds access included for the winner of the Order of Merit.",
    accent: 'orange',
  },
  {
    title: 'PODIUM',
    position: '1 – 3 PER ROUND',
    reward: 'Round prizes at every qualifying event',
    destination: 'Royal Harare Golf Club',
    detail:
      'Hardware, golf apparel, and curated experiences for the top three stableford finishers at each of the nine tournaments.',
    accent: 'navy',
  },
  {
    title: 'SPOT PRIZE',
    position: 'LUCKY DRAW',
    reward: 'Business-card lucky card draw at prize giving',
    destination: 'Clubhouse',
    detail:
      'Drop your business card at prize giving — spot prizes awarded live at the ceremony within 30 minutes of cards being handed in.',
    accent: 'steel',
  },
];

export const navLinks = [
  { to: '/', label: 'HOME' },
  { to: '/event', label: 'EVENT' },
  { to: '/course', label: 'COURSE' },
  { to: '/calendar', label: 'CALENDAR' },
  { to: '/register', label: 'REGISTER' },
  { to: '/conditions', label: 'RULES' },
  { to: '/media', label: 'GALLERY' },
  { to: '/contact', label: 'CONTACT' },
];

export const mediaItems = gallery; // alias

export const contactBlocks = [
  {
    label: 'TOURNAMENT HOTLINE',
    primary: '+263 861 2000 700',
    secondary: 'Mon – Fri · 08:00 – 17:00 CAT',
    type: 'phone',
    action: 'tel:+263861200070',
  },
  {
    label: 'BARD SANTNER GOLF',
    primary: 'golf@bardsantner.com',
    secondary: 'Entries, draws, prize queries',
    type: 'email',
    action: 'mailto:golf@bardsantner.com',
  },
  {
    label: 'ROYAL HARARE CLUB OFFICE',
    primary: 'office@royalharare.co.zw',
    secondary: 'Course, clubhouse, membership',
    type: 'email',
    action: 'mailto:office@royalharare.co.zw',
  },
  {
    label: 'COURSE ADDRESS',
    primary: 'Royal Harare Golf Club',
    secondary: '5th Street Extension, Harare, Zimbabwe',
    type: 'location',
    action: 'https://maps.google.com/?q=Royal+Harare+Golf+Club',
  },
];

export const sponsors = [
  'BARD SANTNER INC',
  'ROYAL HARARE GOLF CLUB',
  'LAND ROVER',
  'HNA HANDICAP',
  'NEDBANK GOLF CHALLENGE',
  'SUN CITY',
  'DP WORLD TOUR',
];
