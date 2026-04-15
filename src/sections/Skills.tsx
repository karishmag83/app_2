import { useRef } from 'react'
import { 
  Figma, 
  Code2, 
  Palette, 
  Layers, 
  Sparkles, 
  Box,
  FileCode,
  Braces,
  Database,
  Layout,
  Monitor,
  GitBranch,
  Terminal
} from 'lucide-react'


const designSkills = [
  {
    category: 'UX / UI Design',
    description: 'User research, wireframing, prototyping, and usability testing',
    icon: Figma,
  },
  {
    category: 'Web Design',
    description: 'Responsive design systems and component libraries',
    icon: Monitor,
  },
  {
    category: 'Brand Identity',
    description: 'Logo design, visual systems, and brand guidelines',
    icon: Palette,
  },
  {
    category: 'Design Systems',
    description: 'Scalable component libraries and design tokens',
    icon: Layers,
  },
  {
    category: 'Motion Design',
    description: 'Micro-interactions and animated prototypes',
    icon: Sparkles,
  },
  {
    category: '3D Design',
    description: 'Three-dimensional visual elements and illustrations',
    icon: Box,
  },
]

const techStack = [
  { name: 'HTML5', description: 'Semantic markup', icon: FileCode },
  { name: 'CSS3', description: 'Modern styling', icon: Code2 },
  { name: 'Sass', description: 'CSS preprocessing', icon: Layers },
  { name: 'JavaScript', description: 'ES6+ features', icon: Braces },
  { name: 'React', description: 'Component architecture', icon: Monitor },
  { name: 'TypeScript', description: 'Type-safe code', icon: Terminal },
  { name: 'Bootstrap', description: 'Rapid prototyping', icon: Layout },
  { name: 'Redux', description: 'State management', icon: Database },
  { name: 'Git', description: 'Version control', icon: GitBranch },
  { name: 'SQL', description: 'Database queries', icon: Database },
]

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section 
      ref={sectionRef}
      id="skills"
      className="py-24 lg:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="skills-header text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-sm font-medium uppercase tracking-wider mb-4 opacity-60"
            style={{ color: 'var(--primary-color)' }}
          >
            Expertise
          </span>
          <h2 className="text-4xl lg:text-5xl font-display font-semibold mb-6">
            Providing Services that supercharge your business
          </h2>
          <p className="text-lg opacity-70">
            From design to development, I bring ideas to life with precision and creativity
          </p>
        </div>

        {/* Design Skills Section */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: 'var(--primary-color)' }}
            >
              <Palette className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-display font-semibold">Design Stack</h3>
              <p className="text-sm opacity-60">Where creativity meets strategy</p>
            </div>
          </div>
          
          <div className="design-skills-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {designSkills.map((skill) => {
              const Icon = skill.icon
              return (
                <div
                  key={skill.category}
                  className="design-skill-card group bg-white rounded-2xl p-6 border border-black/5 hover:border-black/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                      style={{ backgroundColor: 'var(--bg-color)' }}
                    >
                      <Icon className="w-6 h-6" style={{ color: 'var(--primary-color)' }} />
                    </div>
                    <div>
                      <h4 className="font-display font-semibold text-lg mb-1">
                        {skill.category}
                      </h4>
                      <p className="text-sm opacity-60 leading-relaxed">
                        {skill.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Tech Stack Section */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: 'var(--primary-color)' }}
            >
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-display font-semibold">Tech Stack</h3>
              <p className="text-sm opacity-60">Where Figma ends, my code begins</p>
            </div>
          </div>
          
          <div className="tech-stack-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {techStack.map((tech) => {
              const Icon = tech.icon
              return (
                <div
                  key={tech.name}
                  className="tech-item group bg-white rounded-xl p-4 border border-black/5 hover:border-black/20 transition-all duration-300 hover:-translate-y-1 text-center"
                >
                  <div className="w-10 h-10 mx-auto mb-3 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{ backgroundColor: 'var(--bg-color)' }}
                  >
                    <Icon className="w-5 h-5" style={{ color: 'var(--primary-color)' }} />
                  </div>
                  <h4 className="font-semibold text-sm mb-0.5">{tech.name}</h4>
                  <p className="text-xs opacity-50">{tech.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-black/10">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium">Currently exploring: AI/ML Integration</span>
          </div>
        </div>
      </div>
    </section>
  )
}
