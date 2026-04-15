import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

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
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="hero-shape absolute top-20 right-[15%] w-32 h-32 animate-spin-slow">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M50 0C55 35 65 45 100 50C65 55 55 65 50 100C45 65 35 55 0 50C35 45 45 35 50 0Z" 
              fill="black"
              fillOpacity="0.08"
            />
          </svg>
        </div>
        <div className="absolute bottom-40 left-[10%] w-24 h-24 animate-float-slow">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="50" fill="black" fillOpacity="0.05" />
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div ref={contentRef} className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-black/5 rounded-full mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium">Available to Work</span>
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

            <p className="text-2xl font-display font-medium mb-4">
              Product Designer
            </p>

            <p className="hero-subheading text-base sm:text-lg md:text-xl text-gray-600 max-w-lg mb-8 leading-relaxed">
              I create everything your brand needs to attract customers and turn them into sales. 
              I provide strategic design that drives growth, and not just that looks good.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <a href="#projects"
                className="hero-cta group inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-medium transition-all duration-300 hover:shadow-soft-lg hover:-translate-y-1 w-full sm:w-auto"
                style={{ 
                  backgroundColor: 'var(--primary-color)', 
                  color: 'white'
                }}
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
                }} >
                <span style={{ color: 'white' }}>View My Work</span>
                <svg 
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" 
                  fill="white" 
                  stroke="none" 
                  viewBox="0 0 24 24"
                >
                  <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              
              <a 
                href="mailto:karishmaworks08@gmail.com"
                className="hero-cta group inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-medium transition-all duration-300 w-full sm:w-auto"
                style={{ 
                  borderColor: 'var(--primary-color)',
                  color: 'var(--primary-color)',
                  borderWidth: '2px',
                  backgroundColor: 'transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--primary-color)'
                  const span = e.currentTarget.querySelector('span')
                  if (span) span.style.color = 'white'
                  const svg = e.currentTarget.querySelector('svg')
                  if (svg) svg.style.fill = 'white'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                  const span = e.currentTarget.querySelector('span')
                  if (span) span.style.color = 'var(--primary-color)'
                  const svg = e.currentTarget.querySelector('svg')
                  if (svg) svg.style.fill = 'var(--primary-color)'
                }}
              >
                <span style={{ color: 'var(--primary-color)' }}>Email Me</span>
                <svg 
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                  fill="var(--primary-color)"
                  stroke="none" 
                  viewBox="0 0 24 24"
                >
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-12 pt-8 border-t border-black/10">
              <div>
                <div className="text-2xl sm:text-3xl font-display font-bold">50+</div>
                <div className="text-xs sm:text-sm text-gray-500">Projects</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-display font-bold">30+</div>
                <div className="text-xs sm:text-sm text-gray-500">Happy Clients</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-display font-bold">5+</div>
                <div className="text-xs sm:text-sm text-gray-500">Years Exp.</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div 
            ref={imageRef}
            className="order-1 lg:order-2 relative mt-10 lg:mt-16"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="relative aspect-[3/4] max-w-sm mx-auto lg:max-w-md">
              {/* Decorative blob behind image */}
              <div className="absolute inset-0 bg-black/5 rounded-[3rem] rotate-6 scale-95" />
              
              {/* Main image */}
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-soft-xl animate-float">
                <img 
                  src="/karishma-photo.jpg" 
                  alt="Karishma Dilip Gawali - Product Designer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-soft-lg animate-float-slow">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-sm">Available for</div>
                    <div className="text-xs text-gray-500">Freelance Work</div>
                  </div>
                </div>
              </div>

              {/* Tech stack badge */}
              <div className="absolute -top-4 -right-4 bg-black text-white rounded-2xl p-4 shadow-soft-lg animate-float">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🎨</span>
                  <div>
                    <div className="font-semibold text-sm">Figma + Code</div>
                    <div className="text-xs text-gray-400">Design to Dev</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute top-[calc(100%-100px)] sm:top-[calc(100%-40px)] left-1/2 -translate-x-1/2 animate-bounce-soft">
        <div className="w-6 h-10 border-2 border-black/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-black/50 rounded-full animate-pulse-soft" />
        </div>
      </div>
      </section>
    </>
  )
}
