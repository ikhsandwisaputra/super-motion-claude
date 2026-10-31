---
source: https://animejs.com/documentation/adapters/threejs-adapter
title: "Three.js adapter | Adapters | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Adapters](https://animejs.com/documentation/adapters "Adapters")

[Since 4.5.0](https://github.com/juliangarnier/anime/releases/tag/v4.5.0)

# [Three.js adapter NEW](https://animejs.com/documentation/adapters/threejs-adapter "Three.js adapter")

## [Animate Three.js objects directly with `animate()`, `createTimeline()`, and `utils.set()`.](https://animejs.com/documentation/adapters/threejs-adapter#animate-three-js-objects-directly-with-animate-createtimeline-and-utils-set)

[Three.js](https://threejs.org) animations typically require targeting multiple objects: `mesh.position`, `mesh.rotation`, `mesh.material`, and each uniform's `value`. Keeping them in sync usually involves a timeline. The Three.js adapter flattens these nested fields onto property names on the mesh, converts angles to degrees, parses CSS color values, and reduces the setup to a single `animate()` call.

### Without the adapter:

```js
createTimeline({
  defaults: {
    duration: 500,
    ease: 'inOutSine',
  }
})
.add(mesh.position, {
  x: 100,
  y: 50,
}, 0)
.add(mesh.rotation, {
  x: utils.degToRad(30),
  y: utils.degToRad(60),
}, 0)
.add(mesh.material, {
  opacity: 0.5,
}, 0)
.add(mesh.material.uniforms.uTint.value, {
  r: 0,
  g: 0.5,
  b: 1,
}, 0);
```

### With the adapter:

```js
animate(mesh, {
  x: 100,           // mesh.position.x
  y: 50,            // mesh.position.y
  rotateX: 30,      // mesh.rotation.x (degrees)
  rotateY: 60,      // mesh.rotation.y (degrees)
  opacity: 0.5,     // mesh.material.opacity
  uTint: '#0080ff', // mesh.material.uniforms.uTint.value
  duration: 500,
  ease: 'inOutSine',
});
```

## [Loading the Three.js adapter](https://animejs.com/documentation/adapters/threejs-adapter#loading-the-three-js-adapter)

Load the adapter as a side-effect import from the `'animejs/adapters/three'` [subpath](https://animejs.com/documentation/getting-started/module-imports "subpath") module:

```js
import 'animejs/adapters/three';
```

[Three.js](https://threejs.org) is an optional peer dependency. The adapter works with any version from `0.150.0`.

## [Using the adapter](https://animejs.com/documentation/adapters/threejs-adapter#using-the-adapter)

Once imported, Three.js objects can be passed directly to `animate()` and `utils.set()`. Common names like `x`, `rotateY`, `scale`, `opacity`, and `color` map to the corresponding field, and any other `Color`, `Vector2/3/4`, scalar, or boolean property on the target is detected automatically. Angle-named scalar fields such as `rotation` and `angle` are auto-converted between degrees and radians, so all rotation values are written and read in degrees.

Supported targets: `Object3D` and its subclasses (`Mesh`, lights, cameras, `Sprite`, `Points`, ...), `Material`, `Texture`, `Fog` / `FogExp2`, TSL `UniformNode`, and bare `Color` / `Vector2-4` instances.

```js
animate(mesh,    { x: 100, rotateY: 360, opacity: 0.5 });
animate(camera,  { fov: 60, focalLength: 35 });
animate(light,   { color: '#fffacd' });
animate(scene,   { background: '#1a1a2e' });
animate(texture, { offsetX: 1, rotation: Math.PI });
```

See [Object properties](https://animejs.com/documentation/adapters/threejs-adapter/threejs-object-property-adapter "Three.js object properties") for the full reference.

### Color

`Color` fields like `material.color`, `material.emissive`, `light.color`, `fog.color`, or `scene.background` accept any [color value](https://animejs.com/documentation/animation/tween-value-types/color-value "Color value"), including [CSS variables](https://animejs.com/documentation/animation/tween-value-types/css-variable "CSS variable").

```js
animate(material, { color: '#ff8800', emissive: '#0ff' });
animate(scene,    { background: 'rgb(20, 30, 40)' });
animate(light,    { color: 'hsl(200, 80%, 50%)' });
animate(material, { color: 'var(--accent)' });
```

### Vectors

`Vector2`, `Vector3`, and `Vector4` fields are split into per-axis names by appending `X`, `Y`, `Z`, or `W`.

```js
// material.normalScale.x / material.normalScale.y
animate(material, { normalScaleX: 0.5, normalScaleY: 1 });
// sprite.center.x
animate(sprite, { centerX: 0.25 });
// texture.offset.x / texture.offset.y
animate(texture, { offsetX: 1, offsetY: 0.5 });
```

### Shader uniforms and TSL slots

Uniforms on a `ShaderMaterial` and slots assigned to a `UniformNode` from `'three/tsl'` are exposed by name on the material, and on the parent mesh through the material shorthand. `Color` and `Vector` uniforms use the same naming rules as material fields.

```js
animate(shaderMaterial, { uTime: 1, uTint: '#0ff', uOffsetY: 0.5 });
animate(mesh,           { uTime: 1, uTint: '#0ff' });
```

See [Materials and uniforms](https://animejs.com/documentation/adapters/threejs-adapter/materials-and-uniforms "Three.js materials and uniforms") for the full reference.

## Three.js adapter code example

```js
import { animate, createTimer, stagger, utils } from 'animejs';
import * as THREE from 'three';
import { getInstances } from 'animejs/adapters/three';

// Three.js setup

const [ $container ] = utils.$('.full-container');
const color = utils.get($container, 'color');
const { clientWidth: width, clientHeight: height } = $container;

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, preserveDrawingBuffer: true });
renderer.shadowMap.enabled = true;
renderer.setSize(width, height);
renderer.setPixelRatio(window.devicePixelRatio);
$container.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
camera.position.z = 6;
scene.add(camera);

scene.add(new THREE.AmbientLight(0xffffff, 0.25));
const pointLight = new THREE.PointLight(0xffffff, 8, 20, 0.4);
pointLight.castShadow = true;
scene.add(pointLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 2);
dirLight.position.set(2, 3, 4);
scene.add(dirLight);

const gridSize = 4; // cubes per axis
const cellSize = 2 / gridSize; // size of each cube
const spread = (gridSize - 1) / 2 * cellSize; // distance from center to the outer cubes
const geometry = new THREE.BoxGeometry(cellSize, cellSize, cellSize);
const material = new THREE.MeshLambertMaterial({ color });
const mesh = new THREE.InstancedMesh(geometry, material, gridSize * gridSize * gridSize);
mesh.castShadow = mesh.receiveShadow = true;
scene.add(mesh);

// Animation with Three.js adapter

const instances = getInstances(mesh);

utils.set(instances, {
  x: stagger([-spread, spread], { grid: [gridSize, gridSize, gridSize], axis: 'x' }),
  y: stagger([-spread, spread], { grid: [gridSize, gridSize, gridSize], axis: 'y' }),
  z: stagger([-spread, spread], { grid: [gridSize, gridSize, gridSize], axis: 'z' }),
});

animate(mesh, {
  rotateY: { to: 360, duration: 9000 },
  rotateX: { to: 360, duration: 12000 },
  loop: true,
  ease: 'inOutQuad',
});

animate(pointLight, {
  intensity: [30, 0],
  duration: 2500,
  loop: true,
  loopDelay: 500,
  alternate: true,
  ease: 'out(3)',
});

animate(instances, {
  x: (instance) => instance.x * 10,
  y: (instance) => instance.y * 10,
  z: (instance) => instance.z * 10,
  duration: 2000,
  delay: stagger([0, 500], { grid: true, from: 'center', reversed: true, ease: 'in(3)' }),
  loop: true,
  loopDelay: 500,
  alternate: true,
  ease: 'inOutExpo',
});

createTimer({ onUpdate: () => renderer.render(scene, camera) });
```

```html
<div class="full-container"></div>
```

###### In this section

* [Object properties](https://animejs.com/documentation/adapters/threejs-adapter/threejs-object-property-adapter "Three.js object properties")
* [Extended transforms](https://animejs.com/documentation/adapters/threejs-adapter/threejs-transforms-adapter "Three.js extended transforms")
* [Materials & uniforms](https://animejs.com/documentation/adapters/threejs-adapter/materials-and-uniforms "Three.js materials and uniforms")
* [Instanced meshes](https://animejs.com/documentation/adapters/threejs-adapter/threejs-instanced-and-batched-meshes "Three.js instanced meshes")
* [Common gotchas](https://animejs.com/documentation/adapters/threejs-adapter/threejs-adapter-common-gotchas "Three.js common gotchas")

###### Previous

###### Next

* [Adapters](https://animejs.com/documentation/adapters "Adapters")
* [Three.js object properties](https://animejs.com/documentation/adapters/threejs-adapter/threejs-object-property-adapter "Three.js object properties")
