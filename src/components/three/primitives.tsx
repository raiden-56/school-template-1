import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

export const C = {
  plum: '#21172F',
  plum2: '#8466EC',
  emerald: '#20B486',
  forest: '#174C3C',
  lavender: '#D9CBFF',
  peach: '#FFB99E',
  cream: '#FFF8EE',
  sage: '#DCECE1',
  grass: '#6CCB9F',
  grassDark: '#3FA77B',
  rock: '#A48FE0',
  window: '#FFE7B8',
}

export function Tree({ position, scale = 1, color = C.grassDark }: { position: [number, number, number]; scale?: number; color?: string }) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[0.06, 0.09, 0.5, 6]} />
        <meshStandardMaterial color="#7A5A4A" flatShading />
      </mesh>
      <mesh position={[0, 0.75, 0]}>
        <icosahedronGeometry args={[0.38, 0]} />
        <meshStandardMaterial color={color} flatShading />
      </mesh>
    </group>
  )
}

export function Book({ color, position, rotation = [0, 0, 0], scale = 1 }: { color: string; position: [number, number, number]; rotation?: [number, number, number]; scale?: number }) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh>
        <boxGeometry args={[0.7, 0.14, 0.5]} />
        <meshStandardMaterial color={color} roughness={0.6} />
      </mesh>
      <mesh position={[0.02, 0, 0]}>
        <boxGeometry args={[0.68, 0.1, 0.46]} />
        <meshStandardMaterial color={C.cream} />
      </mesh>
    </group>
  )
}

/** Low-poly paper airplane geometry (two wings + keel). */
export function usePlaneGeometry() {
  return useMemo(() => {
    const g = new THREE.BufferGeometry()
    const v = new Float32Array([
      0, 0, 0.6, -0.35, 0.02, -0.3, 0, 0.0, -0.2,
      0, 0, 0.6, 0, 0.0, -0.2, 0.35, 0.02, -0.3,
      0, 0, 0.6, 0, 0.0, -0.2, 0, -0.12, -0.25,
    ])
    g.setAttribute('position', new THREE.BufferAttribute(v, 3))
    g.computeVertexNormals()
    return g
  }, [])
}

export function PaperPlane({ radius, height, speed, offset, reduced }: { radius: number; height: number; speed: number; offset: number; reduced: boolean }) {
  const ref = useRef<THREE.Mesh>(null)
  const geo = usePlaneGeometry()
  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = (reduced ? 0 : clock.elapsedTime) * speed + offset
    ref.current.position.set(Math.cos(t) * radius, height + Math.sin(t * 2) * 0.3, Math.sin(t) * radius)
    ref.current.rotation.set(0, -t, Math.sin(t * 2) * 0.2)
  })
  return (
    <mesh ref={ref} geometry={geo}>
      <meshStandardMaterial color={C.cream} side={THREE.DoubleSide} flatShading />
    </mesh>
  )
}

export function Cloud({ position, scale = 1, speed = 0.1, reduced }: { position: [number, number, number]; scale?: number; speed?: number; reduced: boolean }) {
  const ref = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    if (ref.current && !reduced) ref.current.position.x = position[0] + Math.sin(clock.elapsedTime * speed) * 1.2
  })
  return (
    <group ref={ref} position={position} scale={scale}>
      {[[0, 0, 0, 0.6], [0.55, -0.1, 0, 0.45], [-0.55, -0.12, 0.05, 0.42], [0.2, 0.25, 0, 0.42]].map(([x, y, z, r], i) => (
        <mesh key={i} position={[x, y, z]}>
          <sphereGeometry args={[r, 12, 10]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0.85} roughness={1} />
        </mesh>
      ))}
    </group>
  )
}

/** Thin orbital ring */
export function Ring({ radius, color = C.lavender, opacity = 0.6, thickness = 0.015, rotation = [Math.PI / 2, 0, 0] }: { radius: number; color?: string; opacity?: number; thickness?: number; rotation?: [number, number, number] }) {
  return (
    <mesh rotation={rotation}>
      <torusGeometry args={[radius, thickness, 6, 96]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  )
}
