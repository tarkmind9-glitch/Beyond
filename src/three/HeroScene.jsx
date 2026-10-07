import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Lightformer, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import { prefersReducedMotion } from '../lib/ticker'
import { useApp } from '../components/AppProvider'

// Interactive cluster of glossy shapes. A tiny custom physics step pulls every body
// toward the centre, resolves sphere-sphere overlaps and lets the cursor shove them around.
const PALETTE = [
  { color: '#3d4bff', roughness: 0.18, metalness: 0.05 },
  { color: '#f4f5fa', roughness: 0.22, metalness: 0.0 },
  { color: '#0d0e14', roughness: 0.25, metalness: 0.1 },
  { color: '#c9cfff', roughness: 0.12, metalness: 0.2 },
]
const SHAPES = ['sphere', 'sphere', 'box', 'torus', 'capsule', 'sphere']

function makeBodies(count, scale) {
  // deterministic pseudo-random so the layout is stable between renders
  let seed = 7
  const rand = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646
  return Array.from({ length: count }, (_, i) => {
    const r = (0.55 + rand() * 0.75) * scale
    return {
      shape: SHAPES[i % SHAPES.length],
      material: PALETTE[i % PALETTE.length],
      radius: r,
      pos: new THREE.Vector3((rand() - 0.5) * 16, (rand() - 0.5) * 10, (rand() - 0.5) * 4),
      vel: new THREE.Vector3(),
      rot: new THREE.Euler(rand() * Math.PI, rand() * Math.PI, 0),
      spin: new THREE.Vector3((rand() - 0.5) * 0.6, (rand() - 0.5) * 0.6, (rand() - 0.5) * 0.3),
    }
  })
}

function Shape({ shape, radius, material }) {
  const mat = (
    <meshPhysicalMaterial
      color={material.color}
      roughness={material.roughness}
      metalness={material.metalness}
      clearcoat={1}
      clearcoatRoughness={0.1}
      envMapIntensity={1.2}
    />
  )
  switch (shape) {
    case 'box':
      return (
        <RoundedBox args={[radius * 1.35, radius * 1.35, radius * 1.35]} radius={radius * 0.28} smoothness={4}>
          {mat}
        </RoundedBox>
      )
    case 'torus':
      return (
        <mesh>
          <torusGeometry args={[radius * 0.72, radius * 0.3, 32, 64]} />
          {mat}
        </mesh>
      )
    case 'capsule':
      return (
        <mesh>
          <capsuleGeometry args={[radius * 0.5, radius * 0.9, 12, 24]} />
          {mat}
        </mesh>
      )
    default:
      return (
        <mesh>
          <sphereGeometry args={[radius, 48, 48]} />
          {mat}
        </mesh>
      )
  }
}

