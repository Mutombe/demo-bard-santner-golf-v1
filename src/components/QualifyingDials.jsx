import React from 'react';
import RadialDial from './RadialDial';

/**
 * QualifyingDials — 3-up row of radial gauges visualising the qualifying rules.
 * Renders on Home. Each gauge animates from 0 → value on scroll-in.
 */
export default function QualifyingDials() {
  // Responsive gauge size — smaller on phones so stacked dials don't dominate scroll
  const [size, setSize] = React.useState(220);
  React.useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)');
    const update = () => setSize(mq.matches ? 180 : 220);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-10 items-start">
      <RadialDial
        value={3}
        max={9}
        title="SA OPEN"
        label="ROUNDS"
        caption="Minimum to qualify"
        size={size}
      />
      <RadialDial
        value={8}
        max={9}
        title="NEDBANK"
        label="ROUNDS"
        caption="Needed for Sun City"
        size={size}
      />
      <RadialDial
        value={7}
        max={11}
        title="ORDER OF MERIT"
        label="BEST SCORES"
        caption="Count toward the race"
        size={size}
      />
    </div>
  );
}
