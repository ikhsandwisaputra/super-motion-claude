---
source: https://p5js.org/reference/p5/metalness/
title: "metalness"
fetched: 2026-10-28
---

Sets the amount of "metalness" of a [specularMaterial()](https://p5js.org/reference/p5/specularMaterial/).

`metalness()` can make materials appear more metallic. It affects the way materials reflect light sources including affects the way materials reflect light sources including [directionalLight()](https://p5js.org/reference/p5/directionalLight/), [pointLight()](https://p5js.org/reference/p5/pointLight/), [spotLight()](https://p5js.org/reference/p5/spotLight/), and [imageLight()](https://p5js.org/reference/p5/imageLight/).

The parameter, `metallic`, is a number that sets the amount of metalness. `metallic` must be greater than 1, which is its default value. Higher values, such as `metalness(100)`, make specular materials appear more metallic.

## Examples

## Syntax

`metalness(metallic)`

## Parameters

metallic

Number: amount of metalness.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/webgl/material.js](https://github.com/processing/p5.js/blob/v2.3.3/src/webgl/material.js#L3769) and open a pull request!

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
    'Two blue spheres drawn on a gray background. White light reflects from their surfaces as the mouse moves. The right sphere is more metallic than the left sphere.'
  );
}

function draw() {
  background(200);

  // Turn on an ambient light.
  ambientLight(200);

  // Get the mouse's coordinates.
  let mx = mouseX - 50;
  let my = mouseY - 50;

  // Turn on a white point light that follows the mouse.
  pointLight(255, 255, 255, mx, my, 50);

  // Style the spheres.
  noStroke();
  fill(30, 30, 255);
  specularMaterial(255);
  shininess(20);

  // Draw the left sphere with low metalness.
  translate(-25, 0, 0);
  metalness(1);
  sphere(20);

  // Draw the right sphere with high metalness.
  translate(50, 0, 0);
  metalness(50);
  sphere(20);
}
```

```js
// Click and drag the mouse to view the scene from different angles.

let img;

async function setup() {
  img = await loadImage('/assets/outdoor_spheremap.jpg');

  createCanvas(100 ,100 ,WEBGL);

  describe(
    'Two spheres floating above a landscape. The surface of the spheres reflect the landscape. The right sphere is more reflective than the left sphere.'
  );
}

function draw() {
  // Add the panorama.
  panorama(img);

  // Enable orbiting with the mouse.
  orbitControl();

  // Use the image as a light source.
  imageLight(img);

  // Style the spheres.
  noStroke();
  specularMaterial(50);
  shininess(200);

  // Draw the left sphere with low metalness.
  translate(-25, 0, 0);
  metalness(1);
  sphere(20);

  // Draw the right sphere with high metalness.
  translate(50, 0, 0);
  metalness(50);
  sphere(20);
}
```
