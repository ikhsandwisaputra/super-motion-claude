---
source: https://p5js.org/reference/p5/buildNormalShader/
title: "buildNormalShader"
fetched: 2026-10-28
---

##### This API is experimental

Its behavior may change in a future version of p5.js.

Create a new shader that can change how fills are drawn, based on the material used when [`normalMaterial()`](https://p5js.org/reference/p5/normalMaterial/) is active. Pass the resulting shader into the [`shader()`](https://p5js.org/reference/p5/shader/) function to apply it to any fills you draw.

The main way to use `buildNormalShader` is to pass a function in as a parameter. This will let you create a shader using p5.strands.

In your function, you can call hooks to change part of the shader. In a material shader, these are the hooks available:

* [`objectInputs`](https://p5js.org/reference/p5/objectInputs/): Update vertices before any positioning has been applied. Your function gets run on every vertex.
* [`worldInputs`](https://p5js.org/reference/p5/worldInputs/): Update vertices after transformations have been applied. Your function gets run on every vertex.
* [`cameraInputs`](https://p5js.org/reference/p5/cameraInputs/): Update vertices after transformations have been applied, relative to the camera. Your function gets run on every vertex.
* [`finalColor`](https://p5js.org/reference/p5/finalColor/): Update or replace the pixel color on the surface of a shape. Your function gets run on every pixel.

Read the linked reference page for each hook for more information about how to use them.

One thing you may want to do is update the position of all the vertices in an object over time:

You may also want to change the colors used. By default, the x, y, and z values of the orientation of the surface are mapped directly to red, green, and blue. But you can pick different colors:

Like the `modify()` method on shaders, advanced users can also fill in hooks using [GLSL](https://developer.mozilla.org/en-US/docs/Games/Techniques/3D_on_the_web/GLSL_Shaders/) instead of JavaScript. Read the [reference entry for `modify()`](https://p5js.org/reference/p5.Shader/modify/) for more info.

## Examples

## Syntax

`buildNormalShader(callback, [scope])``buildNormalShader(hooks, [scope])`

## Parameters

callback

Function: A function building a p5.strands shader.

scope

Object: An optional scope object passed to .modify().

hooks

Object: An object specifying p5.strands hooks in GLSL.

## Returns

p5.Shader: The normal shader.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/webgl/material.js](https://github.com/processing/p5.js/blob/v2.3.3/src/webgl/material.js#L1786) and open a pull request!

---

## Related References

* [read

  Reads data from a storage buffer back into JavaScript.](https://p5js.org/reference/p5.StorageBuffer/read/)
* [set

  Updates a single element in the buffer at a given index.](https://p5js.org/reference/p5.StorageBuffer/set/)
* [update

  Updates the data in the buffer with new values.](https://p5js.org/reference/p5.StorageBuffer/update/)
* [baseColorShader

  Returns the default shader used for fills when no lights or textures are activate.](https://p5js.org/reference/p5/baseColorShader/)

## Example code (extracted)

```js
let myShader;

function setup() {
  createCanvas(200, 200, WEBGL);
  myShader = buildNormalShader(material);
}

function material() {
  let time = millis();
  worldInputs.begin();
  worldInputs.position.y +=
    20. * sin(time * 0.001 + worldInputs.position.x * 0.05);
  worldInputs.end();
}

function draw() {
  background(255);
  shader(myShader);
  noStroke();
  sphere(50);
}
```

```js
let myShader;

function setup() {
  createCanvas(200, 200, WEBGL);
  myShader = buildNormalShader(material);
}

function material() {
  cameraInputs.begin();
  cameraInputs.normal = abs(cameraInputs.normal);
  cameraInputs.end();

  finalColor.begin();
  // Map the r, g, and b values of the old normal to new colors
  // instead of just red, green, and blue:
  let newColor =
    finalColor.color.r * [89, 240, 232] / 255 +
    finalColor.color.g * [240, 237, 89] / 255 +
    finalColor.color.b * [205, 55, 222] / 255;
  newColor = newColor / (finalColor.color.r + finalColor.color.g + finalColor.color.b);
  finalColor.set([newColor.r, newColor.g, newColor.b, finalColor.color.a]);
  finalColor.end();
}

function draw() {
  background(255);
  shader(myShader);
  noStroke();
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.015);
  box(100);
}
```
