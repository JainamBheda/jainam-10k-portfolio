import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef, MutableRefObject } from 'react'
import * as THREE from 'three'
import { S, pw, mod } from './lib'
type R = { S: MutableRefObject<S> }
const U = 40, SPAN = 200
const SKY = ['#f2c48d', '#d6d9c4', '#b9c6cf', '#2c3d46', '#f0a868', '#f6d9a8'].map(c => new THREE.Color(c))
const GND = ['#3f6b3a', '#6f8a55', '#5d6568', '#243238', '#5b7d46', '#6c8a4a'].map(c => new THREE.Color(c))
const tmp = new THREE.Color()
const blend = (arr: THREE.Color[], d: number, out: THREE.Color) => { const x = d / 2, i = Math.min(4, Math.floor(x)); return out.copy(arr[i]).lerp(arr[i + 1], x - i) }
const TREE = [[0, 1], [1.6, 1], [2.4, 0], [7.6, 0], [8.4, 1], [10, 1]]
const BLDG = [[0, 0], [1.6, 0], [2.4, 3], [3.6, 3], [4.6, 11], [5.6, 14], [6.4, 9], [7.6, 6], [8.4, 0]]
const hash = (i: number) => { const x = Math.sin(i * 127.1) * 43758.5453; return x - Math.floor(x) }

function Env({ S }: R) {
  const gnd = useRef<THREE.MeshStandardMaterial>(null!), sun = useRef<THREE.DirectionalLight>(null!)
  useFrame(({ scene }) => {
    const d = S.current.d
    const sky = blend(SKY, d, tmp); scene.background = scene.background instanceof THREE.Color ? scene.background.copy(sky) : sky.clone()
    scene.fog = scene.fog ?? new THREE.Fog(sky, 25, 120); (scene.fog as THREE.Fog).color.copy(sky)
    blend(GND, d, gnd.current.color)
    sun.current.intensity = d > 5.5 && d < 7.5 ? 0.9 : 1.6
  })
  return (<>
    <ambientLight intensity={0.7} />
    <directionalLight ref={sun} position={[-6, 8, 4]} castShadow shadow-mapSize={[1024, 1024]} shadow-camera-left={-4} shadow-camera-right={4} shadow-camera-top={4} shadow-camera-bottom={-4} />
    <mesh rotation-x={-Math.PI / 2} position={[0, -0.02, -100]} receiveShadow><planeGeometry args={[400, 400]} /><meshStandardMaterial ref={gnd} /></mesh>
    <mesh rotation-x={-Math.PI / 2} position={[0, 0, -100]} receiveShadow><planeGeometry args={[6, 400]} /><meshStandardMaterial color="#2b2b2d" roughness={0.9} /></mesh>
  </>)
}

function Dashes({ S }: R) {
  const ref = useRef<THREE.InstancedMesh>(null!), o = useMemo(() => new THREE.Object3D(), [])
  useFrame(() => {
    for (let i = 0; i < 40; i++) { o.position.set(0, 0.01, mod(i * 5 + S.current.d * U, 200) - 185); o.rotation.x = -Math.PI / 2; o.updateMatrix(); ref.current.setMatrixAt(i, o.matrix) }
    ref.current.instanceMatrix.needsUpdate = true
  })
  return <instancedMesh ref={ref} args={[undefined, undefined, 40]}><planeGeometry args={[0.18, 2]} /><meshBasicMaterial color="#efe6d2" /></instancedMesh>
}

function Props({ S, n, kind }: R & { n: number; kind: 'tree' | 'bldg' }) {
  const ref = useRef<THREE.InstancedMesh>(null!), o = useMemo(() => new THREE.Object3D(), [])
  const mat = useRef<THREE.MeshStandardMaterial>(null!)
  useFrame(() => {
    const d = S.current.d, k = kind === 'tree' ? pw(TREE, d) : pw(BLDG, d), step = SPAN / (n / 2)
    for (let i = 0; i < n; i++) {
      const side = i % 2 ? 1 : -1, h = hash(i + (kind === 'tree' ? 0 : 99))
      const z = mod(-Math.floor(i / 2) * step + d * U, SPAN) - SPAN + 15
      if (kind === 'tree') { const th = (2.5 + h * 2.5) * k, r = (0.9 + h * 0.7) * k; o.position.set(side * (4.5 + h * 7), th / 2, z); o.scale.set(r, Math.max(0.001, th), r) }
      else { const bh = Math.max(0.001, (0.6 + h) * k), w = 3 + h * 3; o.position.set(side * (9 + h * 6), bh / 2, z); o.scale.set(w, bh, w) }
      o.updateMatrix(); ref.current.setMatrixAt(i, o.matrix)
    }
    ref.current.instanceMatrix.needsUpdate = true
    if (mat.current && kind === 'bldg') { mat.current.emissiveIntensity = pw([[5.6, 0], [6.4, 0.6], [7.6, 0.6], [8.4, 0]], d) }
  })
  return (<instancedMesh ref={ref} args={[undefined, undefined, n]} castShadow={false} frustumCulled={false}>
    {kind === 'tree' ? <coneGeometry args={[1, 1, 7]} /> : <boxGeometry args={[1, 1, 1]} />}
    <meshStandardMaterial ref={mat} color={kind === 'tree' ? '#2f5d3a' : '#8b9096'} emissive="#e9822b" emissiveIntensity={0} flatShading />
  </instancedMesh>)
}

