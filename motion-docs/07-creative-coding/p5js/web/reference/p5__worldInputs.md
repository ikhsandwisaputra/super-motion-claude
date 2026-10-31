---
source: https://p5js.org/reference/p5/worldInputs/
title: "worldInputs"
fetched: 2026-10-28
---

##### This API is experimental

Its behavior may change in a future version of p5.js.

A shader hook block that modifies the world-space properties of each vertex in a shader. This hook can be used inside [`buildColorShader()`](https://p5js.org/reference/p5/buildColorShader/) and similar shader [`modify()`](https://p5js.org/reference/p5.Shader/modify/) calls to customize vertex positions, normals, texture coordinates, and colors before rendering. Modifications happen between the `.begin()` and `.end()` methods of the hook. "World space" refers to the coordinate system of the 3D scene, before any camera or projection transformations are applied.

`worldInputs` has the following properties:

* `position`: a three-component vector representing the original position of the vertex.
* `normal`: a three-component vector representing the direction the surface is facing.
* `texCoord`: a two-component vector representing the texture coordinates.
* `color`: a four-component vector representing the color of the vertex (red, green, blue, alpha).

This hook is available in:

* [`buildMaterialShader()`](https://p5js.org/reference/p5/buildMaterialShader/)
* [`buildNormalShader()`](https://p5js.org/reference/p5/buildNormalShader/)
* [`buildColorShader()`](https://p5js.org/reference/p5/buildColorShader/)
* [`buildStrokeShader()`](https://p5js.org/reference/p5/buildStrokeShader/)

## Examples

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/strands/p5.strands.js](https://github.com/processing/p5.js/blob/v2.3.3/src/strands/p5.strands.js#L212) and open a pull request!

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
  myShader = buildMaterialShader(material);
}

function material() {
  let t = millis();
  worldInputs.begin();
  // Move the vertex up and down in a wave in world space
  // In world space, moving the object (e.g., with translate()) will affect these coordinates
  // The sphere is ~50 units tall here, so 20 gives a noticeable wave
  worldInputs.position.y += 20 * sin(t * 0.001 + worldInputs.position.x * 0.05);
  worldInputs.end();
}

function draw() {
  background(255);
  shader(myShader);
  lights();
  noStroke();
  fill('red');
  sphere(50);
}
```
