import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Html, Instance, Instances, OrbitControls } from '@react-three/drei'
import { useMemo, useRef, type MutableRefObject } from 'react'
import * as THREE from 'three'
import { campusHotspots, campusStages } from '@/data/campus'
import { C, Tree } from './primitives'
import type { SceneProps } from './Scene3D'

/* ------------------------------------------------------------------
   Stylised miniature campus built from modular architectural shapes.
------------------------------------------------------------------- */

function Box({ p, s, color, ...rest }: { p: [number, number, number]; s: [number, number, number]; color: string; roughness?: number }) {
  return (
    <mesh position={p}>
      <boxGeometry args={s} />
      <meshStandardMaterial color={color} roughness={rest.roughness ?? 0.75} />
    </mesh>
  )
}

/** Rows of glowing windows on a facade, rendered as instances (one draw call). */
function WindowGrid({ origin, cols, rows, dx, dy, facing = 'z' }: { origin: [number, number, number]; cols: number; rows: number; dx: number; dy: number; facing?: 'z' | 'x' }) {
  const items = useMemo(() => {
    const out: [number, number, number][] = []
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      out.push(facing === 'z' ? [origin[0] + c * dx, origin[1] + r * dy, origin[2]] : [origin[0], origin[1] + r * dy, origin[2] + c * dx])
    }
    return out
  }, [origin, cols, rows, dx, dy, facing])
  return (
    <Instances limit={items.length}>
      <planeGeometry args={[0.32, 0.36]} />
      <meshStandardMaterial color={C.window} emissive={C.peach} emissiveIntensity={0.45} side={THREE.DoubleSide} />
      {items.map((pos, i) => <Instance key={i} position={pos} rotation={facing === 'x' ? [0, Math.PI / 2, 0] : [0, 0, 0]} />)}
    </Instances>
  )
}

function AcademicBlock() {
  return (
    <group position={[-3, 0, 0]}>
      <Box p={[0, 1.2, 0]} s={[5, 2.4, 2.2]} color={C.cream} />
      <Box p={[0, 2.46, 0]} s={[5.2, 0.12, 2.4]} color={C.lavender} />
      <Box p={[-1.8, 1.2, 2.3]} s={[1.4, 2.4, 2.6]} color={C.cream} />
      <Box p={[-1.8, 2.46, 2.3]} s={[1.6, 0.12, 2.8]} color={C.lavender} />
      <Box p={[0.8, 0.45, 1.15]} s={[1, 0.9, 0.1]} color={C.emerald} />
      <WindowGrid origin={[-2.1, 0.7, 1.11]} cols={9} rows={3} dx={0.5} dy={0.6} />
      <WindowGrid origin={[-1.05, 0.7, 1.4]} cols={3} rows={3} dx={0.5} dy={0.6} facing="x" />
    </group>
  )
}

function Library() {
  return (
    <group position={[3, 0, -1.2]}>
      <Box p={[0, 1, 0]} s={[2.8, 2, 2.1]} color={C.peach} />
      <mesh position={[0, 2.2, 0]}>
        <cylinderGeometry args={[1.6, 1.6, 0.4, 3, 1]} />
        <meshStandardMaterial color={C.plum2} flatShading />
      </mesh>
      {[-1.1, -0.55, 0, 0.55, 1.1].map((x) => (
        <mesh key={x} position={[x, 0.9, 1.25]}>
          <cylinderGeometry args={[0.09, 0.09, 1.8, 10]} />
          <meshStandardMaterial color={C.cream} />
        </mesh>
      ))}
      <Box p={[0, 0.05, 1.4]} s={[3, 0.1, 0.8]} color={C.cream} />
    </group>
  )
}

