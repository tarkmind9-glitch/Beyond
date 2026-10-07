import { useApp } from './AppProvider'
import Logo from './Logo'

export default function Curtain() {
  const { curtain } = useApp()
  return (
    <div className={`curtain curtain--${curtain}`} aria-hidden="true">
      <div className="curtain__panel">
        <Logo className="curtain__logo" />
      </div>
    </div>
  )
}
