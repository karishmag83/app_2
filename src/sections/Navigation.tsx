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
  onToggleDark?: (origin?: { x: number; y: number }) => void
}

function centerOf(el: Element) {
  const r = el.getBoundingClientRect()
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 }
}

/** Moon in light mode, sun in dark mode; the two glyphs turn as they swap. */
function DarkToggle({ dark, onToggle }: { dark: boolean; onToggle?: NavigationProps['onToggleDark'] }) {
  return (
    <button
      type="button"
      onClick={e => onToggle?.(centerOf(e.currentTarget))}
      className="nav-icon"
      data-dark={dark || undefined}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={dark ? 'Light mode' : 'Dark mode'}
    >
      <Moon className="nav-icon-moon h-[18px] w-[18px]" aria-hidden="true" />
      <Sun className="nav-icon-sun h-[18px] w-[18px]" aria-hidden="true" />
    </button>
  )
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

  // On the glass capsule, idle links sit a step darker so they stay legible over any content
  const linkIdle = isScrolled ? 'var(--text-soft)' : 'var(--muted-color)'
  const linkHover = 'var(--text-color)'

  // Moves the capsule's specular highlight with the pointer, like light on glass
  const trackLight = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--lg-x', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--lg-y', `${e.clientY - r.top}px`)
  }

  return (
    <>
      {/* Transparent at the top of the page; a floating liquid-glass capsule once content scrolls beneath */}
      <nav ref={navRef} className={`site-nav fixed inset-x-0 top-0 z-50 ${isScrolled ? 'is-scrolled' : ''}`}>
        <div className="nav-shell mx-auto flex items-center justify-between" onPointerMove={trackLight}>

          {/* Logo */}
          <a
            href="#"
            className="font-display font-bold text-xl hover:scale-105 transition-transform"
            style={{ color: 'var(--text-color)' }}
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            Karishma.
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-7">

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
                    backgroundColor: 'var(--surface-color)',
                    boxShadow: '0 0 0 1px var(--border-color), 0 18px 40px -16px rgba(0,0,0,0.35)',
                  }}
                >
                  {workDropdown.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={(e) => handleLinkClick(e, item.href)}
                      className="flex flex-col px-4 py-3 transition-colors"
                      style={{
                        borderBottom: '1px solid var(--border-color)',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--surface-2)')}
                      onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      <span className="text-sm font-medium" style={{ color: 'var(--text-color)' }}>{item.label}</span>
                      <span className="text-xs mt-0.5" style={{ color: 'var(--subtle-color)' }}>{item.desc}</span>
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

            <div className="-mx-2 flex items-center gap-0.5">
              <DarkToggle dark={isDarkMode} onToggle={onToggleDark} />
              <button type="button" onClick={onThemeWheelClick} className="nav-icon" aria-label="Open theme selector" title="Change theme">
                <Palette className="h-[18px] w-[18px]" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Mobile and tablet: dark toggle + palette + hamburger */}
          <div className="lg:hidden flex items-center gap-0.5">
            <DarkToggle dark={isDarkMode} onToggle={onToggleDark} />
            <button type="button" onClick={onThemeWheelClick} className="nav-icon" aria-label="Open theme selector">
              <Palette className="h-[18px] w-[18px]" aria-hidden="true" />
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span className={`w-full h-0.5 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} style={{ backgroundColor: 'var(--text-color)' }} />
                <span className={`w-full h-0.5 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}     style={{ backgroundColor: 'var(--text-color)' }} />
                <span className={`w-full h-0.5 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} style={{ backgroundColor: 'var(--text-color)' }} />
              </div>
            </button>
          </div>

          {/* CTA Button: desktop only */}
          <a
            href="mailto:karishmadilipgawali@gmail.com"
            className="relative hidden lg:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300"
            style={{
              backgroundColor: 'var(--primary-color)',
              color: 'var(--on-primary)',
              boxShadow: '0 8px 20px -12px var(--primary-glow)',
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-1px)')}
            onMouseLeave={e => (e.currentTarget.style.transform = '')}
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
        className={`fixed inset-0 z-40 transition-all duration-500 lg:hidden ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        style={{ backgroundColor: 'var(--bg-color)' }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 pt-24">
          {workDropdown.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => { handleLinkClick(e, item.href); setIsMobileMenuOpen(false) }}
              className="text-2xl font-display font-medium transition-all"
              style={{
                color: 'var(--text-color)',
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
                color: 'var(--text-color)',
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
            href="mailto:karishmadilipgawali@gmail.com"
            className="mt-4 px-8 py-3 rounded-full font-medium transition-all"
            style={{
              backgroundColor: 'var(--primary-color)',
              color: 'var(--on-primary)',
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
