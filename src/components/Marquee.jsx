import { useEffect, useRef } from 'react'
import { useApp } from './AppProvider'
import { addTick, lerp, prefersReducedMotion } from '../lib/ticker'

// Infinite marquee whose speed and direction react to scroll velocity.
export default function Marquee({ items, speed = 0.6, className = '' }) {
  const trackRef = useRef(null)
  const { lenis } = useApp()

  useEffect(() => {
    if (prefersReducedMotion()) return
    let x = 0
    let boost = 0
    let dir = 1
    return addTick(() => {
      const track = trackRef.current
      if (!track) return
      const v = lenis.current?.velocity ?? 0
      if (Math.abs(v) > 0.5) dir = Math.sign(v)
      boost = lerp(boost, Math.abs(v) * 0.25, 0.1)
      x -= (speed + boost) * dir
      const half = track.scrollWidth / 2
      if (half > 0) {
        if (x <= -half) x += half
        if (x > 0) x -= half
      }
      track.style.transform = `translate3d(${x}px,0,0)`
    })
  }, [lenis, speed])

  const row = (key) => (
    <div className="marquee__group" key={key} aria-hidden={key === 'b'}>
      {items.map((item, i) => (
        <span className="marquee__item" key={i}>
          {item}
          <span className="marquee__sep" aria-hidden="true">
            <svg viewBox="0 0 40 40">
              <circle cx="15" cy="20" r="10" fill="currentColor" />
              <circle cx="25" cy="20" r="10" fill="none" stroke="currentColor" strokeWidth="3" />
            </svg>
          </span>
        </span>
      ))}
    </div>
  )

  return (
    <div className={`marquee ${className}`}>
      <div className="marquee__track" ref={trackRef}>
        {row('a')}
        {row('b')}
      </div>
    </div>
  )
}
