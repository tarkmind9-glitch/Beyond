import { useParams } from 'react-router-dom'
import TLink from '../components/TLink'
import ProjectArt from '../components/ProjectArt'
import ShaderCanvas from '../three/ShaderCanvas'
import { Reveal, SplitText } from '../components/Reveal'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { getNextProject, getProject } from '../data/projects'
import NotFound from './NotFound'

const galleryShaders = ['chrome', 'rings', 'dots']

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = getProject(slug)
  useDocumentTitle(project ? `${project.title} — Beyond` : 'Not found — Beyond')
  if (!project) return <NotFound />
  const next = getNextProject(slug)
  const [c1, c2, c3] = project.art.colors

  return (
    <article key={slug}>
      <section className="page-hero container">
        <Reveal className="eyebrow">
          <TLink to="/projects" className="back-link">
            ← All projects
          </TLink>
        </Reveal>
        <SplitText as="h1" className="page-title" text={project.title} />
        <Reveal className="page-hero__lead" delay={0.2}>
          <p>{project.summary}</p>
        </Reveal>
      </section>

      <Reveal className="detail__cover container">
        <ProjectArt project={project} className="art--cover" />
      </Reveal>

      <section className="detail__meta container">
        <Reveal className="detail__facts">
          <dl>
            <div>
              <dt>Client</dt>
              <dd>{project.client}</dd>
            </div>
            <div>
              <dt>Year</dt>
              <dd>{project.year}</dd>
            </div>
            <div>
              <dt>Services</dt>
              <dd>
                {project.services.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </dd>
            </div>
          </dl>
        </Reveal>
        <div className="detail__body">
          <Reveal as="p" className="detail__intro">
            {project.intro}
          </Reveal>
          {project.body.map((para, i) => (
            <Reveal as="p" key={i} delay={0.05 * (i + 1)}>
              {para}
            </Reveal>
          ))}
        </div>
      </section>

      <section className="detail__gallery container">
        {galleryShaders.map((s, i) => (
          <Reveal key={s} className={`detail__shot detail__shot--${i}`} delay={i * 0.08}>
            <ShaderCanvas shader={s} colors={[c1, c2, c3]} speed={0.7} />
          </Reveal>
        ))}
      </section>

      <section className="next" data-theme="dark">
        <TLink to={`/projects/${next.slug}`} className="next__link" data-cursor="Next">
          <span className="eyebrow eyebrow--light">( Next project )</span>
          <span className="next__title">{next.title}</span>
          <span className="next__art">
            <ProjectArt project={next} />
          </span>
        </TLink>
      </section>
    </article>
  )
}
