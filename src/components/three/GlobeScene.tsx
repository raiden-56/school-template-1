import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import { C, Ring } from './primitives'
import type { SceneProps } from './Scene3D'

function Globe({ reduced }: { reduced: boolean }) {
  const ref = useRef<THREE.Group>(null)
  const rings = useRef<THREE.Group>(null)
  const pin = useRef<THREE.Group>(null)
  useFrame(({ clock }, dt) => {
    if (reduced) return
    if (ref.current) ref.current.rotation.y += dt * 0.15
    if (rings.current) rings.current.rotation.z += dt * 0.2
    if (pin.current) pin.current.position.y = 2.25 + Math.sin(clock.elapsedTime * 2) * 0.08
  })
  return (
    <group>
      <group ref={ref}>
        <mesh>
          <sphereGeometry args={[1.7, 48, 48]} />
          <meshStandardMaterial color={C.lavender} roughness={0.6} />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[1.74, 3]} />
          <meshBasicMaterial color={C.plum2} wireframe transparent opacity={0.35} />
        </mesh>
      </group>
      {/* location pin */}
      <group ref={pin} position={[0, 2.25, 0]}>
        <mesh position={[0, 0.35, 0]}>
          <sphereGeometry args={[0.3, 24, 24]} />
          <meshStandardMaterial color={C.emerald} emissive={C.emerald} emissiveIntensity={0.4} />
        </mesh>
        <mesh position={[0, 0, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.24, 0.6, 24]} />
          <meshStandardMaterial color={C.emerald} />
        </mesh>
        <mesh position={[0, 0.35, 0.22]}>
          <sphereGeometry args={[0.11, 16, 16]} />
          <meshStandardMaterial color={C.cream} />
        </mesh>
      </group>
      <group ref={rings} rotation={[1.2, 0.3, 0]}>
        <Ring radius={2.4} color={C.peach} opacity={0.7} thickness={0.02} rotation={[0, 0, 0]} />
        <Ring radius={2.85} color={C.emerald} opacity={0.4} rotation={[0.4, 0.2, 0]} />
      </group>
    </group>
  )
}

export default function GlobeScene({ active, lite, reduced }: SceneProps) {
  return (
    <Canvas frameloop={active && !reduced ? 'always' : 'demand'} dpr={lite ? [1, 1.25] : [1, 1.75]} camera={{ position: [0, 1, 7.5], fov: 40 }}
      onCreated={({ camera }) => camera.lookAt(0, 0.3, 0)} gl={{ antialias: !lite, alpha: true }} aria-hidden="true">
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 5, 5]} intensity={1.4} />
      <pointLight position={[-4, -2, 3]} intensity={5} color={C.peach} />
      <Globe reduced={reduced} />
    </Canvas>
  )
}
