import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    id: 1,
    quote: "“Karishma is an exceptional UX designer with strong product thinking and AI-enhanced UX expertise. I highly recommend her for UX and product roles in AI and emerging technologies.”",
    name: "Vishal Chawla",
    role: "Director of Enterprise Collaboration, AI and Web Services/Applications at MIT",
    image: "/VishalChawla.jpg",
    rating: 5,
  },
  {
    id: 2,
    quote: "“Karishma is an inquisitive, dedicated multidisciplinary UI/UX designer and web developer who quickly understands client needs and delivers strong work across decks, brands, and websites using UI/UX best practices and modern design trends.”",
    name: "Matthew Smith",
    role: "Design Lead at iBec Creative",
    image: "/MatthewSmith.jpg",
    rating: 5,
  },
  {
    id: 3,
    quote: "“Thanks to Karishma, our website redesign became noticeably more user-friendly and conversion-ready. Her ability to simplify complex flows and deliver a refined UI was outstanding.”",
    name: "John Neal",
    role: "Chief Product & Analytics Officer at Restoration Medicine",
    image: "/JohnNeal.jpg",
    rating: 5,
  },
  {
    id: 4,
    quote: "“Karishma’s thoughtful design direction brought clarity and cohesion to our showcase deck, making it easier to present and easier to understand.”",
    name: "Uchenna Onyeachom",
    role: "Founder at Health for Mankind",
    image: "/UchennaOnyeachom.jpg",
    rating: 5,
  }
]

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.testimonials-header', {
        y: 40,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        }
      })

      gsap.from('.testimonial-carousel', {
        rotateX: 30,
        translateZ: -100,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        goToNext()
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [activeIndex, isAnimating])

  const goToNext = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
    setTimeout(() => setIsAnimating(false), 600)
  }

  const goToPrev = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setTimeout(() => setIsAnimating(false), 600)
  }

  const goToSlide = (index: number) => {
    if (isAnimating || index === activeIndex) return
    setIsAnimating(true)
    setActiveIndex(index)
    setTimeout(() => setIsAnimating(false), 600)
  }

  return (
    <section 
      ref={sectionRef}
      id="testimonials"
      className="py-24 lg:py-32 overflow-hidden"
      style={{ perspective: '1200px' }}
    >
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="testimonials-header text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-sm font-medium uppercase tracking-wider mb-4 opacity-60"
            style={{ color: 'var(--primary-color)' }}
          >
            Testimonials
          </span>
          <h2 className="text-4xl lg:text-5xl font-display font-semibold mb-4">
            Trusted by many. Hear from what my clients have to say.
          </h2>
        </div>

        {/* Carousel */}
        <div 
          className="testimonial-carousel relative"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Main Card */}
          <div className="relative bg-white rounded-3xl p-8 lg:p-12 shadow-soft-xl overflow-hidden">
            {/* Quote icon */}
            <div className="absolute top-8 right-8 text-8xl font-serif opacity-5 leading-none"
              style={{ color: 'var(--primary-color)' }}
            >
              "
            </div>

            <div className="relative">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`transition-all duration-600 ${
                    index === activeIndex 
                      ? 'opacity-100 translate-x-0' 
                      : 'opacity-0 absolute inset-0 translate-x-20'
                  }`}
                  style={{ 
                    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                    display: index === activeIndex ? 'block' : 'none'
                  }}
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star 
                        key={i} 
                        className="w-5 h-5 fill-yellow-400 text-yellow-400" 
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-lg sm:text-xl lg:text-2xl font-display leading-relaxed mb-6 sm:mb-8 opacity-80">
                    {testimonial.quote}
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden">
                      <img 
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-display font-semibold text-lg">
                        {testimonial.name}
                      </div>
                      <div className="opacity-50 text-sm">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className="w-3 h-3 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: index === activeIndex ? 'var(--primary-color)' : 'rgba(0,0,0,0.2)',
                    width: index === activeIndex ? '2rem' : '0.75rem'
                  }}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-3">
              <button
                onClick={goToPrev}
                className="w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 hover:text-white"
                style={{ 
                  borderColor: 'rgba(0,0,0,0.2)',
                  color: 'var(--text-color)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--primary-color)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={goToNext}
                className="w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 hover:text-white"
                style={{ 
                  borderColor: 'rgba(0,0,0,0.2)',
                  color: 'var(--text-color)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--primary-color)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
