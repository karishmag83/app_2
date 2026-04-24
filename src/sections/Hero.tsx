import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PhoneMockup from '../components/PhoneMockup'

gsap.registerPlugin(ScrollTrigger)

const heroStyles = `
  .hero-cta {
    opacity: 1 !important;
    visibility: visible !important;
  }
  
  .hero-cta span {
    opacity: 1 !important;
  }
`

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline character animation
      if (headlineRef.current) {
        const lines = headlineRef.current.querySelectorAll('.headline-line')
        lines.forEach((line, lineIndex) => {
          const chars = line.querySelectorAll('.char')
          gsap.from(chars, {
            y: 60,
            opacity: 0,
            duration: 0.6,
            stagger: 0.03,
            ease: 'power3.out',
            delay: 0.6 + lineIndex * 0.15,
          })
        })
      }

      // Subheading animation
      gsap.from('.hero-subheading', {
        y: 40,
        opacity: 0,
        filter: 'blur(10px)',
        duration: 0.7,
        ease: 'power2.out',
        delay: 1.1,
      })

      // CTA buttons animation
      gsap.from('.hero-cta', {
        scale: 0.8,
        duration: 0.5,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        delay: 1.3,
      })

      // Hero image 3D flip reveal
      gsap.from(imageRef.current, {
        rotateY: -90,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 1,
      })

      // Decorative shape
      gsap.from('.hero-shape', {
        scale: 0,
        rotation: -180,
        opacity: 0,
        duration: 1,
        ease: 'back.out(1.7)',
        delay: 0.8,
      })

      // Scroll-triggered parallax
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress
          if (contentRef.current) {
            gsap.set(contentRef.current, { y: progress * -80 })
          }
          if (imageRef.current) {
            gsap.set(imageRef.current, { 
              rotateY: progress * 15,
              scale: 1 - progress * 0.1
            })
          }
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Split text into characters
  const splitText = (text: string) => {
    return text.split('').map((char, i) => (
      <span key={i} className="char inline-block" style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}>
        {char}
      </span>
    ))
  }

  return (
    <>
      <style>{heroStyles}</style>
      <section 
        ref={sectionRef}
        className="relative min-h-[200vh] sm:min-h-[120vh] flex items-center overflow-hidden pt-24 sm:pt-0 pb-32 sm:pb-20"
        style={{ perspective: '1200px' }}
      >
      {/* Background decorative elements — soft radial orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="hero-shape absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full animate-float-slow" style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.13) 0%, transparent 70%)' }} />
        <div className="absolute bottom-[5%] left-[-10%] w-[420px] h-[420px] rounded-full animate-float" style={{ background: 'radial-gradient(circle, rgba(129,140,248,0.11) 0%, transparent 70%)' }} />
        <div className="absolute top-[45%] left-[25%] w-[280px] h-[280px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div ref={contentRef} className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.22)' }}>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#10b981' }} />
              <span className="text-sm font-semibold" style={{ color: '#059669' }}>Available to Work</span>
            </div>

            <p className="text-lg text-gray-600 mb-2">Hey, I'm</p>
            
            <h1 
              ref={headlineRef}
              className="text-5xl sm:text-6xl lg:text-7xl font-display font-semibold leading-tight mb-6"
            >
              <span className="headline-line block overflow-hidden">
                {splitText('Karishma')}
              </span>
            </h1>

            <div className="flex flex-wrap items-center gap-2 mb-5">
              <span className="text-sm font-semibold px-3 py-1.5 rounded-full" style={{ background: 'linear-gradient(135deg, rgba(14,165,233,0.12), rgba(129,140,248,0.12))', color: '#0ea5e9', border: '1px solid rgba(14,165,233,0.22)' }}>Product Designer</span>
              <span className="text-gray-300 text-sm">·</span>
              <span className="text-sm font-semibold px-3 py-1.5 rounded-full" style={{ background: 'rgba(129,140,248,0.10)', color: '#818cf8', border: '1px solid rgba(129,140,248,0.22)' }}>Software Engineer</span>
            </div>

            {/* Tool chips */}
            <div className="flex flex-wrap gap-2 mb-7">
              {['Figma', 'React', 'TypeScript', 'Framer Motion', 'Node.js', 'UX Research'].map((tool) => (
                <span key={tool} className="text-xs font-medium px-2.5 py-1 rounded-lg" style={{ background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.08)', color: '#64748b' }}>{tool}</span>
              ))}
            </div>

            <p className="hero-subheading text-base sm:text-lg md:text-xl text-gray-600 max-w-lg mb-8 leading-relaxed">
              I design products people love and build the code that ships them. From zero-to-one UX strategy to production-ready interfaces — I own the full product experience.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <a href="#projects"
                className="hero-cta group inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-medium transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto"
                style={{
                  background: 'linear-gradient(135deg, #0ea5e9 0%, #818cf8 100%)',
                  color: 'white',
                  boxShadow: '0 4px 20px rgba(14,165,233,0.35)'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 8px 30px rgba(14,165,233,0.5)' }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 4px 20px rgba(14,165,233,0.35)' }}
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
                }} >
                <span style={{ color: 'white' }}>View My Work</span>
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2"
                  fill="none"
                  stroke="white"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              
              <a
                href="mailto:karishmaworks08@gmail.com"
                className="hero-cta group inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-medium transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto"
                style={{
                  backgroundColor: 'rgba(0,0,0,0.03)',
                  border: '1.5px solid rgba(0,0,0,0.10)',
                  color: '#0f172a'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(14,165,233,0.07)'
                  e.currentTarget.style.borderColor = 'rgba(14,165,233,0.3)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.03)'
                  e.currentTarget.style.borderColor = 'rgba(0,0,0,0.10)'
                }}
              >
                <span>Email Me</span>
                <svg
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mt-10">
              {[
                { value: '50+', label: 'Projects', color: '#0ea5e9' },
                { value: '30+', label: 'Happy Clients', color: '#818cf8' },
                { value: '5+', label: 'Years Exp.', color: '#10b981' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1 cursor-default"
                  style={{ background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
                >
                  <div className="text-2xl sm:text-3xl font-display font-bold" style={{ color: stat.color }}>{stat.value}</div>
                  <div className="text-xs sm:text-sm text-gray-500 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Phone Mockup */}
          <div
            ref={imageRef}
            className="order-1 lg:order-2 relative mt-10 lg:mt-16"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="relative aspect-[3/4] max-w-sm mx-auto lg:max-w-md">
              {/* Decorative glow behind phone */}
              <div className="absolute inset-0 rounded-[3rem] rotate-6 scale-95" style={{ background: 'radial-gradient(ellipse at center, rgba(56,189,248,0.12) 0%, rgba(0,0,0,0.05) 70%)' }} />

              {/* Phone */}
              <div className="absolute inset-0 animate-float">
                <PhoneMockup />
              </div>

              {/* Floating badge — bottom left */}
              <div className="absolute -bottom-4 -left-6 bg-white rounded-2xl p-3 animate-float-slow z-10" style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.10)', border: '1px solid rgba(0,0,0,0.06)' }}>
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-xs text-gray-800">Available for</div>
                    <div className="text-[10px] text-gray-400">Freelance Work</div>
                  </div>
                </div>
              </div>

              {/* Floating badge — top right */}
              <div className="absolute -top-4 -right-6 rounded-2xl p-3 animate-float z-10" style={{ background: 'linear-gradient(135deg, #0ea5e9, #818cf8)', boxShadow: '0 8px 32px rgba(14,165,233,0.3)' }}>
                <div className="flex items-center gap-2">
                  <span className="text-lg">⚡</span>
                  <div>
                    <div className="font-semibold text-xs text-white">Figma + Code</div>
                    <div className="text-[10px] text-white/70">Design to Dev</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute top-[calc(100%-100px)] sm:top-[calc(100%-40px)] left-1/2 -translate-x-1/2 animate-bounce-soft">
        <div className="w-6 h-10 rounded-full flex justify-center pt-2" style={{ border: '2px solid rgba(14,165,233,0.35)' }}>
          <div className="w-1.5 h-3 rounded-full animate-pulse-soft" style={{ background: 'linear-gradient(180deg, #0ea5e9, #818cf8)' }} />
        </div>
      </div>
      </section>
    </>
  )
}
