import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Lenis from 'lenis'
import { addTick, prefersReducedMotion } from '../lib/ticker'

const AppContext = createContext(null)

export const useApp = () => useContext(AppContext)

const CURTAIN_MS = 750

export function AppProvider({ children }) {
  const navigate = useNavigate()
  const location = useLocation()
  const lenisRef = useRef(null)
  const [loaded, setLoaded] = useState(false)
  const [curtain, setCurtain] = useState('idle') // idle | cover | reveal
  const busy = useRef(false)

  // Smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: prefersReducedMotion() ? 0 : 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !prefersReducedMotion(),
    })
    lenisRef.current = lenis
    const remove = addTick((time) => lenis.raf(time))
    return () => {
      remove()
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  // Lock scrolling while the preloader is visible
  useEffect(() => {
    const lenis = lenisRef.current
    if (!lenis) return
    if (loaded) lenis.start()
    else lenis.stop()
  }, [loaded])

  // Back/forward navigation and direct changes jump to the top of the new page
  useEffect(() => {
    if (location.hash) return
    lenisRef.current?.scrollTo(0, { immediate: true, force: true })
    window.scrollTo(0, 0)
  }, [location.pathname, location.hash])

  const go = useCallback(
    (to) => {
      if (busy.current) return
      if (to === location.pathname) {
        lenisRef.current?.scrollTo(0, { duration: 1.2 })
        return
      }
      if (prefersReducedMotion()) {
        navigate(to)
        return
      }
      busy.current = true
      setCurtain('cover')
      setTimeout(() => {
        navigate(to)
        setCurtain('reveal')
        setTimeout(() => {
          setCurtain('idle')
          busy.current = false
        }, CURTAIN_MS)
      }, CURTAIN_MS)
    },
    [location.pathname, navigate],
  )

  const value = useMemo(
    () => ({ loaded, setLoaded, go, curtain, lenis: lenisRef }),
    [loaded, go, curtain],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
