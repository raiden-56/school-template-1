import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { C, Ring } from './primitives'
import type { SceneProps } from './Scene3D'

function Compass({ reduced }: { reduced: boolean }) {
  const needle = useRef<THREE.Group>(null)
  const dial = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    if (reduced) return
    const t = clock.elapsedTime
    if (needle.current) needle.current.rotation.y = Math.sin(t * 0.7) * 0.6 + Math.sin(t * 2.1) * 0.08
    if (dial.current) dial.current.rotation.y = t * 0.05
  })
  const ticks = useMemo(() => Array.from({ length: 24 }, (_, i) => (i / 24) * Math.PI * 2), [])
  return (
    <group rotation={[0.55, 0, 0]}>
      <group ref={dial}>
        <mesh>
          <cylinderGeometry args={[2, 2.1, 0.25, 64]} />
          <meshStandardMaterial color={C.plum2} metalness={0.4} roughness={0.35} />
        </mesh>
        <mesh position={[0, 0.13, 0]}>
          <cylinderGeometry args={[1.8, 1.8, 0.02, 64]} />
          <meshStandardMaterial color={C.cream} />
        </mesh>
        <mesh position={[0, 0.13, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.02, 0.06, 12, 80]} />
          <meshStandardMaterial color={C.peach} metalness={0.6} roughness={0.25} />
        </mesh>
        {ticks.map((a, i) => (
          <mesh key={i} position={[Math.cos(a) * 1.6, 0.16, Math.sin(a) * 1.6]} rotation={[0, -a, 0]}>
            <boxGeometry args={[i % 6 === 0 ? 0.28 : 0.14, 0.02, 0.03]} />
            <meshStandardMaterial color={i % 6 === 0 ? C.emerald : C.plum2} />
          </mesh>
        ))}
      </group>
      <group ref={needle} position={[0, 0.26, 0]}>
        <mesh position={[0, 0, -0.7]} rotation={[-Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.16, 1.4, 4]} />
          <meshStandardMaterial color={C.emerald} emissive={C.emerald} emissiveIntensity={0.3} flatShading />
        </mesh>
        <mesh position={[0, 0, 0.7]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.16, 1.4, 4]} />
          <meshStandardMaterial color={C.peach} flatShading />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.16, 16, 16]} />
          <meshStandardMaterial color={C.lavender} metalness={0.5} roughness={0.2} />
        </mesh>
      </group>
    </group>
  )
}

/** Floating directional lines orbiting the compass */
function DirectionLines({ reduced }: { reduced: boolean }) {
  const ref = useRef<THREE.Group>(null)
  useFrame((_, dt) => { if (ref.current && !reduced) ref.current.rotation.y += dt * 0.12 })
  return (
    <group ref={ref}>
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const a = (i / 6) * Math.PI * 2
        return (
          <mesh key={i} position={[Math.cos(a) * 3.3, (i % 3) * 0.5 - 0.5, Math.sin(a) * 3.3]} rotation={[0, -a, 0]}>
            <boxGeometry args={[0.02, 0.02, 0.9]} />
            <meshBasicMaterial color={i % 2 ? C.emerald : C.peach} />
          </mesh>
        )
      })}
    </group>
  )
}

function CameraOrbit({ reduced }: { reduced: boolean }) {
  useFrame(({ camera, clock, pointer }) => {
    const t = reduced ? 0 : clock.elapsedTime * 0.12
    camera.position.x = Math.sin(t) * 1.4 + pointer.x * 0.6
    camera.position.y = 2.6 + pointer.y * 0.4
    camera.lookAt(0, 0, 0)
  })
  return null
}

export default function CompassScene({ active, lite, reduced }: SceneProps) {
  return (
    <Canvas frameloop={active && !reduced ? 'always' : 'demand'} dpr={lite ? [1, 1.25] : [1, 1.75]} camera={{ position: [0, 2.6, 7], fov: 40 }} gl={{ antialias: !lite, alpha: true }} aria-hidden="true">
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 6, 4]} intensity={1.5} color="#FFE7D8" />
      <pointLight position={[-3, 1, 2]} intensity={6} color={C.emerald} />
      <CameraOrbit reduced={reduced} />
      <Float speed={reduced ? 0 : 1.4} floatIntensity={reduced ? 0 : 0.8} rotationIntensity={0}>
        <Compass reduced={reduced} />
      </Float>
      <DirectionLines reduced={reduced} />
      <Ring radius={3.3} color={C.lavender} opacity={0.35} />
      <Ring radius={3.9} color={C.lavender} opacity={0.15} rotation={[Math.PI / 2.4, 0.2, 0]} />
    </Canvas>
  )
}
