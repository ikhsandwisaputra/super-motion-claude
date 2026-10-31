---
source: https://p5js.org/reference/p5/normalMaterial/
title: "normalMaterial"
fetched: 2026-10-28
---

Sets the current material as a normal material.

A normal material sets surfaces facing the x-axis to red, those facing the y-axis to green, and those facing the z-axis to blue. Normal material isn't affected by light. It’s often used as a placeholder material when debugging.

Note: `normalMaterial()` can only be used in WebGL mode.

## Examples

## Syntax

`normalMaterial()`

## Parameters

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/webgl/material.js](https://github.com/processing/p5.js/blob/v2.3.3/src/webgl/material.js#L3053) and open a pull request!

---

## Related References

* [copyToContext

  Copies the shader from one drawing context to another.](https://p5js.org/reference/p5.Shader/copyToContext/)
* [inspectHooks

  Logs the hooks available in this shader, and their current implementation.](https://p5js.org/reference/p5.Shader/inspectHooks/)
* [modify

  Returns a new shader, based on the original, but with custom snippets of shader code replacing default behaviour.](https://p5js.org/reference/p5.Shader/modify/)
* [setUniform

  Sets the shader’s uniform (global) variables.](https://p5js.org/reference/p5.Shader/setUniform/)

## Example code (extracted)

```js
// Click and drag the mouse to view the scene from different angles.

function setup() {
  createCanvas(100, 100, WEBGL);

  describe('A multicolor torus drawn on a gray background.');
}

function draw() {
  background(200);

  // Enable orbiting with the mouse.
  orbitControl();

  // Style the torus.
  normalMaterial();

  // Draw the torus.
  torus(30);
}
```
