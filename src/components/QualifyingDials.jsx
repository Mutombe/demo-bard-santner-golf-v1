import React from 'react';
import RadialDial from './RadialDial';

/**
 * QualifyingDials — 3-up row of radial gauges visualising the qualifying rules.
 * Renders on Home. Each gauge animates from 0 → value on scroll-in.
 */
export default function QualifyingDials() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10 items-start">
      <RadialDial
        value={3}
        max={9}
        title="SA OPEN"
        label="ROUNDS"
        caption="Minimum to qualify"
        size={220}
      />
      <RadialDial
        value={8}
        max={9}
        title="NEDBANK"
        label="ROUNDS"
        caption="Needed for Sun City"
        size={220}
      />
      <RadialDial
        value={7}
        max={11}
        title="ORDER OF MERIT"
        label="BEST SCORES"
        caption="Count toward the race"
        size={220}
      />
    </div>
  );
}
