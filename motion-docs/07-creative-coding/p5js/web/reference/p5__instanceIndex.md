---
source: https://p5js.org/reference/p5/instanceIndex/
title: "instanceIndex"
fetched: 2026-10-28
---

##### This API is experimental

Its behavior may change in a future version of p5.js.

Returns the index of the current instance when drawing multiple copies of a shape with [`model(count)`](https://p5js.org/reference/p5/model/). The first instance has an index of `0`, the second has `1`, and so on.

This lets each copy of a shape behave differently. For example, you can use the index to place instances at different positions, give them different colors, or animate them at different speeds.

`instanceIndex` can only be used inside a p5.strands shader callback.

(Note: `instanceID()` is also available as a function for compatibility.)

If you are using WebGPU mode, a common pattern is to use `instanceIndex` to look up data made with [`createStorage()`](https://p5js.org/reference/p5/createStorage/). This lets you give each instance different properties.

This can be paired with [`buildComputeShader`](https://p5js.org/reference/p5/buildComputeShader/) to update the data being read.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/strands/p5.strands.js](https://github.com/processing/p5.js/blob/v2.3.3/src/strands/p5.strands.js#L212) and open a pull request!

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
let instancesShader;
let instance;
let count = 5;

function drawInstance() {
  sphere(15);
}

function setup() {
  createCanvas(200, 200, WEBGL);
  instance = buildGeometry(drawInstance);
  instancesShader = buildMaterialShader(drawSpaced);
  describe('Five red spheres arranged in a horizontal line.');
}

function drawSpaced() {
  worldInputs.begin();
  // Spread spheres evenly across the canvas based on their index
  let spacing = width / count;
  worldInputs.position.x +=
    (instanceIndex - (count - 1) / 2) * spacing;
  worldInputs.end();
}

function draw() {
  background(220);
  lights();
  noStroke();
  fill('red');
  shader(instancesShader);
  model(instance, count);
}
```

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
  let item = data[instanceIndex];
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
