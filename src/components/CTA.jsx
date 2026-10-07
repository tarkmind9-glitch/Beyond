import TLink from './TLink'
import ShaderCanvas from '../three/ShaderCanvas'
import { SplitText, Reveal } from './Reveal'
import { site } from '../data/site'

// Dark "start a project" block shown above the footer on most pages.
export default function CTA({ title = 'Have an idea?\nLet’s take it\nbeyond.' }) {
  return (
    <section className="cta" data-theme="dark">
      <ShaderCanvas shader="blobs" colors={['#0b0c12', '#1d24a8', '#7f8bff']} className="cta__bg" speed={0.6} />
      <div className="cta__inner container">
        <Reveal className="eyebrow eyebrow--light">( Start a project )</Reveal>
        <SplitText as="h2" className="cta__title" text={title} />
        <Reveal className="cta__actions" delay={0.2}>
          <TLink to="/contact" className="pill pill--accent pill--lg">
            <span className="pill__dot" aria-hidden="true" />
            <span className="pill__text" data-text="Let’s talk">Let’s talk</span>
          </TLink>
          <a className="cta__mail" href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </Reveal>
      </div>
    </section>
  )
}
