---
source: https://p5js.org/reference/p5/lights/
title: "lights"
fetched: 2026-10-28
---

Places an ambient and directional light in the scene. The lights are set to ambientLight(128, 128, 128) and directionalLight(128, 128, 128, 0, 0, -1).

Note: lights need to be called (whether directly or indirectly) within draw() to remain persistent in a looping program. Placing them in setup() will cause them to only have an effect the first time through the loop.

## Examples

## Syntax

`lights()`

## Parameters

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/webgl/light.js](https://github.com/processing/p5.js/blob/v2.3.3/src/webgl/light.js#L995) and open a pull request!

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
// Double-click to turn on the lights.

let isLit = false;

function setup() {
  createCanvas(100, 100, WEBGL);

  describe('A white box drawn against a gray background. The quality of the light changes when the user double-clicks.');
}

function draw() {
  background(50);

  // Enable orbiting with the mouse.
  orbitControl();

  // Control the lights.
  if (isLit === true) {
    lights();
  }

  // Draw the box.
  box();
}

// Turn on the lights when the user double-clicks.
function doubleClicked() {
  isLit = true;
}
```

```js
// Click and drag the mouse to view the scene from different angles.

function setup() {
  createCanvas(100, 100, WEBGL);

  describe('A white box drawn against a gray background.');
}

function draw() {
  background(50);

  // Enable orbiting with the mouse.
  orbitControl();

  // Turn on the lights.
  ambientLight(128, 128, 128);
  directionalLight(128, 128, 128, 0, 0, -1);

  // Draw the box.
  box();
}
```
