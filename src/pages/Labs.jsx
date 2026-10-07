import { useState } from 'react'
import CTA from '../components/CTA'
import ShaderCanvas from '../three/ShaderCanvas'
import { Reveal, SplitText } from '../components/Reveal'
import useDocumentTitle from '../hooks/useDocumentTitle'

const experiments = [
  { id: 'flow', title: 'Fluid Field', text: 'Layered noise warped into itself — a living gradient that follows the cursor.', colors: ['#0b0d1f', '#3d4bff', '#e7eaff'] },
  { id: 'rings', title: 'Interference', text: 'Two wave sources collide. Move the pointer to shift one of them.', colors: ['#f4f5fa', '#0d0e14', '#3d4bff'] },
  { id: 'dots', title: 'Horizon', text: 'An endless field of dots rolling toward a glowing horizon.', colors: ['#06070c', '#7f8bff', '#ff3d81'] },
  { id: 'blobs', title: 'Metaballs', text: 'Soft bodies that merge and split. Your cursor is one of them.', colors: ['#120d1f', '#b76bff', '#ffe066'] },
  { id: 'chrome', title: 'Liquid Chrome', text: 'Iridescent stripes bending over a noisy surface.', colors: ['#0d0e14', '#c9cfff', '#ffffff'] },
]

export default function Labs() {
  useDocumentTitle('Labs — Beyond')
  const [active, setActive] = useState(0)
  const exp = experiments[active]

  return (
    <>
      <section className="page-hero container">
        <Reveal className="eyebrow">( R&amp;D playground )</Reveal>
        <SplitText as="h1" className="page-title" text="Labs" />
        <Reveal className="page-hero__lead" delay={0.2}>
          <p>Small experiments, shader sketches and prototypes. Pick one and play with it — every piece runs live in your browser.</p>
        </Reveal>
      </section>

      <section className="labs container">
        <Reveal className="labs__stage" data-cursor="Play">
          <ShaderCanvas key={exp.id} shader={exp.id} colors={exp.colors} />
          <div className="labs__caption">
            <span>0{active + 1}</span>
            <h2>{exp.title}</h2>
            <p>{exp.text}</p>
          </div>
        </Reveal>
        <ol className="labs__list">
          {experiments.map((e, i) => (
            <li key={e.id}>
              <button type="button" className={`labs__item ${i === active ? 'is-active' : ''}`} aria-pressed={i === active} onClick={() => setActive(i)}>
                <span className="labs__num">0{i + 1}</span>
                <span className="labs__title">{e.title}</span>
                <span className="labs__swatch" style={{ background: `linear-gradient(120deg, ${e.colors.join(', ')})` }} />
              </button>
            </li>
          ))}
        </ol>
      </section>

      <CTA title={'Got a wild\nidea to test?'} />
    </>
  )
}
