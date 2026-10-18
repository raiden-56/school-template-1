import { Component, Suspense, useRef, useState, type ReactNode } from 'react'
import { hasWebGL, isLowPowerDevice, useNearViewport, usePrefersReducedMotion } from '@/lib/hooks'
import { cn } from '@/lib/cn'

export interface SceneProps {
  /** true while the canvas is on screen — scenes pause rendering otherwise */
  active: boolean
  /** lighter geometry / effects for phones and low-power devices */
  lite: boolean
  /** user prefers reduced motion: render a still frame */
  reduced: boolean
}

class SceneErrorBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  componentDidCatch(err: unknown) { console.warn('[3D] scene failed, showing fallback', err) }
  render() { return this.state.failed ? this.props.fallback : this.props.children }
}

interface Scene3DProps {
  fallback: ReactNode
  children: (p: SceneProps) => ReactNode
  className?: string
  /** Show the static fallback instead of 3D when reduced motion is requested */
  fallbackOnReducedMotion?: boolean
  /** Force the static fallback (e.g. on mobile where a non-3D alternative is preferred) */
  forceFallback?: boolean
  rootMargin?: string
}

/**
 * Wraps a lazily-loaded React Three Fiber scene:
 *  - mounts only when near the viewport (never blocks the rest of the page)
 *  - pauses rendering when off-screen
 *  - shows the static fallback while loading, without WebGL, or if the scene errors
 */
export function Scene3D({ fallback, children, className, fallbackOnReducedMotion, forceFallback, rootMargin }: Scene3DProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { near, visible } = useNearViewport(ref, rootMargin)
  const reduced = usePrefersReducedMotion()
  const [webgl] = useState(() => hasWebGL())
  const [lite] = useState(() => isLowPowerDevice())
  const useFallback = forceFallback || !webgl || (reduced && fallbackOnReducedMotion)

  return (
    <div ref={ref} className={cn('relative', className)}>
      {useFallback || !near ? (
        fallback
      ) : (
        <SceneErrorBoundary fallback={fallback}>
          <Suspense fallback={fallback}>{children({ active: visible, lite, reduced })}</Suspense>
        </SceneErrorBoundary>
      )}
    </div>
  )
}
