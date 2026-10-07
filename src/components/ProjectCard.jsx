import TLink from './TLink'
import ProjectArt from './ProjectArt'
import { Reveal } from './Reveal'

export default function ProjectCard({ project, index = 0, size = '' }) {
  return (
    <Reveal className={`card ${size ? `card--${size}` : ''}`} delay={(index % 2) * 0.08}>
      <TLink to={`/projects/${project.slug}`} className="card__link" data-cursor="View">
        <div className="card__media">
          <ProjectArt project={project} />
          <span className="card__arrow" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M7 17L17 7M9 7h8v8" />
            </svg>
          </span>
        </div>
        <div className="card__info">
          <h3 className="card__title">{project.title}</h3>
          <ul className="card__tags">
            {project.tags.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </TLink>
    </Reveal>
  )
}
