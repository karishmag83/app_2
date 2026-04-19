import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Palette } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const navLinks = [
  { label: 'Process', href: '#process' },
  { label: 'Skills', href: '#skills' },
  { label: 'About', href: '#about' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
]

const workDropdown = [
  { label: 'Case Studies', href: '#projects', desc: 'UX & product work' },
  { label: 'Brand Identity', href: '#brand', desc: 'Visual brand systems' },
]

interface NavigationProps {
  onThemeWheelClick?: () => void
}

export default function Navigation({ onThemeWheelClick }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [workOpen, setWorkOpen] = useState(false)
  const workRef = useRef<HTMLDivElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const navRef = useRef<HTMLElement>(null)

  const openWork = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setWorkOpen(true)
  }

  const closeWork = () => {
    closeTimer.current = setTimeout(() => setWorkOpen(false), 150)
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(navRef.current, 
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.5 }
      )
    }
  }, [])

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <>
      <nav 
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/80 backdrop-blur-lg shadow-soft py-4' 
            : 'bg-white/95 backdrop-blur-sm shadow-sm py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a 
            href="#" 
            className="font-display font-bold text-xl hover:scale-105 transition-transform"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            Karishma.
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {/* Work dropdown */}
            <div
              ref={workRef}
              className="relative"
              onMouseEnter={openWork}
              onMouseLeave={closeWork}
            >
              <button className="relative flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-black transition-colors group">
                Work
                <svg
                  className={`w-3 h-3 transition-transform duration-200 ${workOpen ? 'rotate-180' : ''}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full" />
              </button>

              {/* Dropdown panel */}
              <div onMouseEnter={openWork} onMouseLeave={closeWork} className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 w-48 rounded-2xl bg-white shadow-lg border border-black/5 overflow-hidden transition-all duration-200 ${workOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-1 pointer-events-none'}`}>
                {workDropdown.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => { handleLinkClick(e, item.href); setWorkOpen(false) }}
                    className="flex flex-col px-4 py-3 hover:bg-gray-50 transition-colors group/item border-b border-black/5 last:border-0"
                  >
                    <span className="text-sm font-medium text-gray-900 group-hover/item:text-black">{item.label}</span>
                    <span className="text-xs text-gray-400 mt-0.5">{item.desc}</span>
                  </a>
                ))}
              </div>
            </div>

            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="relative text-sm font-medium text-gray-700 hover:text-black transition-colors group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full" />
              </a>
            ))}

            {/* Theme Wheel Button - Desktop */}
            <button
              onClick={onThemeWheelClick}
              className="p-2.5 hover:bg-black/5 rounded-full transition-all duration-300 hover:scale-110"
              aria-label="Open theme selector"
              title="Change theme"
            >
              <Palette className="w-5 h-5 text-gray-700 hover:text-black transition-colors" />
            </button>
          </div>

          {/* Theme Wheel Button - Mobile */}
          <button
            onClick={onThemeWheelClick}
            className="md:hidden p-2 hover:bg-black/5 rounded-full transition-all duration-300"
            aria-label="Open theme selector"
            title="Change theme"
          >
            <Palette className="w-5 h-5 text-gray-700" />
          </button>

          {/* CTA Button */}
          <a
            href="mailto:karishmaworks08@gmail.com"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors"
          >
            Let's Talk
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-black transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-full h-0.5 bg-black transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-full h-0.5 bg-black transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 z-40 bg-white transition-all duration-500 md:hidden ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 pt-24">
          {/* Work sub-links on mobile */}
          {workDropdown.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => { handleLinkClick(e, item.href); setIsMobileMenuOpen(false) }}
              className="text-2xl font-display font-medium hover:text-gray-600 transition-colors"
              style={{
                transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : '0ms',
                opacity: isMobileMenuOpen ? 1 : 0,
                transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.3s ease-out'
              }}
            >
              {item.label}
            </a>
          ))}
          {navLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-2xl font-display font-medium hover:text-gray-600 transition-colors"
              style={{
                transitionDelay: isMobileMenuOpen ? `${(index + workDropdown.length) * 50}ms` : '0ms',
                opacity: isMobileMenuOpen ? 1 : 0,
                transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.3s ease-out'
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="mailto:karishmaworks08@gmail.com"
            className="mt-4 px-8 py-3 bg-black text-white rounded-full font-medium"
            style={{ 
              transitionDelay: isMobileMenuOpen ? '250ms' : '0ms',
              opacity: isMobileMenuOpen ? 1 : 0,
              transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.3s ease-out'
            }}
          >
            Let's Talk
          </a>
        </div>
      </div>
    </>
  )
}
