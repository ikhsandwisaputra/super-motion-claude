---
source: https://animejs.com/documentation/adapters/threejs-adapter/materials-and-uniforms
title: "Three.js materials and uniforms | Three.js adapter | Adapters | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Adapters](https://animejs.com/documentation/adapters "Adapters")

[Three.js](https://animejs.com/documentation/adapters/threejs-adapter "Three.js adapter")

[Since 4.5.0](https://github.com/juliangarnier/anime/releases/tag/v4.5.0)

# [Three.js materials and uniforms](https://animejs.com/documentation/adapters/threejs-adapter/materials-and-uniforms "Three.js materials and uniforms")

## [Animate Three.js materials, their shader uniforms, and TSL slots directly with `animate()` and `utils.set()`.](https://animejs.com/documentation/adapters/threejs-adapter/materials-and-uniforms#animate-three-js-materials-their-shader-uniforms-and-tsl-slots-directly-with-animate-and-utils-set)

Target the material itself, or its parent `Mesh` (see Mesh material mapping below).

```js
animate(material, {
  emissive: '#0ff',
  metalness: 1,
  roughness: 0.2,
  uTime: 1,
  uOffsetY: 0.5,
});
```

## [Material fields](https://animejs.com/documentation/adapters/threejs-adapter/materials-and-uniforms#material-fields)

Every `Color`, scalar, boolean, and `Vector` field on built-in materials (`MeshStandardMaterial`, `MeshPhysicalMaterial`, `MeshToonMaterial`, ...) is animatable by name. `Vector` fields split into per-axis names.

| Field kind | Examples | Names |
| --- | --- | --- |
| Scalar / boolean | `metalness`, `roughness`, `opacity`, `wireframe` | direct name |
| `Color` | `color`, `emissive`, `specular`, `sheenColor` | direct name |
| `Vector` axis | `normalScale`, `clearcoatNormalScale` | `normalScaleX` / `normalScaleY` |

## [ShaderMaterial uniforms](https://animejs.com/documentation/adapters/threejs-adapter/materials-and-uniforms#shadermaterial-uniforms)

Custom uniforms animate by their uniform name. Scalars and `Color` uniforms use the name directly, `Vector2/3/4` uniforms expose per-axis names.

```js
const shader = new ShaderMaterial({
  uniforms: {
    tint:       { value: new Color('#f00') },
    intensity:  { value: 0.5 },
    resolution: { value: new Vector2(1024, 768) },
  },
  // ...
});

animate(shader, { tint: '#0ff', intensity: 1, resolutionX: 2048 });
```

## [TSL `NodeMaterial` slots](https://animejs.com/documentation/adapters/threejs-adapter/materials-and-uniforms#tsl-nodematerial-slots)

Slots assigned to a `UniformNode` from the `uniform()` factory animate by the slot name on the material.

```js
import { uniform } from 'three/tsl';

material.colorNode  = uniform(new Color('#f00'));
material.offsetNode = uniform(new Vector3());

animate(material, { colorNode: '#0f0', offsetNodeY: 0.5 });
```

## [Bare uniform nodes](https://animejs.com/documentation/adapters/threejs-adapter/materials-and-uniforms#bare-uniform-nodes)

A `UniformNode` can also be animated directly, useful when the same uniform is shared across several materials. Use `value` for scalars, `color` for colors, and `x` / `y` / `z` / `w` for vectors.

```js
animate(uniform(0),                { value: 1 });
animate(uniform(new Color()),      { color: '#0f0' });
animate(uniform(new Vector3()),    { x: 1, y: 0.5 });
```

## [Mesh material mapping](https://animejs.com/documentation/adapters/threejs-adapter/materials-and-uniforms#mesh-material-mapping)

Material fields, `ShaderMaterial` uniforms, and TSL slots are also reachable through the parent `Mesh`. Writing the name on the mesh sets `mesh.material[name]`, so you don't need to target the material separately.

```js
animate(mesh, { metalness: 1, emissive: '#0ff', uTime: 1 });
// equivalent to: animate(mesh.material, { metalness: 1, emissive: '#0ff', uTime: 1 });
```

Writes go to `mesh.material` directly, so sharing a material across meshes means animating one updates them all. Clone the material per mesh to scope an animation, and remember to set `material.transparent = true` on any material whose `opacity` is animated, otherwise Three.js renders it fully opaque.

Uniforms whose value is itself a `Texture`, `Matrix3`, or `Matrix4`, as well as `UniformArrayNode` and `BufferNode`, are not handled. Animate `Texture` transforms directly on the texture (see [Object properties](https://animejs.com/documentation/adapters/threejs-adapter/threejs-object-property-adapter "Three.js object properties")), or animate the underlying numeric fields.

## Three.js materials and uniforms code example

```js
import { animate, createTimer, utils } from 'animejs';
import * as THREE from 'three';
import 'animejs/adapters/three';

// Three.js setup

const [ $container ] = utils.$('.full-container');
const { clientWidth: width, clientHeight: height } = $container;

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, preserveDrawingBuffer: true });
renderer.setSize(width, height);
renderer.setPixelRatio(window.devicePixelRatio);
$container.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
camera.position.set(0, 0, 8);
scene.add(camera);

scene.add(new THREE.AmbientLight(0xffffff, 0.15));
const dirLight = new THREE.DirectionalLight(0xffffff, 5);
dirLight.position.set(3, 2, 3);
const lightRig = new THREE.Group().add(dirLight);
scene.add(lightRig);

// Three spheres sharing a single geometry
const sphereGeometry = new THREE.SphereGeometry(0.8, 64, 64);

// Sphere 1: built-in MeshStandardMaterial
const standard = new THREE.Mesh(sphereGeometry, new THREE.MeshStandardMaterial());
standard.position.set(-2.5, -0.25, 0);
scene.add(standard);

// Vertex wave deformation along the normal, with an optional rim light
function applyWave(material, { rim = false } = {}) {
  material.uniforms = {
    uTime: { value: 0 },
    uAmplitude: { value: 0.04 },
    uFrequency: { value: new THREE.Vector3(3, 3, 3) },
  };
  if (rim) material.uniforms.uRim = { value: 0 };
  material.onBeforeCompile = shader => {
    Object.assign(shader.uniforms, material.uniforms);
    shader.vertexShader = `
      uniform float uTime;
      uniform float uAmplitude;
      uniform vec3 uFrequency;
    ` + shader.vertexShader.replace('#include <begin_vertex>', `
      #include <begin_vertex>
      float w = sin(uTime + position.x * uFrequency.x)
             + sin(uTime + position.y * uFrequency.y)
             + sin(uTime + position.z * uFrequency.z);
      transformed += normal * w * uAmplitude;
    `);
    if (rim) {
      shader.fragmentShader = `
        uniform float uRim;
      ` + shader.fragmentShader.replace('#include <dithering_fragment>', `
        #include <dithering_fragment>
        gl_FragColor.rgb += pow(1.0 - max(vNormal.z, 0.0), 3.0) * uRim;
      `);
    }
  };
  return material;
}

// Sphere 2: MeshStandardMaterial with the wave vertex hook
const waveMaterial = applyWave(new THREE.MeshStandardMaterial({ metalness: 0.4, roughness: 0.3 }), { rim: true });
const waveSphere = new THREE.Mesh(sphereGeometry, waveMaterial);
waveSphere.position.set(0, -0.25, 0);
scene.add(waveSphere);

// Sphere 3: MeshToonMaterial with a hard 2-band ramp for darker shadows
const toonRamp = new THREE.DataTexture(new Uint8Array([17, 17, 17, 255, 255, 255, 255, 255]), 2, 1);
toonRamp.magFilter = toonRamp.minFilter = THREE.NearestFilter;
toonRamp.needsUpdate = true;

const toonMaterial = applyWave(new THREE.MeshToonMaterial({ gradientMap: toonRamp }));
const toon = new THREE.Mesh(sphereGeometry, toonMaterial);
toon.position.set(2.5, -0.25, 0);
scene.add(toon);

// Animation with Three.js adapter

// Rotate the light around the scene
animate(lightRig, {
  rotateY: 360,
  duration: 6000,
  loop: true,
  ease: 'linear',
});

// Standard material fields auto-mapped through the mesh
animate(standard, {
  roughness: [1, 0.3, 1], // map to standard.material.roughness
  metalness: [0, 0.5, 0], // map to standard.material.metalness
  duration: 4000,
  loop: true,
});

// Wave sphere uniforms
animate(waveSphere, {
  uTime: { to: Math.PI * 2, ease: 'linear' }, // map to waveMaterial.uniforms.uTime.value
  uFrequencyX: () => utils.random(3, 10, 1), // map to waveMaterial.uniforms.uFrequency.value.x
  uFrequencyZ: () => utils.random(3, 10, 1), // map to waveMaterial.uniforms.uFrequency.value.z
  uAmplitude: () => utils.random(0.02, 0.08, 2), // map to waveMaterial.uniforms.uAmplitude.value
  uRim: [0, 0.5, 0], // map to waveMaterial.uniforms.uRim.value
  duration: 4000,
  loop: true,
  onLoop: self => self.refresh(),
});

// Toon sphere uniforms
animate(toon, {
  uTime: { to: Math.PI * 2, ease: 'linear' }, // map to toonMaterial.uniforms.uTime.value
  uFrequencyX: () => utils.random(50, 100),
  uFrequencyZ: () => utils.random(50, 100),
  uAmplitude: () => utils.random(0.05, 0.1, 2),
  duration: 3000,
  loop: true,
  onLoop: self => self.refresh(),
});

// Shared color cycle across all three spheres
animate([standard, waveSphere, toon], {
  color: ['var(--hex-green-1)', 'var(--hex-sky-1)', 'var(--hex-yellow-1)', 'var(--hex-green-1)'],
  duration: 6000,
  loop: true,
});

createTimer({ onUpdate: () => renderer.render(scene, camera) });
```

```html
<div class="full-container"></div>
```

###### Previous

###### Next

* [Three.js extended transforms](https://animejs.com/documentation/adapters/threejs-adapter/threejs-transforms-adapter "Three.js extended transforms")
* [Three.js instanced meshes](https://animejs.com/documentation/adapters/threejs-adapter/threejs-instanced-and-batched-meshes "Three.js instanced meshes")
