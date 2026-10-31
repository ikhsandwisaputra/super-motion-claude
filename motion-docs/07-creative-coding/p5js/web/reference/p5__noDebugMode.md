---
source: https://p5js.org/reference/p5/noDebugMode/
title: "noDebugMode"
fetched: 2026-10-28
---

Turns off [debugMode()](https://p5js.org/reference/p5/debugMode/) in a 3D sketch.

## Examples

## Syntax

`noDebugMode()`

## Parameters

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/webgl/interaction.js](https://github.com/processing/p5.js/blob/v2.3.3/src/webgl/interaction.js#L738) and open a pull request!

---

## Related References

* [debugMode

  Adds a grid and an axes icon to clarify orientation in 3D sketches.](https://p5js.org/reference/p5/debugMode/)
* [noDebugMode

  Turns off debugMode() in a 3D sketch.](https://p5js.org/reference/p5/noDebugMode/)
* [orbitControl

  Allows the user to orbit around a 3D sketch using a mouse, trackpad, or touchscreen.](https://p5js.org/reference/p5/orbitControl/)

## Example code (extracted)

```js
// Click and drag the mouse to view the scene from different angles.

function setup() {
  createCanvas(100, 100, WEBGL);

  // Enable debug mode.
  debugMode();

  describe('A multicolor box on a gray background. A grid and axes icon are displayed near the box. They disappear when the user double-clicks.');
}

function draw() {
  background(200);

  // Enable orbiting with the mouse.
  orbitControl();

  // Style the box.
  normalMaterial();

  // Draw the box.  box(20, 40);
}

// Disable debug mode when the user double-clicks.
function doubleClicked() {
  noDebugMode();
}
```