function ScienceLabs() {
  return (
    <group position={[5.6, 0, -3.4]}>
      <Box p={[0, 0.9, 0]} s={[2.4, 1.8, 2]} color={C.sage} />
      <Box p={[0, 1.86, 0]} s={[2.6, 0.12, 2.2]} color={C.emerald} />
      {[-0.6, 0.6].map((x) => (
        <mesh key={x} position={[x, 2.1, 0]}>
          <sphereGeometry args={[0.32, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color={C.lavender} metalness={0.3} roughness={0.3} />
        </mesh>
      ))}
      <WindowGrid origin={[-0.75, 0.6, 1.01]} cols={4} rows={2} dx={0.5} dy={0.6} />
    </group>
  )
}

function SportsGround() {
  return (
    <group position={[-1, 0, -6.6]}>
      <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[1.7, 1, 1]}>
        <ringGeometry args={[2.1, 2.6, 48]} />
        <meshStandardMaterial color={C.peach} />
      </mesh>
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[1.7, 1, 1]}>
        <circleGeometry args={[2.1, 48]} />
        <meshStandardMaterial color={C.grassDark} />
      </mesh>
      {[-2.9, 2.9].map((x) => (
        <group key={x} position={[x, 0, 0]}>
          <Box p={[0, 0.35, -0.5]} s={[0.05, 0.7, 0.05]} color={C.cream} />
          <Box p={[0, 0.35, 0.5]} s={[0.05, 0.7, 0.05]} color={C.cream} />
          <Box p={[0, 0.7, 0]} s={[0.05, 0.05, 1.05]} color={C.cream} />
        </group>
      ))}
      {/* basketball court */}
      <Box p={[5.2, 0.03, 0.2]} s={[2.2, 0.04, 3]} color={C.lavender} />
    </group>
  )
}

function Studios() {
  return (
    <group position={[5.5, 0, 3.4]}>
      {[0, 1.3].map((z, i) => (
        <group key={z} position={[0, 0, z - 0.6]}>
          <Box p={[0, 0.7, 0]} s={[2.6, 1.4, 1.1]} color={i ? C.lavender : C.peach} />
          <mesh position={[0, 1.6, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.35, 0.35, 2.6, 3]} />
            <meshStandardMaterial color={C.plum2} flatShading />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function Auditorium() {
  return (
    <group position={[-6.6, 0, -3.6]}>
      <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[1.8, 1.8, 2.4, 32, 1, false, 0, Math.PI]} />
        <meshStandardMaterial color={C.plum2} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0.9, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.8, 1.8, 2.4, 32, 1, false, -Math.PI / 2, Math.PI]} />
        <meshStandardMaterial color={C.plum2} roughness={0.5} />
      </mesh>
      <Box p={[0, 0.45, 1.25]} s={[1.6, 0.9, 0.1]} color={C.emerald} />
    </group>
  )
}

function Cafeteria() {
  return (
    <group position={[-6, 0, 4]}>
      <Box p={[0, 0.6, 0]} s={[2.4, 1.2, 1.8]} color={C.cream} />
      <mesh position={[0, 0.6, 0.92]}>
        <boxGeometry args={[2, 0.8, 0.04]} />
        <meshStandardMaterial color={C.lavender} transparent opacity={0.6} metalness={0.2} roughness={0.1} />
      </mesh>
      <Box p={[0, 1.26, 0.2]} s={[2.8, 0.1, 2.4]} color={C.peach} />
    </group>
  )
}

function Gardens({ lite }: { lite: boolean }) {
  const trees: [number, number, number][] = [[-1.5, 0, 5.2], [3.4, 0, 6], [-0.4, 0, 7], [2.2, 0, 4.6], [-3, 0, 6.6], [4.4, 0, 5.4], [-8.2, 0, 1], [-8, 0, -6], [8, 0, 0.6], [7.6, 0, -6.4], [0.8, 0, -3.2], [-5, 0, 7.2]]
  return (
    <group>
      <mesh position={[1, 0.03, 5.6]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.9, 32]} />
        <meshStandardMaterial color="#9EC9F0" metalness={0.2} roughness={0.15} />
      </mesh>
      {/* outdoor amphitheatre */}
      {[1.3, 1.65, 2].map((r, i) => (
        <mesh key={r} position={[1, 0.08 + i * 0.08, 5.6]} rotation={[-Math.PI / 2, 0, Math.PI * 0.15]}>
          <ringGeometry args={[r, r + 0.25, 32, 1, 0, Math.PI * 0.7]} />
          <meshStandardMaterial color={C.cream} side={THREE.DoubleSide} />
        </mesh>
      ))}
      {(lite ? trees.slice(0, 7) : trees).map((p, i) => <Tree key={i} position={p} scale={1.4 + (i % 3) * 0.2} color={i % 2 ? C.emerald : C.grassDark} />)}
    </group>
  )
}

function Ground() {
  return (
    <group>
      <mesh position={[0, -0.25, 0]}>
        <cylinderGeometry args={[11, 11.4, 0.5, 64]} />
        <meshStandardMaterial color={C.grass} roughness={1} />
      </mesh>
      <mesh position={[0, -1.2, 0]}>
        <cylinderGeometry args={[11.4, 9, 1.4, 64]} />
        <meshStandardMaterial color={C.rock} roughness={1} />
      </mesh>
      {/* pathways */}
      <Box p={[0, 0.01, 2.2]} s={[18, 0.02, 0.6]} color={C.cream} />
      <Box p={[0.3, 0.01, 0]} s={[0.6, 0.02, 16]} color={C.cream} />
      <mesh position={[0.3, 0.02, 2.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.1, 1.5, 40]} />
        <meshStandardMaterial color={C.cream} />
      </mesh>
    </group>
  )
}

function Hotspot({ position, label, onSelect, selected }: { position: [number, number, number]; label: string; onSelect: () => void; selected: boolean }) {
  return (
    <Html position={position} center zIndexRange={[20, 0]} style={{ pointerEvents: 'auto' }}>
      <button
        onClick={onSelect}
        className={`group flex items-center gap-2 whitespace-nowrap rounded-full py-1.5 pl-1.5 pr-3 text-xs font-semibold shadow-lg transition ${selected ? 'bg-emerald text-plum' : 'bg-white text-plum ring-1 ring-plum/10 hover:bg-emerald'}`}
        aria-label={`Open details: ${label}`}
      >
        <span className="relative grid size-5 place-items-center">
          <span className="absolute inset-0 animate-ping rounded-full bg-emerald/60" />
          <span className="relative size-2.5 rounded-full bg-emerald ring-2 ring-cream" />
        </span>
        {label}
      </button>
    </Html>
  )
}

/** Smoothly interpolates the camera between story stages based on scroll progress. */
function StoryCamera({ progressRef }: { progressRef: MutableRefObject<number> }) {
  const { camera } = useThree()
  const tmpPos = useRef(new THREE.Vector3(...campusStages[0].camera))
  const look = useRef(new THREE.Vector3(...campusStages[0].target))
  const tmpLook = useRef(new THREE.Vector3())
  const a = useRef(new THREE.Vector3())
  const b = useRef(new THREE.Vector3())

  useFrame((_, dt) => {
    const n = campusStages.length - 1
    const f = THREE.MathUtils.clamp(progressRef.current, 0, 1) * n
    const i = Math.min(Math.floor(f), n - 1)
    const t = THREE.MathUtils.smootherstep(f - i, 0, 1)
    a.current.set(...campusStages[i].camera)
    b.current.set(...campusStages[i + 1].camera)
    tmpPos.current.lerpVectors(a.current, b.current, t)
    a.current.set(...campusStages[i].target)
    b.current.set(...campusStages[i + 1].target)
    tmpLook.current.lerpVectors(a.current, b.current, t)
    const k = 1 - Math.exp(-dt * 3.5)
    camera.position.lerp(tmpPos.current, k)
    look.current.lerp(tmpLook.current, k)
    camera.lookAt(look.current)
  })
  return null
}

export default function CampusExplorerScene({
  active, lite, reduced, progressRef, mode, selected, onSelect,
}: SceneProps & { progressRef: MutableRefObject<number>; mode: 'story' | 'free'; selected: string | null; onSelect: (facilityId: string) => void }) {
  return (
    <Canvas
      frameloop={active ? 'always' : 'never'}
      dpr={lite ? [1, 1.25] : [1, 1.75]}
      camera={{ position: campusStages[0].camera, fov: 42, near: 0.1, far: 120 }}
      gl={{ antialias: !lite, alpha: true, powerPreference: 'high-performance' }}
    >
      <fog attach="fog" args={['#E6F3FF', 30, 64]} />
      <ambientLight intensity={0.6} />
      <hemisphereLight args={['#FFFFFF', '#BFE3CF', 0.9]} />
      <directionalLight position={[10, 16, 8]} intensity={1.7} color="#FFE7D8" />
      {mode === 'story' ? <StoryCamera progressRef={progressRef} /> : <OrbitControls enablePan={false} enableZoom minDistance={10} maxDistance={34} maxPolarAngle={Math.PI / 2.3} autoRotate={!reduced} autoRotateSpeed={0.4} />}
      <group>
        <Ground />
        <AcademicBlock />
        <Library />
        <ScienceLabs />
        <SportsGround />
        <Studios />
        <Auditorium />
        <Cafeteria />
        <Gardens lite={lite} />
        {campusHotspots.map((h) => (
          <Hotspot key={h.id} position={h.position} label={h.label} selected={selected === h.facilityId} onSelect={() => onSelect(h.facilityId)} />
        ))}
      </group>
    </Canvas>
  )
}
