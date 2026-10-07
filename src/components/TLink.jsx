import { useApp } from './AppProvider'

// Internal link that plays the page-transition curtain before navigating.
export default function TLink({ to, children, onClick, ...rest }) {
  const { go } = useApp()

  const handleClick = (e) => {
    onClick?.(e)
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
    e.preventDefault()
    go(to)
  }

  return (
    <a href={to} onClick={handleClick} {...rest}>
      {children}
    </a>
  )
}
