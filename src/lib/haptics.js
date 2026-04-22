/**
 * Haptic micro-feedback for mobile devices.
 * Silent no-op on desktop (no navigator.vibrate support there).
 *
 * Patterns:
 *   haptic()        — 8ms tap (default, for primary CTAs, nav taps, carousel arrows)
 *   haptic.advance()— 12ms forward step (slot booking, form next)
 *   haptic.confirm()— 18ms confirm/submit
 *   haptic.toggle() — 8ms accordion toggle
 */
const _vibrate = (ms) => {
  if (typeof navigator === 'undefined') return;
  if (!navigator.vibrate) return;
  try {
    navigator.vibrate(ms);
  } catch {
    /* noop */
  }
};

export function haptic(ms = 8) {
  _vibrate(ms);
}

haptic.tap = () => _vibrate(8);
haptic.advance = () => _vibrate(12);
haptic.confirm = () => _vibrate(18);
haptic.toggle = () => _vibrate(8);

export default haptic;
