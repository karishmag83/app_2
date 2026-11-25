import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight, FileText, MapPin } from 'lucide-react'
import {
  EDUCATION,
  EXPERIENCE,
  LEADERSHIP,
  PROFILE,
  TEACHING_RESEARCH,
  type CareerItem,
} from '../data/profile.ts'

gsap.registerPlugin(ScrollTrigger)

/** Muted body copy with key phrases lifted to full contrast. */
function Lift({ children }: { children: React.ReactNode }) {
  return <span className="font-medium" style={{ color: 'var(--text-color)' }}>{children}</span>
}

/** "Apr 2026 – Present" -> "2026", "Jan 2021 – Jul 2023" -> "2021 – 2023". */
function yearsOf(period: string) {
  const years = [...new Set(period.match(/\d{4}/g) ?? [])]
  return years.length > 1 ? `${years[0]} – ${years[years.length - 1]}` : years[0] ?? period
}

/** "Roux Institute, Northeastern University" -> name "Roux Institute", parent "Northeastern University". */
function splitOrg(org: string) {
  const [name, ...rest] = org.split(',').map(part => part.trim())
  return { name, parent: rest.join(', ') || undefined }
}

/** The organization's logo on a white tile, like an app icon. One size everywhere in the career section. */
function OrgLogo({ item }: { item: CareerItem }) {
  return (
    <span className="career-logo block h-12 w-12 shrink-0 overflow-hidden rounded-[14px]">
      {item.logo && <img src={item.logo} alt="" className="h-full w-full object-contain" loading="lazy" decoding="async" />}
    </span>
  )
}

