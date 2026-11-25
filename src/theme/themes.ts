/**
 * Portfolio theme system.
 *
 * Every theme ships a hand-tuned light AND dark palette (no generic dark mode),
 * so the accent, surfaces and neutrals stay in the same family in both
 * appearances. All text/background pairs meet WCAG 2.2 AA (≥ 4.5:1).
 */

export type ThemeId = 'graphite' | 'sapphire' | 'evergreen' | 'sandstone' | 'amethyst' | 'bordeaux'

export interface ThemeTokens {
  bg: string        // page background
  surface: string   // cards, panels
  surface2: string  // subtle fills, inputs, chips
  text: string      // primary text
  muted: string     // secondary text
  subtle: string    // tertiary text, meta
  border: string    // hairlines
  accent: string    // brand / interactive color
  onAccent: string  // text on top of accent
}

export interface Theme {
  id: ThemeId
  name: string
  tagline: string
  swatch: [string, string] // gradient used for the selector swatch (appearance-independent)
  light: ThemeTokens
  dark: ThemeTokens
}

export const THEMES: Theme[] = [
  {
    id: 'graphite',
    name: 'Graphite',
    tagline: 'Monochrome, editorial, timeless',
    swatch: ['#6b6b70', '#1d1d1f'],
    light: {
      bg: '#f5f5f7', surface: '#ffffff', surface2: '#efeff2',
      text: '#1d1d1f', muted: '#48484c', subtle: '#6e6e73',
      border: 'rgba(29,29,31,0.09)', accent: '#1d1d1f', onAccent: '#ffffff',
    },
    dark: {
      bg: '#000000', surface: '#161617', surface2: '#1d1d1f',
      text: '#f5f5f7', muted: '#b8b8bd', subtle: '#8e8e93',
      border: 'rgba(255,255,255,0.10)', accent: '#f5f5f7', onAccent: '#1d1d1f',
    },
  },
  {
    id: 'sapphire',
    name: 'Sapphire',
    tagline: 'Deep blue, crisp and precise',
    swatch: ['#4b92f5', '#0a47a8'],
    light: {
      bg: '#f5f8fc', surface: '#ffffff', surface2: '#edf2f9',
      text: '#0b1526', muted: '#3f4a5c', subtle: '#5f6b7e',
      border: 'rgba(11,21,38,0.09)', accent: '#0b5bd3', onAccent: '#ffffff',
    },
    dark: {
      bg: '#03060c', surface: '#0b111b', surface2: '#121a26',
      text: '#eaf1fb', muted: '#aab6c9', subtle: '#7f8ca1',
      border: 'rgba(160,190,240,0.12)', accent: '#5ea2ff', onAccent: '#03101f',
    },
  },
  {
    id: 'evergreen',
    name: 'Evergreen',
    tagline: 'Calm, grounded, assured',
    swatch: ['#4a9a74', '#134a32'],
    light: {
      bg: '#f4f6f2', surface: '#ffffff', surface2: '#ebf0e8',
      text: '#0f1a14', muted: '#3f4d44', subtle: '#5d6b62',
      border: 'rgba(15,26,20,0.09)', accent: '#1d6a48', onAccent: '#ffffff',
    },
    dark: {
      bg: '#040806', surface: '#0b130e', surface2: '#121c16',
      text: '#e8f2eb', muted: '#a6b8ac', subtle: '#7c9083',
      border: 'rgba(170,220,190,0.11)', accent: '#6cc59a', onAccent: '#04140c',
    },
  },
  {
    id: 'sandstone',
    name: 'Sandstone',
    tagline: 'Warm metal, quiet luxury',
    swatch: ['#dcb08a', '#87552f'],
    light: {
      bg: '#f7f3ee', surface: '#fffdfa', surface2: '#f1ebe3',
      text: '#1f1a14', muted: '#4d443a', subtle: '#6e6356',
      border: 'rgba(31,26,20,0.09)', accent: '#87552f', onAccent: '#ffffff',
    },
    dark: {
      bg: '#0a0806', surface: '#14100c', surface2: '#1c1712',
      text: '#f4ede4', muted: '#c0b3a4', subtle: '#93877a',
      border: 'rgba(240,210,170,0.11)', accent: '#dcab7a', onAccent: '#1a1008',
    },
  },
  {
    id: 'amethyst',
    name: 'Amethyst',
    tagline: 'Rich violet, creative and refined',
    swatch: ['#9a80f5', '#4628a8'],
    light: {
      bg: '#f7f5fb', surface: '#ffffff', surface2: '#efebf7',
      text: '#17122a', muted: '#463f5c', subtle: '#675f7f',
      border: 'rgba(23,18,42,0.09)', accent: '#5b3cc4', onAccent: '#ffffff',
    },
    dark: {
      bg: '#06050b', surface: '#0f0d18', surface2: '#171424',
      text: '#efebfa', muted: '#b3acca', subtle: '#8a83a6',
      border: 'rgba(200,180,255,0.12)', accent: '#a68cff', onAccent: '#120a2e',
    },
  },
  {
    id: 'bordeaux',
    name: 'Bordeaux',
    tagline: 'Deep wine, bold and editorial',
    swatch: ['#d0587a', '#7a1430'],
    light: {
      bg: '#faf6f5', surface: '#ffffff', surface2: '#f4ebea',
      text: '#1f0f13', muted: '#523d42', subtle: '#75616a',
      border: 'rgba(31,15,19,0.09)', accent: '#9b1d3d', onAccent: '#ffffff',
    },
    dark: {
      bg: '#0a0506', surface: '#150c0e', surface2: '#1e1316',
      text: '#f8ecee', muted: '#c8b0b6', subtle: '#9a8288',
      border: 'rgba(255,190,200,0.11)', accent: '#f2879f', onAccent: '#2a0811',
    },
  },
]

