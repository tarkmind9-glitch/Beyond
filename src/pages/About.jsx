import CTA from '../components/CTA'
import Marquee from '../components/Marquee'
import ShaderCanvas from '../three/ShaderCanvas'
import { Reveal, SplitText } from '../components/Reveal'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { clients, process, services, team } from '../data/site'

const initials = (name) =>
  name
    .split(' ')
    .map((n) => n[0])
    .join('')

const avatarColors = [
  ['#0b0d1f', '#3d4bff', '#c9d0ff'],
  ['#1d1a14', '#ffb547', '#fff1d6'],
  ['#0f1a17', '#38e2a4', '#d7fff0'],
  ['#120d1f', '#b76bff', '#ffe066'],
  ['#16161a', '#ff4d2e', '#f2f2f2'],
  ['#0d0e14', '#ff3d81', '#7af0ff'],
]

export default function About() {
  useDocumentTitle('About — Beyond')
  return (
    <>
      <section className="page-hero container">
        <Reveal className="eyebrow">( About us )</Reveal>
        <SplitText as="h1" className="page-title" text={'Curious minds,\ncrafted worlds.'} />
        <Reveal className="page-hero__lead" delay={0.2}>
          <p>
            We are a small, senior team of designers, developers and artists. We believe the web can be as rich and
            emotional as any film or game — and we build to prove it.
          </p>
        </Reveal>
      </section>

      <Reveal className="about__visual container">
        <ShaderCanvas shader="chrome" colors={['#0d0e14', '#3d4bff', '#c9cfff']} />
        <span className="about__visual-label">Est. 2014 · Independent · Remote-friendly</span>
      </Reveal>

      <section className="about__intro container">
        <Reveal className="eyebrow">( Our approach )</Reveal>
        <div className="about__cols">
          <Reveal as="p" className="about__big">
            Great digital experiences come from design and engineering working as one. Every project at Beyond is led by
            people who can both imagine it and build it.
          </Reveal>
          <Reveal as="p" delay={0.1}>
            That means fewer handovers, faster iteration and a finished product that looks and feels exactly like the
            idea we fell in love with. We work with global brands, ambitious start-ups and fellow agencies — always as a
            true creative partner.
          </Reveal>
        </div>
      </section>

      <section className="process container">
        <div className="section-head">
          <SplitText as="h2" className="section-title" text={'How we\nwork'} />
        </div>
        <ol className="process__grid">
          {process.map((step, i) => (
            <Reveal as="li" key={step.title} className="process__card" delay={i * 0.08}>
              <span className="process__num">0{i + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      <Marquee items={services.map((s) => s.title)} speed={0.8} />

      <section className="team container">
        <div className="section-head">
          <SplitText as="h2" className="section-title" text={'The\nteam'} />
          <Reveal className="section-head__aside" delay={0.15}>
            <p>Replace these placeholders with your own people.</p>
          </Reveal>
        </div>
        <ul className="team__grid">
          {team.map((m, i) => (
            <Reveal as="li" key={m.name} className="member" delay={(i % 3) * 0.08}>
              <div className="member__photo art__blob" style={{ background: avatarColors[i % avatarColors.length][0] }}>
                <span style={{ background: avatarColors[i % avatarColors.length][1] }} />
                <span style={{ background: avatarColors[i % avatarColors.length][2] }} />
                <b>{initials(m.name)}</b>
              </div>
              <h3>{m.name}</h3>
              <p>{m.role}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="clients container">
        <Reveal className="eyebrow">( Clients &amp; partners )</Reveal>
        <ul className="clients__grid">
          {clients.map((c, i) => (
            <Reveal as="li" key={c} delay={(i % 5) * 0.05} className={`clients__item clients__item--${i % 4}`}>
              {c}
            </Reveal>
          ))}
        </ul>
      </section>

      <CTA title={'Want to join\nor work with us?'} />
    </>
  )
}
