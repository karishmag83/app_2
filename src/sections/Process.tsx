import { useRef } from 'react'
import { ArrowRight, Layers, Compass, Grid3x3, Sparkles } from 'lucide-react'

const processHighlights = [
  { label: 'Color + Type Tokens', icon: Layers },
  { label: 'Core Components', icon: Grid3x3 },
  { label: 'Usage Guidelines', icon: Compass },
  { label: 'QA + Accessibility', icon: Sparkles },
]

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section
      ref={sectionRef}
      id="process"
      className="py-24 lg:py-28 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span
            className="inline-block text-sm font-medium uppercase tracking-wider mb-4 opacity-60"
            style={{ color: 'var(--primary-color)' }}
          >
            Process
          </span>
          <h2 className="text-4xl lg:text-5xl font-display font-semibold mb-4">
            Design System
          </h2>
          <p className="text-lg opacity-70">
            A structured system that keeps products consistent, fast to build, and easy to scale.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div
            className="bg-white rounded-3xl p-8 lg:p-10 border-2"
            style={{
              borderColor: 'var(--primary-color)',
              backgroundColor: 'rgba(255, 255, 255, 0.98)',
              boxShadow: '0 18px 50px -35px rgba(0, 0, 0, 0.35)'
            }}
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <p className="text-sm uppercase tracking-wider opacity-60 mb-2">Design System</p>
                <h3 className="text-2xl lg:text-3xl font-display font-semibold mb-3">
                  A reusable foundation for every product surface
                </h3>
                <p className="text-base opacity-70 leading-relaxed max-w-2xl">
                  I build design systems that align visual language, components, and accessibility
                  standards so teams can move faster without losing craft.
                </p>
              </div>
              <div className="flex flex-col items-start">
                <div className="-mt-216 flex flex-wrap gap-3">
                  {processHighlights.map((item) => {
                    const Icon = item.icon
                    return (
                      <div
                        key={item.label}
                        className="flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 bg-black/5"
                      >
                        <Icon className="w-4 h-4" style={{ color: 'var(--primary-color)' }} />
                        <span className="text-sm font-medium">{item.label}</span>
                      </div>
                    )
                  })}
                </div>
                <a
                  href="/DesignSystem"
                  className="mt-8 ml-8 inline-flex items-center gap-2 rounded-2xl px-9 py-4 text-lg font-semibold transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    backgroundColor: 'var(--primary-color)',
                    color: 'white'
                  }}
                  onClick={() => {
                    sessionStorage.setItem('homepage-scroll', String(window.scrollY))
                  }}
                >
                  Explore the Design System
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
