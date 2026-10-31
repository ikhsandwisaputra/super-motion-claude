---
source: https://p5js.org/reference/p5/noLights/
title: "noLights"
fetched: 2026-10-28
---

Removes all lights from the sketch.

Calling `noLights()` removes any lights created with [lights()](https://p5js.org/reference/p5/lights/), [ambientLight()](https://p5js.org/reference/p5/ambientLight/), [directionalLight()](https://p5js.org/reference/p5/directionalLight/), [pointLight()](https://p5js.org/reference/p5/pointLight/), or [spotLight()](https://p5js.org/reference/p5/spotLight/). These functions may be called after `noLights()` to create a new lighting scheme.

## Examples

## Syntax

`noLights()`

## Parameters

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/webgl/light.js](https://github.com/processing/p5.js/blob/v2.3.3/src/webgl/light.js#L1350) and open a pull request!

---

## Related References

* [ambientLight

  Creates a light that shines from all directions.](https://p5js.org/reference/p5/ambientLight/)
* [directionalLight

  Creates a light that shines in one direction.](https://p5js.org/reference/p5/directionalLight/)
* [imageLight

  Creates an ambient light from an image.](https://p5js.org/reference/p5/imageLight/)
* [lightFalloff

  Sets the falloff rate for pointLight() and spotLight().](https://p5js.org/reference/p5/lightFalloff/)

## Example code (extracted)

```js
// Click and drag the mouse to view the scene from different angles.

function setup() {
  createCanvas(100, 100, WEBGL);

  describe('Two spheres drawn against a gray background. The top sphere is white and the bottom sphere is red.');
}

function draw() {
  background(50);

  // Enable orbiting with the mouse.
  orbitControl();

  // Turn on the lights.
  lights();

  // Style the spheres.
  noStroke();

  // Draw the top sphere.
  push();
  translate(0, -25, 0);
  sphere(20);
  pop();

  // Turn off the lights.
  noLights();

  // Add a red directional light that points into the screen.
  directionalLight(255, 0, 0, 0, 0, -1);

  // Draw the bottom sphere.
  push();
  translate(0, 25, 0);
  sphere(20);
  pop();
}
```
