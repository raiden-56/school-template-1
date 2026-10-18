import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Sparkles } from '@react-three/drei'
import { useRef, type MutableRefObject } from 'react'
import * as THREE from 'three'
import { Book, C, Cloud, PaperPlane, Ring, Tree } from './primitives'
import type { SceneProps } from './Scene3D'

/* ------------------------------------------------------------------
   FloatingIsland — the hero centrepiece: a stylised campus on a
   floating rock, with gardens, observatory, books and a glowing planet.
------------------------------------------------------------------- */

function Building() {
  const windows: [number, number, number][] = []
  for (let r = 0; r < 2; r++) for (let c = 0; c < 6; c++) windows.push([-1.05 + c * 0.42, 0.45 + r * 0.45, 0.71])
  return (
    <group position={[-0.4, 0.3, -0.3]}>
      {/* main block */}
      <mesh position={[0, 0.65, 0]}>
        <boxGeometry args={[2.8, 1.3, 1.4]} />
        <meshStandardMaterial color={C.cream} roughness={0.7} />
      </mesh>
      <mesh position={[0, 1.36, 0]}>
        <boxGeometry args={[3, 0.12, 1.6]} />
        <meshStandardMaterial color={C.lavender} />
      </mesh>
      {windows.map((p, i) => (
        <mesh key={i} position={p}>
          <planeGeometry args={[0.26, 0.28]} />
          <meshStandardMaterial color={C.window} emissive={C.peach} emissiveIntensity={0.55} />
        </mesh>
      ))}
      {/* entrance + canopy */}
      <mesh position={[0, 0.3, 0.76]}>
        <boxGeometry args={[0.6, 0.6, 0.12]} />
        <meshStandardMaterial color={C.emerald} />
      </mesh>
      <mesh position={[0, 0.66, 0.95]}>
        <boxGeometry args={[1.1, 0.06, 0.5]} />
        <meshStandardMaterial color={C.plum2} />
      </mesh>
      {/* side wing with clock tower */}
      <mesh position={[1.75, 0.45, 0.25]}>
        <boxGeometry args={[0.9, 0.9, 1]} />
        <meshStandardMaterial color={C.peach} roughness={0.8} />
      </mesh>
      <mesh position={[-1.55, 1.05, -0.2]}>
        <boxGeometry args={[0.45, 2.1, 0.45]} />
        <meshStandardMaterial color={C.cream} />
      </mesh>
      <mesh position={[-1.55, 2.25, -0.2]}>
        <coneGeometry args={[0.38, 0.5, 4]} />
        <meshStandardMaterial color={C.emerald} flatShading />
      </mesh>
      <mesh position={[-1.55, 1.75, 0.03]}>
        <circleGeometry args={[0.13, 20]} />
        <meshStandardMaterial color={C.plum} emissive={C.lavender} emissiveIntensity={0.3} />
      </mesh>
    </group>
  )
}

function Observatory() {
  return (
    <group position={[2.4, 0.3, -1.4]}>
      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.45, 0.5, 0.7, 20]} />
        <meshStandardMaterial color={C.cream} />
      </mesh>
      <mesh position={[0, 0.7, 0]}>
        <sphereGeometry args={[0.47, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={C.lavender} metalness={0.3} roughness={0.35} />
      </mesh>
      <mesh position={[0.18, 1, 0.18]} rotation={[0.5, 0.8, -0.6]}>
        <cylinderGeometry args={[0.05, 0.08, 0.6, 8]} />
        <meshStandardMaterial color={C.plum2} />
      </mesh>
    </group>
  )
}

function Playground() {
  return (
    <group position={[1.9, 0.3, 1.5]} rotation={[0, -0.5, 0]}>
      <mesh position={[0, 0.02, 0]}>
        <cylinderGeometry args={[0.7, 0.7, 0.04, 24]} />
        <meshStandardMaterial color={C.peach} />
      </mesh>
      {[-0.4, 0.4].map((x) => (
        <mesh key={x} position={[x, 0.35, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.7, 6]} />
          <meshStandardMaterial color={C.plum2} />
        </mesh>
      ))}
      <mesh position={[0, 0.7, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.03, 0.03, 0.9, 6]} />
        <meshStandardMaterial color={C.plum2} />
      </mesh>
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[0.25, 0.04, 0.12]} />
        <meshStandardMaterial color={C.emerald} />
      </mesh>
      <mesh position={[0.1, 0.22, 0.45]} rotation={[0.6, 0, 0]}>
        <boxGeometry args={[0.22, 0.04, 0.7]} />
        <meshStandardMaterial color={C.lavender} />
      </mesh>
    </group>
  )
}

