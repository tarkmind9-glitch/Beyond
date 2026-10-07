// Central place for studio details. Replace these placeholders with your own.
export const site = {
  name: 'Beyond',
  tagline: 'Creative Studio',
  email: 'hello@beyond.studio',
  phone: '+00 000 000 0000',
  address: ['Unit 04, Studio Yard', 'Your City, Country'],
  // Set to a video URL (e.g. '/reel.mp4') to show a real showreel instead of the shader.
  reelVideo: null,
  socials: [
    { label: 'Instagram', href: 'https://instagram.com' },
    { label: 'LinkedIn', href: 'https://linkedin.com' },
    { label: 'Behance', href: 'https://behance.net' },
    { label: 'X / Twitter', href: 'https://x.com' },
  ],
  nav: [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Projects', to: '/projects' },
    { label: 'Labs', to: '/labs' },
    { label: 'Contact', to: '/contact' },
  ],
}

export const services = [
  {
    title: 'Interactive 3D',
    text: 'Real-time WebGL worlds, product configurators and playful scenes that run smoothly in any modern browser.',
    tags: ['WebGL', 'Three.js', 'Shaders'],
  },
  {
    title: 'Websites & Platforms',
    text: 'Award-calibre marketing sites and digital products, engineered for speed, accessibility and easy editing.',
    tags: ['React', 'Headless CMS', 'Performance'],
  },
  {
    title: 'Brand & Motion',
    text: 'Identity systems that move. Motion languages, launch films and 3D assets that make a brand feel alive.',
    tags: ['Identity', 'Motion', 'CGI'],
  },
  {
    title: 'XR & Installations',
    text: 'Spatial experiences for headsets, events and physical spaces — from prototypes to permanent pieces.',
    tags: ['WebXR', 'Installations', 'Events'],
  },
  {
    title: 'Creative R&D',
    text: 'Experimental tech, rapid prototypes and tools that help teams explore what comes next.',
    tags: ['Prototyping', 'AI', 'Tools'],
  },
]

export const clients = [
  'Orbitra', 'Pelluna', 'Quorvia', 'Halvex', 'Mirelo', 'Zentrik', 'Lumora', 'Tessaly', 'Corvane', 'Ilyra',
]

export const stats = [
  { value: 12, suffix: '+', label: 'Years crafting digital' },
  { value: 140, suffix: '+', label: 'Projects launched' },
  { value: 30, suffix: '', label: 'Industry awards' },
  { value: 18, suffix: '', label: 'Countries reached' },
]

export const team = [
  { name: 'Alex Morgan', role: 'Founder, Creative Director' },
  { name: 'Sam Rivera', role: 'Technical Director' },
  { name: 'Jordan Lee', role: 'Lead 3D Developer' },
  { name: 'Riley Chen', role: 'Design Lead' },
  { name: 'Taylor Brooks', role: 'Producer' },
  { name: 'Casey Nguyen', role: 'Motion Designer' },
]

export const process = [
  {
    title: 'Discover',
    text: 'We start with questions. Workshops, research and quick sketches help us find the idea worth building.',
  },
  {
    title: 'Prototype',
    text: 'Ideas become interactive fast. Early prototypes let us test the feel before we polish a single pixel.',
  },
  {
    title: 'Craft',
    text: 'Design and engineering work side by side, refining motion, detail and performance until it sings.',
  },
  {
    title: 'Launch',
    text: 'We ship with care, measure what matters, and stay around to keep things evolving.',
  },
]
