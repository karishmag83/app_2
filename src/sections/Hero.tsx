import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDown, Check, Copy, Mail, Zap } from 'lucide-react'
import PhoneMockup from '../components/PhoneMockup'
import { PROFILE } from '../data/profile.ts'

gsap.registerPlugin(ScrollTrigger)

const TOOLS = ['Figma', 'React', 'TypeScript', 'Framer Motion', 'Node.js', 'UX Research']

/** Largest size of the phone stage (28rem, 3:4). Narrow screens and short laptop screens scale it down. */
const PHONE_W = 448
const PHONE_H = (PHONE_W * 4) / 3

const STATS = [
  { value: '50+', label: 'Projects' },
  { value: '30+', label: 'Happy Clients' },
  { value: '5+', label: 'Years Exp.' },
]

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const [copied, setCopied] = useState(false)
  const [phoneScale, setPhoneScale] = useState(1)

  // Scale the phone to its stage (layout width, unaffected by GSAP transforms)
  useEffect(() => {
    const stage = stageRef.current
    if (!stage || typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(([entry]) => setPhoneScale(Math.min(1, entry.contentRect.width / PHONE_W)))
    ro.observe(stage)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    const mm = gsap.matchMedia()

    const ctx = gsap.context(() => {
      // Headline characters
      headlineRef.current?.querySelectorAll('.headline-line').forEach((line, lineIndex) => {
        gsap.from(line.querySelectorAll('.char'), {
          y: 60,
          opacity: 0,
          duration: 0.6,
          stagger: 0.03,
          ease: 'power3.out',
          delay: 0.6 + lineIndex * 0.15,
        })
      })

      gsap.from('.hero-subheading', { y: 40, opacity: 0, filter: 'blur(10px)', duration: 0.7, ease: 'power2.out', delay: 1.05 })
      gsap.from('.hero-actions', { y: 24, opacity: 0, duration: 0.9, ease: 'expo.out', delay: 1.2 })
      gsap.from('.hero-shape', { scale: 0, rotation: -180, opacity: 0, duration: 1, ease: 'back.out(1.7)', delay: 0.8 })

      // Desktop: the phone flips in beside the copy and turns away as you scroll
      mm.add('(min-width: 1024px)', () => {
        gsap.from(imageRef.current, { rotateY: -90, opacity: 0, duration: 1, ease: 'power3.out', delay: 1 })
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
          onUpdate: self => {
            gsap.set(contentRef.current, { y: self.progress * -80 })
            gsap.set(imageRef.current, { rotateY: self.progress * 15, scale: 1 - self.progress * 0.1 })
          },
        })
      })

      // Phones and tablets: the phone simply fades up once on load and then stays put
      mm.add('(max-width: 1023px)', () => {
        gsap.from(imageRef.current, { y: 60, opacity: 0, duration: 1.2, ease: 'expo.out', delay: 1.1 })
      })
    }, sectionRef)

    return () => {
      mm.revert()
      ctx.revert()
    }
  }, [])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${PROFILE.email}`
    }
  }

  const splitText = (text: string) =>
    text.split('').map((char, i) => (
      <span key={i} className="char inline-block" style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}>
        {char}
      </span>
    ))

  return (
    <section
      ref={sectionRef}
      className="hero relative overflow-hidden pb-14 pt-28 sm:pt-32 lg:flex lg:min-h-[100svh] lg:items-center lg:pb-14 lg:pt-28"
      style={{ perspective: '1200px' }}
    >
      {/* Background: soft radial light */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="hero-shape absolute right-[-5%] top-[-10%] h-[500px] w-[500px] rounded-full animate-float-slow" style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--primary-color) 14%, transparent) 0%, transparent 70%)' }} />
        <div className="absolute bottom-[5%] left-[-10%] h-[420px] w-[420px] rounded-full animate-float" style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--primary-color) 10%, transparent) 0%, transparent 70%)' }} />
        <div className="absolute left-[25%] top-[45%] h-[280px] w-[280px] rounded-full" style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--primary-color) 6%, transparent) 0%, transparent 70%)' }} />
      </div>

      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Copy */}
          <div ref={contentRef} className="mx-auto w-full max-w-xl lg:mx-0 lg:max-w-none">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 sm:px-4 sm:py-2" style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.22)' }}>
              <span className="h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: '#10b981' }} />
              <span className="text-[13px] font-semibold sm:text-sm" style={{ color: '#059669' }}>Available to Work</span>
            </div>

            <p className="mb-1 text-lg text-gray-600 sm:mb-2">Hey, I'm</p>

            <h1 ref={headlineRef} className="hero-name mb-5 font-display font-semibold leading-[1.05] sm:mb-6">
              <span className="headline-line block overflow-hidden pb-1">{splitText('Karishma')}</span>
            </h1>

            <div className="mb-6 flex flex-wrap items-center gap-2 sm:mb-5">
              <span className="rounded-full px-3 py-1.5 text-sm font-semibold" style={{ background: 'var(--primary-soft)', color: 'var(--primary-color)', border: '1px solid color-mix(in srgb, var(--primary-color) 24%, transparent)' }}>Product Designer</span>
              <span className="text-sm text-gray-300" aria-hidden="true">·</span>
              <span className="rounded-full px-3 py-1.5 text-sm font-semibold" style={{ background: 'var(--surface-2)', color: 'var(--muted-color)', border: '1px solid var(--border-color)' }}>Software Engineer</span>
            </div>

            {/* Tools: tablet and up; the Skills section covers them in depth on phones */}
            <div className="mb-7 hidden flex-wrap gap-2 sm:flex">
              {TOOLS.map(tool => (
                <span key={tool} className="rounded-lg px-2.5 py-1 text-xs font-medium" style={{ background: 'color-mix(in srgb, var(--text-color) 4%, transparent)', border: '1px solid var(--border-color)', color: 'var(--muted-color)' }}>{tool}</span>
              ))}
            </div>

            <p className="hero-subheading mb-8 max-w-lg text-base leading-relaxed text-gray-600 sm:text-lg md:text-xl">
              I design products people love and build the code that ships them. From zero-to-one UX strategy to
              production-ready interfaces, I own the full product experience.
            </p>

            {/* Actions */}
            <div className="hero-actions grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
              <a
                href="#projects"
                className="hero-btn hero-btn-primary group"
                onClick={e => {
                  e.preventDefault()
                  document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                <span>View my work</span>
                <span className="hero-btn-disc" aria-hidden="true">
                  <ArrowDown className="hero-arrow" />
                  <ArrowDown className="hero-arrow hero-arrow-next" />
                </span>
              </a>

              <div className="hero-btn hero-btn-secondary">
                <a href={`mailto:${PROFILE.email}`} className="hero-mail">
                  <Mail className="h-[18px] w-[18px]" aria-hidden="true" />
                  <span>Email me</span>
                </a>
                <span className="hero-split" aria-hidden="true" />
                <button
                  type="button"
                  className="hero-copy"
                  onClick={copyEmail}
                  aria-label={copied ? 'Email address copied' : `Copy email address, ${PROFILE.email}`}
                  title={copied ? 'Copied' : 'Copy email address'}
                >
                  <Copy className={`h-4 w-4 ${copied ? 'is-hidden' : ''}`} aria-hidden="true" />
                  <Check className={`h-4 w-4 ${copied ? '' : 'is-hidden'}`} aria-hidden="true" />
                </button>
                <span className={`hero-copied ${copied ? 'is-visible' : ''}`} role="status">
                  {copied ? 'Email copied' : ''}
                </span>
              </div>
            </div>

            {/* Stats: tablet and up; the phone below shows them on small screens */}
            <div className="mt-9 hidden grid-cols-3 gap-3 sm:grid">
              {STATS.map(stat => (
                <div
                  key={stat.label}
                  className="cursor-default rounded-2xl p-4 transition-transform duration-300 hover:-translate-y-1"
                  style={{ background: 'var(--surface-color)', border: '1px solid var(--border-color)', boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}
                >
                  <div className="font-display text-2xl font-bold sm:text-3xl" style={{ color: 'var(--primary-color)' }}>{stat.value}</div>
                  <div className="mt-0.5 text-xs text-gray-500 sm:text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Phone */}
          <div ref={imageRef} className="relative" style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}>
            <div ref={stageRef} className="hero-stage relative mx-auto aspect-[3/4] w-full max-w-[340px] sm:max-w-sm lg:max-w-[min(28rem,calc((100svh_-_15rem)*0.75))]">
              <div className="absolute inset-0 rotate-6 scale-95 rounded-[3rem]" style={{ background: 'radial-gradient(ellipse at center, color-mix(in srgb, var(--primary-color) 14%, transparent) 0%, transparent 70%)' }} />

              {/* The phone renders at its desktop design size and scales as a whole, so its UI never rewraps */}
              <div className="absolute inset-0">
                <div style={{ width: PHONE_W, height: PHONE_H, transform: `scale(${phoneScale})`, transformOrigin: 'top left' }}>
                  <PhoneMockup />
                </div>
              </div>

              {/* Tags hang off the phone's corners and only overlap its frame, never the screen */}
              <div className="hero-badge hero-badge-bottom liquid-glass">
                <span className="hero-badge-icon" style={{ background: 'linear-gradient(145deg, #34d399, #059669)' }}>
                  <Check className="h-4 w-4" strokeWidth={2.6} aria-hidden="true" />
                </span>
                <span>
                  <span className="hero-badge-title">Available for</span>
                  <span className="hero-badge-sub">Freelance Work</span>
                </span>
              </div>

              <div className="hero-badge hero-badge-top liquid-glass">
                <span className="hero-badge-icon" style={{ background: 'var(--primary-color)', color: 'var(--on-primary)' }}>
                  <Zap className="h-4 w-4" strokeWidth={2.4} aria-hidden="true" />
                </span>
                <span>
                  <span className="hero-badge-title">Figma + Code</span>
                  <span className="hero-badge-sub">Design to Dev</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator (desktop) */}
      <div className="absolute left-1/2 top-[calc(100%-40px)] hidden -translate-x-1/2 animate-bounce-soft lg:block">
        <div className="flex h-10 w-6 justify-center rounded-full pt-2" style={{ border: '2px solid color-mix(in srgb, var(--primary-color) 35%, transparent)' }}>
          <div className="h-3 w-1.5 rounded-full animate-pulse-soft" style={{ background: 'var(--primary-color)' }} />
        </div>
      </div>
    </section>
  )
}
