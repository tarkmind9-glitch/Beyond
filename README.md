# Beyond — Creative Studio Website

An immersive, award-style studio website built with **React 19 + Vite**, featuring an interactive
3D hero, smooth scrolling, scroll-driven animation, page transitions and live WebGL shaders.

All copy, names and artwork are **placeholders** — swap in your own content before launch.

## Features

- **Interactive 3D hero** (three.js / React Three Fiber) — glossy shapes with custom physics that
  react to the cursor; click to scatter them. Lit with procedural light panels (no HDR downloads).
- **Preloader** with counter, **page-transition curtain**, and a **custom cursor** that shows labels
  (`data-cursor="View"`) over projects.
- **Smooth scrolling** with Lenis, a shared animation ticker, and scroll-linked effects:
  word-by-word statement reveal, an expanding sticky showreel, velocity-reactive marquee.
- **Live shader canvases** (raw WebGL, five original fragment shaders) that pause off-screen.
- **Generated project artwork** (SVG/CSS) so the site looks complete without any image files.
- Ambient **sound toggle** synthesised with the Web Audio API (no audio files).
- Pages: Home, About, Projects (filter + grid/list), Project detail, Labs, Contact, 404.
- Responsive down to small phones; respects `prefers-reduced-motion`.

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run preview  # serve the production build
npm run lint
```

## Make it yours

| What | Where |
| --- | --- |
| Studio name, email, address, socials, nav | `src/data/site.js` |
| Services, stats, team, clients, process | `src/data/site.js` |
| Case studies | `src/data/projects.js` (add `cover: '/images/x.jpg'` to use a real image) |
| Showreel video | set `reelVideo` in `src/data/site.js` and drop the file in `public/` |
| Colours, fonts, spacing | CSS variables at the top of `src/styles/global.css` |
| Logo | `src/components/Logo.jsx` and `public/favicon.svg` |
| 3D hero shapes/colours | `PALETTE` and `SHAPES` in `src/three/HeroScene.jsx` |
| Contact form backend | `onSubmit` in `src/pages/Contact.jsx` (currently opens the visitor's email app) |

## Project structure

```
src/
  components/   UI: header/menu, preloader, cursor, curtain, cards, footer, reveal helpers
  three/        HeroScene (R3F), ShaderCanvas + shaders
  pages/        route components
  hooks/        in-view, scroll progress, document title
  lib/ticker.js shared requestAnimationFrame loop + math helpers
  data/         site content and projects
  styles/       global.css (design tokens + all styles)
```

## Deploying

It's a static single-page app. `vercel.json` (Vercel) and `public/_redirects` (Netlify) are included
so deep links like `/projects/orbitra-launch` work.
