import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { addTick, isFinePointer, lerp } from '../lib/ticker'

// A soft follower that grows over interactive elements and can show a label
// (add data-cursor="View" to any element). The native cursor stays visible.
export default function Cursor() {
  const ref = useRef(null)
  const [enabled] = useState(isFinePointer)
  const [label, setLabel] = useState('')
  const [state, setState] = useState('') // '' | 'hover' | 'label' | 'hidden'
  const { pathname } = useLocation()

  // A page change can unmount the hovered element without a mouseout, so reset.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setState(''), [pathname])

  useEffect(() => {
    if (!enabled) return
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const pos = { ...target }
    let visible = false

    const onMove = (e) => {
      target.x = e.clientX
      target.y = e.clientY
      if (!visible) {
        pos.x = target.x
        pos.y = target.y
        visible = true
        ref.current?.classList.add('is-visible')
      }
    }
    const onOver = (e) => {
      const withLabel = e.target.closest('[data-cursor]')
      if (withLabel) {
        setLabel(withLabel.getAttribute('data-cursor'))
        setState('label')
        return
      }
      setState(e.target.closest('a, button, input, textarea, select, label, [role="button"]') ? 'hover' : '')
    }
    const onLeave = () => {
      visible = false
      ref.current?.classList.remove('is-visible')
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    const remove = addTick(() => {
      pos.x = lerp(pos.x, target.x, 0.2)
      pos.y = lerp(pos.y, target.y, 0.2)
      if (ref.current) ref.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`
    })
    return () => {
      remove()
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      document.documentElement.removeEventListener('mouseleave', onLeave)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div ref={ref} className={`cursor ${state ? `cursor--${state}` : ''}`} aria-hidden="true">
      <div className="cursor__dot">
        <span className="cursor__label">{label}</span>
      </div>
    </div>
  )
}
