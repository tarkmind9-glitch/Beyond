import { useEffect, useRef } from 'react'
import { addTick, clamp } from '../lib/ticker'

// Calls onProgress(p, rect) every frame while mounted, where p goes 0 → 1 as the
// element travels from `start` to `end` (viewport fractions of the element's top/bottom).
export default function useScrollProgress(onProgress, { start = 1, end = 0, edge = 'top' } = {}) {
  const ref = useRef(null)
  const cb = useRef(onProgress)
  cb.current = onProgress

  useEffect(() => {
    let last = -1
    return addTick(() => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      let p
      if (edge === 'sticky') {
        // progress through a tall sticky container: 0 when its top hits the viewport top,
        // 1 when its bottom reaches the viewport bottom
        p = clamp(-r.top / Math.max(1, r.height - vh))
      } else {
        const y = edge === 'top' ? r.top : r.bottom
        p = clamp((vh * start - y) / (vh * start - vh * end))
      }
      if (Math.abs(p - last) > 0.0005) {
        last = p
        cb.current(p, r)
      }
    })
  }, [start, end, edge])

  return ref
}
