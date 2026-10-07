import TLink from '../components/TLink'
import ShaderCanvas from '../three/ShaderCanvas'
import useDocumentTitle from '../hooks/useDocumentTitle'

export default function NotFound() {
  useDocumentTitle('Lost in space — Beyond')
  return (
    <section className="notfound" data-theme="dark">
      <ShaderCanvas shader="dots" colors={['#06070c', '#3d4bff', '#c9cfff']} className="notfound__bg" />
      <div className="notfound__inner">
        <span className="notfound__code">404</span>
        <p>This page drifted beyond the edge of the map.</p>
        <TLink to="/" className="pill pill--accent pill--lg">
          <span className="pill__dot" aria-hidden="true" />
          <span className="pill__text" data-text="Back home">Back home</span>
        </TLink>
      </div>
    </section>
  )
}
