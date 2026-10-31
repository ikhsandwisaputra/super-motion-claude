---
source: https://p5js.org/reference/p5/buildComputeShader/
title: "buildComputeShader"
fetched: 2026-10-28
---

##### This feature requires the p5.webgpu.js addon.

##### This API is experimental

Its behavior may change in a future version of p5.js.

Create a new compute shader using p5.strands.

A compute shader lets you run many calculations all at once on your GPU. They are similar to a [`compute()`](https://p5js.org/reference/p5/for><code>for</code> loop,</a> but each iteration of theloop happens in parallel on the GPU rather than running one after the other.This makes them ideal for calculations or simulations involving many items.</p><p>You create a compute shader by passing a function to <code>buildComputeShader</code>.The function represents one iteration of a loop.</p><p>The compute shader can be run by calling <a href=/) and passing the shader in, along with the number of iterations in up to three dimensions. Use the [`index`](https://p5js.org/reference/p5/index/) vector inside of your iteration function to refer to the current iteration of the loop. The `x`, `y`, and `z` properties will count up from zero to the count in each dimension passed into `compute`.

A compute shader will read from and write to storage, which is often an array of numbers or objects. Use [`createStorage`](https://p5js.org/reference/p5/createStorage/) to construct initial data. Connect your iteration function to the storage by passing the storage into [`uniformStorage`](https://p5js.org/reference/p5/uniformStorage/).

Often, compute shaders are paired with [`model(myGeometry, count)`](https://p5js.org/reference/p5/model/) to draw one instance per object in the storage, and a shader that uses [`instanceID()`](https://p5js.org/reference/p5/instanceID/) to position each instance.

## Examples

## Syntax

`buildComputeShader(callback)`

## Parameters

callback

Function: A function building a p5.strands compute shader.

## Returns

p5.Shader: The compute shader.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/core/p5.Renderer3D.js](https://github.com/processing/p5.js/blob/v2.3.3/src/core/p5.Renderer3D.js#L2390) and open a pull request!

---

## Related References

* [read

  Reads data from a storage buffer back into JavaScript.](https://p5js.org/reference/p5.StorageBuffer/read/)
* [set

  Updates a single element in the buffer at a given index.](https://p5js.org/reference/p5.StorageBuffer/set/)
* [update

  Updates the data in the buffer with new values.](https://p5js.org/reference/p5.StorageBuffer/update/)
* [baseColorShader

  Returns the default shader used for fills when no lights or textures are activate.](https://p5js.org/reference/p5/baseColorShader/)

## Example code (extracted)

```js
let particles;
let computeShader;
let displayShader;
let instance;
const numParticles = 100;

async function setup() {
  await createCanvas(100, 100, WEBGPU);
  particles = createStorage(makeParticles(width / 2, height / 2));
  computeShader = buildComputeShader(simulate);
  displayShader = buildMaterialShader(display);
  instance = buildGeometry(drawParticle);
  describe('100 orange particles shooting outward.');
}

function makeParticles(x, y) {
  let data = [];
  for (let i = 0; i < numParticles; i++) {
    let angle = (i / numParticles) * TWO_PI;
    let speed = random(0.5, 2);
    data.push({
      position: createVector(x, y),
      velocity: createVector(cos(angle) * speed, sin(angle) * speed),
    });
  }
  return data;
}

function drawParticle() {
  sphere(2);
}

function simulate() {
  let data = uniformStorage(particles);
  let idx = index.x;
  data[idx].position = data[idx].position + data[idx].velocity;
}

function display() {
  let data = uniformStorage(particles);
  worldInputs.begin();
  let pos = data[instanceID()].position;
  worldInputs.position.xy += pos - [width / 2, height / 2];
  worldInputs.end();
}

function draw() {
  background(30);
  if (frameCount % 60 === 0) {
    particles.update(makeParticles(random(width), random(height)));
  }
  compute(computeShader, numParticles);
  noStroke();
  fill(255, 200, 50);
  shader(displayShader);
  model(instance, numParticles);
}
```

```js
let particles;
let computeShader;
let displayShader;
let instance;
const numParticles = 50;

async function setup() {
  await createCanvas(100, 100, WEBGPU);

  let data = [];
  for (let i = 0; i < numParticles; i++) {
    data.push({
      position: createVector(
        random(-40, 40),
        random(-40, 40)
      ),
      velocity: createVector(
        random(-1, 1),
        random(-1, 1)
      ),
    });
  }
  particles = createStorage(data);

  computeShader = buildComputeShader(simulate);
  displayShader = buildMaterialShader(display);
  instance = buildGeometry(drawParticle);
  describe('50 white spheres bouncing around the canvas.');
}

function drawParticle() {
  sphere(3);
}

function simulate() {
  let r = 3;
  let data = uniformStorage(particles);
  let idx = index.x;
  let pos = data[idx].position;
  let vel = data[idx].velocity;
  pos = pos + vel;
  if (pos.x > width/2 - r || pos.x < -height/2 + r) {
    vel.x = -vel.x;
    pos.x = clamp(pos.x, -width/2 + r, width/2 - r);
  }
  if (pos.y > height/2 - r || pos.y < -height/2 + r) {
    vel.y = -vel.y;
    pos.y = clamp(pos.y, -height/2 + r, height/2 - r);
  }
  data[idx].position = pos;
  data[idx].velocity = vel;
}

function display() {
  let data = uniformStorage(particles);
  worldInputs.begin();
  let pos = data[instanceID()].position;
  worldInputs.position.xy += pos;
  worldInputs.end();
}

function draw() {
  background(30);
  compute(computeShader, numParticles);
  noStroke();
  fill(255);
  lights();
  shader(displayShader);
  model(instance, numParticles);
}
```
