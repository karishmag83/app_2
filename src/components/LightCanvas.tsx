import { useLayoutEffect, type ReactNode } from 'react'
import { applyTheme, loadPrefs } from '../theme/themes'

/**
 * Case studies are designed as light layouts with their own colours. Show them
 * that way, in the visitor's chosen palette, even when the portfolio itself is
 * in dark mode; the portfolio re-applies the visitor's appearance when they
 * return to it. The saved preference is not changed.
 */
export default function LightCanvas({ children }: { children: ReactNode }) {
  useLayoutEffect(() => {
    applyTheme(loadPrefs().themeId, false)
  }, [])
  return children
}
