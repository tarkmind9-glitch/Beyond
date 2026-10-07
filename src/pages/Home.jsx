import { lazy, Suspense, useRef } from 'react'
import TLink from '../components/TLink'
import { Reveal, SplitText } from '../components/Reveal'
import ProjectCard from '../components/ProjectCard'
import Marquee from '../components/Marquee'
import CTA from '../components/CTA'
import ShaderCanvas from '../three/ShaderCanvas'
import { useApp } from '../components/AppProvider'
import useScrollProgress from '../hooks/useScrollProgress'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { projects } from '../data/projects'
import { clients, services, site, stats } from '../data/site'
import { lerp } from '../lib/ticker'
import Counter from '../components/Counter'

const HeroScene = lazy(() => import('../three/HeroScene'))

function Hero() {
  const { loaded } = useApp()
  const contentRef = useRef(null)
  const sceneRef = useRef(null)
  const ref = useScrollProgress(
    (p) => {
      if (contentRef.current) contentRef.current.style.transform = `translate3d(0, ${p * -12}vh, 0)`
      if (sceneRef.current) {
        sceneRef.current.style.transform = `scale(${1 - p * 0.08})`
        sceneRef.current.style.opacity = String(1 - p * 0.9)
      }
    },
    { start: 0, end: -1 },
  )

  return (
    <section ref={ref} className={`hero ${loaded ? 'is-ready' : ''}`}>
      <div ref={sceneRef} className="hero__scene">
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </div>
      <div ref={contentRef} className="hero__content container">
        <SplitText as="h1" className="hero__title" text={'We craft digital\nexperiences that\nfeel alive.'} delay={0.15} stagger={0.06} />
        <div className="hero__aside">
          <Reveal as="p" className="hero__lead" delay={0.6}>
            Beyond is an independent creative studio blending design, technology and storytelling to build interactive
            3D, websites and immersive worlds.
          </Reveal>
          <Reveal className="hero__scroll" delay={0.75}>
            <span className="hero__scroll-line" aria-hidden="true" />
            Scroll to explore
          </Reveal>
        </div>
      </div>
      <Reveal className="hero__hint" delay={1}>
        Move, click &amp; play
      </Reveal>
    </section>
  )
}

const STATEMENT =
  'Beyond is a design and technology studio. We partner with brands, agencies and curious people to turn bold ideas into interactive experiences — fast, beautiful and built to last.'

function Statement() {
  const words = STATEMENT.split(' ')
  const spans = useRef([])
  const ref = useScrollProgress(
    (p) => {
      const lit = p * words.length * 1.15
      spans.current.forEach((el, i) => {
        if (el) el.style.opacity = String(lerp(0.16, 1, Math.min(1, Math.max(0, lit - i))))
      })
    },
    { start: 0.85, end: 0.25 },
  )

  return (
    <section className="statement container">
      <div className="statement__grid">
        <Reveal className="eyebrow">( About the studio )</Reveal>
        <div>
          <p ref={ref} className="statement__text" aria-label={STATEMENT}>
            {words.map((w, i) => (
              <span key={i} ref={(el) => (spans.current[i] = el)} aria-hidden="true">
                {w}{' '}
              </span>
            ))}
          </p>
          <Reveal delay={0.1}>
            <TLink to="/about" className="pill pill--dark">
              <span className="pill__dot" aria-hidden="true" />
              <span className="pill__text" data-text="About us">About us</span>
            </TLink>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Reel() {
  const cardRef = useRef(null)
  const labelRef = useRef(null)
  const ref = useScrollProgress(
    (p) => {
      const card = cardRef.current
      if (!card) return
      const e = 1 - Math.pow(1 - p, 3)
      const w = window.innerWidth
      const startW = Math.min(w * 0.6, 760)
      const width = lerp(startW, w, e)
      card.style.width = `${width}px`
      card.style.height = `${lerp((startW * 9) / 16, window.innerHeight, e)}px`
      card.style.borderRadius = `${lerp(28, 0, e)}px`
      if (labelRef.current) labelRef.current.style.transform = `translate3d(0, ${lerp(0, -40, p)}px, 0)`
    },
    { edge: 'sticky' },
  )

  return (
    <section ref={ref} className="reel">
      <div className="reel__sticky">
        <div ref={cardRef} className="reel__card" data-cursor="Reel">
          {site.reelVideo ? (
            <video src={site.reelVideo} autoPlay muted loop playsInline />
          ) : (
            <ShaderCanvas shader="flow" colors={['#0b0d1f', '#3d4bff', '#e7eaff']} />
          )}
          <div ref={labelRef} className="reel__label">
            <span>Showreel</span>
            <span>( 2026 )</span>
          </div>
        </div>
      </div>
    </section>
  )
}

function FeaturedWork() {
  const featured = projects.filter((p) => p.featured)
  return (
    <section className="work container">
      <div className="section-head">
        <SplitText as="h2" className="section-title" text={'Featured\nWork'} />
        <Reveal className="section-head__aside" delay={0.15}>
          <p>A selection of recent projects across interactive 3D, web and spatial experiences.</p>
          <span className="eyebrow">( 2023 — 2026 )</span>
        </Reveal>
      </div>
      <div className="work__grid">
        {featured.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} />
        ))}
      </div>
      <Reveal className="work__more">
        <TLink to="/projects" className="pill pill--dark pill--lg">
          <span className="pill__dot" aria-hidden="true" />
          <span className="pill__text" data-text="See all projects">See all projects</span>
        </TLink>
      </Reveal>
    </section>
  )
}

function Services() {
  return (
    <section className="services container">
      <div className="section-head">
        <SplitText as="h2" className="section-title" text={'What\nwe do'} />
        <Reveal className="section-head__aside" delay={0.15}>
          <p>From first sketch to launch day, one team designs and engineers every detail.</p>
        </Reveal>
      </div>
      <ol className="services__list">
        {services.map((s, i) => (
          <Reveal as="li" key={s.title} className="service" delay={i * 0.05}>
            <span className="service__num">0{i + 1}</span>
            <h3 className="service__title">{s.title}</h3>
            <p className="service__text">{s.text}</p>
            <ul className="service__tags">
              {s.tags.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}

function Numbers() {
  return (
    <section className="numbers container">
      {stats.map((s, i) => (
        <Reveal key={s.label} className="numbers__item" delay={i * 0.08}>
          <span className="numbers__value">
            <Counter value={s.value} />
            {s.suffix}
          </span>
          <span className="numbers__label">{s.label}</span>
        </Reveal>
      ))}
    </section>
  )
}

function Clients() {
  return (
    <section className="clients container">
      <Reveal className="eyebrow">( Trusted by )</Reveal>
      <ul className="clients__grid">
        {clients.map((c, i) => (
          <Reveal as="li" key={c} delay={(i % 5) * 0.05} className={`clients__item clients__item--${i % 4}`}>
            {c}
          </Reveal>
        ))}
      </ul>
    </section>
  )
}

export default function Home() {
  useDocumentTitle('Beyond — Creative Studio')
  return (
    <>
      <Hero />
      <Statement />
      <Reel />
      <FeaturedWork />
      <Marquee items={['Imagine', 'Design', 'Build', 'Launch']} className="marquee--big" />
      <Services />
      <Numbers />
      <Clients />
      <CTA />
    </>
  )
}
