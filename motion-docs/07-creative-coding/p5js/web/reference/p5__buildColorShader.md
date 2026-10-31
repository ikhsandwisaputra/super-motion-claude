---
source: https://p5js.org/reference/p5/buildColorShader/
title: "buildColorShader"
fetched: 2026-10-28
---

##### This API is experimental

Its behavior may change in a future version of p5.js.

Create a new shader that can change how fills are drawn, based on the default shader used when no lights or textures are applied. Pass the resulting shader into the [`shader()`](https://p5js.org/reference/p5/shader/) function to apply it to any fills you draw.

The main way to use `buildColorShader` is to pass a function in as a parameter. This will let you create a shader using p5.strands.

In your function, you can call hooks to change part of the shader. In a material shader, these are the hooks available:

* [`objectInputs`](https://p5js.org/reference/p5/objectInputs/): Update vertices before any positioning has been applied. Your function gets run on every vertex.
* [`worldInputs`](https://p5js.org/reference/p5/worldInputs/): Update vertices after transformations have been applied. Your function gets run on every vertex.
* [`cameraInputs`](https://p5js.org/reference/p5/cameraInputs/): Update vertices after transformations have been applied, relative to the camera. Your function gets run on every vertex.
* [`finalColor`](https://p5js.org/reference/p5/finalColor/): Update or replace the pixel color on the surface of a shape. Your function gets run on every pixel.

Read the linked reference page for each hook for more information about how to use them.

One thing you might want to do is modify the position of every vertex over time:

Like the `modify()` method on shaders, advanced users can also fill in hooks using [GLSL](https://developer.mozilla.org/en-US/docs/Games/Techniques/3D_on_the_web/GLSL_Shaders/) instead of JavaScript. Read the [reference entry for `modify()`](https://p5js.org/reference/p5.Shader/modify/) for more info.

## Examples

## Syntax

`buildColorShader(callback, [scope])``buildColorShader(hooks, [scope])`

## Parameters

callback

Function: A function building a p5.strands shader.

scope

Object: An optional scope object passed to .modify().

hooks

Object: An object specifying p5.strands hooks in GLSL.

## Returns

p5.Shader: The color shader.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/webgl/material.js](https://github.com/processing/p5.js/blob/v2.3.3/src/webgl/material.js#L1950) and open a pull request!

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
  myShader = buildColorShader(material);
}

function material() {
  let time = millis();
  worldInputs.begin();
  worldInputs.position.y +=
    20 * sin(time * 0.001 + worldInputs.position.x * 0.05);
  worldInputs.end();
}

function draw() {
  background(255);
  shader(myShader);
  noStroke();
  fill('red');
  circle(0, 0, 50);
}
```
