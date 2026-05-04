import { useEffect, useRef, useState } from 'react'
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

gsap.registerPlugin(ScrollTrigger)

// Theme configuration with proper contrast colors
const themeConfig: Record<string, { bg: string; primary: string; text: string }> = {
  blush:     { bg: '#fff5f7', primary: '#f472b6', text: '#4a1528' },
  indigo:    { bg: '#f5f3ff', primary: '#4f46e5', text: '#1a1730' },
  lavender:  { bg: '#faf5ff', primary: '#9333ea', text: '#2e1065' },
  peach:     { bg: '#fff7ed', primary: '#f97316', text: '#431407' },
  crimson:   { bg: '#fff1f3', primary: '#e11d48', text: '#1a0010' },
  graphite:  { bg: '#f8f9fa', primary: '#1e293b', text: '#0f172a' },
}

function App() {
  const [showThemeSelector, setShowThemeSelector] = useState(() => {
    const shown = sessionStorage.getItem('theme-selector-shown')
    if (!shown) {
      sessionStorage.setItem('theme-selector-shown', 'true')
      return true
    }
    return false
  })
  const [, setCurrentTheme] = useState('blush')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [showAIChat, setShowAIChat] = useState(false)
  const mainRef = useRef<HTMLDivElement>(null)

  const applyTheme = (theme: string) => {
    const config = themeConfig[theme]
    if (!config) return
    const root = document.documentElement
    root.style.setProperty('--bg-color', config.bg)
    root.style.setProperty('--primary-color', config.primary)
    root.style.setProperty('--text-color', config.text)
    document.body.style.backgroundColor = config.bg
    document.body.style.color = config.text
  }

  const applyDarkMode = (dark: boolean) => {
    const root = document.documentElement
    if (dark) {
      root.setAttribute('data-dark', 'true')
      root.style.setProperty('--bg-color', '#0e0d13')
      root.style.setProperty('--text-color', '#ede8f5')
      document.body.style.backgroundColor = '#0e0d13'
      document.body.style.color = '#ede8f5'
    } else {
      root.removeAttribute('data-dark')
      const savedTheme = localStorage.getItem('portfolio-theme') ?? 'blush'
      const theme = themeConfig[savedTheme] ? savedTheme : 'blush'
      applyTheme(theme)
    }
  }

  const toggleDarkMode = () => {
    const next = !isDarkMode
    setIsDarkMode(next)
    localStorage.setItem('portfolio-dark-mode', String(next))
    applyDarkMode(next)
  }

  useEffect(() => {
    const savedDark = localStorage.getItem('portfolio-dark-mode') === 'true'
    const savedTheme = localStorage.getItem('portfolio-theme')
    const initialTheme = savedTheme && themeConfig[savedTheme] ? savedTheme : 'blush'
    setCurrentTheme(initialTheme)

    if (savedDark) {
      setIsDarkMode(true)
      applyDarkMode(true)
    } else {
      applyTheme(initialTheme)
    }

    const savedScroll = sessionStorage.getItem('homepage-scroll')
    if (savedScroll) {
      setTimeout(() => {
        window.scrollTo(0, parseInt(savedScroll))
        sessionStorage.removeItem('homepage-scroll')
      }, 0)
    }
  }, [])

  const handleThemeSelect = (theme: string) => {
    setCurrentTheme(theme)
    setIsDarkMode(false)
    localStorage.setItem('portfolio-theme', theme)
    localStorage.setItem('portfolio-dark-mode', 'false')
    document.documentElement.removeAttribute('data-dark')
    applyTheme(theme)

    gsap.to('.theme-selector', {
      opacity: 0,
      y: -50,
      duration: 0.5,
      ease: 'power2.inOut',
      onComplete: () => setShowThemeSelector(false)
    })
  }

  return (
    <div ref={mainRef} className="relative min-h-screen" style={{ backgroundColor: 'var(--bg-color, #fef1f3)' }}>
      {/* Theme Selector Modal */}
      {showThemeSelector && (
        <ThemeSelector onSelect={handleThemeSelect} />
      )}

      {/* Navigation */}
      {!showThemeSelector && (
        <Navigation
          onThemeWheelClick={() => setShowThemeSelector(true)}
          isDarkMode={isDarkMode}
          onToggleDark={toggleDarkMode}
        />
      )}

      {/* Main Content */}
      <main className={`transition-opacity duration-500 ${showThemeSelector ? 'opacity-0' : 'opacity-100'}`}>
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

      {/* AI Chat Button */}
      {!showThemeSelector && (
        <button
          onClick={() => setShowAIChat(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-black text-white rounded-full shadow-soft-lg flex items-center justify-center hover:scale-110 transition-transform duration-300 group"
          style={{ backgroundColor: 'var(--primary-color, #000)' }}
          aria-label="Open AI Assistant"
        >
          <svg 
            className="w-6 h-6 group-hover:rotate-12 transition-transform" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </button>
      )}

      {/* AI Chat Modal */}
      {showAIChat && (
        <AIChat onClose={() => setShowAIChat(false)} />
      )}
    </div>
  )
}

export default App
