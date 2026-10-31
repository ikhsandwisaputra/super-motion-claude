---
source: https://animejs.com/documentation/engine/engine-methods/update
title: "update() | Engine methods | Engine | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Engine](https://animejs.com/documentation/engine "Engine")

[Methods](https://animejs.com/documentation/engine/engine-methods "Engine methods")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [update()](https://animejs.com/documentation/engine/engine-methods/update "update()")

Manually ticks the engine when `engine.useDefaultMainLoop` is set to false.

```js
engine.useDefaultMainLoop = false;
engine.update(); // Manual update call
```

Useful for integrating Anime.js in projects with existing animation loops, such as [Three.js](https://threejs.org/) or game engines.

## [Returns](https://animejs.com/documentation/engine/engine-methods/update#returns)

[Engine](https://animejs.com/documentation/engine "Engine")

## update() code example

```js
import { engine, animate, utils } from 'animejs';
import * as THREE from 'three';
import 'animejs/adapters/three';

// Prevents Anime.js from using its own loop
engine.useDefaultMainLoop = false;

const [ $container ] = utils.$('.full-container');
const color = utils.get($container, 'color');
const { clientWidth: width, clientHeight: height } = $container;

// Three.js setup
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, preserveDrawingBuffer: true });
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(65, width / height, 0.1, 20);
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color, wireframe: true });

renderer.setSize(width, height);
renderer.setPixelRatio(window.devicePixelRatio);
$container.appendChild(renderer.domElement);
camera.position.z = 5;

function createAnimatedCube() {
  const cube = new THREE.Mesh(geometry, material);
  const r = () => utils.random(-720, 720, 1);
  scene.add(cube);
  // The three.js adapter maps x / y / z and rotateX / Y / Z (degrees) directly onto the mesh.
  animate(cube, {
    x: utils.random(-10, 10, 2),
    y: utils.random(-5, 5, 2),
    z: [-10, 7],
    rotateX: r,
    rotateY: r,
    rotateZ: r,
    delay: utils.random(0, 4000),
    duration: 4000,
    loop: true,
    ease: 'inSine',
  });
}

for (let i = 0; i < 40; i++) {
  createAnimatedCube();
}

function render() {
  engine.update(); // Manually update Anime.js engine
  renderer.render(scene, camera); // Render Three.js scene
}

// Calls the builtin Three.js animation loop
renderer.setAnimationLoop(render);
```

```html
<div class="full-container"></div>
```

###### Previous

###### Next

* [Engine methods](https://animejs.com/documentation/engine/engine-methods "Engine methods")
* [pause()](https://animejs.com/documentation/engine/engine-methods/pause "pause()")
