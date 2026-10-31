---
tool: react-three-rapier (@react-three/rapier)
version: 2.2.0 (npm 2025-11-03, repo HEAD @ae5c3fe 2025-11-03) — pin EXACT @dimforge/rapier3d-compat 0.19.2; peer @react-three/fiber ^9.0.4, react ^19, three >=0.159.0. Addons @react-three/rapier-addons 5.0.0 (Attractor). Dicek 2026-10-28
official: https://github.com/pmndrs/react-three-rapier (API docs: https://pmndrs.github.io/react-three-rapier/)
local: 04-physics/react-three-rapier/repo-react-three-rapier/packages/react-three-rapier/{readme.md,src/,CHANGELOG.md}
fetched: 2026-10-28
---
# react-three-rapier — Rapier 3D deklaratif untuk R3F: lanyard badge, plinko, objek 3D yang bisa dilempar & bertabrakan

## Kapan pakai / kapan jangan (vs alternatif di arsenal)
- **Pakai**: scene R3F yang butuh rigid body 3D, joint (rope/spring/spherical/revolute/prismatic/fixed), sensor,
  instanced bodies, interpolasi fixed-step yang sudah jadi.
- **Jangan**: 2D/DOM (pakai Matter atau Rapier2D langsung); butuh fitur Rapier ≥0.20 (velocity cap baru, CCD default
  vs fixed, **soft body 0.21**) → r3r 2.2.0 masih memaketkan rapier3d-compat **0.19.2**; memasang versi lain berarti dua
  modul WASM terpisah (objek tidak kompatibel) [UNVERIFIED efeknya, tapi dependensi pinned terverifikasi di package.json].
  Kain/tali yang hanya visual → verlet di shader/JS lebih murah (`../verlet`).

## Mental model (cara kerja di balik layar yang memengaruhi FEEL & performa)
- `<Physics>` lazy-import Rapier (`suspend`) → **wajib di dalam `<Suspense>`**.
- Stepping (src/components/Physics.tsx): `updateLoop="follow"` = step di `useFrame` (prioritas `updatePriority`);
  `"independent"` = rAF sendiri + `invalidate()` hanya saat ada body aktif (cocok `frameloop="demand"`).
  Fixed step: `clampedDelta = clamp(dt, 0, 0.5)`; `accumulator += clampedDelta; while (acc >= timeStep) step(timeStep)`.
  `interpolate` (default true): simpan pose sebelum step terakhir, render `alpha = accumulator / timeStep`.
  `timeStep="vary"` = dt frame langsung (tanpa interpolasi, tak deterministik).
- Mesh body yang **tidur tidak di-update** (kecuali instanced) → murah; event `onSleep/onWake` tersedia.
- Props integrasi yang di-set ulang ke world setiap render: `numSolverIterations`, `numInternalPgsIterations`,
  `allowedLinearError` (default r3r **0.001**), `predictionDistance` (**0.002**), `maxCcdSubsteps` (1),
  `contactNaturalFrequency` (30), `lengthUnit` (1), `minIslandSize` (128). Nilai default r3r = default Rapier lama;
  `minIslandSize` sudah dihapus di Rapier 0.20 (aman selama r3r masih 0.19.2).
- Colliders otomatis dari geometry mesh: `"cuboid"` (default di Physics), `"ball"`, `"hull"`, `"trimesh"`, `false`.
  Skala mesh ikut diterapkan ke collider.
- Hooks joint mengembalikan `RefObject` joint mentah (`ImpulseJoint`), dibuat setelah kedua ref terisi.

## Setup minimal (API terkini terverifikasi — import, init, cleanup/destroy)
```tsx
import { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics, RigidBody, CuboidCollider, type RapierRigidBody } from '@react-three/rapier';

export default function App() {
  return (
    <Canvas>
      <Suspense>
        <Physics gravity={[0, -9.81, 0]} timeStep={1 / 60} interpolate colliders="hull" debug={false}>
          <RigidBody restitution={0.4} friction={0.6} linearDamping={0.2}>
            <mesh><torusGeometry /><meshStandardMaterial /></mesh>
          </RigidBody>
          <CuboidCollider position={[0, -2, 0]} args={[20, 0.5, 20]} />
        </Physics>
      </Suspense>
    </Canvas>
  );
}
```
Cleanup otomatis saat unmount (world dibuat/di-free oleh komponen). Catatan: readme contoh memakai prop
`interpolation={false}` — **nama prop yang benar `interpolate`** (PhysicsProps di Physics.tsx).

