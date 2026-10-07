// A single requestAnimationFrame loop shared by the whole app (smooth scroll, cursor,
// scroll-linked effects). Keeps every animation in sync and avoids competing rAF loops.
const callbacks = new Set()
let rafId = null

function loop(time) {
  callbacks.forEach((cb) => cb(time))
  rafId = callbacks.size ? requestAnimationFrame(loop) : null
}

export function addTick(cb) {
  callbacks.add(cb)
  if (rafId === null) rafId = requestAnimationFrame(loop)
  return () => callbacks.delete(cb)
}

export const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v))
export const lerp = (a, b, t) => a + (b - a) * t
export const mapRange = (v, inMin, inMax, outMin = 0, outMax = 1) =>
  outMin + clamp((v - inMin) / (inMax - inMin)) * (outMax - outMin)

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const isFinePointer = () =>
  typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches
