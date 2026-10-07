// Placeholder case studies. Swap in your own work — `art` controls the generated cover artwork
// until you replace it with real imagery (set `cover: '/images/your-file.jpg'`).
export const projects = [
  {
    slug: 'orbitra-launch',
    category: 'Interactive 3D',
    title: 'Orbitra Launch',
    client: 'Orbitra',
    year: 2026,
    tags: ['WebGL', 'Website', 'Launch'],
    summary: 'A real-time orbital experience introducing a new satellite network.',
    art: { variant: 'orbit', colors: ['#0b0d1f', '#3d4bff', '#c9d0ff'] },
    services: ['Creative Direction', 'Interactive 3D', 'Web Development'],
    intro:
      'Orbitra needed a launch moment as ambitious as its technology. We built a browser-based mission control where visitors follow every satellite in real time, zooming from planetary scale down to a single solar panel.',
    body: [
      'The experience streams live orbital data into a custom WebGL renderer, keeping thousands of objects at a steady 60fps on mid-range laptops and phones.',
      'A cinematic intro sequence hands over to free exploration, with a narrative layer that surfaces key facts as you move through the network.',
    ],
    featured: true,
  },
  {
    slug: 'pelluna-skincare',
    category: 'Interactive 3D',
    title: 'Pelluna Rituals',
    client: 'Pelluna',
    year: 2026,
    tags: ['3D Product', 'E-commerce'],
    summary: 'A tactile, liquid-glass product world for a skincare line.',
    art: { variant: 'blob', colors: ['#f4e9e1', '#ff8a6b', '#ffd2a8'] },
    services: ['Art Direction', '3D Product Viewer', 'Shopify Build'],
    intro:
      'For Pelluna we translated texture into interaction. Each product lives in its own glass-like environment that ripples, refracts and reacts to the cursor.',
    body: [
      'A lightweight product viewer replaces static photography, letting shoppers turn, zoom and compare formulas.',
      'The system plugs into the existing store so the team can launch new products without touching code.',
    ],
    featured: true,
  },
  {
    slug: 'quorvia-annual-report',
    category: 'Website',
    title: 'Quorvia Data Stories',
    client: 'Quorvia',
    year: 2025,
    tags: ['Data Viz', 'Storytelling'],
    summary: 'An annual report reimagined as a scroll-driven data journey.',
    art: { variant: 'wave', colors: ['#0f1a17', '#38e2a4', '#d7fff0'] },
    services: ['Data Visualisation', 'Motion Design', 'Development'],
    intro:
      'Quorvia wanted people to actually read their annual report. We turned a hundred pages of figures into a single flowing story, where every number becomes a moment.',
    body: [
      'Scroll-linked animation reveals the data at the reader’s pace, while an accessible table view keeps everything usable for screen readers.',
      'Average time on page rose fourfold compared with the previous PDF edition.',
    ],
    featured: true,
  },
  {
    slug: 'halvex-motors',
    category: 'Interactive 3D',
    title: 'Halvex Configurator',
    client: 'Halvex',
    year: 2025,
    tags: ['Configurator', 'WebGL'],
    summary: 'A photoreal electric-bike configurator running in the browser.',
    art: { variant: 'stack', colors: ['#16161a', '#f2f2f2', '#ff4d2e'] },
    services: ['3D Pipeline', 'Configurator', 'Performance'],
    intro:
      'Halvex customers can now build their bike part by part in a photoreal 3D configurator that loads in under two seconds.',
    body: [
      'We built an asset pipeline that turns engineering CAD into optimised real-time models automatically.',
      'Every choice updates price, weight and range live, and saved builds can be shared with a link.',
    ],
    featured: true,
  },
  {
    slug: 'mirelo-festival',
    category: 'Spatial',
    title: 'Mirelo Lights',
    client: 'Mirelo Festival',
    year: 2025,
    tags: ['Installation', 'Generative'],
    summary: 'A generative light installation driven by the crowd.',
    art: { variant: 'grid', colors: ['#120d1f', '#b76bff', '#ffe066'] },
    services: ['Concept', 'Generative Systems', 'Installation'],
    intro:
      'At Mirelo Festival, a forty-metre LED wall responded to the movement and noise of the crowd, painting a new composition every night.',
    body: [
      'Depth cameras fed a particle system written in custom shaders, tuned on site over three nights.',
      'A companion web experience let visitors replay their own night from home.',
    ],
  },
  {
    slug: 'zentrik-brand',
    category: 'Brand & Motion',
    title: 'Zentrik Identity',
    client: 'Zentrik',
    year: 2024,
    tags: ['Brand', 'Motion'],
    summary: 'A modular identity and motion system for a fintech platform.',
    art: { variant: 'type', colors: ['#eef0f6', '#0d0e14', '#3d4bff'] },
    services: ['Brand Identity', 'Motion System', 'Guidelines'],
    intro:
      'Zentrik’s new identity is built from a single geometric module that scales from app icon to stadium screen, with a motion language to match.',
    body: [
      'We delivered a toolkit of animated components so the in-house team can produce on-brand motion in minutes.',
      'The system launched across product, marketing and events in a single quarter.',
    ],
  },
  {
    slug: 'lumora-xr',
    category: 'Spatial',
    title: 'Lumora Spaces',
    client: 'Lumora',
    year: 2024,
    tags: ['WebXR', 'Spatial'],
    summary: 'A shared virtual gallery accessible from any headset or browser.',
    art: { variant: 'orbit', colors: ['#1d1a14', '#ffb547', '#fff1d6'] },
    services: ['Spatial Design', 'WebXR', 'Multiplayer'],
    intro:
      'Lumora Spaces is a virtual gallery where visitors meet, talk and explore exhibitions together — no app download required.',
    body: [
      'Built on open web standards, the same space works on headsets, desktops and phones.',
      'Curators can update exhibitions through a simple dashboard.',
    ],
  },
  {
    slug: 'tessaly-music',
    category: 'Website',
    title: 'Tessaly Visualiser',
    client: 'Tessaly Records',
    year: 2023,
    tags: ['Audio Reactive', 'Web'],
    summary: 'An audio-reactive album experience for a debut record.',
    art: { variant: 'wave', colors: ['#0d0e14', '#ff3d81', '#7af0ff'] },
    services: ['Creative Direction', 'Audio Visuals', 'Development'],
    intro:
      'Every track on Tessaly’s debut album has its own reactive world that listeners can play with while the music runs.',
    body: [
      'Real-time audio analysis drives the visuals, so each listen feels slightly different.',
      'Fans shared over 200k custom snapshots during release week.',
    ],
  },
]

export const categories = Array.from(new Set(projects.map((p) => p.category)))

export function getProject(slug) {
  return projects.find((p) => p.slug === slug)
}

export function getNextProject(slug) {
  const i = projects.findIndex((p) => p.slug === slug)
  return projects[(i + 1) % projects.length]
}
