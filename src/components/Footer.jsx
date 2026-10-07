import { useState } from 'react'
import TLink from './TLink'
import { Mark } from './Logo'
import { useApp } from './AppProvider'
import { site } from '../data/site'

export default function Footer() {
  const { lenis } = useApp()
  const [sent, setSent] = useState(false)

  return (
    <footer className="footer" data-theme="dark">
      <div className="footer__top">
        <div className="footer__col footer__col--wide">
          <p className="footer__lead">
            Beyond is an independent creative studio building interactive 3D, websites and immersive worlds for
            curious brands.
          </p>
          <form
            className="footer__news"
            onSubmit={(e) => {
              e.preventDefault()
              setSent(true)
              e.currentTarget.reset()
            }}
          >
            <label htmlFor="footer-email">Subscribe to our newsletter</label>
            <div className="field-inline field-inline--dark">
              <input id="footer-email" type="email" required placeholder="Your email" />
              <button type="submit" aria-label="Subscribe">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
            </div>
            {sent && <span className="footer__thanks">Thanks — you’re on the list.</span>}
          </form>
        </div>

        <div className="footer__col">
          <h4>Studio</h4>
          {site.address.map((l) => (
            <p key={l}>{l}</p>
          ))}
        </div>

        <div className="footer__col">
          <h4>Say hello</h4>
          <a className="footer__link" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          <a className="footer__link" href={`tel:${site.phone.replace(/\s/g, '')}`}>
            {site.phone}
          </a>
        </div>

        <div className="footer__col">
          <h4>Explore</h4>
          {site.nav.map((n) => (
            <TLink key={n.to} to={n.to} className="footer__link">
              {n.label}
            </TLink>
          ))}
        </div>

        <div className="footer__col">
          <h4>Follow</h4>
          {site.socials.map((s) => (
            <a key={s.label} className="footer__link" href={s.href} target="_blank" rel="noreferrer">
              {s.label}
            </a>
          ))}
        </div>
      </div>

      <div className="footer__brand" aria-hidden="true">
        <Mark size={120} />
        <span>Beyond</span>
      </div>

      <div className="footer__bottom">
        <span>© {new Date().getFullYear()} Beyond Studio. All rights reserved.</span>
        <span>Made with curiosity.</span>
        <button type="button" className="footer__top-btn" onClick={() => lenis.current?.scrollTo(0, { duration: 1.6 })}>
          Back to top ↑
        </button>
      </div>
    </footer>
  )
}
