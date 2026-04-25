import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '../data/projects'

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section 
      ref={sectionRef}
      id="projects"
      className="py-24 lg:py-32 overflow-hidden scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="projects-header text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-sm font-medium uppercase tracking-wider mb-4 opacity-60"
            style={{ color: 'var(--primary-color)' }}
          >
            Featured Work
          </span>
          <h2 className="text-4xl lg:text-5xl font-display font-semibold mb-4">
            Projects That Make an Impact
          </h2>
          <p className="text-lg opacity-70">
            A curated selection of my recent work across healthcare, sustainability, and fintech
          </p>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid space-y-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="project-card group bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-soft-xl transition-all duration-500"
            >
              <div className={`grid lg:grid-cols-2 gap-0 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                {/* Image */}
                <div className={`relative aspect-[16/10] lg:aspect-auto overflow-hidden ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <img 
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className={`p-8 lg:p-10 flex flex-col justify-center ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{ 
                          backgroundColor: 'var(--bg-color)',
                          color: 'var(--primary-color)'
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="text-sm opacity-60 mb-2">{project.subtitle}</p>
                  
                  <h3 className="text-2xl lg:text-3xl font-display font-semibold mb-4 group-hover:translate-x-1 transition-transform duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="opacity-70 mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Metrics */}
                  <div className="flex gap-6 mb-6">
                    {project.metrics.map((metric) => {
                      const Icon = metric.icon
                      return (
                        <div key={metric.label} className="text-center">
                          <div className="text-2xl font-display font-bold" style={{ color: 'var(--primary-color)' }}>
                            {metric.value}
                          </div>
                          <div className="text-xs opacity-60 flex items-center gap-1 justify-center">
                            <Icon className="w-3 h-3" />
                            {metric.label}
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {/* CTA */}
                  <Link
                    to={
                      project.id === 'ai-care-navigator'
                        ? '/ai-care-navigator-case-study'
                        : project.id === 'restoration-medicine'
                        ? '/restoration-medicine'
                        : project.id === 'folio-tracker'
                        ? '/folio-tracker-case-study'
                        : project.id === 'smart-home-app'
                        ? '/smart-home'
                        : project.id === 'fitness-wearable'
                        ? '/fitness-wearable'
                        : `/${project.id}`
                    }
                    onClick={() => {
                      // Save current scroll position before navigating
                      sessionStorage.setItem('homepage-scroll', String(window.scrollY))
                      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
                    }}
                    className="inline-flex items-center gap-2 font-medium group/link w-fit"
                    style={{ color: 'var(--primary-color)' }}
                  >
                    View Case Study
                    <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
