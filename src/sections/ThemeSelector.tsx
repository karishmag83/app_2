import { useRef } from 'react'

interface ThemeSelectorProps {
  onSelect: (theme: string) => void
}

const themes = [
  {
    id: 'indigo',
    name: 'Electric Indigo',
    desc: 'Designer\'s staple',
    bgColor: '#f5f3ff',
    accentColor: '#4f46e5',
    barColor: '#818cf8',
  },
  {
    id: 'emerald',
    name: 'Deep Emerald',
    desc: 'Fresh & natural',
    bgColor: '#ecfdf5',
    accentColor: '#059669',
    barColor: '#34d399',
  },
  {
    id: 'amber',
    name: 'Amber Gold',
    desc: 'Warm & creative',
    bgColor: '#fffbeb',
    accentColor: '#d97706',
    barColor: '#fbbf24',
  },
  {
    id: 'crimson',
    name: 'Rose Crimson',
    desc: 'Bold & confident',
    bgColor: '#fff1f3',
    accentColor: '#e11d48',
    barColor: '#fb7185',
  },
  {
    id: 'cyan',
    name: 'Ocean Cyan',
    desc: 'Cool & futuristic',
    bgColor: '#ecfeff',
    accentColor: '#0891b2',
    barColor: '#22d3ee',
  },
  {
    id: 'graphite',
    name: 'Graphite',
    desc: 'Editorial & minimal',
    bgColor: '#f8f9fa',
    accentColor: '#1e293b',
    barColor: '#64748b',
  },
]

function playClickSound() {
  try {
    const ctx = new AudioContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.type = 'sine'
    osc.frequency.setValueAtTime(1100, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(550, ctx.currentTime + 0.06)
    gain.gain.setValueAtTime(0.25, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09)
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.09)
    osc.onended = () => ctx.close()
  } catch {
    // Web Audio not available
  }
}

export default function ThemeSelector({ onSelect }: ThemeSelectorProps) {
  const cardsRef = useRef<HTMLDivElement[]>([])

  const handleSelect = (id: string) => {
    playClickSound()
    onSelect(id)
  }

  return (
    <div className="theme-selector fixed inset-0 z-[100] flex items-center justify-center bg-gray-50 overflow-y-auto py-8">
      <div className="w-full max-w-5xl px-6 my-auto">
        <h2 className="theme-title text-center text-3xl md:text-4xl font-display font-semibold mb-3">
          Choose Your Experience
        </h2>
        <p className="theme-title text-center text-gray-500 mb-12 text-lg">
          Select a color theme that resonates with you
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {themes.map((theme, index) => (
            <div
              key={theme.id}
              ref={el => { if (el) cardsRef.current[index] = el }}
              onClick={() => handleSelect(theme.id)}
              className="group relative bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border-2 border-gray-100 cursor-pointer overflow-hidden"
              style={{ borderColor: 'transparent' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = theme.accentColor + '55')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'transparent')}
            >
              {/* Color preview */}
              <div
                className="w-full aspect-[4/3] rounded-xl mb-4 relative overflow-hidden"
                style={{ backgroundColor: theme.bgColor }}
              >
                {/* Simulated nav bar */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <div className="h-2 w-10 rounded-full opacity-60" style={{ backgroundColor: theme.accentColor }} />
                  <div className="flex gap-1">
                    {[0,1,2].map(i => (
                      <div key={i} className="w-1.5 h-1.5 rounded-full opacity-30" style={{ backgroundColor: theme.accentColor }} />
                    ))}
                  </div>
                </div>
                {/* Simulated heading */}
                <div className="absolute top-9 left-3 right-8 space-y-1.5">
                  <div className="h-2 w-20 rounded-full opacity-50" style={{ backgroundColor: theme.accentColor }} />
                  <div className="h-1.5 w-14 rounded-full opacity-25" style={{ backgroundColor: theme.accentColor }} />
                </div>
                {/* Simulated button */}
                <div
                  className="absolute bottom-3 left-3 h-5 w-14 rounded-full opacity-85 flex items-center justify-center"
                  style={{ backgroundColor: theme.accentColor }}
                >
                  <div className="h-1 w-8 rounded-full bg-white opacity-70" />
                </div>
                {/* Accent dot */}
                <div
                  className="absolute bottom-3 right-3 w-7 h-7 rounded-full shadow-sm"
                  style={{ backgroundColor: theme.barColor }}
                />
              </div>

              <h3 className="font-display font-semibold text-lg mb-0.5 text-gray-900">{theme.name}</h3>
              <p className="text-sm text-gray-500">{theme.desc}</p>

              {/* Active color flash on corner */}
              <div
                className="absolute top-0 right-0 w-10 h-10 rounded-bl-2xl rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{ backgroundColor: theme.accentColor + '22' }}
              />
            </div>
          ))}
        </div>

        <p className="text-center text-gray-400 mt-10 text-sm">
          You can change this anytime from the settings menu
        </p>
      </div>
    </div>
  )
}
