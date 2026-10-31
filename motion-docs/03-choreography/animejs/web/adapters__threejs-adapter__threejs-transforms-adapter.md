---
source: https://animejs.com/documentation/adapters/threejs-adapter/threejs-transforms-adapter
title: "Three.js extended transforms | Three.js adapter | Adapters | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Adapters](https://animejs.com/documentation/adapters "Adapters")

[Three.js](https://animejs.com/documentation/adapters/threejs-adapter "Three.js adapter")

[Since 4.5.0](https://github.com/juliangarnier/anime/releases/tag/v4.5.0)

# [Three.js extended transforms](https://animejs.com/documentation/adapters/threejs-adapter/threejs-transforms-adapter "Three.js extended transforms")

## [A CSS-like transforms API for Three.js 3D objects and instanced meshes.](https://animejs.com/documentation/adapters/threejs-adapter/threejs-transforms-adapter#a-css-like-transforms-api-for-three-js-3d-objects-and-instanced-meshes)

Position, rotation, and scale animate per-axis like in CSS. The adapter also adds `skew` and `transformOrigin` on top of the built-in Three.js transforms. The same names work on [per-instance proxies](https://animejs.com/documentation/adapters/threejs-adapter/threejs-instanced-and-batched-meshes "Three.js instanced meshes") from `getInstances()` for `InstancedMesh` and `BatchedMesh`, so individual instances can be transformed independently.

```js
animate(mesh, {
  x: 100,
  rotateY: 360,
  scale: 1.5,
  skewX: 15,
  transformOrigin: '0 1 0',
});
```

## [Position, rotation and scale](https://animejs.com/documentation/adapters/threejs-adapter/threejs-transforms-adapter#position-rotation-and-scale)

`x` / `y` / `z` write to `mesh.position`. `rotateX` / `rotateY` / `rotateZ` write to `mesh.rotation` in degrees. `scaleX` / `scaleY` / `scaleZ` write to `mesh.scale`, with `scale` as a shorthand for all three.

| Name | Maps to | Unit |
| --- | --- | --- |
| x | `mesh.position.x` | — |
| y | `mesh.position.y` | — |
| z | `mesh.position.z` | — |
| rotateX | `mesh.rotation.x` | degrees |
| rotateY | `mesh.rotation.y` | degrees |
| rotateZ | `mesh.rotation.z` | degrees |
| scaleX | `mesh.scale.x` | — |
| scaleY | `mesh.scale.y` | — |
| scaleZ | `mesh.scale.z` | — |
| scale | `mesh.scale.x` / `.y` / `.z` (uniform) | — |

Rotations assume the default Euler order `'XYZ'`. Animating `rotateX` / `rotateY` / `rotateZ` on a target whose `rotation.order` has been changed will not match what the property names suggest.

## [Skew](https://animejs.com/documentation/adapters/threejs-adapter/threejs-transforms-adapter#skew)

`skewX` and `skewY` apply CSS-style angular shears on the X and Y axes. `skewZ` shears `z` by `x` in the same fashion. All three are applied after position / rotation / scale, and skipped when their value is `0`.

| Name | Maps to | Unit |
| --- | --- | --- |
| skewX | `tan(skewX)` shear of `y` by `x` | degrees |
| skewY | `tan(skewY)` shear of `x` by `y` | degrees |
| skewZ | `tan(skewZ)` shear of `z` by `x` | degrees |

## [Transform origin](https://animejs.com/documentation/adapters/threejs-adapter/threejs-transforms-adapter#transform-origin)

Matches the CSS property: shifts the pivot used by skew and rotation. Values are in the target's geometry units.

| Name | Maps to | Notes |
| --- | --- | --- |
| transformOriginX | origin shift on the X axis | — |
| transformOriginY | origin shift on the Y axis | — |
| transformOriginZ | origin shift on the Z axis | — |
| transformOrigin | `'x y z'` shorthand | 3-token string, all axes at once |

## [Automatic visibility toggle](https://animejs.com/documentation/adapters/threejs-adapter/threejs-transforms-adapter#automatic-visibility-toggle)

Setting any scale axis or `opacity` to `0` flips `target.visible` to `false`, so meshes that have been faded or scaled out of view are skipped during render. Returning to a non-zero value restores `target.visible = true`.

The visibility flip only fires when the property is written through `animate()` or `utils.set()`. Direct mutation of `mesh.scale.x = 0` or `mesh.material.opacity = 0` outside the adapter does not touch `mesh.visible`.

## Three.js extended transforms code example

```js
import { animate, createTimer, utils } from 'animejs';
import * as THREE from 'three';
import 'animejs/adapters/three';

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
const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
camera.position.set(0, 3, 8);
camera.lookAt(0, 0.2, 0);
const cameraRig = new THREE.Group().add(camera);
scene.add(cameraRig);

scene.add(new THREE.AmbientLight(0xffffff, 0.3));
const spot = new THREE.SpotLight(0xffffff, 100, 12, Math.PI / 5, 0.4);
spot.position.set(0, 5, 0);
spot.castShadow = true;
scene.add(spot);

const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
dirLight.position.set(2, 3, 4);
scene.add(dirLight);

const groundGeometry = new THREE.PlaneGeometry(12, 12);
const groundMaterial = new THREE.MeshLambertMaterial({ color });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);

const gridColorA = utils.get($container, '--hex-current-1');
const gridColorB = utils.get($container, '--hex-current-3');
const grid = new THREE.GridHelper(12, 24, gridColorA, gridColorB);
grid.position.y = 0.001;
scene.add(grid);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const cubes = [-2, 0, 2].map(x => {
  const cube = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial());
  cube.position.set(x, 0.5, 0);
  cube.castShadow = cube.receiveShadow = true;
  scene.add(cube);
  return cube;
});

// Animation with Three.js adapter

animate(cameraRig, {
  rotateY: 360,
  duration: 20000,
  loop: true,
  ease: 'linear',
});

utils.set(cubes[0], { color: 'var(--hex-red-1)' });
utils.set(cubes[1], { color: 'var(--hex-citrus-1)', transformOriginY: -0.5 });
utils.set(cubes[2], { color: 'var(--hex-green-1)', transformOrigin: '-.5 -.5 .5' });

// Cube 1: small up and down with rotation
animate(cubes[0], {
  y: [0.5, 1, 0.5],
  rotateY: 180,
  duration: 2000,
  loop: true,
  ease: 'inOutSine',
});

// Cube 2: skew left to right pivoting on its base
animate(cubes[1], {
  skewX: [-30, 30, 0, 0],
  skewZ: [0, 0, -30, 30],
  duration: 2000,
  alternate: true,
  loop: true,
  ease: 'inOutSine',
});

// Cube 3: scale with the origin sliding from one corner to the opposite
animate(cubes[2], {
  scale: [1, .25, 1],
  transformOrigin: ['-.5 -.5 .5', '.5 .5 -.5'],
  duration: 2000,
  alternate: true,
  loop: true,
  ease: 'inOutSine',
});

createTimer({ onUpdate: () => renderer.render(scene, camera) });
```

```html
<div class="full-container"></div>
```

###### Previous

###### Next

* [Three.js object properties](https://animejs.com/documentation/adapters/threejs-adapter/threejs-object-property-adapter "Three.js object properties")
* [Three.js materials and uniforms](https://animejs.com/documentation/adapters/threejs-adapter/materials-and-uniforms "Three.js materials and uniforms")
