import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Palette, Sun, Moon } from 'lucide-react'

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
  isDarkMode?: boolean
  onToggleDark?: () => void
}

export default function Navigation({ onThemeWheelClick, isDarkMode = false, onToggleDark }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [workOpen, setWorkOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const workRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (workRef.current && !workRef.current.contains(e.target as Node)) {
        setWorkOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Active section tracker
  useEffect(() => {
    const sectionIds = ['projects', 'brand', 'process', 'skills', 'about', 'testimonials', 'contact']
    const observers: IntersectionObserver[] = []

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { threshold: 0.3 }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
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
      setWorkOpen(false)
    }
  }

  // Derived style helpers
  const dm = isDarkMode
  const linkIdle   = dm ? '#9490a8' : '#374151'
  const linkHover  = dm ? '#ede8f5' : '#000000'
  const navBg      = dm
    ? isScrolled ? 'rgba(14,13,19,0.92)' : 'rgba(14,13,19,0.85)'
    : undefined
  const navClass   = dm
    ? `fixed top-0 left-0 right-0 z-50 transition-all duration-500 backdrop-blur-xl ${isScrolled ? 'py-4' : 'py-6'}`
    : `fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-soft py-4' : 'bg-white/95 backdrop-blur-sm shadow-sm py-6'}`
  const navShadow  = dm && isScrolled ? '0 1px 0 rgba(255,255,255,0.06), 0 4px 24px rgba(0,0,0,0.4)' : undefined

  return (
    <>
      <nav
        ref={navRef}
        className={navClass}
        style={{ backgroundColor: navBg, boxShadow: navShadow }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

          {/* Logo */}
          <a
            href="#"
            className="font-display font-bold text-xl hover:scale-105 transition-transform"
            style={{ color: dm ? '#ede8f5' : undefined }}
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            Karishma.
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-7">

            {/* Work dropdown */}
            <div ref={workRef} className="relative">
              <button
                onClick={() => setWorkOpen(prev => !prev)}
                className="relative flex items-center gap-1 text-sm font-medium transition-colors group"
                style={{ color: (activeSection === 'projects' || activeSection === 'brand') ? 'var(--primary-color)' : linkIdle }}
              >
                <span>Work</span>
                <svg
                  className={`w-3 h-3 transition-transform duration-200 ${workOpen ? 'rotate-180' : ''}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-current transition-all duration-300 ${(activeSection === 'projects' || activeSection === 'brand') ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </button>

              {/* Dropdown panel */}
              {workOpen && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 rounded-2xl overflow-hidden"
                  style={{
                    backgroundColor: dm ? '#1c1b28' : '#ffffff',
                    boxShadow: dm
                      ? '0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08)'
                      : '0 8px 32px rgba(0,0,0,0.10), 0 0 0 1px rgba(0,0,0,0.04)',
                  }}
                >
                  {workDropdown.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={(e) => handleLinkClick(e, item.href)}
                      className="flex flex-col px-4 py-3 transition-colors"
                      style={{
                        borderBottom: dm ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.04)',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.backgroundColor = dm ? 'rgba(255,255,255,0.05)' : '#f9fafb')}
                      onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      <span className="text-sm font-medium" style={{ color: dm ? '#d4d0e4' : '#111827' }}>{item.label}</span>
                      <span className="text-xs mt-0.5" style={{ color: dm ? '#6b6880' : '#9ca3af' }}>{item.desc}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '')
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="relative text-sm font-medium transition-colors group"
                  style={{ color: isActive ? 'var(--primary-color)' : linkIdle }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = linkHover }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = linkIdle }}
                >
                  {link.label}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-current transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </a>
              )
            })}

            {/* Day / Night pill toggle */}
            <button
              onClick={onToggleDark}
              aria-label={dm ? 'Switch to light mode' : 'Switch to dark mode'}
              title={dm ? 'Light mode' : 'Dark mode'}
              className="relative flex items-center rounded-full flex-shrink-0 transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{
                width: '52px',
                height: '26px',
                backgroundColor: dm ? 'rgba(165,180,252,0.12)' : 'rgba(0,0,0,0.08)',
                border: dm ? '1px solid rgba(165,180,252,0.22)' : '1px solid rgba(0,0,0,0.10)',
              }}
            >
              {/* Sun icon */}
              <Sun
                style={{
                  position: 'absolute',
                  left: '6px',
                  width: '11px',
                  height: '11px',
                  color: dm ? '#6b6880' : '#f59e0b',
                  opacity: dm ? 0.4 : 1,
                  transition: 'opacity 0.35s ease, color 0.35s ease',
                  zIndex: 1,
                  flexShrink: 0,
                }}
              />
              {/* Moon icon */}
              <Moon
                style={{
                  position: 'absolute',
                  right: '6px',
                  width: '11px',
                  height: '11px',
                  color: dm ? '#a5b4fc' : '#9490a8',
                  opacity: dm ? 1 : 0.4,
                  transition: 'opacity 0.35s ease, color 0.35s ease',
                  zIndex: 1,
                  flexShrink: 0,
                }}
              />
              {/* Sliding indicator */}
              <span
                style={{
                  position: 'absolute',
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  left: dm ? '29px' : '3px',
                  backgroundColor: dm ? '#a5b4fc' : '#ffffff',
                  boxShadow: dm ? '0 0 10px rgba(165,180,252,0.4)' : '0 1px 4px rgba(0,0,0,0.22)',
                  transition: 'left 0.4s cubic-bezier(0.4,0,0.2,1), background-color 0.4s ease, box-shadow 0.4s ease',
                }}
              />
            </button>

            {/* Theme palette */}
            <button
              onClick={onThemeWheelClick}
              className="p-2.5 rounded-full transition-all duration-300 hover:scale-110"
              style={{ backgroundColor: 'transparent' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = dm ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.05)')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
              aria-label="Open theme selector"
              title="Change theme"
            >
              <Palette style={{ width: '18px', height: '18px', color: dm ? '#9490a8' : '#374151' }} />
            </button>
          </div>

          {/* Mobile: dark toggle + palette + hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={onToggleDark}
              aria-label={dm ? 'Switch to light mode' : 'Switch to dark mode'}
              className="relative flex items-center rounded-full flex-shrink-0 transition-all duration-500"
              style={{
                width: '44px',
                height: '22px',
                backgroundColor: dm ? 'rgba(165,180,252,0.12)' : 'rgba(0,0,0,0.08)',
                border: dm ? '1px solid rgba(165,180,252,0.22)' : '1px solid rgba(0,0,0,0.10)',
              }}
            >
              <Sun style={{ position:'absolute', left:'5px', width:'10px', height:'10px', color: dm?'#6b6880':'#f59e0b', opacity: dm?0.4:1, transition:'opacity 0.35s ease', zIndex:1 }} />
              <Moon style={{ position:'absolute', right:'5px', width:'10px', height:'10px', color: dm?'#a5b4fc':'#9490a8', opacity: dm?1:0.4, transition:'opacity 0.35s ease', zIndex:1 }} />
              <span style={{ position:'absolute', width:'16px', height:'16px', borderRadius:'50%', left: dm?'25px':'3px', backgroundColor: dm?'#a5b4fc':'#ffffff', boxShadow: dm?'0 0 8px rgba(165,180,252,0.4)':'0 1px 3px rgba(0,0,0,0.22)', transition:'left 0.4s cubic-bezier(0.4,0,0.2,1), background-color 0.4s ease' }} />
            </button>

            <button
              onClick={onThemeWheelClick}
              className="p-2 rounded-full transition-all duration-300"
              aria-label="Open theme selector"
            >
              <Palette style={{ width:'18px', height:'18px', color: dm?'#9490a8':'#374151' }} />
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span className={`w-full h-0.5 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} style={{ backgroundColor: dm ? '#ede8f5' : '#000' }} />
                <span className={`w-full h-0.5 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}     style={{ backgroundColor: dm ? '#ede8f5' : '#000' }} />
                <span className={`w-full h-0.5 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} style={{ backgroundColor: dm ? '#ede8f5' : '#000' }} />
              </div>
            </button>
          </div>

          {/* CTA Button — desktop only */}
          <a
            href="mailto:karishmaworks08@gmail.com"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300"
            style={{
              backgroundColor: dm ? '#1c1b28' : '#000000',
              color: dm ? '#ede8f5' : '#ffffff',
              border: dm ? '1px solid rgba(255,255,255,0.12)' : 'none',
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = dm ? '#26253a' : '#1f1f1f')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = dm ? '#1c1b28' : '#000000')}
          >
            Let's Talk
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-500 md:hidden ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        style={{ backgroundColor: dm ? '#0e0d13' : '#ffffff' }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 pt-24">
          {workDropdown.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => { handleLinkClick(e, item.href); setIsMobileMenuOpen(false) }}
              className="text-2xl font-display font-medium transition-all"
              style={{
                color: dm ? '#ede8f5' : '#111827',
                transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : '0ms',
                opacity: isMobileMenuOpen ? 1 : 0,
                transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.3s ease-out',
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
              className="text-2xl font-display font-medium transition-all"
              style={{
                color: dm ? '#ede8f5' : '#111827',
                transitionDelay: isMobileMenuOpen ? `${(index + workDropdown.length) * 50}ms` : '0ms',
                opacity: isMobileMenuOpen ? 1 : 0,
                transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.3s ease-out',
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="mailto:karishmaworks08@gmail.com"
            className="mt-4 px-8 py-3 rounded-full font-medium transition-all"
            style={{
              backgroundColor: dm ? '#1c1b28' : '#000000',
              color: dm ? '#ede8f5' : '#ffffff',
              border: dm ? '1px solid rgba(255,255,255,0.12)' : 'none',
              transitionDelay: isMobileMenuOpen ? '250ms' : '0ms',
              opacity: isMobileMenuOpen ? 1 : 0,
              transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.3s ease-out',
            }}
          >
            Let's Talk
          </a>
        </div>
      </div>
    </>
  )
}
