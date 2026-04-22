import { useRef, useState, useCallback } from 'react';

/**
 * useTilt — mouse-tracking 3D tilt hook.
 * Returns { ref, style, onMouseMove, onMouseLeave } — spread onto a card.
 * Disabled on coarse-pointer devices (mobile/tablet). Max rotation ±4°.
 *
 * Usage:
 *   const tilt = useTilt();
 *   <div ref={tilt.ref} onMouseMove={tilt.onMouseMove} onMouseLeave={tilt.onMouseLeave}
 *        style={{ ...tilt.style, transition: 'transform 140ms ease-out' }} />
 */
export function useTilt(max = 4) {
  const ref = useRef(null);
  const [style, setStyle] = useState({});

  const onMouseMove = useCallback(
    (e) => {
      if (!ref.current) return;
      if (typeof window === 'undefined') return;
      if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) return;
      const r = ref.current.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      const rx = (0.5 - py) * max;
      const ry = (px - 0.5) * max;
      setStyle({
        transform: `perspective(800px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) scale(1.01)`,
      });
    },
    [max]
  );

  const onMouseLeave = useCallback(() => {
    setStyle({ transform: '' });
  }, []);

  return { ref, style, onMouseMove, onMouseLeave };
}

export default useTilt;
