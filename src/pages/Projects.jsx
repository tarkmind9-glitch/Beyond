import { useState } from 'react'
import ProjectCard from '../components/ProjectCard'
import TLink from '../components/TLink'
import ProjectArt from '../components/ProjectArt'
import CTA from '../components/CTA'
import { Reveal, SplitText } from '../components/Reveal'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { categories, projects } from '../data/projects'

export default function Projects() {
  useDocumentTitle('Projects — Beyond')
  const [filter, setFilter] = useState('All')
  const [view, setView] = useState('grid')
  const list = filter === 'All' ? projects : projects.filter((p) => p.category === filter)

  return (
    <>
      <section className="page-hero container">
        <Reveal className="eyebrow">( {projects.length} Projects )</Reveal>
        <SplitText as="h1" className="page-title" text="Our Work" />
        <Reveal className="page-hero__lead" delay={0.2}>
          <p>Interactive 3D, websites, installations and brand systems for teams who want to go further.</p>
        </Reveal>
      </section>

      <section className="container">
        <Reveal className="filters">
          <div className="filters__chips" role="group" aria-label="Filter projects">
            {['All', ...categories].map((t) => (
              <button
                type="button"
                key={t}
                className={`chip ${filter === t ? 'is-active' : ''}`}
                aria-pressed={filter === t}
                onClick={() => setFilter(t)}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="filters__view" role="group" aria-label="Layout">
            <button type="button" className={`chip ${view === 'grid' ? 'is-active' : ''}`} aria-pressed={view === 'grid'} onClick={() => setView('grid')}>
              Grid
            </button>
            <button type="button" className={`chip ${view === 'list' ? 'is-active' : ''}`} aria-pressed={view === 'list'} onClick={() => setView('list')}>
              List
            </button>
          </div>
        </Reveal>

        {view === 'grid' ? (
          <div className="work__grid work__grid--all" key={filter}>
            {list.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} />
            ))}
          </div>
        ) : (
          <ul className="plist" key={filter}>
            {list.map((p, i) => (
              <Reveal as="li" key={p.slug} delay={i * 0.04}>
                <TLink to={`/projects/${p.slug}`} className="plist__row" data-cursor="View">
                  <span className="plist__year">{p.year}</span>
                  <span className="plist__title">{p.title}</span>
                  <span className="plist__tags">{p.tags.join(' · ')}</span>
                  <span className="plist__thumb">
                    <ProjectArt project={p} />
                  </span>
                </TLink>
              </Reveal>
            ))}
          </ul>
        )}
      </section>

      <CTA />
    </>
  )
}
