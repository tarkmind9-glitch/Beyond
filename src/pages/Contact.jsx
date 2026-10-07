import { useState } from 'react'
import { Reveal, SplitText } from '../components/Reveal'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { site } from '../data/site'

const interests = ['Interactive 3D', 'Website', 'Brand & Motion', 'XR / Installation', 'Something else']
const budgets = ['< $25k', '$25k – $50k', '$50k – $100k', '$100k +']

export default function Contact() {
  useDocumentTitle('Contact — Beyond')
  const [picked, setPicked] = useState([])
  const [budget, setBudget] = useState('')
  const [sent, setSent] = useState(false)

  const toggle = (item) => setPicked((p) => (p.includes(item) ? p.filter((x) => x !== item) : [...p, item]))

  // No backend is wired up yet: this opens the visitor's email app with the brief filled in.
  // Swap for your form service (Formspree, Netlify Forms, your API…) when ready.
  const onSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const body = [
      `Name: ${data.get('name')}`,
      `Email: ${data.get('email')}`,
      `Company: ${data.get('company') || '-'}`,
      `Interested in: ${picked.join(', ') || '-'}`,
      `Budget: ${budget || '-'}`,
      '',
      data.get('message'),
    ].join('\n')
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent('New project enquiry')}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <section className="contact container">
      <div className="contact__head">
        <Reveal className="eyebrow">( Contact )</Reveal>
        <SplitText as="h1" className="page-title" text={'Let’s talk.'} />
        <Reveal className="contact__direct" delay={0.2}>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <span>{site.address.join(', ')}</span>
        </Reveal>
      </div>

      {sent ? (
        <Reveal className="contact__done">
          <h2>Thank you!</h2>
          <p>Your email app should have opened with your brief. We usually reply within two working days.</p>
          <button type="button" className="pill pill--dark" onClick={() => setSent(false)}>
            <span className="pill__dot" aria-hidden="true" />
            <span className="pill__text" data-text="Send another">Send another</span>
          </button>
        </Reveal>
      ) : (
        <Reveal as="form" className="form" onSubmit={onSubmit} delay={0.1}>
          <fieldset>
            <legend>I’m interested in…</legend>
            <div className="form__chips">
              {interests.map((i) => (
                <button type="button" key={i} className={`chip ${picked.includes(i) ? 'is-active' : ''}`} aria-pressed={picked.includes(i)} onClick={() => toggle(i)}>
                  {i}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="form__row">
            <label className="field">
              <span>Your name *</span>
              <input name="name" required autoComplete="name" />
            </label>
            <label className="field">
              <span>Email *</span>
              <input name="email" type="email" required autoComplete="email" />
            </label>
          </div>
          <label className="field">
            <span>Company</span>
            <input name="company" autoComplete="organization" />
          </label>

          <fieldset>
            <legend>Project budget</legend>
            <div className="form__chips">
              {budgets.map((b) => (
                <button type="button" key={b} className={`chip ${budget === b ? 'is-active' : ''}`} aria-pressed={budget === b} onClick={() => setBudget(budget === b ? '' : b)}>
                  {b}
                </button>
              ))}
            </div>
          </fieldset>

          <label className="field">
            <span>Tell us about your project *</span>
            <textarea name="message" rows="5" required />
          </label>

          <button type="submit" className="pill pill--accent pill--lg form__submit">
            <span className="pill__dot" aria-hidden="true" />
            <span className="pill__text" data-text="Send message">Send message</span>
          </button>
        </Reveal>
      )}
    </section>
  )
}
