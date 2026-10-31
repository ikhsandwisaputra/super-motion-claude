---
source: https://p5js.org/reference/p5/pixelInputs/
title: "pixelInputs"
fetched: 2026-10-28
---

##### This API is experimental

Its behavior may change in a future version of p5.js.

A shader hook block that modifies the properties of each pixel before the final color is calculated. This hook can be used inside [`buildMaterialShader()`](https://p5js.org/reference/p5/buildMaterialShader/) and similar shader [`modify()`](https://p5js.org/reference/p5.Shader/modify/) calls to adjust per-pixel data before lighting is applied. Modifications happen between the `.begin()` and `.end()` methods of the hook.

The properties of `pixelInputs` depend on the shader:

* In [`buildMaterialShader()`](https://p5js.org/reference/p5/buildMaterialShader/):

  + `normal`: a three-component vector representing the surface normal.
  + `texCoord`: a two-component vector representing the texture coordinates (u, v).
  + `ambientLight`: a three-component vector representing the ambient light color.
  + `ambientMaterial`: a three-component vector representing the material's ambient color.
  + `specularMaterial`: a three-component vector representing the material's specular color.
  + `emissiveMaterial`: a three-component vector representing the material's emissive color.
  + `color`: a four-component vector representing the base color (red, green, blue, alpha).
  + `shininess`: a number controlling specular highlights.
  + `metalness`: a number controlling the metalness factor.
* In [`buildStrokeShader()`](https://p5js.org/reference/p5/buildStrokeShader/):

  + `color`: a four-component vector representing the stroke color (red, green, blue, alpha).
  + `tangent`: a two-component vector representing the stroke tangent.
  + `center`: a two-component vector representing the cap/join center.
  + `position`: a two-component vector representing the current fragment position.
  + `strokeWeight`: a number representing the stroke weight in pixels.

This hook is available in:

* [`buildMaterialShader()`](https://p5js.org/reference/p5/buildMaterialShader/)
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
  pixelInputs.begin();
  // Animate alpha (transparency) based on x position
  pixelInputs.color.a = 0.5 + 0.5 *
    sin(pixelInputs.texCoord.x * 10.0 + t * 0.002);
  pixelInputs.end();
}

function draw() {
  background(240);
  shader(myShader);
  lights();
  noStroke();
  fill('purple');
  circle(0, 0, 100);
}
```
