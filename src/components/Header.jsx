import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import TLink from './TLink'
import Logo from './Logo'
import SoundToggle from './SoundToggle'
import { useApp } from './AppProvider'
import { addTick } from '../lib/ticker'
import { site } from '../data/site'

export default function Header() {
  const { loaded } = useApp()
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const headerRef = useRef(null)
  const panelRef = useRef(null)

  // Close the menu whenever the route changes
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setOpen(false), [pathname])

  // Hide on scroll down, reveal on scroll up; switch to light text over dark sections
  useEffect(() => {
    let lastY = window.scrollY
    let hidden = false
    let dark = false
    return addTick(() => {
      const el = headerRef.current
      if (!el) return
      const y = window.scrollY
      const delta = y - lastY
      if (Math.abs(delta) > 4) {
        const shouldHide = delta > 0 && y > 200 && !el.classList.contains('is-open')
        if (shouldHide !== hidden) {
          hidden = shouldHide
          el.classList.toggle('is-hidden', hidden)
        }
        lastY = y
      }
      const probe = 36
      let overDark = false
      document.querySelectorAll('[data-theme="dark"]').forEach((s) => {
        const r = s.getBoundingClientRect()
        if (r.top <= probe && r.bottom >= probe) overDark = true
      })
      if (overDark !== dark) {
        dark = overDark
        el.classList.toggle('is-dark', dark)
      }
    })
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    const onDown = (e) => {
      if (!headerRef.current?.contains(e.target)) setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('pointerdown', onDown)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('pointerdown', onDown)
    }
  }, [open])

  return (
    <header ref={headerRef} className={`header ${loaded ? 'is-ready' : ''} ${open ? 'is-open' : ''}`}>
      <TLink to="/" className="header__logo" aria-label="Beyond — home">
        <Logo />
      </TLink>

      <div className="header__actions">
        <TLink to="/contact" className="pill pill--dark pill--talk">
          <span className="pill__dot" aria-hidden="true" />
          <span className="pill__text" data-text="Let’s talk">Let’s talk</span>
        </TLink>
        <SoundToggle />
        <button
          type="button"
          className="pill pill--light menu-btn"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="menu-btn__label">{open ? 'Close' : 'Menu'}</span>
          <span className="menu-btn__dots" aria-hidden="true">
            <i />
            <i />
          </span>
        </button>

        <nav id="site-menu" ref={panelRef} className="menu" aria-hidden={!open} inert={!open}>
          <ul className="menu__list">
            {site.nav.map((item, i) => (
              <li key={item.to} style={{ '--i': i }}>
                <TLink
                  to={item.to}
                  className={`menu__link ${pathname === item.to ? 'is-active' : ''}`}
                  onClick={() => pathname === item.to && setOpen(false)}
                >
                  <span>{item.label}</span>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </TLink>
              </li>
            ))}
          </ul>
          <form
            className="menu__news"
            onSubmit={(e) => {
              e.preventDefault()
              e.currentTarget.reset()
              e.currentTarget.classList.add('is-sent')
            }}
          >
            <p>Subscribe to our newsletter</p>
            <div className="field-inline">
              <input type="email" required placeholder="Your email" aria-label="Your email" />
              <button type="submit" aria-label="Subscribe">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
            </div>
            <span className="menu__thanks">Thanks — you’re on the list.</span>
          </form>
          <div className="menu__socials">
            {site.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
                {s.label}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </header>
  )
}
