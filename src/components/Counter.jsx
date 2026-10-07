import { useEffect, useRef } from 'react'
import useInView from '../hooks/useInView'

// Counts up from 0 to `value` once it scrolls into view.
export default function Counter({ value, duration = 1600 }) {
  const [ref, inView] = useInView()
  const out = useRef(null)

  useEffect(() => {
    if (!inView) return
    let raf
    const start = performance.now()
    const step = (now) => {
      const p = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - p, 4)
      if (out.current) out.current.textContent = String(Math.round(eased * value))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, duration])

  return (
    <span ref={ref}>
      <span ref={out}>0</span>
    </span>
  )
}