function Mountains({ S }: R) {
  const g = useRef<THREE.Group>(null!)
  useFrame(() => { g.current.scale.y = pw([[0, 0.5], [7, 0.5], [8.4, 1.4], [10, 1.4]], S.current.d) })
  return (<group ref={g} position={[0, 0, -170]}>
    {[-90, -45, 0, 50, 95].map((x, i) => <mesh key={i} position={[x, 18 + (i % 2) * 8, 0]}><coneGeometry args={[40 + (i % 3) * 10, 40 + (i % 2) * 16, 5]} /><meshBasicMaterial color={i % 2 ? '#6d7f86' : '#7e8f93'} fog={false} /></mesh>)}
  </group>)
}

const STATION = ['#3aa0d8', '#e9822b', '#46a36a', '#c95a7a', '#e0b13a']
function Station({ S, k }: R & { k: number }) {
  const g = useRef<THREE.Group>(null!)
  useFrame(() => { g.current.position.z = -1 - k * 2 * U + S.current.d * U })
  return (<group ref={g} position={[2.4, 0, 0]}>
    <mesh position={[0, 0.5, 0]} castShadow><boxGeometry args={[1.4, 1, 0.7]} /><meshStandardMaterial color="#d9cdb4" /></mesh>
    {[-0.4, 0, 0.4].map((x, i) => <mesh key={i} position={[x, 1.2, 0]}><cylinderGeometry args={[0.07, 0.07, 0.35, 10]} /><meshStandardMaterial color={STATION[k - 1]} /></mesh>)}
    <mesh position={[0, 2.6, 0]}><boxGeometry args={[1.8, 0.12, 1]} /><meshStandardMaterial color={STATION[k - 1]} /></mesh>
    {[-0.8, 0.8].map(x => <mesh key={x} position={[x, 1.3, 0.4]}><cylinderGeometry args={[0.04, 0.04, 2.6, 6]} /><meshStandardMaterial color="#444" /></mesh>)}
  </group>)
}

function Finish({ S }: R) {
  const g = useRef<THREE.Group>(null!)
  useFrame(() => { g.current.position.z = -5 - 10 * U + S.current.d * U })
  return (<group ref={g}>
    {[-3.4, 3.4].map(x => <mesh key={x} position={[x, 2.2, 0]}><boxGeometry args={[0.25, 4.4, 0.25]} /><meshStandardMaterial color="#f0ebe0" /></mesh>)}
    <mesh position={[0, 4.2, 0]}><boxGeometry args={[7.2, 0.9, 0.2]} /><meshStandardMaterial color="#e9822b" /></mesh>
    <mesh position={[0, 0.02, 0.6]} rotation-x={-Math.PI / 2}><planeGeometry args={[6, 0.4]} /><meshBasicMaterial color="#f6efe0" /></mesh>
  </group>)
}

function Confetti({ S }: R) {
  const ref = useRef<THREE.Points>(null!)
  const pos = useMemo(() => { const a = new Float32Array(90 * 3); for (let i = 0; i < 90; i++) { a[i * 3] = (hash(i) - 0.5) * 8; a[i * 3 + 1] = hash(i + 7) * 7; a[i * 3 + 2] = -2 - hash(i + 3) * 5 } return a }, [])
  useFrame(({ clock }) => {
    const on = S.current.stop === 5 && S.current.pt > 0.2 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ref.current.visible = on; if (!on) return
    const a = ref.current.geometry.attributes.position as THREE.BufferAttribute
    for (let i = 0; i < 90; i++) a.setY(i, mod(pos[i * 3 + 1] - clock.elapsedTime * (0.8 + hash(i) * 0.8), 7))
    a.needsUpdate = true
  })
  return <points ref={ref} frustumCulled={false}><bufferGeometry><bufferAttribute attach="attributes-position" array={pos} count={90} itemSize={3} /></bufferGeometry><pointsMaterial color="#e9822b" size={0.14} /></points>
}