function Cluster({ count, scale, burstRef }) {
  const bodies = useMemo(() => makeBodies(count, scale), [count, scale])
  const groups = useRef([])
  const pointer = useRef(new THREE.Vector3(100, 100, 0))
  const { viewport, camera } = useThree()
  const tmp = useMemo(() => new THREE.Vector3(), [])
  const calm = prefersReducedMotion()

  useFrame((state, delta) => {
    const dt = Math.min(delta, 1 / 30) * (calm ? 0.3 : 1)
    // Cursor position on the z=0 plane
    const vp = viewport.getCurrentViewport(camera, [0, 0, 0])
    pointer.current.set((state.pointer.x * vp.width) / 2, (state.pointer.y * vp.height) / 2, 0)
    // Rest point: right of centre on wide screens, above the headline on tall ones
    const wide = vp.width > vp.height
    const cx = wide ? vp.width * 0.14 : 0
    const cy = wide ? vp.height * 0.06 : vp.height * 0.17

    // Click burst: push everything outward from the cursor
    if (burstRef.current) {
      bodies.forEach((b) => {
        tmp.copy(b.pos).sub(pointer.current)
        const d = Math.max(tmp.length(), 0.5)
        b.vel.addScaledVector(tmp.normalize(), 28 / d)
        b.spin.multiplyScalar(2.5)
      })
      burstRef.current = false
    }

    for (let i = 0; i < bodies.length; i++) {
      const b = bodies[i]
      // spring toward a slightly offset centre, flattened in z
      b.vel.x += (cx - b.pos.x) * 1.6 * dt
      b.vel.y += (cy - b.pos.y) * 1.6 * dt
      b.vel.z += -b.pos.z * 3.0 * dt
      // cursor repulsion
      tmp.copy(b.pos).sub(pointer.current)
      const dist = tmp.length()
      const reach = 2.4 + b.radius
      if (dist < reach) b.vel.addScaledVector(tmp.normalize(), (reach - dist) * 30 * dt)
      // collisions
      for (let j = i + 1; j < bodies.length; j++) {
        const o = bodies[j]
        tmp.copy(b.pos).sub(o.pos)
        const d = tmp.length()
        const min = (b.radius + o.radius) * 0.95
        if (d < min && d > 0.0001) {
          const push = (min - d) * 0.5
          tmp.divideScalar(d)
          b.pos.addScaledVector(tmp, push)
          o.pos.addScaledVector(tmp, -push)
          const rel = b.vel.clone().sub(o.vel).dot(tmp)
          if (rel < 0) {
            b.vel.addScaledVector(tmp, -rel * 0.6)
            o.vel.addScaledVector(tmp, rel * 0.6)
          }
        }
      }
    }

    bodies.forEach((b, i) => {
      b.vel.multiplyScalar(Math.pow(0.12, dt)) // damping
      b.pos.addScaledVector(b.vel, dt)
      b.spin.lerp(tmp.set(0.15, 0.2, 0.05), dt * 0.4)
      b.rot.x += (b.spin.x + b.vel.y * 0.08) * dt
      b.rot.y += (b.spin.y + b.vel.x * 0.08) * dt
      b.rot.z += b.spin.z * dt
      const g = groups.current[i]
      if (g) {
        g.position.copy(b.pos)
        g.rotation.copy(b.rot)
      }
    })
  })

  return bodies.map((b, i) => (
    <group key={i} ref={(el) => (groups.current[i] = el)}>
      <Shape shape={b.shape} radius={b.radius} material={b.material} />
    </group>
  ))
}

function Rig() {
  // Subtle camera parallax following the pointer
  useFrame((state) => {
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.pointer.x * 1.2, 0.03)
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, state.pointer.y * 0.8, 0.03)
    state.camera.lookAt(0, 0, 0)
  })
  return null
}

export default function HeroScene({ className = '' }) {
  const wrap = useRef(null)
  const burst = useRef(false)
  const { curtain } = useApp()
  const [visible, setVisible] = useState(true)
  const [{ count, scale }] = useState(() =>
    window.innerWidth < 768 ? { count: 12, scale: 0.72 } : { count: 24, scale: 1 },
  )

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting))
    io.observe(wrap.current)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={wrap} className={`hero-scene ${className}`} onPointerDown={() => (burst.current = true)}>
      <Canvas
        frameloop={visible && curtain === 'idle' ? 'always' : 'never'}
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 20], fov: 32, near: 1, far: 60 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        eventSource={wrap}
        eventPrefix="client"
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[6, 8, 10]} intensity={1.6} />
        <directionalLight position={[-8, -4, 6]} intensity={0.6} color="#9aa3ff" />
        <Cluster count={count} scale={scale} burstRef={burst} />
        <Rig />
        {/* Studio lighting built from light panels — no external HDR files */}
        <Environment resolution={256}>
          <group rotation={[-Math.PI / 3, 0, 1]}>
            <Lightformer form="circle" intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={2} />
            <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={2} />
            <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={2} />
            <Lightformer form="circle" intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={8} />
            <Lightformer form="ring" color="#3d4bff" intensity={6} onUpdate={(self) => self.lookAt(0, 0, 0)} position={[10, 10, 0]} scale={10} />
          </group>
        </Environment>
      </Canvas>
    </div>
  )
}