## Knob yang menentukan rasa gerak (param → efek ke feel; default; rentang bagus)
| Knob (prop) | Default | Efek | Rentang bagus |
|---|---|---|---|
| `<Physics timeStep>` | 1/60 | presisi | 1/120 untuk joint chain yang dijepit kursor |
| `<Physics interpolate>` | true | smooth di 120 Hz | biarkan true |
| `<Physics gravity>` | [0,-9.81,0] | berat | badge Vercel: [0,-40,0] (lebih "snappy") |
| `<Physics numSolverIterations>` | 4 | kekakuan rantai/stack | 8 untuk lanyard/rantai panjang |
| `<Physics updateLoop/updatePriority>` | "follow"/undef | sinkron render | "independent" + `frameloop="demand"` |
| `<RigidBody type>` | "dynamic" | `"fixed" \| "dynamic" \| "kinematicPosition" \| "kinematicVelocity"` | drag = kinematicPosition |
| `linearDamping` / `angularDamping` | 0 | "berat di udara" | 1–3 untuk lanyard/tali (Vercel: 2/2) |
| `restitution` / `friction` | Rapier 0 / 0.5 | pantul / geser | per collider juga bisa |
| `gravityScale`, `dominanceGroup`, `ccd`, `softCcdPrediction`, `canSleep`, `lockRotations`, `enabledRotations`, `additionalSolverIterations` | — | sama dengan Rapier | `canSleep={false}` untuk objek yang dikendalikan per frame |
| `collisionGroups={interactionGroups(member, filter)}` | semua grup | layer (0–15) | dua arah harus cocok |
| `useSpringJoint(a, b, [anchorA, anchorB, restLength, k, c])` | — | pegas | contoh resmi: `c = ζ · 2√(k·m)` |
| `useRopeJoint(a, b, [anchorA, anchorB, length])` | — | tali (jarak maks) | segmen 0.5–1 unit |

## Integrasi (Lenis / GSAP / Motion / R3F / Barba / dll — pola wiring persis)
- Komponen: `Physics`, `RigidBody`, `MeshCollider`, `InstancedRigidBodies`; collider: `CuboidCollider`,
  `RoundCuboidCollider`, `BallCollider`, `CapsuleCollider`, `CylinderCollider`, `RoundCylinderCollider`, `ConeCollider`,
  `RoundConeCollider`, `ConvexHullCollider`, `TrimeshCollider`, `HeightfieldCollider`, `AnyCollider`.
- Hooks: `useRapier()` → `{ world, rapier, step, setWorld, isPaused, isDebug, … }`; `useBeforePhysicsStep`,
  `useAfterPhysicsStep`, `useFilterContactPair`, `useFilterIntersectionPair` (2.2.0; butuh
  `collider.setActiveHooks(rapier.ActiveHooks.FILTER_CONTACT_PAIRS)`; **jangan** baca `translation()` di dalam hook
  filter — cache di `useBeforePhysicsStep`, readme: Rust aliasing error).
- Event props: `onCollisionEnter({ manifold, target, other, flipped })`, `onCollisionExit`, `onIntersectionEnter/Exit`
  (sensor), `onContactForce({ totalForce, totalForceMagnitude, maxForceDirection, maxForceMagnitude })`, `onSleep/onWake`.
- Helper konversi: `vec3(rb.translation())`, `quat(rb.rotation())`, `euler()`.
- Manual step / pause: `<Physics paused>` + `const { step } = useRapier(); step(1/60)`.
- Snapshot: `setWorld(rapier.World.restoreSnapshot(world.takeSnapshot()))` — urutan pembuatan objek harus identik.
- Addons: `<Attractor strength range type="static|linear|newtonian" collisionGroups>` (strength negatif = repel).

