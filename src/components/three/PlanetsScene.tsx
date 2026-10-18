import { Canvas, useFrame } from '@react-three/fiber'
import { Html, Sparkles } from '@react-three/drei'
import { useRef, useState, type MutableRefObject } from 'react'
import * as THREE from 'three'
import type { LearningStage } from '@/data/stages'
import { C, Ring } from './primitives'
import type { SceneProps } from './Scene3D'

interface PlanetProps {
  stage: LearningStage
  index: number
  count: number
  active: boolean
  reduced: boolean
  scrollRef: MutableRefObject<number>
  onSelect: () => void
}

function Planet({ stage, index, count, active, reduced, scrollRef, onSelect }: PlanetProps) {
  const group = useRef<THREE.Group>(null)
  const mesh = useRef<THREE.Mesh>(null)
  const mat = useRef<THREE.MeshStandardMaterial>(null)
  const [hover, setHover] = useState(false)
  const radius = 2.1 + index * 0.75
  const base = (index / count) * Math.PI * 2
  const speed = 0.16 - index * 0.018

  useFrame(({ clock }, dt) => {
    const t = (reduced ? 0 : clock.elapsedTime) * speed + base + scrollRef.current * Math.PI * 0.9
    group.current?.position.set(Math.cos(t) * radius, Math.sin(t * 0.9) * 0.25, Math.sin(t) * radius * 0.55)
    if (mesh.current) {
      const target = active ? 1.55 : hover ? 1.2 : 1
      const k = 1 - Math.exp(-dt * 6)
      mesh.current.scale.setScalar(THREE.MathUtils.lerp(mesh.current.scale.x, target, k))
      mesh.current.rotation.y += dt * 0.4
    }
    if (mat.current) mat.current.emissiveIntensity = THREE.MathUtils.lerp(mat.current.emissiveIntensity, active ? 0.75 : 0.15, 0.08)
  })

  return (
    <group ref={group}>
      <mesh
        ref={mesh}
        onClick={(e) => { e.stopPropagation(); onSelect() }}
        onPointerOver={(e) => { e.stopPropagation(); setHover(true); document.body.style.cursor = 'pointer' }}
        onPointerOut={() => { setHover(false); document.body.style.cursor = '' }}
      >
        <icosahedronGeometry args={[0.36 + (index % 2) * 0.06, 3]} />
        <meshStandardMaterial ref={mat} color={stage.color} emissive={stage.color} emissiveIntensity={0.15} roughness={0.45} flatShading={index % 2 === 1} />
      </mesh>
      {index % 2 === 0 && <Ring radius={0.62} color={stage.accent} opacity={0.7} thickness={0.02} rotation={[1.3, 0.3, 0]} />}
      {active && <Ring radius={0.85} color={C.plum} opacity={0.9} thickness={0.012} rotation={[Math.PI / 2, 0, 0]} />}
      <Html center position={[0, -0.85, 0]} style={{ pointerEvents: 'none' }} aria-hidden="true">
        <span className={`whitespace-nowrap rounded-full px-2.5 py-1 font-display text-[11px] font-semibold transition ${active ? 'bg-violet text-white' : 'bg-white/85 text-plum'}`}>{stage.short}</span>
      </Html>
    </group>
  )
}

function Core({ reduced }: { reduced: boolean }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((_, dt) => { if (ref.current && !reduced) ref.current.rotation.y += dt * 0.2 })
  return (
    <group>
      <mesh ref={ref}>
        <icosahedronGeometry args={[0.75, 1]} />
        <meshStandardMaterial color="#8B6CF0" emissive="#8B6CF0" emissiveIntensity={0.3} flatShading roughness={0.3} />
      </mesh>
      <mesh scale={1.45}>
        <sphereGeometry args={[0.75, 24, 24]} />
        <meshBasicMaterial color="#8B6CF0" transparent opacity={0.1} />
      </mesh>
    </group>
  )
}

export default function PlanetsScene({
  active, lite, reduced, stages, activeIndex, onSelect, scrollRef,
}: SceneProps & { stages: LearningStage[]; activeIndex: number; onSelect: (i: number) => void; scrollRef: MutableRefObject<number> }) {
  return (
    <Canvas
      frameloop={active ? 'always' : 'never'}
      dpr={lite ? [1, 1.25] : [1, 1.75]}
      camera={{ position: [0, 5.4, 12.8], fov: 45 }}
      onCreated={({ camera }) => camera.lookAt(0, -0.3, 0)}
      gl={{ antialias: !lite, alpha: true }}
      aria-hidden="true"
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 0]} intensity={18} distance={12} color={C.lavender} />
      <directionalLight position={[5, 6, 4]} intensity={1.1} />
      <group rotation={[0.12, 0, 0]}>
        <Core reduced={reduced} />
        {stages.map((s, i) => (
          <group key={s.id}>
            <mesh rotation={[Math.PI / 2, 0, 0]} scale={[1, 0.55, 1]}>
              <torusGeometry args={[2.1 + i * 0.75, 0.006, 4, 128]} />
              <meshBasicMaterial color={i === activeIndex ? C.emerald : '#9C7CF7'} transparent opacity={i === activeIndex ? 0.9 : 0.35} />
            </mesh>
            <Planet stage={s} index={i} count={stages.length} active={i === activeIndex} reduced={reduced} scrollRef={scrollRef} onSelect={() => onSelect(i)} />
          </group>
        ))}
      </group>
      {!reduced && !lite && <Sparkles count={40} scale={[12, 6, 8]} size={1.6} speed={0.2} color="#9C7CF7" opacity={0.6} />}
    </Canvas>
  )
}
