import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.css'

// Sections
import Hero from './sections/Hero'
import About from './sections/About'
import Projects from './sections/Projects'
import Process from './sections/Process'
import Skills from './sections/Skills'
import Testimonials from './sections/Testimonials'
import Contact from './sections/Contact'
import Footer from './sections/Footer'
import BrandDesign from './sections/BrandDesign'
import Navigation from './sections/Navigation'
import ThemeSelector from './sections/ThemeSelector'
import AIChat from './sections/AIChat'
import AIOrb from './sections/AIOrb'

import {
  applyTheme,
  getTokens,
  loadPrefs,
  runThemeTransition,
  savePrefs,
  systemPrefersDark,
  type Origin,
  type ThemeId,
} from './theme/themes'

gsap.registerPlugin(ScrollTrigger)

const SELECTOR_SEEN_KEY = 'theme-selector-shown'

function isFirstVisitThisSession() {
  try {
    return !sessionStorage.getItem(SELECTOR_SEEN_KEY)
  } catch {
    return false
  }
}

function App() {
  const [initialPrefs] = useState(loadPrefs)
  const [themeId, setThemeId] = useState<ThemeId>(initialPrefs.themeId)
  const [isDarkMode, setIsDarkMode] = useState(initialPrefs.dark)
  const [showThemeSelector, setShowThemeSelector] = useState(isFirstVisitThisSession)
  const [selectorIsFirstRun, setSelectorIsFirstRun] = useState(showThemeSelector)
  const [showAIChat, setShowAIChat] = useState(false)
  const mainRef = useRef<HTMLDivElement>(null)

  // Paint the saved palette before the first frame — no flash of the default theme.
  useLayoutEffect(() => {
    applyTheme(initialPrefs.themeId, initialPrefs.dark)
  }, [initialPrefs])

  useEffect(() => {
    try { sessionStorage.setItem(SELECTOR_SEEN_KEY, 'true') } catch { /* storage unavailable */ }

    const savedScroll = sessionStorage.getItem('homepage-scroll')
    if (savedScroll) {
      setTimeout(() => {
        window.scrollTo(0, parseInt(savedScroll))
        sessionStorage.removeItem('homepage-scroll')
      }, 0)
    }
  }, [])

  const commitTheme = (nextTheme: ThemeId, nextDark: boolean, origin?: Origin) => {
    savePrefs(nextTheme, nextDark)
    runThemeTransition(
      () => {
        flushSync(() => {
          setThemeId(nextTheme)
          setIsDarkMode(nextDark)
          setShowThemeSelector(false)
        })
        applyTheme(nextTheme, nextDark)
        ScrollTrigger.refresh()
      },
      origin,
      getTokens(nextTheme, nextDark).accent
    )
  }

  const toggleDarkMode = (origin?: Origin) => commitTheme(themeId, !isDarkMode, origin)

  const openThemeSelector = () => {
    setSelectorIsFirstRun(false)
    setShowThemeSelector(true)
  }

  return (
    <div
      ref={mainRef}
      className="portfolio-root relative min-h-screen"
      style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
    >
      {showThemeSelector && (
        <ThemeSelector
          initialTheme={themeId}
          initialDark={selectorIsFirstRun && !initialPrefs.hasSavedDark ? systemPrefersDark() : isDarkMode}
          isFirstRun={selectorIsFirstRun}
          onCommit={commitTheme}
          onClose={() => setShowThemeSelector(false)}
        />
      )}

      <Navigation
        onThemeWheelClick={openThemeSelector}
        isDarkMode={isDarkMode}
        onToggleDark={toggleDarkMode}
      />

      <main aria-hidden={showThemeSelector || undefined}>
        <Hero />
        <Projects />
        <BrandDesign />
        <Process />
        <Skills />
        <About />
        <Testimonials />
        <Contact />
        <Footer />
      </main>

      {/* Karishma's AI launcher */}
      <AIOrb hidden={showAIChat} onOpen={() => setShowAIChat(true)} />

      {showAIChat && (
        <AIChat onClose={() => setShowAIChat(false)} />
      )}
    </div>
  )
}

export default App
