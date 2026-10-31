---
source: https://p5js.org/reference/p5/filterColor/
title: "filterColor"
fetched: 2026-10-28
---

A shader hook block that sets the color for each pixel in a filter shader. This hook can be used inside [`buildFilterShader()`](https://p5js.org/reference/p5/buildFilterShader/) to control the output color for each pixel.

`filterColor` has the following properties:

* `texCoord`: a two-component vector representing the texture coordinates (u, v).
* `canvasSize`: a two-component vector representing the canvas size in pixels (width, height).
* `texelSize`: a two-component vector representing the size of a single texel in texture space.
* `canvasContent`: a texture containing the sketch's contents before the filter is applied.

Call `.set()` on the hook with a vector with four components (red, green, blue, alpha) to update the final color.

This hook is available in:

* [`buildFilterShader()`](https://p5js.org/reference/p5/buildFilterShader/)

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
  myShader = buildFilterShader(warp);
}

function warp() {
  filterColor.begin();
  // Warp the texture coordinates for a wavy effect
  let warped = [
    filterColor.texCoord.x,
    filterColor.texCoord.y + 0.1 * sin(filterColor.texCoord.x * 10)
  ];
  let tex = filterColor.canvasContent;
  filterColor.set(getTexture(tex, warped));
  filterColor.end();
}

function draw() {
  background(180);
  // Draw something to the canvas
  fill('yellow');
  circle(0, 0, 150);
  filter(myShader);
}
```
