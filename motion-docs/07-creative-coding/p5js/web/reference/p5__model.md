---
source: https://p5js.org/reference/p5/model/
title: "model"
fetched: 2026-10-28
---

Draws a [p5.Geometry](https://p5js.org/reference/p5/p5.Geometry) object to the canvas.

The first parameter, `model`, is the [p5.Geometry](https://p5js.org/reference/p5/p5.Geometry) object to draw. [p5.Geometry](https://p5js.org/reference/p5/p5.Geometry) objects can be built with [buildGeometry()](https://p5js.org/reference/p5/buildGeometry/). They can also be loaded from a file with [loadGeometry()](https://p5js.org/reference/p5/loadGeometry/).

Note: `model()` can only be used in WebGL mode.

Multiple instances can be drawn at once with `model(geometry, count)`. On its own, all the instances get drawn to the same spot, but you can use [`instanceID()`](https://p5js.org/reference/p5/instanceID/) inside of a shader to handle each instance. At large counts, this often runs faster than using a `for` loop.

## Examples

## Syntax

`model(model, [count])`

## Parameters

model

p5.Geometry: 3D shape to be drawn.

count

Number: number of instances to draw.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/webgl/loading.js](https://github.com/processing/p5.js/blob/v2.3.3/src/webgl/loading.js#L1124) and open a pull request!

---

## Related References

* [createModel

  Load a 3d model from an OBJ or STL string.](https://p5js.org/reference/p5/createModel/)
* [loadModel

  Loads a 3D model to create a p5.Geometry object.](https://p5js.org/reference/p5/loadModel/)
* [model

  Draws a p5.Geometry object to the canvas.](https://p5js.org/reference/p5/model/)

## Example code (extracted)

```js
// Click and drag the mouse to view the scene from different angles.

let shape;

function setup() {
  createCanvas(100, 100, WEBGL);

  // Create the p5.Geometry object.
  shape = buildGeometry(createShape);

  describe('A white cone drawn on a gray background.');
}

function draw() {
  background(200);

  // Enable orbiting with the mouse.
  orbitControl();

  // Draw the p5.Geometry object.
  model(shape);
}

// Create p5.Geometry object from a single cone.
function createShape() {
  cone();
}
```

```js
// Click and drag the mouse to view the scene from different angles.

let shape;

function setup() {
  createCanvas(100, 100, WEBGL);

  // Create the p5.Geometry object.
  shape = buildGeometry(createArrow);

  describe('Two white arrows drawn on a gray background. The arrow on the right rotates slowly.');
}

function draw() {
  background(50);

  // Enable orbiting with the mouse.
  orbitControl();

  // Turn on the lights.
  lights();

  // Style the arrows.
  noStroke();

  // Draw the p5.Geometry object.
  model(shape);

  // Translate and rotate the coordinate system.
  translate(30, 0, 0);
  rotateZ(frameCount * 0.01);

  // Draw the p5.Geometry object again.
  model(shape);
}

function createArrow() {
  // Add shapes to the p5.Geometry object.
  push();
  rotateX(PI);
  cone(10);
  translate(0, -10, 0);
  cylinder(3, 20);
  pop();
}
```

```js
// Click and drag the mouse to view the scene from different angles.

let shape;

async function setup() {
  shape = await loadModel('/assets/octahedron.obj');

  createCanvas(100, 100, WEBGL);

  describe('A white octahedron drawn against a gray background.');
}

function draw() {
  background(200);

  // Enable orbiting with the mouse.
  orbitControl();

  // Draw the shape.
  model(shape);
}
```

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
}

function drawSpaced() {
  worldInputs.begin();
  // Spread spheres evenly across the canvas based on their index
  let spacing = width / count;
  worldInputs.position.x +=
    (instanceID() - (count - 1) / 2) * spacing;
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
