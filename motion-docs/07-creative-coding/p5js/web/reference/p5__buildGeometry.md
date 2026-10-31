---
source: https://p5js.org/reference/p5/buildGeometry/
title: "buildGeometry"
fetched: 2026-10-28
---

Creates a custom [p5.Geometry](https://p5js.org/reference/p5/p5.Geometry) object from simpler 3D shapes.

`buildGeometry()` helps with creating complex 3D shapes from simpler ones such as [sphere()](https://p5js.org/reference/p5/sphere/). It can help to make sketches more performant. For example, if a complex 3D shape doesn’t change while a sketch runs, then it can be created with `buildGeometry()`. Creating a [p5.Geometry](https://p5js.org/reference/p5/p5.Geometry) object once and then drawing it will run faster than repeatedly drawing the individual pieces.

The parameter, `callback`, is a function with the drawing instructions for the new [p5.Geometry](https://p5js.org/reference/p5/p5.Geometry) object. It will be called once to create the new 3D shape. Note: `buildGeometry()` can only be used in WebGL mode.

## Examples

## Syntax

`buildGeometry(callback)`

## Parameters

callback

Function: function that draws the shape.

## Returns

p5.Geometry: new 3D shape.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/webgl/3d\_primitives.js](https://github.com/processing/p5.js/blob/v2.3.3/src/webgl/3d_primitives.js#L306) and open a pull request!

---

## Related References

* [calculateBoundingBox

  Calculates the position and size of the smallest box that contains the geometry.](https://p5js.org/reference/p5.Geometry/calculateBoundingBox/)
* [clearColors

  Removes the geometry’s internal colors.](https://p5js.org/reference/p5.Geometry/clearColors/)
* [computeFaces

  Computes the geometry's faces using its vertices.](https://p5js.org/reference/p5.Geometry/computeFaces/)
* [computeNormals

  Calculates the normal vector for each vertex on the geometry.](https://p5js.org/reference/p5.Geometry/computeNormals/)

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
  background(50);

  // Enable orbiting with the mouse.
  orbitControl();

  // Turn on the lights.
  lights();

  // Style the p5.Geometry object.
  noStroke();

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

  // Create the arrow.
  shape = buildGeometry(createArrow);

  describe('A white arrow drawn on a gray background.');
}

function draw() {
  background(50);

  // Enable orbiting with the mouse.
  orbitControl();

  // Turn on the lights.
  lights();

  // Style the arrow.
  noStroke();

  // Draw the arrow.
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

let button;
let particles;

function setup() {
  createCanvas(100, 100, WEBGL);

  // Create a button to reset the particle system.
  button = createButton('Reset');

  // Call resetModel() when the user presses the button.
  button.mousePressed(resetModel);

  // Add the original set of particles.
  resetModel();

  describe('A set of white spheres on a gray background. The spheres are positioned randomly. Their positions reset when the user presses the Reset button.');
}

function draw() {
  background(50);

  // Enable orbiting with the mouse.
  orbitControl();

  // Turn on the lights.
  lights();

  // Style the particles.
  noStroke();

  // Draw the particles.
  model(particles);
}

function resetModel() {
  // If the p5.Geometry object has already been created,
  // free those resources.
  if (particles) {
    freeGeometry(particles);
  }

  // Create a new p5.Geometry object with random spheres.
  particles = buildGeometry(createParticles);
}

function createParticles() {
  for (let i = 0; i < 60; i += 1) {
    // Calculate random coordinates.
    let x = randomGaussian(0, 20);
    let y = randomGaussian(0, 20);
    let z = randomGaussian(0, 20);

    push();
    // Translate to the particle's coordinates.
    translate(x, y, z);
    // Draw the particle.
    sphere(5);
    pop();
  }
}
```
