---
source: https://p5js.org/reference/p5/createStorage/
title: "createStorage"
fetched: 2026-10-28
---

##### This feature requires the p5.webgpu.js addon.

##### This API is experimental

Its behavior may change in a future version of p5.js.

Creates a [`p5.StorageBuffer`](https://p5js.org/reference/p5/p5.StorageBuffer), which is a block of data that shaders can read from, and compute shaders can also write to. This is only available in WebGPU mode.

To read or write the data inside a shader, use [`uniformStorage()`](https://p5js.org/reference/p5/uniformStorage/). To update its contents from JavaScript, call [`.update()`](https://p5js.org/reference/p5.StorageBuffer/update/) on the result with new data.

Pass an array of objects to store a list of items, each with named properties. The properties can be numbers, arrays of numbers, vectors created with [`createVector()`](https://p5js.org/reference/p5/createVector/), or colors created with [`color()`](https://p5js.org/reference/p5/color/). Inside the shader, each item is accessed by index, and its properties are available by name.

You can also store a plain list of numbers by passing an array of numbers. Inside the shader, each number is accessed by index directly. To create an empty list to be filled in by a compute shader, pass a count instead.

## Examples

## Syntax

`createStorage(dataOrCount)`

## Parameters

dataOrCount

Number|Array|Float32Array|Object[]: Either a number specifying the count of floats, an array/Float32Array of floats, or an array of objects describing struct elements.

## Returns

p5.StorageBuffer: A storage buffer.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/core/p5.Renderer3D.js](https://github.com/processing/p5.js/blob/v2.3.3/src/core/p5.Renderer3D.js#L2183) and open a pull request!

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
let instanceData;
let instancesShader;
let instance;
let count = 5;

async function setup() {
  await createCanvas(200, 200, WEBGPU);

  let data = [];
  for (let i = 0; i < count; i++) {
    data.push({
      position: createVector(
        random(-1, 1) * width / 2,
        random(-1, 1) * height / 2,
        0,
      ),
      color: color(
        random(255),
        random(255),
        random(255)
      )
    });
  }
  instanceData = createStorage(data);
  instance = buildGeometry(drawInstance);
  instancesShader = buildMaterialShader(drawInstances);
  describe('Five spheres at random positions, each a different random color.');
}

function drawInstance() {
  sphere(15);
}

function drawInstances() {
  let data = uniformStorage(instanceData);
  let itemColor = sharedVec4();

  worldInputs.begin();
  let item = data[instanceID()];
  itemColor = item.color;
  worldInputs.position += item.position;
  worldInputs.end();

  finalColor.begin();
  finalColor.set(itemColor);
  finalColor.end();
}

function draw() {
  background(220);
  lights();
  noStroke();
  shader(instancesShader);
  model(instance, count);
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