## Resep non-generik (3–6 snippet ringkas yang jalan, masing-masing + 1 baris "kenapa terasa mahal")
**1. Lanyard/ID badge (Vercel Ship 2024) — inti fisika**
```tsx
const segment = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 2, linearDamping: 2 } as const;
useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]]);
useFrame((state, delta) => {
  if (dragged) {                                     // kartu jadi kinematicPosition saat dipegang
    vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
    dir.copy(vec).sub(state.camera.position).normalize();
    vec.add(dir.multiplyScalar(state.camera.position.length()));
    [card, j1, j2, j3, fixed].forEach((r) => r.current?.wakeUp());
    card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
  }
  // anti-jitter tali saat ditarik berlebihan: lerp adaptif jarak (min 10, max 50 /s)
  [j1, j2].forEach((r) => {
    if (!r.current.lerped) r.current.lerped = new THREE.Vector3().copy(r.current.translation());
    const d = Math.max(0.1, Math.min(1, r.current.lerped.distanceTo(r.current.translation())));
    r.current.lerped.lerp(r.current.translation(), delta * (10 + d * 40));
  });
  curve.points[0].copy(j3.current.translation()); curve.points[1].copy(j2.current.lerped);
  curve.points[2].copy(j1.current.lerped);         curve.points[3].copy(fixed.current.translation());
  band.current.geometry.setPoints(curve.getPoints(32));        // CatmullRom 'chordal' → MeshLine
  ang.copy(card.current.angvel()); rot.copy(card.current.rotation());
  card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z }); // putar balik menghadap layar
});
// <Physics interpolate gravity={[0, -40, 0]} timeStep={1/60}>; card: <RigidBody type={dragged ? 'kinematicPosition' : 'dynamic'}>
```
Kenapa terasa mahal: tali 3 segmen + kurva Catmull-Rom chordal terlihat seperti tali kontinu; gravity −40 + damping 2
memberi ayunan cepat yang cepat tenang; trik angvel membuat kartu selalu kembali menghadap depan (non-fisik tapi "benar").
Perbaikan sendiri: lerp `delta * k` di atas tidak frame-rate-independent penuh → pakai `1 - Math.exp(-k*delta)`
(`../_physics-math`); release velocity: set `type` balik ke dynamic lalu `setLinvel(pointerVel)`.

**2. Pegas "napas" pada deretan objek (variasi damping ratio)** — dari `demo/src/examples/spring/SpringExample.tsx`:
```tsx
const stiffness = 1.0e3, critical = 2 * Math.sqrt(stiffness * (mass ?? 1));
const damping = (jointNum / (total / 2)) * critical;   // ζ dari 0 → 2 sepanjang deretan
useSpringJoint(ball, floor, [[0, 0, 0], [x, y - 3, z], 0, stiffness, damping]);
```
Kenapa terasa mahal: deretan yang sama tetapi ζ bergradasi = koreografi pantulan (wave) gratis dari fisika.

**3. Plinko/confetti instanced**: `<InstancedRigidBodies instances={[{ key, position, rotation }]} colliders="ball">`
+ `<instancedMesh args={[undefined, undefined, COUNT]}>` (lihat `demo/src/examples/instanced-meshes/`). Ratusan objek, 1 draw call.

**4. Magnet kursor**: `@react-three/rapier-addons` `<Attractor position={cursor} range={6} strength={4} type="linear" />`
(strength negatif untuk "menghindari kursor"). Lihat `demo/src/examples/attractors/AttractorsExample.tsx`.

**5. Bunyi tumbukan**: `onContactForce={({ totalForceMagnitude }) => totalForceMagnitude > T && play(...)}` pada
`<RigidBody>`; atau `onCollisionEnter` + `manifold.solverContactPoint(0)` untuk posisi spasial (PannerNode).

## Performa, aksesibilitas (prefers-reduced-motion), mobile & dukungan browser
- `updateLoop="independent"` + `<Canvas frameloop="demand">` → GPU idle saat semua body tidur.
- `colliders="trimesh"` hanya untuk statis; dinamis pakai `hull`/primitive. Debug (`<Physics debug>`) mahal — dev only.
- `paused` untuk `prefers-reduced-motion: reduce` (atau `timeStep` tetap + pre-step lalu pause).
- dt di-clamp 0.5 s → kembali dari tab tersembunyi bisa menjalankan hingga 30 step sekaligus (burst), bukan meledak.

## Sumber lokal (file lokal paling berguna untuk deep dive, satu baris per file)
- `repo-react-three-rapier/packages/react-three-rapier/readme.md` — panduan resmi (Physics, colliders, events, joints, hooks, snapshot).
- `…/packages/react-three-rapier/src/components/Physics.tsx` — PhysicsProps + default + loop akumulator/interpolasi.
- `…/src/types.ts` — RigidBodyOptions, ColliderOptions, joint param tuples, payload event.
- `…/src/hooks/joints.ts` — useFixed/Spherical/Revolute/Prismatic/Rope/SpringJoint → `rapier.JointData.*`.
- `…/src/hooks/hooks.ts` — useRapier, useBefore/AfterPhysicsStep, useFilter*Pair.
- `…/CHANGELOG.md` — 2.2.0 (rapier 0.19.2, filter hooks), 2.0.0 (React 19 / R3F 9), 1.5.0 (`erp` → `contactNaturalFrequency`).
- `repo-react-three-rapier/demo/src/examples/{rope-joint,spring,joints,attractors,instanced-meshes,snapshot,stuttering,manual-step,one-way-platform,contact-force-events}/*.tsx`.
- `../verlet/web/vercel__interactive_3d_event_badge_r3f.md` — artikel lanyard lengkap (kode prototipe + versi final).
