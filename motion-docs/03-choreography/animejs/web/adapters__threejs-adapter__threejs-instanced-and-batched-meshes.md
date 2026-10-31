---
source: https://animejs.com/documentation/adapters/threejs-adapter/threejs-instanced-and-batched-meshes
title: "Three.js instanced meshes | Three.js adapter | Adapters | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Adapters](https://animejs.com/documentation/adapters "Adapters")

[Three.js](https://animejs.com/documentation/adapters/threejs-adapter "Three.js adapter")

[Since 4.5.0](https://github.com/juliangarnier/anime/releases/tag/v4.5.0)

# [Three.js instanced meshes](https://animejs.com/documentation/adapters/threejs-adapter/threejs-instanced-and-batched-meshes "Three.js instanced meshes")

## [Animate `InstancedMesh` and `BatchedMesh` slots one at a time through per-instance proxies.](https://animejs.com/documentation/adapters/threejs-adapter/threejs-instanced-and-batched-meshes#animate-instancedmesh-and-batchedmesh-slots-one-at-a-time-through-per-instance-proxies)

`getInstances(mesh)` returns one proxy per slot. The proxies accept the same property names as a regular mesh.

```js
import { animate, stagger } from 'animejs';
import { getInstances } from 'animejs/adapters/three';

const instances = getInstances(mesh);

animate(instances, {
  x: 100,
  scale: 2,
  delay: stagger(20),
});
```

## [getInstances](https://animejs.com/documentation/adapters/threejs-adapter/threejs-instanced-and-batched-meshes#getinstances)

Returns the array of per-instance proxies for `mesh`. Pass the array, a slice of it, or a single proxy to `animate()` and `utils.set()`.

```js
const instances = getInstances(mesh);
```

### Parameters

| Name | Accepts |
| --- | --- |
| mesh | An `InstancedMesh` or `BatchedMesh` |

### Returns

An `Array` of per-instance proxies. Deleted `BatchedMesh` slots are `null`.

The array reference stays the same across `mesh.count`, `addInstance()`, and `deleteInstance()`, so animations bound to it keep working as the instance count changes.

## [commitChanges](https://animejs.com/documentation/adapters/threejs-adapter/threejs-instanced-and-batched-meshes#commitchanges)

Flushes pending matrix writes for `mesh`. The adapter calls this automatically before each render. Call it yourself only if you read `mesh.instanceMatrix` between an animation tick and the next render.

```js
commitChanges(mesh);
```

### Parameters

| Name | Accepts |
| --- | --- |
| mesh | An `InstancedMesh` or `BatchedMesh` previously passed to `getInstances()` |

## [Per-instance properties](https://animejs.com/documentation/adapters/threejs-adapter/threejs-instanced-and-batched-meshes#per-instance-properties)

Each proxy carries the full `Object3D` transform set, the skew and `transformOrigin` axes, plus a `color` routed through `mesh.setColorAt()`.

| Name | Maps to |
| --- | --- |
| x / y / z | per-instance position |
| rotateX / Y / Z | per-instance rotation (degrees) |
| scaleX / Y / Z / scale | per-instance scale |
| skewX / Y / Z | per-instance skew (degrees) |
| transformOriginX / Y / Z | per-instance origin shift |
| transformOrigin | `'x y z'` shorthand |
| color | `mesh.setColorAt(id, color)` |
| visible | `mesh.setVisibleAt(id, value)` (`BatchedMesh` only) |

`opacity` writes the shared material, so it affects every instance. To fade individual slots, build an alpha channel into the material's shader and animate the per-instance `color`. `visible` is also a no-op on `InstancedMesh`, use `scale = 0` to hide a single instance.

After `getInstances()` runs, `mesh.onBeforeRender === fn` identity checks will not match, but assigning to it still works.

## Three.js instanced meshes code example

```js
import { animate, createTimer, stagger, utils } from 'animejs';
import * as THREE from 'three';
import { getInstances } from 'animejs/adapters/three';

// Three.js setup

const [ $container ] = utils.$('.full-container');
const { clientWidth: width, clientHeight: height } = $container;

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, preserveDrawingBuffer: true });
renderer.setSize(width, height);
renderer.setPixelRatio(window.devicePixelRatio);
$container.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, width / height, 0.01, 100);
camera.position.set(0, 0, 1.5);
scene.add(camera);

scene.add(new THREE.AmbientLight(0xffffff, 0.35));
const light = new THREE.DirectionalLight(0xffffff, 2);
light.position.set(2, 3, 4);
scene.add(light);

const gridSize = 6; // cubes per axis
const cellSize = 2 / gridSize; // size of each cube
const spread = (gridSize - 1) / 2 * cellSize; // distance from center to the outer cubes
const geometry = new THREE.BoxGeometry(cellSize, cellSize, cellSize);
const material = new THREE.MeshLambertMaterial();
const mesh = new THREE.InstancedMesh(geometry, material, gridSize * gridSize * gridSize);
scene.add(mesh);

// Animation with Three.js adapter

const instances = getInstances(mesh);
const palette = ['red', 'orange', 'yellow', 'green', 'sky', 'purple', 'pink']
  .map(name => utils.get($container, `--hex-${name}-1`));
const gridAxis = (axis, span = spread) => stagger([-span, span], { grid: [gridSize, gridSize, gridSize], axis });

// Slowly rotate the whole mesh
animate(mesh, {
  rotateY: 360,
  rotateX: 360,
  duration: 24000,
  loop: true,
  ease: 'linear',
});

// Color, scale and spread each instance, staggered from the center
animate(instances, {
  color: palette,
  x: [gridAxis('x', spread * .25), gridAxis('x')],
  y: [gridAxis('y', spread * .25), gridAxis('y')],
  z: [gridAxis('z', spread * .25), gridAxis('z')],
  scale: [.1, .25, .1],
  delay: stagger([0, 3000], { grid: [gridSize, gridSize, gridSize], from: 'center', reversed: true }),
  duration: 2000,
  loopDelay: 500,
  loop: true,
  alternate: true,
  ease: 'inOutQuad',
});

createTimer({ onUpdate: () => renderer.render(scene, camera) });
```

```html
<div class="full-container"></div>
```

###### Previous

###### Next

* [Three.js materials and uniforms](https://animejs.com/documentation/adapters/threejs-adapter/materials-and-uniforms "Three.js materials and uniforms")
* [Three.js common gotchas](https://animejs.com/documentation/adapters/threejs-adapter/threejs-adapter-common-gotchas "Three.js common gotchas")
