---
source: https://animejs.com/documentation/adapters/threejs-adapter/threejs-object-property-adapter
title: "Three.js object properties | Three.js adapter | Adapters | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Adapters](https://animejs.com/documentation/adapters "Adapters")

[Three.js](https://animejs.com/documentation/adapters/threejs-adapter "Three.js adapter")

[Since 4.5.0](https://github.com/juliangarnier/anime/releases/tag/v4.5.0)

# [Three.js object properties](https://animejs.com/documentation/adapters/threejs-adapter/threejs-object-property-adapter "Three.js object properties")

## [Every property name the Three.js adapter exposes, grouped by target type.](https://animejs.com/documentation/adapters/threejs-adapter/threejs-object-property-adapter#every-property-name-the-three-js-adapter-exposes-grouped-by-target-type)

The names below map to specific Three.js fields or methods. Anything not listed falls through to the auto-detection covered in [the overview](https://animejs.com/documentation/adapters/threejs-adapter "Three.js adapter"), which detects `Color`, `Vector`, scalar, and boolean fields automatically, and converts angle-named fields (`rotation`, `angle`) between degrees and radians.

## [Object3D built-in mappings](https://animejs.com/documentation/adapters/threejs-adapter/threejs-object-property-adapter#object3d-built-in-mappings)

Available on every `Object3D` subclass: `Mesh`, `Group`, `Sprite`, `Points`, lights, cameras, ...

| Name | Maps to | Unit |
| --- | --- | --- |
| x | `target.position.x` | — |
| y | `target.position.y` | — |
| z | `target.position.z` | — |
| rotateX | `target.rotation.x` | degrees |
| rotateY | `target.rotation.y` | degrees |
| rotateZ | `target.rotation.z` | degrees |
| scaleX | `target.scale.x` | — |
| scaleY | `target.scale.y` | — |
| scaleZ | `target.scale.z` | — |
| scale | `target.scale.x` / `.y` / `.z` (uniform) | — |
| skewX | shear on the X axis | degrees |
| skewY | shear on the Y axis | degrees |
| skewZ | shear on the Z axis | degrees |
| transformOriginX | pivot shift on the X axis | — |
| transformOriginY | pivot shift on the Y axis | — |
| transformOriginZ | pivot shift on the Z axis | — |
| transformOrigin | `"x y z"` shorthand for all axes | — |

See [Extended transforms](https://animejs.com/documentation/adapters/threejs-adapter/threejs-transforms-adapter "Three.js extended transforms") for the rotation order, skew, and automatic visibility toggle.

## [Mesh built-in mappings](https://animejs.com/documentation/adapters/threejs-adapter/threejs-object-property-adapter#mesh-built-in-mappings)

Material shortcuts on top of the `Object3D` set.

| Name | Maps to | Notes |
| --- | --- | --- |
| opacity | `target.material.opacity` (or array) | flips `target.visible = false` at `0` |
| color | `target.material.color` | accepts any CSS color value |

## [Light built-in mappings](https://animejs.com/documentation/adapters/threejs-adapter/threejs-object-property-adapter#light-built-in-mappings)

Light-specific colors on top of the `Object3D` set. Numeric fields like `intensity`, `distance`, or `decay` fall through to direct property access. `SpotLight.angle` is auto-converted to degrees by the angle resolver.

| Name | Maps to | Available on |
| --- | --- | --- |
| color | `target.color` | All lights |
| groundColor | `target.groundColor` | `HemisphereLight` |

## [PerspectiveCamera built-in mappings](https://animejs.com/documentation/adapters/threejs-adapter/threejs-object-property-adapter#perspectivecamera-built-in-mappings)

Any projection change auto-calls `target.updateProjectionMatrix()`.

| Name | Maps to | Unit |
| --- | --- | --- |
| fov | `target.fov` | degrees |
| aspect | `target.aspect` | — |
| focalLength | `target.setFocalLength()` | mm |
| near | `target.near` | — |
| far | `target.far` | — |
| zoom | `target.zoom` | — |

## [OrthographicCamera built-in mappings](https://animejs.com/documentation/adapters/threejs-adapter/threejs-object-property-adapter#orthographiccamera-built-in-mappings)

Any projection change auto-calls `target.updateProjectionMatrix()`.

| Name | Maps to | Unit |
| --- | --- | --- |
| left | `target.left` | — |
| right | `target.right` | — |
| top | `target.top` | — |
| bottom | `target.bottom` | — |
| near | `target.near` | — |
| far | `target.far` | — |
| zoom | `target.zoom` | — |

## [Scene built-in mappings](https://animejs.com/documentation/adapters/threejs-adapter/threejs-object-property-adapter#scene-built-in-mappings)

| Name | Maps to | Notes |
| --- | --- | --- |
| background | `target.background` | a `Color` is created on first write if missing |

## [Audio built-in mappings](https://animejs.com/documentation/adapters/threejs-adapter/threejs-object-property-adapter#audio-built-in-mappings)

| Name | Maps to | Available on |
| --- | --- | --- |
| volume | `target.setVolume()` | `Audio`, `PositionalAudio` |
| refDistance | `target.setRefDistance()` | `PositionalAudio` |
| rolloffFactor | `target.setRolloffFactor()` | `PositionalAudio` |
| maxDistance | `target.setMaxDistance()` | `PositionalAudio` |

## [Fog built-in mappings](https://animejs.com/documentation/adapters/threejs-adapter/threejs-object-property-adapter#fog-built-in-mappings)

Fog scalars (`near`, `far`, `density`) fall through to direct property access.

| Name | Maps to | Available on |
| --- | --- | --- |
| color | `target.color` | `Fog`, `FogExp2` |

## [Texture built-in mappings](https://animejs.com/documentation/adapters/threejs-adapter/threejs-object-property-adapter#texture-built-in-mappings)

Texture transforms split into per-axis names, and `rotation` animates around `target.center`.

| Name | Maps to | Unit |
| --- | --- | --- |
| offsetX | `target.offset.x` | — |
| offsetY | `target.offset.y` | — |
| repeatX | `target.repeat.x` | — |
| repeatY | `target.repeat.y` | — |
| centerX | `target.center.x` | — |
| centerY | `target.center.y` | — |
| rotation | `target.rotation` | degrees |

## [UniformNode built-in mappings](https://animejs.com/documentation/adapters/threejs-adapter/threejs-object-property-adapter#uniformnode-built-in-mappings)

A `UniformNode` from `'three/tsl'` wraps a starting value (`Number`, `Boolean`, `Color`, or `Vector`). Animate the wrapped value through these names.

| Name | Maps to | Available when |
| --- | --- | --- |
| color | `target.value` | `Color`-valued uniforms |
| x | `target.value.x` | `Vector2` / `Vector3` / `Vector4` uniforms |
| y | `target.value.y` | `Vector2` / `Vector3` / `Vector4` uniforms |
| z | `target.value.z` | `Vector3` / `Vector4` uniforms |
| w | `target.value.w` | `Vector4` uniforms |

Scalar and boolean uniforms animate through `value` directly without needing a dedicated entry.

## Three.js object properties code example

```js
import { createTimeline, createTimer, utils } from 'animejs';
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
const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
camera.position.set(0, 2.5, 6);
camera.lookAt(0, 0, -3);
scene.add(camera);

const container = new THREE.Group();
scene.add(container);

const groundGeometry = new THREE.PlaneGeometry(12, 12);
const groundMaterial = new THREE.MeshLambertMaterial({ color });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
container.add(ground);

const gridColorA = utils.get($container, '--hex-current-1');
const gridColorB = utils.get($container, '--hex-current-3');
const grid = new THREE.GridHelper(12, 24, gridColorA, gridColorB);
grid.position.y = 0.001;
container.add(grid);

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshLambertMaterial({ color });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.y = 0.5;
cube.castShadow = true;
container.add(cube);

const spot = new THREE.SpotLight(0xffffff, 100, 12, Math.PI / 5, 0.4);
spot.position.set(0, 3, 0);
spot.castShadow = true;
spot.target = cube;
container.add(new THREE.AmbientLight(0xffffff, 0.3));
container.add(spot);

const spotHelper = new THREE.SpotLightHelper(spot, color);
container.add(spotHelper);

// Animation with Three.js adapter

createTimeline({ defaults: { duration: 5000, ease: 'linear', loop: true } })
  .add(container, {
    rotateY: 360, // map to container.rotation.y (degrees)
    duration: 40000,
  }, 0)
  .add(spot, {
    x: () => utils.random(-7, 7, 1), // map to spot.position.x
    y: () => utils.random(3, 4, 1), // map to spot.position.y
    z: () => utils.random(-7, 7, 1), // map to spot.position.z
    duration: 3000,
    ease: 'inOutSine',
    onLoop: self => self.refresh(),
  }, 0)
  .add(cube, {
    color: ['var(--hex-orange-1)', 'var(--hex-citrus-1)', 'var(--hex-green-1)'], // map to cube.material.color
    x: [-4, 0, 4], // map to cube.position.x
    y: {
      to: [0, 4 * Math.PI], // map to cube.position.y (via modifier)
      modifier: value => 0.5 * (Math.abs(Math.sin(value)) + Math.abs(Math.cos(value))),
    },
    rotateZ: [360, 0, -360], // map to cube.rotation.z (degrees)
    alternate: true,
    onUpdate: () => spotHelper.update(),
  }, 0);

createTimer({ onUpdate: () => renderer.render(scene, camera) });
```

```html
<div class="full-container"></div>
```

###### Previous

###### Next

* [Three.js adapter](https://animejs.com/documentation/adapters/threejs-adapter "Three.js adapter")
* [Three.js extended transforms](https://animejs.com/documentation/adapters/threejs-adapter/threejs-transforms-adapter "Three.js extended transforms")