function Runner({ S }: R) {
  const ph = useRef(0), sp = useRef(0)
  const body = useRef<THREE.Group>(null!), la = useRef<THREE.Group>(null!), ra = useRef<THREE.Group>(null!), ll = useRef<THREE.Group>(null!), rl = useRef<THREE.Group>(null!), bottle = useRef<THREE.Mesh>(null!)
  useFrame((_, dt) => {
    const s = S.current
    sp.current += ((s.run ? s.sp : 0) - sp.current) * Math.min(1, dt * 8); ph.current += dt * sp.current * 12
    const a = Math.sin(ph.current) * sp.current
    ll.current.rotation.x = a * 0.95; rl.current.rotation.x = -a * 0.95; la.current.rotation.x = -a * 0.9
    const drinking = s.stop > 0 && ((s.pt > 0.1 && s.pt < 0.45) || (s.pt > 0.5 && s.pt < 0.8))
    ra.current.rotation.x += ((drinking ? -2.5 : a * 0.9) - ra.current.rotation.x) * Math.min(1, dt * 10)
    bottle.current.visible = s.stop > 0 && s.pt > 0.05 && s.pt < 0.85
    ;(bottle.current.material as THREE.MeshStandardMaterial).color.set(s.pt > 0.5 ? '#e9822b' : '#3aa0d8')
    body.current.rotation.x = -sp.current * 0.18; body.current.position.y = Math.abs(Math.sin(ph.current)) * 0.08 * sp.current
  })
  const skin = '#c58c68'
  return (<group>
    <mesh rotation-x={-Math.PI / 2} position={[0, 0.01, 0]}><circleGeometry args={[0.55, 20]} /><meshBasicMaterial color="#000" transparent opacity={0.25} /></mesh>
    <group ref={body}>
      <mesh position={[0, 1.3, 0]} castShadow><boxGeometry args={[0.5, 0.7, 0.28]} /><meshStandardMaterial color="#e9822b" /></mesh>
      <mesh position={[0, 1.35, 0.23]} castShadow><boxGeometry args={[0.4, 0.5, 0.18]} /><meshStandardMaterial color="#1f3d2b" /></mesh>
      <mesh position={[0, 0.95, 0]}><boxGeometry args={[0.5, 0.22, 0.3]} /><meshStandardMaterial color="#26282b" /></mesh>
      <mesh position={[0, 1.82, 0]} castShadow><sphereGeometry args={[0.17, 16, 12]} /><meshStandardMaterial color={skin} /></mesh>
      <mesh position={[0, 1.93, -0.02]}><boxGeometry args={[0.34, 0.07, 0.4]} /><meshStandardMaterial color="#f3ead6" /></mesh>
      <group ref={ll} position={[-0.13, 0.9, 0]}><mesh position={[0, -0.4, 0]} castShadow><boxGeometry args={[0.16, 0.8, 0.16]} /><meshStandardMaterial color={skin} /></mesh><mesh position={[0, -0.82, -0.05]}><boxGeometry args={[0.18, 0.1, 0.3]} /><meshStandardMaterial color="#f3ead6" /></mesh></group>
      <group ref={rl} position={[0.13, 0.9, 0]}><mesh position={[0, -0.4, 0]} castShadow><boxGeometry args={[0.16, 0.8, 0.16]} /><meshStandardMaterial color={skin} /></mesh><mesh position={[0, -0.82, -0.05]}><boxGeometry args={[0.18, 0.1, 0.3]} /><meshStandardMaterial color="#f3ead6" /></mesh></group>
      <group ref={la} position={[-0.33, 1.58, 0]}><mesh position={[0, -0.28, 0]} castShadow><boxGeometry args={[0.12, 0.6, 0.12]} /><meshStandardMaterial color={skin} /></mesh></group>
      <group ref={ra} position={[0.33, 1.58, 0]}><mesh position={[0, -0.28, 0]} castShadow><boxGeometry args={[0.12, 0.6, 0.12]} /><meshStandardMaterial color={skin} /></mesh>
        <mesh ref={bottle} position={[0, -0.62, -0.08]}><cylinderGeometry args={[0.06, 0.06, 0.24, 10]} /><meshStandardMaterial color="#3aa0d8" /></mesh></group>
    </group>
  </group>)
}

function Rig({ S }: R) {
  useFrame(({ camera, clock }) => {
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 1
    const push = S.current.stop > 0 ? 1 : 0
    camera.position.z += ((6.4 - push * 1.2) - camera.position.z) * 0.05
    camera.position.x = Math.sin(clock.elapsedTime * 0.4) * 0.15 * calm
    camera.position.y = 2.2; camera.lookAt(0.3, 1.2, -3)
  })
  return null
}

export default function Scene({ S }: R) {
  const small = window.innerWidth < 700
  return (<Canvas shadows dpr={[1, small ? 1.25 : 1.75]} camera={{ position: [0, 2.2, 6.4], fov: 50 }} gl={{ antialias: !small, powerPreference: 'high-performance' }}>
    <Env S={S} /><Dashes S={S} /><Mountains S={S} />
    <Props S={S} n={small ? 44 : 90} kind="tree" /><Props S={S} n={small ? 24 : 44} kind="bldg" />
    {[1, 2, 3, 4, 5].map(k => <Station key={k} S={S} k={k} />)}
    <Finish S={S} /><Confetti S={S} /><Runner S={S} /><Rig S={S} />
  </Canvas>)
}
