// Generated cover artwork for projects (pure SVG + CSS, no image files).
// Replace with real imagery by giving a project a `cover` path.
function Orbit({ c }) {
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id={`og-${c[1]}`} cx="35%" cy="30%" r="70%">
          <stop offset="0" stopColor={c[2]} />
          <stop offset="0.45" stopColor={c[1]} />
          <stop offset="1" stopColor={c[0]} />
        </radialGradient>
      </defs>
      <rect width="400" height="300" fill={c[0]} />
      <g className="art__spin" style={{ transformOrigin: '200px 150px' }}>
        {[60, 95, 130, 165, 200].map((r, i) => (
          <ellipse
            key={r}
            cx="200"
            cy="150"
            rx={r}
            ry={r * 0.36}
            fill="none"
            stroke={c[2]}
            strokeOpacity={0.5 - i * 0.08}
            strokeDasharray={i % 2 ? '2 6' : 'none'}
            transform={`rotate(${-18 + i * 3} 200 150)`}
          />
        ))}
      </g>
      <circle className="art__float" cx="200" cy="150" r="54" fill={`url(#og-${c[1]})`} />
      <circle className="art__orbiter" cx="330" cy="120" r="9" fill={c[2]} />
    </svg>
  )
}

function Blob({ c }) {
  return (
    <div className="art__blob" style={{ background: c[0] }}>
      <span style={{ background: c[1] }} />
      <span style={{ background: c[2] }} />
      <span style={{ background: c[1] }} />
    </div>
  )
}

function Wave({ c }) {
  const lines = Array.from({ length: 22 }, (_, i) => {
    const y = 40 + i * 10
    const amp = 18 + Math.sin(i * 0.6) * 14
    const d = `M -20 ${y} C 80 ${y - amp}, 140 ${y + amp}, 200 ${y} S 320 ${y - amp}, 420 ${y}`
    return <path key={i} d={d} stroke={i % 5 === 0 ? c[2] : c[1]} strokeOpacity={0.35 + (i % 5 === 0) * 0.5} />
  })
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="300" fill={c[0]} />
      <g className="art__drift" fill="none" strokeWidth="1.4">
        {lines}
      </g>
    </svg>
  )
}

function Stack({ c }) {
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="300" fill={c[0]} />
      {[0, 1, 2, 3].map((i) => (
        <g key={i} className="art__lift" style={{ '--i': i }}>
          <rect
            x={120 + i * 14}
            y={70 + i * 34}
            width="160"
            height="70"
            rx="22"
            fill={i === 3 ? c[2] : c[1]}
            fillOpacity={i === 3 ? 1 : 0.12 + i * 0.22}
            transform={`skewY(-12) translate(0 ${60})`}
          />
        </g>
      ))}
      <circle cx="320" cy="70" r="6" fill={c[2]} />
    </svg>
  )
}

function Grid({ c }) {
  const dots = []
  for (let y = 0; y < 12; y++)
    for (let x = 0; x < 16; x++) {
      const dx = x - 7.5
      const dy = y - 5.5
      const d = Math.sqrt(dx * dx + dy * dy)
      const on = Math.abs(d - 4.2) < 0.9
      dots.push(
        <circle
          key={`${x}-${y}`}
          cx={20 + x * 24}
          cy={18 + y * 24}
          r={on ? 5 : 2}
          fill={on ? (d > 4.2 ? c[2] : c[1]) : c[1]}
          fillOpacity={on ? 1 : 0.25}
          className={on ? 'art__pulse' : undefined}
          style={on ? { '--d': `${(Math.atan2(dy, dx) + Math.PI) / 6}s` } : undefined}
        />,
      )
    }
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="300" fill={c[0]} />
      {dots}
    </svg>
  )
}

function Type({ c, letter }) {
  return (
    <div className="art__type" style={{ background: c[0], color: c[1] }}>
      <span className="art__letter">{letter}</span>
      <span className="art__chip" style={{ background: c[2] }} />
    </div>
  )
}

const variants = { orbit: Orbit, blob: Blob, wave: Wave, stack: Stack, grid: Grid, type: Type }

export default function ProjectArt({ project, className = '' }) {
  if (project.cover) {
    return (
      <div className={`art ${className}`}>
        <img src={project.cover} alt="" loading="lazy" />
      </div>
    )
  }
  const Variant = variants[project.art.variant] ?? Blob
  return (
    <div className={`art art--${project.art.variant} ${className}`} aria-hidden="true">
      <Variant c={project.art.colors} letter={project.client[0]} />
    </div>
  )
}
