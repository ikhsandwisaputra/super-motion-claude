---
source: https://p5js.org/reference/p5/shininess/
title: "shininess"
fetched: 2026-10-28
---

Sets the amount of gloss ("shininess") of a [specularMaterial()](https://p5js.org/reference/p5/specularMaterial/).

Shiny materials focus reflected light more than dull materials. `shininess()` affects the way materials reflect light sources including [directionalLight()](https://p5js.org/reference/p5/directionalLight/), [pointLight()](https://p5js.org/reference/p5/pointLight/), and [spotLight()](https://p5js.org/reference/p5/spotLight/).

The parameter, `shine`, is a number that sets the amount of shininess. `shine` must be greater than 1, which is its default value.

## Examples

## Syntax

`shininess(shine)`

## Parameters

shine

Number: amount of shine.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/webgl/material.js](https://github.com/processing/p5.js/blob/v2.3.3/src/webgl/material.js#L3660) and open a pull request!

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
function setup() {
  createCanvas(100, 100, WEBGL);

  describe(
    'Two red spheres drawn on a gray background. White light reflects from their surfaces as the mouse moves. The right sphere is shinier than the left sphere.'
  );
}

function draw() {
  background(200);

  // Turn on a red ambient light.
  ambientLight(255, 0, 0);

  // Get the mouse's coordinates.
  let mx = mouseX - 50;
  let my = mouseY - 50;

  // Turn on a white point light that follows the mouse.
  pointLight(255, 255, 255, mx, my, 50);

  // Style the sphere.
  noStroke();

  // Add a specular material with a grayscale value.
  specularMaterial(255);

  // Draw the left sphere with low shininess.
  translate(-25, 0, 0);
  shininess(10);
  sphere(20);

  // Draw the right sphere with high shininess.
  translate(50, 0, 0);
  shininess(100);
  sphere(20);
}
```
