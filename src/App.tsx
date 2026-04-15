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
import Navigation from './sections/Navigation'
import ThemeSelector from './sections/ThemeSelector'
import AIChat from './sections/AIChat'

gsap.registerPlugin(ScrollTrigger)

// Theme configuration with proper contrast colors
const themeConfig: Record<string, { bg: string; primary: string; text: string }> = {
  blush: { bg: '#fff5f7', primary: '#fda4af', text: '#1f1f1f' },
  rose: { bg: '#fff1f2', primary: '#fb7185', text: '#1f1f1f' },
  periwinkle: { bg: '#f5f7ff', primary: '#a5b4fc', text: '#1f1f1f' },
  sky: { bg: '#f0f9ff', primary: '#7dd3fc', text: '#1f1f1f' },
  silver: { bg: '#f8fafc', primary: '#cbd5e1', text: '#1f1f1f' },
  slate: { bg: '#f1f5f9', primary: '#94a3b8', text: '#1f1f1f' },
}

function App() {
  const [showThemeSelector, setShowThemeSelector] = useState(() => {
    // Check if we've already shown the selector in this session
    const shown = sessionStorage.getItem('theme-selector-shown')
    // If not shown yet, mark it as shown and return true to display it
    if (!shown) {
      sessionStorage.setItem('theme-selector-shown', 'true')
      return true
    }
    return false
  })
  const [, setCurrentTheme] = useState('blush')
  const [showAIChat, setShowAIChat] = useState(false)
  const mainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme')
    const initialTheme = savedTheme && themeConfig[savedTheme] ? savedTheme : 'blush'
    setCurrentTheme(initialTheme)
    applyTheme(initialTheme)

    // Restore scroll position if coming back from project page
    const savedScroll = sessionStorage.getItem('homepage-scroll')
    if (savedScroll) {
      setTimeout(() => {
        window.scrollTo(0, parseInt(savedScroll))
        sessionStorage.removeItem('homepage-scroll')
      }, 0)
    }
  }, [])

  const applyTheme = (theme: string) => {
    const config = themeConfig[theme]
    if (!config) return

    const root = document.documentElement
    
    // Apply CSS variables
    root.style.setProperty('--bg-color', config.bg)
    root.style.setProperty('--primary-color', config.primary)
    root.style.setProperty('--text-color', config.text)
    
    // Apply background to body
    document.body.style.backgroundColor = config.bg
    document.body.style.color = config.text
  }

  const handleThemeSelect = (theme: string) => {
    setCurrentTheme(theme)
    localStorage.setItem('portfolio-theme', theme)
    applyTheme(theme)
    
    // Animate out theme selector
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
      {!showThemeSelector && <Navigation onThemeWheelClick={() => setShowThemeSelector(true)} />}

      {/* Main Content */}
      <main className={`transition-opacity duration-500 ${showThemeSelector ? 'opacity-0' : 'opacity-100'}`}>
        <Hero />
        <Projects />
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
