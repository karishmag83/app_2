import { useRef } from 'react'

interface ThemeSelectorProps {
  onSelect: (theme: string) => void
}

const themes = [
  { 
    id: 'blush', 
    name: 'Soft Blush', 
    bgColor: '#fff5f7', 
    accentColor: '#fda4af',
    desc: 'Gentle pink warmth' 
  },
  { 
    id: 'rose', 
    name: 'Rose Pink', 
    bgColor: '#fff1f2', 
    accentColor: '#fb7185',
    desc: 'Vibrant & fresh' 
  },
  { 
    id: 'periwinkle', 
    name: 'Periwinkle', 
    bgColor: '#f5f7ff', 
    accentColor: '#a5b4fc',
    desc: 'Soft lavender blue' 
  },
  { 
    id: 'sky', 
    name: 'Soft Sky', 
    bgColor: '#f0f9ff', 
    accentColor: '#7dd3fc',
    desc: 'Light & airy' 
  },
  { 
    id: 'silver', 
    name: 'Silver Gray', 
    bgColor: '#f8fafc', 
    accentColor: '#cbd5e1',
    desc: 'Elegant neutral' 
  },
  { 
    id: 'slate', 
    name: 'Cool Slate', 
    bgColor: '#f1f5f9', 
    accentColor: '#94a3b8',
    desc: 'Modern & calm' 
  },
]

export default function ThemeSelector({ onSelect }: ThemeSelectorProps) {
  const cardsRef = useRef<HTMLDivElement[]>([])

  return (
    <div 
      className="theme-selector fixed inset-0 z-[100] flex items-center justify-center bg-gray-50 overflow-y-auto py-8"
    >
      <div className="w-full max-w-5xl px-6 my-auto">
        <h2 className="theme-title text-center text-3xl md:text-4xl font-display font-semibold mb-3">
          Choose Your Experience
        </h2>
        <p className="theme-title text-center text-gray-600 mb-12 text-lg">
          Select a color theme that resonates with you
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {themes.map((theme, index) => (
            <div
              key={theme.id}
              ref={el => { if (el) cardsRef.current[index] = el }}
              onClick={() => onSelect(theme.id)}
              className="group relative bg-white rounded-2xl p-5 shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-2 border-2 border-gray-100 hover:border-gray-300 cursor-pointer overflow-hidden"
            >
              {/* Color Preview */}
              <div 
                className="w-full aspect-[4/3] rounded-xl mb-4 relative overflow-hidden ring-1 ring-black/10 shadow-inner"
                style={{ backgroundColor: theme.bgColor }}
              >
                {/* Accent color indicator */}
                <div 
                  className="absolute bottom-3 right-3 w-8 h-8 rounded-full shadow-md"
                  style={{ backgroundColor: theme.accentColor }}
                />
                {/* Sample UI elements */}
                <div className="absolute top-3 left-3 right-12 space-y-2">
                  <div 
                    className="h-2 w-16 rounded-full opacity-30"
                    style={{ backgroundColor: theme.accentColor }}
                  />
                  <div 
                    className="h-2 w-12 rounded-full opacity-20"
                    style={{ backgroundColor: theme.accentColor }}
                  />
                </div>
              </div>
              
              <h3 className="font-display font-semibold text-lg mb-1">{theme.name}</h3>
              <p className="text-sm text-gray-500">{theme.desc}</p>
              
              {/* Hover indicator */}
              <div className="absolute inset-0 rounded-2xl border-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{ borderColor: theme.accentColor }}
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
