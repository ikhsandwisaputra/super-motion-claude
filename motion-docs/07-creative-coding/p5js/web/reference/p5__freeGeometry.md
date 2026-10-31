---
source: https://p5js.org/reference/p5/freeGeometry/
title: "freeGeometry"
fetched: 2026-10-28
---

Clears a [p5.Geometry](https://p5js.org/reference/p5/p5.Geometry) object from the graphics processing unit (GPU) memory.

[p5.Geometry](https://p5js.org/reference/p5/p5.Geometry) objects can contain lots of data about their vertices, surface normals, colors, and so on. Complex 3D shapes can use lots of memory which is a limited resource in many GPUs. Calling `freeGeometry()` works with [p5.Geometry](https://p5js.org/reference/p5/p5.Geometry) objects created with [buildGeometry()](https://p5js.org/reference/p5/buildGeometry/) and [loadModel()](https://p5js.org/reference/p5/loadModel/).

The parameter, `geometry`, is the [p5.Geometry](https://p5js.org/reference/p5/p5.Geometry) object to be freed.

Note: A [p5.Geometry](https://p5js.org/reference/p5/p5.Geometry) object can still be drawn after its resources are cleared from GPU memory. It may take longer to draw the first time it’s redrawn.

Note: `freeGeometry()` can only be used in WebGL mode.

## Examples

## Syntax

`freeGeometry(geometry)`

## Parameters

geometry

p5.Geometry: 3D shape whose resources should be freed.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/webgl/3d\_primitives.js](https://github.com/processing/p5.js/blob/v2.3.3/src/webgl/3d_primitives.js#L395) and open a pull request!

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
