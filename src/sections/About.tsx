import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Download, Briefcase, GraduationCap, Award } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const workHistory = [
  {
    company: 'Roux Institute, Northeastern University',
    role: 'Full Stack Web Developer Co-op',
    year: '2025',
  },
  {
    company: 'Webtech Digital Solutions, Mumbai, India',
    role: 'User Experience Designer, Intern',
    year: '2022',
  },
]

const teachingResearch = [
  {
    company: 'Northeastern University, Boston, MA',
    role: 'AI for UX - Graduate Head Teaching Assistant',
    year: '2024 - 2025',
  },
  {
    company: 'University of Mumbai, Mumbai, IN',
    role: 'Research Scientist - Human Computer Interaction',
    year: '2022 - 2023',
  },
]

const education = [
  {
    school: 'Northeastern University, Boston, MA',
    degree: 'Master of Science in Information Systems',
    year: '2023 - 2025',
  },
  {
    school: 'University of Mumbai, Mumbai, MH, India',
    degree: 'PGDIT | Bachelor of Computer Applications',
    year: '2018 - 2022',
  },
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sectionEl = sectionRef.current
      const contentEl = contentRef.current
      const shapeEl = sectionEl?.querySelector('.about-shape')
      const labelEls = sectionEl?.querySelectorAll('.about-label') ?? []
      const headingEls = sectionEl?.querySelectorAll('.about-heading') ?? []
      const textEls = sectionEl?.querySelectorAll('.about-text') ?? []
      const timelineSectionEl = sectionEl?.querySelector('.timeline-section')
      const timelineItemEls = sectionEl?.querySelectorAll('.timeline-item') ?? []

      // Image reveal animation
      if (imageRef.current && sectionEl) {
        gsap.from(imageRef.current, {
          x: -100,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionEl,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          }
        })
      }

      // Decorative shape
      if (shapeEl && sectionEl) {
        gsap.from(shapeEl, {
          scale: 0,
          rotation: -180,
          opacity: 0,
          duration: 0.6,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: sectionEl,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          }
        })
      }

      // Content animations
      if (labelEls.length > 0 && contentEl) {
        gsap.from(labelEls, {
          opacity: 0,
          duration: 0.4,
          scrollTrigger: {
            trigger: contentEl,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          }
        })
      }

      if (headingEls.length > 0 && contentEl) {
        gsap.from(headingEls, {
          y: 50,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentEl,
            start: 'top 65%',
            toggleActions: 'play none none reverse',
          }
        })
      }

      if (textEls.length > 0 && contentEl) {
        gsap.from(textEls, {
          y: 20,
          opacity: 0,
          duration: 0.4,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contentEl,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          }
        })
      }

      // Timeline items
      if (timelineItemEls.length > 0 && timelineSectionEl) {
        gsap.from(timelineItemEls, {
          x: 30,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: timelineSectionEl,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          }
        })
      }

      // Parallax effects
      if (sectionEl) {
        ScrollTrigger.create({
          trigger: sectionEl,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress
            if (imageRef.current) {
              gsap.set(imageRef.current, { y: (progress - 0.5) * 100 })
            }
          }
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={sectionRef}
      id="about"
      className="py-24 lg:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Main About Section */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-32">
          {/* Image */}
          <div ref={imageRef} className="relative lg:sticky lg:top-32">
            <div className="relative aspect-[3/4] max-w-md mx-auto lg:max-w-none">
              {/* Background shape */}
              <div className="absolute -inset-4 rounded-[3rem] -rotate-3 opacity-20"
                style={{ backgroundColor: 'var(--primary-color)' }}
              />
              
              {/* Main image */}
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-soft-xl">
                <img 
                  src="/karishma-photo.jpg" 
                  alt="Karishma Dilip Gawali"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef}>
            <span className="about-label inline-block text-sm font-medium uppercase tracking-wider mb-4 opacity-60"
              style={{ color: 'var(--primary-color)' }}
            >
              About Me
            </span>
            
            <h2 className="about-heading text-4xl lg:text-5xl font-display font-semibold mb-6 leading-tight">
              Designing experiences that solve real-world problems.
            </h2>

            <div className="space-y-4 opacity-70 leading-relaxed mb-8">
              <p className="about-text">
                I love turning ideas into something real through design. What started as a hobby 
                turned into a career when I discovered how design can make things both look great 
                and work better.
              </p>
              <p className="about-text">
                I focus on creating user interfaces that serve a real purpose – making sure they're 
                not just pretty, but actually solve problems. Whether I'm working on a mobile app 
                or a website, my goal is to make something that feels natural and easy to use.
              </p>
              <p className="about-text">
                I'm a bit of a perfectionist when it comes to the small stuff, but I think that's 
                what makes good design great. This attention to detail helps me build strong 
                relationships with clients, as they know I'll put the same care into their project 
                that they would.
              </p>
            </div>

            {/* CTA */}
            <a 
              href="https://drive.google.com/file/d/10FNZy2Uh4MDCWBEGBQI28wgOdyVGbkIs/view"
              target="_blank"
              rel="noopener noreferrer"
              className="about-text inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white transition-colors group"
              style={{ backgroundColor: 'var(--primary-color)' }}
            >
              <Download className="w-5 h-5 group-hover:animate-bounce" />
              Check my Resume
            </a>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="timeline-section grid md:grid-cols-2 lg:grid-cols-3 gap-8 pt-6">
          {/* Work History */}
          <div className="bg-white rounded-3xl p-6 shadow-soft">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                style={{ backgroundColor: 'var(--primary-color)' }}
              >
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="font-display font-semibold text-xl">Work History</h3>
            </div>
            <div className="space-y-4">
              {workHistory.map((item, index) => (
                <div key={index} className="timeline-item border-l-2 pl-4" style={{ borderColor: 'var(--bg-color)' }}>
                  <div className="font-semibold text-sm">{item.company}</div>
                  <div className="opacity-60 text-sm">{item.role}</div>
                  <div className="opacity-40 text-xs mt-1">{item.year}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Teaching & Research */}
          <div className="bg-white rounded-3xl p-6 shadow-soft">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                style={{ backgroundColor: 'var(--primary-color)' }}
              >
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-display font-semibold text-xl">Teaching & Research</h3>
            </div>
            <div className="space-y-4">
              {teachingResearch.map((item, index) => (
                <div key={index} className="timeline-item border-l-2 pl-4" style={{ borderColor: 'var(--bg-color)' }}>
                  <div className="font-semibold text-sm">{item.company}</div>
                  <div className="opacity-60 text-sm">{item.role}</div>
                  <div className="opacity-40 text-xs mt-1">{item.year}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="bg-white rounded-3xl p-6 shadow-soft">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                style={{ backgroundColor: 'var(--primary-color)' }}
              >
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="font-display font-semibold text-xl">Education</h3>
            </div>
            <div className="space-y-4">
              {education.map((item, index) => (
                <div key={index} className="timeline-item border-l-2 pl-4" style={{ borderColor: 'var(--bg-color)' }}>
                  <div className="font-semibold text-sm">{item.school}</div>
                  <div className="opacity-60 text-sm">{item.degree}</div>
                  <div className="opacity-40 text-xs mt-1">{item.year}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