function IslandBase({ radius = 4.2, depth = 3.6 }: { radius?: number; depth?: number }) {
  return (
    <group>
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[radius, radius * 0.95, 0.3, 40]} />
        <meshStandardMaterial color={C.grass} roughness={0.9} flatShading />
      </mesh>
      <mesh position={[0, -depth / 2, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[radius * 0.95, depth, 9, 2]} />
        <meshStandardMaterial color={C.rock} roughness={1} flatShading />
      </mesh>
      {/* winding path */}
      <mesh position={[0, 0.31, 0]} rotation={[-Math.PI / 2, 0, 0.6]}>
        <torusGeometry args={[2.9, 0.14, 2, 64, Math.PI * 1.25]} />
        <meshStandardMaterial color={C.cream} />
      </mesh>
      <mesh position={[-0.4, 0.31, 1.6]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.5, 1.6]} />
        <meshStandardMaterial color={C.cream} />
      </mesh>
    </group>
  )
}

function MiniIsland({ position, color = C.grass, reduced }: { position: [number, number, number]; color?: string; reduced: boolean }) {
  return (
    <Float speed={reduced ? 0 : 1.6} floatIntensity={reduced ? 0 : 1.2} rotationIntensity={0.2}>
      <group position={position} scale={0.42}>
        <mesh position={[0, 0.15, 0]}>
          <cylinderGeometry args={[1.4, 1.3, 0.3, 16]} />
          <meshStandardMaterial color={color} flatShading />
        </mesh>
        <mesh position={[0, -0.9, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[1.3, 2, 7]} />
          <meshStandardMaterial color={C.rock} flatShading />
        </mesh>
        <Tree position={[-0.4, 0.3, 0]} scale={1.6} />
        <Tree position={[0.5, 0.3, 0.3]} scale={1.2} color={C.emerald} />
        <mesh position={[0.4, 0.38, -0.5]}>
          <sphereGeometry args={[0.2, 10, 8]} />
          <meshStandardMaterial color={C.peach} />
        </mesh>
      </group>
    </Float>
  )
}

function KnowledgePlanet({ reduced }: { reduced: boolean }) {
  const rings = useRef<THREE.Group>(null)
  const moon = useRef<THREE.Mesh>(null)
  useFrame(({ clock }, dt) => {
    if (reduced) return
    if (rings.current) { rings.current.rotation.z += dt * 0.25; rings.current.rotation.x = 1.2 + Math.sin(clock.elapsedTime * 0.3) * 0.1 }
    if (moon.current) { const t = clock.elapsedTime * 0.7; moon.current.position.set(Math.cos(t) * 1.55, Math.sin(t) * 0.5, Math.sin(t) * 1.55) }
  })
  return (
    <group position={[3.6, 4.6, -2.5]}>
      <mesh>
        <sphereGeometry args={[0.9, 40, 40]} />
        <meshStandardMaterial color={C.emerald} emissive={C.emerald} emissiveIntensity={0.55} roughness={0.35} />
      </mesh>
      <mesh scale={1.25}>
        <sphereGeometry args={[0.9, 24, 24]} />
        <meshBasicMaterial color={C.emerald} transparent opacity={0.12} />
      </mesh>
      <group ref={rings} rotation={[1.2, 0, 0]}>
        <Ring radius={1.4} color={C.lavender} opacity={0.8} thickness={0.025} rotation={[0, 0, 0]} />
        <Ring radius={1.75} color={C.peach} opacity={0.5} rotation={[0.3, 0.2, 0]} />
      </group>
      <mesh ref={moon}>
        <sphereGeometry args={[0.14, 16, 16]} />
        <meshStandardMaterial color={C.peach} emissive={C.peach} emissiveIntensity={0.4} />
      </mesh>
    </group>
  )
}

function FloatingIsland({ lite, reduced }: { lite: boolean; reduced: boolean }) {
  const ref = useRef<THREE.Group>(null)
  useFrame((_, dt) => {
    if (ref.current && !reduced) ref.current.rotation.y += dt * 0.06
  })
  const trees: [number, number, number, number][] = [
    [-3, 0.3, 0.8, 1.2], [-2.6, 0.3, 1.9, 1], [-3.3, 0.3, -1.2, 1.3], [-1.6, 0.3, 2.6, 0.9], [0.9, 0.3, 2.9, 1.1],
    [3.2, 0.3, 0.2, 1], [3.1, 0.3, -2.2, 1.2], [0.6, 0.3, -2.6, 1], [-1.4, 0.3, -2.7, 1.2], [2.6, 0.3, 2.6, 0.8],
  ]
  return (
    <group ref={ref}>
      <IslandBase />
      <Building />
      <Observatory />
      <Playground />
      {(lite ? trees.slice(0, 6) : trees).map(([x, y, z, s], i) => (
        <Tree key={i} position={[x, y, z]} scale={s} color={i % 3 === 0 ? C.emerald : C.grassDark} />
      ))}
    </group>
  )
}

/** Camera: gentle pointer parallax + scroll-driven push toward the campus. */
function CameraRig({ scrollRef, offsetX }: { scrollRef: MutableRefObject<number>; offsetX: number }) {
  const { camera, pointer } = useThree()
  const look = useRef(new THREE.Vector3(offsetX, 1, 0))
  useFrame((_, dt) => {
    const p = scrollRef.current
    const k = 1 - Math.exp(-dt * 3)
    camera.position.x += (pointer.x * 1.4 - camera.position.x) * k
    camera.position.y += (4.2 - p * 1.2 + pointer.y * 0.6 - camera.position.y) * k
    camera.position.z += (15.5 - p * 3 - camera.position.z) * k
    look.current.set(offsetX, 1.1 - p * 0.2, 0)
    camera.lookAt(look.current)
  })
  return null
}

export default function HeroCampusScene({ active, lite, reduced, scrollRef, offsetX = 0 }: SceneProps & { scrollRef: MutableRefObject<number>; offsetX?: number }) {
  return (
    <Canvas
      frameloop={active && !reduced ? 'always' : 'demand'}
      dpr={lite ? [1, 1.25] : [1, 1.75]}
      camera={{ position: [0, 4.2, 15.5], fov: 40 }}
      gl={{ antialias: !lite, alpha: true, powerPreference: 'high-performance' }}
      aria-hidden="true"
    >
      <fog attach="fog" args={['#F6F1FF', 16, 34]} />
      <ambientLight intensity={0.55} />
      <hemisphereLight args={['#FFFFFF', '#D9CBFF', 1]} />
      <directionalLight position={[6, 9, 5]} intensity={1.6} color="#FFE3D3" />
      <pointLight position={[3.6, 4.6, -1.2]} intensity={6} distance={7} color={C.emerald} />
      <CameraRig scrollRef={scrollRef} offsetX={offsetX} />

      <group position={[offsetX, -0.6, 0]}>
        <Float speed={reduced ? 0 : 1} floatIntensity={reduced ? 0 : 0.5} rotationIntensity={0}>
          <FloatingIsland lite={lite} reduced={reduced} />
        </Float>
        <MiniIsland position={[-5.2, 2.2, -2]} reduced={reduced} />
        {!lite && <MiniIsland position={[5.4, -0.6, 1.2]} color={C.emerald} reduced={reduced} />}
        <KnowledgePlanet reduced={reduced} />

        {/* floating books */}
        {([[-3.4, 3.2, 1, C.peach], [-1.6, 4.2, -1.5, C.lavender], [1.2, 3.6, 1.6, C.emerald], [-4.4, 1, 2.4, C.lavender]] as const)
          .slice(0, lite ? 2 : 4)
          .map(([x, y, z, color], i) => (
            <Float key={i} speed={reduced ? 0 : 2} floatIntensity={reduced ? 0 : 1.4} rotationIntensity={reduced ? 0 : 1}>
              <Book position={[x, y, z]} color={color} rotation={[0.3, i, 0.2]} scale={0.9} />
            </Float>
          ))}

        <PaperPlane radius={5.6} height={2.4} speed={0.25} offset={0} reduced={reduced} />
        {!lite && <PaperPlane radius={4.4} height={3.8} speed={-0.2} offset={2} reduced={reduced} />}

        <Cloud position={[-4, 4.6, -3]} scale={0.9} reduced={reduced} />
        <Cloud position={[4.8, 2.4, -4]} scale={0.7} speed={0.15} reduced={reduced} />
        {!lite && <Cloud position={[0, -2.5, 3]} scale={0.8} speed={0.08} reduced={reduced} />}

        {/* orbit lines around the scene */}
        <Ring radius={6.2} color="#9C7CF7" opacity={0.35} rotation={[Math.PI / 2.2, 0, 0.15]} />
      </group>
      {!reduced && <Sparkles count={lite ? 25 : 70} scale={[16, 9, 8]} size={2.2} speed={0.25} color="#9C7CF7" opacity={0.7} />}
    </Canvas>
  )
}
