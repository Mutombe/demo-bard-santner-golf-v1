import React from 'react';

/**
 * GolfFlag — small inline SVG of a pin + flag.
 * When `planted` toggles to true the flag rotates from tilted (-18deg) to upright (0deg)
 * with a short bounce, and pin drops in with scale.
 *
 * Props:
 *   planted?: boolean   Trigger the planted pose (default false = tilted pose)
 *   color?: string      Flag colour (default brand orange)
 *   size?: number       SVG width in px (default 48)
 *   className?: string
 */
export default function GolfFlag({
  planted = false,
  color = 'var(--color-orange-500)',
  pinColor = 'var(--color-navy-900)',
  size = 48,
  className = '',
  flutter = false,
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      style={{
        transformOrigin: '16px 60px',
        transform: planted ? 'rotate(0deg)' : 'rotate(-14deg)',
        transition: 'transform 550ms cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}
      aria-hidden="true"
    >
      {/* Ground */}
      <ellipse cx="18" cy="60" rx="14" ry="2.2" fill="var(--color-steel-200)" opacity="0.6" />
      {/* Pin */}
      <line
        x1="16"
        y1="60"
        x2="16"
        y2="10"
        stroke={pinColor}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Flag — animated flutter via CSS when flutter=true */}
      <g className={flutter ? 'flag-flutter' : undefined} style={{ transformOrigin: '16px 10px' }}>
        <path
          d="M16 10 L48 14 L42 22 L48 30 L16 26 Z"
          fill={color}
          stroke="var(--color-navy-900)"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        {/* Small 'BS' mark on the flag */}
        <circle cx="26" cy="20" r="3.2" fill="white" opacity="0.85" />
        <text
          x="26"
          y="22.8"
          textAnchor="middle"
          fontFamily="var(--font-display)"
          fontSize="5.5"
          fill={color}
          fontWeight="700"
        >
          BS
        </text>
      </g>
      {/* Hole */}
      <ellipse cx="16" cy="60" rx="3.5" ry="1.2" fill={pinColor} />
    </svg>
  );
}
