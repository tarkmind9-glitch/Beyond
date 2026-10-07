// Original "Beyond" mark: a solid circle stepping past an outlined one.
export function Mark({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <circle cx="15" cy="20" r="10" fill="currentColor" />
      <circle cx="25" cy="20" r="10" stroke="currentColor" strokeWidth="3" />
    </svg>
  )
}

export default function Logo({ className = '' }) {
  return (
    <span className={`logo ${className}`}>
      <Mark />
      <span className="logo__word">Beyond</span>
    </span>
  )
}