/** One role in the experience ledger. */
function RoleRow({ role }: { role: CareerItem }) {
  const { name, parent } = splitOrg(role.org)
  return (
    <li className="career-row grid gap-6 px-6 py-8 sm:px-10 sm:py-10 md:grid-cols-12 md:gap-10">
      <div className="flex gap-4 sm:gap-5 md:col-span-5">
        <OrgLogo item={role} />
        <div className="min-w-0 pt-0.5">
          <h4 className="font-display text-[1.3rem] font-semibold leading-snug tracking-tight sm:text-[1.4rem]" style={{ color: 'var(--text-color)' }}>
            {name}
          </h4>
          {parent && <p className="mt-0.5 text-[14px] leading-snug" style={{ color: 'var(--muted-color)' }}>{parent}</p>}
          <p className="mt-1.5 text-[15px] font-medium leading-snug" style={{ color: 'var(--text-soft)' }}>{role.title}</p>
          <p className="career-year mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[14px]">
            <span className="tabular-nums">{yearsOf(role.period)}</span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              {role.location}
            </span>
          </p>
        </div>
      </div>
      <div className="md:col-span-7 md:pt-0.5">
        {role.brief && (
          <p className="text-[15px] leading-[1.7] sm:text-[16px]" style={{ color: 'var(--muted-color)' }}>{role.brief}</p>
        )}
        {role.areas?.length ? (
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Focus areas">
            {role.areas.map(area => (
              <li key={area} className="career-chip rounded-full px-3 py-1 text-[13px] font-medium">{area}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </li>
  )
}

/** A full-width card whose cells share one anatomy: logo and years, then organization and role. */
function CareerGroup({ title, items, columns }: { title: string; items: CareerItem[]; columns: 2 | 3 }) {
  return (
    <section className="career-reveal mt-16 sm:mt-20" aria-label={title}>
      <div className="mb-6 flex items-center gap-5 sm:mb-7">
        <h4 className="font-display text-[1.6rem] font-semibold tracking-tight sm:text-[1.85rem]">{title}</h4>
        <span className="h-px flex-1" style={{ backgroundColor: 'var(--border-color)' }} aria-hidden="true" />
      </div>
      <ul className={`career-card career-cells grid rounded-[28px] ${columns === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
        {items.map(item => {
          const { name } = splitOrg(item.org)
          return (
            <li key={item.id} className="career-cell flex flex-col p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <OrgLogo item={item} />
                <span className="career-year pt-1 text-[14px] tabular-nums">{yearsOf(item.period)}</span>
              </div>
              <p className="mt-6 font-display text-[1.3rem] font-semibold leading-snug tracking-tight sm:text-[1.4rem]" style={{ color: 'var(--text-color)' }}>
                {name}
              </p>
              <p className="mt-1.5 text-[15px] font-medium leading-snug" style={{ color: 'var(--text-soft)' }}>{item.title}</p>
              {item.focus && <p className="mt-1 text-[14px] leading-snug" style={{ color: 'var(--muted-color)' }}>{item.focus}</p>}
              <p className="career-year mt-auto inline-flex items-center gap-1 pt-4 text-[14px]">
                <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                {item.location}
              </p>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      const frame = section.querySelector('.about-photo-frame')
      const img = section.querySelector('.about-photo img')
      if (frame && img) {
        gsap.timeline({ scrollTrigger: { trigger: frame, start: 'top 80%', toggleActions: 'play none none none' } })
          .fromTo(frame,
            { clipPath: 'inset(12% 6% 0% 6% round 28px)', opacity: 0 },
            { clipPath: 'inset(0% 0% 0% 0% round 28px)', opacity: 1, duration: 1.3, ease: 'expo.out' })
          .fromTo(img, { scale: 1.12 }, { scale: 1, duration: 1.6, ease: 'expo.out' }, 0)
      }

      gsap.utils.toArray<HTMLElement>('.about-reveal').forEach(el => {
        gsap.fromTo(el, { y: 28, opacity: 0 }, {
          y: 0, opacity: 1, duration: 1, ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
        })
      })

      // Experience rows and the two smaller cards rise in sequence as they enter
      const items = gsap.utils.toArray<HTMLElement>('.career-ledger > .career-row, .career-reveal')
      gsap.set(items, { opacity: 0 })
      ScrollTrigger.batch(items, {
        start: 'top 90%',
        once: true,
        onEnter: batch => gsap.fromTo(batch,
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, stagger: 0.09, ease: 'expo.out', overwrite: true }),
      })
    }, section)

    return () => ctx.revert()
  }, [])

  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section ref={sectionRef} id="about" className="relative overflow-hidden py-24 lg:py-32 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header, same pattern as every section on the page */}
        <div className="about-reveal mx-auto mb-14 max-w-3xl text-center lg:mb-20">
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-wider opacity-60" style={{ color: 'var(--primary-color)' }}>
            About Me
          </span>
          <h2 className="font-display text-4xl font-semibold leading-[1.12] lg:text-5xl">
            I design products that make complex work feel{' '}
            <em className="italic" style={{ color: 'var(--primary-color)' }}>effortless.</em>
          </h2>
        </div>

        {/* Portrait and story */}
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-12 lg:gap-20">
          <figure className="about-photo mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
            <div className="about-photo-frame relative aspect-[4/5] overflow-hidden rounded-[28px]" style={{ border: '1px solid var(--border-color)' }}>
              <img
                src="/karishma-photo.jpg"
                alt="Karishma Dilip Gawali smiling by the waterfront"
                className="h-full w-full object-cover"
                style={{ objectPosition: '50% 45%' }}
              />
            </div>
          </figure>

          <div className="lg:col-span-7">
            <div className="space-y-6 text-lg leading-[1.75]" style={{ color: 'var(--muted-color)' }}>
              <p className="about-reveal">
                I am Karishma, a product designer who transforms <Lift>complex, high-stakes workflows into products people trust.</Lift>{' '}
                With more than four years of experience, I have guided web and mobile products from early research through
                launch across enterprise software, conversational AI, healthcare, and fintech.
              </p>
              <p className="about-reveal">
                My practice combines user research and interaction design with <Lift>front-end development in React and
                TypeScript</Lift>, so the work I deliver is buildable, accessible, and measurable. I treat accessibility as the
                foundation of every design rather than a final review, and I am equally committed to mentoring the next
                generation of designers.
              </p>
            </div>

            <div className="about-reveal mt-10 flex flex-wrap gap-3">
              <a
                href={PROFILE.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="about-cta-primary inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 text-[15px] font-semibold"
                style={{ backgroundColor: 'var(--primary-color)', color: 'var(--on-primary)' }}
              >
                <FileText className="h-[18px] w-[18px]" aria-hidden="true" />
                View my résumé
                <ArrowUpRight className="h-4 w-4 opacity-80" aria-hidden="true" />
              </a>
              <a
                href="#contact"
                onClick={scrollToContact}
                className="about-cta-secondary inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-semibold"
                style={{ border: '1px solid var(--border-color)', color: 'var(--text-color)' }}
              >
                Get in touch
              </a>
            </div>
          </div>
        </div>

        {/* Career: a clean ledger, the way a recruiter reads a résumé */}
        <div id="experience" className="mx-auto mt-28 max-w-6xl scroll-mt-24 lg:mt-36">
          <div className="about-reveal mb-10 md:mb-12">
            <div className="max-w-2xl">
              <span className="mb-4 inline-block text-sm font-medium uppercase tracking-wider opacity-60" style={{ color: 'var(--primary-color)' }}>
                Career
              </span>
              <h3 className="font-display text-4xl font-semibold lg:text-5xl">Experience</h3>
              <p className="mt-4 text-lg leading-relaxed" style={{ color: 'var(--muted-color)' }}>
                Product design and front-end development across enterprise software, healthcare, and fintech.
              </p>
            </div>
          </div>

          <ol className="career-card career-ledger rounded-[28px]" aria-label="Work experience">
            {EXPERIENCE.map(role => <RoleRow key={role.id} role={role} />)}
          </ol>

          <CareerGroup title="Education" items={EDUCATION} columns={2} />
          <CareerGroup title="Teaching, research, and leadership" items={[...TEACHING_RESEARCH, ...LEADERSHIP]} columns={3} />
        </div>
      </div>

    </section>
  )
}
