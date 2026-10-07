import { useEffect, useRef, useState } from 'react'
import { useApp } from './AppProvider'
import { Mark } from './Logo'
import { prefersReducedMotion } from '../lib/ticker'

const DURATION = 1800

export default function Preloader() {
  const { setLoaded } = useApp()
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)
  const [gone, setGone] = useState(false)
  const start = useRef(0)

  useEffect(() => {
    let raf
    let cancelled = false
    const fonts = document.fonts?.ready ?? Promise.resolve()
    const duration = prefersReducedMotion() ? 300 : DURATION

    const step = (t) => {
      if (!start.current) start.current = t
      const p = Math.min(1, (t - start.current) / duration)
      // ease-in-out so the counter feels mechanical, like a loading gauge
      const eased = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2
      setProgress(Math.round(eased * 100))
      if (p < 1) raf = requestAnimationFrame(step)
      else
        fonts.then(() => {
          if (cancelled) return
          setDone(true)
          setTimeout(() => setLoaded(true), 250)
          setTimeout(() => setGone(true), 1300)
        })
    }
    raf = requestAnimationFrame(step)
    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
    }
  }, [setLoaded])

  if (gone) return null

  return (
    <div className={`preloader ${done ? 'is-done' : ''}`} role="status" aria-label="Loading">
      <div className="preloader__inner">
        <div className="preloader__mark">
          <Mark size={44} />
        </div>
        <div className="preloader__bar">
          <span style={{ transform: `scaleX(${progress / 100})` }} />
        </div>
        <div className="preloader__meta">
          <span>Beyond — Creative Studio</span>
          <span className="preloader__count">{String(progress).padStart(3, '0')}</span>
        </div>
      </div>
    </div>
  )
}
