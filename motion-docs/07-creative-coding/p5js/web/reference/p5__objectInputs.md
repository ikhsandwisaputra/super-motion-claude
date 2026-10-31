---
source: https://p5js.org/reference/p5/objectInputs/
title: "objectInputs"
fetched: 2026-10-28
---

##### This API is experimental

Its behavior may change in a future version of p5.js.

A shader hook block to modify the properties of each vertex before any transformations are applied. This hook can be used inside [`buildMaterialShader()`](https://p5js.org/reference/p5/buildMaterialShader/) and similar shader [`modify()`](https://p5js.org/reference/p5.Shader/modify/) calls to customize vertex positions, normals, texture coordinates, and colors before rendering. Modifications happen between the `.begin()` and `.end()` methods of the hook. "Object space" refers to the coordinate system of the 3D scene before any transformations, cameras, or projection transformations are applied.

`objectInputs` has the following properties:

* `position`: a three-component vector representing the original position of the vertex.
* `normal`: a three-component vector representing the direction the surface is facing.
* `texCoord`: a two-component vector representing the texture coordinates.
* `color`: a four-component vector representing the color of the vertex (red, green, blue, alpha).

This hook is available in:

* [`buildColorShader()`](https://p5js.org/reference/p5/buildColorShader/)
* [`buildMaterialShader()`](https://p5js.org/reference/p5/buildMaterialShader/)
* [`buildNormalShader()`](https://p5js.org/reference/p5/buildNormalShader/)
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
  objectInputs.begin();
  // Create a sine wave along the object
  objectInputs.position.y += sin(t * 0.001 + objectInputs.position.x);
  objectInputs.end();
}

function draw() {
  background(220);
  shader(myShader);
  noStroke();
  fill('orange');
  sphere(50);
}
```
