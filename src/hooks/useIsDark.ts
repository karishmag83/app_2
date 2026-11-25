import { useSyncExternalStore } from 'react'

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-dark'] })
  return () => observer.disconnect()
}

const getSnapshot = () => document.documentElement.getAttribute('data-dark') === 'true'

/** True while the portfolio is in dark mode; follows the data-dark attribute on <html> as it changes. */
export function useIsDark() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false)
}
