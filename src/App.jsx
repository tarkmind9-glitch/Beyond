import { Route, Routes, useLocation } from 'react-router-dom'
import { AppProvider } from './components/AppProvider'
import Preloader from './components/Preloader'
import Curtain from './components/Curtain'
import Cursor from './components/Cursor'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import Labs from './pages/Labs'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

function Pages() {
  const location = useLocation()
  return (
    <main className="page" key={location.pathname}>
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/labs" element={<Labs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  )
}

export default function App() {
  return (
    <AppProvider>
      <Preloader />
      <Curtain />
      <Cursor />
      <Header />
      <Pages />
      <Footer />
    </AppProvider>
  )
}
