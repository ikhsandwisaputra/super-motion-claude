---
source: https://p5js.org/reference/p5/emissiveMaterial/
title: "emissiveMaterial"
fetched: 2026-10-28
---

Sets the emissive color of shapes’ surface material.

The `emissiveMaterial()` color sets a color shapes display at full strength, regardless of lighting. This can give the appearance that a shape is glowing. However, emissive materials don’t actually emit light that can affect surrounding objects.

`emissiveMaterial()` can be called three ways with different parameters to set the material’s color.

The first way to call `emissiveMaterial()` has one parameter, `gray`. Grayscale values between 0 and 255, as in `emissiveMaterial(50)`, can be passed to set the material’s color. Higher grayscale values make shapes appear brighter.

The second way to call `emissiveMaterial()` has one parameter, `color`. A [p5.Color](https://p5js.org/reference/p5/p5.Color) object, an array of color values, or a CSS color string, as in `emissiveMaterial('magenta')`, can be passed to set the material’s color.

The third way to call `emissiveMaterial()` has four parameters, `v1`, `v2`, `v3`, and `alpha`. `alpha` is optional. RGBA, HSBA, or HSLA values can be passed to set the material’s colors, as in `emissiveMaterial(255, 0, 0)` or `emissiveMaterial(255, 0, 0, 30)`. Color values will be interpreted using the current [colorMode()](https://p5js.org/reference/p5/colorMode/).

Note: `emissiveMaterial()` can only be used in WebGL mode.

## Examples

## Syntax

`emissiveMaterial(v1, v2, v3, [alpha])``emissiveMaterial(gray)``emissiveMaterial(color)`

## Parameters

v1

Number: red or hue value in the current [colorMode()](https://p5js.org/reference/p5/emissiveMaterial/#/p5/colorMode).

v2

Number: green or saturation value in the current [colorMode()](https://p5js.org/reference/p5/emissiveMaterial/#/p5/colorMode).

v3

Number: blue, brightness, or lightness value in the current [colorMode()](https://p5js.org/reference/p5/emissiveMaterial/#/p5/colorMode).

alpha

Number: alpha value in the current [colorMode()](https://p5js.org/reference/p5/emissiveMaterial/#/p5/colorMode).

gray

Number: grayscale value between 0 (black) and 255 (white).

color

p5.Color|Number[]|String: color as a [p5.Color](https://p5js.org/reference/p5/p5.Color/) object, an array of color values, or a CSS string.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/webgl/material.js](https://github.com/processing/p5.js/blob/v2.3.3/src/webgl/material.js#L3351) and open a pull request!

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

  describe('A red cube drawn on a gray background.');
}

function draw() {
  background(200);

  // Enable orbiting with the mouse.
  orbitControl();

  // Turn on a white ambient light.
  ambientLight(255, 255, 255);

  // Add a red emissive material using RGB values.
  emissiveMaterial(255, 0, 0);

  // Draw the box.
  box();
}
```
