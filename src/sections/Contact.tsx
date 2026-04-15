import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Mail, Phone, MapPin, Send, CheckCircle, MessageCircle } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const isFormIncomplete = !formState.name || !formState.email || !formState.subject || !formState.message

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-header', {
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

      gsap.from('.form-field', {
        y: 30,
        opacity: 0,
        duration: 0.4,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.contact-form',
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        }
      })

      gsap.from('.contact-info-item', {
        x: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.contact-info',
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        }
      })

      // Social icons - always visible (no animation)
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError('')

    try {
      const response = await fetch('/.netlify/functions/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          subject: formState.subject,
          message: formState.message,
        }),
      })

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}))
        throw new Error(errorBody.error || 'Failed to send. Please try again.')
      }

      setIsSubmitted(true)
      setTimeout(() => {
        setIsSubmitted(false)
        setFormState({ name: '', email: '', subject: '', message: '' })
      }, 3000)
    } catch (error) {
      console.error('Contact form submit failed', error)
      const message = error instanceof Error
        ? error.message
        : 'Failed to send. Please try again.'
      setSubmitError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
    if (submitError) {
      setSubmitError('')
    }
  }

  return (
    <section 
      ref={sectionRef}
      id="contact"
      className="py-24 lg:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="contact-header text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-sm font-medium uppercase tracking-wider mb-4 opacity-60"
            style={{ color: 'var(--primary-color)' }}
          >
            Get in Touch
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold mb-4">
            Let's design incredible work together.
          </h2>
          <p className="text-base sm:text-lg opacity-70">
            Have a project in mind? I'd love to hear about it.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="contact-form space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="form-field">
                  <label htmlFor="name" className="block text-sm font-medium mb-2 opacity-80">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-black/10 rounded-xl focus:outline-none transition-all bg-white"
                    style={{ 
                      borderColor: 'rgba(0,0,0,0.1)',
                    }}
                    placeholder="John Doe"
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="email" className="block text-sm font-medium mb-2 opacity-80">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all bg-white"
                    style={{ borderColor: 'rgba(0,0,0,0.1)' }}
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="subject" className="block text-sm font-medium mb-2 opacity-80">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formState.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all bg-white"
                  style={{ borderColor: 'rgba(0,0,0,0.1)' }}
                  placeholder="Project Inquiry"
                />
              </div>

              <div className="form-field">
                <label htmlFor="message" className="block text-sm font-medium mb-2 opacity-80">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all bg-white resize-none"
                  style={{ borderColor: 'rgba(0,0,0,0.1)' }}
                  placeholder="Tell me about your project..."
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting || isSubmitted || isFormIncomplete}
                  className="form-field w-full sm:w-auto px-6 py-3 rounded-xl font-medium text-sm inline-flex items-center justify-center gap-2 transition-all duration-300 text-white"
                  style={{
                    backgroundColor: '#22c55e',
                    opacity: isFormIncomplete ? 0.6 : 1,
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : isSubmitted ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Submit
                    </>
                  )}
                </button>
              </div>
              {submitError && (
                <p className="text-sm text-red-600">{submitError}</p>
              )}
            </form>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2 contact-info">
            <div className="space-y-5">
              <div className="contact-info-item flex items-start gap-4 p-4 bg-white rounded-2xl shadow-soft">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-white"
                  style={{ backgroundColor: 'var(--primary-color)' }}
                >
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-semibold mb-1">Email</h3>
                  <a 
                    href="mailto:karishmaworks08@gmail.com"
                    className="opacity-60 hover:opacity-100 transition-opacity"
                  >
                    karishmaworks08@gmail.com
                  </a>
                </div>
              </div>

              <div className="contact-info-item flex items-start gap-4 p-4 bg-white rounded-2xl shadow-soft">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-white"
                  style={{ backgroundColor: 'var(--primary-color)' }}
                >
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-semibold mb-1">Call Me</h3>
                  <a 
                    href="tel:+18574459682"
                    className="opacity-60 hover:opacity-100 transition-opacity"
                  >
                    +1 (857) 445-9682
                  </a>
                </div>
              </div>

              <div className="contact-info-item flex items-start gap-4 p-4 bg-white rounded-2xl shadow-soft">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-white"
                  style={{ backgroundColor: 'var(--primary-color)' }}
                >
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-semibold mb-1">Based in</h3>
                  <p className="opacity-60">Boston, MA</p>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a 
                href="https://wa.me/18574459682"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-info-item flex items-center gap-4 p-4 bg-green-500 text-white rounded-2xl shadow-soft hover:bg-green-600 transition-colors"
              >
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-semibold mb-1">Chat on WhatsApp</h3>
                  <p className="text-green-100 text-sm">Quick response guaranteed</p>
                </div>
              </a>

              {/* Social Links */}
              <div className="contact-info-item p-4 bg-white rounded-2xl shadow-soft">
                <h3 className="font-display font-semibold mb-3">Follow Me</h3>
                <div className="social-icons flex flex-wrap gap-3">
                {[
                  { 
                    name: 'GitHub', 
                    href: 'https://github.com/karishmag83',
                    icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z'
                  },
                  { 
                    name: 'LinkedIn', 
                    href: 'https://www.linkedin.com/in/karishmagawali/',
                    icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'
                  },
                  { 
                    name: 'Behance', 
                    href: 'https://www.behance.net/karishmagawali',
                    icon: 'M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z'
                  },
                  { 
                    name: 'Dribbble', 
                    href: 'https://dribbble.com/Karishma_83',
                    icon: 'M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.814zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.17zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702-1.81-1.61-4.19-2.586-6.795-2.586-.825 0-1.63.1-2.4.29zm10.335 3.483c-.218.29-1.935 2.493-5.724 4.04.24.49.47.985.68 1.486.08.18.15.36.22.53 3.41-.428 6.8.26 7.14.33-.02-2.42-.88-4.64-2.31-6.38z'
                  },
                  { 
                    name: 'Instagram', 
                    href: 'https://www.instagram.com/cute.criminal.8/',
                    icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z'
                  },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon w-14 h-14 bg-black hover:bg-gray-800 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                    aria-label={social.name}
                    title={social.name}
                  >
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d={social.icon} />
                    </svg>
                  </a>
                ))}
              </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
