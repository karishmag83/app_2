import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Heart } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const socialLinks = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/karishmagawali/',
    label: 'LinkedIn'
  },
  {
    name: 'Dribbble',
    href: 'https://dribbble.com/Karishma_83',
    label: 'Dribbble'
  },
  {
    name: 'Behance',
    href: 'https://www.behance.net/karishmagawali',
    label: 'Behance'
  },
]

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline animation
      const headline = footerRef.current?.querySelector('.footer-headline')
      if (headline) {
        const chars = headline.querySelectorAll('.char')
        gsap.from(chars, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.02,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        })
      }

      // Social icons
      gsap.from('.footer-social', {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        stagger: 0.06,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 65%',
          toggleActions: 'play none none reverse',
        }
      })

      // Copyright
      gsap.from('.footer-copyright', {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        }
      })

    }, footerRef)

    return () => ctx.revert()
  }, [])

  const splitText = (text: string) => {
    return text.split('').map((char, i) => (
      <span key={i} className="char inline-block" style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}>
        {char}
      </span>
    ))
  }

  return (
    <footer
      ref={footerRef}
      className="relative py-20 lg:py-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center text-center">
          {/* Headline */}
          <h2 className="footer-headline text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-8 px-4">
            {splitText("Have a great idea? Let's build it.")}
          </h2>

          {/* Social Links */}
          <div className="flex gap-3 mb-12">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social px-4 h-10 bg-black/5 rounded-full flex items-center justify-center text-sm font-medium hover:bg-black hover:text-white transition-all duration-300 hover:scale-105"
              >
                {social.label}
              </a>
            ))}
          </div>

          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-6 mb-8 text-sm text-gray-500 text-center">
            <a href="mailto:karishmaworks08@gmail.com" className="hover:text-black transition-colors">
              karishmaworks08@gmail.com
            </a>
            <span className="hidden sm:inline">•</span>
            <a href="tel:+18574459682" className="hover:text-black transition-colors">
              +1 (857) 445-9682
            </a>
            <span className="hidden sm:inline">•</span>
            <span>Boston, MA</span>
          </div>

          {/* Divider */}
          <div className="w-full max-w-md h-px bg-black/10 mb-8" />

          {/* Copyright */}
          <div className="footer-copyright flex flex-col sm:flex-row items-center gap-2 text-sm text-gray-500 text-center">
            <span>© {new Date().getFullYear()} Karishma Dilip Gawali.</span>
            <span className="flex items-center gap-1">
              Crafted with <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" /> and passion
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
