import { useEffect, useState } from 'react'

export function useMediaQuery(query: string, initial = false) {
  const [matches, setMatches] = useState(() => (typeof window === 'undefined' ? initial : window.matchMedia(query).matches))
  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = () => setMatches(mql.matches)
    onChange()
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])
  return matches
}

export const usePrefersReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)')
/** Desktop-class layout: wide screen with a fine pointer (mouse / trackpad). */
export const useIsDesktop = () => useMediaQuery('(min-width: 1024px)')
export const useFinePointer = () => useMediaQuery('(hover: hover) and (pointer: fine)')

let webglCache: boolean | null = null
export function hasWebGL() {
  if (webglCache !== null) return webglCache
  try {
    const canvas = document.createElement('canvas')
    webglCache = !!(window.WebGLRenderingContext && (canvas.getContext('webgl2') || canvas.getContext('webgl')))
  } catch {
    webglCache = false
  }
  return webglCache
}

/** Rough capability check: small screens / low core counts get the light 3D tier. */
export function isLowPowerDevice() {
  if (typeof navigator === 'undefined') return false
  const cores = navigator.hardwareConcurrency || 4
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4
  return cores <= 4 || mem <= 2 || window.innerWidth < 768
}

/** Run once the element is near the viewport; then keep reporting visibility. */
export function useNearViewport<T extends Element>(ref: React.RefObject<T | null>, rootMargin = '300px') {
  const [state, setState] = useState({ near: false, visible: false })
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => setState((s) => ({ near: s.near || entry.isIntersecting, visible: entry.isIntersecting })),
      { rootMargin },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [ref, rootMargin])
  return state
}
