---
source: https://p5js.org/reference/p5/finalColor/
title: "finalColor"
fetched: 2026-10-28
---

##### This API is experimental

Its behavior may change in a future version of p5.js.

A shader hook block that modifies the final color of each pixel after all lighting is applied. This hook can be used inside [`buildMaterialShader()`](https://p5js.org/reference/p5/buildMaterialShader/) and similar shader [`modify()`](https://p5js.org/reference/p5.Shader/modify/) calls to adjust the color before it appears on the screen. Modifications happen between the `.begin()` and `.end()` methods of the hook.

`finalColor` has the following properties:

* `color`: a four-component vector representing the pixel color (red, green, blue, alpha).
* `texCoord`: a two-component vector representing the texture coordinates (u, v)

Call `.set()` on the hook with a vector with four components (red, green, blue, alpha) to update the final color.

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
  finalColor.begin();
  let color = finalColor.color;
  // Add a blue tint to the output color
  color.b += 0.4;
  finalColor.set(color);
  finalColor.end();
}

function draw() {
  background(230);
  shader(myShader);
  noStroke();
  fill('green');
  circle(0, 0, 100);
}
```
