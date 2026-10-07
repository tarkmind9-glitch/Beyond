import useInView from '../hooks/useInView'
import { useApp } from './AppProvider'

// Fades/slides children in when scrolled into view.
export function Reveal({ as: Tag = 'div', className = '', delay = 0, children, ...rest }) {
  const [ref, inView] = useInView()
  const { loaded } = useApp()
  return (
    <Tag
      ref={ref}
      className={`reveal ${inView && loaded ? 'is-in' : ''} ${className}`}
      style={{ '--delay': `${delay}s` }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

// Splits a string into lines (by "\n") and words; each word slides up from a mask.
export function SplitText({ as: Tag = 'h2', text, className = '', delay = 0, stagger = 0.04 }) {
  const [ref, inView] = useInView()
  const { loaded } = useApp()
  let index = 0
  return (
    <Tag ref={ref} className={`split ${inView && loaded ? 'is-in' : ''} ${className}`} aria-label={text.replace(/\n/g, ' ')}>
      {text.split('\n').map((line, li) => (
        <span className="split__line" key={li} aria-hidden="true">
          {line.split(' ').map((word, wi) => {
            const i = index++
            return (
              <span className="split__mask" key={wi}>
                <span className="split__word" style={{ '--d': `${delay + i * stagger}s` }}>
                  {word}
                </span>
              </span>
            )
          })}
        </span>
      ))}
    </Tag>
  )
}
