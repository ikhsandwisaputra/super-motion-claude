---
source: https://p5js.org/reference/p5/lightFalloff/
title: "lightFalloff"
fetched: 2026-10-28
---

Sets the falloff rate for [pointLight()](https://p5js.org/reference/p5/pointLight/) and [spotLight()](https://p5js.org/reference/p5/spotLight/).

A light’s falloff describes the intensity of its beam at a distance. For example, a lantern has a slow falloff, a flashlight has a medium falloff, and a laser pointer has a sharp falloff.

`lightFalloff()` has three parameters, `constant`, `linear`, and `quadratic`. They’re numbers used to calculate falloff at a distance, `d`, as follows:

`falloff = 1 / (constant + d * linear + (d * d) * quadratic)`

Note: `constant`, `linear`, and `quadratic` should always be set to values greater than 0.

## Examples

## Syntax

`lightFalloff(constant, linear, quadratic)`

## Parameters

constant

Number: constant value for calculating falloff.

linear

Number: linear value for calculating falloff.

quadratic

Number: quadratic value for calculating falloff.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/webgl/light.js](https://github.com/processing/p5.js/blob/v2.3.3/src/webgl/light.js#L1063) and open a pull request!

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
// Double-click to change the falloff rate.

let useFalloff = false;

function setup() {
  createCanvas(100, 100, WEBGL);

  describe('A sphere drawn against a gray background. The intensity of the light changes when the user double-clicks.');
}

function draw() {
  background(50);

  // Enable orbiting with the mouse.
  orbitControl();

  // Set the light falloff.
  if (useFalloff === true) {
    lightFalloff(2, 0, 0);
  }

  // Add a white point light from the front.
  pointLight(255, 255, 255, 0, 0, 100);

  // Style the sphere.
  noStroke();

  // Draw the sphere.
  sphere(30);
}

// Change the falloff value when the user double-clicks.
function doubleClicked() {
  useFalloff = true;
}
```