export const DEFAULT_THEME: ThemeId = 'graphite'

const THEME_KEY = 'portfolio-theme'
const DARK_KEY = 'portfolio-dark-mode'

/** Visitors who picked one of the old themes land on its closest new sibling. */
const LEGACY_THEME_MAP: Record<string, ThemeId> = {
  blush: 'bordeaux',
  crimson: 'bordeaux',
  indigo: 'amethyst',
  sky: 'sapphire',
  peach: 'sandstone',
  graphite: 'graphite',
}

export function getTheme(id: ThemeId): Theme {
  return THEMES.find(t => t.id === id) ?? THEMES[0]
}

export function getTokens(id: ThemeId, dark: boolean): ThemeTokens {
  const theme = getTheme(id)
  return dark ? theme.dark : theme.light
}

function isThemeId(value: string | null): value is ThemeId {
  return !!value && THEMES.some(t => t.id === value)
}

function safeGet(key: string): string | null {
  try { return localStorage.getItem(key) } catch { return null }
}

function safeSet(key: string, value: string) {
  try { localStorage.setItem(key, value) } catch { /* storage unavailable */ }
}

export function loadPrefs(): { themeId: ThemeId; dark: boolean; hasSavedDark: boolean } {
  const rawTheme = safeGet(THEME_KEY)
  const themeId = isThemeId(rawTheme) ? rawTheme : (rawTheme && LEGACY_THEME_MAP[rawTheme]) || DEFAULT_THEME
  const rawDark = safeGet(DARK_KEY)
  return { themeId, dark: rawDark === 'true', hasSavedDark: rawDark !== null }
}

export function savePrefs(themeId: ThemeId, dark: boolean) {
  safeSet(THEME_KEY, themeId)
  safeSet(DARK_KEY, String(dark))
}

export function systemPrefersDark(): boolean {
  return typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches
}

/** Writes the palette to CSS custom properties consumed across the portfolio. */
export function applyTheme(id: ThemeId, dark: boolean) {
  const t = getTokens(id, dark)
  const root = document.documentElement
  const vars: Record<string, string> = {
    '--bg-color': t.bg,
    '--surface-color': t.surface,
    '--surface-2': t.surface2,
    '--text-color': t.text,
    '--muted-color': t.muted,
    '--subtle-color': t.subtle,
    '--border-color': t.border,
    '--primary-color': t.accent,
    '--on-primary': t.onAccent,
  }
  for (const [k, v] of Object.entries(vars)) root.style.setProperty(k, v)

  root.setAttribute('data-theme', id)
  if (dark) root.setAttribute('data-dark', 'true')
  else root.removeAttribute('data-dark')
  root.style.colorScheme = dark ? 'dark' : 'light'

  document.body.style.backgroundColor = t.bg
  document.body.style.color = t.text

  let meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')
  if (!meta) {
    meta = document.createElement('meta')
    meta.name = 'theme-color'
    document.head.appendChild(meta)
  }
  meta.content = t.bg
}

export interface Origin { x: number; y: number }

type ViewTransitionDoc = Document & {
  startViewTransition?: (cb: () => void) => { ready: Promise<void>; finished: Promise<void> }
}

const EASE = 'cubic-bezier(0.76, 0, 0.24, 1)'
const DURATION = 1100

/**
 * Runs a theme change as a circular "color wave" that blooms out from `origin`
 * (the swatch, button or toggle the visitor touched), with a soft glow riding
 * the wavefront while the previous view gently recedes.
 *
 * Falls back to a smooth color cross-fade where View Transitions aren't
 * supported, and to the cross-fade alone for prefers-reduced-motion.
 */
export function runThemeTransition(update: () => void, origin?: Origin, waveColor?: string) {
  const doc = document as ViewTransitionDoc
  const root = document.documentElement
  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

  if (!doc.startViewTransition || reduceMotion) {
    root.classList.add('theme-animating')
    update()
    window.setTimeout(() => root.classList.remove('theme-animating'), 650)
    return
  }

  const x = origin?.x ?? window.innerWidth / 2
  const y = origin?.y ?? window.innerHeight / 2
  const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))

  root.classList.add('theme-vt')
  let wave: HTMLDivElement | null = null

  const transition = doc.startViewTransition(() => {
    update()
    // The wave lives in the *new* view, so it is clipped by the expanding
    // circle and its inner glow tracks the wavefront exactly.
    wave = document.createElement('div')
    wave.className = 'theme-wave'
    wave.setAttribute('aria-hidden', 'true')
    wave.style.left = `${x}px`
    wave.style.top = `${y}px`
    wave.style.width = wave.style.height = `${radius * 2}px`
    if (waveColor) wave.style.setProperty('--wave-color', waveColor)
    document.body.appendChild(wave)
  })

  transition.ready
    .then(() => {
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: DURATION, easing: EASE, pseudoElement: '::view-transition-new(root)' }
      )
      root.animate(
        { filter: ['brightness(1) saturate(1)', 'brightness(0.86) saturate(0.9)'] },
        { duration: DURATION, easing: EASE, pseudoElement: '::view-transition-old(root)' }
      )
      wave?.animate(
        [
          { transform: 'translate(-50%, -50%) scale(0)', opacity: 1 },
          // scale must stay linear in progress so the glow stays glued to the clip edge
          { transform: 'translate(-50%, -50%) scale(0.7)', opacity: 0.85, offset: 0.7 },
          { transform: 'translate(-50%, -50%) scale(1)', opacity: 0 },
        ],
        { duration: DURATION, easing: EASE, fill: 'forwards' }
      )
    })
    .catch(() => { /* transition skipped */ })

  transition.finished.finally(() => {
    root.classList.remove('theme-vt')
    wave?.remove()
  })
}
