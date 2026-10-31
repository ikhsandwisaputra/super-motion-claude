---
source: https://p5js.org/reference/p5/cameraInputs/
title: "cameraInputs"
fetched: 2026-10-28
---

##### This API is experimental

Its behavior may change in a future version of p5.js.

A shader hook block that adjusts vertex properties from the perspective of the camera. This hook can be used inside [`buildMaterialShader()`](https://p5js.org/reference/p5/buildMaterialShader/) and similar shader [`modify()`](https://p5js.org/reference/p5.Shader/modify/) calls to customize vertex positions, normals, texture coordinates, and colors before rendering. "Camera space" refers to the coordinate system of the 3D scene after transformations have been applied, seen relative to the camera.

`cameraInputs` has the following properties:

* `position`: a three-component vector representing the position after camera transformation.
* `normal`: a three-component vector representing the normal after camera transformation.
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
  cameraInputs.begin();
  // Move vertices in camera space based on their x position
  cameraInputs.position.y += 30 * sin(cameraInputs.position.x * 0.05 + t * 0.001);
  // Tint all vertices blue
  cameraInputs.color.b = 1;
  cameraInputs.end();
}

function draw() {
  background(200);
  shader(myShader);
  noStroke();
  fill('red');
  sphere(50);
}
```
