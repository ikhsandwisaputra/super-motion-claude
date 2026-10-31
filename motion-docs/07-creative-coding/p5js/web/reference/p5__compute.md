---
source: https://p5js.org/reference/p5/compute/
title: "compute"
fetched: 2026-10-28
---

##### This feature requires the p5.webgpu.js addon.

##### This API is experimental

Its behavior may change in a future version of p5.js.

Dispatches a compute shader to run on the GPU.

The first parameter, `shader`, is a compute shader created with [`buildComputeShader`](https://p5js.org/reference/p5/buildComputeShader/).

Pass a number for `x` to run a simple loop. Inside the shader's iteration function, [`index.x`](https://p5js.org/reference/p5/index/) will count up from 0 to that number.

You can also pass `y` and `z` to loop in up to three dimensions, using `index.y` and `index.z` to get the position in each. This is useful for working with 2D grids, like in the Game of Life example below.

## Examples

## Syntax

`compute(shader, x, [y], [z])`

## Parameters

shader

p5.Shader: The compute shader to run.

x

Number: Number of invocations in the X dimension.

y

Number: Number of invocations in the Y dimension.

z

Number: Number of invocations in the Z dimension.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/core/p5.Renderer3D.js](https://github.com/processing/p5.js/blob/v2.3.3/src/core/p5.Renderer3D.js#L2574) and open a pull request!

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

```js
let cells;
let nextCells;
let gameShader;
let displayShader;
const W = 100;
const H = 100;

async function setup() {
  await createCanvas(100, 100, WEBGPU);

  let initial = new Float32Array(W * H);
  for (let i = 0; i < initial.length; i++) {
    initial[i] = random() > 0.7 ? 1 : 0;
  }
  cells = createStorage(initial);
  nextCells = createStorage(W * H);

  gameShader = buildComputeShader(simulate);
  displayShader = buildFilterShader(display);
  describe('An animated Game of Life simulation displayed as black and white pixels.');
}

function simulate() {
  let current = uniformStorage(() => cells);
  let next = uniformStorage(() => nextCells);
  let w = uniformInt(() => W);
  let h = uniformInt(() => H);
  let x = index.x;
  let y = index.y;

  let n = 0;
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (dx != 0 || dy != 0) {
        let nx = (x + dx + w) % w;
        let ny = (y + dy + h) % h;
        n += current[ny * w + nx];
      }
    }
  }

  let alive = current[y * w + x];
  let nextOutput = 0;
  if (alive == 1) {
    if (abs(n - 2) < 0.1 || abs(n - 3) < 0.1) {
      nextOutput = 1;
    }
  } else {
    if (abs(n - 3) < 0.1) {
      nextOutput = 1;
    }
  }
  next[y * w + x] = nextOutput;
}

function display() {
  let data = uniformStorage(() => cells);
  let w = uniformInt(() => W);
  let h = uniformInt(() => H);

  filterColor.begin();
  let x = floor(filterColor.texCoord.x * w);
  let y = floor(filterColor.texCoord.y * h);
  let alive = data[y * w + x];
  filterColor.set([alive, alive, alive, 1]);
  filterColor.end();
}

function draw() {
  compute(gameShader, W, H);
  [nextCells, cells] = [cells, nextCells];
  filter(displayShader);
}
```
