---
source: https://motion.dev/docs/three
title: "Three.js"
fetched: 2026-10-28
---

# Three.js

Animate Three.js objects, materials, shader uniforms and TSL nodes with Motion.

Motion's [`animate()`](https://motion.dev/docs/animate) can drive Three.js animations:

- `Object3D` transforms: `x`, `y`, `z`, `rotateX`, `rotateY`, `rotateZ`, `scale` etc
- Material properties, including via CSS colour strings
- `Vector2`, `Vector3` and `Vector4` axes
- `ShaderMaterial` uniforms
- TSL `uniform()` nodes

Because this is the same `animate()` that animates the DOM, Three.js objects, shader uniforms etc can be animated within [sequences](https://motion.dev/docs/animate#sequences) and [stagger](https://motion.dev/docs/stagger) alongside HTML and SVG elements.

Live example: https://examples.motion.dev/js/three

It works with `OrbitCamera`, enabling the creation of direct control with a smooth crossfade back to constant orbit, without the heavy feeling of Three's in-built damping.

Live example: https://examples.motion.dev/js/three-orbit

It also works with the new TSL APIs.

Live example: https://examples.motion.dev/js/three-tsl

## Install

`motion/three` ships inside the `motion` package. Install it alongside Three.js:

```
npm install motion three
```

Import and register `threeEffect` once, somewhere that runs before your first animation:

```
import { animate } from "motion"
import { threeEffect } from "motion/three"

animate.addEffect(threeEffect)
```

`threeEffect` can handle `Object3D`s, materials and uniforms objects.

## Usage

### Objects

Any `Object3D` (meshes, groups, lights, cameras) can be animated with the same transform shorthands as HTML elements:

- Translate: `x`, `y`, `z`

- Rotate: `rotateX`, `rotateY`, `rotateZ` (in degrees)

- Scale: `scale`, `scaleX`, `scaleY`, `scaleZ`

```
animate(
  mesh,
  { x: 2, rotateY: 180, scale: 1.25 },
  { type: "spring", visualDuration: 0.7, bounce: 0.25 }
)
```

Initial values are read from the object, so there's no need for a `from` keyframe. Three.js stores rotation in radians. Motion reads and writes it in degrees, to match `rotate` on the DOM.

Anything else is treated as a plain property on the object. For example, `animate(camera, { fov: 70 })` sets `camera.fov` (though a camera will still need `updateProjectionMatrix()` calling in your render loop).

### Cameras and orbit controls

A camera is an `Object3D`, so its position animates the same way:

```
animate(
  camera,
  { x: 0, y: 4, z: 6 },
  { type: "spring", visualDuration: 1, bounce: 0 }
)
```

You can also use Motion to provide throw animations to `OrbitControls` without Three's heavy damping:

Live example: https://examples.motion.dev/js/three-orbit

[`press()`](https://motion.dev/docs/press) pauses the spin while you drag. On release, [`getVelocity()`](https://motion.dev/docs/motion-value#getvelocity) is the throw. `animate()` crossfades that velocity back to idle speed. Three's damping instead lags every drag and coasts to a stop.

### Materials

Material properties can be animated through the mesh, or on the material directly. Motion looks on the object first, then on its `material`.

```
// Via the mesh
animate(mesh, { color: "#f43f5e", opacity: 0.5 })

// Directly
animate(mesh.material, { roughness: 0.1, metalness: 1 })
```

Live example: https://examples.motion.dev/js/three-materials

### Vectors

Any `Vector2`, `Vector3` or `Vector4` property can be animated one axis at a time by adding an axis suffix to its name:

```
animate(material, { normalScaleX: 2, normalScaleY: 2 })
```

This works on the object, its material, and vector uniforms (see below).

### Shader uniforms

Three.js uniforms are `{ value }` objects. `animate()` accepts either a uniforms object, or the mesh that has bound uniforms:

```
const uniforms = {
  progress: { value: 0 },
  tint: { value: new THREE.Color("#22d3ee") },
  mouse: { value: new THREE.Vector2() },
}

const material = new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader })

// Several at once
animate(uniforms, { progress: 1, tint: "#fbbf24" })

// Via the mesh, alongside transforms
animate(mesh, { rotateY: 90, progress: 1, mouseX: 0.5 })
```

Live example: https://examples.motion.dev/js/three-uniforms

### TSL and node materials

With `WebGPURenderer` and the Three Shading Language, material slots hold "nodes" rather than values. If a slot holds a `uniform()` node, Motion drives that node instead of the plain property:

```
import { uniform } from "three/tsl"
import { MeshStandardNodeMaterial } from "three/webgpu"

const material = new MeshStandardNodeMaterial()
material.colorNode = uniform(new THREE.Color("#8b5cf6"))
material.opacityNode = uniform(1)

// Animates colorNode.value and opacityNode.value
animate(mesh, { color: "#f43f5e", opacity: 0.5 })
```

A standalone uniform node can be driven by a motion value bound with `threeEffect`:

```
const progress = uniform(0)
const progressValue = motionValue(0)

threeEffect(progress, { value: progressValue })

animate(progressValue, 1, { duration: 2 })
```

Nodes that aren't uniforms (a `mix()` or `sin()` expression, say) are compiled into the shader and can't be animated at runtime.

Live example: https://examples.motion.dev/js/three-tsl

### Transitions

All the usual [`animate` options](https://motion.dev/docs/animate#options) apply, including per-value overrides:

```
animate(
  mesh,
  { x: 2, color: "#f43f5e" },
  { type: "spring", color: { duration: 1, ease: "easeInOut" } }
)
```

The returned [controls](https://motion.dev/docs/animate#controls) work too, so you can `await` an animation or `stop()` it.

### Sequences and stagger

Three.js objects can be mixed with DOM elements in a sequence, or staggered as an array:

```
animate([
  ["h1", { opacity: 1 }],
  [mesh, { rotateY: 180 }, { at: "<" }],
  [uniforms, { progress: 1 }, { at: "-0.5" }],
])

animate(meshes, { y: 1 }, { delay: stagger(0.1) })
```

Live example: https://examples.motion.dev/js/three-sequence

## Motion values

Every animated property is backed by a [motion value](https://motion.dev/docs/motion-value). Repeated `animate()` calls on the same property reuse it, which is how a spring picks up the velocity of the animation it interrupts.

You can also bind your own motion values by calling `threeEffect` directly, the same way you'd use [`styleEffect`](https://motion.dev/docs/style-effect) on an element. It accepts objects, materials, uniforms objects and uniform nodes, writes once per frame, and returns a cleanup function.

```
import { animate, motionValue, transformValue } from "motion"
import { threeEffect } from "motion/three"

const x = motionValue(0)
const progress = transformValue(() => x.get() / 100)

const cancelObject = threeEffect(mesh, { x })
const cancelUniforms = threeEffect(uniforms, { progress })

// Moves the mesh and updates the uniform together
animate(x, 100, { type: "spring" })
```

A later `animate(mesh, { x: 200 })` finds and animates the same `x` motion value.

Live example: https://examples.motion.dev/js/three-motion-values

### Scroll

Because bound motion values update the scene every frame, [`scroll()`](https://motion.dev/docs/scroll) can drive Three.js directly. Set one progress value from scroll and derive everything else with `transformValue`:

```
import { motionValue, scroll, transformValue } from "motion"

const progress = motionValue(0)

threeEffect(mesh, {
  rotateY: transformValue(() => progress.get() * 90),
})
threeEffect(material, { opacity: progress })

scroll((value) => progress.set(value), { target: section })
```

Live example: https://examples.motion.dev/js/three-scroll

## Rendering

Motion writes to Three.js during the `preRender` step of its [frameloop](https://motion.dev/docs/frame). Render in the `render` step and every frame sees a complete set of values:

```
import { cancelFrame, frame } from "motion"

function render() {
  renderer.render(scene, camera)
}

frame.render(render, true)

// Later
cancelFrame(render)
```
